/**
 * Script para verificar saldos na wallet de liquidez
 */

const { ethers } = require("hardhat");
require("dotenv").config();

const FLUXX_TOKEN = "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA";
const USDC_TOKEN = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
const WALLET_LIQUIDEZ = "0x3242FcE40be49b25DDBb86a7119E55De54b99d57";

const ERC20_ABI = [
  "function balanceOf(address account) external view returns (uint256)",
  "function decimals() external view returns (uint8)"
];

async function main() {
  console.log("🔍 Verificando saldos na wallet de liquidez\n");
  console.log("📍 Wallet:", WALLET_LIQUIDEZ);
  console.log("");
  
  const provider = ethers.provider;
  const fluxxContract = new ethers.Contract(FLUXX_TOKEN, ERC20_ABI, provider);
  const usdcContract = new ethers.Contract(USDC_TOKEN, ERC20_ABI, provider);
  
  // Verificar saldo de MATIC
  const balanceMATIC = await provider.getBalance(WALLET_LIQUIDEZ);
  console.log("💰 MATIC:", ethers.formatEther(balanceMATIC), "POL");
  
  // Verificar saldo de FLUXX
  const balanceFLUXX = await fluxxContract.balanceOf(WALLET_LIQUIDEZ);
  const decimalsFLUXX = await fluxxContract.decimals();
  console.log("💰 FLUXX:", ethers.formatUnits(balanceFLUXX, decimalsFLUXX), "FLUXX");
  
  // Verificar saldo de USDC
  const balanceUSDC = await usdcContract.balanceOf(WALLET_LIQUIDEZ);
  const decimalsUSDC = await usdcContract.decimals();
  console.log("💰 USDC:", ethers.formatUnits(balanceUSDC, decimalsUSDC), "USDC");
  
  console.log("");
  console.log("📊 Resumo:");
  console.log("   ✅ Necessário: 100 FLUXX + 10 USDC");
  console.log("   " + (balanceFLUXX >= ethers.parseUnits("100", decimalsFLUXX) ? "✅" : "❌") + " FLUXX:", ethers.formatUnits(balanceFLUXX, decimalsFLUXX));
  console.log("   " + (balanceUSDC >= ethers.parseUnits("10", decimalsUSDC) ? "✅" : "❌") + " USDC:", ethers.formatUnits(balanceUSDC, decimalsUSDC));
  console.log("   " + (balanceMATIC >= ethers.parseEther("0.05") ? "✅" : "❌") + " MATIC:", ethers.formatEther(balanceMATIC), "POL");
  
  if (balanceFLUXX >= ethers.parseUnits("100", decimalsFLUXX) && 
      balanceUSDC >= ethers.parseUnits("10", decimalsUSDC) &&
      balanceMATIC >= ethers.parseEther("0.05")) {
    console.log("\n✅ Wallet pronta para criar a pool!");
    console.log("💡 Use a PRIVATE_KEY desta wallet no .env para executar criarPoolIgnicao.js");
  } else {
    console.log("\n⚠️  Wallet não tem tokens suficientes");
    console.log("💡 Transfira os tokens necessários para esta wallet");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

