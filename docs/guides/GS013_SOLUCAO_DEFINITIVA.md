# 🔧 GS013 - Solução Definitiva

## ❌ Problema Identificado

**Erro:** GS013 na Safe L2
**Causa Raiz:** Transação de `mint` está revertendo porque a Safe não tem FLUXX

**Status Verificado:**
- ❌ Safe tem **0 FLUXX** (precisa 50 FLUXX)
- ✅ Safe tem **100 FLUXX de allowance** (já aprovado antes)
- ❌ Transação `mint` precisa dos tokens **na Safe**, não apenas allowance

---

## 🎯 Por Que Está Falhando

### O Problema Real

1. **Approve não precisa de saldo** - Apenas dá permissão
2. **Mint precisa de saldo** - Precisa dos tokens na Safe para usar

**O que acontece:**
- Transação 1 (Approve FLUXX): ✅ Funciona (não precisa de saldo)
- Transação 2 (Approve USDC): ✅ Funciona (não precisa de saldo)
- Transação 3 (Create Pool): ✅ Funciona (não precisa de tokens)
- Transação 4 (Mint): ❌ **FALHA** - Precisa de 50 FLUXX + 5 USDC na Safe

**Resultado:** GS013 porque a última transação reverte

---

## ✅ Solução: Executar em 2 Etapas

### ETAPA 1: Transferir Tokens para Safe

**Primeiro, garantir que os tokens estão na Safe:**

1. **Transferir 50 FLUXX:**
   - Use `transferirTokensParaPool.json`
   - Ou transfira de outra wallet

2. **Transferir 5 USDC:**
   - Compre ou transfira de outra wallet

**Verificar saldos:**
```bash
# Deve mostrar 50+ FLUXX e 5+ USDC
```

---

### ETAPA 2: Executar Pool (Depois de Ter Tokens)

**Depois que os tokens estiverem na Safe:**

1. Importe `poolSafeTransactionReduzidoComGas.json`
2. Execute as 4 transações

**Agora vai funcionar porque:**
- ✅ Safe tem FLUXX (transação mint pode usar)
- ✅ Safe tem USDC (transação mint pode usar)
- ✅ Gas configurado (Safe L2 requer)
- ✅ Deadline válido (não expirado)

---

## 🔍 Verificar Qual Transação Está Falhando

### Método: Executar Uma Por Vez

**Teste individual:**

1. **Apenas Transação 1 (Approve FLUXX)**
   - Se funcionar: ✅
   - Se falhar: Ver erro específico

2. **Apenas Transação 2 (Approve USDC)**
   - Se funcionar: ✅
   - Se falhar: Ver erro específico

3. **Apenas Transação 3 (Create Pool)**
   - Se funcionar: ✅
   - Se falhar: Ver erro específico

4. **Apenas Transação 4 (Mint)**
   - Se funcionar: ✅
   - Se falhar: **Provavelmente falta saldo!**

---

## 📋 Checklist Antes de Executar Pool

- [ ] **50+ FLUXX na Safe** (verificar via Alchemy)
- [ ] **5+ USDC na Safe** (verificar via Alchemy)
- [ ] **POL suficiente** (1-2 POL)
- [ ] **Deadline válido** (futuro)
- [ ] **Gas configurado** (no JSON ou manualmente)

---

## 🚀 Solução Imediata

### Opção 1: Transferir Tokens Primeiro

1. Execute `transferirTokensParaPool.json` (50 FLUXX)
2. Aguarde confirmação
3. Verifique saldo na Safe
4. **Depois** execute `poolSafeTransactionReduzidoComGas.json`

### Opção 2: Executar Uma Por Vez

1. Execute apenas Transação 1 (Approve FLUXX)
2. Se funcionar, continue
3. Execute apenas Transação 2 (Approve USDC)
4. Se funcionar, continue
5. Execute apenas Transação 3 (Create Pool)
6. Se funcionar, continue
7. **Antes de Transação 4:**
   - Verifique se tem 50 FLUXX + 5 USDC na Safe
   - Se não tiver, transfira primeiro
8. Execute Transação 4 (Mint)

---

## ⚠️ Importante

**O GS013 não é um problema de gas!**

O problema é que:
- A transação está **revertendo** (falha na execução)
- E não há gas configurado (Safe L2 requer)

**Mas a causa raiz é:** Transação revertendo por falta de saldo!

---

## 📁 Arquivos

- `scripts/transferirTokensParaPool.json` - Transferir FLUXX (execute primeiro)
- `scripts/poolSafeTransactionReduzidoComGas.json` - Pool (execute depois)

---

## 🎯 Resumo

**Problema:** GS013 = Transação revertendo (falta saldo) + Gas não configurado

**Solução:**
1. ✅ Transferir tokens para Safe primeiro
2. ✅ Depois executar pool
3. ✅ Gas já está configurado no JSON

**Ordem:**
1. `transferirTokensParaPool.json` → Aguardar confirmação
2. Verificar saldos
3. `poolSafeTransactionReduzidoComGas.json` → Executar

