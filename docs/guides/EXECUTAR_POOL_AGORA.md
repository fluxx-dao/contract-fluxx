# 🚀 Executar Pool FLUXX/USDC - Agora!

## ✅ Status Atual

- ✅ **50 FLUXX transferidos** do Treasury para Safe (transação executada)
- ✅ **Transações da pool prontas** (`poolSafeTransactionReduzido.json`)

---

## 📋 O Que Vai Acontecer (4 Transações)

1. **Approve FLUXX** → Position Manager pode usar 50 FLUXX
2. **Approve USDC** → Position Manager pode usar 5 USDC  
3. **Create Pool** → Cria pool FLUXX/USDC no Uniswap v3
4. **Mint** → Adiciona liquidez (50 FLUXX + 5 USDC)

---

## 🚀 Passo a Passo Rápido

### 1. Acesse a Safe

1. https://app.safe.global/
2. Safe: `0xF040BbD411542F09f775E974fA88E16bF7406d26`
3. Rede: **Polygon**

### 2. Importar JSON

1. **Apps** → **Transaction Builder**
2. **Import** → Cole o conteúdo de `scripts/poolSafeTransactionReduzido.json`
3. Você verá 4 transações

### 3. Verificar Antes de Executar

**Certifique-se de que:**
- ✅ Safe tem 50+ FLUXX
- ✅ Safe tem 5+ USDC
- ✅ Safe tem POL para gas (1-2 POL recomendado)

### 4. Executar

1. Revise as 4 transações
2. **Create Batch**
3. **Assinar** (se necessário, aguarde outras assinaturas)
4. **Executar**

---

## 📊 Parâmetros da Pool

| Parâmetro | Valor |
|-----------|-------|
| **Token 0** | USDC (`0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174`) |
| **Token 1** | FLUXX (`0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`) |
| **Fee** | 0.30% (3000) |
| **Preço Inicial** | 0.10 USDC por FLUXX |
| **Liquidez** | 5 USDC + 50 FLUXX |
| **Range** | Full Range |

---

## 🔍 Verificar Depois

### 1. Pool no Uniswap

https://app.uniswap.org/pools

Busque por **FLUXX/USDC** - deve aparecer!

### 2. NFT na Safe

**Assets** → **NFTs** → Deve aparecer um NFT Uniswap v3 Position

### 3. PolygonScan

Verifique as 4 transações executadas

---

## 📁 Arquivo

**`scripts/poolSafeTransactionReduzido.json`** - Pronto para importar!

---

## ⚠️ Importante

**Se não tiver USDC na Safe:**
- Compre USDC na Polygon
- Ou transfira de outra wallet
- Endereço USDC: `0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174`

---

## ✅ Checklist

- [x] 50 FLUXX na Safe ✅
- [ ] 5+ USDC na Safe
- [ ] POL para gas
- [ ] JSON importado
- [ ] Pronto para executar!

**Boa sorte! 🚀**
