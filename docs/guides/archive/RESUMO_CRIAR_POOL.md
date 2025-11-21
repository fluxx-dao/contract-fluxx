# 🎯 Resumo: Criar Pool de Ignição

## 📊 Status Atual (Conforme Simulação)

```
✅ Safe tem: 20 USDC (suficiente)
❌ Safe tem: 0 FLUXX (precisa de 100)
✅ Safe tem: POL para gas (suficiente)
```

---

## 🚨 Problema Identificado

A simulação mostrou que você **não pode criar a pool ainda** porque:

1. ❌ Safe não tem FLUXX (tem 0, precisa de 100)
2. ⚠️  Precisa aprovar FLUXX para Position Manager
3. ⚠️  Precisa aprovar USDC para Position Manager

---

## ✅ Solução: 4 Passos Simples

### 1️⃣ Transferir 100 FLUXX para Safe

**Opção A: Se tem FLUXX em outra wallet**
- Transfira diretamente para a Safe

**Opção B: Se FLUXX está no Treasury**
- Use `withdrawTokensByOwner` na Safe
- ⚠️ Tem timelock de 2 dias

### 2️⃣ Aprovar FLUXX

```
To: 0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
Function: approve(address,uint256)
- spender: 0xC36442b4a4522E871399CD717aBDD847Ab11FE88
- amount: 100000000000000000000
```

### 3️⃣ Aprovar USDC

```
To: 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174
Function: approve(address,uint256)
- spender: 0xC36442b4a4522E871399CD717aBDD847Ab11FE88
- amount: 10000000
```

### 4️⃣ Criar Pool no Uniswap

- Use a interface: https://app.uniswap.org/
- Conecte a Safe via WalletConnect
- Configure: 100 FLUXX + 10 USDC
- Preço: 0.10 USDC por FLUXX

---

## 🔄 Verificar Antes de Cada Passo

Execute sempre antes de criar transações na Safe:

```bash
npx hardhat run scripts/simulatePoolCreation.js --network polygon
```

Isso vai mostrar se está tudo certo!

---

## 📋 Checklist Rápido

- [ ] Safe tem 100 FLUXX
- [ ] FLUXX aprovado para Position Manager
- [ ] USDC aprovado para Position Manager
- [ ] Pool criada no Uniswap

---

## 🎯 Próximo Passo Agora

**1. Transferir 100 FLUXX para Safe**

Depois disso, execute novamente:
```bash
npx hardhat run scripts/simulatePoolCreation.js --network polygon
```

Deve mostrar: `✅ Saldo FLUXX suficiente`

---

**Guia completo:** `docs/guides/CRIAR_POOL_PASSO_A_PASSO.md`

