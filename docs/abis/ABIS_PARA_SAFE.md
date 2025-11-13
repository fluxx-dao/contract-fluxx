# 📋 ABIs para Configuração no Safe

## ⚠️ IMPORTANTE: Use o ABI COMPLETO!

O Safe Transaction Builder **precisa do ABI completo do contrato**, não apenas de uma função.

**📋 Veja `ABIS_COMPLETOS_SAFE.md` para os ABIs completos prontos para copiar!**

---

## 🔧 Como Usar no Safe Transaction Builder

1. **Clique em "Add transaction"**
2. **Cole o endereço do contrato em "To"**
3. **Clique em "Use custom ABI"**
4. **Cole o ABI COMPLETO do contrato** (veja `ABIS_COMPLETOS_SAFE.md`)
5. **Selecione a função desejada**
6. **Preencha os parâmetros**
7. **Clique em "Add"**

---

## ⚠️ Se aparecer "Contract ABI doesn't have any public methods"

Isso significa que você precisa usar o **ABI completo do contrato**, não apenas uma função.

**Solução:** Use os ABIs completos em `ABIS_COMPLETOS_SAFE.md`

---

## 1️⃣ Token.authorizeMinter(Treasury)

**Contrato:** `0x263Fe9898b8A9bba3E08403cC9054dCa39a11636`  
**Função:** `authorizeMinter`

### ABI da Função:
```json
{
  "inputs": [
    {
      "internalType": "address",
      "name": "minter",
      "type": "address"
    }
  ],
  "name": "authorizeMinter",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}
```

**Parâmetro:** `0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af` (Treasury)

---

## 2️⃣ Token.authorizeMinter(Governance)

**Contrato:** `0x263Fe9898b8A9bba3E08403cC9054dCa39a11636`  
**Função:** `authorizeMinter`

### ABI da Função:
```json
{
  "inputs": [
    {
      "internalType": "address",
      "name": "minter",
      "type": "address"
    }
  ],
  "name": "authorizeMinter",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}
```

**Parâmetro:** `0x00A4006ce4F0E9693Fa631A834d99dFEbb72F013` (Governance)

---

## 3️⃣ Treasury.setGovernance(Governance)

**Contrato:** `0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af`  
**Função:** `setGovernance`

### ABI da Função:
```json
{
  "inputs": [
    {
      "internalType": "address",
      "name": "_governance",
      "type": "address"
    }
  ],
  "name": "setGovernance",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}
```

**Parâmetro:** `0x00A4006ce4F0E9693Fa631A834d99dFEbb72F013` (Governance)

---

## 4️⃣ BadgeNFT.authorizeMinter(Membership)

**Contrato:** `0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd`  
**Função:** `authorizeMinter`

### ABI da Função:
```json
{
  "inputs": [
    {
      "internalType": "address",
      "name": "minter",
      "type": "address"
    }
  ],
  "name": "authorizeMinter",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}
```

**Parâmetro:** `0x707f9a126D8d7bbCd7e40Fc0CEF1cdAa76678925` (Membership)

---

## 5️⃣ BadgeNFT.authorizeMinter(CollabEngine)

**Contrato:** `0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd`  
**Função:** `authorizeMinter`

### ABI da Função:
```json
{
  "inputs": [
    {
      "internalType": "address",
      "name": "minter",
      "type": "address"
    }
  ],
  "name": "authorizeMinter",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}
```

**Parâmetro:** `0xfF972C1917FBaaE17a02Dea0BBEC29EBbd5c4f28` (CollabEngine)

---

## 6️⃣ BadgeNFT.authorizeBurner(Governance) ⭐ NOVO

**Contrato:** `0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd`  
**Função:** `authorizeBurner`

### ABI da Função:
```json
{
  "inputs": [
    {
      "internalType": "address",
      "name": "burner",
      "type": "address"
    }
  ],
  "name": "authorizeBurner",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}
```

**Parâmetro:** `0x00A4006ce4F0E9693Fa631A834d99dFEbb72F013` (Governance)

---

## 7️⃣ Governance.atualizarParametros() [OPCIONAL]

**Contrato:** `0x00A4006ce4F0E9693Fa631A834d99dFEbb72F013`  
**Função:** `atualizarParametros`

### ABI da Função:
```json
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "_duracaoVotacao",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "_quorumMinimo",
      "type": "uint256"
    }
  ],
  "name": "atualizarParametros",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}
```

**Parâmetros:**
- `_duracaoVotacao`: `259200` (3 dias em segundos)
- `_quorumMinimo`: `10` (fallback mínimo)

---

## 📝 Instruções no Safe Transaction Builder

1. **Acesse:** https://app.safe.global/apps/open?safe=matic:0xF040BbD411542F09f775E974fA88E16bF7406d26&appUrl=https%3A%2F%2Fapps-portal.safe.global%2Ftx-builder

2. **Para cada transação:**
   - Clique em "Add transaction"
   - Cole o endereço do contrato em "To"
   - Clique em "Use custom ABI"
   - Cole o ABI da função específica (ou o ABI completo abaixo)
   - Selecione a função
   - Preencha os parâmetros
   - Clique em "Add"

3. **Criar batch:** Após adicionar todas, clique em "Create batch"

---

## 🔄 ABIs Completos (Alternativa)

Se preferir usar o ABI completo do contrato:

### Token ABI Completo:
```json
[{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"address","name":"initialOwner","type":"address"},{"internalType":"address","name":"treasury","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"minter","type":"address"}],"name":"authorizeMinter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"minter","type":"address"}],"name":"revokeMinter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"}]
```

### Treasury ABI Completo:
```json
[{"inputs":[{"internalType":"address","name":"initialOwner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"_governance","type":"address"}],"name":"setGovernance","outputs":[],"stateMutability":"nonpayable","type":"function"}]
```

### BadgeNFT ABI Completo:
```json
[{"inputs":[{"internalType":"address","name":"initialOwner","type":"address"},{"internalType":"string","name":"baseURI","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"minter","type":"address"}],"name":"authorizeMinter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"burner","type":"address"}],"name":"authorizeBurner","outputs":[],"stateMutability":"nonpayable","type":"function"}]
```

### Governance ABI Completo:
```json
[{"inputs":[{"internalType":"address","name":"initialOwner","type":"address"},{"internalType":"address","name":"_badgeNFT","type":"address"},{"internalType":"address","name":"_treasury","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"_duracaoVotacao","type":"uint256"},{"internalType":"uint256","name":"_quorumMinimo","type":"uint256"}],"name":"atualizarParametros","outputs":[],"stateMutability":"nonpayable","type":"function"}]
```

---

**💡 Dica:** Use apenas o ABI da função específica (mais fácil e rápido!)

