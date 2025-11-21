const hre = require("hardhat");

/**
 * 🔍 Verificar Status de Verificação dos Contratos
 * 
 * Este script verifica quais contratos estão verificados no PolygonScan
 */

const CONTRATOS = {
  Token: "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA",
  BadgeNFT: "0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce",
  Treasury: "0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93",
  Governance: "0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa",
  Membership: "0x52926F509d7BD565c02fbd72265E4F5Dda300099",
  CollabEngine: "0x3bFB7e43517B0C91F5Bee75FeDd88317Db7C763C",
};

async function verificarStatusPolygonScan(endereco) {
  try {
    const apiKey = process.env.POLYGONSCAN_API_KEY;
    if (!apiKey) {
      return { verificado: null, erro: "API_KEY não configurada" };
    }

    const url = `https://api.polygonscan.com/api?module=contract&action=getsourcecode&address=${endereco}&apikey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "1" && data.result && data.result[0]) {
      const sourceCode = data.result[0].SourceCode;
      const verificado = sourceCode && sourceCode.trim() !== "";
      return { verificado, abi: data.result[0].ABI };
    }

    return { verificado: false, erro: "Resposta inválida" };
  } catch (error) {
    return { verificado: null, erro: error.message };
  }
}

async function main() {
  console.log("🔍 Verificando status de verificação dos contratos...\n");
  console.log("=".repeat(80));

  const resultados = {};

  for (const [nome, endereco] of Object.entries(CONTRATOS)) {
    console.log(`\n📋 ${nome}:`);
    console.log(`   Endereço: ${endereco}`);
    
    const status = await verificarStatusPolygonScan(endereco);
    
    if (status.verificado === true) {
      console.log(`   ✅ VERIFICADO no PolygonScan`);
      resultados[nome] = "✅ VERIFICADO";
    } else if (status.verificado === false) {
      console.log(`   ❌ NÃO VERIFICADO no PolygonScan`);
      resultados[nome] = "❌ NÃO VERIFICADO";
    } else {
      console.log(`   ⚠️  Erro ao verificar: ${status.erro}`);
      resultados[nome] = "⚠️  ERRO";
    }
    
    console.log(`   Link: https://polygonscan.com/address/${endereco}#code`);
  }

  console.log("\n" + "=".repeat(80));
  console.log("\n📊 RESUMO:\n");
  
  const verificados = Object.values(resultados).filter(r => r.includes("✅")).length;
  const naoVerificados = Object.values(resultados).filter(r => r.includes("❌")).length;
  
  for (const [nome, status] of Object.entries(resultados)) {
    console.log(`   ${status} ${nome}`);
  }

  console.log(`\n✅ Verificados: ${verificados}/6`);
  console.log(`❌ Não verificados: ${naoVerificados}/6`);

  if (naoVerificados > 0) {
    console.log("\n🚀 Para verificar os contratos restantes, execute:");
    console.log("   npx hardhat run scripts/verifyContracts.js --network polygon");
    console.log("\n📚 Ou veja: docs/verification/VERIFICAR_TODOS_CONTRATOS.md");
  } else {
    console.log("\n🎉 Todos os contratos estão verificados!");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

