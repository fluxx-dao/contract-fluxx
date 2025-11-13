// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 *
 * @title Treasury
 * @dev Cofre da DAO que armazena fundos
 * Apenas Governance pode autorizar saques
 */
contract Treasury is Ownable {
    
    address public governanceContract;
    
    // Timelock para saques
    uint256 public constant TIMELOCK_DELAY = 2 days;
    mapping(bytes32 => uint256) public timelockQueue;
    
    event GovernanceSet(address indexed governance);
    event TokensWithdrawn(address indexed token, address indexed to, uint256 amount);
    event EtherWithdrawn(address indexed to, uint256 amount);
    event FundsReceived(address indexed from, uint256 amount);
    event WithdrawalQueued(bytes32 indexed txHash, address indexed token, address indexed to, uint256 amount, uint256 executeAfter);
    
    modifier onlyGovernance() {
        require(msg.sender == governanceContract, "So a governanca");
        _;
    }
    
    constructor(address initialOwner) Ownable(initialOwner) {}
    
    /**
     *
     * @dev Define o contrato de Governance
     * @param _governance Endereço do contrato Governance
     */
    function setGovernance(address _governance) external onlyOwner {
        require(_governance != address(0), "Endereco invalido");
        governanceContract = _governance;
        emit GovernanceSet(_governance);
    }
    
    /**
     *
     * @dev Enfileira saque de tokens (com timelock)
     * @param tokenAddress Endereço do token
     * @param amount Quantidade
     * @param to Destinatário
     * @return txHash Hash da transação enfileirada
     */
    function queueWithdrawal(
        address tokenAddress,
        uint256 amount,
        address to
    ) external onlyGovernance returns (bytes32) {
        require(to != address(0), "Endereco invalido");
        require(amount > 0, "Quantidade invalida");
        
        bytes32 txHash = keccak256(abi.encodePacked(tokenAddress, amount, to, block.timestamp));
        uint256 executeAfter = block.timestamp + TIMELOCK_DELAY;
        
        timelockQueue[txHash] = executeAfter;
        emit WithdrawalQueued(txHash, tokenAddress, to, amount, executeAfter);
        
        return txHash;
    }
    
    /**
     *
     * @dev Executa saque de tokens após timelock
     * @param txHash Hash da transação enfileirada
     * @param tokenAddress Endereço do token
     * @param amount Quantidade
     * @param to Destinatário
     */
    function executeWithdrawal(
        bytes32 txHash,
        address tokenAddress,
        uint256 amount,
        address to
    ) external onlyGovernance {
        require(timelockQueue[txHash] != 0, "Transacao nao enfileirada");
        require(block.timestamp >= timelockQueue[txHash], "Timelock ainda ativo");
        
        // Verifica que os parâmetros correspondem ao hash
        bytes32 expectedHash = keccak256(abi.encodePacked(tokenAddress, amount, to, timelockQueue[txHash] - TIMELOCK_DELAY));
        require(txHash == expectedHash, "Parametros nao correspondem");
        
        delete timelockQueue[txHash];
        
        IERC20 token = IERC20(tokenAddress);
        require(token.balanceOf(address(this)) >= amount, "Saldo insuficiente");
        
        require(token.transfer(to, amount), "Transferencia falhou");
        emit TokensWithdrawn(tokenAddress, to, amount);
    }
    
    
    /**
     *
     * @dev Saca tokens ERC20 do cofre (apenas owner)
     * @param tokenAddress Endereço do token
     * @param amount Quantidade
     * @param to Destinatário
     * CRÍTICO: Apenas Owner pode chamar (para distribuição inicial)
     */
    function withdrawTokensByOwner(
        address tokenAddress,
        uint256 amount,
        address to
    ) external onlyOwner {
        require(to != address(0), "Endereco invalido");
        require(amount > 0, "Quantidade invalida");
        
        IERC20 token = IERC20(tokenAddress);
        require(token.balanceOf(address(this)) >= amount, "Saldo insuficiente");
        
        require(token.transfer(to, amount), "Transferencia falhou");
        emit TokensWithdrawn(tokenAddress, to, amount);
    }
        
    
    /**
     *
     * @dev Saca ETH/MATIC do cofre
     * @param amount Quantidade
     * @param to Destinatário
     */
    function withdrawEther(
        uint256 amount,
        address payable to
    ) external onlyGovernance {
        require(to != address(0), "Endereco invalido");
        require(amount > 0, "Quantidade invalida");
        require(address(this).balance >= amount, "Saldo insuficiente");
        
        (bool success, ) = to.call{value: amount}("");
        require(success, "Transferencia falhou");
        emit EtherWithdrawn(to, amount);
    }
        
    
    /**
     *
     * @dev Consulta saldo de token ERC20
     */
    function getTokenBalance(address tokenAddress) external view returns (uint256) {
        return IERC20(tokenAddress).balanceOf(address(this));
    }
    
    /**
     *
     * @dev Consulta saldo de ETH/MATIC
     */
    function getEtherBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    /**
     *
     * @dev Recebe ETH/MATIC
     */
    receive() external payable {
        emit FundsReceived(msg.sender, msg.value);
    }
    
    fallback() external payable {
        emit FundsReceived(msg.sender, msg.value);
    }
}
