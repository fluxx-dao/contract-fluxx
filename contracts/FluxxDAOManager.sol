// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FluxxDAOManager
 * @dev Wrapper minimalista para compatibilidade com Thirdweb Dashboard
 * 
 * Este contrato NÃO altera os contratos core da DAO.
 * Ele apenas expõe as interfaces que a Thirdweb exige para funcionar.
 * 
 * A DAO permanece intacta e funcional independentemente deste wrapper.
 * 
 * ESTRATÉGIA:
 * - Este é apenas uma "capa administrativa" para o dashboard Thirdweb
 * - Os contratos core (Token, Treasury, Governance, etc) não são modificados
 * - Front-end pode ler metadados deste contrato se necessário
 * - Mas a lógica real continua nos contratos originais
 */
contract FluxxDAOManager is Ownable {
    
    // Referência ao contrato DAO principal (Token, BadgeNFT, etc)
    address public dao;
    
    // ============================================
    // IContractMetadata (Thirdweb)
    // ============================================
    string private _contractURI;
    
    function contractURI() external view returns (string memory) {
        return _contractURI;
    }
    
    function setContractURI(string memory _uri) external onlyOwner {
        _contractURI = _uri;
    }
    
    // ============================================
    // IPrimarySale (Thirdweb)
    // ============================================
    address private _primarySaleRecipient;
    
    function primarySaleRecipient() external view returns (address) {
        return _primarySaleRecipient;
    }
    
    function setPrimarySaleRecipient(address _recipient) external onlyOwner {
        _primarySaleRecipient = _recipient;
        // Emitir evento se necessário para compatibilidade
    }
    
    // ============================================
    // IRoyalty (Thirdweb)
    // ============================================
    address private _royaltyRecipient;
    uint256 private _royaltyBps; // Basis points (10000 = 100%)
    
    function royaltyInfo(uint256 /* tokenId */, uint256 salePrice) 
        external 
        view 
        returns (address receiver, uint256 royaltyAmount) 
    {
        receiver = _royaltyRecipient;
        royaltyAmount = (salePrice * _royaltyBps) / 10000;
    }
    
    function royaltyRecipient() external view returns (address) {
        return _royaltyRecipient;
    }
    
    function royaltyBps() external view returns (uint256) {
        return _royaltyBps;
    }
    
    function setRoyaltyInfo(address _recipient, uint256 _bps) external onlyOwner {
        require(_bps <= 10000, "Royalty BPS > 100%");
        _royaltyRecipient = _recipient;
        _royaltyBps = _bps;
    }
    
    // ============================================
    // IPlatformFee (Thirdweb)
    // ============================================
    address private _platformFeeRecipient;
    uint256 private _platformFeeBps; // Basis points
    
    function platformFeeRecipient() external view returns (address) {
        return _platformFeeRecipient;
    }
    
    function platformFeeBps() external view returns (uint256) {
        return _platformFeeBps;
    }
    
    function setPlatformFeeInfo(address _recipient, uint256 _bps) external onlyOwner {
        require(_bps <= 10000, "Platform fee BPS > 100%");
        _platformFeeRecipient = _recipient;
        _platformFeeBps = _bps;
    }
    
    // ============================================
    // Constructor
    // ============================================
    constructor(address _owner, address _dao) Ownable(_owner) {
        dao = _dao;
        
        // Valores padrão (pode ser configurado depois via Safe)
        _primarySaleRecipient = address(0);
        _royaltyRecipient = address(0);
        _royaltyBps = 0;
        _platformFeeRecipient = address(0);
        _platformFeeBps = 0;
        _contractURI = ""; // Pode ser configurado com IPFS JSON depois
    }
    
    // ============================================
    // Funções Auxiliares
    // ============================================
    
    /**
     * @dev Atualiza referência ao contrato DAO (se necessário no futuro)
     */
    function setDAO(address _newDAO) external onlyOwner {
        dao = _newDAO;
    }
}

