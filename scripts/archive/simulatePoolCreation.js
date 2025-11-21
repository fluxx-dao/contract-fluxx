const hre = require("hardhat");

/**
 * 🧪 Simular Criação da Pool de Ignição
 * 
 * Simula as transações necessárias para criar a pool FLUXX/USDC
 * antes de executá-las na Safe.
 * 
 * Uso:
 *   npx hardhat run scripts/simulatePoolCreation.js --network polygon
 */

async function main() {
  console.log("🧪 Simulando criação da Pool de Ignição...\n");
  console.log("=".repeat(80));

  const [signer] = await hre.ethers.getSigners();
  console.log("🔷 Conta:", signer.address);
  console.log("💰 Saldo:", hre.ethers.formatEther(await hre.ethers.provider.getBalance(signer.address)), "POL\n");

  // Endereços
  const SAFE_ADDRESS = "0xF040BbD411542F09f775E974fA88E16bF7406d26";
  const TOKEN_ADDRESS = "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA";
  const USDC_ADDRESS = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
  const POSITION_MANAGER = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88"; // Uniswap v3

  const FLUXX_AMOUNT = hre.ethers.parseEther("100"); // 100 FLUXX
  const USDC_AMOUNT = hre.ethers.parseUnits("10", 6); // 10 USDC (6 decimais)

  console.log("📋 Configuração da Pool:");
  console.log("   - 100 FLUXX");
  console.log("   - 10 USDC");
  console.log("   - Preço: 0.10 USDC por FLUXX");
  console.log("   - Fee: 0.30%\n");

  // 1. Verificar saldos
  console.log("1️⃣  Verificando saldos...");
  try {
    const Token = await hre.ethers.getContractFactory("Token");
    const token = Token.attach(TOKEN_ADDRESS);
    
    const balanceFLUXX = await token.balanceOf(SAFE_ADDRESS);
    const balanceUSDC = await hre.ethers.provider.getBalance(USDC_ADDRESS); // Simplificado
    
    console.log("   FLUXX na Safe:", hre.ethers.formatEther(balanceFLUXX), "FLUXX");
    console.log("   USDC na Safe: Verificar manualmente");
    
    if (balanceFLUXX < FLUXX_AMOUNT) {
      console.log("   ⚠️  Aviso: Safe pode não ter FLUXX suficiente");
    } else {
      console.log("   ✅ Saldo FLUXX suficiente");
    }
  } catch (error) {
    console.log("   ⚠️  Erro ao verificar saldos:", error.message);
  }

  // 2. Simular aprovação de FLUXX
  console.log("\n2️⃣  Simulando aprovação de FLUXX...");
  try {
    const Token = await hre.ethers.getContractFactory("Token");
    const token = Token.attach(TOKEN_ADDRESS);

    // Verificar allowance atual
    const currentAllowance = await token.allowance(SAFE_ADDRESS, POSITION_MANAGER);
    console.log("   Allowance atual:", hre.ethers.formatEther(currentAllowance), "FLUXX");

    if (currentAllowance < FLUXX_AMOUNT) {
      console.log("   ⚠️  Precisa aprovar FLUXX para Position Manager");
      console.log("   💡 Transação necessária na Safe:");
      console.log("      To:", TOKEN_ADDRESS);
      console.log("      Function: approve(address,uint256)");
      console.log("      Parâmetros:");
      console.log("        - spender:", POSITION_MANAGER);
      console.log("        - amount:", FLUXX_AMOUNT.toString());
    } else {
      console.log("   ✅ FLUXX já aprovado");
    }
  } catch (error) {
    console.log("   ⚠️  Erro:", error.message);
  }

  // 3. Simular aprovação de USDC
  console.log("\n3️⃣  Simulando aprovação de USDC...");
  console.log("   💡 Transação necessária na Safe:");
  console.log("      To:", USDC_ADDRESS);
  console.log("      Function: approve(address,uint256)");
  console.log("      Parâmetros:");
  console.log("        - spender:", POSITION_MANAGER);
  console.log("        - amount:", USDC_AMOUNT.toString());

  // 4. Simular criação da pool
  console.log("\n4️⃣  Simulando criação da pool...");
  console.log("   💡 Esta é a transação mais complexa");
  console.log("   📋 Recomendação: Use a interface do Uniswap conectada à Safe");
  console.log("   🔗 https://app.uniswap.org/");
  console.log("\n   Configurações:");
  console.log("   - Token 0: USDC (", USDC_ADDRESS, ")");
  console.log("   - Token 1: FLUXX (", TOKEN_ADDRESS, ")");
  console.log("   - Fee Tier: 0.30% (3000)");
  console.log("   - Range: Full Range");
  console.log("   - Preço inicial: 0.10 USDC por FLUXX");
  console.log("   - Amount 0: 10 USDC");
  console.log("   - Amount 1: 100 FLUXX");

  // 5. Resumo
  console.log("\n" + "=".repeat(80));
  console.log("✅ Simulação concluída!");
  console.log("\n📋 Próximos passos:");
  console.log("1. Verifique se a Safe tem 100 FLUXX e 10 USDC");
  console.log("2. Aprove FLUXX para Position Manager (se necessário)");
  console.log("3. Aprove USDC para Position Manager");
  console.log("4. Use a interface do Uniswap para criar a pool");
  console.log("   (Mais fácil que criar transação manual na Safe)");
  console.log("\n📚 Guia completo: docs/deployment/POOL_IGNICAO.md");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

