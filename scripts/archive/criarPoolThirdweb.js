/**
 * 🚀 Criar Pool FLUXX/USDC - Calldatas para Safe
 * 
 * Este script gera os calldatas necessários para criar a pool
 * via Gnosis Safe Transaction Builder usando ethers.js.
 * 
 * Não requer Thirdweb SDK - usa apenas ethers.js (já instalado)
 * 
 * Uso:
 *   npx hardhat run scripts/criarPoolThirdweb.js --network polygon
 */

const hre = require("hardhat");
const { ethers } = require("ethers");

// ============================================
// CONFIGURAÇÃO
// ============================================

const SAFE_ADDRESS = "0xF040BbD411542F09f775E974fA88E16bF7406d26";
const POSITION_MANAGER = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";
const FLUXX = "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA";
const USDC = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

// Parâmetros da pool
const FEE_TIER = 3000; // 0.30%
const FLUXX_AMOUNT = ethers.parseUnits("100", 18); // 100 FLUXX
const USDC_AMOUNT = ethers.parseUnits("10", 6); // 10 USDC
const INITIAL_PRICE = 0.10; // 1 FLUXX = 0.10 USDC

// Full Range ticks
const TICK_LOWER = -887220;
const TICK_UPPER = 887220;

// sqrtPriceX96 calculado para 0.10 USDC por FLUXX
// token0 = USDC (menor endereço), token1 = FLUXX
// price = 1 FLUXX / 0.10 USDC = 10
// Com decimais: (1 * 10^18) / (0.10 * 10^6) = 10^13
// sqrtPriceX96 ≈ 20159919553
const SQRT_PRICE_X96 = "20159919553";

async function main() {
  console.log("🚀 Gerando calldatas para criar Pool FLUXX/USDC via Safe\n");
  console.log("=".repeat(80));

  console.log("📋 Configuração:");
  console.log(`   Safe: ${SAFE_ADDRESS}`);
  console.log(`   FLUXX: ${FLUXX}`);
  console.log(`   USDC: ${USDC}`);
  console.log(`   Fee: ${FEE_TIER / 10000}%`);
  console.log(`   Preço inicial: ${INITIAL_PRICE} USDC por FLUXX`);
  console.log(`   Amount: ${ethers.formatUnits(FLUXX_AMOUNT, 18)} FLUXX + ${ethers.formatUnits(USDC_AMOUNT, 6)} USDC\n`);

  // Ordenar tokens (token0 < token1)
  const token0 = USDC < FLUXX ? USDC : FLUXX;
  const token1 = USDC < FLUXX ? FLUXX : USDC;

  console.log(`   Token0 (menor endereço): ${token0}`);
  console.log(`   Token1 (maior endereço): ${token1}\n`);

  // ============================================
  // 1. APPROVE FLUXX
  // ============================================

  console.log("1️⃣  Preparando approve FLUXX...");
  try {
    const fluxxABI = [
      "function approve(address spender, uint256 amount) returns (bool)"
    ];
    const fluxxInterface = new ethers.Interface(fluxxABI);
    const approveFluxxCalldata = fluxxInterface.encodeFunctionData("approve", [
      POSITION_MANAGER,
      FLUXX_AMOUNT
    ]);

    console.log("   ✅ Calldata gerado!");
    console.log(`   To: ${FLUXX}`);
    console.log(`   Data: ${approveFluxxCalldata}\n`);
  } catch (error) {
    console.log("   ❌ Erro:", error.message);
  }

  // ============================================
  // 2. APPROVE USDC
  // ============================================

  console.log("2️⃣  Preparando approve USDC...");
  try {
    const usdcABI = [
      "function approve(address spender, uint256 amount) returns (bool)"
    ];
    const usdcInterface = new ethers.Interface(usdcABI);
    const approveUsdcCalldata = usdcInterface.encodeFunctionData("approve", [
      POSITION_MANAGER,
      USDC_AMOUNT
    ]);

    console.log("   ✅ Calldata gerado!");
    console.log(`   To: ${USDC}`);
    console.log(`   Data: ${approveUsdcCalldata}\n`);
  } catch (error) {
    console.log("   ❌ Erro:", error.message);
  }

  // ============================================
  // 3. CREATE AND INITIALIZE POOL
  // ============================================

  console.log("3️⃣  Preparando createAndInitializePoolIfNecessary...");
  try {
    const positionManagerABI = [
      "function createAndInitializePoolIfNecessary(address tokenA, address tokenB, uint24 fee, uint160 sqrtPriceX96) returns (address pool)"
    ];
    const positionManagerInterface = new ethers.Interface(positionManagerABI);
    const createPoolCalldata = positionManagerInterface.encodeFunctionData(
      "createAndInitializePoolIfNecessary",
      [token0, token1, FEE_TIER, SQRT_PRICE_X96]
    );

    console.log("   ✅ Calldata gerado!");
    console.log(`   To: ${POSITION_MANAGER}`);
    console.log(`   Data: ${createPoolCalldata}\n`);
    console.log(`   Parâmetros:`);
    console.log(`   - tokenA: ${token0}`);
    console.log(`   - tokenB: ${token1}`);
    console.log(`   - fee: ${FEE_TIER}`);
    console.log(`   - sqrtPriceX96: ${SQRT_PRICE_X96}\n`);
  } catch (error) {
    console.log("   ❌ Erro:", error.message);
  }

  // ============================================
  // 4. MINT (Add Liquidity)
  // ============================================

  console.log("4️⃣  Preparando mint (add liquidity)...");
  try {
    const positionManagerABI = [
      "function mint((address token0, address token1, uint24 fee, int24 tickLower, int24 tickUpper, uint256 amount0Desired, uint256 amount1Desired, uint256 amount0Min, uint256 amount1Min, address recipient, uint256 deadline)) returns (uint256 tokenId, uint128 liquidity, uint256 amount0, uint256 amount1)"
    ];
    const positionManagerInterface = new ethers.Interface(positionManagerABI);

    // Ordenar amounts baseado na ordem dos tokens
    const amount0 = token0 === USDC ? USDC_AMOUNT : FLUXX_AMOUNT;
    const amount1 = token0 === USDC ? FLUXX_AMOUNT : USDC_AMOUNT;

    const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hora

    const mintParams = [
      token0,
      token1,
      FEE_TIER,
      TICK_LOWER,
      TICK_UPPER,
      amount0,
      amount1,
      0n,
      0n,
      SAFE_ADDRESS,
      BigInt(deadline)
    ];

    const mintCalldata = positionManagerInterface.encodeFunctionData("mint", [mintParams]);

    console.log("   ✅ Calldata gerado!");
    console.log(`   To: ${POSITION_MANAGER}`);
    console.log(`   Data: ${mintCalldata}\n`);
    console.log(`   Parâmetros:`);
    console.log(`   - token0: ${token0}`);
    console.log(`   - token1: ${token1}`);
    console.log(`   - fee: ${FEE_TIER}`);
    console.log(`   - tickLower: ${TICK_LOWER}`);
    console.log(`   - tickUpper: ${TICK_UPPER}`);
    console.log(`   - amount0Desired: ${ethers.formatUnits(amount0, token0 === USDC ? 6 : 18)}`);
    console.log(`   - amount1Desired: ${ethers.formatUnits(amount1, token1 === FLUXX ? 18 : 6)}`);
    console.log(`   - recipient: ${SAFE_ADDRESS}`);
    console.log(`   - deadline: ${deadline}\n`);
  } catch (error) {
    console.log("   ❌ Erro:", error.message);
  }

  // ============================================
  // RESUMO COMPLETO
  // ============================================

  console.log("=".repeat(80));
  console.log("\n📊 RESUMO - TRANSAÇÕES PARA SAFE TRANSACTION BUILDER:\n");

  console.log("📋 ORDEM DE EXECUÇÃO (IMPORTANTE!):\n");

  // Recalcular calldatas para o resumo
  const fluxxABI = ["function approve(address spender, uint256 amount) returns (bool)"];
  const usdcABI = ["function approve(address spender, uint256 amount) returns (bool)"];
  const positionManagerABI = [
    "function createAndInitializePoolIfNecessary(address tokenA, address tokenB, uint24 fee, uint160 sqrtPriceX96) returns (address pool)",
    "function mint((address token0, address token1, uint24 fee, int24 tickLower, int24 tickUpper, uint256 amount0Desired, uint256 amount1Desired, uint256 amount0Min, uint256 amount1Min, address recipient, uint256 deadline)) returns (uint256 tokenId, uint128 liquidity, uint256 amount0, uint256 amount1)"
  ];

  const fluxxInterface = new ethers.Interface(fluxxABI);
  const usdcInterface = new ethers.Interface(usdcABI);
  const pmInterface = new ethers.Interface(positionManagerABI);

  const approveFluxxData = fluxxInterface.encodeFunctionData("approve", [POSITION_MANAGER, FLUXX_AMOUNT]);
  const approveUsdcData = usdcInterface.encodeFunctionData("approve", [POSITION_MANAGER, USDC_AMOUNT]);
  const createPoolData = pmInterface.encodeFunctionData("createAndInitializePoolIfNecessary", [token0, token1, FEE_TIER, SQRT_PRICE_X96]);
  
  const amount0 = token0 === USDC ? USDC_AMOUNT : FLUXX_AMOUNT;
  const amount1 = token0 === USDC ? FLUXX_AMOUNT : USDC_AMOUNT;
  const deadline = Math.floor(Date.now() / 1000) + 3600;
  const mintData = pmInterface.encodeFunctionData("mint", [[
    token0,
    token1,
    FEE_TIER,
    TICK_LOWER,
    TICK_UPPER,
    amount0,
    amount1,
    0n,
    0n,
    SAFE_ADDRESS,
    BigInt(deadline)
  ]]);

  console.log("1️⃣  APPROVE FLUXX");
  console.log("   To: " + FLUXX);
  console.log("   Value: 0");
  console.log("   Data: " + approveFluxxData);
  console.log("   Function: approve(" + POSITION_MANAGER + ", " + ethers.formatUnits(FLUXX_AMOUNT, 18) + " FLUXX)\n");

  console.log("2️⃣  APPROVE USDC");
  console.log("   To: " + USDC);
  console.log("   Value: 0");
  console.log("   Data: " + approveUsdcData);
  console.log("   Function: approve(" + POSITION_MANAGER + ", " + ethers.formatUnits(USDC_AMOUNT, 6) + " USDC)\n");

  console.log("3️⃣  CREATE AND INITIALIZE POOL");
  console.log("   To: " + POSITION_MANAGER);
  console.log("   Value: 0");
  console.log("   Data: " + createPoolData);
  console.log("   Function: createAndInitializePoolIfNecessary");
  console.log("   - tokenA: " + token0 + " (USDC)");
  console.log("   - tokenB: " + token1 + " (FLUXX)");
  console.log("   - fee: " + FEE_TIER + " (0.30%)");
  console.log("   - sqrtPriceX96: " + SQRT_PRICE_X96 + "\n");

  console.log("4️⃣  MINT (Add Liquidity)");
  console.log("   To: " + POSITION_MANAGER);
  console.log("   Value: 0");
  console.log("   Data: " + mintData);
  console.log("   Function: mint");
  console.log("   - Full Range: tickLower=" + TICK_LOWER + ", tickUpper=" + TICK_UPPER);
  console.log("   - Amount: " + ethers.formatUnits(USDC_AMOUNT, 6) + " USDC + " + ethers.formatUnits(FLUXX_AMOUNT, 18) + " FLUXX");
  console.log("   - Recipient: " + SAFE_ADDRESS + "\n");

  console.log("=".repeat(80));
  console.log("\n💡 PRÓXIMOS PASSOS:\n");
  console.log("1. Acesse: https://app.safe.global/");
  console.log("2. Abra sua Safe: " + SAFE_ADDRESS);
  console.log("3. Vá em 'Apps' → 'Transaction Builder'");
  console.log("4. Adicione cada transação na ordem (1, 2, 3, 4)");
  console.log("5. Revise todas as transações");
  console.log("6. Assine e execute\n");

  console.log("✅ Calldatas prontos para usar no Safe Transaction Builder!");
  console.log("\n📚 Documentação: docs/guides/CRIAR_POOL_VIA_SAFE_SDK.md");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

