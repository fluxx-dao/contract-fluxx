# 🚀 Executar Pool - Versão Corrigida (GS013 Resolvido)

## ✅ Problemas Corrigidos

1. ✅ **Deadline atualizado** (não expirado)
2. ✅ **Gas configurado** (Safe L2 requer)
3. ✅ **Calldata atualizado** (com novo deadline)

---

## 📁 Arquivo Correto

**USE ESTE:** `scripts/poolSafeTransactionReduzidoComGas.json`

**NÃO USE:** `poolSafeTransactionReduzido.json` (deadline expirado, sem gas)

---

## 🚀 Passo a Passo

### 1. Verificar Pré-requisitos

**Antes de executar, verifique:**

- [ ] **50+ FLUXX na Safe**
- [ ] **5+ USDC na Safe**
- [ ] **POL suficiente** (1-2 POL)

**Se não tiver FLUXX:**
- Use `transferirTokensParaPool.json` primeiro

### 2. Importar JSON Corrigido

1. Acesse: https://app.safe.global/
2. Safe: `0xF040BbD411542F09f775E974fA88E16bF7406d26`
3. **Apps** → **Transaction Builder**
4. **Import** → Cole `scripts/poolSafeTransactionReduzidoComGas.json`

### 3. Verificar Gas

Cada transação deve ter `gas` configurado:

- **Transação 1:** `100000` (Approve FLUXX)
- **Transação 2:** `100000` (Approve USDC)
- **Transação 3:** `500000` (Create Pool)
- **Transação 4:** `800000` (Mint)

**Se não aparecer gas:**
- Configure manualmente em "Advanced" de cada transação

### 4. Executar

1. Revise as 4 transações
2. **Create Batch**
3. **Assinar** (se necessário)
4. **Executar**

---

## ⚠️ Se Ainda Der GS013

### Debug Rápido

1. **Execute uma transação por vez:**
   - Apenas Transação 1 (Approve FLUXX)
   - Se funcionar, continue
   - Se falhar, veja erro específico

2. **Verifique saldos:**
   ```bash
   # FLUXX na Safe
   # USDC na Safe
   ```

3. **Verifique gas:**
   - Cada transação tem gas configurado?
   - Valores são suficientes?

---

## 📊 O Que Vai Acontecer

1. ✅ Approve FLUXX (50 FLUXX)
2. ✅ Approve USDC (5 USDC)
3. ✅ Create Pool (cria pool no Uniswap)
4. ✅ Mint (adiciona liquidez)

**Resultado:** Pool FLUXX/USDC criada! 🎉

---

## 🔍 Verificar Depois

- Pool: https://app.uniswap.org/pools
- NFT: Assets → NFTs na Safe

---

**Arquivo:** `scripts/poolSafeTransactionReduzidoComGas.json` ✅

