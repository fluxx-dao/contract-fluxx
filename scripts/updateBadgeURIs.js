const hre = require("hardhat");

/**
 * 🔧 Atualizar URIs dos Badges no BadgeNFT
 * 
 * Este script atualiza as URIs individuais dos badges para usar o novo domínio fluxx.space
 * 
 * ⚠️ IMPORTANTE: 
 * - Você precisa ser signatário do Gnosis Safe
 * - O Gnosis Safe precisa ter POL para pagar gas
 * - Execute via Gnosis Safe (não diretamente com wallet privada)
 */

const BADGE_NFT_ADDRESS = "0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce";
const GNOSIS_SAFE_ADDRESS = "0xF040BbD411542F09f775E974fA88E16bF7406d26";

// IDs dos Badges
const BADGE_ID_MEMBRO_ATIVO = 1;
const BADGE_ID_COLABORADOR = 2;
const BADGE_ID_APLICADOR = 3;
const BADGE_ID_REFERRAL = 4;

// Novas URIs com o domínio fluxx.space
const NEW_URIS = {
  [BADGE_ID_MEMBRO_ATIVO]: "https://fluxx.space/badges/1.json",
  [BADGE_ID_COLABORADOR]: "https://fluxx.space/badges/2.json",
  [BADGE_ID_APLICADOR]: "https://fluxx.space/badges/3.json",
  [BADGE_ID_REFERRAL]: "https://fluxx.space/badges/4.json"
};

async function main() {
  console.log("🔧 Atualizando URIs dos Badges no BadgeNFT...\n");
  
  // Verificar se está na rede Polygon
  const network = await hre.ethers.provider.getNetwork();
  if (network.chainId !== 137n) {
    throw new Error("❌ Este script deve ser executado na rede Polygon (Chain ID: 137)");
  }
  
  // Obter signer
  const [signer] = await hre.ethers.getSigners();
  console.log("📝 Signer:", signer.address);
  console.log("💰 Saldo:", hre.ethers.formatEther(await hre.ethers.provider.getBalance(signer.address)), "POL\n");
  
  // Verificar owner do BadgeNFT
  const BadgeNFT = await hre.ethers.getContractAt("BadgeNFT", BADGE_NFT_ADDRESS);
  const owner = await BadgeNFT.owner();
  console.log("🛡️  Owner do BadgeNFT:", owner);
  
  if (owner.toLowerCase() !== GNOSIS_SAFE_ADDRESS.toLowerCase()) {
    console.warn("⚠️  ATENÇÃO: O owner do BadgeNFT não é o Gnosis Safe esperado!");
    console.warn("   Owner atual:", owner);
    console.warn("   Gnosis Safe esperado:", GNOSIS_SAFE_ADDRESS);
  }
  
  console.log("\n📋 URIs que serão atualizadas:\n");
  for (const [badgeId, uri] of Object.entries(NEW_URIS)) {
    const currentURI = await BadgeNFT.uri(badgeId);
    console.log(`Badge ID ${badgeId}:`);
    console.log(`  URI atual: ${currentURI}`);
    console.log(`  Nova URI:  ${uri}\n`);
  }
  
  // Verificar se pode executar diretamente ou precisa via Safe
  const isOwnerGnosisSafe = owner.toLowerCase() === GNOSIS_SAFE_ADDRESS.toLowerCase();
  const isSignerOwner = owner.toLowerCase() === signer.address.toLowerCase();
  
  if (isOwnerGnosisSafe && !isSignerOwner) {
    // Owner é Gnosis Safe, mas signer não é o owner direto
    console.log("\n📋 Para executar via Gnosis Safe, você precisa:");
    console.log("   1. Acessar https://app.safe.global/");
    console.log("   2. Abrir sua Safe:", GNOSIS_SAFE_ADDRESS);
    console.log("   3. Usar o Transaction Builder");
    console.log("   4. Criar 4 transações (uma para cada badge)\n");
    console.log("   Veja o guia completo em: ATUALIZAR_BADGE_URIS.md\n");
    console.log("📋 Transações necessárias:\n");
    for (const [badgeId, uri] of Object.entries(NEW_URIS)) {
      console.log(`   Badge ID ${badgeId}:`);
      console.log(`   - Function: setBadgeURI(uint256,string)`);
      console.log(`   - badgeId: ${badgeId}`);
      console.log(`   - newuri: "${uri}"\n`);
    }
    console.log("   Contrato:", BADGE_NFT_ADDRESS);
    return;
  }
  
  // Atualizar cada badge
  console.log("🚀 Iniciando atualizações...\n");
  
  for (const [badgeId, newURI] of Object.entries(NEW_URIS)) {
    try {
      console.log(`📝 Atualizando Badge ID ${badgeId}...`);
      
      const tx = await BadgeNFT.setBadgeURI(badgeId, newURI);
      console.log(`   ✅ Transação enviada: ${tx.hash}`);
      console.log(`   ⏳ Aguardando confirmação...`);
      
      const receipt = await tx.wait();
      console.log(`   ✅ Confirmada! Block: ${receipt.blockNumber}`);
      console.log(`   💰 Gas usado: ${receipt.gasUsed.toString()}\n`);
      
      // Verificar se foi atualizado
      const updatedURI = await BadgeNFT.uri(badgeId);
      if (updatedURI === newURI) {
        console.log(`   ✅ URI verificada: ${updatedURI}\n`);
      } else {
        console.warn(`   ⚠️  URI não corresponde! Esperado: ${newURI}, Obtido: ${updatedURI}\n`);
      }
    } catch (error) {
      console.error(`   ❌ Erro ao atualizar Badge ID ${badgeId}:`, error.message);
      throw error;
    }
  }
  
  console.log("✅ Todas as URIs foram atualizadas com sucesso!\n");
  console.log("🔗 Verifique no PolygonScan:");
  console.log(`   https://polygonscan.com/address/${BADGE_NFT_ADDRESS}#readContract`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

