# 🎯 Criar Pool com Wallet Pessoal - Passo a Passo Completo

## ✅ Situação Atual

Você tem os tokens na sua wallet pessoal:

- **Wallet:** `0x3242FcE40be49b25DDBb86a7119E55De54b99d57`
- **Tokens:** 10 USDC + (precisa verificar se tem 100 FLUXX também)

---

## 🎯 Sobre Tenderly

**Tenderly não cria pools diretamente.**

O que a Tenderly faz:

- ✅ Simula transações (ver se vai funcionar)
- ✅ Monitora contratos
- ✅ Debug de transações
- ❌ **NÃO** cria pools na blockchain

**Mas podemos usar Tenderly para:**

1. Simular a criação da pool ANTES de executar
2. Verificar se vai funcionar
3. Depois executar no Uniswap

---

## 🚀 Criar Pool no Uniswap (Método Direto)

### Passo 1: Verificar Tokens na Wallet

**Verifique se você tem:**

- ✅ 100 FLUXX na wallet `0x3242FcE40be49b25DDBb86a7119E55De54b99d57`
- ✅ 10 USDC na wallet

**Se não tiver FLUXX:**

- Precisa transferir 100 FLUXX da Safe para esta wallet

### Passo 2: Conectar Wallet ao Uniswap

1. **Acesse:** https://app.uniswap.org/
2. **Clique em:** "Connect Wallet" (canto superior direito)
3. **Selecione sua wallet** (MetaMask, WalletConnect, etc.)
4. **Rede:** Polygon (certifique-se de estar na Polygon!)

### Passo 3: Navegar para Criar Pool

1. **No Uniswap**, clique em **"Pool"** (menu superior)
2. **Clique em:** "New Position" ou "Create Pool"

### Passo 4: Adicionar Token FLUXX

**Se FLUXX não aparecer automaticamente:**

1. **Token 0:** USDC (deve aparecer automaticamente)
2. **Token 1:** Clique em "Select a token"
3. **Cole o endereço:** `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`
4. **Adicione como token customizado:**
   - Nome: FLUXX
   - Símbolo: FLUXX
   - Decimais: 18

### Passo 5: Configurar a Pool

**Configure:**

- **Fee Tier:** `0.30%` (3000)
- **Range:** `Full Range` (∞ a ∞)
- **Preço Inicial:** `0.10 USDC por FLUXX`
  - Ou digite: `0.10` no campo de preço

### Passo 6: Adicionar Liquidez

**Amount:**

- **USDC:** `10 USDC`
- **FLUXX:** `100 FLUXX`

### Passo 7: Aprovar Tokens

**O Uniswap vai pedir aprovações automaticamente:**

1. **Aprovar FLUXX:**
   - Clique em "Approve FLUXX"
   - Confirme na wallet
   - Aguarde confirmação

2. **Aprovar USDC:**
   - Clique em "Approve USDC"
   - Confirme na wallet
   - Aguarde confirmação

### Passo 8: Criar Pool

1. **Depois das aprovações**, clique em **"Create Pool"** ou **"Add Liquidity"**
2. **Revise:**
   - ✅ Preço: 0.10 USDC por FLUXX
   - ✅ Quantidades: 10 USDC + 100 FLUXX
   - ✅ Range: Full Range
   - ✅ Fee: 0.30%
3. **Confirme na wallet**
4. **Aguarde confirmação**
5. **✅ Pool criada!**

---

## 🧪 Simular com Tenderly Antes (Opcional)

Se quiser simular antes de executar:

### Criar Script de Simulação

```javascript
// scripts/simulateCreatePool.js
const hre = require("hardhat");

async function main() {
  const WALLET = "0x3242FcE40be49b25DDBb86a7119E55De54b99d57";
  const POSITION_MANAGER = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";
  
  // Simular criação da pool
  // (código de simulação)
}
```

**Mas isso é opcional.** Você pode criar direto no Uniswap.

---

## 📋 Checklist Antes de Criar

- [ ] Wallet conectada ao Uniswap
- [ ] Rede: Polygon
- [ ] Wallet tem 100 FLUXX
- [ ] Wallet tem 10 USDC
- [ ] Wallet tem POL para gas
- [ ] Token FLUXX adicionado no Uniswap
- [ ] Configurações corretas (preço, fee, range)

---

## 🎯 Passo a Passo Resumido

1. **Acesse:** https://app.uniswap.org/
2. **Conecte wallet:** `0x3242FcE40be49b25DDBb86a7119E55De54b99d57`
3. **Pool → New Position**
4. **Adicione FLUXX:** `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`
5. **Configure:** 0.30% fee, Full Range, 0.10 preço
6. **Amount:** 10 USDC + 100 FLUXX
7. **Aprove tokens** (se pedir)
8. **Crie a pool**

---

## ⚠️ Importante

**Você precisa ter 100 FLUXX na wallet também!**

Se não tiver:
1. **Na Safe**, transfira 100 FLUXX para: `0x3242FcE40be49b25DDBb86a7119E55De54b99d57`
2. **Depois** crie a pool no Uniswap

---

## 🔍 Verificar Saldo

**Verifique se tem:**
- 100 FLUXX na wallet
- 10 USDC na wallet (já tem ✅)
- POL para gas

**No PolygonScan:**
https://polygonscan.com/address/0x3242FcE40be49b25DDBb86a7119E55De54b99d57

---

## 🎉 Depois de Criar

1. **Pool criada no Uniswap!**
2. **Você receberá um NFT de posição**
3. **Pool estará ativa**
4. **FLUXX estará no mercado!**

---

**Status:** Criando pool com wallet pessoal  
**Próximo passo:** Verificar se tem 100 FLUXX, depois criar no Uniswap  
**Método:** Interface do Uniswap (mais simples)

