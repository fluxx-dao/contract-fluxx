// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**

- @title BadgeNFT
- @dev NFTs Soulbound (não-transferíveis) que representam reputação
- Badges de Membro, Colaborador, Aplicador, etc.
*/
contract BadgeNFT is ERC1155, Ownable {
    
    // IDs dos Badges
    uint256 public constant BADGE_ID_MEMBRO_ATIVO = 1;
    uint256 public constant BADGE_ID_COLABORADOR = 2;
    uint256 public constant BADGE_ID_APLICADOR = 3;
    uint256 public constant BADGE_ID_REFERRAL = 4;
    
    // Apenas contratos autorizados podem mintar
    mapping(address => bool) public authorizedMinter;
    
    // Apenas owner pode queimar badges (para punições)
    mapping(address => bool) public authorizedBurner;
    
    // Metadados dos badges (opcional, para front-end)
    mapping(uint256 => string) public badgeURIs;
    
    event MinterAuthorized(address indexed minter);
    event MinterRevoked(address indexed minter);
    event BurnerAuthorized(address indexed burner);
    event BurnerRevoked(address indexed burner);
    event BadgeURISet(uint256 indexed badgeId, string uri);
    event BadgeBurned(address indexed account, uint256 indexed badgeId, uint256 amount);
    
    constructor(
    address initialOwner,
    string memory baseURI
    ) ERC1155(baseURI) Ownable(initialOwner) {}
    
    /**
    
    - @dev Autoriza um contrato a mintar badges
    - @param minter Endereço do Membership ou CollabEngine
    */
    function authorizeMinter(address minter) external onlyOwner {
    require(minter != address(0), "Endereco invalido");
    authorizedMinter[minter] = true;
    emit MinterAuthorized(minter);
    }
    
    /**
    
    - @dev Revoga autorização de mint
    */
    function revokeMinter(address minter) external onlyOwner {
    authorizedMinter[minter] = false;
    emit MinterRevoked(minter);
    }
    
    /**
    
    - @dev Minta um badge para um usuário
    - @param to Destinatário
    - @param badgeId ID do Badge
    - @param amount Quantidade (geralmente 1)
    - @param data Dados adicionais
    */
    function mint(
    address to,
    uint256 badgeId,
    uint256 amount,
    bytes memory data
    ) external {
    require(authorizedMinter[msg.sender], "Nao autorizado");
    require(to != address(0), "Endereco invalido");
    _mint(to, badgeId, amount, data);
    }
    
    /**
    
    - @dev Define URI de um badge específico
    */
    function setBadgeURI(uint256 badgeId, string memory newuri) external onlyOwner {
    badgeURIs[badgeId] = newuri;
    emit BadgeURISet(badgeId, newuri);
    }
    
    /**
    
    - @dev Retorna URI de um badge específico
    */
    function uri(uint256 badgeId) public view override returns (string memory) {
    string memory badgeURI = badgeURIs[badgeId];
    if (bytes(badgeURI).length > 0) {
    return badgeURI;
    }
    return super.uri(badgeId);
    }
    
    /**
    
    - @dev Autoriza um endereço a queimar badges (para punições)
    - @param burner Endereço autorizado (ex: Governance, DisputeEngine)
    */
    function authorizeBurner(address burner) external onlyOwner {
        require(burner != address(0), "Endereco invalido");
        authorizedBurner[burner] = true;
        emit BurnerAuthorized(burner);
    }
    
    /**
    
    - @dev Revoga autorização de burn
    */
    function revokeBurner(address burner) external onlyOwner {
        authorizedBurner[burner] = false;
        emit BurnerRevoked(burner);
    }
    
    /**
    
    - @dev Queima badges de um usuário (apenas autorizado)
    - @param account Endereço do usuário
    - @param badgeId ID do Badge
    - @param amount Quantidade a queimar
    */
    function burn(address account, uint256 badgeId, uint256 amount) external {
        require(authorizedBurner[msg.sender] || msg.sender == owner(), "Nao autorizado a queimar");
        require(account != address(0), "Endereco invalido");
        require(amount > 0, "Quantidade invalida");
        
        _burn(account, badgeId, amount);
        emit BadgeBurned(account, badgeId, amount);
    }
    
    /**
    
    - @dev LÓGICA SOULBOUND: Bloqueia todas as transferências
    - Badges só podem ser mintados (from == address(0))
    - Badges podem ser queimados apenas por authorizedBurner (to == address(0))
    - Nunca podem ser transferidos entre usuários
    */
    function _update(
    address from,
    address to,
    uint256[] memory ids,
    uint256[] memory values
    ) internal virtual override {
    // Permite MINT (from == address(0))
    // Permite BURN apenas se authorizedBurner (to == address(0) && authorizedBurner[msg.sender])
    // BLOQUEIA todas as transferências normais
    require(
    from == address(0) || 
    (to == address(0) && (authorizedBurner[msg.sender] || msg.sender == owner())),
    "Badges sao Soulbound: nao transferiveis"
    );
        
        super._update(from, to, ids, values);
        }
        }