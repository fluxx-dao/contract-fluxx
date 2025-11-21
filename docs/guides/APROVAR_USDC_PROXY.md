# 🔧 Aprovar USDC - Escolhendo o ABI Correto

## ❓ Pergunta: "Keep Proxy or Use Implementation ABI?"

Quando você tenta interagir com USDC na Safe, aparece essa pergunta porque **USDC é um contrato Proxy**.

---

## 🎯 Qual Escolher?

### ✅ **Use Implementation ABI** (Recomendado)

**Por quê?**

- O Implementation ABI tem **todas as funções** do contrato
- A função `approve` funciona perfeitamente
- É mais completo e seguro

**Quando escolher:**

- ✅ Para operações normais (approve, transfer, etc.)
- ✅ Quando você quer todas as funções disponíveis
- ✅ Para garantir compatibilidade

---

### ⚠️ **Keep Proxy** (Usar apenas se necessário)

**Por quê?**

- O Proxy ABI pode ter funções limitadas
- Pode não ter todas as funções do contrato real
- Geralmente usado apenas para operações administrativas

**Quando escolher:**
- ⚠️ Apenas se você souber exatamente o que está fazendo
- ⚠️ Para operações administrativas específicas do proxy

---

## ✅ Recomendação para Aprovar USDC

**Escolha: "Use Implementation ABI"**

Isso garante que:

- ✅ A função `approve` está disponível
- ✅ Todos os parâmetros funcionam corretamente
- ✅ A transação será bem-sucedida

---

## 📋 Passo a Passo Completo

### 1. Na Safe, criar nova transação

### 2. Configurar:

- **To:** `0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174` (USDC Polygon)

### 3. Quando aparecer a pergunta:

**"The contract looks like a proxy. Do you want to use the Implementation ABI?"**

**Escolha: "Use Implementation ABI"** ✅

### 4. Selecionar função:

- **Function:** `approve(address spender, uint256 amount)`

### 5. Preencher parâmetros:

- `spender`: `0xC36442b4a4522E871399CD717aBDD847Ab11FE88` (Uniswap Position Manager)
- `amount`: `10000000` (10 USDC - USDC tem 6 decimais)

### 6. Revisar e assinar

---

## 💡 Por Que USDC é um Proxy?

USDC usa um padrão **Proxy Upgradeable** para:

- Permitir atualizações do contrato sem mudar o endereço
- Manter compatibilidade com versões antigas
- Facilitar upgrades de segurança

**Isso é normal e seguro!** Muitos tokens grandes usam esse padrão.

---

## 🔍 Verificação

Depois de aprovar, você pode verificar:

```bash
npx hardhat run scripts/simulatePoolCreation.js --network polygon
```

Deve mostrar:

- ✅ FLUXX na Safe: 100 FLUXX
- ✅ FLUXX aprovado: SIM
- ✅ USDC aprovado: SIM ← Deve aparecer agora!

---

## 📊 Resumo

```
Pergunta: "Keep Proxy or Use Implementation ABI?"
Resposta: "Use Implementation ABI" ✅

Por quê?
- Tem todas as funções
- approve funciona perfeitamente
- Mais seguro e completo
```

---

**Escolha: "Use Implementation ABI"** e continue com a aprovação!

