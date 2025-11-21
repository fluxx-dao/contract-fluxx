const hre = require("hardhat");
const { ethers } = require("hardhat");

/**
 * 🚀 Distribuição Completa de Tokens FLUXX
 * 
 * Calcula e gera transações para distribuir os 100 milhões de FLUXX
 * conforme a alocação definida.
 * 
 * Distribuição:
 * - Fundadores: 10% (10.000.000 FLUXX)
 * - Tesouro da DAO: 25% (25.000.000 FLUXX)
 * - Missões & Recompensas: 35% (35.000.000 FLUXX)
 * - Parcerias: 10% (10.000.000 FLUXX)
 * - Liquidez Inicial: 20% (20.000.000 FLUXX)
 */

// Endereços dos contratos (v0.5.1+ - NOVOS ENDEREÇOS)
const TOKEN_ADDRESS = "0x263Fe9898b8A9bba3E08403cC9054dCa39a11636";
const TREASURY_ADDRESS = "0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af";
const GNOSIS_SAFE_ADDRESS = "0xF040BbD411542F09f775E974fA88E16bF7406d26";

// Supply total: 100 milhões
const TOTAL_SUPPLY = 100_000_000;

// Distribuição (em %)
const DISTRIBUTION = {
  FUNDADORES: 10,      // 10.000.000 FLUXX
  TESOURO_DAO: 25,     // 25.000.000 FLUXX
  MISSOES: 35,         // 35.000.000 FLUXX
  PARCERIAS: 10,       // 10.000.000 FLUXX
  LIQUIDEZ: 20         // 20.000.000 FLUXX
};

// Endereços das wallets
const WALLETS = {
  // Fundadores (distribuição inicial para teste)
  FOUNDER_1: "0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f",  // 600 FLUXX (teste)
  FOUNDER_2: "0xa387691E594dF109aD9cA83767F39D419CBC6001",  // 200 FLUXX (teste)
  FOUNDER_3: "0x887b641EF4A1e99022e290dF6Ac9c81eA50AE0CD",  // 200 FLUXX (teste)
  FOUNDER_4: "0xc8b6C6cF88ecE28EfDede72ed625b95b73Cb649F",  // 200 FLUXX (teste) - VERIFICAR SE TEM 42 CHARS
  
  // Tesouro da DAO (Gnosis Safe)
  TESOURO_DAO: GNOSIS_SAFE_ADDRESS,
  
  // Liquidez Inicial
  LIQUIDEZ: "0x3242FcE40be49b25DDBb86a7119E55De54b99d57",
  
  // Missões & Recompensas (precisa definir wallet)
  MISSOES: "",  // TODO: Definir wallet para Missões
  
  // Parcerias (precisa definir wallet)
  PARCERIAS: ""  // TODO: Definir wallet para Parcerias
};

// Quantidades para teste inicial (pequenas quantidades)
const TEST_AMOUNTS = {
  FOUNDER_1: 600,   // Para registro + criar missão
  FOUNDER_2: 200,   // Para registro
  FOUNDER_3: 200,   // Para registro
  FOUNDER_4: 200    // Para registro
};

function toWei(amount) {
  return ethers.parseEther(amount.toString());
}

function formatFLUXX(amount) {
  return ethers.formatEther(amount);
}

function encodeTransfer(to, amount) {
  const iface = new ethers.Interface([
    "function transfer(address to, uint256 amount) external returns (bool)"
  ]);
  return iface.encodeFunctionData("transfer", [to, amount]);
}

function validateAddress(address, name) {
  if (!address) {
    return { valid: false, error: `Endereço vazio para ${name}` };
  }
  
  // Limpar endereço (remover espaços, converter para lowercase)
  const cleanAddress = address.trim().toLowerCase();
  
  // Verificar se começa com 0x
  if (!cleanAddress.startsWith("0x")) {
    return { valid: false, error: `${name} deve começar com 0x` };
  }
  
  // Verificar se tem 42 caracteres (0x + 40 hex)
  if (cleanAddress.length !== 42) {
    return { valid: false, error: `${name} deve ter 42 caracteres (tem ${cleanAddress.length})` };
  }
  
  // Verificar se é hex válido
  if (!/^0x[0-9a-f]{40}$/.test(cleanAddress)) {
    return { valid: false, error: `${name} contém caracteres inválidos (deve ser hexadecimal)` };
  }
  
  // Verificar checksum
  try {
    const checksumAddress = ethers.getAddress(cleanAddress);
    return { valid: true, address: checksumAddress };
  } catch (e) {
    return { valid: false, error: `${name} não é um endereço válido: ${e.message}` };
  }
}

async function main() {
  console.log("🚀 Distribuição de Tokens FLUXX\n");
  console.log("=".repeat(80));
  console.log("📊 DISTRIBUIÇÃO PLANEJADA:\n");
  console.log(`   Fundadores:        ${DISTRIBUTION.FUNDADORES}% (${(TOTAL_SUPPLY * DISTRIBUTION.FUNDADORES / 100).toLocaleString()} FLUXX)`);
  console.log(`   Tesouro DAO:       ${DISTRIBUTION.TESOURO_DAO}% (${(TOTAL_SUPPLY * DISTRIBUTION.TESOURO_DAO / 100).toLocaleString()} FLUXX)`);
  console.log(`   Missões:           ${DISTRIBUTION.MISSOES}% (${(TOTAL_SUPPLY * DISTRIBUTION.MISSOES / 100).toLocaleString()} FLUXX)`);
  console.log(`   Parcerias:         ${DISTRIBUTION.PARCERIAS}% (${(TOTAL_SUPPLY * DISTRIBUTION.PARCERIAS / 100).toLocaleString()} FLUXX)`);
  console.log(`   Liquidez:          ${DISTRIBUTION.LIQUIDEZ}% (${(TOTAL_SUPPLY * DISTRIBUTION.LIQUIDEZ / 100).toLocaleString()} FLUXX)`);
  console.log(`   TOTAL:             100% (${TOTAL_SUPPLY.toLocaleString()} FLUXX)\n`);
  console.log("=".repeat(80));
  
  // Validar endereços
  console.log("\n🔍 Validando endereços...\n");
  
  const validations = {};
  const errors = [];
  
  // Validar fundadores
  for (let i = 1; i <= 4; i++) {
    const key = `FOUNDER_${i}`;
    const address = WALLETS[key];
    if (address) {
      const validation = validateAddress(address, `Fundador #${i}`);
      if (validation.valid) {
        validations[key] = validation.address;
        console.log(`   ✅ Fundador #${i}: ${validation.address}`);
      } else {
        errors.push(validation.error);
        console.log(`   ❌ Fundador #${i}: ${validation.error}`);
      }
    } else {
      console.log(`   ⚠️  Fundador #${i}: Não configurado`);
    }
  }
  
  // Validar outras wallets
  const otherWallets = [
    { key: "TESOURO_DAO", name: "Tesouro DAO" },
    { key: "LIQUIDEZ", name: "Liquidez" },
    { key: "MISSOES", name: "Missões" },
    { key: "PARCERIAS", name: "Parcerias" }
  ];
  
  for (const wallet of otherWallets) {
    const address = WALLETS[wallet.key];
    if (address) {
      const validation = validateAddress(address, wallet.name);
      if (validation.valid) {
        validations[wallet.key] = validation.address;
        console.log(`   ✅ ${wallet.name}: ${validation.address}`);
      } else {
        errors.push(validation.error);
        console.log(`   ❌ ${wallet.name}: ${validation.error}`);
      }
    } else {
      console.log(`   ⚠️  ${wallet.name}: Não configurado`);
    }
  }
  
  if (errors.length > 0) {
    console.log("\n" + "=".repeat(80));
    console.log("❌ ERROS ENCONTRADOS:\n");
    errors.forEach(err => console.log(`   - ${err}`));
    console.log("\n⚠️  Corrija os endereços antes de continuar.\n");
    process.exit(1);
  }
  
  console.log("\n" + "=".repeat(80));
  console.log("📋 TRANSAÇÕES PARA TESTE INICIAL\n");
  console.log("(Pequenas quantidades para testar o sistema)\n");
  
  // Gerar transações para teste inicial
  const testTransactions = [];
  
  // Fundadores (quantidades pequenas para teste)
  if (validations.FOUNDER_1) {
    const amount = TEST_AMOUNTS.FOUNDER_1;
    const amountWei = toWei(amount);
    const data = encodeTransfer(validations.FOUNDER_1, amountWei);
    testTransactions.push({
      to: TOKEN_ADDRESS,
      value: "0",
      data: data,
      operation: 0,
      description: `Fundador #1: ${amount} FLUXX`
    });
    console.log(`✅ Fundador #1: ${amount} FLUXX → ${validations.FOUNDER_1}`);
  }
  
  if (validations.FOUNDER_2) {
    const amount = TEST_AMOUNTS.FOUNDER_2;
    const amountWei = toWei(amount);
    const data = encodeTransfer(validations.FOUNDER_2, amountWei);
    testTransactions.push({
      to: TOKEN_ADDRESS,
      value: "0",
      data: data,
      operation: 0,
      description: `Fundador #2: ${amount} FLUXX`
    });
    console.log(`✅ Fundador #2: ${amount} FLUXX → ${validations.FOUNDER_2}`);
  }
  
  if (validations.FOUNDER_3) {
    const amount = TEST_AMOUNTS.FOUNDER_3;
    const amountWei = toWei(amount);
    const data = encodeTransfer(validations.FOUNDER_3, amountWei);
    testTransactions.push({
      to: TOKEN_ADDRESS,
      value: "0",
      data: data,
      operation: 0,
      description: `Fundador #3: ${amount} FLUXX`
    });
    console.log(`✅ Fundador #3: ${amount} FLUXX → ${validations.FOUNDER_3}`);
  }
  
  if (validations.FOUNDER_4) {
    const amount = TEST_AMOUNTS.FOUNDER_4;
    const amountWei = toWei(amount);
    const data = encodeTransfer(validations.FOUNDER_4, amountWei);
    testTransactions.push({
      to: TOKEN_ADDRESS,
      value: "0",
      data: data,
      operation: 0,
      description: `Fundador #4: ${amount} FLUXX`
    });
    console.log(`✅ Fundador #4: ${amount} FLUXX → ${validations.FOUNDER_4}`);
  }
  
  console.log("\n" + "=".repeat(80));
  console.log("📦 JSON BATCH PARA TESTE INICIAL\n");
  
  // Remover description do JSON final
  const jsonTransactions = testTransactions.map(tx => ({
    to: tx.to,
    value: tx.value,
    data: tx.data,
    operation: tx.operation
  }));
  
  console.log(JSON.stringify(jsonTransactions, null, 2));
  
  // Salvar arquivo
  const fs = require("fs");
  fs.writeFileSync("test-transfers.json", JSON.stringify(jsonTransactions, null, 2));
  console.log("\n💾 JSON salvo em: test-transfers.json");
  
  // Mostrar próximos passos
  console.log("\n" + "=".repeat(80));
  console.log("📋 PRÓXIMOS PASSOS\n");
  console.log("1. ✅ TESTE INICIAL (agora):");
  console.log("   - Execute as transações acima no Safe");
  console.log("   - Teste o sistema com os fundadores");
  console.log("\n2. 📝 DISTRIBUIÇÃO COMPLETA (depois do teste):");
  console.log("   - Defina wallets para Missões e Parcerias");
  console.log("   - Execute distribuição completa:");
  console.log(`     • Fundadores: ${(TOTAL_SUPPLY * DISTRIBUTION.FUNDADORES / 100).toLocaleString()} FLUXX`);
  console.log(`     • Tesouro DAO: ${(TOTAL_SUPPLY * DISTRIBUTION.TESOURO_DAO / 100).toLocaleString()} FLUXX`);
  console.log(`     • Missões: ${(TOTAL_SUPPLY * DISTRIBUTION.MISSOES / 100).toLocaleString()} FLUXX`);
  console.log(`     • Parcerias: ${(TOTAL_SUPPLY * DISTRIBUTION.PARCERIAS / 100).toLocaleString()} FLUXX`);
  console.log(`     • Liquidez: ${(TOTAL_SUPPLY * DISTRIBUTION.LIQUIDEZ / 100).toLocaleString()} FLUXX`);
  console.log("\n3. 🔗 Link para Safe Transaction Builder:");
  console.log(`   https://app.safe.global/apps/open?safe=matic:${GNOSIS_SAFE_ADDRESS}&appUrl=https%3A%2F%2Fapps-portal.safe.global%2Ftx-builder\n`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

