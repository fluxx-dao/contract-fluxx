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
    
    // Metadados dos badges (opcional, para front-end)
    mapping(uint256 => string) public badgeURIs;
    
    event MinterAuthorized(address indexed minter);
    event MinterRevoked(address indexed minter);
    event BadgeURISet(uint256 indexed badgeId, string uri);
    
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
    
    - @dev LÓGICA SOULBOUND: Bloqueia todas as transferências
    - Badges só podem ser mintados (from == address(0))
    - Nunca podem ser transferidos
    */
    function _update(
    address from,
    address to,
    uint256[] memory ids,
    uint256[] memory values
    ) internal virtual override {
    // Permite MINT (from == address(0))
    // Permite BURN (to == address(0)) - opcional
    // BLOQUEIA todas as transferências normais
    require(
    from == address(0) || to == address(0),
    "Badges sao Soulbound: nao transferiveis"
    );
        
        super._update(from, to, ids, values);
        }
        }