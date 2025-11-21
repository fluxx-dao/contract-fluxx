const hre = require("hardhat");
const { ethers } = require("ethers");

/**
 * ✍️ Gerar Assinatura para Verificação no PolygonScan
 * 
 * Este script gera a assinatura necessária para verificar propriedade
 * de um endereço no PolygonScan.
 * 
 * Uso:
 *   PRIVATE_KEY=sua_chave_privada npx hardhat run scripts/gerarAssinaturaVerificacao.js --network polygon
 * 
 * OU forneça a mensagem diretamente:
 *   MESSAGE="[polygonscan.com 20/11/2025 20:24:09] I, hereby verify..." npx hardhat run scripts/gerarAssinaturaVerificacao.js --network polygon
 */

async function main() {
  console.log("✍️  Gerando assinatura para verificação no PolygonScan...\n");
  console.log("=".repeat(80));

  // Verificar se tem chave privada
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    console.log("❌ ERRO: PRIVATE_KEY não encontrada no .env");
    console.log("\n💡 Como usar:");
    console.log("   1. Adicione PRIVATE_KEY no .env");
    console.log("   2. OU use: PRIVATE_KEY=0x... npx hardhat run scripts/gerarAssinaturaVerificacao.js --network polygon");
    console.log("\n⚠️  IMPORTANTE: Use a chave privada do endereço que você quer verificar!");
    console.log("   Endereço esperado: 0xb04a61b436cfc40e7aad7b73b34e47dad79cc57f");
    process.exit(1);
  }

  // Criar wallet a partir da chave privada
  const wallet = new hre.ethers.Wallet(privateKey, hre.ethers.provider);
  const address = wallet.address;

  console.log("🔷 Endereço da wallet:", address);
  console.log("   (Deve ser: 0xb04a61b436cfc40e7aad7b73b34e47dad79cc57f)\n");

  // Verificar se é o endereço correto
  const expectedAddress = "0xb04a61b436cfc40e7aad7b73b34e47dad79cc57f";
  if (address.toLowerCase() !== expectedAddress.toLowerCase()) {
    console.log("⚠️  AVISO: O endereço da wallet não corresponde ao esperado!");
    console.log(`   Esperado: ${expectedAddress}`);
    console.log(`   Encontrado: ${address}`);
    console.log("\n💡 Certifique-se de usar a chave privada correta!");
  }

  // Mensagem do PolygonScan (pode ser fornecida via env ou usar padrão)
  const message = process.env.MESSAGE || 
    "[polygonscan.com 20/11/2025 20:24:09] I, hereby verify that I am the owner/creator of the address [0x263fe9898b8a9bba3e08403cc9054dca39a11636]";

  console.log("📝 Mensagem a ser assinada:");
  console.log(`   "${message}"\n`);

  try {
    // Assinar a mensagem
    console.log("✍️  Assinando mensagem...");
    const signature = await wallet.signMessage(message);
    
    console.log("\n" + "=".repeat(80));
    console.log("✅ ASSINATURA GERADA COM SUCESSO!\n");
    console.log("📋 Copie e cole no PolygonScan:\n");
    console.log(signature);
    console.log("\n" + "=".repeat(80));

    // Verificar a assinatura (para confirmar que está correta)
    console.log("\n🔍 Verificando assinatura...");
    const recoveredAddress = hre.ethers.verifyMessage(message, signature);
    
    if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
      console.log("✅ Assinatura válida!");
      console.log(`   Endereço recuperado: ${recoveredAddress}`);
    } else {
      console.log("❌ ERRO: Assinatura inválida!");
      console.log(`   Esperado: ${address}`);
      console.log(`   Recuperado: ${recoveredAddress}`);
    }

    console.log("\n📝 INSTRUÇÕES:");
    console.log("1. Copie a assinatura acima");
    console.log("2. Cole no campo 'Signature Hash' no PolygonScan");
    console.log("3. Clique em 'Verify Ownership'");
    console.log("4. ✅ Verificação concluída!");

    // Informações adicionais
    console.log("\n📊 Informações:");
    console.log(`   Endereço a verificar: 0x263fe9898b8a9bba3e08403cc9054dca39a11636`);
    console.log(`   Endereço do owner: ${address}`);
    console.log(`   Mensagem: ${message}`);

  } catch (error) {
    console.log("❌ Erro ao gerar assinatura:", error.message);
    console.log("\n💡 Verifique:");
    console.log("   - A chave privada está correta?");
    console.log("   - A mensagem está correta?");
    console.log("   - O endereço corresponde ao esperado?");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

