# 🔍 O Que É Signature Hash?

## 📚 Explicação

**Signature Hash** (ou Transaction Hash) é um identificador único de uma transação na blockchain.

---

## 🎯 Tipos de Hashes

### 1. Transaction Hash (Hash de Transação)

**O que é:**
- Identificador único de cada transação
- Formato: `0x` seguido de 64 caracteres hexadecimais
- Exemplo: `0x2b3419c9cfd64f6a8f738cc8ad2840dc...`

**Onde encontrar:**
- PolygonScan de cada transação
- Histórico da wallet
- Receipt da transação

**Para que serve:**
- Verificar se transação foi executada
- Debugar transações que falharam
- Provar que você executou uma transação
- Usar no Tenderly para simular

---

### 2. Contract Creation Hash (Hash de Criação de Contrato)

**O que é:**
- Hash da transação que criou o contrato
- É a primeira transação para o endereço do contrato
- Contém o código do contrato e parâmetros do constructor

**Onde encontrar:**
- PolygonScan do contrato → aba "Transactions" → primeira transação
- Ou usar o script: `scripts/verificarHashesTransacoes.js`

**Para que serve:**
- Verificar quando o contrato foi deployado
- Ver os parâmetros usados no deploy
- Provar autenticidade do deploy

---

### 3. Function Signature Hash (Hash de Assinatura de Função)

**O que é:**
- Primeiros 4 bytes (8 caracteres) do hash da assinatura da função
- Exemplo: `0x88316456` é o hash de `mint(...)`
- Usado para identificar qual função está sendo chamada

**Onde encontrar:**
- No campo `data` de uma transação
- Primeiros 4 bytes identificam a função

**Para que serve:**
- Identificar qual função foi chamada
- Decodificar transações
- Verificar chamadas de função

---

## 🔍 Você Tem Signature Hashes?

### ✅ SIM! Você tem vários tipos:

1. **Hashes de Deploy dos Contratos:**
   - Cada contrato tem um hash de transação de deploy
   - Você pode encontrar no PolygonScan

2. **Hashes de Transações Executadas:**
   - Todas as transações que você executou têm hash
   - Exemplo: aprovações, transferências, etc.

3. **Hashes de Funções:**
   - Cada função tem um signature hash
   - Usado internamente nas transações

---

## 🚀 Como Encontrar Seus Hashes

### Método 1: PolygonScan

1. **Para contratos:**
   - Acesse: https://polygonscan.com/address/[ENDEREÇO]
   - Vá em "Transactions"
   - A primeira transação é geralmente o deploy
   - O hash está no link da transação

2. **Para transações:**
   - Acesse o PolygonScan
   - Procure pela transação
   - O hash está na URL: `https://polygonscan.com/tx/[HASH]`

### Método 2: Script Automático

**Execute:**
```bash
npx hardhat run scripts/verificarHashesTransacoes.js --network polygon
```

**Isso vai buscar:**
- Hash de deploy de cada contrato
- Block number
- Timestamp
- Link direto no PolygonScan

---

## 📋 Seus Contratos e Hashes

**Contratos deployados:**
- Token: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`
- BadgeNFT: `0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce`
- Treasury: `0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93`
- Governance: `0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa`
- Membership: `0x52926F509d7BD565c02fbd72265E4F5Dda300099`
- CollabEngine: `0x3bFB7e43517B0C91F5Bee75FeDd88317Db7C763C`

**Cada um tem um hash de transação de deploy!**

---

## 💡 Para Que Usar?

### 1. Verificação e Auditoria
- Provar que você fez o deploy
- Verificar parâmetros usados
- Auditoria de segurança

### 2. Debug
- Usar no Tenderly para simular
- Entender por que transação falhou
- Ver stack trace completo

### 3. Documentação
- Registrar histórico de deploys
- Manter registro de mudanças
- Provar autenticidade

---

## 🔧 Scripts Úteis

**Buscar hashes de deploy:**
```bash
npx hardhat run scripts/verificarHashesTransacoes.js --network polygon
```

**Debugar transação específica:**
```bash
TX_HASH=0x... npx hardhat run scripts/debugSafeTransaction.js --network polygon
```

---

## 📚 Resumo

1. **SIM, você tem signature hashes!**
   - Cada contrato tem hash de deploy
   - Cada transação tem hash

2. **Onde encontrar:**
   - PolygonScan de cada contrato/transação
   - Ou usar o script automático

3. **Para que usar:**
   - Verificação
   - Debug
   - Documentação

---

**Status:** Você tem vários signature hashes  
**Próximo passo:** Executar script para listar todos

