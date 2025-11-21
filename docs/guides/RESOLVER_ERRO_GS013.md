# 🐛 Resolver Erro GS013 na Safe

## ❌ Problema Identificado

Você recebeu o erro **GS013** ao tentar executar uma transação na Safe.

**Erro:**
```
GS013: require(success || safeTxGas != 0 || gasPrice != 0, "GS013");
```

**Status da Safe:**

- ✅ Safe tem 25 POL (gas suficiente)
- ❌ Safe tem **0 FLUXX** (problema!)
- ✅ Safe tem 20 USDC (conforme informado)

---

## 🔍 O que é o Erro GS013?

O erro **GS013** na Safe significa que:

1. Uma **transação interna falhou** (revert)
2. E não há configuração de gas suficiente para executar

**Tradução:** A Safe tentou executar uma operação (ex: transfer, approve) e ela falhou, mas a Safe não conseguiu identificar o problema corretamente.

---

## 🎯 Causa Provável no Seu Caso

Baseado na análise:

### ❌ Safe não tem FLUXX suficiente

Você precisa de **100 FLUXX** para criar a pool, mas a Safe tem **0 FLUXX**.

**O que aconteceu:**

1. Você tentou criar a pool ou fazer uma operação que precisa de FLUXX
2. A transação interna (transfer ou approve de FLUXX) falhou
3. A Safe retornou erro GS013

---

## ✅ Solução Passo a Passo

### Passo 1: Verificar o que você estava tentando fazer

**Se estava tentando criar a pool:**

- Você precisa de **100 FLUXX** na Safe
- Você precisa de **10 USDC** na Safe (já tem 20 ✅)

**Se estava tentando transferir FLUXX:**
- Você precisa ter FLUXX na Safe primeiro

### Passo 2: Transferir FLUXX para a Safe

Você precisa transferir **100 FLUXX** do Treasury para a Safe.

**Opção A: Via Safe (se você tem FLUXX em outra wallet)**

1. Acesse: https://app.safe.global/
2. Conecte sua wallet que tem FLUXX
3. Rede: **Polygon**
4. Safe: `0xF040BbD411542F09f775E974fA88E16bF7406d26`
5. Crie nova transação:
   - **To:** `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (Token FLUXX)
   - **Function:** `transfer(address to, uint256 amount)`
   - **Parâmetros:**
     - `to`: `0xF040BbD411542F09f775E974fA88E16bF7406d26` (a própria Safe)
     - `amount`: `100000000000000000000` (100 FLUXX em wei)

**Opção B: Via Treasury (se FLUXX está no Treasury)**

1. Acesse: https://app.safe.global/
2. Conecte sua wallet (signatário do Safe)
3. Rede: **Polygon**
4. Safe: `0xF040BbD411542F09f775E974fA88E16bF7406d26`
5. Crie nova transação:
   - **To:** `0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93` (Treasury)
   - **Function:** `withdrawTokensByOwner(address token, address to, uint256 amount)`
   - **Parâmetros:**
     - `token`: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (Token FLUXX)
     - `to`: `0xF040BbD411542F09f775E974fA88E16bF7406d26` (a própria Safe)
     - `amount`: `100000000000000000000` (100 FLUXX em wei)
   - ⚠️ **Atenção:** Esta transação tem timelock de 2 dias!

### Passo 3: Verificar Saldos Antes de Tentar Novamente

Antes de criar a pool, verifique:

```bash
npx hardhat run scripts/simulatePoolCreation.js --network polygon
```

Este script vai mostrar:

- ✅ Se a Safe tem FLUXX suficiente
- ✅ Se a Safe tem USDC suficiente
- ✅ Se precisa fazer approve

### Passo 4: Tentar Novamente

Depois de ter:

- ✅ 100 FLUXX na Safe
- ✅ 10 USDC na Safe (já tem 20 ✅)
- ✅ POL para gas (já tem 25 ✅)

Tente criar a pool novamente.

---

## 🔍 Como Debugar com Tenderly

### 1. Acesse o Tenderly Dashboard

**Link direto da sua transação:**
https://dashboard.tenderly.co/tx/polygon/2b3419c9-cfd6-4f6a-8f73-8cc8ad2840dc

### 2. Veja o Stack Trace

No Tenderly você verá:
- ✅ Exatamente qual linha do código falhou
- ✅ Qual função foi chamada
- ✅ Quais parâmetros foram passados
- ✅ Qual variável estava errada

### 3. Identifique o Problema

O Tenderly vai mostrar algo como:

```
❌ Erro na linha X do contrato Y
   Função: transfer(address, uint256)
   Parâmetros:
     - to: 0xF040BbD411542F09f775E974fA88E16bF7406d26
     - amount: 100000000000000000000
   
   Variáveis no momento do erro:
   - balance: 0 FLUXX
   - amount: 100 FLUXX
   
   💡 Problema: Tentou transferir mais do que tem!
```

---

## 📋 Checklist Antes de Criar Pool

Antes de tentar criar a pool novamente, verifique:

- [ ] Safe tem **100 FLUXX** (atualmente: 0 ❌)
- [ ] Safe tem **10 USDC** (atualmente: 20 ✅)
- [ ] Safe tem **POL para gas** (atualmente: 25 ✅)
- [ ] FLUXX foi aprovado para Position Manager (se necessário)
- [ ] USDC foi aprovado para Position Manager (se necessário)

---

## 🚀 Próximos Passos

1. **Transferir 100 FLUXX para a Safe**
   - Use uma das opções acima (Opção A ou B)

2. **Verificar com script:**
   ```bash
   npx hardhat run scripts/simulatePoolCreation.js --network polygon
   ```

3. **Tentar criar a pool novamente**
   - Via interface do Uniswap (recomendado)
   - Ou via Safe Transaction Builder

4. **Se falhar novamente:**
   - Use o Tenderly para debugar
   - Execute: `TX_HASH=0x... npx hardhat run scripts/debugSafeTransaction.js --network polygon`

---

## 💡 Dica: Use Tenderly ANTES de Executar

Para evitar esse problema no futuro:

```bash
# Sempre simule antes de executar na Safe
npx hardhat run scripts/simulatePoolCreation.js --network polygon
```

Isso vai mostrar os problemas **antes** de criar a transação na Safe!

---

**Status:** Aguardando transferência de 100 FLUXX para a Safe  
**Próximo passo:** Transferir FLUXX e tentar novamente

