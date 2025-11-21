const fs = require("fs");
const path = require("path");

/**
 * 📤 Script para Preparar Upload de Metadados dos Badges
 * 
 * Este script prepara os metadados JSON para upload no IPFS.
 * Após fazer upload, use os hashes IPFS no contrato BadgeNFT.
 */

const badges = [
  {
    id: 1,
    name: "Membro Ativo",
    image: "https://ivory-payable-wolverine-982.mypinata.cloud/ipfs/bafybeieb5egcionamm4rmtt2ewweokbxedfl5n6s75n2dv5b3sibodto3q",
    file: "badges/1.json"
  },
  {
    id: 2,
    name: "Colaborador",
    image: "https://ivory-payable-wolverine-982.mypinata.cloud/ipfs/bafybeigvddikkq3n45i6w3cb2s46huqjf6apybt3wan6247q3tzx5644gm",
    file: "badges/2.json"
  },
  {
    id: 3,
    name: "Aplicador",
    image: "https://ivory-payable-wolverine-982.mypinata.cloud/ipfs/bafybeia6cxtgfextwcs4jozaenkigd2ivlemv5crt2wxvzndvzz3xwhkyy",
    file: "badges/3.json"
  },
  {
    id: 4,
    name: "Referral",
    image: "https://ivory-payable-wolverine-982.mypinata.cloud/ipfs/bafybeifqeputhgtz3tmreua4qmrr4dxocl7pxmpn7kmvjm5bmbwj7mprga",
    file: "badges/4.json"
  }
];

console.log("📤 Preparando Metadados dos Badges para Upload no IPFS\n");
console.log("=".repeat(80));

badges.forEach(badge => {
  const filePath = path.join(__dirname, "..", badge.file);
  
  if (fs.existsSync(filePath)) {
    const metadata = JSON.parse(fs.readFileSync(filePath, "utf8"));
    console.log(`\n✅ Badge ${badge.id}: ${badge.name}`);
    console.log(`   Arquivo: ${badge.file}`);
    console.log(`   Imagem: ${badge.image}`);
    console.log(`   Pronto para upload no IPFS!`);
  } else {
    console.log(`\n❌ Badge ${badge.id}: Arquivo não encontrado: ${badge.file}`);
  }
});

console.log("\n" + "=".repeat(80));
console.log("\n📋 Próximos Passos:");
console.log("1. Faça upload dos arquivos JSON para IPFS (Pinata ou outro serviço)");
console.log("2. Anote os hashes IPFS de cada JSON");
console.log("3. Use os hashes no contrato BadgeNFT via Safe");
console.log("4. Veja CONFIGURAR_BADGE_URIS.md para instruções detalhadas\n");

