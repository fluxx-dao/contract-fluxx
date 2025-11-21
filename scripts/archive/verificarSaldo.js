const hre = require("hardhat");

/**
 * 🔍 Verificar Saldo de Tokens na Wallet
 * 
 * Verifica se a wallet tem os tokens necessários para criar a pool.
 * 
 * Uso:
 *   WALLET=0x... npx hardhat run scripts/verificarSaldo.js --network polygon
 */

async function main() {
  const walletAddress = process.env.WALLET || "0x3242FcE40be49b25DDBb86a7119E55De54b99d57";
  
  console.log("🔍 Verificando saldos na wallet...\n");
  console.log("=".repeat(80));
  console.log("Wallet:", walletAddress);
  console.log("Rede: Polygon\n");

  const TOKEN_FLUXX = "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA";
  const TOKEN_USDC = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

  // Verificar FLUXX
  console.log("1️⃣  Verificando FLUXX...");
  try {
    const Token = await hre.ethers.getContractFactory("Token");
    const token = Token.attach(TOKEN_FLUXX);
    
    const balanceFLUXX = await token.balanceOf(walletAddress);
    const balanceFormatted = hre.ethers.formatEther(balanceFLUXX);
    
    console.log("   Saldo:", balanceFormatted, "FLUXX");
    
    if (balanceFLUXX >= hre.ethers.parseEther("100")) {
      console.log("   ✅ Saldo suficiente (precisa 100 FLUXX)");
    } else {
      console.log("   ❌ Saldo insuficiente (precisa 100 FLUXX)");
      console.log("   💡 Transfira 100 FLUXX da Safe para esta wallet");
    }
  } catch (error) {
    console.log("   ❌ Erro ao verificar FLUXX:", error.message);
  }

  // Verificar USDC (simplificado - precisa do ABI completo)
  console.log("\n2️⃣  Verificando USDC...");
  try {
    // USDC tem 6 decimais
    const usdcABI = [
      "function balanceOf(address account) view returns (uint256)",
      "function decimals() view returns (uint8)"
    ];
    const usdc = new hre.ethers.Contract(TOKEN_USDC, usdcABI, hre.ethers.provider);
    
    const balanceUSDC = await usdc.balanceOf(walletAddress);
    const decimals = await usdc.decimals();
    const balanceFormatted = hre.ethers.formatUnits(balanceUSDC, decimals);
    
    console.log("   Saldo:", balanceFormatted, "USDC");
    
    if (balanceUSDC >= hre.ethers.parseUnits("10", 6)) {
      console.log("   ✅ Saldo suficiente (precisa 10 USDC)");
    } else {
      console.log("   ❌ Saldo insuficiente (precisa 10 USDC)");
    }
  } catch (error) {
    console.log("   ⚠️  Erro ao verificar USDC:", error.message);
    console.log("   💡 Verifique manualmente no PolygonScan");
  }

  // Verificar POL
  console.log("\n3️⃣  Verificando POL (gas)...");
  try {
    const balancePOL = await hre.ethers.provider.getBalance(walletAddress);
    const balanceFormatted = hre.ethers.formatEther(balancePOL);
    
    console.log("   Saldo:", balanceFormatted, "POL");
    
    if (balancePOL >= hre.ethers.parseEther("0.1")) {
      console.log("   ✅ Saldo suficiente para gas");
    } else {
      console.log("   ⚠️  Saldo baixo (pode não ter gas suficiente)");
    }
  } catch (error) {
    console.log("   ❌ Erro ao verificar POL:", error.message);
  }

  console.log("\n" + "=".repeat(80));
  console.log("✅ Verificação concluída!");
  console.log("\n📊 Verifique também no PolygonScan:");
  console.log("   https://polygonscan.com/address/" + walletAddress);
  console.log("\n💡 Se o saldo aparecer aqui mas não no Uniswap:");
  console.log("   1. Atualize a página do Uniswap (F5)");
  console.log("   2. Desconecte e reconecte a wallet");
  console.log("   3. Adicione o token FLUXX manualmente");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

