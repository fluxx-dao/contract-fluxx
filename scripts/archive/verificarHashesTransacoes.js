const hre = require("hardhat");

/**
 * 🔍 Verificar Hashes de Transações dos Contratos
 * 
 * Busca os hashes das transações de deploy dos contratos
 */

const CONTRATOS = {
  Token: "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA",
  BadgeNFT: "0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce",
  Treasury: "0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93",
  Governance: "0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa",
  Membership: "0x52926F509d7BD565c02fbd72265E4F5Dda300099",
  CollabEngine: "0x3bFB7e43517B0C91F5Bee75FeDd88317Db7C763C",
};

async function main() {
  console.log("🔍 Buscando hashes de transações dos contratos...\n");
  console.log("=".repeat(80));

  const resultados = [];

  for (const [nome, endereco] of Object.entries(CONTRATOS)) {
    console.log(`\n📋 ${nome}:`);
    console.log(`   Endereço: ${endereco}`);

    try {
      // Buscar transação de criação do contrato
      const code = await hre.ethers.provider.getCode(endereco);
      
      if (code === "0x") {
        console.log("   ❌ Contrato não encontrado ou não é um contrato");
        continue;
      }

      // Buscar primeira transação para este endereço (geralmente é o deploy)
      const response = await fetch(
        `https://api.polygonscan.com/api?module=account&action=txlist&address=${endereco}&startblock=0&endblock=99999999&page=1&offset=1&sort=asc&apikey=${process.env.POLYGONSCAN_API_KEY || ""}`
      );

      if (response.ok) {
        const data = await response.json();
        
        if (data.status === "1" && data.result && data.result.length > 0) {
          const primeiraTx = data.result[0];
          const txHash = primeiraTx.hash;
          const blockNumber = primeiraTx.blockNumber;
          const timestamp = new Date(parseInt(primeiraTx.timeStamp) * 1000).toLocaleString();

          console.log(`   ✅ Hash da transação de deploy: ${txHash}`);
          console.log(`   📦 Block: ${blockNumber}`);
          console.log(`   📅 Data: ${timestamp}`);
          console.log(`   🔗 Link: https://polygonscan.com/tx/${txHash}`);

          resultados.push({
            contrato: nome,
            endereco: endereco,
            txHash: txHash,
            blockNumber: blockNumber,
            timestamp: timestamp,
          });
        } else {
          console.log("   ⚠️  Nenhuma transação encontrada");
        }
      } else {
        console.log("   ⚠️  Erro ao buscar transações (API pode estar limitada)");
      }
    } catch (error) {
      console.log("   ❌ Erro:", error.message);
    }
  }

  console.log("\n" + "=".repeat(80));
  console.log("\n📊 RESUMO DOS HASHES:\n");

  if (resultados.length > 0) {
    console.log("✅ Hashes de transações encontrados:\n");
    resultados.forEach((r) => {
      console.log(`${r.contrato}:`);
      console.log(`   Hash: ${r.txHash}`);
      console.log(`   Block: ${r.blockNumber}`);
      console.log(`   Link: https://polygonscan.com/tx/${r.txHash}\n`);
    });

    console.log("\n💡 ESTES SÃO OS SIGNATURE HASHES DAS TRANSAÇÕES DE DEPLOY!");
    console.log("   Você pode usar estes hashes para:");
    console.log("   - Verificar as transações no PolygonScan");
    console.log("   - Debugar no Tenderly");
    console.log("   - Provar que você fez o deploy");
  } else {
    console.log("⚠️  Nenhum hash encontrado (pode ser limitação da API)");
    console.log("💡 Você pode encontrar os hashes manualmente:");
    console.log("   1. Acesse o PolygonScan de cada contrato");
    console.log("   2. Vá na aba 'Transactions'");
    console.log("   3. A primeira transação é geralmente o deploy");
  }

  console.log("\n📚 Links dos contratos:");
  for (const [nome, endereco] of Object.entries(CONTRATOS)) {
    console.log(`   ${nome}: https://polygonscan.com/address/${endereco}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

