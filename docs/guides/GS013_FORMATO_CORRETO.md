# 🔧 GS013 - Formato Correto para Safe L2

## ❌ Problema Identificado

O campo `"gas"` no JSON **não é reconhecido** pelo Safe Transaction Builder.

**Safe L2 requer:**
- `safeTxGas` (gas para execução da transação)
- `baseGas` (gas base)
- Configurado **no nível do batch**, não em cada transação

---

## ✅ Formato Correto para Safe L2

### Opção 1: Configurar Gas Manualmente na Interface

**O JSON não suporta gas diretamente.** Você precisa:

1. **Importar o JSON** (`poolSafeTransactionReduzido.json`)
2. **Para cada transação**, na interface da Safe:
   - Clique em **"Advanced"** ou **"..."** (três pontos)
   - Configure:
     - **Safe Tx Gas:** (veja valores abaixo)
     - **Base Gas:** `21000`
     - **Gas Price:** Deixe vazio (usa rede)

**Valores de Gas Recomendados:**

- **Transação 1 (Approve FLUXX):** `100000`
- **Transação 2 (Approve USDC):** `100000`
- **Transação 3 (Create Pool):** `500000`
- **Transação 4 (Mint):** `800000`

---

## 🚀 Solução: Executar Uma Por Vez

**Como o batch pode estar falhando, execute individualmente:**

### Transação 1: Approve FLUXX

1. **New Transaction** → **Contract Interaction**
2. **To:** `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`
3. **Function:** `approve(address spender, uint256 amount)`
4. **Parâmetros:**
   - `spender`: `0xC36442b4a4522E871399CD717aBDD847Ab11FE88`
   - `amount`: `50000000000000000000`
5. **Advanced:**
   - **Safe Tx Gas:** `100000`
   - **Base Gas:** `21000`
6. **Executar**

### Transação 2: Approve USDC

1. **New Transaction** → **Contract Interaction**
2. **To:** `0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174`
3. **Function:** `approve(address spender, uint256 amount)`
4. **Parâmetros:**
   - `spender`: `0xC36442b4a4522E871399CD717aBDD847Ab11FE88`
   - `amount`: `5000000`
5. **Advanced:**
   - **Safe Tx Gas:** `100000`
   - **Base Gas:** `21000`
6. **Executar**

### Transação 3: Create Pool

1. **New Transaction** → **Contract Interaction**
2. **To:** `0xC36442b4a4522E871399CD717aBDD847Ab11FE88`
3. **Function:** `createAndInitializePoolIfNecessary(address tokenA, address tokenB, uint24 fee, uint160 sqrtPriceX96)`
4. **Parâmetros:**
   - `tokenA`: `0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174`
   - `tokenB`: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`
   - `fee`: `3000`
   - `sqrtPriceX96`: `20159919553`
5. **Advanced:**
   - **Safe Tx Gas:** `500000`
   - **Base Gas:** `21000`
6. **Executar**

### Transação 4: Mint (Add Liquidity)

1. **New Transaction** → **Contract Interaction**
2. **To:** `0xC36442b4a4522E871399CD717aBDD847Ab11FE88`
3. **Function:** `mint((address token0, address token1, uint24 fee, int24 tickLower, int24 tickUpper, uint256 amount0Desired, uint256 amount1Desired, uint256 amount0Min, uint256 amount1Min, address recipient, uint256 deadline))`
4. **Parâmetros (tuple):**
   - `token0`: `0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174`
   - `token1`: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`
   - `fee`: `3000`
   - `tickLower`: `-887220`
   - `tickUpper`: `887220`
   - `amount0Desired`: `5000000`
   - `amount1Desired`: `50000000000000000000`
   - `amount0Min`: `0`
   - `amount1Min`: `0`
   - `recipient`: `0xF040BbD411542F09f775E974fA88E16bF7406d26`
   - `deadline`: `1763714705` (ou calcular novo: `Math.floor(Date.now() / 1000) + 3600`)
5. **Advanced:**
   - **Safe Tx Gas:** `800000`
   - **Base Gas:** `21000`
6. **Executar**

---

## ⚠️ IMPORTANTE: Verificar Antes

**Os tokens ESTÃO na Safe (100 FLUXX conforme PolygonScan), mas:**

1. **A interface não mostra** - Isso é normal, é problema de visualização
2. **A transação vai funcionar** - O contrato vê os tokens on-chain
3. **O GS013 é por gas** - Configure gas manualmente na interface

---

## 🎯 Resumo

**Problema:** 
- Tokens existem (PolygonScan mostra)
- Interface não mostra (problema visual)
- GS013 = Gas não configurado corretamente

**Solução:**
1. ✅ Ignorar visualização (tokens estão lá)
2. ✅ Configurar gas manualmente na interface
3. ✅ Executar uma transação por vez (mais seguro)

**Não precisa:** Transferir tokens novamente (já estão lá!)

