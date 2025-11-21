const hre = require("hardhat");

/**
 * 🚀 Criar Pool Uniswap - Script Completo
 * 
 * Este script prepara TODA a transação para criar a pool FLUXX/USDC
 * no Uniswap v3. Você só precisa copiar e colar na Safe.
 * 
 * Uso:
 *   npx hardhat run scripts/criarPoolUniswap.js --network polygon
 */

async function main() {
  console.log("🚀 Preparando transação para criar Pool FLUXX/USDC...\n");
  console.log("=".repeat(80));

  // Endereços
  const SAFE_ADDRESS = "0xF040BbD411542F09f775E974fA88E16bF7406d26";
  const TOKEN_FLUXX = "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA";
  const TOKEN_USDC = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
  const POSITION_MANAGER = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88"; // Uniswap v3

  // Parâmetros da pool
  const FLUXX_AMOUNT = hre.ethers.parseEther("100"); // 100 FLUXX
  const USDC_AMOUNT = hre.ethers.parseUnits("10", 6); // 10 USDC (6 decimais)
  const FEE = 3000; // 0.30%
  
  // Full Range ticks
  const TICK_LOWER = -887272; // Full Range inferior
  const TICK_UPPER = 887272;  // Full Range superior
  
  // Deadline (1 ano no futuro)
  const deadline = Math.floor(Date.now() / 1000) + 31536000;

  console.log("📋 Configuração da Pool:");
  console.log("   - Token 0: USDC (", TOKEN_USDC, ")");
  console.log("   - Token 1: FLUXX (", TOKEN_FLUXX, ")");
  console.log("   - Fee: 0.30% (3000)");
  console.log("   - Range: Full Range");
  console.log("   - Amount 0: 10 USDC");
  console.log("   - Amount 1: 100 FLUXX");
  console.log("   - Preço: 0.10 USDC por FLUXX\n");

  // Criar interface do Position Manager
  const positionManagerABI = [
    "function mint((address token0, address token1, uint24 fee, int24 tickLower, int24 tickUpper, uint256 amount0Desired, uint256 amount1Desired, uint256 amount0Min, uint256 amount1Min, address recipient, uint256 deadline)) returns (uint256 tokenId, uint128 liquidity, uint256 amount0, uint256 amount1)"
  ];

  const positionManager = new hre.ethers.Interface(positionManagerABI);

  // Preparar parâmetros do mint
  const mintParams = {
    token0: TOKEN_USDC,      // USDC (menor endereço)
    token1: TOKEN_FLUXX,     // FLUXX (maior endereço)
    fee: FEE,                // 0.30%
    tickLower: TICK_LOWER,    // Full Range
    tickUpper: TICK_UPPER,    // Full Range
    amount0Desired: USDC_AMOUNT,  // 10 USDC
    amount1Desired: FLUXX_AMOUNT,  // 100 FLUXX
    amount0Min: 0,           // Slippage mínimo
    amount1Min: 0,           // Slippage mínimo
    recipient: SAFE_ADDRESS,  // Receber NFT na Safe
    deadline: deadline        // Deadline
  };

  // Codificar a função mint
  const encodedData = positionManager.encodeFunctionData("mint", [mintParams]);

  console.log("=".repeat(80));
  console.log("✅ TRANSAÇÃO PRONTA PARA COPIAR E COLAR NA SAFE\n");
  console.log("=".repeat(80));
  console.log("\n📋 DADOS PARA A SAFE:\n");
  console.log("To:", POSITION_MANAGER);
  console.log("Function: mint");
  console.log("\nParâmetros (struct MintParams):");
  console.log("  token0:", TOKEN_USDC);
  console.log("  token1:", TOKEN_FLUXX);
  console.log("  fee:", FEE, "(0.30%)");
  console.log("  tickLower:", TICK_LOWER, "(Full Range)");
  console.log("  tickUpper:", TICK_UPPER, "(Full Range)");
  console.log("  amount0Desired:", USDC_AMOUNT.toString(), "(10 USDC)");
  console.log("  amount1Desired:", FLUXX_AMOUNT.toString(), "(100 FLUXX)");
  console.log("  amount0Min: 0");
  console.log("  amount1Min: 0");
  console.log("  recipient:", SAFE_ADDRESS, "(a própria Safe)");
  console.log("  deadline:", deadline);
  
  console.log("\n" + "=".repeat(80));
  console.log("📋 DATA HEX (para copiar direto):\n");
  console.log(encodedData);
  
  console.log("\n" + "=".repeat(80));
  console.log("📝 INSTRUÇÕES:\n");
  console.log("1. Acesse: https://app.safe.global/");
  console.log("2. Vá em: New Transaction → Contract Interaction");
  console.log("3. To:", POSITION_MANAGER);
  console.log("4. Cole o DATA HEX acima");
  console.log("5. OU configure manualmente os parâmetros acima");
  console.log("6. Revise e execute");
  console.log("\n⚠️  IMPORTANTE:");
  console.log("   - Certifique-se de que as aprovações foram feitas");
  console.log("   - Verifique saldos antes de executar");
  console.log("   - Esta transação criará a pool e você receberá um NFT");
  
  console.log("\n" + "=".repeat(80));
  console.log("✅ Script concluído!");
  console.log("\n💡 Dica: Use a interface do Uniswap se preferir (mais fácil)");
  console.log("   Mas esta transação também funciona na Safe!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

