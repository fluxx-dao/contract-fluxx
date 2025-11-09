// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface IMembership {
function isMember(address account) external view returns (bool);
}

interface IBadgeNFT {
function mint(address to, uint256 badgeId, uint256 amount, bytes memory data) external;
}

/**

- @title CollabEngine
- @dev Motor de Prova de Valor Aplicado
- Gerencia ciclo completo: Criação → Aceite → Entrega → Aprovação → APLICAÇÃO → Pagamento
*/
contract CollabEngine is ReentrancyGuard {
    
    enum EstadoMissao {
    Aberta,
    EmProgresso,
    Entregue,
    Aprovada,
    Aplicada,
    Concluida,
    Cancelada
    }
    
    struct Missao {
    address demandante;
    address colaborador;
    uint256 recompensa;
    EstadoMissao estado;
    string urlDescricao;
    string urlEntrega;
    string urlAplicacao;
    uint256 criadaEm;
    uint256 concluidaEm;
    }
    
    IERC20 public token;
    IMembership public membership;
    IBadgeNFT public badgeNFT;
    
    uint256 public missaoIdCounter;
    mapping(uint256 => Missao) public missoes;
    
    // IDs dos Badges
    uint256 public constant BADGE_ID_COLABORADOR = 2;
    uint256 public constant BADGE_ID_APLICADOR = 3;
    
    event MissaoCriada(
    uint256 indexed missaoId,
    address indexed demandante,
    uint256 recompensa,
    string urlDescricao
    );
    event MissaoAceita(uint256 indexed missaoId, address indexed colaborador);
    event MissaoEntregue(uint256 indexed missaoId, string urlEntrega);
    event MissaoAprovada(uint256 indexed missaoId);
    event MissaoAplicada(uint256 indexed missaoId, string urlAplicacao);
    event MissaoConcluida(uint256 indexed missaoId);
    event MissaoCancelada(uint256 indexed missaoId);
    
    constructor(
    address _token,
    address _membership,
    address _badgeNFT
    ) {
    require(_token != address(0), "Token invalido");
    require(_membership != address(0), "Membership invalido");
    require(_badgeNFT != address(0), "BadgeNFT invalido");
    
    token = IERC20(_token);
    membership = IMembership(_membership);
    badgeNFT = IBadgeNFT(_badgeNFT);
    }
    
    /**
    
    - @dev Cria nova missão
    - @param _recompensa Valor em $FLUXX
    - @param _urlDescricao Link da descrição
    */
    function criarMissao(
    uint256 _recompensa,
    string memory _urlDescricao
    ) external returns (uint256) {
    require(membership.isMember(msg.sender), "Nao e membro");
    require(_recompensa > 0, "Recompensa invalida");
    require(bytes(_urlDescricao).length > 0, "Descricao vazia");
        
        // Trava (stake) a recompensa no contrato
        require(
        token.transferFrom(msg.sender, address(this), _recompensa),
        "Transferencia falhou"
        );
        
        uint256 missaoId = missaoIdCounter++;
        
        Missao storage novaMissao = missoes[missaoId];
        novaMissao.demandante = msg.sender;
        novaMissao.recompensa = _recompensa;
        novaMissao.estado = EstadoMissao.Aberta;
        novaMissao.urlDescricao = _urlDescricao;
        novaMissao.criadaEm = block.timestamp;
        
        emit MissaoCriada(missaoId, msg.sender, _recompensa, _urlDescricao);
        return missaoId;
        }
        
    
    /**
    
    - @dev Aceita uma missão
    - @param _missaoId ID da missão
    */
    function aceitarMissao(uint256 _missaoId) external {
    Missao storage missao = missoes[_missaoId];
        
        require(membership.isMember(msg.sender), "Nao e membro");
        require(missao.estado == EstadoMissao.Aberta, "Missao nao disponivel");
        require(missao.demandante != msg.sender, "Nao pode aceitar propria missao");
        
        missao.colaborador = msg.sender;
        missao.estado = EstadoMissao.EmProgresso;
        
        emit MissaoAceita(_missaoId, msg.sender);
        }
        
    
    /**
    
    - @dev Entrega trabalho concluído
    - @param _missaoId ID da missão
    - @param _urlEntrega Link da entrega
    */
    function entregarMissao(
    uint256 _missaoId,
    string memory _urlEntrega
    ) external {
    Missao storage missao = missoes[_missaoId];
        
        require(msg.sender == missao.colaborador, "Nao e o colaborador");
        require(missao.estado == EstadoMissao.EmProgresso, "Missao nao em progresso");
        require(bytes(_urlEntrega).length > 0, "URL vazia");
        
        missao.urlEntrega = _urlEntrega;
        missao.estado = EstadoMissao.Entregue;
        
        emit MissaoEntregue(_missaoId, _urlEntrega);
        }
        
    
    /**
    
    - @dev Demandante aprova a entrega
    - @param _missaoId ID da missão
    - IMPORTANTE: Pagamento NÃO acontece aqui
    */
    function aprovarEntrega(uint256 _missaoId) external {
    Missao storage missao = missoes[_missaoId];
        
        require(msg.sender == missao.demandante, "Nao e o demandante");
        require(missao.estado == EstadoMissao.Entregue, "Missao nao entregue");
        
        missao.estado = EstadoMissao.Aprovada;
        
        emit MissaoAprovada(_missaoId);
        }
        
    
    /**
    
    - @dev GATILHO CRÍTICO: Prova que o valor foi aplicado
    - @param _missaoId ID da missão
    - @param _urlAplicacao Link onde o trabalho está sendo usado
    - Aqui acontece: PAGAMENTO + MINT DE BADGES
    */
    function provarAplicacao(
    uint256 _missaoId,
    string memory _urlAplicacao
    ) external nonReentrant {
    Missao storage missao = missoes[_missaoId];
        
        require(msg.sender == missao.demandante, "Nao e o demandante");
        require(missao.estado == EstadoMissao.Aprovada, "Missao nao aprovada");
        require(bytes(_urlAplicacao).length > 0, "URL vazia");
        
        missao.urlAplicacao = _urlAplicacao;
        missao.estado = EstadoMissao.Aplicada;
        
        emit MissaoAplicada(_missaoId, _urlAplicacao);
        
        // PAGAMENTO: Libera recompensa para o colaborador
        require(
        token.transfer(missao.colaborador, missao.recompensa),
        "Pagamento falhou"
        );
        
        // REPUTAÇÃO: Minta badges Soulbound
        badgeNFT.mint(missao.demandante, BADGE_ID_APLICADOR, 1, "");
        badgeNFT.mint(missao.colaborador, BADGE_ID_COLABORADOR, 1, "");
        
        missao.estado = EstadoMissao.Concluida;
        missao.concluidaEm = block.timestamp;
        
        emit MissaoConcluida(_missaoId);
        }
        
    
    /**
    
    - @dev Cancela missão (apenas se ainda Aberta)
    - @param _missaoId ID da missão
    */
    function cancelarMissao(uint256 _missaoId) external nonReentrant {
    Missao storage missao = missoes[_missaoId];
        
        require(msg.sender == missao.demandante, "Nao e o demandante");
        require(missao.estado == EstadoMissao.Aberta, "Nao pode cancelar");
        
        missao.estado = EstadoMissao.Cancelada;
        
        // Devolve recompensa ao demandante
        require(
        token.transfer(missao.demandante, missao.recompensa),
        "Devolucao falhou"
        );
        
        emit MissaoCancelada(_missaoId);
        }
        
    
    /**
    
    - @dev Consulta detalhes de uma missão
    */
    function getMissao(uint256 _missaoId) external view returns (
    address demandante,
    address colaborador,
    uint256 recompensa,
    EstadoMissao estado,
    string memory urlDescricao,
    string memory urlEntrega,
    string memory urlAplicacao
    ) {
    Missao storage missao = missoes[_missaoId];
    return (
    missao.demandante,
    missao.colaborador,
    missao.recompensa,
    missao.estado,
    missao.urlDescricao,
    missao.urlEntrega,
    missao.urlAplicacao
    );
    }
    }