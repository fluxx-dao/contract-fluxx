# 🎯 Criar Pool de Ignição - Passo a Passo Prático

## 📊 Status Atual (Conforme Simulação)

✅ **Safe tem:** 20 USDC (suficiente)  
❌ **Safe tem:** 0 FLUXX (precisa de 100)  
✅ **Safe tem:** POL para gas (suficiente)

---

## 📋 Checklist Completo

Antes de criar a pool, você precisa:

- [ ] **1. Transferir 100 FLUXX para a Safe**
- [ ] **2. Aprovar FLUXX para Position Manager**
- [ ] **3. Aprovar USDC para Position Manager**
- [ ] **4. Criar a pool no Uniswap**

---

## 🚀 Passo 1: Transferir 100 FLUXX para a Safe

### Opção A: Se você tem FLUXX em outra wallet

1. Acesse: https://app.safe.global/
2. Conecte a wallet que tem FLUXX
3. Rede: **Polygon**
4. Safe: `0xF040BbD411542F09f775E974fA88E16bF7406d26`
5. Clique em **"New Transaction"**
6. Configure:
   - **To:** `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (Token FLUXX)
   - **Function:** `transfer(address to, uint256 amount)`
   - **Parâmetros:**
     - `to`: `0xF040BbD411542F09f775E974fA88E16bF7406d26` (a própria Safe)
     - `amount`: `100000000000000000000` (100 FLUXX em wei)
7. Assine e execute

### Opção B: Se FLUXX está no Treasury

1. Acesse: https://app.safe.global/
2. Conecte sua wallet (signatário do Safe)
3. Rede: **Polygon**
4. Safe: `0xF040BbD411542F09f775E974fA88E16bF7406d26`
5. Clique em **"New Transaction"**
6. Configure:
   - **To:** `0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93` (Treasury)
   - **Function:** `withdrawTokensByOwner(address token, address to, uint256 amount)`
   - **Parâmetros:**
     - `token`: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (Token FLUXX)
     - `to`: `0xF040BbD411542F09f775E974fA88E16bF7406d26` (a própria Safe)
     - `amount`: `100000000000000000000` (100 FLUXX em wei)
7. ⚠️ **Atenção:** Esta transação tem timelock de 2 dias!
8. Assine e execute

**Depois de transferir, verifique:**
```bash
npx hardhat run scripts/simulatePoolCreation.js --network polygon
```

Deve mostrar: `✅ Saldo FLUXX suficiente`

---

## ✅ Passo 2: Aprovar FLUXX para Position Manager

**Por quê?** O Uniswap precisa de permissão para usar seus FLUXX.

1. Acesse: https://app.safe.global/
2. Conecte sua wallet (signatário do Safe)
3. Rede: **Polygon**
4. Safe: `0xF040BbD411542F09f775E974fA88E16bF7406d26`
5. Clique em **"New Transaction"**
6. Configure:
   - **To:** `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (Token FLUXX)
   - **Function:** `approve(address spender, uint256 amount)`
   - **Parâmetros:**
     - `spender`: `0xC36442b4a4522E871399CD717aBDD847Ab11FE88` (Uniswap Position Manager)
     - `amount`: `100000000000000000000` (100 FLUXX em wei)
7. Assine e execute

**💡 Dica:** Você pode aprovar mais do que precisa (ex: 1000 FLUXX) para não precisar aprovar de novo no futuro.

---

## ✅ Passo 3: Aprovar USDC para Position Manager

**Por quê?** O Uniswap precisa de permissão para usar seus USDC.

1. Acesse: https://app.safe.global/
2. Conecte sua wallet (signatário do Safe)
3. Rede: **Polygon**
4. Safe: `0xF040BbD411542F09f775E974fA88E16bF7406d26`
5. Clique em **"New Transaction"**
6. Configure:
   - **To:** `0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174` (USDC Polygon)
   - **Function:** `approve(address spender, uint256 amount)`
   - **Parâmetros:**
     - `spender`: `0xC36442b4a4522E871399CD717aBDD847Ab11FE88` (Uniswap Position Manager)
     - `amount`: `10000000` (10 USDC - USDC tem 6 decimais)
7. Assine e execute

**💡 Dica:** Você pode aprovar mais do que precisa (ex: 100 USDC) para não precisar aprovar de novo no futuro.

---

## 🎯 Passo 4: Criar a Pool no Uniswap

**Método Recomendado:** Usar a interface do Uniswap conectada à Safe.

### 4.1. Conectar Safe ao Uniswap

1. Acesse: https://app.uniswap.org/
2. Clique em **"Connect Wallet"**
3. Selecione **"WalletConnect"**
4. Escaneie o QR code com o app Safe no celular
   - OU use a extensão Safe no navegador (se disponível)
5. Confirme a conexão

### 4.2. Navegar para Criar Pool

1. No Uniswap, clique em **"Pool"** (no menu superior)
2. Clique em **"New Position"** ou **"Create Pool"**

### 4.3. Configurar a Pool

**Selecione os tokens:**

- **Token 0:** USDC (Polygon)
  - Deve aparecer automaticamente
  - Se não aparecer, adicione: `0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174`
- **Token 1:** FLUXX
  - Adicione manualmente: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`
  - Nome: FLUXX
  - Símbolo: FLUXX
  - Decimais: 18

**Configure a pool:**

- **Fee Tier:** `0.30%` (3000)
- **Range:** `Full Range` (∞ a ∞)
- **Preço Inicial:** `0.10 USDC por FLUXX`
  - Ou: `0.10` (preço em USDC por FLUXX)

**Adicione liquidez:**

- **USDC:** `10 USDC`
- **FLUXX:** `100 FLUXX`

### 4.4. Revisar e Confirmar

Antes de confirmar, verifique:

- ✅ Preço está correto: **0.10 USDC por FLUXX**
- ✅ Quantidades corretas: **10 USDC + 100 FLUXX**
- ✅ Range: **Full Range**
- ✅ Fee: **0.30%**

### 4.5. Executar

1. Clique em **"Create Pool"** ou **"Add Liquidity"**
2. A transação será criada na Safe
3. Aguarde aprovações dos signatários
4. Execute quando tiver aprovações suficientes
5. ✅ **Pool criada!**

---

## 🔍 Verificação Pós-Criação

Após criar a pool, verifique:

1. **Pool criada no Uniswap:**

   - Acesse: https://app.uniswap.org/pools
   - Verifique que o par FLUXX/USDC aparece
   - Verifique o preço: **0.10 USDC por FLUXX**

2. **Token LP recebido:**

   - Verifique na Safe
   - Você deve ter recebido um NFT de posição (Uniswap v3 usa NFTs para LP)
   - O NFT estará na Safe: `0xF040BbD411542F09f775E974fA88E16bF7406d26`

3. **Agregadores:**

   - Aguarde alguns minutos
   - FLUXX deve aparecer em agregadores e wallets

---

## ⚠️ Troubleshooting

### Erro: "Insufficient balance"

**Causa:** Safe não tem tokens suficientes.

**Solução:**

1. Verifique saldos na Safe
2. Transfira tokens necessários
3. Execute: `npx hardhat run scripts/simulatePoolCreation.js --network polygon`

### Erro: "Allowance too low"

**Causa:** Não aprovou tokens para Position Manager.

**Solução:**

1. Execute os Passos 2 e 3 (approve)
2. Verifique se as aprovações foram bem-sucedidas

### Erro: GS013 na Safe

**Causa:** Transação interna falhou.

**Solução:**
1. Use o Tenderly para debugar: https://dashboard.tenderly.co/
2. Execute: `TX_HASH=0x... npx hardhat run scripts/debugSafeTransaction.js --network polygon`
3. Veja o guia: `docs/guides/RESOLVER_ERRO_GS013.md`

---

## 📊 Resumo das Transações Necessárias

| # | Transação | To | Function | Status |
|---|-----------|----|---------|--------|
| 1 | Transferir FLUXX | Token FLUXX | `transfer` | ⏳ Pendente |
| 2 | Aprovar FLUXX | Token FLUXX | `approve` | ⏳ Pendente |
| 3 | Aprovar USDC | USDC | `approve` | ⏳ Pendente |
| 4 | Criar Pool | Uniswap | Via Interface | ⏳ Pendente |

---

## 🎯 Ordem de Execução

1. ✅ **Primeiro:** Transferir 100 FLUXX para Safe
2. ✅ **Segundo:** Aprovar FLUXX (pode fazer junto com USDC)
3. ✅ **Terceiro:** Aprovar USDC (pode fazer junto com FLUXX)
4. ✅ **Quarto:** Criar pool no Uniswap

**💡 Dica:** Você pode criar as transações 2 e 3 juntas na Safe (batch) para economizar gas.

---

## 📚 Documentação Relacionada

- **Guia completo:** `docs/deployment/POOL_IGNICAO.md`
- **Resolver erro GS013:** `docs/guides/RESOLVER_ERRO_GS013.md`
- **Simular antes:** `scripts/simulatePoolCreation.js`
- **Debug transações:** `scripts/debugSafeTransaction.js`

---

**Status:** Aguardando transferência de 100 FLUXX para Safe  
**Próximo passo:** Executar Passo 1 (Transferir FLUXX)

