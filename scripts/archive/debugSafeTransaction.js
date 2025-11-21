const hre = require("hardhat");

/**
 * 🐛 Debug de Transação da Safe
 * 
 * Analisa uma transação que falhou na Safe para identificar o problema.
 * 
 * Uso:
 *   TX_HASH=0x... npx hardhat run scripts/debugSafeTransaction.js --network polygon
 * 
 * Ou acesse diretamente no Tenderly:
 *   https://dashboard.tenderly.co/tx/polygon/TX_HASH
 */

async function main() {
  const txHash = process.env.TX_HASH || "2b3419c9-cfd6-4f6a-8f73-8cc8ad2840dc";
  
  console.log("🐛 Debugando transação da Safe...\n");
  console.log("=".repeat(80));
  console.log("Hash da transação:", txHash);
  console.log("\n");

  // Se for um hash completo, buscar da blockchain
  if (txHash.startsWith("0x")) {
    try {
      console.log("📡 Buscando transação na blockchain...");
      const tx = await hre.ethers.provider.getTransaction(txHash);
      const receipt = await hre.ethers.provider.getTransactionReceipt(txHash);

      console.log("Status:", receipt.status === 1 ? "✅ Sucesso" : "❌ Falhou");
      console.log("From:", tx.from);
      console.log("To:", tx.to);
      console.log("Gas usado:", receipt.gasUsed.toString());
      console.log("Gas limit:", tx.gasLimit.toString());
      
      if (receipt.status === 0) {
        console.log("\n❌ Transação falhou!");
        console.log("\n🔍 Para ver o debug completo:");
        console.log("1. Acesse: https://dashboard.tenderly.co/");
        console.log("2. Cole o hash:", txHash);
        console.log("3. Veja o stack trace completo");
        
        // Tentar decodificar o erro se possível
        if (receipt.logs && receipt.logs.length > 0) {
          console.log("\n📋 Logs da transação:");
          receipt.logs.forEach((log, i) => {
            console.log(`   Log ${i + 1}:`, log.address);
          });
        }
      }
    } catch (error) {
      console.log("❌ Erro ao buscar transação:", error.message);
      console.log("   Verifique se o hash está correto");
    }
  } else {
    // Se for um ID do Tenderly, mostrar link direto
    console.log("🔗 Acesse diretamente no Tenderly:");
    console.log(`   https://dashboard.tenderly.co/tx/polygon/${txHash}`);
  }

  // Informações sobre o erro GS013
  console.log("\n" + "=".repeat(80));
  console.log("📚 Sobre o erro GS013:");
  console.log("\nO erro 'GS013' na Safe significa:");
  console.log("   - Uma transação interna falhou (revert)");
  console.log("   - E não há gas suficiente ou configuração incorreta");
  console.log("\nPossíveis causas:");
  console.log("   1. ❌ Saldo insuficiente para a operação");
  console.log("   2. ❌ Permissão negada (approve não foi feito)");
  console.log("   3. ❌ Parâmetros incorretos");
  console.log("   4. ❌ Gas insuficiente na Safe");
  console.log("   5. ❌ Contrato interno reverteu");

  // Verificar Safe
  const SAFE_ADDRESS = "0xF040BbD411542F09f775E974fA88E16bF7406d26";
  console.log("\n" + "=".repeat(80));
  console.log("🔍 Verificando Safe...");
  console.log("Endereço:", SAFE_ADDRESS);
  
  try {
    const balance = await hre.ethers.provider.getBalance(SAFE_ADDRESS);
    console.log("Saldo MATIC/POL:", hre.ethers.formatEther(balance), "POL");
    
    if (balance < hre.ethers.parseEther("0.01")) {
      console.log("⚠️  Aviso: Safe tem pouco POL para gas!");
      console.log("   Considere enviar mais POL para a Safe");
    }
  } catch (error) {
    console.log("⚠️  Erro ao verificar Safe:", error.message);
  }

  // Verificar tokens na Safe
  console.log("\n" + "=".repeat(80));
  console.log("🔍 Verificando tokens na Safe...");
  
  const TOKEN_ADDRESS = "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA";
  const USDC_ADDRESS = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
  
  try {
    const Token = await hre.ethers.getContractFactory("Token");
    const token = Token.attach(TOKEN_ADDRESS);
    
    const balanceFLUXX = await token.balanceOf(SAFE_ADDRESS);
    console.log("FLUXX na Safe:", hre.ethers.formatEther(balanceFLUXX), "FLUXX");
    
    // Verificar USDC (simplificado - precisa do ABI completo)
    console.log("USDC na Safe: Verificar manualmente no PolygonScan");
    console.log("   https://polygonscan.com/address/" + SAFE_ADDRESS);
  } catch (error) {
    console.log("⚠️  Erro ao verificar tokens:", error.message);
  }

  console.log("\n" + "=".repeat(80));
  console.log("✅ Debug concluído!");
  console.log("\n📋 Próximos passos:");
  console.log("1. Acesse o Tenderly Dashboard com o hash da transação");
  console.log("2. Veja o stack trace completo para identificar a linha exata do erro");
  console.log("3. Verifique se:");
  console.log("   - Safe tem saldo suficiente (FLUXX/USDC)");
  console.log("   - Safe tem POL para gas");
  console.log("   - As aprovações (approve) foram feitas");
  console.log("   - Os parâmetros estão corretos");
  console.log("\n🔗 Link direto Tenderly:");
  if (txHash.startsWith("0x")) {
    console.log(`   https://dashboard.tenderly.co/tx/polygon/${txHash}`);
  } else {
    console.log(`   https://dashboard.tenderly.co/tx/polygon/${txHash}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

