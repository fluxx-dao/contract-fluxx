# 🚀 Guia Super Simples: Transferir FLUXX (Método Alternativo)

## ⚠️ Se o Transaction Builder não está funcionando, use este método mais direto!

---

## 🎯 Método Alternativo: "New Transaction" Direto no Safe

Este método é mais simples e direto, sem usar o Transaction Builder.

---

## 📋 Passo a Passo Completo

### 1️⃣ Acessar o Safe

1. Acesse: https://app.safe.global/
2. Conecte sua wallet
3. Selecione a rede: **Polygon**
4. Abra sua Safe: `0xF040BbD411542F09f775E974fA88E16bF7406d26`

### 2️⃣ Criar Nova Transação

1. Clique no botão verde **"New transaction"** (canto superior direito)
2. Selecione **"Contract interaction"**

### 3️⃣ Preencher Dados da Transação

#### Campo 1: "To Address" ou "Contract Address"
```
0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
```
(Cole o endereço do Token)

#### Campo 2: "ABI" (Opcional)
Se pedir ABI, cole apenas esta parte:
```json
[{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
```

#### Campo 3: Selecionar Função
- Procure na lista: **`transfer`**
- OU digite: `transfer(address,uint256)`
- Clique para selecionar

#### Campo 4: Parâmetros

Aparecerão **2 campos** para preencher:

**Campo A - `to` (address):**
```
0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f
```

**Campo B - `amount` (uint256):**
```
600000000000000000000
```

### 4️⃣ Revisar e Criar

1. Revise:
   - ✅ To: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`
   - ✅ Function: `transfer`
   - ✅ to: `0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f`
   - ✅ amount: `600000000000000000000`

2. Clique em **"Create transaction"**

3. Assine a transação

---

## 🔄 Repetir para os Outros Fundadores

Após criar a primeira transação, repita o processo para:

### Fundador #2:
- `to`: `0xa387691E594dF109aD9cA83767F39D419CBC6001`
- `amount`: `200000000000000000000`

### Fundador #3:
- `to`: `0x887b641EF4A1e99022e290dF6Ac9c81eA50AE0CD`
- `amount`: `200000000000000000000`

### Fundador #4:
- `to`: `0xc8b6C6cF88ecE28EfDede72ed625b95b73Cb649F`
- `amount`: `200000000000000000000`

---

## 💡 Dica: Criar Uma de Cada Vez

Não precisa criar todas de uma vez! Crie uma transação, aguarde aprovação e execute. Depois crie a próxima.

---

## 🆘 Se Ainda Não Funcionar

### Alternativa: Usar PolygonScan Diretamente

1. Acesse: https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA#writeContract
2. Conecte sua wallet (deve ser signatário do Safe)
3. Selecione a função: `transfer(address to, uint256 amount)`
4. Preencha os parâmetros
5. Clique em "Write" e assine

**Nota:** Isso vai criar uma transação direta da sua wallet, não do Safe. Use apenas se o Safe não funcionar.

---

## 📞 Precisa de Ajuda?

Me diga exatamente em qual passo você está travando:
- [ ] Não consegue encontrar o botão "New transaction"
- [ ] Não aparece a função `transfer` na lista
- [ ] Os campos de parâmetros não aparecem
- [ ] Outro problema (descreva)

---

**Vamos resolver isso juntos!** 🚀

