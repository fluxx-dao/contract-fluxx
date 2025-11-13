# 🎨 Guia Completo: Configurar Badges no BadgeNFT

## ✅ Status Atual

- ✅ Imagens uploadadas para IPFS
- ✅ Metadados JSON criados
- ⏳ **Próximo:** Upload dos JSONs para IPFS
- ⏳ **Depois:** Configurar URIs no contrato BadgeNFT

---

## 📤 Passo 1: Upload dos Metadados JSON para IPFS

Você precisa fazer upload dos 4 arquivos JSON para IPFS:

### Arquivos para Upload:

1. `badges/1.json` - Membro Ativo
2. `badges/2.json` - Colaborador
3. `badges/3.json` - Aplicador
4. `badges/4.json` - Referral

### Como Fazer Upload (Pinata):

1. Acesse: https://app.pinata.cloud/
2. Faça login
3. Vá em "Upload" → "File"
4. Faça upload de cada arquivo JSON
5. **Anote o hash IPFS de cada JSON** (não o hash da imagem!)

**Exemplo:** Se o hash do JSON for `QmXxx...`, a URI será `ipfs://QmXxx...`

---

## 🔧 Passo 2: Configurar URIs no Contrato BadgeNFT

Após fazer upload dos JSONs, execute 4 transações no Safe:

### Contrato: `0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd` (BadgeNFT)

### Transação 1: Badge 1 (Membro Ativo)

**Função:** `setBadgeURI(uint256 badgeId, string memory newuri)`

**Parâmetros:**
- `badgeId`: `1`
- `newuri`: `ipfs://[HASH_DO_JSON_1]` (substitua pelo hash do JSON após upload)

**Exemplo:** `ipfs://QmXxxYyyZzz...`

---

### Transação 2: Badge 2 (Colaborador)

**Função:** `setBadgeURI`

**Parâmetros:**
- `badgeId`: `2`
- `newuri`: `ipfs://[HASH_DO_JSON_2]`

---

### Transação 3: Badge 3 (Aplicador)

**Função:** `setBadgeURI`

**Parâmetros:**
- `badgeId`: `3`
- `newuri`: `ipfs://[HASH_DO_JSON_3]`

---

### Transação 4: Badge 4 (Referral)

**Função:** `setBadgeURI`

**Parâmetros:**
- `badgeId`: `4`
- `newuri`: `ipfs://[HASH_DO_JSON_4]`

---

## 📋 ABI do BadgeNFT (para Safe)

Use o ABI completo do BadgeNFT de `ABIS_COMPLETOS_SAFE.md` (seção 3️⃣).

A função `setBadgeURI` está incluída:

```json
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
```

---

## 🔗 Link do Safe Transaction Builder

https://app.safe.global/apps/open?safe=matic:0xF040BbD411542F09f775E974fA88E16bF7406d26&appUrl=https%3A%2F%2Fapps-portal.safe.global%2Ftx-builder

---

## 📝 Resumo dos Hashes IPFS

### Imagens (já uploadadas):
- Badge 1: `bafybeieb5egcionamm4rmtt2ewweokbxedfl5n6s75n2dv5b3sibodto3q`
- Badge 2: `bafybeigvddikkq3n45i6w3cb2s46huqjf6apybt3wan6247q3tzx5644gm`
- Badge 3: `bafybeia6cxtgfextwcs4jozaenkigd2ivlemv5crt2wxvzndvzz3xwhkyy`
- Badge 4: `bafybeifqeputhgtz3tmreua4qmrr4dxocl7pxmpn7kmvjm5bmbwj7mprga`

### JSONs (precisam ser uploadados):
- `badges/1.json` → Aguardando hash IPFS
- `badges/2.json` → Aguardando hash IPFS
- `badges/3.json` → Aguardando hash IPFS
- `badges/4.json` → Aguardando hash IPFS

---

## ✅ Após Configurar

Os badges aparecerão corretamente em:
- ✅ MetaMask
- ✅ OpenSea (Polygon)
- ✅ Outros visualizadores de NFTs
- ✅ Frontend da FLUXX DAO

---

## 🔍 Verificar no PolygonScan

Após configurar, verifique no PolygonScan:

1. Acesse: https://polygonscan.com/address/0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd#readContract
2. Chame `badgeURIs(uint256)` com cada ID (1, 2, 3, 4)
3. Deve retornar as URIs IPFS configuradas

---

**Status:** ⏳ Aguardando upload dos JSONs para IPFS

