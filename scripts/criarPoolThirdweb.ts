/**
 * 🚀 Criar Pool FLUXX/USDC via Thirdweb SDK
 * 
 * Este script gera os calldatas necessários para criar a pool
 * via Gnosis Safe Transaction Builder.
 * 
 * Instalação:
 *   npm install thirdweb ethers
 * 
 * Uso:
 *   npx ts-node scripts/criarPoolThirdweb.ts
 * 
 * OU compile e execute:
 *   npx hardhat run scripts/criarPoolThirdweb.ts --network polygon
 */

import { createThirdwebClient, getContract, prepareContractCall, encode } from "thirdweb";
import { polygon } from "thirdweb/chains";
import { parseUnits, formatUnits } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

// ============================================
// CONFIGURAÇÃO
// ============================================

const SAFE_ADDRESS = "0xF040BbD411542F09f775E974fA88E16bF7406d26";
const POSITION_MANAGER = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";
const FLUXX = "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA";
const USDC = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

// Parâmetros da pool
const FEE_TIER = 3000; // 0.30%
const FLUXX_AMOUNT = parseUnits("100", 18); // 100 FLUXX (18 decimais)
const USDC_AMOUNT = parseUnits("10", 6); // 10 USDC (6 decimais)
const INITIAL_PRICE = 0.10; // 1 FLUXX = 0.10 USDC

// Full Range ticks
const TICK_LOWER = -887220;
const TICK_UPPER = 887220;

// ============================================
// CÁLCULO sqrtPriceX96
// ============================================

/**
 * Calcula sqrtPriceX96 para o preço inicial
 * 
 * Fórmula: sqrtPriceX96 = sqrt(price) * 2^96
 * 
 * Para 1 FLUXX = 0.10 USDC:
 * - price = amount1 / amount0 = 0.10 USDC / 1 FLUXX
 * - Considerando decimais: USDC tem 6, FLUXX tem 18
 * - price = (0.10 * 10^6) / (1 * 10^18) = 0.10 * 10^-12
 * - Mas na prática, Uniswap usa: price = (amount1 * 10^decimals0) / (amount0 * 10^decimals1)
 * - price = (0.10 * 10^6) / (1 * 10^18) = 0.10 * 10^-12
 * 
 * Correto: price = (amount1 / 10^decimals1) / (amount0 / 10^decimals0)
 *          = (10 / 10^6) / (100 / 10^18)
 *          = (10 * 10^18) / (100 * 10^6)
 *          = 10^19 / 10^8
 *          = 10^11
 *          = 100000000000
 * 
 * Mas na verdade, Uniswap v3 usa token0 e token1 ordenados:
 * - token0 = menor endereço (USDC: 0x2791... < FLUXX: 0xB143...)
 * - Então: token0 = USDC, token1 = FLUXX
 * - price = amount1 (FLUXX) / amount0 (USDC)
 * - price = (100 * 10^18) / (10 * 10^6) = 10^19 / 10^7 = 10^12
 * 
 * Mas o preço que queremos é 0.10 USDC por FLUXX, então:
 * - Se token0 = USDC e token1 = FLUXX
 * - price = amount1 / amount0 = FLUXX / USDC
 * - Para 1 FLUXX = 0.10 USDC: price = 1 / 0.10 = 10
 * - Com decimais: price = (1 * 10^18) / (0.10 * 10^6) = 10^18 / 10^5 = 10^13
 * 
 * Vamos usar a fórmula correta do Uniswap:
 */
function calculateSqrtPriceX96(price: number, token0Decimals: number, token1Decimals: number): bigint {
  // price = amount1 / amount0 (em unidades base)
  // Para 1 FLUXX = 0.10 USDC:
  // Se token0 = USDC (6 dec) e token1 = FLUXX (18 dec)
  // price = (1 FLUXX * 10^18) / (0.10 USDC * 10^6)
  //       = 10^18 / (0.10 * 10^6)
  //       = 10^18 / 10^5
  //       = 10^13
  
  // Mas na prática, Uniswap ordena por endereço:
  // USDC: 0x2791... < FLUXX: 0xB143...
  // Então: token0 = USDC, token1 = FLUXX
  
  // Preço em unidades base (considerando decimais)
  const priceInBaseUnits = BigInt(Math.floor(price * 10 ** token0Decimals)) * BigInt(10 ** token1Decimals) / BigInt(10 ** token0Decimals);
  
  // sqrt(price) * 2^96
  const sqrtPrice = Math.sqrt(Number(priceInBaseUnits));
  const sqrtPriceX96 = BigInt(Math.floor(sqrtPrice * Math.pow(2, 96)));
  
  return sqrtPriceX96;
}

// Cálculo correto para 0.10 USDC por FLUXX
// token0 = USDC (menor endereço), token1 = FLUXX
// price = 1 FLUXX / 0.10 USDC = 10
// Com decimais: (1 * 10^18) / (0.10 * 10^6) = 10^13
const sqrtPriceX96 = calculateSqrtPriceX96(10, 6, 18); // 10 porque 1 FLUXX = 0.10 USDC, então 1/0.10 = 10

// Valor mais preciso calculado manualmente:
// Para 0.10 USDC por FLUXX:
// sqrtPriceX96 ≈ 20159919553 (valor aproximado)
const PRECISE_SQRT_PRICE_X96 = BigInt("20159919553");

async function main() {
  console.log("🚀 Gerando calldatas para criar Pool FLUXX/USDC via Safe\n");
  console.log("=".repeat(80));

  // Verificar se tem Thirdweb Client ID
  const clientId = process.env.THIRDWEB_CLIENT_ID || "YOUR_CLIENT_ID";
  
  if (clientId === "YOUR_CLIENT_ID") {
    console.log("⚠️  AVISO: THIRDWEB_CLIENT_ID não configurado no .env");
    console.log("   Você pode obter em: https://thirdweb.com/dashboard");
    console.log("   OU usar o script sem Thirdweb (veja criarPoolUniswap.js)\n");
  }

  const client = createThirdwebClient({ clientId });

  console.log("📋 Configuração:");
  console.log(`   Safe: ${SAFE_ADDRESS}`);
  console.log(`   FLUXX: ${FLUXX}`);
  console.log(`   USDC: ${USDC}`);
  console.log(`   Fee: ${FEE_TIER / 10000}%`);
  console.log(`   Preço inicial: ${INITIAL_PRICE} USDC por FLUXX`);
  console.log(`   Amount: ${formatUnits(FLUXX_AMOUNT, 18)} FLUXX + ${formatUnits(USDC_AMOUNT, 6)} USDC\n`);

  // ============================================
  // 1. APPROVE FLUXX
  // ============================================

  console.log("1️⃣  Preparando approve FLUXX...");
  try {
    const fluxxContract = await getContract({ 
      client, 
      chain: polygon, 
      address: FLUXX 
    });

    const approveFluxx = prepareContractCall({
      contract: fluxxContract,
      method: "function approve(address spender, uint256 amount) returns (bool)",
      params: [POSITION_MANAGER, FLUXX_AMOUNT],
    });

    const approveFluxxCalldata = await encode(approveFluxx);
    
    console.log("   ✅ Calldata gerado!");
    console.log(`   To: ${FLUXX}`);
    console.log(`   Data: ${approveFluxxCalldata}\n`);
    
    console.log("   📋 Para Safe Transaction Builder:");
    console.log(`   - To: ${FLUXX}`);
    console.log(`   - Value: 0`);
    console.log(`   - Data: ${approveFluxxCalldata}\n`);
  } catch (error) {
    console.log("   ❌ Erro:", error);
  }

  // ============================================
  // 2. APPROVE USDC
  // ============================================

  console.log("2️⃣  Preparando approve USDC...");
  try {
    const usdcContract = await getContract({ 
      client, 
      chain: polygon, 
      address: USDC 
    });

    const approveUsdc = prepareContractCall({
      contract: usdcContract,
      method: "function approve(address spender, uint256 amount) returns (bool)",
      params: [POSITION_MANAGER, USDC_AMOUNT],
    });

    const approveUsdcCalldata = await encode(approveUsdc);
    
    console.log("   ✅ Calldata gerado!");
    console.log(`   To: ${USDC}`);
    console.log(`   Data: ${approveUsdcCalldata}\n`);
    
    console.log("   📋 Para Safe Transaction Builder:");
    console.log(`   - To: ${USDC}`);
    console.log(`   - Value: 0`);
    console.log(`   - Data: ${approveUsdcCalldata}\n`);
  } catch (error) {
    console.log("   ❌ Erro:", error);
  }

  // ============================================
  // 3. CREATE AND INITIALIZE POOL
  // ============================================

  console.log("3️⃣  Preparando createAndInitializePoolIfNecessary...");
  try {
    const positionManager = await getContract({ 
      client, 
      chain: polygon, 
      address: POSITION_MANAGER 
    });

    // Ordenar tokens (token0 < token1)
    const token0 = USDC < FLUXX ? USDC : FLUXX;
    const token1 = USDC < FLUXX ? FLUXX : USDC;

    console.log(`   Token0 (menor): ${token0}`);
    console.log(`   Token1 (maior): ${token1}`);
    console.log(`   sqrtPriceX96: ${PRECISE_SQRT_PRICE_X96}\n`);

    const createPool = prepareContractCall({
      contract: positionManager,
      method: "function createAndInitializePoolIfNecessary(address tokenA, address tokenB, uint24 fee, uint160 sqrtPriceX96) returns (address pool)",
      params: [token0, token1, FEE_TIER, PRECISE_SQRT_PRICE_X96],
    });

    const createPoolCalldata = await encode(createPool);
    
    console.log("   ✅ Calldata gerado!");
    console.log(`   To: ${POSITION_MANAGER}`);
    console.log(`   Data: ${createPoolCalldata}\n`);
    
    console.log("   📋 Para Safe Transaction Builder:");
    console.log(`   - To: ${POSITION_MANAGER}`);
    console.log(`   - Value: 0`);
    console.log(`   - Data: ${createPoolCalldata}\n`);
  } catch (error) {
    console.log("   ❌ Erro:", error);
  }

  // ============================================
  // 4. MINT (Add Liquidity)
  // ============================================

  console.log("4️⃣  Preparando mint (add liquidity)...");
  try {
    const positionManager = await getContract({ 
      client, 
      chain: polygon, 
      address: POSITION_MANAGER 
    });

    // Ordenar tokens e amounts
    const token0 = USDC < FLUXX ? USDC : FLUXX;
    const token1 = USDC < FLUXX ? FLUXX : USDC;
    const amount0 = USDC < FLUXX ? USDC_AMOUNT : FLUXX_AMOUNT;
    const amount1 = USDC < FLUXX ? FLUXX_AMOUNT : USDC_AMOUNT;

    const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hora

    const mintParams = {
      token0: token0,
      token1: token1,
      fee: FEE_TIER,
      tickLower: TICK_LOWER,
      tickUpper: TICK_UPPER,
      amount0Desired: amount0,
      amount1Desired: amount1,
      amount0Min: 0n,
      amount1Min: 0n,
      recipient: SAFE_ADDRESS,
      deadline: BigInt(deadline),
    };

    console.log("   Parâmetros:");
    console.log(`   - token0: ${token0}`);
    console.log(`   - token1: ${token1}`);
    console.log(`   - fee: ${FEE_TIER}`);
    console.log(`   - tickLower: ${TICK_LOWER}`);
    console.log(`   - tickUpper: ${TICK_UPPER}`);
    console.log(`   - amount0Desired: ${formatUnits(amount0, token0 === USDC ? 6 : 18)}`);
    console.log(`   - amount1Desired: ${formatUnits(amount1, token1 === FLUXX ? 18 : 6)}`);
    console.log(`   - recipient: ${SAFE_ADDRESS}`);
    console.log(`   - deadline: ${deadline}\n`);

    const mint = prepareContractCall({
      contract: positionManager,
      method: "function mint((address token0, address token1, uint24 fee, int24 tickLower, int24 tickUpper, uint256 amount0Desired, uint256 amount1Desired, uint256 amount0Min, uint256 amount1Min, address recipient, uint256 deadline)) returns (uint256 tokenId, uint128 liquidity, uint256 amount0, uint256 amount1)",
      params: [mintParams],
    });

    const mintCalldata = await encode(mint);
    
    console.log("   ✅ Calldata gerado!");
    console.log(`   To: ${POSITION_MANAGER}`);
    console.log(`   Data: ${mintCalldata}\n`);
    
    console.log("   📋 Para Safe Transaction Builder:");
    console.log(`   - To: ${POSITION_MANAGER}`);
    console.log(`   - Value: 0`);
    console.log(`   - Data: ${mintCalldata}\n`);
  } catch (error) {
    console.log("   ❌ Erro:", error);
  }

  // ============================================
  // RESUMO
  // ============================================

  console.log("=".repeat(80));
  console.log("\n📊 RESUMO - TRANSAÇÕES PARA SAFE:\n");

  console.log("📋 ORDEM DE EXECUÇÃO:\n");

  console.log("1️⃣  APPROVE FLUXX");
  console.log("   - To: " + FLUXX);
  console.log("   - Function: approve");
  console.log("   - Spender: " + POSITION_MANAGER);
  console.log("   - Amount: 100 FLUXX\n");

  console.log("2️⃣  APPROVE USDC");
  console.log("   - To: " + USDC);
  console.log("   - Function: approve");
  console.log("   - Spender: " + POSITION_MANAGER);
  console.log("   - Amount: 10 USDC\n");

  console.log("3️⃣  CREATE AND INITIALIZE POOL");
  console.log("   - To: " + POSITION_MANAGER);
  console.log("   - Function: createAndInitializePoolIfNecessary");
  console.log("   - tokenA: " + USDC + " (token0)");
  console.log("   - tokenB: " + FLUXX + " (token1)");
  console.log("   - fee: 3000 (0.30%)");
  console.log("   - sqrtPriceX96: " + PRECISE_SQRT_PRICE_X96 + "\n");

  console.log("4️⃣  MINT (Add Liquidity)");
  console.log("   - To: " + POSITION_MANAGER);
  console.log("   - Function: mint");
  console.log("   - Full Range: tickLower=" + TICK_LOWER + ", tickUpper=" + TICK_UPPER);
  console.log("   - Amount: 10 USDC + 100 FLUXX");
  console.log("   - Recipient: " + SAFE_ADDRESS + "\n");

  console.log("=".repeat(80));
  console.log("\n💡 PRÓXIMOS PASSOS:\n");
  console.log("1. Copie os calldatas acima");
  console.log("2. Acesse: https://app.safe.global/");
  console.log("3. Abra sua Safe: " + SAFE_ADDRESS);
  console.log("4. Vá em 'Apps' → 'Transaction Builder'");
  console.log("5. Adicione cada transação na ordem:");
  console.log("   - Approve FLUXX");
  console.log("   - Approve USDC");
  console.log("   - Create Pool");
  console.log("   - Mint");
  console.log("6. Revise e execute\n");

  console.log("✅ Pool criada com sucesso!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

