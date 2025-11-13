# 💰 Transferir FLUXX aos Fundadores - Guia Rápido

## ✅ Use `Treasury.withdrawTokensByOwner()` - Sem Timelock

**Treasury:** `0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af`  
**Token:** `0x263Fe9898b8A9bba3E08403cC9054dCa39a11636`

---

## 📋 ABI do Treasury (Cole no Safe)

```json
[
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "withdrawTokensByOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
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
]
```

---

## 🚀 Transações para Criar no Safe

### Transação 1: Fundador #1 (600 FLUXX)

1. **To Address:** `0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af`
2. **Use custom ABI:** Cole o ABI acima
3. **Função:** `withdrawTokensByOwner`
4. **Parâmetros:**
   - `tokenAddress`: `0x263Fe9898b8A9bba3E08403cC9054dCa39a11636`
   - `amount`: `600000000000000000000` (600 FLUXX em wei)
   - `to`: `0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f`
5. Clique em "+ Add new transaction"

---

### Transação 2: Fundador #2 (200 FLUXX)

1. **To Address:** `0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af`
2. **Use custom ABI:** Cole o ABI acima
3. **Função:** `withdrawTokensByOwner`
4. **Parâmetros:**
   - `tokenAddress`: `0x263Fe9898b8A9bba3E08403cC9054dCa39a11636`
   - `amount`: `200000000000000000000` (200 FLUXX em wei)
   - `to`: `0xa387691E594dF109aD9cA83767F39D419CBC6001`
5. Clique em "+ Add new transaction"

---

### Transação 3: Fundador #3 (200 FLUXX)

1. **To Address:** `0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af`
2. **Use custom ABI:** Cole o ABI acima
3. **Função:** `withdrawTokensByOwner`
4. **Parâmetros:**
   - `tokenAddress`: `0x263Fe9898b8A9bba3E08403cC9054dCa39a11636`
   - `amount`: `200000000000000000000` (200 FLUXX em wei)
   - `to`: `0x887b641EF4A1e99022e290dF6Ac9c81eA50AE0CD`
5. Clique em "+ Add new transaction"

---

### Transação 4: Fundador #4 (200 FLUXX)

1. **To Address:** `0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af`
2. **Use custom ABI:** Cole o ABI acima
3. **Função:** `withdrawTokensByOwner`
4. **Parâmetros:**
   - `tokenAddress`: `0x263Fe9898b8A9bba3E08403cC9054dCa39a11636`
   - `amount`: `200000000000000000000` (200 FLUXX em wei)
   - `to`: `0xc8b6C6cF88ecE28EfDede72ed625b95b73Cb649F`
5. Clique em "+ Add new transaction"

---

## ✅ Executar no Safe

1. **Após adicionar as 4 transações:**
   - Clique em "Create Batch"
   - Revise todas as transações
   - Assine a transação
   - Aguarde aprovações dos outros signatários
   - Execute quando tiver aprovações suficientes

---

## 🔍 Verificar Após Execução

Após executar, verifique no PolygonScan:

1. **Token:** https://polygonscan.com/address/0x263Fe9898b8A9bba3E08403cC9054dCa39a11636#readContract
2. Chame `balanceOf(address)` com cada endereço:
   - `0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f` → Deve ter 600 FLUXX
   - `0xa387691E594dF109aD9cA83767F39D419CBC6001` → Deve ter 200 FLUXX
   - `0x887b641EF4A1e99022e290dF6Ac9c81eA50AE0CD` → Deve ter 200 FLUXX
   - `0xc8b6C6cF88ecE28EfDede72ed625b95b73Cb649F` → Deve ter 200 FLUXX

---

## 🔗 Link Direto do Safe

https://app.safe.global/apps/open?safe=matic:0xF040BbD411542F09f775E974fA88E16bF7406d26&appUrl=https%3A%2F%2Fapps-portal.safe.global%2Ftx-builder

---

**Status:** ✅ Pronto para transferir  
**Total:** 1.200 FLUXX (600 + 200 + 200 + 200)

