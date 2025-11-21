# 🔧 GS013 - Causa Raiz e Solução Definitiva

## ❌ Erro GS013 na Safe L2

```
GS013: require(success || safeTxGas != 0 || gasPrice != 0, "GS013");
at SafeL2.sol:207
```

## 🎯 Causa Raiz Identificada

O erro GS013 acontece quando **3 problemas se combinam**:

1. **Transação reverte** (`success = false`)
2. **Gas não configurado** (`safeTxGas = 0` e `gasPrice = 0`)
3. **Safe L2 requer gas explícito** (diferente do Safe L1)

---

## 🔍 Problemas Encontrados

### 1. ❌ Deadline Expirado

**Status:** Deadline `1763708245` expirou (era 06:57:25, agora é 07:44:23)

**Solução:** Atualizar deadline para futuro

### 2. ❌ Gas Não Configurado

**Status:** JSON não tem campos `gas`, `safeTxGas`, `baseGas`

**Solução:** Adicionar gas explícito para Safe L2

### 3. ❌ Saldo Zero (Possível)

**Status:** Safe tem 0 FLUXX e 0 USDC (verificado)

**Solução:** Transferir tokens antes de fazer approve

---

## ✅ Solução Completa

### Arquivo Corrigido

**`scripts/poolSafeTransactionReduzidoComGas.json`** - Com:
- ✅ Deadline atualizado (futuro)
- ✅ Gas configurado para cada transação
- ✅ Pronto para Safe L2

### Configuração de Gas (Safe L2)

**Transação 1 (Approve FLUXX):**
- Gas: `100000`

**Transação 2 (Approve USDC):**
- Gas: `100000`

**Transação 3 (Create Pool):**
- Gas: `500000`

**Transação 4 (Mint):**
- Gas: `800000`

---

## 🚀 Como Usar na Safe

### Opção 1: Importar JSON Corrigido

1. Acesse: https://app.safe.global/
2. Safe: `0xF040BbD411542F09f775E974fA88E16bF7406d26`
3. **Apps** → **Transaction Builder**
4. **Import** → Cole `scripts/poolSafeTransactionReduzidoComGas.json`
5. **Verificar gas** - Cada transação deve ter gas configurado
6. **Executar**

### Opção 2: Configurar Gas Manualmente

Se o JSON não funcionar, configure gas manualmente:

1. **Importe** `poolSafeTransactionReduzido.json`
2. **Para cada transação**, clique em **"Advanced"** ou **"Gas"**
3. Configure:
   - **Safe Tx Gas:** (veja valores acima)
   - **Base Gas:** `21000`
   - **Gas Price:** Deixe vazio (usa rede)
4. **Salve** e execute

---

## ⚠️ IMPORTANTE: Verificar Antes

### 1. Saldos na Safe

**Verificar:**
- ✅ 50+ FLUXX na Safe
- ✅ 5+ USDC na Safe

**Se não tiver:**
- Transferir FLUXX: Use `transferirTokensParaPool.json`
- Comprar/transferir USDC

### 2. Deadline Válido

**Verificar:**
- Deadline deve ser **futuro** (não expirado)
- Recomendado: `block.timestamp + 1 hora`

### 3. Gas Configurado

**Verificar:**
- Cada transação deve ter `gas` ou `safeTxGas` configurado
- Safe L2 **requer** gas explícito

---

## 🔧 Se Ainda Falhar

### Debug Passo a Passo

1. **Execute uma transação por vez:**
   - Apenas Approve FLUXX
   - Se funcionar, continue
   - Se falhar, veja erro específico

2. **Verifique logs na Safe:**
   - Qual transação falhou?
   - Qual erro específico?
   - PolygonScan da transação

3. **Simule localmente:**
   ```bash
   npx hardhat run scripts/simularPoolCreation.js --network polygon
   ```

---

## 📋 Checklist Final

- [ ] **50+ FLUXX na Safe** (verificar via Alchemy)
- [ ] **5+ USDC na Safe** (verificar via Alchemy)
- [ ] **Deadline válido** (futuro, não expirado)
- [ ] **Gas configurado** (safeTxGas para cada transação)
- [ ] **POL suficiente** (1-2 POL para gas)
- [ ] **JSON importado** (com gas configurado)

---

## 📁 Arquivos

- `scripts/poolSafeTransactionReduzidoComGas.json` - **USE ESTE** (com gas)
- `scripts/poolSafeTransactionReduzido.json` - Versão antiga (sem gas)
- `scripts/transferirTokensParaPool.json` - Transferir FLUXX

---

## 🎯 Resumo

**Problema:** GS013 = Transação reverte + Gas não configurado

**Solução:**
1. ✅ Atualizar deadline
2. ✅ Configurar gas (Safe L2 requer)
3. ✅ Verificar saldos
4. ✅ Usar JSON corrigido

**Arquivo:** `poolSafeTransactionReduzidoComGas.json` ✅

