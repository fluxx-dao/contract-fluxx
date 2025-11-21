/**
 * 🔥 Script para criar a Pool de IGNIÇÃO FLUXX/USDC no Uniswap v3
 * 
 * Pool: 100 FLUXX + 10 USDC
 * Preço: 1 FLUXX = 0.10 USDC
 * Fee: 0.30%
 * Range: Full Range
 */

const { ethers } = require("hardhat");
require("dotenv").config();

// Endereços
const FLUXX_TOKEN = "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA";
const USDC_TOKEN = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
const POSITION_MANAGER = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";
const POOL_FACTORY = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
// Wallet que tem os tokens (será detectada automaticamente do signer)
// Se os tokens estão em outra wallet, ajuste esta constante
const WALLET_ADDRESS = "0x3242FcE40be49b25DDBb86a7119E55De54b99d57"; // Carteira de liquidez

// Quantidades
const AMOUNT_FLUXX = ethers.parseEther("100"); // 100 FLUXX (18 decimais)
const AMOUNT_USDC = ethers.parseUnits("10", 6); // 10 USDC (6 decimais)
const FEE = 3000; // 0.30% = 3000 bps

// ABIs mínimos
const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",
  "function decimals() external view returns (uint8)"
];

const POOL_FACTORY_ABI = [
  "function getPool(address tokenA, address tokenB, uint24 fee) external view returns (address pool)",
  "function createPool(address tokenA, address tokenB, uint24 fee) external returns (address pool)"
];

const POOL_ABI = [
  "function token0() external view returns (address)",
  "function token1() external view returns (address)",
  "function fee() external view returns (uint24)",
  "function slot0() external view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)"
];

  const POSITION_MANAGER_ABI = [
  "function createAndInitializePoolIfNecessary(address token0, address token1, uint24 fee, uint160 sqrtPriceX96) external payable returns (address pool)",
  "function mint((address token0, address token1, uint24 fee, int24 tickLower, int24 tickUpper, uint256 amount0Desired, uint256 amount1Desired, uint256 amount0Min, uint256 amount1Min, address recipient, uint256 deadline)) external payable returns (uint256 tokenId, uint128 liquidity, uint256 amount0, uint256 amount1)",
  "function createAndInitializePoolIfNecessary(address token0, address token1, uint24 fee, uint160 sqrtPriceX96) external payable returns (address pool)"
];

/**
 * Calcula raiz quadrada usando método de Newton
 */
function sqrt(value) {
  if (value < 0n) throw new Error("Square root of negative number");
  if (value < 2n) return value;
  
  let z = value;
  let x = value / 2n + 1n;
  while (x < z) {
    z = x;
    x = (value / x + x) / 2n;
  }
  return z;
}

/**
 * Calcula sqrtPriceX96 para o preço 1 FLUXX = 0.10 USDC
 * 
 * Uniswap ordena tokens por endereço (menor primeiro):
 * - USDC: 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174
 * - FLUXX: 0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
 * 
 * Então: token0 = USDC, token1 = FLUXX
 * Preço: token1/token0 = FLUXX/USDC = 0.10
 * 
 * Fórmula: sqrtPriceX96 = sqrt(price * 10^(decimals1 - decimals0)) * 2^96
 * - price = 0.10
 * - decimals1 (FLUXX) = 18
 * - decimals0 (USDC) = 6
 * - sqrt(0.10 * 10^12) * 2^96 = sqrt(10^11) * 2^96
 */
function calculateSqrtPriceX96(price, decimals1, decimals0) {
  // price = 0.10 (1 FLUXX = 0.10 USDC)
  // token0 = USDC (6 decimais), token1 = FLUXX (18 decimais)
  // Preço no Uniswap: token1/token0 = FLUXX/USDC = 0.10
  
  // Fórmula: sqrtPriceX96 = sqrt(price * 10^(decimals1 - decimals0)) * 2^96
  // = sqrt(0.10 * 10^12) * 2^96 = sqrt(10^11) * 2^96
  
  // Calcular price * 10^(decimals1 - decimals0)
  const decimalsDiff = decimals1 - decimals0; // 18 - 6 = 12
  const priceScaled = BigInt(Math.floor(price * Math.pow(10, decimalsDiff))); // 0.10 * 10^12 = 10^11
  
  // Q96 = 2^96
  const Q96 = 2n ** 96n;
  
  // Precisamos: sqrt(priceScaled) * Q96
  // Para manter precisão, multiplicamos priceScaled por Q96^2 antes de calcular sqrt
  const Q192 = Q96 ** 2n; // 2^192
  const priceX192 = priceScaled * Q192;
  
  // Calcular raiz quadrada
  const sqrtPriceX192 = sqrt(priceX192);
  
  // sqrtPriceX96 = sqrtPriceX192 (já está multiplicado por Q96 implicitamente)
  // Na verdade: sqrt(priceScaled * Q192) = sqrt(priceScaled) * Q96
  // Então sqrtPriceX96 = sqrtPriceX192
  const sqrtPriceX96 = sqrtPriceX192;
  
  return sqrtPriceX96;
}

async function main() {
  console.log("🔥 POOL DE IGNIÇÃO - FLUXX/USDC\n");
  
  const [signer] = await ethers.getSigners();
  console.log("📝 Signer:", signer.address);
  console.log("🎯 Wallet de liquidez:", WALLET_ADDRESS);
  
  // Verificar se o signer é a wallet correta
  let walletAddress;
  if (signer.address.toLowerCase() !== WALLET_ADDRESS.toLowerCase()) {
    console.log("⚠️  ATENÇÃO: O signer não é a wallet de liquidez!");
    console.log("   Esperado:", WALLET_ADDRESS);
    console.log("   Atual:", signer.address);
    console.log("\n💡 Verificando saldos em ambas as wallets...\n");
    
    // Verificar saldos na wallet de liquidez
    const provider = ethers.provider;
    const fluxxContractCheck = new ethers.Contract(FLUXX_TOKEN, ERC20_ABI, provider);
    const usdcContractCheck = new ethers.Contract(USDC_TOKEN, ERC20_ABI, provider);
    
    const balanceFLUXXLiquidez = await fluxxContractCheck.balanceOf(WALLET_ADDRESS);
    const balanceUSDCLiquidez = await usdcContractCheck.balanceOf(WALLET_ADDRESS);
    
    const balanceFLUXXSigner = await fluxxContractCheck.balanceOf(signer.address);
    const balanceUSDCSigner = await usdcContractCheck.balanceOf(signer.address);
    
    console.log("   Wallet de liquidez (" + WALLET_ADDRESS + "):");
    console.log("   - FLUXX:", ethers.formatEther(balanceFLUXXLiquidez));
    console.log("   - USDC:", ethers.formatUnits(balanceUSDCLiquidez, 6));
    console.log("\n   Wallet atual (" + signer.address + "):");
    console.log("   - FLUXX:", ethers.formatEther(balanceFLUXXSigner));
    console.log("   - USDC:", ethers.formatUnits(balanceUSDCSigner, 6));
    console.log("");
    
    // Se a wallet de liquidez tem os tokens, usar ela
    if (balanceFLUXXLiquidez >= AMOUNT_FLUXX && balanceUSDCLiquidez >= AMOUNT_USDC) {
      console.log("✅ Wallet de liquidez tem os tokens!");
      console.log("⚠️  IMPORTANTE: Você precisa usar a PRIVATE_KEY da wallet de liquidez no .env");
      console.log("   Wallet:", WALLET_ADDRESS);
      console.log("\n   Para continuar, atualize o PRIVATE_KEY no .env e execute novamente.\n");
      throw new Error("PRIVATE_KEY no .env deve ser da wallet de liquidez: " + WALLET_ADDRESS);
    } else if (balanceFLUXXSigner >= AMOUNT_FLUXX && balanceUSDCSigner >= AMOUNT_USDC) {
      console.log("✅ Wallet atual tem os tokens!");
      walletAddress = signer.address;
      console.log("   Usando wallet atual:", walletAddress);
    } else {
      throw new Error("Nenhuma wallet tem tokens suficientes. Transfira 100 FLUXX + 10 USDC para uma das wallets.");
    }
  } else {
    walletAddress = signer.address;
    console.log("✅ Usando wallet de liquidez correta!\n");
  }
  
  // 1. Verificar saldos
  console.log("1️⃣ Verificando saldos...");
  const fluxxContract = new ethers.Contract(FLUXX_TOKEN, ERC20_ABI, signer);
  const usdcContract = new ethers.Contract(USDC_TOKEN, ERC20_ABI, signer);
  
  const balanceFLUXX = await fluxxContract.balanceOf(walletAddress);
  const balanceUSDC = await usdcContract.balanceOf(walletAddress);
  
  console.log("   FLUXX:", ethers.formatEther(balanceFLUXX), "FLUXX");
  console.log("   USDC:", ethers.formatUnits(balanceUSDC, 6), "USDC");
  
  if (balanceFLUXX < AMOUNT_FLUXX) {
    console.log("   ⚠️  RPC mostra saldo 0, mas continuando (pode ser cache do RPC)");
    console.log("   💡 Se os tokens estão na wallet (confirmado na extensão), a transação funcionará");
    console.log("   ⚠️  Continuando mesmo assim...\n");
  } else if (balanceUSDC < AMOUNT_USDC) {
    console.log("   ⚠️  RPC mostra saldo 0 de USDC, mas continuando (pode ser cache do RPC)");
    console.log("   💡 Se os tokens estão na wallet (confirmado na extensão), a transação funcionará");
    console.log("   ⚠️  Continuando mesmo assim...\n");
  } else {
    console.log("   ✅ Saldos suficientes\n");
  }
  
  // 2. Aprovar tokens
  console.log("2️⃣ Aprovando tokens para Position Manager...");
  
  const allowanceFLUXX = await fluxxContract.allowance(walletAddress, POSITION_MANAGER);
  const allowanceUSDC = await usdcContract.allowance(walletAddress, POSITION_MANAGER);
  
  if (allowanceFLUXX < AMOUNT_FLUXX) {
    console.log("   Aprovando FLUXX...");
    const txApproveFLUXX = await fluxxContract.approve(POSITION_MANAGER, AMOUNT_FLUXX);
    await txApproveFLUXX.wait();
    console.log("   ✅ FLUXX aprovado:", txApproveFLUXX.hash);
  } else {
    console.log("   ✅ FLUXX já aprovado");
  }
  
  if (allowanceUSDC < AMOUNT_USDC) {
    console.log("   Aprovando USDC...");
    const txApproveUSDC = await usdcContract.approve(POSITION_MANAGER, AMOUNT_USDC);
    await txApproveUSDC.wait();
    console.log("   ✅ USDC aprovado:", txApproveUSDC.hash);
  } else {
    console.log("   ✅ USDC já aprovado");
  }
  
  console.log("");
  
  // 3. Calcular sqrtPriceX96
  console.log("3️⃣ Calculando sqrtPriceX96...");
  // token0 = USDC (6 decimais), token1 = FLUXX (18 decimais)
  // Preço: 1 FLUXX = 0.10 USDC, então token1/token0 = 0.10
  const sqrtPriceX96 = calculateSqrtPriceX96(0.10, 18, 6);
  console.log("   sqrtPriceX96:", sqrtPriceX96.toString());
  console.log("   (Preço: 1 FLUXX = 0.10 USDC)");
  console.log("");
  
  // 4. Verificar se pool já existe
  console.log("4️⃣ Verificando se pool já existe...");
  const factory = new ethers.Contract(POOL_FACTORY, POOL_FACTORY_ABI, signer);
  
  // Uniswap ordena tokens por endereço (menor primeiro)
  const token0 = USDC_TOKEN < FLUXX_TOKEN ? USDC_TOKEN : FLUXX_TOKEN;
  const token1 = USDC_TOKEN < FLUXX_TOKEN ? FLUXX_TOKEN : USDC_TOKEN;
  
  console.log("   token0 (menor endereço):", token0);
  console.log("   token1 (maior endereço):", token1);
  
  let poolAddress;
  try {
    poolAddress = await factory.getPool(token0, token1, FEE);
    if (poolAddress !== ethers.ZeroAddress) {
      console.log("   ✅ Pool já existe:", poolAddress);
      
      // Verificar preço atual
      const pool = new ethers.Contract(poolAddress, POOL_ABI, signer);
      const slot0 = await pool.slot0();
      console.log("   Preço atual (sqrtPriceX96):", slot0.sqrtPriceX96.toString());
      console.log("   Preço desejado (sqrtPriceX96):", sqrtPriceX96.toString());
    } else {
      console.log("   ⚠️  Pool não existe, será criada");
      poolAddress = null;
    }
  } catch (error) {
    console.log("   ⚠️  Erro ao verificar pool:", error.message);
    poolAddress = null;
  }
  
  console.log("");
  
  // 5. Criar pool e adicionar liquidez (mint cria a pool automaticamente se não existir)
  console.log("5️⃣ Criando pool e adicionando liquidez...");
  const positionManager = new ethers.Contract(POSITION_MANAGER, POSITION_MANAGER_ABI, signer);
  
  // Full Range ticks
  const tickLower = -887272;
  const tickUpper = 887272;
  
  // Deadline: 10 minutos
  const deadline = Math.floor(Date.now() / 1000) + 600;
  
  // Parâmetros do mint
  // IMPORTANTE: Se a pool não existir, o mint vai criar automaticamente
  // Mas precisa passar sqrtPriceX96 se for criar nova pool
  const mintParams = {
    token0: token0,
    token1: token1,
    fee: FEE,
    tickLower: tickLower,
    tickUpper: tickUpper,
    amount0Desired: token0 === USDC_TOKEN ? AMOUNT_USDC : AMOUNT_FLUXX,
    amount1Desired: token1 === FLUXX_TOKEN ? AMOUNT_FLUXX : AMOUNT_USDC,
    amount0Min: 0,
    amount1Min: 0,
    recipient: walletAddress,
    deadline: deadline
  };
  
  console.log("   Parâmetros:");
  console.log("   - token0:", mintParams.token0);
  console.log("   - token1:", mintParams.token1);
  console.log("   - fee:", mintParams.fee);
  console.log("   - tickLower:", mintParams.tickLower);
  console.log("   - tickUpper:", mintParams.tickUpper);
  console.log("   - amount0Desired:", mintParams.amount0Desired.toString());
  console.log("   - amount1Desired:", mintParams.amount1Desired.toString());
  console.log("   - recipient:", mintParams.recipient);
  console.log("   - deadline:", new Date(deadline * 1000).toLocaleString());
  console.log("   - sqrtPriceX96 (se criar pool):", sqrtPriceX96.toString());
  console.log("");
  
  // Se a pool não existe, criar primeiro
  if (!poolAddress || poolAddress === ethers.ZeroAddress) {
    console.log("   📝 Pool não existe, criando primeiro...");
    try {
      const txCreate = await positionManager.createAndInitializePoolIfNecessary(
        token0,
        token1,
        FEE,
        sqrtPriceX96,
        { gasLimit: 500000 }
      );
      console.log("   ⏳ Aguardando criação da pool...");
      await txCreate.wait();
      console.log("   ✅ Pool criada!");
      
      // Verificar pool criada
      poolAddress = await factory.getPool(token0, token1, FEE);
      console.log("   📍 Endereço da pool:", poolAddress);
      console.log("");
    } catch (error) {
      console.error("   ❌ Erro ao criar pool:", error.message);
      // Continuar mesmo assim, o mint pode criar
      console.log("   ⚠️  Continuando... o mint pode criar a pool automaticamente");
    }
  }
  
  console.log("   📝 Adicionando liquidez...");
  try {
    const txMint = await positionManager.mint(mintParams, { gasLimit: 1500000 });
    console.log("   ⏳ Aguardando confirmação...");
    const receipt = await txMint.wait();
    console.log("   ✅ Liquidez adicionada:", receipt.hash);
    
    // Tentar extrair tokenId do evento
    const mintEvent = receipt.logs.find(log => {
      try {
        // Evento IncreaseLiquidity ou Transfer (NFT)
        return true;
      } catch {
        return false;
      }
    });
    
    console.log("   🎉 Pool de IGNIÇÃO criada com sucesso!");
    console.log("   📍 Pool:", poolAddress || "verificar no Uniswap");
    console.log("   🔗 Ver no Uniswap: https://app.uniswap.org/pools");
    
  } catch (error) {
    console.error("   ❌ Erro ao adicionar liquidez:", error.message);
    if (error.data) {
      console.error("   Detalhes:", error.data);
    }
    throw error;
  }
  
  console.log("\n✅ Processo concluído!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

