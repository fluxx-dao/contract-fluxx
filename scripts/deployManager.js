const hre = require("hardhat");

/**
 * 🛡️ Deploy FluxxDAOManager (Wrapper para Thirdweb)
 * 
 * Este script deploya o contrato wrapper minimalista que implementa
 * as interfaces necessárias para compatibilidade com Thirdweb Dashboard.
 * 
 * ⚠️ IMPORTANTE:
 * - Este contrato NÃO altera os contratos core da DAO
 * - É apenas uma "capa administrativa" para o dashboard Thirdweb
 * - Os contratos originais continuam funcionando normalmente
 * 
 * Uso:
 *   npx hardhat run scripts/deployManager.js --network polygon
 */

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("🔷 Deployando FluxxDAOManager com a conta:", deployer.address);
  console.log("💰 Saldo:", hre.ethers.formatEther(await hre.ethers.provider.getBalance(deployer.address)), "POL\n");

  // ⚠️ CRÍTICO: Endereço do Gnosis Safe (deve ser configurado no .env)
  const GNOSIS_SAFE_ADDRESS = process.env.GNOSIS_SAFE_ADDRESS;
  if (!GNOSIS_SAFE_ADDRESS) {
    throw new Error("❌ GNOSIS_SAFE_ADDRESS não configurado no .env!");
  }

  // Endereço do contrato Token (ou outro contrato DAO principal)
  // Você pode mudar isso para o contrato que quer "gerenciar"
  const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS || "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA";

  console.log("🛡️  Gnosis Safe (Owner):", GNOSIS_SAFE_ADDRESS);
  console.log("📦 Contrato DAO (referência):", TOKEN_ADDRESS);
  console.log("⚠️  Este wrapper é apenas para compatibilidade Thirdweb\n");

  // ============================================
  // DEPLOY MANAGER
  // ============================================
  console.log("🚀 Deployando FluxxDAOManager...");
  const FluxxDAOManager = await hre.ethers.getContractFactory("FluxxDAOManager");
  const manager = await FluxxDAOManager.deploy(GNOSIS_SAFE_ADDRESS, TOKEN_ADDRESS);
  await manager.waitForDeployment();
  const managerAddress = await manager.getAddress();
  
  console.log("✅ FluxxDAOManager deployado em:", managerAddress);
  console.log("   Owner:", await manager.owner());
  console.log("   DAO Reference:", await manager.dao());
  
  try {
    const contractURI = await manager.contractURI();
    console.log("   Contract URI:", contractURI || "(vazio - configurar depois)");
  } catch (e) {
    console.log("   Contract URI: (erro ao ler)");
  }
  
  try {
    const primarySale = await manager.primarySaleRecipient();
    console.log("   Primary Sale Recipient:", primarySale || "(zero - não usado)");
  } catch (e) {
    console.log("   Primary Sale Recipient: (erro ao ler)");
  }
  
  try {
    const royalty = await manager.royaltyRecipient();
    console.log("   Royalty Recipient:", royalty || "(zero - não usado)");
  } catch (e) {
    console.log("   Royalty Recipient: (erro ao ler)");
  }
  
  try {
    const platformFee = await manager.platformFeeRecipient();
    console.log("   Platform Fee Recipient:", platformFee || "(zero - não usado)\n");
  } catch (e) {
    console.log("   Platform Fee Recipient: (erro ao ler)\n");
  }

  // ============================================
  // RESUMO
  // ============================================
  console.log("=".repeat(80));
  console.log("📋 RESUMO DO DEPLOY");
  console.log("=".repeat(80));
  console.log("\n✅ FluxxDAOManager deployado com sucesso!");
  console.log("\n📝 Próximos Passos (Opcional):");
  console.log("   1. Se quiser usar Thirdweb Dashboard:");
  console.log("      - Configure contractURI via Safe:");
  console.log(`      - Manager.setContractURI("ipfs://...")`);
  console.log("\n   2. Se preferir front próprio (recomendado):");
  console.log("      - Ignore este contrato");
  console.log("      - Use Wagmi + Privy para ler contratos diretamente");
  console.log("      - Armazene metadados no IPFS");
  console.log("\n⚠️  LEMBRE-SE:");
  console.log("   - Este wrapper NÃO afeta os contratos core da DAO");
  console.log("   - Token, Treasury, Governance continuam funcionando normalmente");
  console.log("   - Este é apenas uma 'capa' para compatibilidade Thirdweb\n");

  // Salvar endereço (opcional)
  const fs = require("fs");
  const deploymentInfo = {
    network: "polygon",
    deployer: deployer.address,
    manager: managerAddress,
    dao: TOKEN_ADDRESS,
    owner: GNOSIS_SAFE_ADDRESS,
    timestamp: new Date().toISOString(),
  };

  fs.writeFileSync(
    "deployment-manager.json",
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("💾 Informações salvas em: deployment-manager.json");
  console.log("\n" + "=".repeat(80));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

