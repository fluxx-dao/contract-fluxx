# 🎨 Configurar URIs dos Badges no BadgeNFT

## ✅ Imagens Uploadadas para IPFS

As imagens dos badges foram enviadas para IPFS. Agora precisamos configurar as URIs no contrato BadgeNFT.

---

## 📋 URIs dos Badges

### Badge 1: Membro Ativo
**URI JSON:** `ipfs://bafybeieb5egcionamm4rmtt2ewweokbxedfl5n6s75n2dv5b3sibodto3q`  
**Imagem:** https://ivory-payable-wolverine-982.mypinata.cloud/ipfs/bafybeieb5egcionamm4rmtt2ewweokbxedfl5n6s75n2dv5b3sibodto3q

### Badge 2: Colaborador
**URI JSON:** `ipfs://bafybeigvddikkq3n45i6w3cb2s46huqjf6apybt3wan6247q3tzx5644gm`  
**Imagem:** https://ivory-payable-wolverine-982.mypinata.cloud/ipfs/bafybeigvddikkq3n45i6w3cb2s46huqjf6apybt3wan6247q3tzx5644gm

### Badge 3: Aplicador
**URI JSON:** `ipfs://bafybeia6cxtgfextwcs4jozaenkigd2ivlemv5crt2wxvzndvzz3xwhkyy`  
**Imagem:** https://ivory-payable-wolverine-982.mypinata.cloud/ipfs/bafybeia6cxtgfextwcs4jozaenkigd2ivlemv5crt2wxvzndvzz3xwhkyy

### Badge 4: Referral
**URI JSON:** `ipfs://bafybeifqeputhgtz3tmreua4qmrr4dxocl7pxmpn7kmvjm5bmbwj7mprga`  
**Imagem:** https://ivory-payable-wolverine-982.mypinata.cloud/ipfs/bafybeifqeputhgtz3tmreua4qmrr4dxocl7pxmpn7kmvjm5bmbwj7mprga

---

## ⚠️ IMPORTANTE: Upload dos Metadados JSON

Antes de configurar no contrato, você precisa fazer upload dos arquivos JSON para IPFS:

1. `badges/1.json` → Upload para IPFS
2. `badges/2.json` → Upload para IPFS
3. `badges/3.json` → Upload para IPFS
4. `badges/4.json` → Upload para IPFS

**Depois de fazer upload, use os hashes IPFS dos JSONs (não das imagens!)**

---

## 🚀 Configurar no Safe

Após fazer upload dos JSONs para IPFS, execute 4 transações no Safe:

### Transação 1: Badge 1 (Membro Ativo)

**Contrato:** `0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd` (BadgeNFT)  
**Função:** `setBadgeURI`  
**Parâmetros:**
- `badgeId`: `1`
- `newuri`: `ipfs://[HASH_DO_JSON_1]` (substitua pelo hash do JSON após upload)

### Transação 2: Badge 2 (Colaborador)

**Contrato:** `0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd`  
**Função:** `setBadgeURI`  
**Parâmetros:**
- `badgeId`: `2`
- `newuri`: `ipfs://[HASH_DO_JSON_2]`

### Transação 3: Badge 3 (Aplicador)

**Contrato:** `0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd`  
**Função:** `setBadgeURI`  
**Parâmetros:**
- `badgeId`: `3`
- `newuri`: `ipfs://[HASH_DO_JSON_3]`

### Transação 4: Badge 4 (Referral)

**Contrato:** `0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd`  
**Função:** `setBadgeURI`  
**Parâmetros:**
- `badgeId`: `4`
- `newuri`: `ipfs://[HASH_DO_JSON_4]`

---

## 📋 ABI do BadgeNFT (para Safe)

Use o ABI completo do BadgeNFT de `ABIS_COMPLETOS_SAFE.md` (seção 3️⃣).

A função `setBadgeURI` está incluída no ABI.

---

## 🔗 Link do Safe

https://app.safe.global/apps/open?safe=matic:0xF040BbD411542F09f775E974fA88E16bF7406d26&appUrl=https%3A%2F%2Fapps-portal.safe.global%2Ftx-builder

---

## ✅ Após Configurar

Os badges aparecerão corretamente em:
- MetaMask
- OpenSea (Polygon)
- Outros visualizadores de NFTs

---

**Status:** ⏳ Aguardando upload dos JSONs para IPFS

