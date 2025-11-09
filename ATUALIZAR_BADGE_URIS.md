# 🔧 Atualizar URIs dos Badges - Guia Completo

## 📋 Situação

O BadgeNFT foi deployado com um `baseURI` antigo. Vamos atualizar as URIs individuais dos badges para usar o novo domínio `fluxx.space`.

- ✅ **Nova URI**: `https://fluxx.space/badges/{id}.json`

Como o `baseURI` não pode ser alterado após o deploy, vamos configurar URIs individuais para cada badge usando a função `setBadgeURI`.

---

## 🎯 Endereços

**BadgeNFT**: `0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce`  
**Gnosis Safe (Owner)**: `0xF040BbD411542F09f775E974fA88E16bF7406d26`

---

## 📝 Badges que Precisam ser Atualizados

| Badge ID | Nome | URI Correta |
|----------|------|-------------|
| 1 | Membro Ativo | `https://fluxx.space/badges/1.json` |
| 2 | Colaborador | `https://fluxx.space/badges/2.json` |
| 3 | Aplicador | `https://fluxx.space/badges/3.json` |
| 4 | Referral | `https://fluxx.space/badges/4.json` |

---

## 🚀 Método 1: Script Hardhat (Recomendado)

### Passo 1: Executar o Script

```bash
npx hardhat run scripts/updateBadgeURIs.js --network polygon
```

**⚠️ IMPORTANTE:**

- Você precisa ter a chave privada configurada no `.env` (PRIVATE_KEY)
- A wallet precisa ser signatária do Gnosis Safe
- O Gnosis Safe precisa ter POL para pagar gas

### Passo 2: Verificar no PolygonScan

Após executar, verifique no PolygonScan:

- https://polygonscan.com/address/0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce#readContract
- Chame a função `uri(uint256)` com cada badge ID (1, 2, 3, 4)

---

## 🛡️ Método 2: Via Gnosis Safe (Manual)

### Passo 1: Acessar o Transaction Builder

1. Acesse: https://app.safe.global/
2. Abra sua Safe: `0xF040BbD411542F09f775E974fA88E16bF7406d26`
3. Vá em **"Apps"** → **"Transaction Builder"**

### Passo 2: Carregar o ABI do BadgeNFT

1. No campo **"Enter Address or ENS Name"**, cole:
   ```
   0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce
   ```

2. No campo **"Enter ABI"**, carregue o arquivo `badgenft-abi.json` (que já está no projeto)

### Passo 3: Criar as 4 Transações

Você precisa criar **4 transações** (uma para cada badge):

---

#### Transação 1: Badge ID 1 (Membro Ativo)

1. **Function**: Selecione `setBadgeURI(uint256,string)`
2. **badgeId (uint256)**: `1`
3. **newuri (string)**: `https://fluxx.space/badges/1.json`
4. Clique em **"+ Add new transaction"**

---

#### Transação 2: Badge ID 2 (Colaborador)

1. **Function**: Selecione `setBadgeURI(uint256,string)`
2. **badgeId (uint256)**: `2`
3. **newuri (string)**: `https://fluxx.space/badges/2.json`
4. Clique em **"+ Add new transaction"**

---

#### Transação 3: Badge ID 3 (Aplicador)

1. **Function**: Selecione `setBadgeURI(uint256,string)`
2. **badgeId (uint256)**: `3`
3. **newuri (string)**: `https://fluxx.space/badges/3.json`
4. Clique em **"+ Add new transaction"**

---

#### Transação 4: Badge ID 4 (Referral)

1. **Function**: Selecione `setBadgeURI(uint256,string)`
2. **badgeId (uint256)**: `4`
3. **newuri (string)**: `https://fluxx.space/badges/4.json`
4. Clique em **"+ Add new transaction"**

---

### Passo 4: Revisar e Enviar

1. Você terá **4 transações** no batch
2. Revise todas
3. Clique em **"Create Batch"** ou **"Send Batch"**
4. Assine e aguarde aprovação dos outros signatários
5. Execute após aprovação suficiente

---

## 📋 Resumo das Transações

```
Contrato: 0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce (BadgeNFT)
Function: setBadgeURI(uint256,string)

1. badgeId: 1, newuri: "https://fluxx.space/badges/1.json"
2. badgeId: 2, newuri: "https://fluxx.space/badges/2.json"
3. badgeId: 3, newuri: "https://fluxx.space/badges/3.json"
4. badgeId: 4, newuri: "https://fluxx.space/badges/4.json"
```

---

## ✅ Verificação

Após executar as transações, você pode verificar:

1. **No PolygonScan**: 
   - Acesse: https://polygonscan.com/address/0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce
   - Vá em "Contract" → "Read Contract"
   - Chame a função `badgeURIs(uint256)` com os IDs 1, 2, 3, 4
   - Deve retornar as novas URIs

2. **Teste direto**: 
   - Chame a função `uri(uint256)` com cada badge ID
   - Deve retornar a URI correta

---

## 🔗 Links Úteis

- **BadgeNFT no PolygonScan**: https://polygonscan.com/address/0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce
- **Gnosis Safe**: https://app.safe.global/
- **Transaction Builder**: https://app.safe.global/apps/open?safe=matic:0xF040BbD411542F09f775E974fA88E16bF7406d26&appUrl=https%3A%2F%2Fapps-portal.safe.global%2Ftx-builder

---

## ⚠️ Importante

- Essas transações **sobrescrevem** o `baseURI` para cada badge específico
- O `baseURI` original (`https://api.fluxx-dao.io/badges/`) ainda existe, mas não será usado para esses badges
- Se criar novos badges no futuro, lembre-se de configurar a URI deles também

---

Boa sorte! 🚀

