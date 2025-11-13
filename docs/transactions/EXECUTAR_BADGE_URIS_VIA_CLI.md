# 🚀 Executar Badge URIs via CLI (Safe SDK)

## ✅ Script Pronto!

O script `scripts/updateBadgeURIsViaSafe.js` está atualizado e pronto para usar.

---

## 📋 Pré-requisitos

### 1. Instalar Safe SDK (se ainda não tiver)

```bash
npm install @safe-global/safe-core-sdk @safe-global/safe-ethers-lib
```

### 2. Verificar PRIVATE_KEY no .env

Certifique-se de que a `PRIVATE_KEY` no `.env` é de uma wallet que é **signatária** do Safe.

---

## 🚀 Executar

```bash
npx hardhat run scripts/updateBadgeURIsViaSafe.js --network polygon
```

---

## 📋 O que o Script Faz

1. **Conecta ao Safe** usando o Safe SDK
2. **Verifica** se você é signatário do Safe
3. **Cria 4 transações** (uma para cada badge)
4. **Assina e propõe** no Safe
5. **Mostra o hash** da transação proposta

---

## ✅ Após Executar

### 1. Verificar no Safe Web App

1. Acesse: https://app.safe.global/
2. Abra sua Safe: `0xF040BbD411542F09f775E974fA88E16bF7406d26`
3. Vá em **"Transactions"** → **"Queue"**
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

https://polygonscan.com/address/0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd#readContract

Chame `badgeURIs(uint256)` com IDs 1, 2, 3, 4.

---

## ⚠️ Se o Script Falhar

### Erro: "Safe SDK não está instalado"
```bash
npm install @safe-global/safe-core-sdk @safe-global/safe-ethers-lib
```

### Erro: "Não é signatário"
- Verifique se a `PRIVATE_KEY` no `.env` é de um signatário do Safe
- Verifique os signatários em: https://app.safe.global/

### Alternativa: Importar JSON no Safe

Se o CLI não funcionar, use o arquivo `badge-uris-transactions.json`:
1. Acesse o Safe Transaction Builder
2. Clique em "Import JSON"
3. Selecione `badge-uris-transactions.json`
4. Execute as transações

---

## 📝 Resumo

- ✅ Script atualizado com novos endereços e URIs IPFS
- ✅ Usa Safe SDK para propor transações automaticamente
- ✅ Requer wallet signatária do Safe
- ⏳ **Próximo:** Executar o script

---

**Status:** ✅ Pronto para executar via CLI!

