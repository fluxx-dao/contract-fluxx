// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
// import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol"; // REMOVIDO v0.5.1 - Oracle será implementado na v0.5.2 pós-liquidez

interface IBadgeNFT {
function mint(address to, uint256 badgeId, uint256 amount, bytes memory data) external;
function balanceOf(address account, uint256 id) external view returns (uint256);
}

/**
 
- @title Membership v0.5.1 (IGNIÇÃO - Preço Fixo)
- @dev Portão de Entrada com Sistema de Fiança
- ROTA 1: FLUXX (500 $FLUXX = $50 USD @ Preço de Fundação $0.10)
- ROTA 2: Indicado com Fiador (100 $FLUXX = $10 USD @ Preço de Fundação $0.10)
- NOTA: Oracle Chainlink será implementado na v0.5.2 após liquidez de mercado
*/
contract Membership is Ownable, ReentrancyGuard, Pausable {
    
    IERC20 public token;
    IBadgeNFT public badgeNFT;
    address public treasury;
    // AggregatorV3Interface public priceFeed; // REMOVIDO v0.5.1 - Oracle será implementado na v0.5.2
    
    /* ======== IGNIÇÃO DE PREÇO FIXO v0.5.1 ======== */
    // Preço de Fundação: 1 $FLUXX = $0.10 USD
    uint256 public constant PRECO_FUNDACAO_USD = 10 * 1e16; // $0.10 (18 decimais)
    uint256 public constant STAKE_LOBO_FIXO = 500 * 1e18; // 500 $FLUXX = $50 USD
    uint256 public constant STAKE_SOCIAL_FIXO = 100 * 1e18; // 100 $FLUXX = $10 USD
    /* ============================================== */
    
    // Sistema de Fiança
    uint256 public constant MAX_FIANCA = 5; // Máximo de indicações por fiador
    
    mapping(address => bool) public isMember;
    mapping(address => uint256) public memberSince;
    mapping(address => address) public fiadorDe; // Quem é o fiador deste membro
    mapping(address => uint256) public contadorFiador; // Quantos indicou
    mapping(address => address[]) public indicadosPor; // Lista de indicados
    mapping(address => uint256) public stakeDoFiador; // Stake real do fiador (para validação)
    mapping(address => uint256) public slotsDisponiveis; // Slots de indicação disponíveis (padrão: 5)
    
    uint256 public totalMembers;
    uint256 public totalLobos; // Membros sem fiador
    uint256 public totalIndicados; // Membros com fiador
    
    event MemberRegistered(
    address indexed member,
    uint256 stakeUSD,
    uint256 stakeToken,
    address indexed fiador,
    uint256 timestamp
    );
    event StakeRequirementUpdated(uint256 loboUSD, uint256 socialUSD);
    event FiadorPenalizado(address indexed fiador, address indexed infrator, uint256 penalidade);
    
    constructor(
    address initialOwner,
    address _token,
    address _badgeNFT,
    address _treasury
    // address _priceFeed // REMOVIDO v0.5.1 - Oracle será implementado na v0.5.2
    ) Ownable(initialOwner) {
    require(_token != address(0), "Token invalido");
    require(_badgeNFT != address(0), "BadgeNFT invalido");
    require(_treasury != address(0), "Treasury invalido");
    // require(_priceFeed != address(0), "PriceFeed invalido"); // REMOVIDO v0.5.1
    
    token = IERC20(_token);
    badgeNFT = IBadgeNFT(_badgeNFT);
    treasury = _treasury;
    // priceFeed = AggregatorV3Interface(_priceFeed); // REMOVIDO v0.5.1
    }
    
    /**
    
    - @dev ROTA 1: FLUXX (Stake Fixo de 500 $FLUXX = $50 USD @ Preço de Fundação)
    - Sem fiador, paga pedágio completo
    */
    function register() external nonReentrant whenNotPaused {
    require(!isMember[msg.sender], "Ja e membro");
        
        // USE A CONSTANTE FIXA (v0.5.1)
        uint256 stakeEmToken = STAKE_LOBO_FIXO; // 500 $FLUXX
        
        require(
        token.balanceOf(msg.sender) >= stakeEmToken,
        "Saldo de token insuficiente"
        );
        
        // Transfere stake para Treasury
        require(
        token.transferFrom(msg.sender, treasury, stakeEmToken),
        "Transferencia falhou"
        );
        
        // Minta Badge de Membro Ativo
        badgeNFT.mint(msg.sender, 1, 1, "");
        
        // Registra membro
        isMember[msg.sender] = true;
        memberSince[msg.sender] = block.timestamp;
        fiadorDe[msg.sender] = address(0); // Sem fiador
        stakeDoFiador[msg.sender] = stakeEmToken; // Registra stake do membro
        slotsDisponiveis[msg.sender] = MAX_FIANCA; // Inicializa com 5 slots
        totalMembers++;
        totalLobos++;
        
        emit MemberRegistered(
        msg.sender,
        50 * 1e18, // $50 USD (para compatibilidade com eventos)
        stakeEmToken,
        address(0),
        block.timestamp
        );
        }
        
    
    /**
    
    - @dev ROTA 2: Indicado com Fiador (Stake de $10 USD)
    - @param _fiador Endereço do membro que indica (se torna fiador)
    */
    function registerWithGuarantor(address _fiador)
    external
    nonReentrant
    whenNotPaused
    {
    require(!isMember[msg.sender], "Ja e membro");
        
        // VALIDAÇÕES DO FIADOR
        require(_fiador != address(0), "Fiador invalido");
        require(_fiador != msg.sender, "Nao pode ser fiador de si mesmo");
        require(isMember[_fiador], "Fiador nao e membro");
        require(slotsDisponiveis[_fiador] > 0, "Fiador sem slots disponiveis");
        
        // Valida que fiador tem stake suficiente (se registrou via stake, não via fiança)
        if (fiadorDe[_fiador] == address(0)) {
            // Fiador é "lobo" (registrou via stake), precisa ter stake mínimo
            require(
                stakeDoFiador[_fiador] >= STAKE_LOBO_FIXO || 
                token.balanceOf(_fiador) >= STAKE_LOBO_FIXO,
                "Fiador sem stake suficiente"
            );
        }
        
        // OPCIONAL: Exigir que fiador tenha badges de impacto
        // require(
        //     badgeNFT.balanceOf(_fiador, 3) > 0, // BADGE_ID_APLICADOR
        //     "Fiador precisa ter badge de impacto"
        // );
        
        // USE A CONSTANTE FIXA (v0.5.1)
        uint256 stakeEmToken = STAKE_SOCIAL_FIXO; // 100 $FLUXX
        
        require(
        token.balanceOf(msg.sender) >= stakeEmToken,
        "Saldo de token insuficiente"
        );
        
        // Transfere stake para Treasury
        require(
        token.transferFrom(msg.sender, treasury, stakeEmToken),
        "Transferencia falhou"
        );
        
        // Minta Badge de Membro Ativo
        badgeNFT.mint(msg.sender, 1, 1, "");
        
        // VÍNCULO ON-CHAIN: Registra fiança
        fiadorDe[msg.sender] = _fiador;
        contadorFiador[_fiador]++;
        indicadosPor[_fiador].push(msg.sender);
        slotsDisponiveis[_fiador]--; // Consome 1 slot do fiador
        
        // Registra membro
        isMember[msg.sender] = true;
        memberSince[msg.sender] = block.timestamp;
        slotsDisponiveis[msg.sender] = MAX_FIANCA; // Novo membro também tem 5 slots
        totalMembers++;
        totalIndicados++;
        
        // BÔNUS: Minta badge de Referral para o fiador
        badgeNFT.mint(_fiador, 4, 1, ""); // BADGE_ID_REFERRAL = 4 (definido em BadgeNFT.sol)
        
        emit MemberRegistered(
        msg.sender,
        10 * 1e18, // $10 USD (para compatibilidade com eventos)
        stakeEmToken,
        _fiador,
        block.timestamp
        );
        }
        
    
    /**
    
    - @dev REMOVIDO v0.5.1 - Esta função será implementada na v0.5.2 com Oracle
    - @dev Calcula quantidade de $FLUXX equivalente ao valor em USD
    - @param amountUSD Valor em USD (18 decimais)
    - @return Quantidade em $FLUXX
    */
    // function _getAmountInTokens(uint256 amountUSD) internal view returns (uint256) {
    //     // REMOVIDO v0.5.1 - Oracle será implementado na v0.5.2 pós-liquidez
    // }
        
    
    /**
    
    - @dev Consulta stake atual em $FLUXX para cada rota (Preço Fixo v0.5.1)
    */
    function getStakeRequirements() external pure returns (
    uint256 FLUXXEmToken,
    uint256 socialEmToken,
    uint256 precoTokenUSD
    ) {
    // Preço de Fundação fixo: $0.10 por FLUXX
    precoTokenUSD = PRECO_FUNDACAO_USD; // $0.10 (18 decimais)
    
    FLUXXEmToken = STAKE_LOBO_FIXO; // 500 $FLUXX
    socialEmToken = STAKE_SOCIAL_FIXO; // 100 $FLUXX
    }
        
    
    /**
    
    - @dev [FASE 1] Penaliza fiador quando indicado infringe regras
    - @param _infrator Membro que cometeu infração
    - Chamado por CollabEngine/DisputeEngine
    */
    function slashGuarantor(address _infrator) external {
    // TODO: Implementar controle de acesso (apenas DisputeEngine)
    // require(msg.sender == address(disputeEngine), "Nao autorizado");
        
        address fiador = fiadorDe[_infrator];
        if (fiador != address(0)) {
        // Penalidade: Remove 1 slot disponível (impede novas indicações)
        if (slotsDisponiveis[fiador] > 0) {
        slotsDisponiveis[fiador]--;
        }
        
        // Reduz stake do fiador (penalidade de 10% do stake mínimo)
        uint256 penalidade = STAKE_SOCIAL_FIXO / 10; // 10 FLUXX (10% de 100)
        if (stakeDoFiador[fiador] >= penalidade) {
            stakeDoFiador[fiador] -= penalidade;
        } else {
            stakeDoFiador[fiador] = 0;
        }
        
        emit FiadorPenalizado(fiador, _infrator, penalidade);
        
        // FUTURO: Penalidades mais severas (queimar badges, remover stake do Treasury)
        }
        }
        
    
    /**
    
    - @dev Consulta lista de indicados por um fiador
    */
    function getIndicados(address _fiador) external view returns (address[] memory) {
    return indicadosPor[_fiador];
    }
    
    /**
    
    - @dev Verifica se endereço é membro
    */
    function checkMembership(address account) external view returns (bool) {
    return isMember[account];
    }
    
    /**
    
    - @dev REMOVIDO v0.5.1 - Esta função será implementada na v0.5.2 com Oracle
    - @dev Atualiza endereço do Oracle (apenas owner)
    */
    // function updatePriceFeed(address _newPriceFeed) external onlyOwner {
    //     // REMOVIDO v0.5.1 - Oracle será implementado na v0.5.2 pós-liquidez
    // }
    
    /**
    
    - @dev Atualiza endereço do Treasury
    */
    function updateTreasury(address _treasury) external onlyOwner {
    require(_treasury != address(0), "Endereco invalido");
    treasury = _treasury;
    }
    
    /**
    
    - @dev Pausa registros (emergência)
    */
    function pause() external onlyOwner {
    _pause();
    }
    
    /**
    
    - @dev Despausa registros
    */
    function unpause() external onlyOwner {
    _unpause();
    }
    }