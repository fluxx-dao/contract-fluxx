const hre = require("hardhat");

/**
 * 🚀 DEPLOY FLUXX DAO v0.5.1+ - Polygon Mainnet
 * 
 * ✅ VERSÃO COM MELHORIAS DE SEGURANÇA:
 * - Timelock de 2 dias no Treasury
 * - Quorum proporcional no Governance (20%)
 * - Validação de membership em funções críticas
 * - Timeout para missões travadas (14 dias)
 * - Sistema de fiança melhorado
 * - Política de burn de badges controlada
 * 
 * ⚠️  IMPORTANTE: Antes de fazer deploy:
 * 1. Crie um Gnosis Safe na Polygon (https://app.safe.global/)
 * 2. Configure multi-sig: 2 de 3 ou 3 de 5 signatários
 * 3. Coloque o endereço do Safe em GNOSIS_SAFE_ADDRESS no .env
 * 4. Tenha pelo menos 5-10 POL na wallet de deploy (token nativo da Polygon PoS)
 * 
 * 📋 Ordem de Deploy:
 * 1. Treasury (precisa do Safe como owner) - COM TIMELOCK
 * 2. Token (precisa do Safe como owner + Treasury para mint inicial)
 * 3. BadgeNFT (precisa do Safe como owner) - COM SISTEMA DE BURN
 * 4. Governance (precisa do Safe como owner + BadgeNFT + Treasury) - COM QUORUM PROPORCIONAL
 * 5. Membership (precisa do Safe como owner + Token + BadgeNFT + Treasury) - COM VALIDAÇÃO DE FIADOR
 * 6. CollabEngine (não precisa owner, mas precisa Token + Membership + BadgeNFT) - COM TIMEOUT
 */

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("🔷 Deployando contratos com a conta:", deployer.address);
  console.log("💰 Saldo da conta:", hre.ethers.formatEther(await hre.ethers.provider.getBalance(deployer.address)), "POL\n");

  // ⚠️  CRÍTICO: Endereço do Gnosis Safe (deve ser configurado no .env)
  const GNOSIS_SAFE_ADDRESS = process.env.GNOSIS_SAFE_ADDRESS;
  if (!GNOSIS_SAFE_ADDRESS) {
    throw new Error("❌ GNOSIS_SAFE_ADDRESS não configurado no .env!");
  }
  console.log("🛡️  Gnosis Safe (Owner):", GNOSIS_SAFE_ADDRESS);
  console.log("⚠️  Verifique se este é o endereço correto do seu Safe!\n");

  // Parâmetros do Token
  const TOKEN_NAME = "FLUXX DAO";
  const TOKEN_SYMBOL = "FLUXX";
  const BADGE_BASE_URI = "https://fluxx.space/badges/";

  console.log("📦 Iniciando deploy dos contratos...\n");

  // ============================================
  // 1. DEPLOY TREASURY
  // ============================================
  console.log("1️⃣  Deployando Treasury...");
  const Treasury = await hre.ethers.getContractFactory("Treasury");
  const treasury = await Treasury.deploy(GNOSIS_SAFE_ADDRESS);
  await treasury.waitForDeployment();
  const treasuryAddress = await treasury.getAddress();
  console.log("✅ Treasury deployado em:", treasuryAddress);
  console.log("   Owner:", await treasury.owner(), "\n");

  // ============================================
  // 2. DEPLOY TOKEN
  // ============================================
  console.log("2️⃣  Deployando Token...");
  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy(
    TOKEN_NAME,
    TOKEN_SYMBOL,
    GNOSIS_SAFE_ADDRESS,
    treasuryAddress
  );
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("✅ Token deployado em:", tokenAddress);
  console.log("   Owner:", await token.owner());
  console.log("   Supply inicial:", hre.ethers.formatEther(await token.balanceOf(treasuryAddress)), "FLUXX\n");

  // ============================================
  // 3. DEPLOY BADGE NFT
  // ============================================
  console.log("3️⃣  Deployando BadgeNFT...");
  const BadgeNFT = await hre.ethers.getContractFactory("BadgeNFT");
  const badgeNFT = await BadgeNFT.deploy(GNOSIS_SAFE_ADDRESS, BADGE_BASE_URI);
  await badgeNFT.waitForDeployment();
  const badgeNFTAddress = await badgeNFT.getAddress();
  console.log("✅ BadgeNFT deployado em:", badgeNFTAddress);
  console.log("   Owner:", await badgeNFT.owner(), "\n");

  // ============================================
  // 4. DEPLOY GOVERNANCE
  // ============================================
  console.log("4️⃣  Deployando Governance...");
  const Governance = await hre.ethers.getContractFactory("Governance");
  const governance = await Governance.deploy(
    GNOSIS_SAFE_ADDRESS,
    badgeNFTAddress,
    treasuryAddress
  );
  await governance.waitForDeployment();
  const governanceAddress = await governance.getAddress();
  console.log("✅ Governance deployado em:", governanceAddress);
  console.log("   Owner:", await governance.owner(), "\n");

  // ============================================
  // 5. DEPLOY MEMBERSHIP
  // ============================================
  console.log("5️⃣  Deployando Membership...");
  const Membership = await hre.ethers.getContractFactory("Membership");
  const membership = await Membership.deploy(
    GNOSIS_SAFE_ADDRESS,
    tokenAddress,
    badgeNFTAddress,
    treasuryAddress
  );
  await membership.waitForDeployment();
  const membershipAddress = await membership.getAddress();
  console.log("✅ Membership deployado em:", membershipAddress);
  console.log("   Owner:", await membership.owner(), "\n");

  // ============================================
  // 6. DEPLOY COLLAB ENGINE
  // ============================================
  console.log("6️⃣  Deployando CollabEngine...");
  const CollabEngine = await hre.ethers.getContractFactory("CollabEngine");
  const collabEngine = await CollabEngine.deploy(
    tokenAddress,
    membershipAddress,
    badgeNFTAddress
  );
  await collabEngine.waitForDeployment();
  const collabEngineAddress = await collabEngine.getAddress();
  console.log("✅ CollabEngine deployado em:", collabEngineAddress, "\n");

  // ============================================
  // 7. CONFIGURAÇÃO PÓS-DEPLOY
  // ============================================
  console.log("⚙️  Configurando permissões entre contratos...\n");

  // IMPORTANTE: As próximas transações precisam ser feitas pelo Gnosis Safe!
  // Você precisará criar transações no Safe para executar essas configurações.
  console.log("⚠️  ATENÇÃO: As seguintes configurações devem ser feitas via Gnosis Safe:");
  console.log("   (Crie transações no Safe para executar cada uma)\n");

  console.log("📋 Configurações necessárias:\n");

  // 7.1 Token: Autorizar Treasury e Governance como minters
  console.log("1. Token.authorizeMinter(Treasury)");
  console.log("   Contrato: Token");
  console.log("   Função: authorizeMinter");
  console.log("   Parâmetro:", treasuryAddress);
  console.log("   Execute via Safe:", tokenAddress, "\n");

  console.log("2. Token.authorizeMinter(Governance)");
  console.log("   Contrato: Token");
  console.log("   Função: authorizeMinter");
  console.log("   Parâmetro:", governanceAddress);
  console.log("   Execute via Safe:", tokenAddress, "\n");

  // 7.2 Treasury: Definir Governance
  console.log("3. Treasury.setGovernance(Governance)");
  console.log("   Contrato: Treasury");
  console.log("   Função: setGovernance");
  console.log("   Parâmetro:", governanceAddress);
  console.log("   Execute via Safe:", treasuryAddress, "\n");

  // 7.3 BadgeNFT: Autorizar Membership e CollabEngine como minters
  console.log("4. BadgeNFT.authorizeMinter(Membership)");
  console.log("   Contrato: BadgeNFT");
  console.log("   Função: authorizeMinter");
  console.log("   Parâmetro:", membershipAddress);
  console.log("   Execute via Safe:", badgeNFTAddress, "\n");

  console.log("5. BadgeNFT.authorizeMinter(CollabEngine)");
  console.log("   Contrato: BadgeNFT");
  console.log("   Função: authorizeMinter");
  console.log("   Parâmetro:", collabEngineAddress);
  console.log("   Execute via Safe:", badgeNFTAddress, "\n");

  // 7.4 BadgeNFT: Autorizar Governance como burner (para punições)
  console.log("6. BadgeNFT.authorizeBurner(Governance)");
  console.log("   Contrato: BadgeNFT");
  console.log("   Função: authorizeBurner");
  console.log("   Parâmetro:", governanceAddress);
  console.log("   Execute via Safe:", badgeNFTAddress);
  console.log("   ⚠️  IMPORTANTE: Permite que Governance queime badges em punições\n");

  // 7.5 Governance: Configurar quorum proporcional (opcional - já tem default de 20%)
  console.log("7. Governance.atualizarParametros() [OPCIONAL]");
  console.log("   Contrato: Governance");
  console.log("   Função: atualizarParametros");
  console.log("   Parâmetros:");
  console.log("     - duracaoVotacao: 259200 (3 dias em segundos)");
  console.log("     - quorumMinimo: 10 (fallback mínimo)");
  console.log("   Nota: quorumPercentual já está em 20% por padrão");
  console.log("   Execute via Safe:", governanceAddress, "\n");

  // ============================================
  // 8. VERIFICAÇÕES PÓS-DEPLOY
  // ============================================
  console.log("🔍 Verificações pós-deploy:\n");
  
  // Verificar Timelock no Treasury
  const timelockDelay = await treasury.TIMELOCK_DELAY();
  console.log("✅ Treasury Timelock:", hre.ethers.formatUnits(timelockDelay, 0) / 86400, "dias");
  
  // Verificar Quorum no Governance
  const quorumPercentual = await governance.quorumPercentual();
  console.log("✅ Governance Quorum Percentual:", quorumPercentual.toString(), "%");
  
  // Verificar Timeout no CollabEngine
  const timeoutMissao = await collabEngine.TIMEOUT_MISSAO();
  console.log("✅ CollabEngine Timeout:", hre.ethers.formatUnits(timeoutMissao, 0) / 86400, "dias");
  
  console.log("\n");

  // ============================================
  // 9. RESUMO FINAL
  // ============================================
  console.log("=".repeat(60));
  console.log("✅ DEPLOY CONCLUÍDO!");
  console.log("=".repeat(60));
  console.log("\n📋 Endereços dos Contratos:\n");
  console.log("Treasury:     ", treasuryAddress);
  console.log("Token:        ", tokenAddress);
  console.log("BadgeNFT:     ", badgeNFTAddress);
  console.log("Governance:   ", governanceAddress);
  console.log("Membership:   ", membershipAddress);
  console.log("CollabEngine: ", collabEngineAddress);
  console.log("\n🛡️  Owner (Gnosis Safe):", GNOSIS_SAFE_ADDRESS);
  console.log("\n⚠️  PRÓXIMOS PASSOS:");
  console.log("1. Acesse o Gnosis Safe:", "https://app.safe.global/");
  console.log("2. Execute as 7 configurações listadas acima");
  console.log("3. Verifique os contratos no PolygonScan");
  console.log("4. Teste as funções básicas");
  console.log("5. ⚠️  IMPORTANTE: Use withdrawTokensByOwner() para distribuição inicial");
  console.log("   (Função sem timelock, apenas para owner/Safe)");
  console.log("6. Após configurar Governance, use queueWithdrawal() + executeWithdrawal()");
  console.log("   (Sistema com timelock de 2 dias)\n");
  
  console.log("📚 NOVAS FUNCIONALIDADES:");
  console.log("   ✅ Timelock: Saques via Governance requerem 2 dias de espera");
  console.log("   ✅ Quorum Proporcional: 20% dos votantes elegíveis");
  console.log("   ✅ Timeout Missões: Cancelamento automático após 14 dias");
  console.log("   ✅ Validação Fiador: Verifica stake do fiador");
  console.log("   ✅ Burn Controlado: Apenas authorizedBurner pode queimar badges\n");

  // Salvar endereços em arquivo (opcional)
  const deploymentInfo = {
    network: "polygon",
    deployer: deployer.address,
    gnosisSafe: GNOSIS_SAFE_ADDRESS,
    contracts: {
      treasury: treasuryAddress,
      token: tokenAddress,
      badgeNFT: badgeNFTAddress,
      governance: governanceAddress,
      membership: membershipAddress,
      collabEngine: collabEngineAddress,
    },
    timestamp: new Date().toISOString(),
  };

  const fs = require("fs");
  fs.writeFileSync(
    "deployment-info.json",
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log("💾 Informações de deploy salvas em: deployment-info.json\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

