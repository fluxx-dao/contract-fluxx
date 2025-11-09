# ✅ Verificar Todos os Contratos no PolygonScan

## 📋 Status Atual

- ✅ **Token**: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` - **VERIFICADO**
- ❌ **BadgeNFT**: `0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce` - **NÃO VERIFICADO**
- ❌ **Treasury**: `0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93` - **NÃO VERIFICADO**
- ❌ **Governance**: `0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa` - **NÃO VERIFICADO**
- ❌ **Membership**: `0x52926F509d7BD565c02fbd72265E4F5Dda300099` - **NÃO VERIFICADO**
- ❌ **CollabEngine**: `0x3bFB7e43517B0C91F5Bee75FeDd88317Db7C763C` - **NÃO VERIFICADO**

**Gnosis Safe (Owner)**: `0xF040BbD411542F09f775E974fA88E16bF7406d26`

---

## 🚀 Verificação Automática via Hardhat

Você pode verificar todos os contratos automaticamente usando o Hardhat. Execute os comandos abaixo:

---

### 1️⃣ BadgeNFT

```bash
npx hardhat verify --network polygon \
  0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce \
  0xF040BbD411542F09f775E974fA88E16bF7406d26 \
  "https://api.fluxx-dao.io/badges/"
```

**Parâmetros:**
- `initialOwner`: `0xF040BbD411542F09f775E974fA88E16bF7406d26` (Gnosis Safe)
- `baseURI`: `"https://api.fluxx-dao.io/badges/"` (a URL antiga que foi usada no deploy)

---

### 2️⃣ Treasury

```bash
npx hardhat verify --network polygon \
  0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93 \
  0xF040BbD411542F09f775E974fA88E16bF7406d26
```

**Parâmetros:**
- `initialOwner`: `0xF040BbD411542F09f775E974fA88E16bF7406d26` (Gnosis Safe)

---

### 3️⃣ Governance

```bash
npx hardhat verify --network polygon \
  0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa \
  0xF040BbD411542F09f775E974fA88E16bF7406d26 \
  0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce \
  0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93
```

**Parâmetros:**
- `initialOwner`: `0xF040BbD411542F09f775E974fA88E16bF7406d26` (Gnosis Safe)
- `_badgeNFT`: `0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce` (BadgeNFT)
- `_treasury`: `0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93` (Treasury)

---

### 4️⃣ Membership

```bash
npx hardhat verify --network polygon \
  0x52926F509d7BD565c02fbd72265E4F5Dda300099 \
  0xF040BbD411542F09f775E974fA88E16bF7406d26 \
  0xB1430cc106bd664F68BE8d0167A52a29654CF8BA \
  0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce \
  0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93
```

**Parâmetros:**
- `initialOwner`: `0xF040BbD411542F09f775E974fA88E16bF7406d26` (Gnosis Safe)
- `_token`: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (Token)
- `_badgeNFT`: `0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce` (BadgeNFT)
- `_treasury`: `0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93` (Treasury)

---

### 5️⃣ CollabEngine

```bash
npx hardhat verify --network polygon \
  0x3bFB7e43517B0C91F5Bee75FeDd88317Db7C763C \
  0xB1430cc106bd664F68BE8d0167A52a29654CF8BA \
  0x52926F509d7BD565c02fbd72265E4F5Dda300099 \
  0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce
```

**Parâmetros:**
- `_token`: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (Token)
- `_membership`: `0x52926F509d7BD565c02fbd72265E4F5Dda300099` (Membership)
- `_badgeNFT`: `0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce` (BadgeNFT)

**Nota**: CollabEngine não tem owner, então a verificação pode ser opcional.

---

## 📝 Script Completo (Copiar e Colar)

Você pode executar todos de uma vez:

```bash
# BadgeNFT
npx hardhat verify --network polygon 0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce 0xF040BbD411542F09f775E974fA88E16bF7406d26 "https://api.fluxx-dao.io/badges/"

# Treasury
npx hardhat verify --network polygon 0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93 0xF040BbD411542F09f775E974fA88E16bF7406d26

# Governance
npx hardhat verify --network polygon 0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa 0xF040BbD411542F09f775E974fA88E16bF7406d26 0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce 0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93

# Membership
npx hardhat verify --network polygon 0x52926F509d7BD565c02fbd72265E4F5Dda300099 0xF040BbD411542F09f775E974fA88E16bF7406d26 0xB1430cc106bd664F68BE8d0167A52a29654CF8BA 0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce 0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93

# CollabEngine
npx hardhat verify --network polygon 0x3bFB7e43517B0C91F5Bee75FeDd88317Db7C763C 0xB1430cc106bd664F68BE8d0167A52a29654CF8BA 0x52926F509d7BD565c02fbd72265E4F5Dda300099 0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce
```

---

## 🔗 Links dos Contratos

- **BadgeNFT**: https://polygonscan.com/address/0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce
- **Treasury**: https://polygonscan.com/address/0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93
- **Governance**: https://polygonscan.com/address/0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa
- **Membership**: https://polygonscan.com/address/0x52926F509d7BD565c02fbd72265E4F5Dda300099
- **CollabEngine**: https://polygonscan.com/address/0x3bFB7e43517B0C91F5Bee75FeDd88317Db7C763C

---

## ⚠️ Importante

- Certifique-se de que a `POLYGONSCAN_API_KEY` está configurada no `.env`
- Execute os comandos na ordem (não é obrigatório, mas ajuda)
- Se algum falhar, verifique os parâmetros do constructor

---

Boa sorte! 🚀

