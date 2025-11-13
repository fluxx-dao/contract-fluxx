const hre = require("hardhat");
const fs = require("fs");

/**
 * 🎨 Gerar Transações para Configurar Badge URIs via Safe CLI
 * 
 * Este script gera as transações no formato correto para serem executadas
 * via Safe CLI ou Safe Transaction Builder.
 */

async function main() {
  const deploymentInfo = require("../deployment-info.json");
  const badgeNFTAddress = deploymentInfo.contracts.badgeNFT;
  const safeAddress = deploymentInfo.gnosisSafe;
  
  // URIs IPFS dos metadados JSON
  const badgeURIs = {
    1: "ipfs://bafkreifx3oyygr5ektwwne2zy23boefcaj3b56t2gmqed42zxpmnq56xpe", // Membro Ativo
    2: "ipfs://bafkreibodhsmtbebgpyxynje57obt3udfrfpi2u7uogw6u5t5fjelilgrq", // Colaborador
    3: "ipfs://bafkreih6oh6cvac77xkfylrcuqigr5xvjubz6mvb7hqzspsfh7ealydpvy", // Aplicador
    4: "ipfs://bafkreibxdzvgubsjbqp6yttc5qend7pmrbubildomlhxaa2qskiagjamci"  // Referral
  };

  console.log("📋 Gerando transações para configurar Badge URIs\n");
  console.log("=".repeat(80));

  const BadgeNFT = await hre.ethers.getContractFactory("BadgeNFT");
  const badgeNFT = BadgeNFT.attach(badgeNFTAddress);
  
  const transactions = [];

  // Preparar cada transação
  for (const [badgeId, uri] of Object.entries(badgeURIs)) {
    const iface = new hre.ethers.Interface([
      "function setBadgeURI(uint256 badgeId, string memory newuri)"
    ]);
    
    const data = iface.encodeFunctionData("setBadgeURI", [badgeId, uri]);
    
    transactions.push({
      to: badgeNFTAddress,
      value: "0",
      data: data,
      operation: 0, // Call
      safeTxGas: 0,
      baseGas: 0,
      gasPrice: 0,
      gasToken: "0x0000000000000000000000000000000000000000",
      refundReceiver: "0x0000000000000000000000000000000000000000",
      nonce: 0
    });

    console.log(`✅ Transação ${badgeId} preparada:`);
    console.log(`   Badge ID: ${badgeId}`);
    console.log(`   URI: ${uri}`);
    console.log(`   Data: ${data}\n`);
  }

  // Salvar transações em arquivo JSON
  const output = {
    version: "1.0",
    chainId: "137", // Polygon
    createdAt: new Date().toISOString(),
    meta: {
      name: "Configurar Badge URIs",
      description: "Configurar URIs dos metadados JSON dos badges no BadgeNFT",
      txBuilderVersion: "1.16.2"
    },
    transactions: transactions.map((tx, index) => ({
      to: tx.to,
      value: tx.value,
      data: tx.data,
      contractMethod: {
        inputs: [
          {
            internalType: "uint256",
            name: "badgeId",
            type: "uint256"
          },
          {
            internalType: "string",
            name: "newuri",
            type: "string"
          }
        ],
        name: "setBadgeURI",
        payable: false
      },
      contractInputsValues: {
        badgeId: Object.keys(badgeURIs)[index],
        newuri: Object.values(badgeURIs)[index]
      }
    }))
  };

  fs.writeFileSync(
    "badge-uris-transactions.json",
    JSON.stringify(output, null, 2)
  );

  console.log("=".repeat(80));
  console.log("✅ Transações geradas e salvas em: badge-uris-transactions.json");
  console.log("\n📋 Próximos passos:");
  console.log("   1. Importe o arquivo badge-uris-transactions.json no Safe Transaction Builder");
  console.log("   2. OU use o Safe CLI para executar as transações");
  console.log("\n🔗 Safe Transaction Builder:");
  console.log(`   https://app.safe.global/apps/open?safe=matic:${safeAddress}&appUrl=https%3A%2F%2Fapps-portal.safe.global%2Ftx-builder\n`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

