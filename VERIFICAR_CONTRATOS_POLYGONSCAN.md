# ✅ Verificar Contratos no PolygonScan

## 🔍 Por que Verificar?

Verificar os contratos no PolygonScan permite:
- ✅ Código-fonte público e auditável
- ✅ Interface interativa para chamar funções
- ✅ Maior transparência e confiança
- ✅ Facilita debugging e auditoria

---

## 📋 Contratos que Precisam ser Verificados

1. **Treasury:** `0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af`
2. **BadgeNFT:** `0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd`
3. **CollabEngine:** `0xfF972C1917FBaaE17a02Dea0BBEC29EBbd5c4f28`
4. **Token:** `0x263Fe9898b8A9bba3E08403cC9054dCa39a11636`
5. **Governance:** `0x00A4006ce4F0E9693Fa631A834d99dFEbb72F013`
6. **Membership:** `0x707f9a126D8d7bbCd7e40Fc0CEF1cdAa76678925`

---

## 🚀 Método 1: Script Automático (Recomendado)

### Pré-requisito: API Key do PolygonScan

1. **Obter API Key:**
   - Acesse: https://polygonscan.com/apis
   - Crie uma conta (se não tiver)
   - Gere uma API Key gratuita
   - Adicione no `.env`:
     ```
     POLYGONSCAN_API_KEY=sua_api_key_aqui
     ```

2. **Executar Script:**
   ```bash
   npx hardhat run scripts/verifyContracts.js --network polygon
   ```

O script verifica todos os contratos automaticamente!

---

## 🔧 Método 2: Verificar Manualmente (Um por Um)

Se preferir verificar manualmente ou se o script falhar:

### 1. Treasury

```bash
npx hardhat verify --network polygon \
  0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af \
  "0xF040BbD411542F09f775E974fA88E16bF7406d26"
```

**Construtor:** `constructor(address initialOwner)`

---

### 2. BadgeNFT

```bash
npx hardhat verify --network polygon \
  0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd \
  "0xF040BbD411542F09f775E974fA88E16bF7406d26" \
  "https://fluxx.space/badges/"
```

**Construtor:** `constructor(address initialOwner, string memory baseURI)`

---

### 3. CollabEngine

```bash
npx hardhat verify --network polygon \
  0xfF972C1917FBaaE17a02Dea0BBEC29EBbd5c4f28 \
  "0x263Fe9898b8A9bba3E08403cC9054dCa39a11636" \
  "0x707f9a126D8d7bbCd7e40Fc0CEF1cdAa76678925" \
  "0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd"
```

**Construtor:** `constructor(address _token, address _membership, address _badgeNFT)`

---

### 4. Token

```bash
npx hardhat verify --network polygon \
  0x263Fe9898b8A9bba3E08403cC9054dCa39a11636 \
  "FLUXX DAO" \
  "FLUXX" \
  "0xF040BbD411542F09f775E974fA88E16bF7406d26" \
  "0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af"
```

**Construtor:** `constructor(string memory name, string memory symbol, address initialOwner, address treasury)`

---

### 5. Governance

```bash
npx hardhat verify --network polygon \
  0x00A4006ce4F0E9693Fa631A834d99dFEbb72F013 \
  "0xF040BbD411542F09f775E974fA88E16bF7406d26" \
  "0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd" \
  "0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af"
```

**Construtor:** `constructor(address initialOwner, address _badgeNFT, address _treasury)`

---

### 6. Membership

```bash
npx hardhat verify --network polygon \
  0x707f9a126D8d7bbCd7e40Fc0CEF1cdAa76678925 \
  "0xF040BbD411542F09f775E974fA88E16bF7406d26" \
  "0x263Fe9898b8A9bba3E08403cC9054dCa39a11636" \
  "0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd" \
  "0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af"
```

**Construtor:** `constructor(address initialOwner, address _token, address _badgeNFT, address _treasury)`

---

## ✅ Verificar se Funcionou

Após verificar, acesse cada contrato no PolygonScan:

- **Treasury:** https://polygonscan.com/address/0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af#code
- **BadgeNFT:** https://polygonscan.com/address/0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd#code
- **CollabEngine:** https://polygonscan.com/address/0xfF972C1917FBaaE17a02Dea0BBEC29EBbd5c4f28#code
- **Token:** https://polygonscan.com/address/0x263Fe9898b8A9bba3E08403cC9054dCa39a11636#code
- **Governance:** https://polygonscan.com/address/0x00A4006ce4F0E9693Fa631A834d99dFEbb72F013#code
- **Membership:** https://polygonscan.com/address/0x707f9a126D8d7bbCd7e40Fc0CEF1cdAa76678925#code

Você deve ver:
- ✅ Código-fonte completo (não apenas bytecode)
- ✅ Aba "Contract" com código legível
- ✅ Aba "Read Contract" para chamar funções
- ✅ Aba "Write Contract" para interagir

---

## 🔗 Obter API Key do PolygonScan

1. Acesse: https://polygonscan.com/apis
2. Faça login ou crie uma conta
3. Clique em "Add" para criar uma nova API Key
4. Copie a API Key
5. Adicione no `.env`:
   ```
   POLYGONSCAN_API_KEY=sua_api_key_aqui
   ```

---

## ⚠️ Troubleshooting

### Erro: "Contract already verified"
✅ Isso significa que o contrato já está verificado! Pode pular.

### Erro: "Constructor arguments mismatch"
❌ Verifique os argumentos do construtor. Use os comandos acima.

### Erro: "API key not found"
❌ Adicione `POLYGONSCAN_API_KEY` no `.env`

---

**Status:** ✅ Script criado, pronto para executar!

