const hre = require("hardhat");
const { ethers } = require("ethers");

/**
 * 🔧 Gerar Dados das Transações para Gnosis Safe
 * 
 * Este script gera os dados (calldata) das transações que precisam ser executadas no Safe.
 * Você pode copiar esses dados e usar no Transaction Builder do Safe Web App.
 */

const BADGE_NFT_ADDRESS = "0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce";
const GNOSIS_SAFE_ADDRESS = "0xF040BbD411542F09f775E974fA88E16bF7406d26";

const BADGE_UPDATES = [
  { id: 1, name: "Membro Ativo", uri: "https://fluxx.space/badges/1.json" },
  { id: 2, name: "Colaborador", uri: "https://fluxx.space/badges/2.json" },
  { id: 3, name: "Aplicador", uri: "https://fluxx.space/badges/3.json" },
  { id: 4, name: "Referral", uri: "https://fluxx.space/badges/4.json" }
];

async function main() {
  console.log("🔧 Gerando dados das transações para Gnosis Safe...\n");
  
  // Verificar rede
  const network = await hre.ethers.provider.getNetwork();
  if (network.chainId !== 137n) {
    console.warn("⚠️  Você está na rede:", network.name, "(Chain ID:", network.chainId.toString() + ")");
    console.warn("   Certifique-se de executar no Polygon Mainnet!\n");
  }
  
  // Obter contrato BadgeNFT
  const BadgeNFT = await hre.ethers.getContractAt("BadgeNFT", BADGE_NFT_ADDRESS);
  
  // Verificar URIs atuais
  console.log("📋 URIs atuais dos badges:\n");
  for (const { id, name } of BADGE_UPDATES) {
    try {
      const currentURI = await BadgeNFT.uri(id);
      console.log(`Badge ID ${id} (${name}): ${currentURI}`);
    } catch (error) {
      console.log(`Badge ID ${id} (${name}): [Erro ao ler]`);
    }
  }
  
  console.log("\n" + "=".repeat(80) + "\n");
  console.log("📝 DADOS DAS TRANSAÇÕES PARA GNOSIS SAFE\n");
  console.log("=".repeat(80) + "\n");
  
  // Criar interface para codificar os dados
  const iface = new ethers.Interface([
    "function setBadgeURI(uint256 badgeId, string memory newuri) external"
  ]);
  
  console.log("🎯 Contrato BadgeNFT:", BADGE_NFT_ADDRESS);
  console.log("🛡️  Gnosis Safe:", GNOSIS_SAFE_ADDRESS);
  console.log("📡 Rede: Polygon Mainnet\n");
  
  console.log("📋 TRANSAÇÕES PARA CRIAR NO SAFE:\n");
  
  BADGE_UPDATES.forEach(({ id, name, uri }, index) => {
    const data = iface.encodeFunctionData("setBadgeURI", [id, uri]);
    
    console.log(`Transação ${index + 1}: Badge ID ${id} (${name})`);
    console.log("─".repeat(80));
    console.log("To (Contrato):", BADGE_NFT_ADDRESS);
    console.log("Function: setBadgeURI(uint256,string)");
    console.log("Parâmetros:");
    console.log("  - badgeId (uint256):", id);
    console.log("  - newuri (string):", uri);
    console.log("Data (calldata):", data);
    console.log("Value: 0 POL");
    console.log("");
  });
  
  console.log("=".repeat(80) + "\n");
  console.log("🚀 COMO EXECUTAR:\n");
  console.log("1. Acesse: https://app.safe.global/");
  console.log("2. Abra sua Safe:", GNOSIS_SAFE_ADDRESS);
  console.log("3. Vá em 'Apps' → 'Transaction Builder'");
  console.log("4. Cole o endereço:", BADGE_NFT_ADDRESS);
  console.log("5. Carregue o ABI do arquivo: badgenft-abi.json");
  console.log("6. Para cada transação acima:");
  console.log("   - Selecione a função: setBadgeURI(uint256,string)");
  console.log("   - Preencha os parâmetros conforme mostrado");
  console.log("   - Clique em '+ Add new transaction'");
  console.log("7. Crie o batch e execute após aprovações\n");
  console.log("📖 Guia completo: GUIA_EXECUTAR_SAFE_BADGE_URIS.md\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

