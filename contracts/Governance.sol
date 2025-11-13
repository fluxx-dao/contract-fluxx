// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface ITreasury {
function queueWithdrawal(address tokenAddress, uint256 amount, address to) external returns (bytes32);
function executeWithdrawal(bytes32 txHash, address tokenAddress, uint256 amount, address to) external;
function withdrawEther(uint256 amount, address payable to) external;
}

/**

- @title Governance
- @dev Sistema de votação baseado em REPUTAÇÃO (Badges), não em tokens
- Quem tem mais impacto aplicado (mais badges) tem mais poder de voto
*/
contract Governance is Ownable {
    
    IERC1155 public badgeNFT;
    ITreasury public treasury;
    
    enum ProposalState {
    Pendente,
    Ativa,
    Aprovada,
    Rejeitada,
    Executada,
    Cancelada
    }
    
    enum ProposalType {
    SacarTokens,
    SacarEther,
    MudarParametro
    }
    
    struct Proposal {
    uint256 id;
    address proponente;
    ProposalType tipo;
    string descricao;
    address alvo; // Para saque: endereço do token
    address destinatario; // Para saque: endereço do destinatário
    uint256 valor;
    ProposalState estado;
    uint256 votosFavor;
    uint256 votosContra;
    uint256 criadaEm;
    uint256 encerraEm;
    mapping(address => bool) jaVotou;
    }
    
    uint256 public proposalIdCounter;
    mapping(uint256 => Proposal) public propostas;
    
    // Parâmetros de governança
    uint256 public duracaoVotacao = 3 days;
    uint256 public quorumMinimo = 10; // DEPRECATED - usar quorumPercentual
    uint256 public quorumPercentual = 20; // 20% dos votantes elegíveis
    
    // IDs dos Badges para calcular poder de voto
    uint256 public constant BADGE_ID_MEMBRO_ATIVO = 1;
    uint256 public constant BADGE_ID_COLABORADOR = 2;
    uint256 public constant BADGE_ID_APLICADOR = 3;
    
    // Peso de cada badge no voto
    uint256 public constant PESO_MEMBRO = 1;
    uint256 public constant PESO_COLABORADOR = 2;
    uint256 public constant PESO_APLICADOR = 3;
    
    event PropostaCriada(
    uint256 indexed proposalId,
    address indexed proponente,
    ProposalType tipo,
    string descricao
    );
    event VotoRegistrado(
    uint256 indexed proposalId,
    address indexed votante,
    bool favor,
    uint256 poderVoto
    );
    event PropostaExecutada(uint256 indexed proposalId);
    event PropostaCancelada(uint256 indexed proposalId);
    
    constructor(
    address initialOwner,
    address _badgeNFT,
    address _treasury
    ) Ownable(initialOwner) {
    require(_badgeNFT != address(0), "BadgeNFT invalido");
    require(_treasury != address(0), "Treasury invalido");
    
    badgeNFT = IERC1155(_badgeNFT);
    treasury = ITreasury(_treasury);
    }
    
    /**
    
    - @dev Calcula poder de voto baseado nos badges do usuário
    - @param account Endereço do votante
    */
    function getVotes(address account) public view returns (uint256) {
    uint256 poderVoto = 0;
        
        // Badge de Membro Ativo (peso 1)
        uint256 membroBadges = badgeNFT.balanceOf(account, BADGE_ID_MEMBRO_ATIVO);
        if (membroBadges > 0) {
        poderVoto += PESO_MEMBRO;
        }
        
        // Badges de Colaborador (peso 2 cada)
        uint256 colaboradorBadges = badgeNFT.balanceOf(account, BADGE_ID_COLABORADOR);
        poderVoto += colaboradorBadges * PESO_COLABORADOR;
        
        // Badges de Aplicador (peso 3 cada)
        uint256 aplicadorBadges = badgeNFT.balanceOf(account, BADGE_ID_APLICADOR);
        poderVoto += aplicadorBadges * PESO_APLICADOR;
        
        return poderVoto;
        }
    
    /**
    
    - @dev Calcula poder de voto usando balanceOfBatch (otimizado)
    - @param account Endereço do votante
    */
    function getVotesBatch(address account) public view returns (uint256) {
        address[] memory accounts = new address[](3);
        accounts[0] = account;
        accounts[1] = account;
        accounts[2] = account;
        
        uint256[] memory ids = new uint256[](3);
        ids[0] = BADGE_ID_MEMBRO_ATIVO;
        ids[1] = BADGE_ID_COLABORADOR;
        ids[2] = BADGE_ID_APLICADOR;
        
        uint256[] memory balances = badgeNFT.balanceOfBatch(accounts, ids);
        
        uint256 poderVoto = 0;
        if (balances[0] > 0) {
            poderVoto += PESO_MEMBRO;
        }
        poderVoto += balances[1] * PESO_COLABORADOR;
        poderVoto += balances[2] * PESO_APLICADOR;
        
        return poderVoto;
    }
    
    /**
    
    - @dev Calcula total de votantes elegíveis (membros com badges)
    */
    function _calcularTotalVotantesElegiveis() internal view returns (uint256) {
        // Esta função precisa ser implementada com base na lógica de membros
        // Por enquanto, retorna quorumMinimo como fallback
        // TODO: Implementar contagem real de membros elegíveis
        return quorumMinimo * 5; // Estimativa: 5x o quorum mínimo
    }
        
    
    /**
    
    - @dev Cria proposta para sacar tokens do Treasury
    */
    function criarPropostaSaqueToken(
    string memory _descricao,
    address _tokenAddress,
    uint256 _valor,
    address _destinatario
    ) external returns (uint256) {
    require(getVotes(msg.sender) > 0, "Sem poder de voto");
    require(bytes(_descricao).length > 0, "Descricao vazia");
    require(_destinatario != address(0), "Destinatario invalido");
        
        uint256 proposalId = proposalIdCounter++;
        Proposal storage novaProposta = propostas[proposalId];
        
        novaProposta.id = proposalId;
        novaProposta.proponente = msg.sender;
        novaProposta.tipo = ProposalType.SacarTokens;
        novaProposta.descricao = _descricao;
        novaProposta.alvo = _tokenAddress;
        novaProposta.destinatario = _destinatario;
        novaProposta.valor = _valor;
        novaProposta.estado = ProposalState.Ativa;
        novaProposta.criadaEm = block.timestamp;
        novaProposta.encerraEm = block.timestamp + duracaoVotacao;
        
        emit PropostaCriada(proposalId, msg.sender, ProposalType.SacarTokens, _descricao);
        return proposalId;
        }
        
    
    /**
    
    - @dev Vota em uma proposta
    - @param _proposalId ID da proposta
    - @param _favor true = a favor, false = contra
    */
    function votar(uint256 _proposalId, bool _favor) external {
    Proposal storage proposta = propostas[_proposalId];
        
        require(proposta.estado == ProposalState.Ativa, "Proposta nao ativa");
        require(block.timestamp < proposta.encerraEm, "Votacao encerrada");
        require(!proposta.jaVotou[msg.sender], "Ja votou");
        
        uint256 poderVoto = getVotes(msg.sender);
        require(poderVoto > 0, "Sem poder de voto");
        
        proposta.jaVotou[msg.sender] = true;
        
        if (_favor) {
        proposta.votosFavor += poderVoto;
        } else {
        proposta.votosContra += poderVoto;
        }
        
        emit VotoRegistrado(_proposalId, msg.sender, _favor, poderVoto);
        }
        
    
    /**
    
    - @dev Finaliza votação e executa se aprovada
    - @param _proposalId ID da proposta
    */
    function finalizarVotacao(uint256 _proposalId) external {
    Proposal storage proposta = propostas[_proposalId];
        
        require(proposta.estado == ProposalState.Ativa, "Proposta nao ativa");
        require(block.timestamp >= proposta.encerraEm, "Votacao ainda aberta");
        
        uint256 totalVotos = proposta.votosFavor + proposta.votosContra;
        
        // Quorum proporcional (20% dos votantes elegíveis)
        uint256 totalVotantesElegiveis = _calcularTotalVotantesElegiveis();
        uint256 quorumNecessario = (totalVotantesElegiveis * quorumPercentual) / 100;
        
        // Fallback para quorum mínimo absoluto (para início da DAO)
        uint256 quorumMinimoAbsoluto = quorumMinimo;
        if (quorumNecessario < quorumMinimoAbsoluto) {
            quorumNecessario = quorumMinimoAbsoluto;
        }
        
        require(totalVotos >= quorumNecessario, "Quorum nao atingido");
        
        if (proposta.votosFavor > proposta.votosContra) {
        proposta.estado = ProposalState.Aprovada;
        executarProposta(_proposalId);
        } else {
        proposta.estado = ProposalState.Rejeitada;
        }
        }
        
    
    /**
    
    - @dev Executa proposta aprovada (agora com timelock)
    */
    function executarProposta(uint256 _proposalId) internal {
    Proposal storage proposta = propostas[_proposalId];
        
        require(proposta.estado == ProposalState.Aprovada, "Nao aprovada");
        
        if (proposta.tipo == ProposalType.SacarTokens) {
        // Usa o novo sistema de timelock
        treasury.queueWithdrawal(
        proposta.alvo, // tokenAddress
        proposta.valor, // amount
        proposta.destinatario // to
        );
        // Nota: A execução real acontece após 2 dias via executeWithdrawal
        }
        
        proposta.estado = ProposalState.Executada;
        emit PropostaExecutada(_proposalId);
        }
        
    
    /**
    
    - @dev Atualiza parâmetros de governança
    */
    function atualizarParametros(
    uint256 _duracaoVotacao,
    uint256 _quorumMinimo
    ) external onlyOwner {
    duracaoVotacao = _duracaoVotacao;
    quorumMinimo = _quorumMinimo;
    }
    
    /**
    
    - @dev Consulta detalhes de uma proposta
    */
    function getProposta(uint256 _proposalId) external view returns (
    address proponente,
    ProposalType tipo,
    string memory descricao,
    ProposalState estado,
    uint256 votosFavor,
    uint256 votosContra,
    uint256 encerraEm
    ) {
    Proposal storage proposta = propostas[_proposalId];
    return (
    proposta.proponente,
    proposta.tipo,
    proposta.descricao,
    proposta.estado,
    proposta.votosFavor,
    proposta.votosContra,
    proposta.encerraEm
    );
    }
    
    /**
    
    - @dev Verifica se usuário já votou
    */
    function jaVotou(uint256 _proposalId, address _votante) external view returns (bool) {
    return propostas[_proposalId].jaVotou[_votante];
    }
    }