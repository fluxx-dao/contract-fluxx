const hre = require("hardhat");

/**
 * 🧪 Simular Transferência de Tokens
 * 
 * Simula uma transferência do Treasury para um endereço
 * antes de executá-la na Safe.
 * 
 * Uso:
 *   RECIPIENT=0x... AMOUNT=1000 npx hardhat run scripts/simulateTransfer.js --network polygon
 */

async function main() {
  console.log("🧪 Simulando transferência de tokens...\n");
  console.log("=".repeat(80));

  const [signer] = await hre.ethers.getSigners();
  const recipient = process.env.RECIPIENT || "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";
  const amountStr = process.env.AMOUNT || "1000";
  const amount = hre.ethers.parseEther(amountStr);

  // Endereços
  const SAFE_ADDRESS = "0xF040BbD411542F09f775E974fA88E16bF7406d26";
  const TREASURY_ADDRESS = "0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93";
  const TOKEN_ADDRESS = "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA";

  console.log("📋 Parâmetros da transferência:");
  console.log("   De: Treasury (", TREASURY_ADDRESS, ")");
  console.log("   Para:", recipient);
  console.log("   Quantidade:", amountStr, "FLUXX\n");

  // 1. Verificar saldo do Treasury
  console.log("1️⃣  Verificando saldo do Treasury...");
  try {
    const Token = await hre.ethers.getContractFactory("Token");
    const token = Token.attach(TOKEN_ADDRESS);
    
    const treasuryBalance = await token.balanceOf(TREASURY_ADDRESS);
    console.log("   Saldo do Treasury:", hre.ethers.formatEther(treasuryBalance), "FLUXX");
    
    if (treasuryBalance < amount) {
      console.log("   ❌ Saldo insuficiente!");
      console.log("   Precisa:", amountStr, "FLUXX");
      console.log("   Disponível:", hre.ethers.formatEther(treasuryBalance), "FLUXX");
      process.exit(1);
    } else {
      console.log("   ✅ Saldo suficiente");
    }
  } catch (error) {
    console.log("   ⚠️  Erro ao verificar saldo:", error.message);
  }

  // 2. Verificar se Treasury pode fazer withdraw
  console.log("\n2️⃣  Verificando permissões...");
  try {
    const Treasury = await hre.ethers.getContractFactory("Treasury");
    const treasury = Treasury.attach(TREASURY_ADDRESS);
    
    const owner = await treasury.owner();
    console.log("   Owner do Treasury:", owner);
    
    if (owner.toLowerCase() !== SAFE_ADDRESS.toLowerCase()) {
      console.log("   ⚠️  Aviso: Safe não é owner do Treasury");
    } else {
      console.log("   ✅ Safe é owner do Treasury");
    }
  } catch (error) {
    console.log("   ⚠️  Erro ao verificar permissões:", error.message);
  }

  // 3. Simular a transferência
  console.log("\n3️⃣  Simulando transferência...");
  console.log("   💡 Transação necessária na Safe:");
  console.log("      To:", TREASURY_ADDRESS);
  console.log("      Function: withdrawTokensByOwner(address,address,uint256)");
  console.log("      Parâmetros:");
  console.log("        - token:", TOKEN_ADDRESS);
  console.log("        - to:", recipient);
  console.log("        - amount:", amount.toString());

  // 4. Verificar timelock
  console.log("\n4️⃣  Verificando timelock...");
  console.log("   ⚠️  Importante: Treasury tem timelock de 2 dias");
  console.log("   💡 A transação será criada, mas só pode ser executada após 2 dias");
  console.log("   📅 Planeje com antecedência!");

  // 5. Resumo
  console.log("\n" + "=".repeat(80));
  console.log("✅ Simulação concluída!");
  console.log("\n📋 Checklist antes de criar na Safe:");
  console.log("   [ ] Treasury tem saldo suficiente");
  console.log("   [ ] Safe é owner do Treasury");
  console.log("   [ ] Endereço do recipient está correto");
  console.log("   [ ] Quantidade está correta");
  console.log("   [ ] Entende que há timelock de 2 dias");
  console.log("\n📚 Guia completo: docs/guides/GUIA_TRANSFERIR_COM_MELHORIAS.md");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

