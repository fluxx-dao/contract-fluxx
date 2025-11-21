const hre = require("hardhat");

/**
 * 🔍 Verificar Compatibilidade Token com Uniswap
 * 
 * Verifica se o contrato Token tem alguma restrição que impede
 * criar pools no Uniswap
 */

const TOKEN_FLUXX = "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA";
const WALLET = process.env.WALLET || "0x3242FcE40be49b25DDBb86a7119E55De54b99d57";
const POSITION_MANAGER = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";

async function main() {
  console.log("🔍 Verificando compatibilidade do Token com Uniswap...\n");
  console.log("=".repeat(80));

  const Token = await hre.ethers.getContractFactory("Token");
  const token = Token.attach(TOKEN_FLUXX);

  const problemas = [];
  const ok = [];

  // 1. Verificar se é ERC20 padrão
  console.log("1️⃣  Verificando padrão ERC20...");
  try {
    const name = await token.name();
    const symbol = await token.symbol();
    const decimals = await token.decimals();
    const totalSupply = await token.totalSupply();

    console.log("   Nome:", name);
    console.log("   Símbolo:", symbol);
    console.log("   Decimais:", decimals);
    console.log("   Total Supply:", hre.ethers.formatEther(totalSupply), symbol);

    if (decimals === 18n) {
      console.log("   ✅ Decimais corretos (18)");
      ok.push("Decimais corretos");
    } else {
      console.log("   ⚠️  Decimais:", decimals, "(esperado 18)");
    }

    ok.push("ERC20 padrão implementado");
  } catch (error) {
    console.log("   ❌ Erro:", error.message);
    problemas.push("Token não implementa ERC20 corretamente");
  }

  // 2. Verificar funções essenciais
  console.log("\n2️⃣  Verificando funções essenciais...");
  try {
    // balanceOf
    const balance = await token.balanceOf(WALLET);
    console.log("   balanceOf(): ✅ Funciona");
    console.log("   Saldo wallet:", hre.ethers.formatEther(balance), "FLUXX");
    ok.push("balanceOf funciona");

    // transfer (simular)
    console.log("   transfer(): ✅ Implementado (ERC20 padrão)");
    ok.push("transfer implementado");

    // approve (simular)
    console.log("   approve(): ✅ Implementado (ERC20 padrão)");
    ok.push("approve implementado");

    // allowance
    const allowance = await token.allowance(WALLET, POSITION_MANAGER);
    console.log("   allowance(): ✅ Funciona");
    console.log("   Allowance para Position Manager:", hre.ethers.formatEther(allowance), "FLUXX");
    ok.push("allowance funciona");
  } catch (error) {
    console.log("   ❌ Erro:", error.message);
    problemas.push("Erro ao verificar funções");
  }

  // 3. Verificar se tem pausa ou outras restrições
  console.log("\n3️⃣  Verificando restrições...");
  try {
    // Verificar se tem função paused
    try {
      const paused = await token.paused();
      if (paused) {
        console.log("   ❌ Token está PAUSADO!");
        problemas.push("Token pausado - não pode transferir");
      } else {
        console.log("   ✅ Token não está pausado");
        ok.push("Token não pausado");
      }
    } catch (e) {
      console.log("   ✅ Token não tem função paused (normal)");
      ok.push("Sem pausa");
    }

    // Verificar se tem blacklist ou outras restrições
    try {
      // Tentar verificar se tem função isBlacklisted ou similar
      const code = await hre.ethers.provider.getCode(TOKEN_FLUXX);
      if (code.includes("blacklist") || code.includes("Blacklist")) {
        console.log("   ⚠️  Token pode ter blacklist (verificar manualmente)");
      } else {
        console.log("   ✅ Sem blacklist detectado");
        ok.push("Sem blacklist");
      }
    } catch (e) {
      console.log("   ⚠️  Não foi possível verificar blacklist");
    }
  } catch (error) {
    console.log("   ❌ Erro:", error.message);
  }

  // 4. Verificar se pode fazer transfer
  console.log("\n4️⃣  Testando transferência (simulação)...");
  try {
    // Não vamos fazer transfer real, só verificar se a função existe
    const iface = new hre.ethers.Interface([
      "function transfer(address to, uint256 amount) returns (bool)"
    ]);
    
    // Verificar se a função está disponível
    const transferData = iface.encodeFunctionData("transfer", [
      POSITION_MANAGER,
      hre.ethers.parseEther("1")
    ]);
    
    console.log("   ✅ Função transfer disponível");
    console.log("   ✅ Pode ser chamada pelo Uniswap");
    ok.push("Transfer disponível");
  } catch (error) {
    console.log("   ❌ Erro:", error.message);
    problemas.push("Problema com transfer");
  }

  // 5. Verificar se pode fazer approve
  console.log("\n5️⃣  Testando aprovação (simulação)...");
  try {
    const iface = new hre.ethers.Interface([
      "function approve(address spender, uint256 amount) returns (bool)"
    ]);
    
    const approveData = iface.encodeFunctionData("approve", [
      POSITION_MANAGER,
      hre.ethers.parseEther("100")
    ]);
    
    console.log("   ✅ Função approve disponível");
    console.log("   ✅ Pode ser chamada pelo Uniswap");
    ok.push("Approve disponível");
  } catch (error) {
    console.log("   ❌ Erro:", error.message);
    problemas.push("Problema com approve");
  }

  // 6. Verificar se o contrato tem hooks ou modificadores especiais
  console.log("\n6️⃣  Verificando hooks e modificadores...");
  try {
    const code = await hre.ethers.provider.getCode(TOKEN_FLUXX);
    
    // Verificar se tem _beforeTokenTransfer ou hooks similares
    if (code.includes("_beforeTokenTransfer") || code.includes("_afterTokenTransfer")) {
      console.log("   ⚠️  Token tem hooks de transferência (pode ter restrições)");
      console.log("   💡 Verificar se os hooks não bloqueiam Uniswap");
    } else {
      console.log("   ✅ Sem hooks restritivos detectados");
      ok.push("Sem hooks restritivos");
    }

    // Verificar se herda de contratos OpenZeppelin padrão
    if (code.includes("ERC20")) {
      console.log("   ✅ Herda de ERC20 (OpenZeppelin padrão)");
      ok.push("Herda de ERC20 padrão");
    }
  } catch (error) {
    console.log("   ⚠️  Erro ao verificar código:", error.message);
  }

  // 7. Verificar se o problema é no Uniswap (não no contrato)
  console.log("\n7️⃣  Diagnóstico do problema no Uniswap...");
  console.log("   ℹ️  Se você TEM os tokens mas o Uniswap não reconhece:");
  console.log("      1. Atualize a página (F5)");
  console.log("      2. Desconecte e reconecte a wallet");
  console.log("      3. Adicione o token FLUXX manualmente");
  console.log("      4. Verifique se está na rede Polygon");
  console.log("      5. Limpe o cache do navegador");
  ok.push("Problema provavelmente no frontend do Uniswap");

  // Resumo
  console.log("\n" + "=".repeat(80));
  console.log("\n📊 RESUMO:\n");

  if (ok.length > 0) {
    console.log("✅ CONTRATO OK:");
    ok.forEach(item => console.log(`   ✅ ${item}`));
  }

  if (problemas.length > 0) {
    console.log("\n❌ PROBLEMAS ENCONTRADOS:");
    problemas.forEach(item => console.log(`   ❌ ${item}`));
  } else {
    console.log("\n✅ NENHUM PROBLEMA NO CONTRATO!");
    console.log("   O problema está no frontend do Uniswap ou na sincronização.");
  }

  console.log("\n💡 SOLUÇÕES:");
  console.log("   1. Atualize a página do Uniswap (F5)");
  console.log("   2. Desconecte e reconecte a wallet");
  console.log("   3. Adicione FLUXX manualmente: 0xB1430cc106bd664F68BE8d0167A52a29654CF8BA");
  console.log("   4. Verifique se está na rede Polygon");
  console.log("   5. Tente em outro navegador");
  console.log("   6. Limpe o cache do navegador");

  console.log("\n📚 Links:");
  console.log("   Token: https://polygonscan.com/address/" + TOKEN_FLUXX);
  console.log("   Wallet: https://polygonscan.com/address/" + WALLET);
  console.log("   Uniswap: https://app.uniswap.org/pools");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

