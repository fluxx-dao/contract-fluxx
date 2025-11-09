const hre = require("hardhat");

/**
 * ✅ Verificar URIs dos Badges após atualização
 * 
 * Este script verifica se as URIs dos badges foram atualizadas corretamente.
 */

const BADGE_NFT_ADDRESS = "0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce";

const EXPECTED_URIS = {
  1: "https://fluxx.space/badges/1.json",
  2: "https://fluxx.space/badges/2.json",
  3: "https://fluxx.space/badges/3.json",
  4: "https://fluxx.space/badges/4.json"
};

const BADGE_NAMES = {
  1: "Membro Ativo",
  2: "Colaborador",
  3: "Aplicador",
  4: "Referral"
};

async function main() {
  console.log("✅ Verificando URIs dos Badges após atualização...\n");
  
  // Verificar rede
  const network = await hre.ethers.provider.getNetwork();
  console.log("📡 Rede:", network.name, "(Chain ID:", network.chainId.toString() + ")\n");
  
  // Obter contrato BadgeNFT
  const BadgeNFT = await hre.ethers.getContractAt("BadgeNFT", BADGE_NFT_ADDRESS);
  console.log("🎯 Contrato BadgeNFT:", BADGE_NFT_ADDRESS);
  console.log("🔗 PolygonScan:", `https://polygonscan.com/address/${BADGE_NFT_ADDRESS}\n`);
  
  console.log("=".repeat(80));
  console.log("📋 VERIFICAÇÃO DAS URIs\n");
  console.log("=".repeat(80) + "\n");
  
  let allCorrect = true;
  
  for (const [id, expectedURI] of Object.entries(EXPECTED_URIS)) {
    const badgeId = parseInt(id);
    const badgeName = BADGE_NAMES[badgeId];
    
    try {
      const currentURI = await BadgeNFT.uri(badgeId);
      const isCorrect = currentURI === expectedURI;
      
      console.log(`Badge ID ${badgeId} (${badgeName}):`);
      console.log(`  URI atual:  ${currentURI}`);
      console.log(`  URI esperada: ${expectedURI}`);
      
      if (isCorrect) {
        console.log(`  Status: ✅ CORRETO\n`);
      } else {
        console.log(`  Status: ❌ INCORRETO\n`);
        allCorrect = false;
      }
    } catch (error) {
      console.log(`  Status: ❌ ERRO - ${error.message}\n`);
      allCorrect = false;
    }
  }
  
  console.log("=".repeat(80));
  
  if (allCorrect) {
    console.log("\n🎉 SUCESSO! Todas as URIs foram atualizadas corretamente!\n");
    console.log("✅ Os badges agora apontam para: https://fluxx.space/badges/{id}.json");
    console.log("📝 Próximo passo: Criar os arquivos JSON dos badges em fluxx.space\n");
  } else {
    console.log("\n⚠️  ATENÇÃO: Algumas URIs não foram atualizadas corretamente.");
    console.log("   Verifique as transações no PolygonScan e tente novamente.\n");
  }
  
  console.log("🔗 Links úteis:");
  console.log(`   BadgeNFT: https://polygonscan.com/address/${BADGE_NFT_ADDRESS}#readContract`);
  console.log(`   Verificar URI: Chame a função uri(uint256) com IDs 1, 2, 3, 4\n`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

