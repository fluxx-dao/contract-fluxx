# 📋 Transações para Configurar Badge URIs no Safe

## 🎯 Objetivo

Configurar as URIs dos metadados JSON dos badges no contrato BadgeNFT.

---

## ⚠️ IMPORTANTE

**Antes de executar:** Faça upload dos 4 arquivos JSON para IPFS e anote os hashes!

Arquivos para upload:
- `badges/1.json`
- `badges/2.json`
- `badges/3.json`
- `badges/4.json`

---

## 📋 Transações para Criar no Safe

### Contrato: `0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd` (BadgeNFT)

### Transação 1: Badge 1 (Membro Ativo)

**To:** `0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd`  
**Função:** `setBadgeURI`  
**Parâmetros:**
- `badgeId`: `1`
- `newuri`: `ipfs://[SUBSTITUA_PELO_HASH_DO_JSON_1]`

**Exemplo:** `ipfs://QmXxxYyyZzz...`

---

### Transação 2: Badge 2 (Colaborador)

**To:** `0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd`  
**Função:** `setBadgeURI`  
**Parâmetros:**
- `badgeId`: `2`
- `newuri`: `ipfs://[SUBSTITUA_PELO_HASH_DO_JSON_2]`

---

### Transação 3: Badge 3 (Aplicador)

**To:** `0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd`  
**Função:** `setBadgeURI`  
**Parâmetros:**
- `badgeId`: `3`
- `newuri`: `ipfs://[SUBSTITUA_PELO_HASH_DO_JSON_3]`

---

### Transação 4: Badge 4 (Referral)

**To:** `0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd`  
**Função:** `setBadgeURI`  
**Parâmetros:**
- `badgeId`: `4`
- `newuri`: `ipfs://[SUBSTITUA_PELO_HASH_DO_JSON_4]`

---

## 📋 ABI do BadgeNFT

Use o ABI completo de `ABIS_COMPLETOS_SAFE.md` (seção 3️⃣).

Ou apenas a função:

```json
[
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "badgeId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "newuri",
        "type": "string"
      }
    ],
    "name": "setBadgeURI",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
```

---

## 🔗 Link do Safe

https://app.safe.global/apps/open?safe=matic:0xF040BbD411542F09f775E974fA88E16bF7406d26&appUrl=https%3A%2F%2Fapps-portal.safe.global%2Ftx-builder

---

## ✅ Após Executar

Verifique no PolygonScan:
https://polygonscan.com/address/0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd#readContract

Chame `badgeURIs(uint256)` com IDs 1, 2, 3, 4 para confirmar.

---

**Status:** ⏳ Aguardando upload dos JSONs para IPFS

