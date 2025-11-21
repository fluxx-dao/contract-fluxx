# 📊 Status Atual: Pool FLUXX/USDC

## ✅ O Que Já Está Pronto

1. ✅ **Transações preparadas** (`poolSafeTransactionReduzido.json`)
   - 4 transações prontas para importar na Safe
   - Amounts reduzidos: 50 FLUXX + 5 USDC (para evitar overflow)

2. ✅ **Scripts criados**
   - `criarPoolThirdweb.ts` - Gera calldatas
   - JSON pronto para importar

---

## ❌ O Que Falta

### 1. Transferir Tokens para Safe

**Status atual (verificado via Alchemy):**

- ❌ **FLUXX na Safe:** 0 FLUXX (precisa 50 FLUXX)
- ❌ **USDC na Safe:** 0 USDC (precisa 5 USDC)

### 2. Executar Transações na Safe

Depois de ter os tokens, importar e executar as 4 transações do JSON.

---

## 🚀 Passo a Passo: O Que Fazer Agora

### Passo 1: Transferir 50 FLUXX para Safe

**Opção A: Via Treasury (Recomendado)**

1. Acesse: https://app.safe.global/
2. Safe: `0xF040BbD411542F09f775E974fA88E16bF7406d26`
3. **New Transaction**
4. Configure:
   - **To:** `0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93` (Treasury)
   - **Function:** `withdrawTokensByOwner(address token, address to, uint256 amount)`
   - **Parâmetros:**
     - `token`: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (FLUXX)
     - `to`: `0xF040BbD411542F09f775E974fA88E16bF7406d26` (Safe)
     - `amount`: `50000000000000000000` (50 FLUXX)
5. ⚠️ **Sem timelock** (usa `withdrawTokensByOwner`)

**Opção B: Se tem FLUXX em outra wallet**

1. Acesse: https://app.safe.global/
2. Conecte wallet que tem FLUXX
3. **New Transaction**
4. Configure:
   - **To:** `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (Token FLUXX)
   - **Function:** `transfer(address to, uint256 amount)`
   - **Parâmetros:**
     - `to`: `0xF040BbD411542F09f775E974fA88E16bF7406d26` (Safe)
     - `amount`: `50000000000000000000` (50 FLUXX)

---

### Passo 2: Transferir 5 USDC para Safe

**Opção A: Comprar USDC na Polygon**

1. Use um bridge (ex: https://portal.polygon.technology/polygon/bridge)
2. Ou compre em uma DEX
3. Envie para a Safe: `0xF040BbD411542F09f775E974fA88E16bF7406d26`

**Opção B: Se já tem USDC em outra wallet**

1. Acesse: https://app.safe.global/
2. Conecte wallet que tem USDC
3. **New Transaction**
4. Configure:
   - **To:** `0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174` (USDC Polygon)
   - **Function:** `transfer(address to, uint256 amount)`
   - **Parâmetros:**
     - `to`: `0xF040BbD411542F09f775E974fA88E16bF7406d26` (Safe)
     - `amount`: `5000000` (5 USDC - 6 decimais)

---

### Passo 3: Importar e Executar Transações

1. Acesse: https://app.safe.global/
2. Safe: `0xF040BbD411542F09f775E974fA88E16bF7406d26`
3. **Apps** → **Transaction Builder**
4. **Import** → Cole o conteúdo de `scripts/poolSafeTransactionReduzido.json`
5. Revise as 4 transações:
   - ✅ Approve FLUXX (50 FLUXX)
   - ✅ Approve USDC (5 USDC)
   - ✅ Create Pool
   - ✅ Mint (Add Liquidity)
6. **Assine e execute**

---

## 📋 Checklist Completo

- [ ] **1. Transferir 50 FLUXX para Safe**
- [ ] **2. Transferir 5 USDC para Safe**
- [ ] **3. Verificar saldos na Safe**
- [ ] **4. Importar JSON na Safe Transaction Builder**
- [ ] **5. Revisar 4 transações**
- [ ] **6. Assinar transações**
- [ ] **7. Executar batch**
- [ ] **8. Verificar pool criada no Uniswap**

---

## 📊 Parâmetros da Pool

| Parâmetro | Valor |
|-----------|-------|
| **Token 0** | USDC (`0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174`) |
| **Token 1** | FLUXX (`0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`) |
| **Fee Tier** | 0.30% (3000) |
| **Preço Inicial** | 0.10 USDC por FLUXX |
| **Amount 0** | 5 USDC |
| **Amount 1** | 50 FLUXX |
| **Range** | Full Range (tickLower: -887220, tickUpper: 887220) |
| **Recipient** | Safe (`0xF040BbD411542F09f775E974fA88E16bF7406d26`) |

---

## 🔍 Verificar Depois de Criar

1. **Pool no Uniswap:**
   - https://app.uniswap.org/pools
   - Buscar por FLUXX/USDC

2. **NFT de Posição na Safe:**
   - Assets → NFTs
   - Deve aparecer um NFT Uniswap v3

3. **Preço:**
   - Deve estar em ~0.10 USDC por FLUXX

---

## 📁 Arquivos Relacionados

- `scripts/poolSafeTransactionReduzido.json` - Transações prontas
- `scripts/criarPoolThirdweb.ts` - Script gerador
- `docs/guides/COPIAR_COLAR_CRIAR_POOL.md` - Guia rápido

---

## ⚠️ Importante

- **Amounts reduzidos** para evitar overflow uint128
- **Full Range** para máxima liquidez
- **NFT vai para Safe** (não para wallet pessoal)
- **Preço inicial:** 0.10 USDC por FLUXX

