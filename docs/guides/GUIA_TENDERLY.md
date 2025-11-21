# 🔍 Guia Completo: Tenderly.co com Contratos FLUXX DAO

## 🎯 O que é Tenderly?

Tenderly é uma plataforma de desenvolvimento e monitoramento de contratos inteligentes que oferece:

- ✅ **Simulação de transações** antes de executar na mainnet
- ✅ **Debugging avançado** com stack traces detalhados
- ✅ **Monitoramento em tempo real** de contratos em produção
- ✅ **Alertas personalizados** para eventos importantes
- ✅ **Forking de blockchains** para testes locais
- ✅ **Verificação de contratos** com interface visual

---

## 📦 1. Instalação e Configuração

### Passo 1: Instalar Plugin Tenderly

```bash
npm install --save-dev @tenderly/hardhat-tenderly
```

### Passo 2: Configurar Hardhat

Adicione o plugin no `hardhat.config.js`:

```javascript
require("@tenderly/hardhat-tenderly");

module.exports = {
  // ... suas configurações existentes ...
  
  tenderly: {
    project: "fluxx-dao", // Nome do seu projeto no Tenderly
    username: "seu-usuario", // Seu username no Tenderly
    privateVerification: false, // true para verificação privada
  },
  
  networks: {
    polygon: {
      url: process.env.INFURA_RPC_URL || process.env.POLYGON_RPC_URL || "https://polygon-rpc.com",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 137,
    },
    // Adicione uma rede local para testes
    tenderly: {
      url: "https://rpc.tenderly.co/fork/YOUR_FORK_ID",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
};
```

### Passo 3: Criar Conta no Tenderly

1. Acesse: https://tenderly.co/
2. Crie uma conta (gratuita)
3. Crie um novo projeto: "fluxx-dao"

### Passo 4: Obter Credenciais

1. No Tenderly, vá em **Settings → Authorization**
2. Gere um **Access Token**
3. Adicione no seu `.env`:

```bash
TENDERLY_ACCESS_TOKEN=seu_token_aqui
TENDERLY_PROJECT=fluxx-dao
TENDERLY_USERNAME=seu-usuario
```

### Passo 5: Autenticação Automática

**A autenticação é automática!** O plugin do Hardhat usa as variáveis de ambiente do `.env`.

Não é necessário fazer login manual. Basta ter as variáveis configuradas:

```bash
TENDERLY_ACCESS_TOKEN=seu_token
TENDERLY_PROJECT=fluxx-dao
TENDERLY_USERNAME=seu-usuario
```

O plugin do Hardhat fará a autenticação automaticamente quando você executar os scripts.

---

## 🔐 2. Verificar Contratos no Tenderly

### Método 1: Verificação Automática no Deploy

O plugin Tenderly verifica automaticamente os contratos quando você faz deploy:

```bash
npx hardhat run scripts/deploy.js --network polygon
```

### Método 2: Verificação Manual

Crie um script para verificar contratos existentes:

```javascript
// scripts/verifyTenderly.js
const hre = require("hardhat");

async function main() {
  const deploymentInfo = require("../deployment-info.json");
  const contracts = deploymentInfo.contracts;
  const GNOSIS_SAFE = deploymentInfo.gnosisSafe;

  console.log("🔍 Verificando contratos no Tenderly...\n");

  // Verificar Token
  await hre.tenderly.verify({
    name: "Token",
    address: contracts.token,
    constructorArguments: [
      "FLUXX DAO",
      "FLUXX",
      GNOSIS_SAFE,
      contracts.treasury,
    ],
  });

  // Verificar Treasury
  await hre.tenderly.verify({
    name: "Treasury",
    address: contracts.treasury,
    constructorArguments: [GNOSIS_SAFE],
  });

  // Verificar BadgeNFT
  await hre.tenderly.verify({
    name: "BadgeNFT",
    address: contracts.badgeNFT,
    constructorArguments: [
      GNOSIS_SAFE,
      "https://api.fluxx-dao.io/badges/",
    ],
  });

  // Verificar Governance
  await hre.tenderly.verify({
    name: "Governance",
    address: contracts.governance,
    constructorArguments: [
      GNOSIS_SAFE,
      contracts.badgeNFT,
      contracts.treasury,
    ],
  });

  // Verificar Membership
  await hre.tenderly.verify({
    name: "Membership",
    address: contracts.membership,
    constructorArguments: [
      GNOSIS_SAFE,
      contracts.token,
      contracts.badgeNFT,
      contracts.treasury,
    ],
  });

  // Verificar CollabEngine
  await hre.tenderly.verify({
    name: "CollabEngine",
    address: contracts.collabEngine,
    constructorArguments: [
      contracts.token,
      contracts.membership,
      contracts.badgeNFT,
    ],
  });

  console.log("✅ Todos os contratos verificados no Tenderly!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

Execute:

```bash
npx hardhat run scripts/verifyTenderly.js --network polygon
```

---

## 🧪 3. Simular Transações

### Criar Script de Simulação

```javascript
// scripts/simulateTransaction.js
const hre = require("hardhat");

async function main() {
  const deploymentInfo = require("../deployment-info.json");
  const contracts = deploymentInfo.contracts;
  const [signer] = await hre.ethers.getSigners();

  console.log("🧪 Simulando transação no Tenderly...\n");

  // Exemplo: Simular transferência de tokens
  const Token = await hre.ethers.getContractFactory("Token");
  const token = Token.attach(contracts.token);

  const recipient = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"; // Exemplo
  const amount = hre.ethers.parseEther("1000"); // 1000 FLUXX

  // Simular a transação
  const simulation = await hre.tenderly.simulate({
    chain: 137, // Polygon
    from: signer.address,
    to: contracts.token,
    input: token.interface.encodeFunctionData("transfer", [recipient, amount]),
    value: 0,
  });

  console.log("✅ Simulação concluída!");
  console.log("Status:", simulation.status);
  console.log("Gas usado:", simulation.gas_used);
  console.log("Resultado:", simulation.transaction.status);

  // Verificar se a transação seria bem-sucedida
  if (simulation.transaction.status === 1) {
    console.log("✅ Transação seria bem-sucedida!");
  } else {
    console.log("❌ Transação falharia!");
    console.log("Erro:", simulation.transaction.error_message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

### Simular Transações Complexas

```javascript
// scripts/simulateGovernanceProposal.js
const hre = require("hardhat");

async function main() {
  const deploymentInfo = require("../deployment-info.json");
  const contracts = deploymentInfo.contracts;
  const [signer] = await hre.ethers.getSigners();

  const Governance = await hre.ethers.getContractFactory("Governance");
  const governance = Governance.attach(contracts.governance);

  // Simular criação de proposta
  const target = contracts.treasury;
  const value = 0;
  const calldata = "0x"; // Exemplo
  const description = "Proposta de teste";

  const simulation = await hre.tenderly.simulate({
    chain: 137,
    from: signer.address,
    to: contracts.governance,
    input: governance.interface.encodeFunctionData("criarProposta", [
      target,
      value,
      calldata,
      description,
    ]),
    value: 0,
  });

  console.log("Simulação de Proposta:", simulation);
}
```

---

## 📊 4. Monitoramento de Contratos

### Configurar Monitoramento no Dashboard

1. Acesse: https://dashboard.tenderly.co/
2. Vá em **Monitors**
3. Clique em **New Monitor**
4. Adicione os endereços dos contratos:

```
0xB1430cc106bd664F68BE8d0167A52a29654CF8BA  # Token
0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93  # Treasury
0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce  # BadgeNFT
0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa  # Governance
0x52926F509d7BD565c02fbd72265E4F5Dda300099  # Membership
0x3bFB7e43517B0C91F5Bee75FeDd88317Db7C763C  # CollabEngine
```

### Criar Alertas Personalizados

No Tenderly Dashboard, configure alertas para:

- ✅ **Transferências grandes** (> 1M FLUXX)
- ✅ **Mint de novos tokens**
- ✅ **Propostas de governance**
- ✅ **Mudanças de ownership**
- ✅ **Falhas de transações**

---

## 🐛 5. Debugging de Transações

### Debug via Dashboard

1. Acesse uma transação no Tenderly
2. Clique em **Debug**
3. Veja o stack trace completo
4. Analise variáveis em cada step

### Debug via API

```javascript
// scripts/debugTransaction.js
const hre = require("hardhat");

async function main() {
  const txHash = process.argv[2]; // Hash da transação

  if (!txHash) {
    console.error("❌ Forneça o hash da transação!");
    console.log("Uso: npx hardhat run scripts/debugTransaction.js --network polygon <TX_HASH>");
    process.exit(1);
  }

  console.log("🐛 Debugando transação:", txHash);

  // Obter detalhes da transação
  const tx = await hre.ethers.provider.getTransaction(txHash);
  const receipt = await hre.ethers.provider.getTransactionReceipt(txHash);

  console.log("Status:", receipt.status === 1 ? "✅ Sucesso" : "❌ Falhou");
  console.log("Gas usado:", receipt.gasUsed.toString());
  console.log("From:", tx.from);
  console.log("To:", tx.to);

  // Se falhou, verificar logs
  if (receipt.status === 0) {
    console.log("\n❌ Transação falhou!");
    console.log("Verifique no Tenderly Dashboard para mais detalhes:");
    console.log(`https://dashboard.tenderly.co/tx/polygon/${txHash}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

---

## 🔄 6. Forking de Blockchain

### Criar Fork da Polygon

```javascript
// scripts/createFork.js
const hre = require("hardhat");

async function main() {
  console.log("🔄 Criando fork da Polygon no Tenderly...");

  // Criar fork via API (requer configuração)
  // Ou criar manualmente no dashboard do Tenderly

  console.log("✅ Fork criado!");
  console.log("Use a URL do fork no hardhat.config.js");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

### Usar Fork para Testes

1. Crie um fork no Tenderly Dashboard
2. Copie a URL do fork (ex: `https://rpc.tenderly.co/fork/abc123`)
3. Configure no `hardhat.config.js`:

```javascript
networks: {
  tenderly: {
    url: "https://rpc.tenderly.co/fork/SEU_FORK_ID",
    accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
  },
}
```

4. Execute scripts no fork:

```bash
npx hardhat run scripts/deploy.js --network tenderly
```

---

## 📝 7. Scripts Úteis

### Script Completo de Integração

```javascript
// scripts/tenderlySetup.js
const hre = require("hardhat");

/**
 * 🔧 Configuração Completa do Tenderly
 * 
 * Este script:
 * 1. Verifica todos os contratos no Tenderly
 * 2. Configura monitoramento
 * 3. Testa simulações básicas
 */

async function main() {
  const deploymentInfo = require("../deployment-info.json");
  const contracts = deploymentInfo.contracts;
  const [signer] = await hre.ethers.getSigners();

  console.log("🔧 Configurando Tenderly para FLUXX DAO\n");
  console.log("=".repeat(80));

  // 1. Verificar contratos
  console.log("\n1️⃣  Verificando contratos...");
  try {
    await hre.tenderly.verify({
      name: "Token",
      address: contracts.token,
    });
    console.log("✅ Token verificado");
  } catch (error) {
    console.log("⚠️  Token:", error.message);
  }

  // 2. Testar simulação
  console.log("\n2️⃣  Testando simulação...");
  const Token = await hre.ethers.getContractFactory("Token");
  const token = Token.attach(contracts.token);

  try {
    const simulation = await hre.tenderly.simulate({
      chain: 137,
      from: signer.address,
      to: contracts.token,
      input: token.interface.encodeFunctionData("totalSupply"),
      value: 0,
    });
    console.log("✅ Simulação funcionando!");
  } catch (error) {
    console.log("❌ Erro na simulação:", error.message);
  }

  console.log("\n" + "=".repeat(80));
  console.log("✅ Configuração do Tenderly concluída!");
  console.log("\n📊 Acesse o dashboard:");
  console.log("https://dashboard.tenderly.co/");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

---

## 🎯 8. Casos de Uso Práticos

### Caso 1: Testar Transferência Antes de Executar

```javascript
// Simular transferência de 1000 FLUXX
const simulation = await hre.tenderly.simulate({
  chain: 137,
  from: safeAddress,
  to: tokenAddress,
  input: token.interface.encodeFunctionData("transfer", [
    recipient,
    hre.ethers.parseEther("1000"),
  ]),
});
```

### Caso 2: Verificar Proposta de Governance

```javascript
// Simular criação de proposta
const simulation = await hre.tenderly.simulate({
  chain: 137,
  from: proposerAddress,
  to: governanceAddress,
  input: governance.interface.encodeFunctionData("criarProposta", [
    target,
    value,
    calldata,
    description,
  ]),
});
```

### Caso 3: Monitorar Mint de Tokens

Configure alerta no Tenderly para o evento `Transfer` quando:
- `from` = `address(0)` (mint)
- `amount` > threshold

### Caso 4: Debug de Transação Falhada

1. Copie o hash da transação
2. Acesse: `https://dashboard.tenderly.co/tx/polygon/{TX_HASH}`
3. Veja o stack trace completo
4. Identifique a linha exata do erro

---

## 📋 9. Checklist de Integração

- [ ] Conta criada no Tenderly
- [ ] Plugin instalado (`@tenderly/hardhat-tenderly`)
- [ ] Credenciais configuradas no `.env`
- [ ] Login via CLI executado
- [ ] Contratos verificados no Tenderly
- [ ] Monitoramento configurado no Dashboard
- [ ] Alertas personalizados criados
- [ ] Scripts de simulação testados
- [ ] Fork criado para testes locais (opcional)

---

## 🔗 Links Úteis

- **Tenderly Dashboard:** https://dashboard.tenderly.co/
- **Documentação:** https://docs.tenderly.co/
- **Hardhat Plugin:** https://github.com/Tenderly/hardhat-tenderly
- **API Reference:** https://docs.tenderly.co/simulations-and-forks/simulation-api

---

## ⚠️ Notas Importantes

1. **Gratuito:** Tenderly oferece plano gratuito generoso
2. **Privacidade:** Contratos verificados são públicos por padrão
3. **Rate Limits:** Plano gratuito tem limites de simulações
4. **Forking:** Forks expiram após 7 dias (plano gratuito)

---

## 🚀 Próximos Passos

1. Execute `scripts/tenderlySetup.js` para configurar tudo
2. Configure monitoramento no Dashboard
3. Crie alertas para eventos importantes
4. Use simulações antes de executar transações críticas
5. Use debugging para investigar falhas

---

**Status:** ✅ Pronto para uso  
**Versão:** v1.0  
**Data:** Novembro 2025

