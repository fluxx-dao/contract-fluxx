const hre = require("hardhat");

/**
 * 🎨 Configurar URIs dos Badges no BadgeNFT
 * 
 * Este script configura as URIs dos metadados JSON dos badges no contrato BadgeNFT.
 * 
 * ⚠️ IMPORTANTE: O contrato é owned pelo Safe, então você precisa:
 * 1. Ter a chave privada de uma wallet que seja signatária do Safe
 * 2. OU executar as transações via Safe CLI
 */

async function main() {
  const deploymentInfo = require("../deployment-info.json");
  const badgeNFTAddress = deploymentInfo.contracts.badgeNFT;
  
  // URIs IPFS dos metadados JSON
  const badgeURIs = {
    1: "ipfs://bafkreifx3oyygr5ektwwne2zy23boefcaj3b56t2gmqed42zxpmnq56xpe", // Membro Ativo
    2: "ipfs://bafkreibodhsmtbebgpyxynje57obt3udfrfpi2u7uogw6u5t5fjelilgrq", // Colaborador
    3: "ipfs://bafkreih6oh6cvac77xkfylrcuqigr5xvjubz6mvb7hqzspsfh7ealydpvy", // Aplicador
    4: "ipfs://bafkreibxdzvgubsjbqp6yttc5qend7pmrbubildomlhxaa2qskiagjamci"  // Referral
  };

  console.log("🎨 Configurando URIs dos Badges no BadgeNFT\n");
  console.log("=".repeat(80));
  console.log(`Contrato BadgeNFT: ${badgeNFTAddress}\n`);

  const [signer] = await hre.ethers.getSigners();
  console.log("🔷 Usando conta:", signer.address);
  console.log("💰 Saldo:", hre.ethers.formatEther(await hre.ethers.provider.getBalance(signer.address)), "POL\n");

  // Verificar se a conta é owner do BadgeNFT
  const BadgeNFT = await hre.ethers.getContractFactory("BadgeNFT");
  const badgeNFT = BadgeNFT.attach(badgeNFTAddress);
  
  const owner = await badgeNFT.owner();
  console.log("👤 Owner do BadgeNFT:", owner);
  console.log("🔷 Sua conta:", signer.address);
  
  if (owner.toLowerCase() !== signer.address.toLowerCase()) {
    console.log("\n⚠️  ATENÇÃO: Sua conta não é owner do BadgeNFT!");
    console.log("   O owner é o Safe:", owner);
    console.log("\n📋 Opções:");
    console.log("   1. Use uma wallet que seja signatária do Safe");
    console.log("   2. Execute as transações via Safe CLI");
    console.log("   3. Use o Safe Transaction Builder (manual)");
    console.log("\n💡 Continuando mesmo assim para testar...\n");
  }

  console.log("=".repeat(80));
  console.log("\n📋 Configurando URIs:\n");

  // Configurar cada badge
  for (const [badgeId, uri] of Object.entries(badgeURIs)) {
    try {
      console.log(`🔧 Configurando Badge ${badgeId}...`);
      console.log(`   URI: ${uri}`);
      
      const tx = await badgeNFT.setBadgeURI(badgeId, uri);
      console.log(`   ⏳ Transaction: ${tx.hash}`);
      
      await tx.wait();
      console.log(`   ✅ Badge ${badgeId} configurado com sucesso!\n`);
    } catch (error) {
      if (error.message.includes("OwnableUnauthorizedAccount") || error.message.includes("Nao autorizado")) {
        console.log(`   ❌ Erro: Você não tem permissão para configurar este badge`);
        console.log(`   💡 Use o Safe para executar esta transação\n`);
      } else {
        console.log(`   ❌ Erro: ${error.message}\n`);
      }
    }
  }

  // Verificar URIs configuradas
  console.log("=".repeat(80));
  console.log("\n🔍 Verificando URIs configuradas:\n");

  for (const badgeId of Object.keys(badgeURIs)) {
    try {
      const uri = await badgeNFT.badgeURIs(badgeId);
      if (uri) {
        console.log(`✅ Badge ${badgeId}: ${uri}`);
      } else {
        console.log(`⚠️  Badge ${badgeId}: Não configurado`);
      }
    } catch (error) {
      console.log(`❌ Badge ${badgeId}: Erro ao verificar - ${error.message}`);
    }
  }

  console.log("\n" + "=".repeat(80));
  console.log("✅ Processo concluído!");
  console.log("\n📋 Se algumas URIs não foram configuradas, execute via Safe:");
  console.log("   Veja: TRANSACOES_BADGE_URIS_FINAL.md\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

