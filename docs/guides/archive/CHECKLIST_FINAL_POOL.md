# ✅ Checklist Final: Criar Pool de Ignição

## 📊 Status Atual (Conforme Simulação)

```
┌─────────────────────────────────────────┐
│  STATUS DOS TOKENS NA SAFE              │
├─────────────────────────────────────────┤
│  FLUXX:  0.0 FLUXX  ❌ (precisa 100)    │
│  USDC:   20 USDC    ✅ (tem suficiente) │
│  POL:    Suficiente ✅                  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  STATUS DAS APROVAÇÕES                  │
├─────────────────────────────────────────┤
│  FLUXX:  ✅ Aprovado (100 FLUXX)        │
│  USDC:   ❌ Não aprovado                │
└─────────────────────────────────────────┘
```

---

## ✅ Checklist de Ações

### [ ] 1. Transferir 100 FLUXX para Safe

**Status:** ❌ **NÃO FEITO** (0.0 FLUXX na Safe)

**Como fazer:**

**Opção A: Se tem FLUXX em outra wallet**
```
Safe → New Transaction
To: 0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
Function: transfer(address to, uint256 amount)
- to: 0xF040BbD411542F09f775E974fA88E16bF7406d26
- amount: 100000000000000000000
```

**Opção B: Se FLUXX está no Treasury**
```
Safe → New Transaction
To: 0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93
Function: withdrawTokensByOwner(address token, address to, uint256 amount)
- token: 0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
- to: 0xF040BbD411542F09f775E974fA88E16bF7406d26
- amount: 100000000000000000000
⚠️ Timelock de 2 dias!
```

**Depois, verificar:**
```bash
npx hardhat run scripts/simulatePoolCreation.js --network polygon
```
Deve mostrar: `✅ Saldo FLUXX suficiente`

---

### [ ] 2. Aprovar USDC para Position Manager

**Status:** ❌ **NÃO FEITO**

**Como fazer:**
```
Safe → New Transaction
To: 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174
Function: approve(address spender, uint256 amount)
- spender: 0xC36442b4a4522E871399CD717aBDD847Ab11FE88
- amount: 10000000
```

**💡 Dica:** Pode aprovar mais (ex: 100 USDC) para não precisar aprovar de novo.

---

### [x] 3. Aprovar FLUXX para Position Manager

**Status:** ✅ **JÁ FEITO** (100 FLUXX de allowance)

**Não precisa fazer nada!**

---

### [ ] 4. Criar Pool no Uniswap

**Status:** ⏳ **AGUARDANDO** (precisa dos passos 1 e 2)

**Como fazer (depois de ter tudo):**

1. Acesse: https://app.uniswap.org/
2. Conecte Safe via WalletConnect
3. Vá em **Pool → New Position**
4. Configure:
   - Token 0: USDC (`0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174`)
   - Token 1: FLUXX (`0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`)
   - Fee: 0.30%
   - Range: Full Range
   - Preço: 0.10 USDC por FLUXX
   - Amount: 10 USDC + 100 FLUXX
5. Confirme e execute

---

## 🎯 Ordem de Execução

```
1. [ ] Transferir 100 FLUXX para Safe  ← FAZER AGORA
   ↓
2. [ ] Verificar com simulação
   ↓
3. [ ] Aprovar USDC
   ↓
4. [ ] Criar pool no Uniswap
```

---

## 📊 Progresso Atual

```
┌─────────────────────────────────────┐
│  PROGRESSO: 1 de 4 passos           │
├─────────────────────────────────────┤
│  ✅ FLUXX aprovado                   │
│  ❌ FLUXX na Safe (0.0)              │
│  ❌ USDC aprovado                    │
│  ⏳ Pool criada                      │
└─────────────────────────────────────┘
```

**33% concluído** 🎯

---

## 🚨 Bloqueio Atual

**O que está bloqueando:** Safe não tem FLUXX (0.0 FLUXX)

**Solução:** Transferir 100 FLUXX para Safe

**Depois disso:** Aprovar USDC → Criar Pool

---

## 💡 Por Que a Ordem Importa?

1. **Aprovar FLUXX** ✅ (já feito)
   - Permite que Position Manager use FLUXX
   - Mas Safe precisa TER FLUXX primeiro!

2. **Transferir FLUXX** ❌ (faltando)
   - Safe precisa ter os tokens
   - Sem isso, a aprovação não adianta

3. **Aprovar USDC** ❌ (faltando)
   - Permite que Position Manager use USDC
   - Precisa fazer antes de criar pool

4. **Criar Pool** ⏳ (aguardando)
   - Só funciona se tiver tudo acima

---

## ✅ Verificação Final

Antes de criar a pool, execute:

```bash
npx hardhat run scripts/simulatePoolCreation.js --network polygon
```

Deve mostrar:
- ✅ Saldo FLUXX suficiente
- ✅ FLUXX já aprovado
- ✅ USDC já aprovado

**Só então criar a pool!**

---

## 📚 Documentação

- **Guia completo:** `docs/guides/CRIAR_POOL_PASSO_A_PASSO.md`
- **Status atual:** `docs/guides/STATUS_ATUAL_POOL.md`
- **Ação imediata:** `docs/guides/ACAO_IMEDIATA_POOL.md`

---

**Status:** 1 de 4 passos concluídos  
**Bloqueio:** Falta transferir 100 FLUXX para Safe  
**Próximo passo:** Transferir FLUXX

