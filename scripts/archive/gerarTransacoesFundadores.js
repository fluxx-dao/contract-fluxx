/**
 * 📋 Gerar Transações para Distribuir FLUXX aos Fundadores
 * 
 * Gera um JSON com todas as transações para usar no Safe Transaction Builder
 * 
 * Uso:
 *   node scripts/gerarTransacoesFundadores.js
 */

const fs = require("fs");
const path = require("path");

// Endereços
const TREASURY_ADDRESS = "0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93";
const FLUXX_TOKEN = "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA";

// Fundadores e quantidades (em FLUXX, números inteiros)
const FOUNDERS = [
  { 
    address: "0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f", 
    amount: 2500000, // 2.5 milhões de FLUXX
    name: "Fundador #1"
  },
  { 
    address: "0xa387691E594dF109aD9cA83767F39D419CBC6001", 
    amount: 2500000, // 2.5 milhões de FLUXX
    name: "Fundador #2"
  },
  { 
    address: "0x887b641EF4A1e99022e290dF6Ac9c81eA50AE0CD", 
    amount: 2500000, // 2.5 milhões de FLUXX
    name: "Fundador #3"
  },
  { 
    address: "0xc8b6C6cF88ecE28EfDede72ed625b95b73Cb649F", 
    amount: 2500000, // 2.5 milhões de FLUXX
    name: "Fundador #4"
  },
];

// ABI do Treasury
const TREASURY_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "tokenAddress", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "address", "name": "to", "type": "address" }
    ],
    "name": "withdrawTokensByOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

function toWei(amount) {
  return (BigInt(amount) * BigInt(10 ** 18)).toString();
}

function main() {
  console.log("📋 Gerando transações para Safe Transaction Builder...\n");
  
  const transactions = FOUNDERS.map((founder, index) => {
    const amountWei = toWei(founder.amount);
    
    return {
      "to": TREASURY_ADDRESS,
      "value": "0",
      "data": null,
      "contractMethod": {
        "inputs": [
          { "internalType": "address", "name": "tokenAddress", "type": "address" },
          { "internalType": "uint256", "name": "amount", "type": "uint256" },
          { "internalType": "address", "name": "to", "type": "address" }
        ],
        "name": "withdrawTokensByOwner",
        "payable": false
      },
      "contractInputsValues": {
        "tokenAddress": FLUXX_TOKEN,
        "amount": amountWei,
        "to": founder.address
      }
    };
  });
  
  const output = {
    "version": "1.0",
    "chainId": "137", // Polygon
    "createdAt": new Date().toISOString(),
    "meta": {
      "name": "Distribuir FLUXX aos Fundadores",
      "description": `Distribuição de 10.000.000 FLUXX entre 4 fundadores (2.5M cada)`,
      "txBuilderVersion": "1.16.2",
      "createdFromSafeAddress": "0xF040BbD411542F09f775E974fA88E16bF7406d26",
      "createdFromOwnerAddress": ""
    },
    "transactions": transactions
  };
  
  // Salvar arquivo
  const outputPath = path.join(__dirname, "distribuirFundadores.json");
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  
  console.log("✅ Arquivo gerado:", outputPath);
  console.log("\n📊 Resumo das transações:\n");
  
  FOUNDERS.forEach((founder, index) => {
    console.log(`${index + 1}. ${founder.name}`);
    console.log(`   Endereço: ${founder.address}`);
    console.log(`   Quantidade: ${founder.amount.toLocaleString()} FLUXX`);
    console.log(`   Wei: ${toWei(founder.amount)}`);
    console.log("");
  });
  
  console.log("=".repeat(80));
  console.log("\n📋 PRÓXIMOS PASSOS:\n");
  console.log("1. Acesse o Safe Transaction Builder:");
  console.log("   https://app.safe.global/apps/open?safe=matic:0xF040BbD411542F09f775E974fA88E16bF7406d26&appUrl=https%3A%2F%2Fapps-portal.safe.global%2Ftx-builder");
  console.log("\n2. Clique em 'Import' ou 'Load JSON'");
  console.log(`\n3. Cole o conteúdo do arquivo: ${outputPath}`);
  console.log("\n4. Revise todas as 4 transações");
  console.log("\n5. Crie o batch e execute");
  console.log("\n✅ Pronto!");
}

main();

