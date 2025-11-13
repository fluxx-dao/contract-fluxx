# ✅ Transações para Configurar Badge URIs - FINAL

## 🎉 JSONs Uploadados para IPFS!

Agora vamos configurar as URIs no contrato BadgeNFT usando os hashes IPFS.

---

## 📋 Hashes IPFS dos JSONs

- **Badge 1 (Membro Ativo):** `bafkreifx3oyygr5ektwwne2zy23boefcaj3b56t2gmqed42zxpmnq56xpe`
- **Badge 2 (Colaborador):** `bafkreibodhsmtbebgpyxynje57obt3udfrfpi2u7uogw6u5t5fjelilgrq`
- **Badge 3 (Aplicador):** `bafkreih6oh6cvac77xkfylrcuqigr5xvjubz6mvb7hqzspsfh7ealydpvy`
- **Badge 4 (Referral):** `bafkreibxdzvgubsjbqp6yttc5qend7pmrbubildomlhxaa2qskiagjamci`

---

## 🚀 Transações para Criar no Safe

### Contrato: `0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd` (BadgeNFT)

### Transação 1: Badge 1 (Membro Ativo)

**To:** `0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd`  
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

## 🔗 Link do Safe Transaction Builder

https://app.safe.global/apps/open?safe=matic:0xF040BbD411542F09f775E974fA88E16bF7406d26&appUrl=https%3A%2F%2Fapps-portal.safe.global%2Ftx-builder

---

## ✅ Após Executar

Verifique no PolygonScan:
https://polygonscan.com/address/0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd#readContract

Chame `badgeURIs(uint256)` com:
- ID `1` → deve retornar `ipfs://bafkreifx3oyygr5ektwwne2zy23boefcaj3b56t2gmqed42zxpmnq56xpe`
- ID `2` → deve retornar `ipfs://bafkreibodhsmtbebgpyxynje57obt3udfrfpi2u7uogw6u5t5fjelilgrq`
- ID `3` → deve retornar `ipfs://bafkreih6oh6cvac77xkfylrcuqigr5xvjubz6mvb7hqzspsfh7ealydpvy`
- ID `4` → deve retornar `ipfs://bafkreibxdzvgubsjbqp6yttc5qend7pmrbubildomlhxaa2qskiagjamci`

---

## 📝 Resumo

- ✅ JSONs uploadados para IPFS
- ✅ Hashes IPFS obtidos
- ⏳ **Próximo:** Executar 4 transações no Safe
- ⏳ **Depois:** Verificar no PolygonScan

---

**Status:** ✅ Pronto para configurar no Safe!
