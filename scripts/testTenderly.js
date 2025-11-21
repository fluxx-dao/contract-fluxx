const hre = require("hardhat");

/**
 * 🧪 Teste Simples do Tenderly
 * 
 * Testa a integração do Tenderly com um contrato já deployado.
 * Não requer deployment-info.json.
 * 
 * Uso:
 *   npx hardhat run scripts/testTenderly.js --network polygon
 */

async function main() {
  console.log("🧪 Testando Tenderly com contratos deployados...\n");
  console.log("=".repeat(80));

  const [signer] = await hre.ethers.getSigners();
  console.log("🔷 Conta:", signer.address);
  console.log("💰 Saldo:", hre.ethers.formatEther(await hre.ethers.provider.getBalance(signer.address)), "POL\n");

  // Endereços dos contratos deployados (da documentação)
  const TOKEN_ADDRESS = "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA";
  const GNOSIS_SAFE = "0xF040BbD411542F09f775E974fA88E16bF7406d26";

  // 1. Verificar se o plugin está disponível
  console.log("1️⃣  Verificando plugin Tenderly...");
  if (!hre.tenderly) {
    console.log("❌ Plugin Tenderly não encontrado!");
    console.log("   Execute: npm install --save-dev @tenderly/hardhat-tenderly");
    process.exit(1);
  }
  console.log("✅ Plugin Tenderly configurado\n");

  // 2. Testar leitura do contrato (para validar que está funcionando)
  console.log("2️⃣  Testando leitura do contrato...");
  try {
    const Token = await hre.ethers.getContractFactory("Token");
    const token = Token.attach(TOKEN_ADDRESS);

    console.log("   Lendo totalSupply() do contrato...");
    const totalSupply = await token.totalSupply();
    console.log("   ✅ Leitura bem-sucedida!");
    console.log("   Total Supply:", hre.ethers.formatEther(totalSupply), "FLUXX");
    console.log("\n   💡 Para simulações, use o dashboard do Tenderly ou a API REST");
    console.log("   📊 Dashboard: https://dashboard.tenderly.co/");
  } catch (error) {
    console.log("   ⚠️  Erro ao ler contrato:", error.message);
    console.log("   (Isso é normal se o contrato não estiver acessível)");
  }

  // 3. Tentar verificar o contrato Token
  console.log("\n3️⃣  Tentando verificar contrato Token no Tenderly...");
  try {
    await hre.tenderly.verify({
      name: "Token",
      address: TOKEN_ADDRESS,
    });
    console.log("   ✅ Token verificado no Tenderly!");
  } catch (error) {
    if (error.message.includes("already verified")) {
      console.log("   ⚠️  Token já estava verificado");
    } else if (error.message.includes("authentication")) {
      console.log("   ❌ Erro de autenticação");
      console.log("   💡 Verifique TENDERLY_ACCESS_TOKEN no .env");
    } else {
      console.log("   ⚠️  Erro:", error.message);
      console.log("   💡 O contrato pode precisar ser verificado manualmente no dashboard");
    }
  }

  console.log("\n" + "=".repeat(80));
  console.log("✅ Teste concluído!");
  console.log("\n📊 Próximos passos:");
  console.log("1. Acesse: https://dashboard.tenderly.co/");
  console.log("2. Adicione os contratos para monitoramento");
  console.log("3. Configure alertas personalizados");
  console.log("\n📚 Documentação: docs/guides/GUIA_TENDERLY.md");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

