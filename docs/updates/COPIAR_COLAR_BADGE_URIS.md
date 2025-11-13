# 📋 Copiar e Colar: Configurar Badge URIs

## ✅ Hashes IPFS Confirmados

Use estes hashes para configurar as URIs no contrato BadgeNFT.

---

## 🚀 Transações no Safe

### Contrato: `0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd` (BadgeNFT)

### Transação 1: Badge 1 (Membro Ativo)

**To:** `0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd`  
**ABI:** Use o ABI completo do BadgeNFT de `ABIS_COMPLETOS_SAFE.md`  
**Função:** `setBadgeURI`  
**Parâmetros:**
- `badgeId`: `1`
- `newuri`: `ipfs://bafkreifx3oyygr5ektwwne2zy23boefcaj3b56t2gmqed42zxpmnq56xpe`

---

### Transação 2: Badge 2 (Colaborador)

**To:** `0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd`  
**Função:** `setBadgeURI`  
**Parâmetros:**
- `badgeId`: `2`
- `newuri`: `ipfs://bafkreibodhsmtbebgpyxynje57obt3udfrfpi2u7uogw6u5t5fjelilgrq`

---

### Transação 3: Badge 3 (Aplicador)

**To:** `0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd`  
**Função:** `setBadgeURI`  
**Parâmetros:**
- `badgeId`: `3`
- `newuri`: `ipfs://bafkreih6oh6cvac77xkfylrcuqigr5xvjubz6mvb7hqzspsfh7ealydpvy`

---

### Transação 4: Badge 4 (Referral)

**To:** `0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd`  
**Função:** `setBadgeURI`  
**Parâmetros:**
- `badgeId`: `4`
- `newuri`: `ipfs://bafkreibxdzvgubsjbqp6yttc5qend7pmrbubildomlhxaa2qskiagjamci`

---

## 📋 ABI Rápido (apenas setBadgeURI)

Se preferir usar apenas a função:

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

## ✅ Verificar Após Executar

https://polygonscan.com/address/0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd#readContract

Chame `badgeURIs(uint256)` com IDs 1, 2, 3, 4 para confirmar.

---

**Status:** ✅ Pronto para executar no Safe!

