// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**

- @title FLUXX DAO
- @dev Token de utilidade da DAO ($FLUXX)
- Supply: 100.000.000 (100 milhões)
- Apenas Treasury/Governance podem mintar (inflação controlada)
*/
contract Token is ERC20, Ownable {
    
    uint256 public constant INITIAL_SUPPLY = 100_000_000 * 1e18; // 100 milhões
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 1e18;   // Cap: 1 bilhão
    
    mapping(address => bool) public authorizedMinters;
    
    event MinterAuthorized(address indexed minter);
    event MinterRevoked(address indexed minter);
    event TokensBurned(address indexed from, uint256 amount);
    
    constructor(
    string memory name,
    string memory symbol,
    address initialOwner,
    address treasury
    ) ERC20(name, symbol) Ownable(initialOwner) {
    require(treasury != address(0), "Treasury invalido");
    
    // Minta supply inicial para o Treasury
    _mint(treasury, INITIAL_SUPPLY);
    }
    
    /**
    
    - @dev Autoriza um endereço a mintar tokens
    - @param minter Endereço do Treasury ou Governance
    */
    function authorizeMinter(address minter) external onlyOwner {
    require(minter != address(0), "Endereco invalido");
    authorizedMinters[minter] = true;
    emit MinterAuthorized(minter);
    }
    
    /**
    
    - @dev Revoga autorização de mint
    - @param minter Endereço a ser revogado
    */
    function revokeMinter(address minter) external onlyOwner {
    authorizedMinters[minter] = false;
    emit MinterRevoked(minter);
    }
    
    /**
    
    - @dev Minta novos tokens (inflação controlada)
    - @param to Destinatário
    - @param amount Quantidade
    - CRÍTICO: Apenas Treasury/Governance podem chamar
    */
    function mint(address to, uint256 amount) external {
    require(authorizedMinters[msg.sender], "Nao autorizado a mintar");
    require(to != address(0), "Endereco invalido");
    require(totalSupply() + amount <= MAX_SUPPLY, "Supply maximo atingido");
        
        _mint(to, amount);
        }
        
    
    /**
    
    - @dev Queima tokens (deflação)
    - @param amount Quantidade a queimar
    */
    function burn(uint256 amount) external {
    _burn(msg.sender, amount);
    emit TokensBurned(msg.sender, amount);
    }
    
    /**
    
    - @dev Queima tokens de outro endereço (com aprovação)
    - @param from Endereço de origem
    - @param amount Quantidade
    */
    function burnFrom(address from, uint256 amount) external {
    _spendAllowance(from, msg.sender, amount);
    _burn(from, amount);
    emit TokensBurned(from, amount);
    }
    
    /**
    
    - @dev Retorna supply disponível para mint
    */
    function remainingMintableSupply() external view returns (uint256) {
    return MAX_SUPPLY - totalSupply();
    }
    }