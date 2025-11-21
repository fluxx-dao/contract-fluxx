# 🚀 Executar Pool - Manual (Sem JSON)

## ✅ Tokens Estão na Safe!

**Confirmado via PolygonScan:** Safe tem 100 FLUXX ✅

**Problema:** Interface não mostra (problema visual, não real)

**Solução:** Executar manualmente, configurando gas corretamente

---

## 📋 Transação 1: Approve FLUXX

1. **New Transaction** → **Contract Interaction**
2. **To:** `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`
3. **Function:** `approve`
4. **Parâmetros:**
   - `spender`: `0xC36442b4a4522E871399CD717aBDD847Ab11FE88`
   - `amount`: `50000000000000000000`
5. **Advanced (Gas):**
   - **Safe Tx Gas:** `100000`
   - **Base Gas:** `21000`
6. **Executar**

---

## 📋 Transação 2: Approve USDC

1. **New Transaction** → **Contract Interaction**
2. **To:** `0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174`
3. **Function:** `approve`
4. **Parâmetros:**
   - `spender`: `0xC36442b4a4522E871399CD717aBDD847Ab11FE88`
   - `amount`: `5000000`
5. **Advanced (Gas):**
   - **Safe Tx Gas:** `100000`
   - **Base Gas:** `21000`
6. **Executar**

---

## 📋 Transação 3: Create Pool

1. **New Transaction** → **Contract Interaction**
2. **To:** `0xC36442b4a4522E871399CD717aBDD847Ab11FE88`
3. **Function:** `createAndInitializePoolIfNecessary`
4. **Parâmetros:**
   - `tokenA`: `0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174`
   - `tokenB`: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`
   - `fee`: `3000`
   - `sqrtPriceX96`: `20159919553`
5. **Advanced (Gas):**
   - **Safe Tx Gas:** `500000`
   - **Base Gas:** `21000`
6. **Executar**

---

## 📋 Transação 4: Mint (Add Liquidity)

1. **New Transaction** → **Contract Interaction**
2. **To:** `0xC36442b4a4522E871399CD717aBDD847Ab11FE88`
3. **Function:** `mint`
4. **Parâmetros (tuple):**
   ```
   token0: 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174
   token1: 0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
   fee: 3000
   tickLower: -887220
   tickUpper: 887220
   amount0Desired: 5000000
   amount1Desired: 50000000000000000000
   amount0Min: 0
   amount1Min: 0
   recipient: 0xF040BbD411542F09f775E974fA88E16bF7406d26
   deadline: 1763714705
   ```
5. **Advanced (Gas):**
   - **Safe Tx Gas:** `800000`
   - **Base Gas:** `21000`
6. **Executar**

---

## ⚠️ IMPORTANTE

**Os tokens ESTÃO na Safe (100 FLUXX)!**

- PolygonScan confirma: 100 FLUXX ✅
- Interface não mostra: Problema visual (ignorar)
- Transação vai funcionar: Contrato vê on-chain

**Configure gas manualmente** em cada transação (Safe L2 requer).

---

## 🎯 Por Que Manual?

1. **JSON não suporta gas** no formato que Safe L2 precisa
2. **Configurar manualmente** garante gas correto
3. **Uma por vez** ajuda a identificar problemas

---

**Execute uma transação por vez, configurando gas em cada uma!**

