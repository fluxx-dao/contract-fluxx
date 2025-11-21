# 🔧 GS013 - Solução Final (Raiz do Problema)

## ✅ Entendimento Correto

**Você está certo:**
- Tokens **EXISTEM** na blockchain (PolygonScan mostra 100 FLUXX)
- Interface da Safe **não mostra** (problema visual)
- **Isso é normal** - o contrato vê os tokens on-chain

**O problema real:**
- GS013 = Transação revertendo + **Gas não configurado corretamente**
- Safe L2 **requer gas manual** na interface (JSON não suporta)

---

## 🎯 Solução: Configurar Gas Manualmente

### O JSON Não Suporta Gas

O campo `"gas"` no JSON **não funciona** no Safe Transaction Builder.

**Safe L2 requer:**
- Configurar gas **manualmente na interface**
- Para cada transação, em **"Advanced"** ou **"..."**

---

## 🚀 Passo a Passo Correto

### 1. Importar JSON (Sem Gas)

1. Importe `poolSafeTransactionReduzido.json` (sem campo gas)
2. Você verá as 4 transações

### 2. Configurar Gas Manualmente

**Para CADA transação:**

1. Clique nos **três pontos (...)** ou **"Advanced"**
2. Configure:
   - **Safe Tx Gas:** (veja valores abaixo)
   - **Base Gas:** `21000`
   - **Gas Price:** Deixe vazio

**Valores:**

- **Transação 1 (Approve FLUXX):** Safe Tx Gas = `100000`
- **Transação 2 (Approve USDC):** Safe Tx Gas = `100000`
- **Transação 3 (Create Pool):** Safe Tx Gas = `500000`
- **Transação 4 (Mint):** Safe Tx Gas = `800000`

### 3. Executar

1. Revise todas as 4 transações
2. **Create Batch**
3. **Executar**

---

## ⚠️ Se Ainda Der GS013

### Executar Uma Por Vez

**Isso identifica qual transação está falhando:**

1. **Apenas Transação 1** (Approve FLUXX)
   - Configure gas: `100000`
   - Execute
   - Se funcionar: ✅ Continue

2. **Apenas Transação 2** (Approve USDC)
   - Configure gas: `100000`
   - Execute
   - Se funcionar: ✅ Continue

3. **Apenas Transação 3** (Create Pool)
   - Configure gas: `500000`
   - Execute
   - Se funcionar: ✅ Continue

4. **Apenas Transação 4** (Mint)
   - Configure gas: `800000`
   - **Verificar:** Safe tem 50+ FLUXX e 5+ USDC?
   - Execute

---

## 🔍 Verificar Saldo Real (On-Chain)

**Mesmo que a interface não mostre, verifique on-chain:**

```bash
# Via PolygonScan
https://polygonscan.com/address/0xF040BbD411542F09f775E974fA88E16bF7406d26#tokentxns

# Deve mostrar 100 FLUXX
```

**Se mostrar 100 FLUXX no PolygonScan:**
- ✅ Tokens estão lá
- ✅ Transação vai funcionar
- ✅ Ignore a interface

---

## 📋 Resumo

**Problema:**
- Tokens existem (PolygonScan confirma)
- Interface não mostra (visual)
- GS013 = Gas não configurado

**Solução:**
1. ✅ Ignorar visualização (tokens estão lá)
2. ✅ Configurar gas **manualmente** na interface
3. ✅ Executar (uma por vez se necessário)

**Arquivo:** `poolSafeTransactionReduzido.json` (sem campo gas - configure manualmente)

---

## 🎯 Por Que Manual?

**Safe Transaction Builder não suporta gas no JSON para Safe L2.**

Você **deve** configurar gas manualmente na interface para cada transação.

**Isso resolve o GS013!**

