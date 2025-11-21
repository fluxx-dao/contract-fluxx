const hre = require("hardhat");

/**
 * ✅ Verificar Todos os Contratos no PolygonScan
 * 
 * Este script verifica todos os contratos deployados no PolygonScan
 * sem depender de deployment-info.json
 */

const GNOSIS_SAFE = "0xF040BbD411542F09f775E974fA88E16bF7406d26";
const BADGE_BASE_URI = "https://fluxx.space/badges/";

const CONTRATOS = {
  Token: {
    address: "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA",
    constructorArgs: [
      "FLUXX DAO",
      "FLUXX",
      GNOSIS_SAFE,
      "0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93", // Treasury
    ],
  },
  Treasury: {
    address: "0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93",
    constructorArgs: [GNOSIS_SAFE],
  },
  BadgeNFT: {
    address: "0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce",
    constructorArgs: [GNOSIS_SAFE, BADGE_BASE_URI],
  },
  Governance: {
    address: "0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa",
    constructorArgs: [
      GNOSIS_SAFE,
      "0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce", // BadgeNFT
      "0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93", // Treasury
    ],
  },
  Membership: {
    address: "0x52926F509d7BD565c02fbd72265E4F5Dda300099",
    constructorArgs: [
      GNOSIS_SAFE,
      "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA", // Token
      "0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce", // BadgeNFT
      "0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93", // Treasury
    ],
  },
  CollabEngine: {
    address: "0x3bFB7e43517B0C91F5Bee75FeDd88317Db7C763C",
    constructorArgs: [
      "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA", // Token
      "0x52926F509d7BD565c02fbd72265E4F5Dda300099", // Membership
      "0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce", // BadgeNFT
    ],
  },
};

async function main() {
  console.log("🔍 Verificando todos os contratos no PolygonScan...\n");
  console.log("=".repeat(80));

  const resultados = [];

  for (const [nome, config] of Object.entries(CONTRATOS)) {
    console.log(`\n${resultados.length + 1}️⃣  Verificando ${nome}...`);
    console.log(`   Endereço: ${config.address}`);
    
    try {
      await hre.run("verify:verify", {
        address: config.address,
        constructorArguments: config.constructorArgs,
      });
      console.log(`   ✅ ${nome} verificado!`);
      resultados.push({ nome, status: "✅ VERIFICADO", endereco: config.address });
    } catch (error) {
      if (error.message.includes("Already Verified") || error.message.includes("already verified")) {
        console.log(`   ⚠️  ${nome} já estava verificado`);
        resultados.push({ nome, status: "✅ JÁ VERIFICADO", endereco: config.address });
      } else {
        console.log(`   ❌ Erro ao verificar ${nome}:`, error.message);
        resultados.push({ nome, status: "❌ ERRO", endereco: config.address, erro: error.message });
      }
    }
    
    // Pequeno delay para evitar rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log("\n" + "=".repeat(80));
  console.log("\n📊 RESUMO DA VERIFICAÇÃO:\n");

  const verificados = resultados.filter(r => r.status.includes("✅")).length;
  const erros = resultados.filter(r => r.status.includes("❌")).length;

  for (const resultado of resultados) {
    console.log(`   ${resultado.status} ${resultado.nome}`);
    if (resultado.erro) {
      console.log(`      Erro: ${resultado.erro.substring(0, 100)}...`);
    }
  }

  console.log(`\n✅ Verificados: ${verificados}/6`);
  if (erros > 0) {
    console.log(`❌ Erros: ${erros}/6`);
  }

  console.log("\n📋 Links dos contratos:");
  for (const resultado of resultados) {
    console.log(`   ${resultado.nome}: https://polygonscan.com/address/${resultado.endereco}#code`);
  }

  if (verificados === 6) {
    console.log("\n🎉 Todos os contratos estão verificados!");
  } else if (erros > 0) {
    console.log("\n⚠️  Alguns contratos tiveram erros. Verifique os parâmetros do constructor.");
    console.log("📚 Veja: docs/verification/VERIFICAR_TODOS_CONTRATOS.md");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

