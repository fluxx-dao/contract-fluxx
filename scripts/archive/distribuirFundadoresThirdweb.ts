/**
 * 💰 Distribuir FLUXX aos Fundadores via Treasury (Thirdweb SDK v5)
 * 
 * Script TypeScript usando Thirdweb SDK para distribuir tokens via Treasury.
 * 
 * Uso:
 *   npx ts-node scripts/distribuirFundadoresThirdweb.ts
 * 
 * Requisitos:
 *   - Instalar: npm install thirdweb
 *   - Configurar THIRDWEB_SECRET_KEY no .env
 */

import { createThirdwebClient, getContract, prepareContractCall, sendTransaction } from "thirdweb";
import { polygon } from "thirdweb/chains";
import * as dotenv from "dotenv";

dotenv.config();

// Configuração
const client = createThirdwebClient({
  secretKey: process.env.THIRDWEB_SECRET_KEY || "",
});

const treasuryAddress = "0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93";
const fluxxAddress = "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA";

// Informações dos founders (quantidades em FLUXX - números inteiros)
// Ajuste as quantidades conforme necessário
const founders = [
  { 
    address: "0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f", 
    amount: "2500000", // 2.5 milhões (ajuste aqui)
    name: "Fundador #1"
  },
  { 
    address: "0xa387691E594dF109aD9cA83767F39D419CBC6001", 
    amount: "2500000", // 2.5 milhões (ajuste aqui)
    name: "Fundador #2"
  },
  { 
    address: "0x887b641EF4A1e99022e290dF6Ac9c81eA50AE0CD", 
    amount: "2500000", // 2.5 milhões (ajuste aqui)
    name: "Fundador #3"
  },
  { 
    address: "0xc8b6C6cF88ecE28EfDede72ed625b95b73Cb649F", 
    amount: "2500000", // 2.5 milhões (ajuste aqui)
    name: "Fundador #4"
  },
];

// Função principal
async function main() {
  console.log("💰 DISTRIBUIÇÃO DE FLUXX AOS FUNDADORES (Thirdweb SDK)\n");
  console.log("=".repeat(80));
  
  if (!process.env.THIRDWEB_SECRET_KEY) {
    throw new Error("THIRDWEB_SECRET_KEY não configurado no .env");
  }
  
  // Instancia contrato Treasury
  const treasury = await getContract({
    client,
    chain: polygon,
    address: treasuryAddress,
    abi: [
      {
        inputs: [
          { internalType: "address", name: "tokenAddress", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "address", name: "to", type: "address" }
        ],
        name: "withdrawTokensByOwner",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [{ internalType: "address", name: "tokenAddress", type: "address" }],
        name: "getTokenBalance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function"
      }
    ]
  });
  
  // Verificar saldo
  console.log("1️⃣ Verificando saldo do Treasury...");
  const balance = await treasury.read("getTokenBalance", [fluxxAddress]);
  const totalNeeded = founders.reduce((sum, f) => {
    return sum + BigInt(f.amount) * 10n ** 18n;
  }, 0n);
  
  console.log(`   Saldo: ${(balance / 10n ** 18n).toString()} FLUXX`);
  console.log(`   Necessário: ${(totalNeeded / 10n ** 18n).toString()} FLUXX`);
  
  if (balance < totalNeeded) {
    throw new Error("Saldo insuficiente no Treasury");
  }
  
  console.log("   ✅ Saldo suficiente\n");
  
  // Resumo
  console.log("2️⃣ Resumo da distribuição:\n");
  founders.forEach((f, i) => {
    console.log(`   ${i + 1}. ${f.name}: ${f.amount} FLUXX → ${f.address}`);
  });
  console.log(`\n   TOTAL: ${founders.reduce((sum, f) => sum + parseInt(f.amount), 0).toLocaleString()} FLUXX\n`);
  
  // Executa transferências sequenciais
  console.log("3️⃣ Executando transferências...\n");
  
  for (let i = 0; i < founders.length; i++) {
    const founder = founders[i];
    const amountWei = (BigInt(founder.amount) * 10n ** 18n).toString();
    
    console.log(`   [${i + 1}/${founders.length}] ${founder.name}...`);
    
    try {
      const tx = prepareContractCall({
        contract: treasury,
        method: "function withdrawTokensByOwner(address tokenAddress, uint256 amount, address to)",
        params: [fluxxAddress, amountWei, founder.address],
      });
      
      const receipt = await sendTransaction({
        client,
        transaction: tx,
      });
      
      console.log(`   ✅ Transferido! Hash: ${receipt.transactionHash}`);
      console.log(`   🔗 https://polygonscan.com/tx/${receipt.transactionHash}\n`);
      
      // Delay entre transações
      if (i < founders.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
    } catch (error: any) {
      console.error(`   ❌ Erro:`, error.message);
      throw error;
    }
  }
  
  console.log("=".repeat(80));
  console.log("✅ DISTRIBUIÇÃO CONCLUÍDA!\n");
  
  console.log("🔗 Verificar saldos:");
  founders.forEach(f => {
    console.log(`   ${f.name}: https://polygonscan.com/address/${f.address}#tokentxns`);
  });
}

main().catch(console.error);

