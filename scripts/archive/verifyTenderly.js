const hre = require("hardhat");
const fs = require("fs");

/**
 * 🔍 Verificar Contratos no Tenderly
 * 
 * Verifica todos os contratos deployados no Tenderly
 * para habilitar debugging e monitoramento.
 */

async function main() {
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

  const contracts = deploymentInfo.contracts;
  const GNOSIS_SAFE = deploymentInfo.gnosisSafe;
  const BADGE_BASE_URI = "https://api.fluxx-dao.io/badges/";

  console.log("🔍 Verificando contratos no Tenderly...\n");
  console.log("=".repeat(80));

  // 1. Token
  console.log("\n1️⃣  Verificando Token...");
  try {
    await hre.tenderly.verify({
      name: "Token",
      address: contracts.token,
      constructorArguments: [
        "FLUXX DAO",
        "FLUXX",
        GNOSIS_SAFE,
        contracts.treasury,
      ],
    });
    console.log("✅ Token verificado!");
  } catch (error) {
    if (error.message.includes("already verified")) {
      console.log("⚠️  Token já estava verificado");
    } else {
      console.log("❌ Erro:", error.message);
    }
  }

  // 2. Treasury
  console.log("\n2️⃣  Verificando Treasury...");
  try {
    await hre.tenderly.verify({
      name: "Treasury",
      address: contracts.treasury,
      constructorArguments: [GNOSIS_SAFE],
    });
    console.log("✅ Treasury verificado!");
  } catch (error) {
    if (error.message.includes("already verified")) {
      console.log("⚠️  Treasury já estava verificado");
    } else {
      console.log("❌ Erro:", error.message);
    }
  }

  // 3. BadgeNFT
  console.log("\n3️⃣  Verificando BadgeNFT...");
  try {
    await hre.tenderly.verify({
      name: "BadgeNFT",
      address: contracts.badgeNFT,
      constructorArguments: [
        GNOSIS_SAFE,
        BADGE_BASE_URI,
      ],
    });
    console.log("✅ BadgeNFT verificado!");
  } catch (error) {
    if (error.message.includes("already verified")) {
      console.log("⚠️  BadgeNFT já estava verificado");
    } else {
      console.log("❌ Erro:", error.message);
    }
  }

  // 4. Governance
  console.log("\n4️⃣  Verificando Governance...");
  try {
    await hre.tenderly.verify({
      name: "Governance",
      address: contracts.governance,
      constructorArguments: [
        GNOSIS_SAFE,
        contracts.badgeNFT,
        contracts.treasury,
      ],
    });
    console.log("✅ Governance verificado!");
  } catch (error) {
    if (error.message.includes("already verified")) {
      console.log("⚠️  Governance já estava verificado");
    } else {
      console.log("❌ Erro:", error.message);
    }
  }

  // 5. Membership
  console.log("\n5️⃣  Verificando Membership...");
  try {
    await hre.tenderly.verify({
      name: "Membership",
      address: contracts.membership,
      constructorArguments: [
        GNOSIS_SAFE,
        contracts.token,
        contracts.badgeNFT,
        contracts.treasury,
      ],
    });
    console.log("✅ Membership verificado!");
  } catch (error) {
    if (error.message.includes("already verified")) {
      console.log("⚠️  Membership já estava verificado");
    } else {
      console.log("❌ Erro:", error.message);
    }
  }

  // 6. CollabEngine
  console.log("\n6️⃣  Verificando CollabEngine...");
  try {
    await hre.tenderly.verify({
      name: "CollabEngine",
      address: contracts.collabEngine,
      constructorArguments: [
        contracts.token,
        contracts.membership,
        contracts.badgeNFT,
      ],
    });
    console.log("✅ CollabEngine verificado!");
  } catch (error) {
    if (error.message.includes("already verified")) {
      console.log("⚠️  CollabEngine já estava verificado");
    } else {
      console.log("❌ Erro:", error.message);
    }
  }

  console.log("\n" + "=".repeat(80));
  console.log("✅ Verificação no Tenderly concluída!");
  console.log("\n📊 Acesse o dashboard:");
  console.log("https://dashboard.tenderly.co/");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

