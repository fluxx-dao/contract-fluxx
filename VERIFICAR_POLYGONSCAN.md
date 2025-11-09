# ✅ Verificar Contrato no PolygonScan - Guia Passo a Passo

## 🎯 Objetivo

Verificar o contrato Token no PolygonScan para poder:
- Ver o código-fonte no explorador
- Atualizar o logo/imagem do token
- Aumentar a confiança dos usuários

---

## 📋 Endereço do Contrato

**Token FLUXX**: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`

**Link direto**: https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA

---

## 🔧 Passo a Passo

### 1️⃣ Acessar o Contrato

1. Acesse: https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
2. Você verá a página do contrato (ainda não verificado)

### 2️⃣ Iniciar Verificação

1. Clique na aba **"Contract"** (ao lado de "Transactions", "Token Tracker", etc.)
2. Clique no botão **"Verify and Publish"**

### 3️⃣ Preencher os Dados

**Opção 1: Via Single File (Mais Simples)**

1. **Compiler Type**: Selecione **"Solidity (Single file)"**
2. **Compiler Version**: Selecione **"v0.8.20+commit.a1b79de6"** (ou a versão mais próxima de 0.8.20)
3. **License**: Selecione **"MIT License (MIT)"**
4. **Enter the Solidity Contract Code below**: 
   - Abra o arquivo `contracts/Token.sol`
   - Copie TODO o conteúdo e cole aqui

5. Clique em **"Continue"**

**Opção 2: Via Standard JSON Input (Mais Completo)**

1. **Compiler Type**: Selecione **"Solidity (Standard JSON Input)"**
2. **Compiler Version**: Selecione **"v0.8.20+commit.a1b79de6"**
3. **License**: Selecione **"MIT License (MIT)"**
4. **Standard JSON Input**: 
   - Execute: `npx hardhat verify --network polygon 0xB1430cc106bd664F68BE8d0167A52a29654CF8BA "FLUXX DAO" "FLUXX" 0xF040BbD411542F09f775E974fA88E16bF7406d26 0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93`
   - Ou use o arquivo de compilação do Hardhat

### 4️⃣ Preencher Parâmetros do Constructor

O PolygonScan vai pedir os parâmetros do constructor. Preencha:

1. **name (string)**: `FLUXX DAO`
2. **symbol (string)**: `FLUXX`
3. **initialOwner (address)**: `0xF040BbD411542F09f775E974fA88E16bF7406d26` (Gnosis Safe)
4. **treasury (address)**: `0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93` (Treasury)

### 5️⃣ Verificar

1. Clique em **"Verify and Publish"**
2. Aguarde alguns segundos
3. Se tudo estiver correto, você verá: **"Successfully Verified"**

---

## ✅ Após Verificação

Após verificar com sucesso:

1. **O código-fonte aparecerá** na aba "Contract"
2. Você poderá **atualizar o logo** do token
3. O contrato terá um **badge de verificação** ✅

---

## 🖼️ Atualizar Logo (Próximo Passo)

Após verificar, você pode atualizar o logo:

1. Na página do contrato, procure por **"More Options"** ou **"Update Token Info"**
2. Faça upload da imagem ou cole a URL do IPFS
3. Salve

---

## ⚠️ Problemas Comuns

**Erro: "Constructor arguments are not correct"**

- Verifique se os parâmetros estão na ordem correta
- Use os endereços exatos (com 0x no início)

**Erro: "Compiler version mismatch"**

- Use exatamente a versão 0.8.20
- Verifique no arquivo `hardhat.config.js` qual versão foi usada

**Erro: "Contract code does not match"**

- Certifique-se de copiar TODO o código do `Token.sol`
- Inclua os imports (mesmo que o PolygonScan não os use diretamente)

---

## 🔗 Links Úteis

- **Contrato Token**:
https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
- **Verificar Contrato**:
https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA#code
- **PolygonScan Docs**: https://docs.polygonscan.com/

---

## 💡 Dica

Se tiver problemas, você pode usar o Hardhat para verificar automaticamente:

```bash
npx hardhat verify --network polygon \
  0xB1430cc106bd664F68BE8d0167A52a29654CF8BA \
  "FLUXX DAO" \
  "FLUXX" \
  0xF040BbD411542F09f775E974fA88E16bF7406d26 \
  0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93
```

Mas você precisa ter a `POLYGONSCAN_API_KEY` configurada no `.env` (você já tem!).

---

Boa sorte! 🚀

