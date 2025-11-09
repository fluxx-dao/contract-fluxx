# 🖥️ Guia: Executar Transações do Safe via CLI

## 📋 Pré-requisitos

### 1. Instalar Dependências

```bash
npm install @safe-global/safe-core-sdk @safe-global/safe-ethers-lib
```

### 2. Configurar Variáveis de Ambiente

Certifique-se de que seu `.env` tem:

```env
PRIVATE_KEY=sua_chave_privada_aqui
POLYGON_RPC_URL=https://polygon-rpc.com
# ou
INFURA_RPC_URL=https://polygon-mainnet.infura.io/v3/SEU_API_KEY
```

**⚠️ IMPORTANTE:** A `PRIVATE_KEY` deve ser de uma wallet que é **signatária** do Gnosis Safe.

---

## 🚀 Executar o Script

### Opção 1: Script com Safe SDK (Recomendado)

```bash
npx hardhat run scripts/updateBadgeURIsViaSafe.js --network polygon
```

Este script:
- ✅ Conecta ao Gnosis Safe
- ✅ Verifica se você é signatário
- ✅ Cria as 4 transações
- ✅ Assina e propõe no Safe
- ✅ Mostra o hash da transação

---

## 📝 O que o Script Faz

1. **Conecta ao Safe:**
   - Usa o Safe SDK para conectar ao seu Gnosis Safe
   - Verifica se o signer é signatário

2. **Cria Transações:**
   - Cria 4 transações (uma para cada badge)
   - Cada transação chama `setBadgeURI(badgeId, uri)`

3. **Assina e Propõe:**
   - Assina as transações com sua wallet
   - Propõe no Safe (cria a proposta)

4. **Resultado:**
   - A transação aparece no Safe Web App
   - Outros signatários podem aprovar
   - Quando tiver aprovações suficientes, pode executar

---

## ✅ Após Executar

### 1. Verificar no Safe Web App

1. Acesse: https://app.safe.global/
2. Abra sua Safe: `0xF040BbD411542F09f775E974fA88E16bF7406d26`
3. Vá em **"Transactions"** ou **"Queue"**
4. Você verá a transação proposta

### 2. Aguardar Aprovações

- Se sua Safe é **2 de 3**: precisa de mais 1 aprovação
- Se sua Safe é **3 de 5**: precisa de mais 2 aprovações

### 3. Executar

Quando tiver aprovações suficientes:
- Clique em **"Execute"** no Safe Web App
- Confirme na sua wallet
- Aguarde confirmação na blockchain

---

## 🔍 Verificar Resultado

Após executar, verifique no PolygonScan:

1. Acesse: https://polygonscan.com/address/0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce#readContract
2. Chame `uri(uint256)` com IDs 1, 2, 3, 4
3. Deve retornar as novas URIs: `https://fluxx.space/badges/{id}.json`

---

## ⚠️ Troubleshooting

### Erro: "não é signatário do Safe"

**Solução:**
- Verifique se a `PRIVATE_KEY` no `.env` é de um signatário do Safe
- Verifique os signatários em: https://app.safe.global/

### Erro: "Cannot find module '@safe-global/safe-core-sdk'"

**Solução:**
```bash
npm install @safe-global/safe-core-sdk @safe-global/safe-ethers-lib
```

### Erro: "Safe não encontrado"

**Solução:**
- Verifique se o endereço do Safe está correto: `0xF040BbD411542F09f775E974fA88E16bF7406d26`
- Verifique se está na rede Polygon

### Transação proposta mas não aparece

**Solução:**
- Aguarde alguns segundos (pode levar tempo para sincronizar)
- Recarregue a página do Safe Web App
- Verifique se está na rede correta (Polygon)

---

## 🔄 Alternativa: Script Simples (Sem Safe SDK)

Se não quiser instalar o Safe SDK, você pode usar o script `updateBadgeURIs.js` que apenas mostra as transações necessárias:

```bash
npx hardhat run scripts/updateBadgeURIs.js --network polygon
```

Este script mostra as transações que precisam ser criadas manualmente no Safe Web App.

---

## 📋 Comparação dos Métodos

| Método | Complexidade | Requer Instalação | Automatização |
|--------|--------------|-------------------|----------------|
| **Safe Web App** | ⭐ Fácil | Não | Manual |
| **Script CLI (Safe SDK)** | ⭐⭐ Média | Sim | Semi-automático |
| **Script CLI (Simples)** | ⭐ Fácil | Não | Apenas mostra transações |

---

## 💡 Recomendação

**Para começar rápido:** Use o Safe Web App (guia em `GUIA_EXECUTAR_SAFE_BADGE_URIS.md`)

**Para automatizar:** Use o script CLI com Safe SDK (este guia)

**Para apenas ver o que precisa fazer:** Use `updateBadgeURIs.js`

---

**Boa sorte! 🚀**

