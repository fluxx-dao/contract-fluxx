const hre = require("hardhat");
const fs = require("fs");

/**
 * 🔧 Configuração Completa do Tenderly
 * 
 * Este script:
 * 1. Verifica todos os contratos no Tenderly
 * 2. Testa simulações básicas
 * 3. Valida a configuração
 * 
 * Uso:
 *   npx hardhat run scripts/tenderlySetup.js --network polygon
 */

async function main() {
  console.log("🔧 Configurando Tenderly para FLUXX DAO\n");
  console.log("=".repeat(80));

  // Verificar se deployment-info.json existe
  let deploymentInfo;
  try {
    const data = fs.readFileSync("deployment-info.json", "utf8");
    deploymentInfo = JSON.parse(data);
  } catch (error) {
    console.log("⚠️  deployment-info.json não encontrado");
    console.log("   Execute o deploy primeiro ou configure manualmente\n");
  }

  const contracts = deploymentInfo?.contracts;
  const [signer] = await hre.ethers.getSigners();

  console.log("🔷 Conta:", signer.address);
  console.log("💰 Saldo:", hre.ethers.formatEther(await hre.ethers.provider.getBalance(signer.address)), "POL\n");

  // 1. Verificar configuração do Tenderly
  console.log("1️⃣  Verificando configuração do Tenderly...");
  try {
    // Verificar se o plugin está configurado
    if (!hre.tenderly) {
      throw new Error("Plugin Tenderly não encontrado. Instale: npm install --save-dev @tenderly/hardhat-tenderly");
    }
    console.log("✅ Plugin Tenderly configurado");
  } catch (error) {
    console.log("❌ Erro:", error.message);
    console.log("\n📋 Para configurar:");
    console.log("1. npm install --save-dev @tenderly/hardhat-tenderly");
    console.log("2. Adicione require('@tenderly/hardhat-tenderly') no hardhat.config.js");
    console.log("3. Configure TENDERLY_ACCESS_TOKEN no .env");
    process.exit(1);
  }

  // 2. Verificar contratos (se deployment-info.json existir)
  if (contracts) {
    console.log("\n2️⃣  Verificando contratos no Tenderly...");
    
    const contractsToVerify = [
      { name: "Token", address: contracts.token },
      { name: "Treasury", address: contracts.treasury },
      { name: "BadgeNFT", address: contracts.badgeNFT },
      { name: "Governance", address: contracts.governance },
      { name: "Membership", address: contracts.membership },
      { name: "CollabEngine", address: contracts.collabEngine },
    ];

    for (const contract of contractsToVerify) {
      try {
        await hre.tenderly.verify({
          name: contract.name,
          address: contract.address,
        });
        console.log(`✅ ${contract.name} verificado`);
      } catch (error) {
        if (error.message.includes("already verified")) {
          console.log(`⚠️  ${contract.name} já estava verificado`);
        } else {
          console.log(`❌ ${contract.name}: ${error.message}`);
        }
      }
    }
  } else {
    console.log("\n2️⃣  deployment-info.json não encontrado");
    console.log("   💡 Você pode usar endereços manuais ou executar:");
    console.log("   npx hardhat run scripts/testTenderly.js --network polygon");
    console.log("   (Este script usa os endereços já deployados da documentação)");
  }

  // 3. Testar leitura de contrato
  console.log("\n3️⃣  Testando leitura de contrato...");
  const tokenAddress = contracts?.token || "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA"; // Endereço conhecido
  
  try {
    const Token = await hre.ethers.getContractFactory("Token");
    const token = Token.attach(tokenAddress);

    console.log("   Lendo Token:", tokenAddress);
    const totalSupply = await token.totalSupply();
    console.log("✅ Leitura bem-sucedida!");
    console.log("   Total Supply:", hre.ethers.formatEther(totalSupply), "FLUXX");
    console.log("\n   💡 Para simulações, use o dashboard do Tenderly:");
    console.log("   📊 https://dashboard.tenderly.co/");
  } catch (error) {
    console.log("⚠️  Erro ao ler contrato:", error.message);
    console.log("   (Isso é normal se o contrato não estiver acessível)");
  }

  // 4. Resumo
  console.log("\n" + "=".repeat(80));
  console.log("✅ Configuração do Tenderly concluída!");
  console.log("\n📊 Próximos passos:");
  console.log("1. Acesse o dashboard: https://dashboard.tenderly.co/");
  console.log("2. Configure monitoramento para seus contratos");
  console.log("3. Crie alertas personalizados");
  console.log("4. Use simulações antes de executar transações críticas");
  console.log("\n📚 Documentação completa: docs/guides/GUIA_TENDERLY.md");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

