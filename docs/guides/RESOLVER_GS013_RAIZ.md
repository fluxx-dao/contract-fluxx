# 🔧 Resolver GS013 - Raiz do Problema

## ❌ Erro GS013 na Safe L2

```
GS013: require(success || safeTxGas != 0 || gasPrice != 0, "GS013");
at SafeL2.sol:207
```

## 🔍 Causa Raiz

O erro GS013 acontece quando:

1. **Transação interna reverte** (`success = false`)
2. **E não há gas configurado** (`safeTxGas = 0` e `gasPrice = 0`)

**Tradução:** A Safe tentou executar uma operação, ela falhou, mas não há gas suficiente ou configurado para executar.

---

## 🎯 Problemas Comuns que Causam GS013

### 1. ❌ Saldo Insuficiente

**Sintoma:** Transação de `approve` ou `transfer` reverte

**Verificar:**
```bash
# Verificar FLUXX na Safe
curl -X POST https://polygon-mainnet.g.alchemy.com/v2/ShhqzIT2YctdBwF8D1wxteRuInYz3TsH \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_call","params":[{"to":"0xB1430cc106bd664F68BE8d0167A52a29654CF8BA","data":"0x70a08231000000000000000000000000f040bbd411542f09f775e974fa88e16bf7406d26"},"latest"],"id":1}'
```

**Solução:** Transferir tokens para Safe antes de fazer approve

---

### 2. ❌ Gas Não Configurado (Safe L2)

**Sintoma:** Safe L2 precisa de `safeTxGas` e `baseGas` explícitos

**Problema:** Safe L2 (Polygon) requer configuração de gas diferente do Safe L1

**Solução:** Adicionar gas manualmente na Safe Transaction Builder

**Como fazer:**
1. Na Safe Transaction Builder
2. Para cada transação, configure:
   - **Safe Tx Gas:** `500000` (ou mais, dependendo da complexidade)
   - **Base Gas:** `21000` (gas base)
   - **Gas Price:** Deixe vazio (usa gas price da rede)

---

### 3. ❌ Deadline Expirado

**Sintoma:** Transação de `mint` reverte com "Transaction too old"

**Verificar:** Deadline no JSON da pool

**Solução:** Atualizar deadline para futuro

```javascript
// Deadline deve ser > block.timestamp
const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hora no futuro
```

---

### 4. ❌ Parâmetros Incorretos

**Sintoma:** Calldata incorreto ou parâmetros inválidos

**Verificar:** 
- Endereços corretos (com checksum)
- Amounts corretos (decimais corretos)
- Ordem dos parâmetros

---

## ✅ Solução Passo a Passo

### Passo 1: Verificar Saldos

```bash
# FLUXX na Safe
# Deve ter 50+ FLUXX

# USDC na Safe  
# Deve ter 5+ USDC
```

**Se não tiver:**
- Transferir tokens primeiro
- Usar `transferirTokensParaPool.json` para FLUXX
- Comprar/transferir USDC

---

### Passo 2: Configurar Gas na Safe (Safe L2)

**No Safe Transaction Builder:**

1. **Importe o JSON** (`poolSafeTransactionReduzido.json`)
2. **Para cada transação**, configure:

   **Transação 1 (Approve FLUXX):**
   - Safe Tx Gas: `100000`
   - Base Gas: `21000`

   **Transação 2 (Approve USDC):**
   - Safe Tx Gas: `100000`
   - Base Gas: `21000`

   **Transação 3 (Create Pool):**
   - Safe Tx Gas: `500000`
   - Base Gas: `21000`

   **Transação 4 (Mint):**
   - Safe Tx Gas: `800000`
   - Base Gas: `21000`

3. **Salve o batch**

---

### Passo 3: Atualizar Deadline (Se Necessário)

Se o deadline expirou, atualize no JSON:

```json
"deadline": "1763708245"  // ← Verificar se é futuro
```

**Calcular novo deadline:**
```javascript
Math.floor(Date.now() / 1000) + 3600  // 1 hora no futuro
```

---

### Passo 4: Executar em Etapas (Alternativa)

Se o batch inteiro falhar, execute uma por vez:

1. **Apenas Approve FLUXX** (verificar se funciona)
2. **Apenas Approve USDC** (verificar se funciona)
3. **Apenas Create Pool** (verificar se funciona)
4. **Apenas Mint** (verificar se funciona)

Isso ajuda a identificar qual transação específica está falhando.

---

## 🔍 Debug: Identificar Transação Específica

### Método 1: Executar Uma Por Vez

Execute cada transação individualmente para identificar qual falha.

### Método 2: Verificar Logs

Na Safe, após tentar executar:
- Veja qual transação falhou
- Veja a mensagem de erro específica
- Verifique o PolygonScan da transação

### Método 3: Simular Localmente

```bash
# Simular transação
npx hardhat run scripts/simularPoolCreation.js --network polygon
```

---

## 📋 Checklist Antes de Executar

- [ ] **50+ FLUXX na Safe** (verificado via Alchemy)
- [ ] **5+ USDC na Safe** (verificado via Alchemy)
- [ ] **POL suficiente** (1-2 POL recomendado)
- [ ] **Gas configurado** (safeTxGas e baseGas)
- [ ] **Deadline válido** (futuro, não expirado)
- [ ] **Calldatas corretos** (verificar endereços e amounts)

---

## 🚀 Solução Rápida: Executar Uma Por Vez

Se o batch inteiro falhar, tente executar uma transação por vez:

1. **Approve FLUXX** (transação 1)
2. Aguardar confirmação
3. **Approve USDC** (transação 2)
4. Aguardar confirmação
5. **Create Pool** (transação 3)
6. Aguardar confirmação
7. **Mint** (transação 4)

Isso ajuda a identificar qual transação específica está causando o GS013.

---

## 📁 Arquivos

- `scripts/poolSafeTransactionReduzido.json` - Transações da pool
- `scripts/transferirTokensParaPool.json` - Transferir FLUXX do Treasury

---

## ⚠️ Importante

**Safe L2 (Polygon) requer configuração de gas explícita!**

Não deixe `safeTxGas = 0` ou `gasPrice = 0`. Configure valores adequados para cada transação.

