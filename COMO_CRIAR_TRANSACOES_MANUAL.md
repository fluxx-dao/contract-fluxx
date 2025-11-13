# 🎯 Como Criar as Transações Manualmente no Safe

## ⚠️ Problema: Importação de JSON não funciona

O Safe Transaction Builder às vezes não aceita importação de JSON. Vamos criar manualmente pela interface visual.

---

## 📋 Dados para Copiar e Colar

### Contrato Token

```
0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
```

### Transação 1: Fundador #1
- **Endereço:** `0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f`
- **Quantidade (wei):** `600000000000000000000`

### Transação 2: Fundador #2
- **Endereço:** `0xa387691E594dF109aD9cA83767F39D419CBC6001`
- **Quantidade (wei):** `200000000000000000000`

### Transação 3: Fundador #3
- **Endereço:** `0x887b641EF4A1e99022e290dF6Ac9c81eA50AE0CD`
- **Quantidade (wei):** `200000000000000000000`

### Transação 4: Fundador #4
- **Endereço:** `0xc8b6C6cF88ecE28EfDede72ed625b95b73Cb649F`
- **Quantidade (wei):** `200000000000000000000`

---

## 🚀 Passo a Passo Rápido

### 1. Carregar Contrato
1. No campo "Enter Address", cole: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`
2. Clique em "Load"

### 2. Para CADA Fundador (repita 4 vezes):

1. **Selecione função:** `transfer`
2. **Preencha:**
   - `to`: [cole o endereço do fundador acima]
   - `amount`: [cole a quantidade em wei acima]
3. **Clique:** "+ Add new transaction"

### 3. Revisar e Enviar
- Revise as 4 transações
- Clique em "Create Batch"
- Assine e aguarde aprovações

---

## 💡 Dica

Se o contrato não carregar automaticamente, cole este ABI no campo "Enter ABI":

```json
[{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
```

---

**Tempo estimado:** 2-3 minutos para criar as 4 transações

