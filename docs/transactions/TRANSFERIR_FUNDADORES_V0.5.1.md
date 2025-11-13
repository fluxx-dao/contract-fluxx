# 💰 Transferir FLUXX aos Fundadores - v0.5.1+

## ✅ Deploy Concluído - Novos Endereços

**Treasury:** `0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af`  
**Token:** `0x263Fe9898b8A9bba3E08403cC9054dCa39a11636`  
**Safe:** `0xF040BbD411542F09f775E974fA88E16bF7406d26`

---

## 🎯 Método: `withdrawTokensByOwner()`

Esta função permite ao owner (Safe) transferir tokens diretamente do Treasury **sem timelock**.

---

## 📋 Transações para Criar no Safe

### Transação 1: Fundador #1 (600 FLUXX)

**No Safe Transaction Builder:**

1. **To Address:** `0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af` (Treasury)
2. **Function:** `withdrawTokensByOwner(address tokenAddress, uint256 amount, address to)`
3. **Parâmetros:**
   - `tokenAddress`: `0x263Fe9898b8A9bba3E08403cC9054dCa39a11636`
   - `amount`: `600000000000000000000`
   - `to`: `0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f`
4. Clique em "+ Add new transaction"

---

### Transação 2: Fundador #2 (200 FLUXX)

1. **To Address:** `0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af`
2. **Function:** `withdrawTokensByOwner`
3. **Parâmetros:**
   - `tokenAddress`: `0x263Fe9898b8A9bba3E08403cC9054dCa39a11636`
   - `amount`: `200000000000000000000`
   - `to`: `0xa387691E594dF109aD9cA83767F39D419CBC6001`
4. Clique em "+ Add new transaction"

---

### Transação 3: Fundador #3 (200 FLUXX)

1. **To Address:** `0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af`
2. **Function:** `withdrawTokensByOwner`
3. **Parâmetros:**
   - `tokenAddress`: `0x263Fe9898b8A9bba3E08403cC9054dCa39a11636`
   - `amount`: `200000000000000000000`
   - `to`: `0x887b641EF4A1e99022e290dF6Ac9c81eA50AE0CD`
4. Clique em "+ Add new transaction"

---

### Transação 4: Fundador #4 (200 FLUXX)

1. **To Address:** `0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af`
2. **Function:** `withdrawTokensByOwner`
3. **Parâmetros:**
   - `tokenAddress`: `0x263Fe9898b8A9bba3E08403cC9054dCa39a11636`
   - `amount`: `200000000000000000000`
   - `to`: `0xc8b6C6cF88ecE28EfDede72ed625b95b73Cb649F`
4. Clique em "+ Add new transaction"

---

## 🚀 Executar no Safe

1. **Criar Batch:** Após adicionar as 4 transações, clique em "Create Batch"
2. **Revisar:** Verifique todos os endereços e quantidades
3. **Assinar:** Assine a transação
4. **Aguardar:** Aguarde aprovações dos outros signatários
5. **Executar:** Execute quando tiver aprovações suficientes

---

## ✅ Verificação Pós-Transferência

Após executar, verifique no PolygonScan:

1. **Token:** https://polygonscan.com/address/0x263Fe9898b8A9bba3E08403cC9054dCa39a11636#readContract
2. Chame `balanceOf(address)` com cada endereço de fundador
3. Deve mostrar os novos saldos

---

## 🔗 Link Direto

https://app.safe.global/apps/open?safe=matic:0xF040BbD411542F09f775E974fA88E16bF7406d26&appUrl=https%3A%2F%2Fapps-portal.safe.global%2Ftx-builder

---

**Status:** ✅ Pronto para transferir  
**Método:** `Treasury.withdrawTokensByOwner()` (sem timelock)

