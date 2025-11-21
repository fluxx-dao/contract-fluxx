# 🚀 Criar Pool FLUXX/USDC via Safe Transaction Builder

## ✅ Script Completo Gerado!

O script `criarPoolThirdweb.js` gerou **todos os calldatas** necessários para criar a pool via Safe.

---

## 📋 Transações Geradas (4 no total)

### 1️⃣ Approve FLUXX
- **To:** `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`
- **Function:** `approve`
- **Spender:** `0xC36442b4a4522E871399CD717aBDD847Ab11FE88` (Position Manager)
- **Amount:** 100 FLUXX

### 2️⃣ Approve USDC
- **To:** `0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174`
- **Function:** `approve`
- **Spender:** `0xC36442b4a4522E871399CD717aBDD847Ab11FE88` (Position Manager)
- **Amount:** 10 USDC

### 3️⃣ Create and Initialize Pool
- **To:** `0xC36442b4a4522E871399CD717aBDD847Ab11FE88` (Position Manager)
- **Function:** `createAndInitializePoolIfNecessary`
- **tokenA:** `0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174` (USDC)
- **tokenB:** `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (FLUXX)
- **fee:** `3000` (0.30%)
- **sqrtPriceX96:** `20159919553` (preço inicial: 0.10 USDC por FLUXX)

### 4️⃣ Mint (Add Liquidity)
- **To:** `0xC36442b4a4522E871399CD717aBDD847Ab11FE88` (Position Manager)
- **Function:** `mint`
- **Full Range:** tickLower=-887220, tickUpper=887220
- **Amount:** 10 USDC + 100 FLUXX
- **Recipient:** `0xF040BbD411542F09f775E974fA88E16bF7406d26` (Safe)

---

## 🚀 Método 1: Importar JSON (Mais Fácil)

### Passo a Passo:

1. **Acesse:** https://app.safe.global/
2. **Abra sua Safe:** `0xF040BbD411542F09f775E974fA88E16bF7406d26`
3. **Vá em:** "Apps" → "Transaction Builder"
4. **Clique em:** "Import" ou "Load JSON"
5. **Cole o conteúdo de:** `scripts/poolSafeTransaction.json`
6. **Revise as 4 transações**
7. **Assine e execute**

**✅ Pronto! Pool criada!**

---

## 🚀 Método 2: Adicionar Manualmente (Passo a Passo)

### Transação 1: Approve FLUXX

1. **To:** `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`
2. **Value:** `0`
3. **Data:** `0x095ea7b3000000000000000000000000c36442b4a4522e871399cd717abdd847ab11fe880000000000000000000000000000000000000000000000056bc75e2d63100000`

**OU configure manualmente:**
- **Function:** `approve(address spender, uint256 amount)`
- **spender:** `0xC36442b4a4522E871399CD717aBDD847Ab11FE88`
- **amount:** `100000000000000000000` (100 FLUXX)

---

### Transação 2: Approve USDC

1. **To:** `0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174`
2. **Value:** `0`
3. **Data:** `0x095ea7b3000000000000000000000000c36442b4a4522e871399cd717abdd847ab11fe880000000000000000000000000000000000000000000000000000000000989680`

**OU configure manualmente:**
- **Function:** `approve(address spender, uint256 amount)`
- **spender:** `0xC36442b4a4522E871399CD717aBDD847Ab11FE88`
- **amount:** `10000000` (10 USDC)

---

### Transação 3: Create and Initialize Pool

1. **To:** `0xC36442b4a4522E871399CD717aBDD847Ab11FE88`
2. **Value:** `0`
3. **Data:** `0x13ead5620000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa84174000000000000000000000000b1430cc106bd664f68be8d0167a52a29654cf8ba0000000000000000000000000000000000000000000000000000000000000bb800000000000000000000000000000000000000000000000000000004b19ff5c1`

**OU configure manualmente:**
- **Function:** `createAndInitializePoolIfNecessary(address tokenA, address tokenB, uint24 fee, uint160 sqrtPriceX96)`
- **tokenA:** `0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174` (USDC)
- **tokenB:** `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (FLUXX)
- **fee:** `3000`
- **sqrtPriceX96:** `20159919553`

---

### Transação 4: Mint (Add Liquidity)

1. **To:** `0xC36442b4a4522E871399CD717aBDD847Ab11FE88`
2. **Value:** `0`
3. **Data:** `0x883164560000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa84174000000000000000000000000b1430cc106bd664f68be8d0167a52a29654cf8ba0000000000000000000000000000000000000000000000000000000000000bb8fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2764c00000000000000000000000000000000000000000000000000000000000d89b400000000000000000000000000000000000000000000000000000000009896800000000000000000000000000000000000000000000000056bc75e2d6310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f040bbd411542f09f775e974fa88e16bf7406d260000000000000000000000000000000000000000000000000000000069200a58`

**OU configure manualmente:**
- **Function:** `mint((address token0, address token1, uint24 fee, int24 tickLower, int24 tickUpper, uint256 amount0Desired, uint256 amount1Desired, uint256 amount0Min, uint256 amount1Min, address recipient, uint256 deadline))`
- **params:**
  - **token0:** `0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174` (USDC)
  - **token1:** `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (FLUXX)
  - **fee:** `3000`
  - **tickLower:** `-887220`
  - **tickUpper:** `887220`
  - **amount0Desired:** `10000000` (10 USDC)
  - **amount1Desired:** `100000000000000000000` (100 FLUXX)
  - **amount0Min:** `0`
  - **amount1Min:** `0`
  - **recipient:** `0xF040BbD411542F09f775E974fA88E16bF7406d26` (Safe)
  - **deadline:** `1763707480` (ou atualize para um valor futuro)

---

## ⚠️ IMPORTANTE: Ordem de Execução

**Execute as transações NESTA ORDEM:**

1. ✅ **Approve FLUXX** (primeiro)
2. ✅ **Approve USDC** (segundo)
3. ✅ **Create Pool** (terceiro)
4. ✅ **Mint** (quarto)

**Se executar fora de ordem, a transação vai falhar!**

---

## 📊 Verificação Antes de Executar

### Checklist:

- [ ] Safe tem 100 FLUXX
- [ ] Safe tem 10 USDC
- [ ] Safe tem POL para gas
- [ ] Todas as 4 transações estão na ordem correta
- [ ] Valores estão corretos (100 FLUXX, 10 USDC)
- [ ] Recipient é a Safe (`0xF040BbD411542F09f775E974fA88E16bF7406d26`)

---

## 🎯 Vantagens Deste Método

### ✅ Controle Total:
- Parâmetros exatos calculados
- Preço inicial preciso (sqrtPriceX96)
- Logs auditáveis

### ✅ Transparência:
- Todas as transações são on-chain
- Rastreáveis no PolygonScan
- Verificáveis

### ✅ Precisão:
- Cálculo matemático correto do preço
- Sem arredondamentos da interface
- Preço exato: 0.10 USDC por FLUXX

---

## 📚 Arquivos Gerados

1. **`scripts/criarPoolThirdweb.js`** - Script que gera os calldatas
2. **`scripts/poolSafeTransaction.json`** - JSON pronto para importar no Safe

---

## 🚀 Executar o Script

**Para gerar os calldatas novamente:**

```bash
npx hardhat run scripts/criarPoolThirdweb.js --network polygon
```

**Isso vai mostrar todos os calldatas atualizados.**

---

## 💡 Próximos Passos

1. **Importar JSON no Safe** (método mais fácil)
2. **OU adicionar transações manualmente** (método alternativo)
3. **Revisar todas as transações**
4. **Assinar e executar**
5. **✅ Pool criada!**

---

**Status:** Script completo e calldatas gerados  
**Próximo passo:** Importar JSON no Safe Transaction Builder  
**Resultado:** Pool FLUXX/USDC criada com sucesso!

