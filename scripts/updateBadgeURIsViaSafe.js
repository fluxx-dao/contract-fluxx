const hre = require("hardhat");
const { ethers } = require("ethers");

// Importar Safe SDK
let Safe, EthersAdapter;
try {
  const safeCoreSdk = require("@safe-global/safe-core-sdk");
  
  // Na versão 3.x, Safe é exportado como default ou nomeado
  Safe = safeCoreSdk.default || safeCoreSdk.Safe || safeCoreSdk;
  
  // EthersAdapter pode estar em safe-ethers-lib ou ser necessário criar manualmente
  try {
    const safeEthersLib = require("@safe-global/safe-ethers-lib");
    EthersAdapter = safeEthersLib.EthersAdapter || safeEthersLib.default?.EthersAdapter || safeEthersLib;
  } catch (e) {
    // Se safe-ethers-lib não estiver disponível, criar adapter manualmente
    console.warn("⚠️  safe-ethers-lib não encontrado, tentando criar adapter manualmente...");
    EthersAdapter = null;
  }
  
  // Verificar se realmente conseguiu importar Safe
  if (!Safe) {
    throw new Error("Não foi possível importar Safe SDK");
  }
} catch (error) {
  Safe = null;
  EthersAdapter = null;
  console.warn("⚠️  Erro ao importar Safe SDK:", error.message);
}

/**
 * 🔧 Atualizar URIs dos Badges via Gnosis Safe (CLI)
 * 
 * Este script cria e propõe transações no Gnosis Safe para atualizar as URIs dos badges.
 * 
 * ⚠️ REQUISITOS:
 * 1. Instalar dependências: npm install @safe-global/safe-core-sdk @safe-global/safe-ethers-lib
 * 2. Configurar PRIVATE_KEY no .env (deve ser signatário do Safe)
 * 3. O Safe precisa ter POL para pagar gas
 */

// Endereços atualizados (v0.5.1+)
const deploymentInfo = require("../deployment-info.json");
const BADGE_NFT_ADDRESS = deploymentInfo.contracts.badgeNFT;
const GNOSIS_SAFE_ADDRESS = deploymentInfo.gnosisSafe;

// IDs dos Badges e novas URIs IPFS
const BADGE_UPDATES = [
  { id: 1, name: "Membro Ativo", uri: "ipfs://bafkreifx3oyygr5ektwwne2zy23boefcaj3b56t2gmqed42zxpmnq56xpe" },
  { id: 2, name: "Colaborador", uri: "ipfs://bafkreibodhsmtbebgpyxynje57obt3udfrfpi2u7uogw6u5t5fjelilgrq" },
  { id: 3, name: "Aplicador", uri: "ipfs://bafkreih6oh6cvac77xkfylrcuqigr5xvjubz6mvb7hqzspsfh7ealydpvy" },
  { id: 4, name: "Referral", uri: "ipfs://bafkreibxdzvgubsjbqp6yttc5qend7pmrbubildomlhxaa2qskiagjamci" }
];

async function main() {
  console.log("🔧 Atualizando Badge URIs via Gnosis Safe (CLI)...\n");
  
  // Verificar se Safe SDK está instalado
  if (!Safe) {
    console.error("❌ Safe SDK não está instalado!\n");
    console.error("📦 Para instalar:");
    console.error("   npm install @safe-global/safe-core-sdk\n");
    console.error("💡 Alternativa: Use o método manual via Safe Web App");
    console.error("   Importe o arquivo: badge-uris-transactions.json\n");
    process.exit(1);
  }
  
  // Verificar rede
  const network = await hre.ethers.provider.getNetwork();
  if (network.chainId !== 137n) {
    throw new Error("❌ Este script deve ser executado na rede Polygon (Chain ID: 137)");
  }
  
  // Obter signer
  const [signer] = await hre.ethers.getSigners();
  console.log("📝 Signer:", signer.address);
  console.log("💰 Saldo:", hre.ethers.formatEther(await hre.ethers.provider.getBalance(signer.address)), "POL\n");
  
  // Verificar se o signer é signatário do Safe
  console.log("🛡️  Conectando ao Gnosis Safe:", GNOSIS_SAFE_ADDRESS);
  
  try {
    // Criar adapter do Safe
    let ethAdapter;
    if (EthersAdapter && typeof EthersAdapter === 'function') {
      ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer
      });
    } else if (!EthersAdapter) {
      // Se EthersAdapter não estiver disponível, criar manualmente
      console.log("ℹ️  Criando EthersAdapter manualmente...\n");
      const EthersAdapterManual = require("@safe-global/safe-ethers-lib").EthersAdapter;
      if (EthersAdapterManual) {
        ethAdapter = new EthersAdapterManual({
          ethers,
          signerOrProvider: signer
        });
      } else {
        throw new Error("Não foi possível criar EthersAdapter. Instale: npm install @safe-global/safe-ethers-lib");
      }
    } else {
      ethAdapter = EthersAdapter;
    }
    
    // Criar instância do Safe
    const safeSdk = await Safe.init({
      ethAdapter,
      safeAddress: GNOSIS_SAFE_ADDRESS
    });
    
    // Verificar se o signer é owner do Safe
    const owners = await safeSdk.getOwners();
    const isOwner = owners.some(owner => owner.toLowerCase() === signer.address.toLowerCase());
    
    if (!isOwner) {
      throw new Error(`❌ O signer ${signer.address} não é signatário do Safe!`);
    }
    
    console.log("✅ Signer é signatário do Safe\n");
    
    // Obter contrato BadgeNFT
    const BadgeNFT = await hre.ethers.getContractAt("BadgeNFT", BADGE_NFT_ADDRESS);
    
    // Criar transações
    console.log("📋 Criando transações...\n");
    const safeTransactions = [];
    
    for (const { id, name, uri } of BADGE_UPDATES) {
      const currentURI = await BadgeNFT.badgeURIs(id);
      console.log(`Badge ID ${id} (${name}):`);
      console.log(`  URI atual: ${currentURI || "Não configurado"}`);
      console.log(`  Nova URI:  ${uri}`);
      
      // Criar calldata para setBadgeURI
      const iface = new ethers.Interface([
        "function setBadgeURI(uint256 badgeId, string memory newuri) external"
      ]);
      const data = iface.encodeFunctionData("setBadgeURI", [id, uri]);
      
      // Criar transação do Safe
      const safeTransaction = await safeSdk.createTransaction({
        safeTransactionData: {
          to: BADGE_NFT_ADDRESS,
          value: "0",
          data: data
        }
      });
      
      safeTransactions.push(safeTransaction);
      console.log(`  ✅ Transação criada\n`);
    }
    
    // Criar batch de transações
    console.log("📦 Criando batch de transações...\n");
    const batchTransaction = await safeSdk.createTransaction({
      safeTransactionData: safeTransactions.map(tx => ({
        to: tx.data.to,
        value: tx.data.value,
        data: tx.data.data
      }))
    });
    
    // Assinar transação
    console.log("✍️  Assinando transação...\n");
    const signedTransaction = await safeSdk.signTransaction(batchTransaction);
    
    // Propor transação no Safe
    console.log("📤 Propondo transação no Safe...\n");
    const txResponse = await safeSdk.proposeTransaction({
      safeTransactionData: signedTransaction.data,
      safeAddress: GNOSIS_SAFE_ADDRESS,
      senderAddress: signer.address,
      senderSignature: signedTransaction.signatures.get(signer.address)
    });
    
    console.log("✅ Transação proposta com sucesso!\n");
    console.log("📋 Detalhes:");
    console.log(`   Safe Transaction Hash: ${txResponse.safeTxHash}`);
    console.log(`   Transaction Hash: ${txResponse.txHash || "Pendente"}\n`);
    
    // Verificar se pode executar imediatamente
    const threshold = await safeSdk.getThreshold();
    const ownersCount = owners.length;
    console.log(`ℹ️  Threshold: ${threshold} de ${ownersCount}`);
    
    // Tentar executar se tiver aprovações suficientes
    try {
      const isExecutable = await safeSdk.isValidTransaction(signedTransaction);
      if (isExecutable) {
        console.log("🚀 Transação pode ser executada agora!\n");
        console.log("   Execute via Safe Web App ou aguarde aprovações adicionais.\n");
      } else {
        console.log("⏳ Aguardando aprovações adicionais...\n");
      }
    } catch (error) {
      console.log("ℹ️  Verifique as aprovações no Safe Web App\n");
    }
    
    console.log("🔗 Links úteis:");
    console.log(`   Safe: https://app.safe.global/transactions/queue?safe=matic:${GNOSIS_SAFE_ADDRESS}`);
    console.log(`   BadgeNFT: https://polygonscan.com/address/${BADGE_NFT_ADDRESS}`);
    
  } catch (error) {
    if (error.message.includes("signatário")) {
      console.error("\n❌ Erro:", error.message);
      console.error("\n💡 Solução:");
      console.error("   - Certifique-se de que a PRIVATE_KEY no .env é de um signatário do Safe");
      console.error("   - Verifique os signatários do Safe em: https://app.safe.global/");
    } else {
      console.error("\n❌ Erro:", error.message);
      console.error("\n💡 Possíveis soluções:");
      console.error("   1. Instale as dependências: npm install @safe-global/safe-core-sdk @safe-global/safe-ethers-lib");
      console.error("   2. Verifique se a PRIVATE_KEY está configurada no .env");
      console.error("   3. Verifique se o Safe tem POL suficiente");
      console.error("   4. Verifique se você é signatário do Safe");
    }
    throw error;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

