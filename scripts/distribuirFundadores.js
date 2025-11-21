/**
 * 💰 Distribuir FLUXX aos Fundadores via Treasury
 * 
 * Usa Treasury.withdrawTokensByOwner() para transferir tokens do Treasury
 * para os fundadores sem timelock.
 * 
 * Uso:
 *   npx hardhat run scripts/distribuirFundadores.js --network polygon
 */

const { ethers } = require("hardhat");
require("dotenv").config();

// Endereços
const TREASURY_ADDRESS = "0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93";
const FLUXX_TOKEN = "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA";

// Fundadores e quantidades (em FLUXX, números inteiros)
// Ajuste as quantidades conforme necessário
const FOUNDERS = [
  { 
    address: "0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f", 
    amount: 2500000, // 2.5 milhões de FLUXX (ajuste aqui)
    name: "Fundador #1"
  },
  { 
    address: "0xa387691E594dF109aD9cA83767F39D419CBC6001", 
    amount: 2500000, // 2.5 milhões de FLUXX (ajuste aqui)
    name: "Fundador #2"
  },
  { 
    address: "0x887b641EF4A1e99022e290dF6Ac9c81eA50AE0CD", 
    amount: 2500000, // 2.5 milhões de FLUXX (ajuste aqui)
    name: "Fundador #3"
  },
  { 
    address: "0xc8b6C6cF88ecE28EfDede72ed625b95b73Cb649F", 
    amount: 2500000, // 2.5 milhões de FLUXX (ajuste aqui)
    name: "Fundador #4"
  },
];

// ABI do Treasury
const TREASURY_ABI = [
  "function withdrawTokensByOwner(address tokenAddress, uint256 amount, address to) external",
  "function owner() external view returns (address)",
  "function getTokenBalance(address tokenAddress) external view returns (uint256)"
];

async function main() {
  console.log("💰 DISTRIBUIÇÃO DE FLUXX AOS FUNDADORES\n");
  console.log("=" .repeat(80));
  
  const [signer] = await ethers.getSigners();
  console.log("📝 Signer:", signer.address);
  console.log("");
  
  // Verificar se o signer é owner do Treasury
  const treasury = new ethers.Contract(TREASURY_ADDRESS, TREASURY_ABI, signer);
  const treasuryOwner = await treasury.owner();
  
  console.log("1️⃣ Verificando permissões...");
  console.log("   Treasury:", TREASURY_ADDRESS);
  console.log("   Owner do Treasury:", treasuryOwner);
  console.log("   Signer:", signer.address);
  
  if (signer.address.toLowerCase() !== treasuryOwner.toLowerCase()) {
    console.log("\n⚠️  ATENÇÃO: O signer não é o owner do Treasury!");
    console.log("   Esperado:", treasuryOwner);
    console.log("   Atual:", signer.address);
    console.log("\n💡 SOLUÇÃO:");
    console.log("   Use a PRIVATE_KEY do owner do Treasury (Safe) no .env");
    console.log("   OU execute via Safe Transaction Builder\n");
    throw new Error("Signer não é owner do Treasury");
  }
  
  console.log("   ✅ Signer é owner do Treasury\n");
  
  // Verificar saldo do Treasury
  console.log("2️⃣ Verificando saldo do Treasury...");
  const treasuryBalance = await treasury.getTokenBalance(FLUXX_TOKEN);
  const totalNeeded = FOUNDERS.reduce((sum, f) => sum + BigInt(f.amount) * ethers.parseEther("1"), 0n);
  
  console.log("   Saldo do Treasury:", ethers.formatEther(treasuryBalance), "FLUXX");
  console.log("   Total necessário:", ethers.formatEther(totalNeeded), "FLUXX");
  
  if (treasuryBalance < totalNeeded) {
    throw new Error(`Saldo insuficiente no Treasury. Necessário: ${ethers.formatEther(totalNeeded)}, Disponível: ${ethers.formatEther(treasuryBalance)}`);
  }
  
  console.log("   ✅ Saldo suficiente\n");
  
  // Resumo da distribuição
  console.log("3️⃣ Resumo da distribuição:");
  console.log("");
  FOUNDERS.forEach((founder, index) => {
    console.log(`   ${index + 1}. ${founder.name}:`);
    console.log(`      Endereço: ${founder.address}`);
    console.log(`      Quantidade: ${founder.amount.toLocaleString()} FLUXX`);
    console.log(`      Em wei: ${(BigInt(founder.amount) * ethers.parseEther("1")).toString()}`);
    console.log("");
  });
  
  console.log("   TOTAL:", FOUNDERS.reduce((sum, f) => sum + f.amount, 0).toLocaleString(), "FLUXX");
  console.log("");
  
  // Confirmar antes de executar
  console.log("⚠️  ATENÇÃO: Você está prestes a transferir tokens do Treasury!");
  console.log("   Revise todas as informações acima antes de continuar.\n");
  
  // Executar transferências
  console.log("4️⃣ Executando transferências...\n");
  
  const receipts = [];
  
  for (let i = 0; i < FOUNDERS.length; i++) {
    const founder = FOUNDERS[i];
    const amountWei = BigInt(founder.amount) * ethers.parseEther("1");
    
    console.log(`   [${i + 1}/${FOUNDERS.length}] Transferindo para ${founder.name}...`);
    console.log(`      Endereço: ${founder.address}`);
    console.log(`      Quantidade: ${ethers.formatEther(amountWei)} FLUXX`);
    
    try {
      const tx = await treasury.withdrawTokensByOwner(
        FLUXX_TOKEN,
        amountWei,
        founder.address,
        { gasLimit: 200000 }
      );
      
      console.log(`      ⏳ Aguardando confirmação... (${tx.hash})`);
      const receipt = await tx.wait();
      
      console.log(`      ✅ Transferido! Hash: ${receipt.hash}`);
      console.log(`      🔗 PolygonScan: https://polygonscan.com/tx/${receipt.hash}`);
      console.log("");
      
      receipts.push({
        founder: founder.name,
        address: founder.address,
        amount: founder.amount,
        hash: receipt.hash
      });
      
      // Pequeno delay entre transações
      if (i < FOUNDERS.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
    } catch (error) {
      console.error(`      ❌ Erro ao transferir para ${founder.name}:`, error.message);
      throw error;
    }
  }
  
  // Resumo final
  console.log("=" .repeat(80));
  console.log("✅ DISTRIBUIÇÃO CONCLUÍDA!\n");
  console.log("📊 Resumo das transações:\n");
  
  receipts.forEach((r, index) => {
    console.log(`${index + 1}. ${r.founder}`);
    console.log(`   Endereço: ${r.address}`);
    console.log(`   Quantidade: ${r.amount.toLocaleString()} FLUXX`);
    console.log(`   Hash: ${r.hash}`);
    console.log(`   Link: https://polygonscan.com/tx/${r.hash}`);
    console.log("");
  });
  
  console.log("🔗 Verificar saldos:");
  FOUNDERS.forEach(f => {
    console.log(`   ${f.name}: https://polygonscan.com/address/${f.address}#tokentxns`);
  });
  
  console.log("\n✅ Processo concluído!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Erro:", error.message);
    process.exit(1);
  });

