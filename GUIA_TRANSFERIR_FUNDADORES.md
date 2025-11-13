# 🚀 Guia Passo a Passo: Transferir FLUXX para Fundadores

## ✅ Método Visual (Recomendado - Mais Confiável)

O Safe Transaction Builder às vezes não aceita importação de JSON. Vamos criar as transações manualmente pela interface visual.

---

## 📋 Informações Necessárias

**Contrato Token:** `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`  
**Função:** `transfer(address to, uint256 amount)`

**Fundadores:**
- Fundador #1: `0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f` → **600 FLUXX**
- Fundador #2: `0xa387691E594dF109aD9cA83767F39D419CBC6001` → **200 FLUXX**
- Fundador #3: `0x887b641EF4A1e99022e290dF6Ac9c81eA50AE0CD` → **200 FLUXX**
- Fundador #4: `0xc8b6C6cF88ecE28EfDede72ed625b95b73Cb649F` → **200 FLUXX**

**Quantidades em Wei:**
- 600 FLUXX = `600000000000000000000`
- 200 FLUXX = `200000000000000000000`

---

## 🎯 Passo a Passo

### 1️⃣ Carregar o Contrato Token

1. No campo **"Enter Address or ENS Name"**, cole:
   ```
   0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
   ```

2. Clique em **"Load"** ou pressione Enter

3. **Carregar ABI (Opcional mas Recomendado):**
   - Clique em **"Enter ABI"**
   - Cole o ABI do Token (veja abaixo) ou deixe vazio se o contrato estiver verificado

---

### 2️⃣ Criar Transação 1: Fundador #1 (600 FLUXX)

1. **Selecione a função:**
   - No dropdown "Select function", escolha: `transfer(address to, uint256 amount)`
   - Se não aparecer, digite: `transfer`

2. **Preencha os parâmetros:**
   - **to (address):** `0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f`
   - **amount (uint256):** `600000000000000000000`

3. **Adicionar ao batch:**
   - Clique em **"+ Add new transaction"** ou **"Add transaction"**
   - A transação será adicionada à lista

---

### 3️⃣ Criar Transação 2: Fundador #2 (200 FLUXX)

1. Clique em **"+ Add new transaction"** novamente

2. **Selecione a função:**
   - `transfer(address to, uint256 amount)`

3. **Preencha os parâmetros:**
   - **to (address):** `0xa387691E594dF109aD9cA83767F39D419CBC6001`
   - **amount (uint256):** `200000000000000000000`

4. Clique em **"+ Add new transaction"**

---

### 4️⃣ Criar Transação 3: Fundador #3 (200 FLUXX)

1. Clique em **"+ Add new transaction"**

2. **Selecione a função:**
   - `transfer(address to, uint256 amount)`

3. **Preencha os parâmetros:**
   - **to (address):** `0x887b641EF4A1e99022e290dF6Ac9c81eA50AE0CD`
   - **amount (uint256):** `200000000000000000000`

4. Clique em **"+ Add new transaction"**

---

### 5️⃣ Criar Transação 4: Fundador #4 (200 FLUXX)

1. Clique em **"+ Add new transaction"**

2. **Selecione a função:**
   - `transfer(address to, uint256 amount)`

3. **Preencha os parâmetros:**
   - **to (address):** `0xc8b6C6cF88ecE28EfDede72ed625b95b73Cb649F`
   - **amount (uint256):** `200000000000000000000`

4. Clique em **"+ Add new transaction"**

---

### 6️⃣ Revisar o Batch

Agora você deve ter **4 transações** na lista:

```
1. transfer(0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f, 600000000000000000000)
2. transfer(0xa387691E594dF109aD9cA83767F39D419CBC6001, 200000000000000000000)
3. transfer(0x887b641EF4A1e99022e290dF6Ac9c81eA50AE0CD, 200000000000000000000)
4. transfer(0xc8b6C6cF88ecE28EfDede72ed625b95b73Cb649F, 200000000000000000000)
```

**Revise cada uma:**
- ✅ Endereço do contrato está correto (`0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`)
- ✅ Função está correta (`transfer`)
- ✅ Endereços de destino estão corretos
- ✅ Quantidades estão corretas

---

### 7️⃣ Criar e Enviar o Batch

1. **Criar Batch:**
   - Clique em **"Create Batch"** ou **"Send Batch"**
   - O Safe vai calcular o gas necessário

2. **Revisar Gas:**
   - Verifique o custo estimado em POL
   - Certifique-se de que o Safe tem POL suficiente (~0.01-0.02 POL)

3. **Assinar:**
   - Clique em **"Sign"** ou **"Approve"**
   - Conecte sua wallet e assine

4. **Aguardar Aprovações:**
   - Outros signatários precisam aprovar
   - Quando tiver aprovações suficientes, execute

---

## 📐 ABI do Token (Para Colar no Safe)

Se o contrato não estiver verificado ou o Safe não conseguir carregar automaticamente:

```json
[
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "transfer",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
```

---

## ✅ Checklist Final

Antes de executar, verifique:

- [ ] **4 transações** criadas
- [ ] **Endereço do Token** está correto em todas
- [ ] **Endereços dos fundadores** estão corretos (copie e cole, não digite)
- [ ] **Quantidades** estão em wei (18 decimais)
- [ ] **Você está no Safe correto** (`0xF040...6d26`)
- [ ] **Rede está correta** (Polygon Mainnet)
- [ ] **Safe tem POL suficiente** para gas

---

## 🔗 Link Direto

https://app.safe.global/apps/open?safe=matic:0xF040BbD411542F09f775E974fA88E16bF7406d26&appUrl=https%3A%2F%2Fapps-portal.safe.global%2Ftx-builder

---

**Status:** ✅ Pronto para executar  
**Método:** Interface Visual (mais confiável que JSON)

