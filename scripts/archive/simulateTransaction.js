const hre = require("hardhat");
const fs = require("fs");

/**
 * 🧪 Simular Transações no Tenderly
 * 
 * Simula transações antes de executá-las na mainnet.
 * 
 * Uso:
 *   npx hardhat run scripts/simulateTransaction.js --network polygon
 * 
 * Ou com parâmetros customizados:
 *   TRANSACTION_TYPE=transfer RECIPIENT=0x... AMOUNT=1000 npx hardhat run scripts/simulateTransaction.js --network polygon
 */

async function main() {
  // Carregar informações de deploy
  let deploymentInfo;
  try {
    const data = fs.readFileSync("deployment-info.json", "utf8");
    deploymentInfo = JSON.parse(data);
  } catch (error) {
    console.error("❌ Erro ao ler deployment-info.json");
    process.exit(1);
  }

  const contracts = deploymentInfo.contracts;
  const [signer] = await hre.ethers.getSigners();

  console.log("🧪 Simulando transação no Tenderly...\n");
  console.log("=".repeat(80));
  console.log("Deployer:", signer.address);
  console.log("Saldo:", hre.ethers.formatEther(await hre.ethers.provider.getBalance(signer.address)), "POL\n");

  const transactionType = process.env.TRANSACTION_TYPE || "transfer";
  const recipient = process.env.RECIPIENT || "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";
  const amount = process.env.AMOUNT || "1000";

  console.log("Tipo de transação:", transactionType);
  console.log("Recipient:", recipient);
  console.log("Amount:", amount, "FLUXX\n");

  let simulation;

  switch (transactionType) {
    case "transfer":
      await simulateTransfer(contracts.token, signer.address, recipient, amount);
      break;

    case "mint":
      await simulateMint(contracts.token, signer.address, recipient, amount);
      break;

    case "proposal":
      await simulateProposal(contracts.governance, signer.address, contracts.treasury);
      break;

    case "membership":
      await simulateMembership(contracts.membership, signer.address);
      break;

    default:
      console.log("❌ Tipo de transação desconhecido:", transactionType);
      console.log("Tipos disponíveis: transfer, mint, proposal, membership");
      process.exit(1);
  }
}

async function simulateTransfer(tokenAddress, from, to, amountStr) {
  const Token = await hre.ethers.getContractFactory("Token");
  const token = Token.attach(tokenAddress);
  const amount = hre.ethers.parseEther(amountStr);

  console.log("🔄 Simulando transferência de", amountStr, "FLUXX...\n");

  try {
    const simulation = await hre.tenderly.simulate({
      chain: 137, // Polygon
      from: from,
      to: tokenAddress,
      input: token.interface.encodeFunctionData("transfer", [to, amount]),
      value: 0,
    });

    console.log("✅ Simulação concluída!");
    console.log("Status:", simulation.status);
    console.log("Gas usado:", simulation.gas_used?.toString() || "N/A");
    console.log("Resultado:", simulation.transaction.status === 1 ? "✅ Sucesso" : "❌ Falhou");

    if (simulation.transaction.status === 1) {
      console.log("\n✅ Transação seria bem-sucedida!");
    } else {
      console.log("\n❌ Transação falharia!");
      if (simulation.transaction.error_message) {
        console.log("Erro:", simulation.transaction.error_message);
      }
    }
  } catch (error) {
    console.error("❌ Erro na simulação:", error.message);
  }
}

async function simulateMint(tokenAddress, from, to, amountStr) {
  const Token = await hre.ethers.getContractFactory("Token");
  const token = Token.attach(tokenAddress);
  const amount = hre.ethers.parseEther(amountStr);

  console.log("🔄 Simulando mint de", amountStr, "FLUXX...\n");

  try {
    const simulation = await hre.tenderly.simulate({
      chain: 137,
      from: from,
      to: tokenAddress,
      input: token.interface.encodeFunctionData("mint", [to, amount]),
      value: 0,
    });

    console.log("✅ Simulação concluída!");
    console.log("Status:", simulation.status);
    console.log("Gas usado:", simulation.gas_used?.toString() || "N/A");
    console.log("Resultado:", simulation.transaction.status === 1 ? "✅ Sucesso" : "❌ Falhou");

    if (simulation.transaction.status === 1) {
      console.log("\n✅ Mint seria bem-sucedido!");
    } else {
      console.log("\n❌ Mint falharia!");
      if (simulation.transaction.error_message) {
        console.log("Erro:", simulation.transaction.error_message);
      }
    }
  } catch (error) {
    console.error("❌ Erro na simulação:", error.message);
  }
}

async function simulateProposal(governanceAddress, from, target) {
  const Governance = await hre.ethers.getContractFactory("Governance");
  const governance = Governance.attach(governanceAddress);

  console.log("🔄 Simulando criação de proposta...\n");

  // Exemplo: proposta vazia (apenas para teste)
  const value = 0;
  const calldata = "0x";
  const description = "Proposta de teste via Tenderly";

  try {
    const simulation = await hre.tenderly.simulate({
      chain: 137,
      from: from,
      to: governanceAddress,
      input: governance.interface.encodeFunctionData("criarProposta", [
        target,
        value,
        calldata,
        description,
      ]),
      value: 0,
    });

    console.log("✅ Simulação concluída!");
    console.log("Status:", simulation.status);
    console.log("Gas usado:", simulation.gas_used?.toString() || "N/A");
    console.log("Resultado:", simulation.transaction.status === 1 ? "✅ Sucesso" : "❌ Falhou");

    if (simulation.transaction.status === 1) {
      console.log("\n✅ Proposta seria criada com sucesso!");
    } else {
      console.log("\n❌ Criação de proposta falharia!");
      if (simulation.transaction.error_message) {
        console.log("Erro:", simulation.transaction.error_message);
      }
    }
  } catch (error) {
    console.error("❌ Erro na simulação:", error.message);
  }
}

async function simulateMembership(membershipAddress, from) {
  const Membership = await hre.ethers.getContractFactory("Membership");
  const membership = Membership.attach(membershipAddress);

  console.log("🔄 Simulando registro de membership...\n");

  // Exemplo: verificar se pode registrar
  try {
    const simulation = await hre.tenderly.simulate({
      chain: 137,
      from: from,
      to: membershipAddress,
      input: membership.interface.encodeFunctionData("registrarMembro", []),
      value: 0,
    });

    console.log("✅ Simulação concluída!");
    console.log("Status:", simulation.status);
    console.log("Gas usado:", simulation.gas_used?.toString() || "N/A");
    console.log("Resultado:", simulation.transaction.status === 1 ? "✅ Sucesso" : "❌ Falhou");

    if (simulation.transaction.status === 1) {
      console.log("\n✅ Registro seria bem-sucedido!");
    } else {
      console.log("\n❌ Registro falharia!");
      if (simulation.transaction.error_message) {
        console.log("Erro:", simulation.transaction.error_message);
      }
    }
  } catch (error) {
    console.error("❌ Erro na simulação:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

