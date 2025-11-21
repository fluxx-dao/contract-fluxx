const hre = require("hardhat");
const { ethers } = require("hardhat");

/**
 * 🚀 Gerar Transações para Transferir FLUXX aos Founders
 * 
 * Este script gera as transações prontas para o Safe Transaction Builder
 * para transferir tokens FLUXX do Treasury para os founders.
 * 
 * Uso:
 *   node scripts/transferToFounders.js
 * 
 * Ou com endereços customizados:
 *   FOUNDER_1=0x... FOUNDER_2=0x... FOUNDER_3=0x... node scripts/transferToFounders.js
 */

// Endereços dos contratos (deployment-info.json)
const TOKEN_ADDRESS = "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA";
const GNOSIS_SAFE_ADDRESS = "0xF040BbD411542F09f775E974fA88E16bF7406d26";

// Quantidades recomendadas (em FLUXX)
const AMOUNTS = {
  FOUNDER_1: 600,  // 500 para registro + 100 para criar missão
  FOUNDER_2: 200,  // 100 para registro + extra
  FOUNDER_3: 200,  // 100 para registro + extra
};

// Endereços dos founders (pode ser configurado via env ou editado aqui)
const FOUNDERS = {
  FOUNDER_1: process.env.FOUNDER_1 || "", // Preencher com endereço do Fundador #1
  FOUNDER_2: process.env.FOUNDER_2 || "", // Preencher com endereço do Fundador #2
  FOUNDER_3: process.env.FOUNDER_3 || "", // Preencher com endereço do Fundador #3
};

function toWei(amount) {
  return ethers.parseEther(amount.toString());
}

function toHex(amount) {
  return "0x" + amount.toString(16).padStart(64, "0");
}

function encodeTransfer(to, amount) {
  const iface = new ethers.Interface([
    "function transfer(address to, uint256 amount) external returns (bool)"
  ]);
  return iface.encodeFunctionData("transfer", [to, amount]);
}

async function main() {
  console.log("🚀 Gerando transações para transferir FLUXX aos Founders\n");
  console.log("=".repeat(80));
  
  // Validar endereços
  const foundersToTransfer = [];
  
  if (FOUNDERS.FOUNDER_1) {
    if (!ethers.isAddress(FOUNDERS.FOUNDER_1)) {
      throw new Error(`❌ Endereço inválido para FOUNDER_1: ${FOUNDERS.FOUNDER_1}`);
    }
    foundersToTransfer.push({
      name: "Fundador #1",
      address: FOUNDERS.FOUNDER_1,
      amount: AMOUNTS.FOUNDER_1
    });
  }
  
  if (FOUNDERS.FOUNDER_2) {
    if (!ethers.isAddress(FOUNDERS.FOUNDER_2)) {
      throw new Error(`❌ Endereço inválido para FOUNDER_2: ${FOUNDERS.FOUNDER_2}`);
    }
    foundersToTransfer.push({
      name: "Fundador #2",
      address: FOUNDERS.FOUNDER_2,
      amount: AMOUNTS.FOUNDER_2
    });
  }
  
  if (FOUNDERS.FOUNDER_3) {
    if (!ethers.isAddress(FOUNDERS.FOUNDER_3)) {
      throw new Error(`❌ Endereço inválido para FOUNDER_3: ${FOUNDERS.FOUNDER_3}`);
    }
    foundersToTransfer.push({
      name: "Fundador #3",
      address: FOUNDERS.FOUNDER_3,
      amount: AMOUNTS.FOUNDER_3
    });
  }
  
  if (foundersToTransfer.length === 0) {
    console.log("⚠️  Nenhum endereço de founder configurado!");
    console.log("\n📝 Para usar este script, configure os endereços:");
    console.log("   Opção 1: Edite o arquivo e preencha FOUNDERS.FOUNDER_1, FOUNDER_2, FOUNDER_3");
    console.log("   Opção 2: Use variáveis de ambiente:");
    console.log("     FOUNDER_1=0x... FOUNDER_2=0x... FOUNDER_3=0x... node scripts/transferToFounders.js");
    console.log("\n📋 Ou use o guia manual: TRANSFERIR_FLUXX_SAFE.md\n");
    process.exit(1);
  }
  
  console.log(`\n✅ ${foundersToTransfer.length} founder(s) configurado(s):\n`);
  foundersToTransfer.forEach((f, i) => {
    console.log(`   ${i + 1}. ${f.name}: ${f.address} (${f.amount} FLUXX)`);
  });
  
  console.log("\n" + "=".repeat(80));
  console.log("📋 TRANSAÇÕES PARA O SAFE TRANSACTION BUILDER\n");
  
  // Gerar transações individuais
  const transactions = [];
  
  foundersToTransfer.forEach((founder, index) => {
    const amountWei = toWei(founder.amount);
    const data = encodeTransfer(founder.address, amountWei);
    
    const tx = {
      to: TOKEN_ADDRESS,
      value: "0",
      data: data,
      operation: 0
    };
    
    transactions.push(tx);
    
    console.log(`Transação ${index + 1}: ${founder.name}`);
    console.log("─".repeat(80));
    console.log("To (Contrato):", TOKEN_ADDRESS);
    console.log("Function: transfer(address to, uint256 amount)");
    console.log("Parâmetros:");
    console.log("  - to (address):", founder.address);
    console.log("  - amount (uint256):", amountWei.toString(), `(${founder.amount} FLUXX)`);
    console.log("Data (calldata):", data);
    console.log("Value: 0 POL");
    console.log("");
  });
  
  console.log("=".repeat(80));
  console.log("📦 JSON BATCH (Para colar no Safe Transaction Builder)\n");
  console.log(JSON.stringify(transactions, null, 2));
  console.log("\n" + "=".repeat(80));
  
  console.log("\n🚀 COMO EXECUTAR NO SAFE:\n");
  console.log("1. Acesse o Transaction Builder:");
  console.log("   https://app.safe.global/apps/open?safe=matic:" + GNOSIS_SAFE_ADDRESS + "&appUrl=https%3A%2F%2Fapps-portal.safe.global%2Ftx-builder");
  console.log("\n2. Método A - Interface Visual:");
  console.log("   - Carregue o contrato Token:", TOKEN_ADDRESS);
  console.log("   - Para cada founder, adicione uma transação:");
  console.log("     * Function: transfer(address,uint256)");
  console.log("     * to: [endereço do founder]");
  console.log("     * amount: [quantidade em wei]");
  console.log("\n3. Método B - JSON Batch:");
  console.log("   - Clique em 'Import' ou 'Load JSON'");
  console.log("   - Cole o JSON gerado acima");
  console.log("   - Revise todas as transações");
  console.log("   - Crie o batch e aguarde aprovações");
  console.log("\n4. Após aprovações suficientes, execute o batch");
  console.log("\n📖 Guia completo: TRANSFERIR_FLUXX_SAFE.md\n");
  
  // Salvar JSON em arquivo
  const fs = require("fs");
  const outputFile = "founders-transfers.json";
  fs.writeFileSync(outputFile, JSON.stringify(transactions, null, 2));
  console.log(`💾 JSON salvo em: ${outputFile}\n`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

