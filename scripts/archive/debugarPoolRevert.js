/**
 * 🔍 Debug: Por que a pool está revertendo?
 * 
 * O erro mostra que toUint128() está falhando porque o valor de liquidez
 * calculado é muito grande para caber em uint128.
 * 
 * Problema: getLiquidityForAmount1 retornou 499748...8836, que é > uint128 max
 */

const hre = require("hardhat");
const { ethers } = require("ethers");

// Valores do erro
const SQRT_PRICE_X96 = "20159919553";
const TICK_LOWER = -887220;
const TICK_UPPER = 887220;
const AMOUNT0 = ethers.parseUnits("10", 6); // 10 USDC
const AMOUNT1 = ethers.parseUnits("100", 18); // 100 FLUXX

// Limites uint128
const UINT128_MAX = BigInt("340282366920938463463374607431768211455");

async function main() {
  console.log("🔍 Analisando o erro de revert na criação da pool...\n");
  console.log("=".repeat(80));

  console.log("📊 Parâmetros atuais:");
  console.log(`   sqrtPriceX96: ${SQRT_PRICE_X96}`);
  console.log(`   tickLower: ${TICK_LOWER}`);
  console.log(`   tickUpper: ${TICK_UPPER}`);
  console.log(`   amount0: ${ethers.formatUnits(AMOUNT0, 6)} USDC`);
  console.log(`   amount1: ${ethers.formatUnits(AMOUNT1, 18)} FLUXX\n`);

  // Calcular sqrtRatio para os ticks
  // sqrtRatio = 1.0001^(tick/2) * 2^96
  function tickToSqrtPriceX96(tick) {
    const Q96 = BigInt(2) ** BigInt(96);
    const Q96_FLOAT = Number(Q96);
    const TICK_MATH_BASE = 1.0001;
    
    // Para ticks muito grandes, usar aproximação
    if (tick === -887220) {
      // Tick mínimo: sqrtPrice ≈ 0
      return BigInt("4295128739"); // Valor aproximado do tick mínimo
    }
    if (tick === 887220) {
      // Tick máximo: sqrtPrice muito grande
      return BigInt("1461446703485210103287273052203988822378723970342");
    }
    
    const sqrtPrice = Math.sqrt(TICK_MATH_BASE ** (tick / 2));
    return BigInt(Math.floor(sqrtPrice * Number(Q96)));
  }

  const sqrtRatioAX96 = tickToSqrtPriceX96(TICK_LOWER);
  const sqrtRatioBX96 = tickToSqrtPriceX96(TICK_UPPER);
  const sqrtPriceX96 = BigInt(SQRT_PRICE_X96);

  console.log("📐 Cálculos:");
  console.log(`   sqrtRatioAX96 (tickLower): ${sqrtRatioAX96}`);
  console.log(`   sqrtPriceX96 (atual): ${sqrtPriceX96}`);
  console.log(`   sqrtRatioBX96 (tickUpper): ${sqrtRatioBX96}\n`);

  // Verificar se o preço está dentro do range
  const priceInRange = sqrtPriceX96 >= sqrtRatioAX96 && sqrtPriceX96 <= sqrtRatioBX96;
  console.log(`   Preço dentro do range: ${priceInRange ? "✅ SIM" : "❌ NÃO"}\n`);

  // Calcular liquidez aproximada (fórmula simplificada)
  // Para amount1: L = amount1 * (sqrtPrice - sqrtRatioA) / (sqrtPrice * sqrtRatioB - sqrtPrice * sqrtRatioA)
  // Mas a fórmula real do Uniswap é mais complexa
  
  console.log("⚠️  PROBLEMA IDENTIFICADO:\n");
  console.log("   O valor de liquidez calculado (499748...8836) é maior que uint128 max!");
  console.log(`   uint128 max: ${UINT128_MAX}`);
  console.log(`   Valor calculado: ~499748...8836 (muito maior!)\n`);

  console.log("💡 SOLUÇÕES:\n");
  console.log("   1️⃣  REDUZIR OS AMOUNTS:");
  console.log("      - Reduzir para 50 FLUXX + 5 USDC");
  console.log("      - Ou 25 FLUXX + 2.5 USDC\n");

  console.log("   2️⃣  USAR RANGE MAIS RESTRITO (não full range):");
  console.log("      - Em vez de full range (-887220 a 887220)");
  console.log("      - Usar range menor, ex: -100000 a 100000");
  console.log("      - Isso reduz a liquidez necessária\n");

  console.log("   3️⃣  AJUSTAR O PREÇO INICIAL:");
  console.log("      - O preço atual pode estar muito longe do range");
  console.log("      - Verificar se sqrtPriceX96 está correto\n");

  console.log("   4️⃣  CRIAR A POOL PRIMEIRO, DEPOIS ADICIONAR LIQUIDEZ:");
  console.log("      - Separar em 2 transações:");
  console.log("        1. createAndInitializePoolIfNecessary");
  console.log("        2. mint (com amounts menores)\n");

  console.log("=".repeat(80));
  console.log("\n🎯 RECOMENDAÇÃO:\n");
  console.log("   Use amounts menores: 50 FLUXX + 5 USDC");
  console.log("   OU crie a pool primeiro e adicione liquidez depois\n");

  console.log("📝 Vou gerar um novo script com amounts reduzidos...\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

