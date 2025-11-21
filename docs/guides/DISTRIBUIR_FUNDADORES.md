# 💰 Distribuir FLUXX aos Fundadores - Guia Completo

## 📋 Resumo

Este guia mostra como distribuir FLUXX do Treasury para os fundadores usando `Treasury.withdrawTokensByOwner()`.

**Método:** Via Safe (recomendado) ou Script Hardhat/Thirdweb

---

## 📊 Distribuição Planejada

### Fundadores e Quantidades

| Fundador | Endereço | Quantidade (FLUXX) |
|----------|----------|-------------------|
| **Fundador #1** | `0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f` | 2.500.000 |
| **Fundador #2** | `0xa387691E594dF109aD9cA83767F39D419CBC6001` | 2.500.000 |
| **Fundador #3** | `0x887b641EF4A1e99022e290dF6Ac9c81eA50AE0CD` | 2.500.000 |
| **Fundador #4** | `0xc8b6C6cF88ecE28EfDede72ed625b95b73Cb649F` | 2.500.000 |
| **TOTAL** | - | **10.000.000** |

**Nota:** Esta é uma distribuição igual (25% cada). Ajuste as quantidades no script se necessário.

---

## 🚀 Método 1: Via Safe Transaction Builder (Recomendado)

### Passo a Passo

1. **Acesse o Safe:**
   - https://app.safe.global/
   - Safe: `0xF040BbD411542F09f775E974fA88E16bF7406d26`
   - Rede: Polygon

2. **Acesse o Transaction Builder:**
   - https://app.safe.global/apps/open?safe=matic:0xF040BbD411542F09f775E974fA88E16bF7406d26&appUrl=https%3A%2F%2Fapps-portal.safe.global%2Ftx-builder

3. **Para cada fundador, adicione uma transação:**

   **Transação para Fundador #1 (2.500.000 FLUXX):**
   - **To:** `0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93` (Treasury)
   - **Function:** `withdrawTokensByOwner(address,uint256,address)`
   - **ABI (cole no campo ABI):**
     ```json
     [{
       "inputs": [
         {"internalType": "address", "name": "tokenAddress", "type": "address"},
         {"internalType": "uint256", "name": "amount", "type": "uint256"},
         {"internalType": "address", "name": "to", "type": "address"}
       ],
       "name": "withdrawTokensByOwner",
       "outputs": [],
       "stateMutability": "nonpayable",
       "type": "function"
     }]
     ```
   - **Parâmetros:**
     - `tokenAddress`: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`
     - `amount`: `2500000000000000000000000` (2.500.000 FLUXX em wei)
     - `to`: `0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f`

   **Repita para os outros 3 fundadores** (mesmo processo, apenas mude o `to` e o `amount` se necessário).

4. **Criar batch e executar:**
   - Revise todas as 4 transações
   - Crie o batch
   - Aguarde aprovações
   - Execute

---

## 🔧 Método 2: Script Hardhat (Ethers.js)

### Pré-requisitos

- `PRIVATE_KEY` no `.env` deve ser do **owner do Treasury** (Safe)
- Ou use uma wallet que seja signatário do Safe

### Executar

```bash
npx hardhat run scripts/distribuirFundadores.js --network polygon
```

### O que o script faz:

1. ✅ Verifica se o signer é owner do Treasury
2. ✅ Verifica saldo do Treasury
3. ✅ Mostra resumo da distribuição
4. ✅ Executa transferências sequenciais
5. ✅ Mostra links das transações

### Ajustar Quantidades

Edite o array `FOUNDERS` no script:

```javascript
const FOUNDERS = [
  { 
    address: "0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f", 
    amount: 2500000, // Ajuste aqui
    name: "Fundador #1"
  },
  // ...
];
```

---

## 🔧 Método 3: Script Thirdweb (TypeScript)

### Pré-requisitos

```bash
npm install thirdweb ts-node typescript
```

### Configurar

- `THIRDWEB_SECRET_KEY` no `.env` (já configurado)

### Executar

```bash
npx ts-node scripts/distribuirFundadoresThirdweb.ts
```

### Ajustar Quantidades

Edite o array `founders` no script:

```typescript
const founders = [
  { 
    address: "0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f", 
    amount: "2500000", // Ajuste aqui (string)
    name: "Fundador #1"
  },
  // ...
];
```

---

## 📊 Quantidades em Wei

Para referência, aqui estão as quantidades em wei (18 decimais):

| FLUXX | Wei |
|-------|-----|
| 2.500.000 | `2500000000000000000000000` |
| 2.000.000 | `2000000000000000000000000` |
| 1.500.000 | `1500000000000000000000000` |
| 1.000.000 | `1000000000000000000000000` |
| 500.000 | `500000000000000000000000` |
| 100.000 | `100000000000000000000000` |
| 10.000 | `10000000000000000000000` |
| 1.000 | `1000000000000000000000` |
| 100 | `100000000000000000000` |
| 10 | `10000000000000000000` |
| 1 | `1000000000000000000` |
| 0.5 | `500000000000000000` |

---

## ✅ Verificação Pós-Transferência

Após executar, verifique:

1. **Saldos dos fundadores:**
   - Fundador #1: https://polygonscan.com/address/0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f#tokentxns
   - Fundador #2: https://polygonscan.com/address/0xa387691E594dF109aD9cA83767F39D419CBC6001#tokentxns
   - Fundador #3: https://polygonscan.com/address/0x887b641EF4A1e99022e290dF6Ac9c81eA50AE0CD#tokentxns
   - Fundador #4: https://polygonscan.com/address/0xc8b6C6cF88ecE28EfDede72ed625b95b73Cb649F#tokentxns

2. **Saldo do Treasury:**
   - Deve ter reduzido em 10.000.000 FLUXX
   - Link: https://polygonscan.com/address/0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93#tokentxns

---

## ⚠️ Importante

1. **Owner do Treasury:** O signer precisa ser o owner do Treasury (Safe)
2. **Saldo suficiente:** Treasury precisa ter pelo menos 10.000.000 FLUXX
3. **Gas:** Cada transação consome ~0.001-0.002 POL
4. **Revisar:** Sempre revise endereços e quantidades antes de executar

---

## 🔗 Links Úteis

- **Treasury:** https://polygonscan.com/address/0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93
- **Token FLUXX:** https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
- **Safe:** https://app.safe.global/
- **Transaction Builder:** https://apps-portal.safe.global/tx-builder

---

**Status:** ✅ Scripts prontos para uso  
**Versão:** v0.5.1+  
**Data:** Novembro 2025

