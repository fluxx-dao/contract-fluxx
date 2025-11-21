# 💼 Criar Pool com Wallet Pessoal (Alternativa)

## 🎯 Por Que Esta Alternativa?

Se não conseguir conectar a Safe ao Uniswap, você pode:
1. Transferir tokens da Safe para sua wallet pessoal
2. Criar a pool com sua wallet pessoal
3. Transferir o NFT de posição de volta para a Safe

---

## 📋 Pré-requisitos

- ✅ Wallet pessoal (MetaMask, etc.) conectada à Polygon
- ✅ POL na wallet pessoal para gas
- ✅ Acesso à Safe para transferir tokens

---

## 🚀 Passo a Passo Completo

### Passo 1: Transferir Tokens da Safe para Wallet Pessoal

**Você precisa transferir:**
- 100 FLUXX
- 10 USDC

#### 1.1. Transferir 100 FLUXX

1. **Acesse:** https://app.safe.global/
2. **Conecte sua wallet** (signatária da Safe)
3. **Rede:** Polygon
4. **Safe:** `0xF040BbD411542F09f775E974fA88E16bF7406d26`
5. **Clique em:** "New Transaction"
6. **Configure:**
   - **To:** `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (Token FLUXX)
   - **Function:** `transfer(address to, uint256 amount)`
   - **Parâmetros:**
     - `to`: `SEU_ENDEREÇO_WALLET_PESSOAL` (coloque seu endereço)
     - `amount`: `100000000000000000000` (100 FLUXX em wei)
7. **Assine e execute**

#### 1.2. Transferir 10 USDC

1. **Na mesma Safe**, crie nova transação:
   - **To:** `0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174` (USDC Polygon)
   - **Function:** `transfer(address to, uint256 amount)`
   - **Parâmetros:**
     - `to`: `SEU_ENDEREÇO_WALLET_PESSOAL` (coloque seu endereço)
     - `amount`: `10000000` (10 USDC - USDC tem 6 decimais)
2. **Assine e execute**

**⏳ Aguarde as transações serem executadas!**

---

### Passo 2: Verificar Tokens na Wallet Pessoal

1. **Abra sua wallet** (MetaMask, etc.)
2. **Rede:** Polygon
3. **Verifique se tem:**
   - ✅ 100 FLUXX
   - ✅ 10 USDC
   - ✅ POL para gas

**Se não aparecer:**
- Adicione os tokens manualmente:
  - FLUXX: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`
  - USDC: `0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174`

---

### Passo 3: Aprovar Tokens na Wallet Pessoal

**Você precisa aprovar FLUXX e USDC para o Uniswap Position Manager.**

#### 3.1. Aprovar FLUXX

1. **Acesse:** https://app.uniswap.org/
2. **Conecte sua wallet pessoal** (MetaMask, etc.)
3. **Vá em:** Pool → New Position
4. **Selecione os tokens:**
   - Token 0: USDC
   - Token 1: FLUXX (`0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`)
5. **Quando pedir aprovação de FLUXX:**
   - Clique em "Approve FLUXX"
   - Confirme na wallet
   - Aguarde confirmação

#### 3.2. Aprovar USDC

1. **Quando pedir aprovação de USDC:**
   - Clique em "Approve USDC"
   - Confirme na wallet
   - Aguarde confirmação

**💡 Dica:** O Uniswap vai pedir as aprovações automaticamente quando você tentar criar a pool.

---

### Passo 4: Criar Pool no Uniswap

1. **No Uniswap**, configure a pool:
   - **Token 0:** USDC (Polygon)
   - **Token 1:** FLUXX (`0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`)
   - **Fee Tier:** `0.30%` (3000)
   - **Range:** `Full Range` (∞ a ∞)
   - **Preço Inicial:** `0.10 USDC por FLUXX`
   - **Amount:**
     - 10 USDC
     - 100 FLUXX

2. **Revise:**
   - ✅ Preço: 0.10 USDC por FLUXX
   - ✅ Quantidades: 10 USDC + 100 FLUXX
   - ✅ Range: Full Range
   - ✅ Fee: 0.30%

3. **Clique em:** "Create Pool" ou "Add Liquidity"

4. **Confirme na wallet:**
   - Revise a transação
   - Confirme
   - Aguarde confirmação

5. **✅ Pool criada!**
   - Você receberá um NFT de posição (Uniswap v3 usa NFTs)

---

### Passo 5: Transferir NFT de Posição para Safe

**Agora você precisa transferir o NFT de volta para a Safe.**

#### 5.1. Encontrar o NFT

1. **No Uniswap**, vá em "Pool" → "Your Positions"
2. **Você deve ver sua posição** (100 FLUXX + 10 USDC)
3. **Anote o Token ID do NFT** (número único)

#### 5.2. Transferir NFT para Safe

1. **Acesse:** https://app.safe.global/
2. **Crie nova transação:**
   - **To:** `0xC36442b4a4522E871399CD717aBDD847Ab11FE88` (Uniswap Position Manager)
   - **Function:** `safeTransferFrom(address from, address to, uint256 tokenId)`
   - **Parâmetros:**
     - `from`: `SEU_ENDEREÇO_WALLET_PESSOAL`
     - `to`: `0xF040BbD411542F09f775E974fA88E16bF7406d26` (Safe)
     - `tokenId`: `TOKEN_ID_DO_NFT` (número que você anotou)

**OU** use a interface do Uniswap:

1. **No Uniswap**, vá em "Your Positions"
2. **Clique na sua posição**
3. **Procure por:** "Transfer" ou "Send"
4. **Envie para:** `0xF040BbD411542F09f775E974fA88E16bF7406d26` (Safe)

---

## 📊 Resumo do Processo

```
1. Safe → Transferir 100 FLUXX para wallet pessoal
2. Safe → Transferir 10 USDC para wallet pessoal
3. Wallet pessoal → Conectar ao Uniswap
4. Uniswap → Aprovar FLUXX
5. Uniswap → Aprovar USDC
6. Uniswap → Criar pool
7. Uniswap → Transferir NFT para Safe
```

---

## ⚠️ Considerações Importantes

### Vantagens:
- ✅ Mais simples (não precisa conectar Safe)
- ✅ Interface do Uniswap funciona normalmente
- ✅ Você tem controle total durante a criação

### Desvantagens:
- ⚠️ Precisa transferir tokens da Safe (2 transações)
- ⚠️ Precisa transferir NFT de volta (1 transação)
- ⚠️ Mais transações = mais gas
- ⚠️ Tokens ficam temporariamente na wallet pessoal

---

## 💰 Custo Estimado de Gas

- Transferir FLUXX da Safe: ~0.01 POL
- Transferir USDC da Safe: ~0.01 POL
- Aprovar FLUXX: ~0.01 POL
- Aprovar USDC: ~0.01 POL
- Criar pool: ~0.05 POL
- Transferir NFT para Safe: ~0.01 POL

**Total estimado:** ~0.10 POL

---

## ✅ Checklist

- [ ] Transferir 100 FLUXX da Safe para wallet pessoal
- [ ] Transferir 10 USDC da Safe para wallet pessoal
- [ ] Verificar tokens na wallet pessoal
- [ ] Conectar wallet pessoal ao Uniswap
- [ ] Aprovar FLUXX no Uniswap
- [ ] Aprovar USDC no Uniswap
- [ ] Criar pool no Uniswap
- [ ] Anotar Token ID do NFT
- [ ] Transferir NFT para Safe

---

## 🎯 Próximo Passo

**Comece transferindo os tokens da Safe para sua wallet pessoal!**

1. Acesse: https://app.safe.global/
2. Crie transação para transferir 100 FLUXX
3. Crie transação para transferir 10 USDC
4. Aguarde execução
5. Depois conecte wallet pessoal ao Uniswap

---

**Status:** Usando método alternativo  
**Próximo passo:** Transferir tokens da Safe para wallet pessoal  
**Guia completo:** Este documento

