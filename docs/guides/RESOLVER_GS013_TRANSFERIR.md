# 🐛 Resolver GS013 ao Transferir Tokens da Safe

## ❌ Erro: GS013 ao Transferir FLUXX

Você está recebendo o erro **GS013** ao tentar transferir FLUXX da Safe para sua wallet pessoal.

**Erro:**
```
execution reverted: "GS013"
This transaction will most likely fail.
```

---

## 🔍 O Que É GS013?

O erro **GS013** na Safe significa:

- Uma **transação interna falhou** (revert)
- A Safe não conseguiu executar a operação
- Geralmente por falta de saldo, permissão ou parâmetros incorretos

---

## 🎯 Possíveis Causas

### 1. Função Incorreta

**Problema:** Você pode estar usando a função errada.

**Solução:** Use `transfer` diretamente no contrato do token.

### 2. Parâmetros Incorretos

**Problema:** Os parâmetros podem estar errados.

**Solução:** Verifique os valores exatos.

### 3. Saldo Insuficiente

**Problema:** A Safe pode não ter saldo suficiente.

**Solução:** Verifique o saldo da Safe.

---

## ✅ Solução: Transferir Corretamente

### Método 1: Via Safe Interface (Recomendado)

1. **Acesse:** https://app.safe.global/
2. **Conecte sua wallet** (signatária da Safe)
3. **Rede:** Polygon
4. **Safe:** `0xF040BbD411542F09f775E974fA88E16bF7406d26`
5. **Vá em:** "Assets"
6. **Encontre:** FLUXX na lista
7. **Clique em:** "Send" ou ícone de envio
8. **Configure:**
   - **To:** Seu endereço da wallet pessoal
   - **Amount:** 100 FLUXX
9. **Revise e execute**

**Este método é mais simples e evita erros!**

---

### Método 2: Via Transaction Builder (Manual)

Se o método 1 não funcionar:

1. **Acesse:** https://app.safe.global/
2. **Clique em:** "New Transaction"
3. **Selecione:** "Contract Interaction"
4. **Configure:**
   - **To:** `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (Token FLUXX)
   - **Function:** `transfer(address to, uint256 amount)`
   - **Parâmetros:**
     - `to`: `SEU_ENDEREÇO_WALLET_PESSOAL` (sem 0x se necessário, ou com 0x)
     - `amount`: `100000000000000000000` (100 FLUXX em wei - 18 decimais)

**⚠️ Certifique-se de:**

- Endereço está correto (com ou sem 0x, dependendo do que a Safe aceita)
- Amount está em wei (100 FLUXX = 100 * 10^18)
- Função é `transfer`, não outra função

---

### Método 3: Verificar Saldo Primeiro

Antes de transferir, verifique se a Safe realmente tem os tokens:

1. **Acesse:** https://polygonscan.com/address/0xF040BbD411542F09f775E974fA88E16bF7406d26
2. **Vá em:** "Token" ou "ERC-20 Token Txns"
3. **Procure por:** FLUXX
4. **Verifique o saldo**

**Ou use o script:**
```bash
npx hardhat run scripts/simulatePoolCreation.js --network polygon
```

Deve mostrar: `FLUXX na Safe: 100.0 FLUXX`

---

## 🔧 Troubleshooting Específico

### Erro: "Invalid address format"

**Solução:**
- Certifique-se de que o endereço começa com `0x`
- Verifique se tem 42 caracteres (0x + 40 hex)
- Exemplo correto: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`

### Erro: "Amount too large"

**Solução:**
- Verifique se o amount está em wei
- 100 FLUXX = `100000000000000000000` (100 * 10^18)
- Não use decimais no amount

### Erro: "Insufficient balance"

**Solução:**
- Verifique se a Safe tem 100 FLUXX
- Pode ter menos do que você pensa
- Verifique no PolygonScan

---

## ✅ Método Mais Simples: Usar Interface da Safe

**A forma mais fácil é usar a interface da Safe diretamente:**

1. **Acesse:** https://app.safe.global/
2. **Vá em:** "Assets"
3. **Encontre:** FLUXX
4. **Clique em:** "Send"
5. **Preencha:**
   - To: Seu endereço
   - Amount: 100
6. **Execute**

**Isso evita erros de formatação!**

---

## 🎯 Alternativa: Usar Safe Transaction Builder

1. **Acesse:** https://apps-portal.safe.global/tx-builder
2. **Conecte sua wallet**
3. **Selecione a Safe:** `0xF040BbD411542F09f775E974fA88E16bF7406d26`
4. **Adicione transação:**
   - Contract: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`
   - Function: `transfer`
   - To: Seu endereço
   - Amount: `100000000000000000000`
5. **Gere e importe na Safe**

---

## 📋 Checklist

- [ ] Verifique saldo da Safe (tem 100 FLUXX?)
- [ ] Use interface da Safe (Assets → Send)
- [ ] OU use Transaction Builder
- [ ] Verifique endereço de destino (correto?)
- [ ] Verifique amount (em wei: 100000000000000000000)

---

## 💡 Dica: Verificar Transação Antes

Antes de executar, você pode verificar se vai funcionar:

```bash
# Verificar saldo
npx hardhat run scripts/simulatePoolCreation.js --network polygon
```

Se mostrar `FLUXX na Safe: 100.0 FLUXX`, então tem saldo suficiente.

---

## 🚀 Próximo Passo

**Tente usar a interface da Safe (Assets → Send):**

1. Acesse: https://app.safe.global/
2. Vá em "Assets"
3. Encontre FLUXX
4. Clique em "Send"
5. Preencha seu endereço e 100 FLUXX
6. Execute

**Este método é mais simples e evita erros de formatação!**

---

**Status:** Resolvendo erro GS013  
**Solução recomendada:** Usar interface da Safe (Assets → Send)  
**Alternativa:** Safe Transaction Builder

