# 🔥 Criar Pool de IGNIÇÃO - Guia Completo

## 📋 Resumo

Este guia mostra como criar a primeira pool FLUXX/USDC no Uniswap v3 usando o script automatizado.

**Pool de IGNIÇÃO:**
- **Quantidade:** 100 FLUXX + 10 USDC
- **Preço:** 1 FLUXX = 0.10 USDC
- **Fee:** 0.30%
- **Range:** Full Range
- **Carteira:** `0x3242FcE40be49b25DDBb86a7119E55De54b99d57`

---

## ⚠️ Pré-requisitos

### 1. Tokens na Carteira

A carteira `0x3242FcE40be49b25DDBb86a7119E55De54b99d57` deve ter:

- ✅ **100 FLUXX** (ou mais)
- ✅ **10 USDC** (ou mais)
- ✅ **MATIC** para gas (~0.05-0.1 POL)

### 2. Configurar .env

Certifique-se de que o `PRIVATE_KEY` no `.env` é da carteira `0x3242FcE40be49b25DDBb86a7119E55De54b99d57`:

```bash
PRIVATE_KEY=sua_private_key_da_carteira_0x3242FcE40be49b25DDBb86a7119E55De54b99d57
```

**⚠️ IMPORTANTE:** A private key deve ser da carteira que tem os tokens!

---

## 🚀 Executar o Script

### Passo 1: Verificar Configuração

```bash
# Verificar se o .env está configurado
cat .env | grep PRIVATE_KEY
```

### Passo 2: Executar o Script

```bash
npx hardhat run scripts/criarPoolIgnicao.js --network polygon
```

### Passo 3: Acompanhar a Execução

O script irá:

1. ✅ Verificar saldos de FLUXX e USDC
2. ✅ Aprovar tokens para o Position Manager
3. ✅ Calcular sqrtPriceX96 (preço inicial)
4. ✅ Verificar se pool já existe
5. ✅ Criar pool (se não existir)
6. ✅ Adicionar liquidez (100 FLUXX + 10 USDC)

---

## 📊 O que o Script Faz

### 1. Verificação de Saldos

```
1️⃣ Verificando saldos...
   FLUXX: 100.0 FLUXX
   USDC: 10.0 USDC
   ✅ Saldos suficientes
```

### 2. Aprovações

```
2️⃣ Aprovando tokens para Position Manager...
   Aprovando FLUXX...
   ✅ FLUXX aprovado: 0x...
   Aprovando USDC...
   ✅ USDC aprovado: 0x...
```

### 3. Cálculo do Preço

```
3️⃣ Calculando sqrtPriceX96...
   sqrtPriceX96: [valor calculado]
   (Preço: 1 FLUXX = 0.10 USDC)
```

### 4. Criação da Pool

```
4️⃣ Verificando se pool já existe...
   token0 (menor endereço): 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174
   token1 (maior endereço): 0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
   
5️⃣ Criando pool...
   ⏳ Aguardando confirmação...
   ✅ Pool criada: 0x...
   📍 Endereço da pool: 0x...
```

### 5. Adição de Liquidez

```
6️⃣ Adicionando liquidez...
   Parâmetros:
   - token0: 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174
   - token1: 0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
   - fee: 3000
   - tickLower: -887272
   - tickUpper: 887272
   - amount0Desired: 10000000
   - amount1Desired: 100000000000000000000
   - recipient: 0x3242FcE40be49b25DDBb86a7119E55De54b99d57
   
   ⏳ Aguardando confirmação...
   ✅ Liquidez adicionada: 0x...
   🎉 Pool de IGNIÇÃO criada com sucesso!
   📍 Pool: 0x...
   🔗 Ver no Uniswap: https://app.uniswap.org/pools
```

---

## ✅ Verificação Pós-Criação

### 1. Verificar no Uniswap

1. Acesse: https://app.uniswap.org/pools
2. Conecte sua wallet
3. Procure pelo par **FLUXX/USDC**
4. Verifique:
   - Preço: **0.10 USDC por FLUXX**
   - Liquidez: **100 FLUXX + 10 USDC**
   - Fee: **0.30%**

### 2. Verificar NFT de Posição

O NFT de posição (LP token) será criado na carteira `0x3242FcE40be49b25DDBb86a7119E55De54b99d57`.

Para verificar:

1. Acesse: https://polygonscan.com/address/0x3242FcE40be49b25DDBb86a7119E55De54b99d57
2. Vá na aba **"ERC-1155 Token Txns"** ou **"NFTs"**
3. Você deve ver um NFT do Uniswap v3 Position Manager

### 3. Verificar no PolygonScan

1. Busque o endereço da pool (será mostrado no output do script)
2. Verifique as transações:
   - Pool Created
   - Mint (adicionar liquidez)

---

## 🐛 Troubleshooting

### Erro: "Saldo insuficiente"

**Problema:** A carteira não tem tokens suficientes.

**Solução:**
- Verifique se a carteira `0x3242FcE40be49b25DDBb86a7119E55De54b99d57` tem:
  - Pelo menos 100 FLUXX
  - Pelo menos 10 USDC
  - MATIC para gas

### Erro: "Pool já existe"

**Problema:** A pool já foi criada anteriormente.

**Solução:**
- O script detecta automaticamente e pula a criação
- Ele tentará adicionar liquidez mesmo assim
- Se quiser criar uma nova pool, use um fee tier diferente

### Erro: "Preço incorreto"

**Problema:** O cálculo do sqrtPriceX96 pode estar incorreto.

**Solução:**
- O script calcula automaticamente
- Se houver erro, verifique os decimais dos tokens:
  - FLUXX: 18 decimais
  - USDC: 6 decimais

### Erro: "Gas estimation failed"

**Problema:** Gas insuficiente ou transação muito complexa.

**Solução:**
- Aumente o gas limit no script
- Verifique se tem MATIC suficiente
- Tente novamente

---

## 📝 Notas Importantes

1. **Preço de Fundação:** O preço de 0.10 USDC por FLUXX é crítico e não deve ser alterado.

2. **Pool Mínima:** Esta é a pool de "ignição" (mínima). A liquidez institucional completa (20M FLUXX) será adicionada depois.

3. **NFT de Posição:** O Uniswap v3 usa NFTs para representar posições de liquidez. O NFT será criado na carteira especificada.

4. **Gas:** A criação da pool e adição de liquidez requerem gas significativo (~0.05-0.1 POL).

---

## 🔗 Links Úteis

- **Script:** `scripts/criarPoolIgnicao.js`
- **Uniswap v3 Pools:** https://app.uniswap.org/pools
- **PolygonScan:** https://polygonscan.com/
- **Carteira de Liquidez:** https://polygonscan.com/address/0x3242FcE40be49b25DDBb86a7119E55De54b99d57
- **Token FLUXX:** https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA

---

## ✅ Checklist

Antes de executar:

- [ ] Carteira tem 100 FLUXX
- [ ] Carteira tem 10 USDC
- [ ] Carteira tem MATIC para gas
- [ ] PRIVATE_KEY no .env é da carteira correta
- [ ] Rede configurada: Polygon Mainnet
- [ ] Script revisado e entendido

Após executar:

- [ ] Pool criada no Uniswap
- [ ] Preço verificado: 0.10 USDC por FLUXX
- [ ] NFT de posição recebido
- [ ] Pool aparece em agregadores (pode levar alguns minutos)

---

**Status:** ✅ Script pronto para execução  
**Versão:** IGNIÇÃO (v0.5.1)  
**Data:** Novembro 2025

