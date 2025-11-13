const hre = require("hardhat");

/**
 * ✅ Verificar Contratos no PolygonScan
 * 
 * Este script verifica todos os contratos deployados no PolygonScan
 * para que o código-fonte fique público e verificável.
 */

async function main() {
  const deploymentInfo = require("../deployment-info.json");
  const contracts = deploymentInfo.contracts;
  const GNOSIS_SAFE = deploymentInfo.gnosisSafe;
  const BADGE_BASE_URI = "https://fluxx.space/badges/";

  console.log("🔍 Verificando contratos no PolygonScan...\n");
  console.log("=".repeat(80));

  // 1. Treasury
  console.log("\n1️⃣  Verificando Treasury...");
  try {
    await hre.run("verify:verify", {
      address: contracts.treasury,
      constructorArguments: [GNOSIS_SAFE],
    });
    console.log("✅ Treasury verificado!");
  } catch (error) {
    if (error.message.includes("Already Verified")) {
      console.log("⚠️  Treasury já estava verificado");
    } else {
      console.log("❌ Erro ao verificar Treasury:", error.message);
    }
  }

  // 2. Token
  console.log("\n2️⃣  Verificando Token...");
  try {
    await hre.run("verify:verify", {
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
    if (error.message.includes("Already Verified")) {
      console.log("⚠️  Token já estava verificado");
    } else {
      console.log("❌ Erro ao verificar Token:", error.message);
    }
  }

  // 3. BadgeNFT
  console.log("\n3️⃣  Verificando BadgeNFT...");
  try {
    await hre.run("verify:verify", {
      address: contracts.badgeNFT,
      constructorArguments: [GNOSIS_SAFE, BADGE_BASE_URI],
    });
    console.log("✅ BadgeNFT verificado!");
  } catch (error) {
    if (error.message.includes("Already Verified")) {
      console.log("⚠️  BadgeNFT já estava verificado");
    } else {
      console.log("❌ Erro ao verificar BadgeNFT:", error.message);
    }
  }

  // 4. Governance
  console.log("\n4️⃣  Verificando Governance...");
  try {
    await hre.run("verify:verify", {
      address: contracts.governance,
      constructorArguments: [
        GNOSIS_SAFE,
        contracts.badgeNFT,
        contracts.treasury,
      ],
    });
    console.log("✅ Governance verificado!");
  } catch (error) {
    if (error.message.includes("Already Verified")) {
      console.log("⚠️  Governance já estava verificado");
    } else {
      console.log("❌ Erro ao verificar Governance:", error.message);
    }
  }

  // 5. Membership
  console.log("\n5️⃣  Verificando Membership...");
  try {
    await hre.run("verify:verify", {
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
    if (error.message.includes("Already Verified")) {
      console.log("⚠️  Membership já estava verificado");
    } else {
      console.log("❌ Erro ao verificar Membership:", error.message);
    }
  }

  // 6. CollabEngine
  console.log("\n6️⃣  Verificando CollabEngine...");
  try {
    await hre.run("verify:verify", {
      address: contracts.collabEngine,
      constructorArguments: [
        contracts.token,
        contracts.membership,
        contracts.badgeNFT,
      ],
    });
    console.log("✅ CollabEngine verificado!");
  } catch (error) {
    if (error.message.includes("Already Verified")) {
      console.log("⚠️  CollabEngine já estava verificado");
    } else {
      console.log("❌ Erro ao verificar CollabEngine:", error.message);
    }
  }

  console.log("\n" + "=".repeat(80));
  console.log("✅ Verificação concluída!");
  console.log("\n📋 Links dos contratos verificados:");
  console.log(`Treasury:     https://polygonscan.com/address/${contracts.treasury}#code`);
  console.log(`Token:        https://polygonscan.com/address/${contracts.token}#code`);
  console.log(`BadgeNFT:     https://polygonscan.com/address/${contracts.badgeNFT}#code`);
  console.log(`Governance:   https://polygonscan.com/address/${contracts.governance}#code`);
  console.log(`Membership:   https://polygonscan.com/address/${contracts.membership}#code`);
  console.log(`CollabEngine: https://polygonscan.com/address/${contracts.collabEngine}#code`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

