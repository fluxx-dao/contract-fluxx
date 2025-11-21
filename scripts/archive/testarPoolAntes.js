/**
 * 🧪 Testar Criação da Pool ANTES de Executar na Mainnet
 * 
 * Este script testa a criação da pool em um fork da Polygon
 * usando Tenderly ou Hardhat local fork.
 * 
 * Opções de teste:
 * 1. Tenderly Fork (recomendado) - fork real da Polygon
 * 2. Hardhat Fork - fork local da Polygon
 * 3. Polygon Mumbai Testnet - testnet oficial
 * 
 * Uso:
 *   # Tenderly Fork:
 *   npx hardhat run scripts/testarPoolAntes.js --network tenderly
 * 
 *   # Hardhat Fork:
 *   npx hardhat run scripts/testarPoolAntes.js --network hardhat
 * 
 *   # Mumbai Testnet:
 *   npx hardhat run scripts/testarPoolAntes.js --network mumbai
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

// Parâmetros da pool (REDUZIDOS para teste)
const FEE_TIER = 3000;
const FLUXX_AMOUNT = ethers.parseUnits("50", 18); // 50 FLUXX
const USDC_AMOUNT = ethers.parseUnits("5", 6); // 5 USDC
const SQRT_PRICE_X96 = "20159919553";
const TICK_LOWER = -887220;
const TICK_UPPER = 887220;

async function main() {
  console.log("🧪 TESTANDO CRIAÇÃO DA POOL ANTES DE EXECUTAR NA MAINNET\n");
  console.log("=".repeat(80));

  const network = await hre.ethers.provider.getNetwork();
  console.log(`📡 Rede: ${network.name} (Chain ID: ${network.chainId})\n`);

  // Verificar se é fork ou testnet
  const isFork = network.chainId === 137n || network.name === "hardhat" || network.name === "tenderly";
  const isTestnet = network.chainId === 80001n; // Mumbai

  if (isFork) {
    console.log("✅ Modo Fork detectado - usando contratos da mainnet\n");
  } else if (isTestnet) {
    console.log("✅ Testnet detectado - Mumbai\n");
    console.log("⚠️  ATENÇÃO: Contratos precisam estar deployados na Mumbai!\n");
  } else {
    console.log("⚠️  AVISO: Rede não reconhecida. Continuando...\n");
  }

  // Obter signer
  const [signer] = await hre.ethers.getSigners();
  console.log("🔷 Conta de teste:", signer.address);
  
  const balance = await hre.ethers.provider.getBalance(signer.address);
  console.log("💰 Saldo:", hre.ethers.formatEther(balance), "POL/ETH\n");

  // ============================================
  // 1. VERIFICAR SALDOS
  // ============================================

  console.log("1️⃣  Verificando saldos...\n");

  // Verificar FLUXX
  try {
    const Token = await hre.ethers.getContractFactory("Token");
    const token = Token.attach(FLUXX);
    const balanceFLUXX = await token.balanceOf(signer.address);
    console.log(`   FLUXX: ${hre.ethers.formatEther(balanceFLUXX)} FLUXX`);
    
    if (balanceFLUXX < FLUXX_AMOUNT) {
      console.log(`   ⚠️  Saldo insuficiente! Precisa: ${ethers.formatEther(FLUXX_AMOUNT)} FLUXX`);
      if (isFork) {
        console.log("   💡 Em fork, você pode fazer transfer do contrato diretamente");
      }
    } else {
      console.log(`   ✅ Saldo suficiente`);
    }
  } catch (error) {
    console.log(`   ❌ Erro ao verificar FLUXX: ${error.message}`);
  }

  // Verificar USDC
  try {
    const usdcABI = [
      "function balanceOf(address account) view returns (uint256)",
      "function decimals() view returns (uint8)"
    ];
    const usdc = new hre.ethers.Contract(USDC, usdcABI, hre.ethers.provider);
    const balanceUSDC = await usdc.balanceOf(signer.address);
    const decimals = await usdc.decimals();
    console.log(`   USDC: ${hre.ethers.formatUnits(balanceUSDC, decimals)} USDC`);
    
    if (balanceUSDC < USDC_AMOUNT) {
      console.log(`   ⚠️  Saldo insuficiente! Precisa: ${ethers.formatUnits(USDC_AMOUNT, 6)} USDC`);
    } else {
      console.log(`   ✅ Saldo suficiente`);
    }
  } catch (error) {
    console.log(`   ❌ Erro ao verificar USDC: ${error.message}`);
  }

  console.log("");

  // ============================================
  // 2. APROVAR TOKENS
  // ============================================

  console.log("2️⃣  Aprovando tokens...\n");

  try {
    // Approve FLUXX
    const Token = await hre.ethers.getContractFactory("Token");
    const token = Token.attach(FLUXX);
    
    const allowanceFLUXX = await token.allowance(signer.address, POSITION_MANAGER);
    if (allowanceFLUXX < FLUXX_AMOUNT) {
      console.log("   Aprovando FLUXX...");
      const txApproveFLUXX = await token.approve(POSITION_MANAGER, FLUXX_AMOUNT);
      console.log("   ⏳ Aguardando confirmação...");
      await txApproveFLUXX.wait();
      console.log("   ✅ FLUXX aprovado!");
    } else {
      console.log("   ✅ FLUXX já aprovado");
    }

    // Approve USDC
    const usdcABI = [
      "function approve(address spender, uint256 amount) returns (bool)",
      "function allowance(address owner, address spender) view returns (uint256)"
    ];
    const usdc = new hre.ethers.Contract(USDC, usdcABI, signer);
    
    const allowanceUSDC = await usdc.allowance(signer.address, POSITION_MANAGER);
    if (allowanceUSDC < USDC_AMOUNT) {
      console.log("   Aprovando USDC...");
      const txApproveUSDC = await usdc.approve(POSITION_MANAGER, USDC_AMOUNT);
      console.log("   ⏳ Aguardando confirmação...");
      await txApproveUSDC.wait();
      console.log("   ✅ USDC aprovado!");
    } else {
      console.log("   ✅ USDC já aprovado");
    }
  } catch (error) {
    console.log(`   ❌ Erro ao aprovar: ${error.message}`);
    throw error;
  }

  console.log("");

  // ============================================
  // 3. CRIAR POOL
  // ============================================

  console.log("3️⃣  Criando pool...\n");

  try {
    const positionManagerABI = [
      "function createAndInitializePoolIfNecessary(address tokenA, address tokenB, uint24 fee, uint160 sqrtPriceX96) returns (address pool)"
    ];
    const positionManager = new hre.ethers.Contract(POSITION_MANAGER, positionManagerABI, signer);

    const token0 = USDC < FLUXX ? USDC : FLUXX;
    const token1 = USDC < FLUXX ? FLUXX : USDC;

    console.log(`   Token0: ${token0}`);
    console.log(`   Token1: ${token1}`);
    console.log(`   Fee: ${FEE_TIER} (0.30%)`);
    console.log(`   sqrtPriceX96: ${SQRT_PRICE_X96}\n`);

    console.log("   ⏳ Enviando transação...");
    const txCreatePool = await positionManager.createAndInitializePoolIfNecessary(
      token0,
      token1,
      FEE_TIER,
      SQRT_PRICE_X96
    );
    
    console.log("   ⏳ Aguardando confirmação...");
    const receipt = await txCreatePool.wait();
    
    console.log(`   ✅ Pool criada!`);
    console.log(`   📋 Hash: ${receipt.hash}`);
    
    // Tentar extrair endereço da pool do evento (se disponível)
    const poolAddress = receipt.logs.find(log => {
      try {
        const parsed = positionManager.interface.parseLog(log);
        return parsed.name === "PoolCreated";
      } catch {
        return false;
      }
    });
    
    if (poolAddress) {
      console.log(`   📍 Pool address: ${poolAddress.address}`);
    }
  } catch (error) {
    console.log(`   ❌ Erro ao criar pool: ${error.message}`);
    if (error.message.includes("Pool already exists")) {
      console.log("   ℹ️  Pool já existe - continuando...");
    } else {
      throw error;
    }
  }

  console.log("");

  // ============================================
  // 4. ADICIONAR LIQUIDEZ
  // ============================================

  console.log("4️⃣  Adicionando liquidez...\n");

  try {
    const positionManagerABI = [
      "function mint((address token0, address token1, uint24 fee, int24 tickLower, int24 tickUpper, uint256 amount0Desired, uint256 amount1Desired, uint256 amount0Min, uint256 amount1Min, address recipient, uint256 deadline)) returns (uint256 tokenId, uint128 liquidity, uint256 amount0, uint256 amount1)"
    ];
    const positionManager = new hre.ethers.Contract(POSITION_MANAGER, positionManagerABI, signer);

    const token0 = USDC < FLUXX ? USDC : FLUXX;
    const token1 = USDC < FLUXX ? FLUXX : USDC;
    const amount0 = token0 === USDC ? USDC_AMOUNT : FLUXX_AMOUNT;
    const amount1 = token0 === USDC ? FLUXX_AMOUNT : USDC_AMOUNT;
    const deadline = Math.floor(Date.now() / 1000) + 3600;

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
      recipient: signer.address, // Receber NFT na conta de teste
      deadline: BigInt(deadline),
    };

    console.log("   Parâmetros:");
    console.log(`   - Amount0: ${ethers.formatUnits(amount0, token0 === USDC ? 6 : 18)}`);
    console.log(`   - Amount1: ${ethers.formatUnits(amount1, token1 === FLUXX ? 18 : 6)}`);
    console.log(`   - Range: ${TICK_LOWER} a ${TICK_UPPER} (Full Range)`);
    console.log(`   - Recipient: ${signer.address}\n`);

    console.log("   ⏳ Enviando transação...");
    const txMint = await positionManager.mint(mintParams);
    
    console.log("   ⏳ Aguardando confirmação...");
    const receipt = await txMint.wait();
    
    console.log(`   ✅ Liquidez adicionada!`);
    console.log(`   📋 Hash: ${receipt.hash}`);
    
    // Tentar extrair tokenId do evento
    const mintEvent = receipt.logs.find(log => {
      try {
        const parsed = positionManager.interface.parseLog(log);
        return parsed.name === "IncreaseLiquidity" || parsed.name === "Transfer";
      } catch {
        return false;
      }
    });
    
    if (mintEvent) {
      console.log(`   🎫 NFT Position criada!`);
    }
  } catch (error) {
    console.log(`   ❌ Erro ao adicionar liquidez: ${error.message}`);
    console.log(`   📊 Detalhes do erro:`);
    console.log(`      ${error}`);
    throw error;
  }

  console.log("\n" + "=".repeat(80));
  console.log("\n✅ TESTE CONCLUÍDO COM SUCESSO!\n");
  console.log("📊 Resumo:");
  console.log("   ✅ Aprovações funcionaram");
  console.log("   ✅ Pool criada");
  console.log("   ✅ Liquidez adicionada");
  console.log("\n💡 Agora você pode executar na mainnet com confiança!");
  console.log("   Use: scripts/poolSafeTransactionReduzido.json\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ ERRO NO TESTE:");
    console.error(error);
    console.error("\n💡 Verifique:");
    console.error("   - Saldos suficientes");
    console.error("   - Contratos deployados");
    console.error("   - Rede configurada corretamente");
    process.exit(1);
  });

