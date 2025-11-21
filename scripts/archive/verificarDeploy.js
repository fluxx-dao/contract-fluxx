const hre = require("hardhat");

/**
 * 🔍 Verificar Deploy - FLUXX DAO
 * 
 * Verifica se todos os contratos foram deployados corretamente
 * e se as melhorias de segurança estão ativas.
 */

async function main() {
  const fs = require("fs");
  
  // Carregar informações de deploy
  let deploymentInfo;
  try {
    const data = fs.readFileSync("deployment-info.json", "utf8");
    deploymentInfo = JSON.parse(data);
  } catch (error) {
    console.error("❌ Erro ao ler deployment-info.json");
    console.error("   Execute o deploy primeiro: npx hardhat run scripts/deploy.js --network polygon");
    process.exit(1);
  }

  console.log("🔍 Verificando Deploy dos Contratos FLUXX DAO\n");
  console.log("=".repeat(80));
  console.log("📋 Endereços dos Contratos:\n");
  
  const contracts = deploymentInfo.contracts;
  console.log("Treasury:     ", contracts.treasury);
  console.log("Token:        ", contracts.token);
  console.log("BadgeNFT:     ", contracts.badgeNFT);
  console.log("Governance:   ", contracts.governance);
  console.log("Membership:   ", contracts.membership);
  console.log("CollabEngine: ", contracts.collabEngine);
  console.log("\n" + "=".repeat(80));

  const [signer] = await hre.ethers.getSigners();
  console.log("\n🔷 Verificando com a conta:", signer.address);
  console.log("💰 Saldo:", hre.ethers.formatEther(await hre.ethers.provider.getBalance(signer.address)), "POL\n");

  // Verificar cada contrato
  const verificacoes = [];

  // 1. Treasury
  console.log("1️⃣  Verificando Treasury...");
  try {
    const Treasury = await hre.ethers.getContractFactory("Treasury");
    const treasury = Treasury.attach(contracts.treasury);
    
    const owner = await treasury.owner();
    const timelockDelay = await treasury.TIMELOCK_DELAY();
    const governance = await treasury.governanceContract();
    
    verificacoes.push({
      contrato: "Treasury",
      owner: owner === deploymentInfo.gnosisSafe,
      timelock: timelockDelay.toString() === "172800", // 2 dias em segundos
      governance: governance !== "0x0000000000000000000000000000000000000000"
    });
    
    console.log("   ✅ Owner:", owner === deploymentInfo.gnosisSafe ? "✅ Correto" : "❌ Errado");
    console.log("   ✅ Timelock:", hre.ethers.formatUnits(timelockDelay, 0) / 86400, "dias");
    console.log("   ", governance !== "0x0000000000000000000000000000000000000000" ? "✅" : "⚠️ ", "Governance:", governance || "Não configurado");
  } catch (error) {
    console.log("   ❌ Erro ao verificar Treasury:", error.message);
  }

  // 2. Token
  console.log("\n2️⃣  Verificando Token...");
  try {
    const Token = await hre.ethers.getContractFactory("Token");
    const token = Token.attach(contracts.token);
    
    const owner = await token.owner();
    const totalSupply = await token.totalSupply();
    const treasuryBalance = await token.balanceOf(contracts.treasury);
    
    verificacoes.push({
      contrato: "Token",
      owner: owner === deploymentInfo.gnosisSafe,
      supply: totalSupply.toString() === "100000000000000000000000000" // 100 milhões
    });
    
    console.log("   ✅ Owner:", owner === deploymentInfo.gnosisSafe ? "✅ Correto" : "❌ Errado");
    console.log("   ✅ Total Supply:", hre.ethers.formatEther(totalSupply), "FLUXX");
    console.log("   ✅ Treasury Balance:", hre.ethers.formatEther(treasuryBalance), "FLUXX");
  } catch (error) {
    console.log("   ❌ Erro ao verificar Token:", error.message);
  }

  // 3. BadgeNFT
  console.log("\n3️⃣  Verificando BadgeNFT...");
  try {
    const BadgeNFT = await hre.ethers.getContractFactory("BadgeNFT");
    const badgeNFT = BadgeNFT.attach(contracts.badgeNFT);
    
    const owner = await badgeNFT.owner();
    
    verificacoes.push({
      contrato: "BadgeNFT",
      owner: owner === deploymentInfo.gnosisSafe
    });
    
    console.log("   ✅ Owner:", owner === deploymentInfo.gnosisSafe ? "✅ Correto" : "❌ Errado");
  } catch (error) {
    console.log("   ❌ Erro ao verificar BadgeNFT:", error.message);
  }

  // 4. Governance
  console.log("\n4️⃣  Verificando Governance...");
  try {
    const Governance = await hre.ethers.getContractFactory("Governance");
    const governance = Governance.attach(contracts.governance);
    
    const owner = await governance.owner();
    const quorumPercentual = await governance.quorumPercentual();
    const quorumMinimo = await governance.quorumMinimo();
    const duracaoVotacao = await governance.duracaoVotacao();
    
    verificacoes.push({
      contrato: "Governance",
      owner: owner === deploymentInfo.gnosisSafe,
      quorumPercentual: quorumPercentual.toString() === "20",
      quorumMinimo: quorumMinimo.toString() === "10"
    });
    
    console.log("   ✅ Owner:", owner === deploymentInfo.gnosisSafe ? "✅ Correto" : "❌ Errado");
    console.log("   ✅ Quorum Percentual:", quorumPercentual.toString(), "%");
    console.log("   ✅ Quorum Mínimo (fallback):", quorumMinimo.toString());
    console.log("   ✅ Duração Votação:", hre.ethers.formatUnits(duracaoVotacao, 0) / 86400, "dias");
  } catch (error) {
    console.log("   ❌ Erro ao verificar Governance:", error.message);
  }

  // 5. Membership
  console.log("\n5️⃣  Verificando Membership...");
  try {
    const Membership = await hre.ethers.getContractFactory("Membership");
    const membership = Membership.attach(contracts.membership);
    
    const owner = await membership.owner();
    const totalMembers = await membership.totalMembers();
    
    verificacoes.push({
      contrato: "Membership",
      owner: owner === deploymentInfo.gnosisSafe
    });
    
    console.log("   ✅ Owner:", owner === deploymentInfo.gnosisSafe ? "✅ Correto" : "❌ Errado");
    console.log("   ✅ Total Membros:", totalMembers.toString());
  } catch (error) {
    console.log("   ❌ Erro ao verificar Membership:", error.message);
  }

  // 6. CollabEngine
  console.log("\n6️⃣  Verificando CollabEngine...");
  try {
    const CollabEngine = await hre.ethers.getContractFactory("CollabEngine");
    const collabEngine = CollabEngine.attach(contracts.collabEngine);
    
    const timeoutMissao = await collabEngine.TIMEOUT_MISSAO();
    const totalMissoes = await collabEngine.missaoIdCounter();
    
    verificacoes.push({
      contrato: "CollabEngine",
      timeout: timeoutMissao.toString() === "2592000" // 30 dias em segundos
    });
    
    console.log("   ✅ Timeout Missões:", hre.ethers.formatUnits(timeoutMissao, 0) / 86400, "dias");
    console.log("   ✅ Total Missões:", totalMissoes.toString());
  } catch (error) {
    console.log("   ❌ Erro ao verificar CollabEngine:", error.message);
  }

  // Resumo
  console.log("\n" + "=".repeat(80));
  console.log("📊 RESUMO DAS VERIFICAÇÕES\n");
  
  const todasCorretas = verificacoes.every(v => 
    (v.owner === undefined || v.owner === true) &&
    (v.timelock === undefined || v.timelock === true) &&
    (v.quorumPercentual === undefined || v.quorumPercentual === true)
  );
  
  if (todasCorretas) {
    console.log("✅ Todos os contratos estão corretos!");
  } else {
    console.log("⚠️  Algumas verificações falharam. Revise os contratos.");
  }
  
  console.log("\n" + "=".repeat(80));
  console.log("✅ Verificação concluída!\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

