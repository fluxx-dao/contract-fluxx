# 🛡️ Configurar Contratos via Gnosis Safe - Guia Passo a Passo

## 📋 Resumo

Após o deploy, você precisa executar **5 transações** via Gnosis Safe para configurar as permissões entre os contratos. Cada transação precisa ser aprovada pelos signatários (2 de 3 ou 3 de 5).

---

## 🎯 Endereços dos Contratos

```
Treasury:      0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93
Token:         0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
BadgeNFT:      0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce
Governance:    0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa
Membership:    0x52926F509d7BD565c02fbd72265E4F5Dda300099
CollabEngine:  0x3bFB7e43517B0C91F5Bee75FeDd88317Db7C763C
```

**Gnosis Safe (Owner)**: `0xF040BbD411542F09f775E974fA88E16bF7406d26`

---

## 📝 Como Criar Transações no Gnosis Safe

### Passo 1: Acessar sua Safe

1. Acesse: **https://app.safe.global/**
2. Conecte sua wallet
3. Selecione a rede: **Polygon**
4. Abra sua Safe: **FLUXX DAO** (`0xF040...6d26`)

### Passo 2: Criar Nova Transação

1. Clique em **"New transaction"** (botão no canto superior direito)
2. Selecione **"Contract interaction"** ou **"Custom transaction"**

### Passo 3: Preencher Dados da Transação

Para cada configuração abaixo, você precisará:

- **To (Para)**: Endereço do contrato que será chamado
- **Function**: Nome da função
- **Parameters**: Parâmetros da função

---

## 🔧 Configurações Necessárias

### 1️⃣ Token.authorizeMinter(Treasury)

**Objetivo**: Autorizar o Treasury a mintar tokens FLUXX

**Dados da Transação:**

- **To (Para)**: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (Token)
- **Function**: `authorizeMinter(address)`
- **Parameter**: `0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93` (Treasury)

**Passo a passo:**

1. Clique em "New transaction" → "Contract interaction"
2. Cole o endereço do Token: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`
3. Selecione a função `authorizeMinter`
4. No campo de parâmetro, cole: `0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93`
5. Revise e clique em "Create transaction"
6. Assine a transação (se você for um dos signatários)
7. Aguarde aprovação dos outros signatários
8. Após aprovação suficiente, execute a transação

---

### 2️⃣ Token.authorizeMinter(Governance)

**Objetivo**: Autorizar o Governance a mintar tokens FLUXX

**Dados da Transação:**

- **To (Para)**: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (Token)
- **Function**: `authorizeMinter(address)`
- **Parameter**: `0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa` (Governance)

**Passo a passo:**

1. Repita o processo acima, mas use o endereço do Governance como parâmetro

---

### 3️⃣ Treasury.setGovernance(Governance)

**Objetivo**: Conectar o Treasury com o Governance (para que Governance possa autorizar saques)

**Dados da Transação:**

- **To (Para)**: `0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93` (Treasury)
- **Function**: `setGovernance(address)`
- **Parameter**: `0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa` (Governance)

**Passo a passo:**

1. Clique em "New transaction" → "Contract interaction"
2. Cole o endereço do Treasury: `0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93`
3. Selecione a função `setGovernance`
4. No campo de parâmetro, cole: `0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa`
5. Revise e crie a transação

---

### 4️⃣ BadgeNFT.authorizeMinter(Membership)

**Objetivo**: Autorizar o Membership a mintar badges

**Dados da Transação:**

- **To (Para)**: `0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce` (BadgeNFT)
- **Function**: `authorizeMinter(address)`
- **Parameter**: `0x52926F509d7BD565c02fbd72265E4F5Dda300099` (Membership)

**Passo a passo:**

1. Clique em "New transaction" → "Contract interaction"
2. Cole o endereço do BadgeNFT: `0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce`
3. Selecione a função `authorizeMinter`
4. No campo de parâmetro, cole: `0x52926F509d7BD565c02fbd72265E4F5Dda300099`
5. Revise e crie a transação

---

### 5️⃣ BadgeNFT.authorizeMinter(CollabEngine)

**Objetivo**: Autorizar o CollabEngine a mintar badges

**Dados da Transação:**

- **To (Para)**: `0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce` (BadgeNFT)
- **Function**: `authorizeMinter(address)`
- **Parameter**: `0x3bFB7e43517B0C91F5Bee75FeDd88317Db7C763C` (CollabEngine)

**Passo a passo:**

1. Clique em "New transaction" → "Contract interaction"
2. Cole o endereço do BadgeNFT: `0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce`
3. Selecione a função `authorizeMinter`
4. No campo de parâmetro, cole: `0x3bFB7e43517B0C91F5Bee75FeDd88317Db7C763C`
5. Revise e crie a transação

---

## ⚡ Dica: Criar Múltiplas Transações de Uma Vez

Você pode criar todas as 5 transações de uma vez e depois aprová-las em lote:

1. Crie todas as 5 transações (elas aparecerão em "Pending transactions")
2. Cada signatário aprova todas as 5
3. Após aprovação suficiente, execute todas de uma vez

---

## ✅ Verificação

Após executar todas as configurações, você pode verificar:

1. **No PolygonScan**: Verifique os eventos emitidos pelos contratos
2. **No Gnosis Safe**: Veja o histórico de transações executadas
3. **Teste básico**: Tente criar uma proposta no Governance (se tiver badges)

---

## 🔍 Links Úteis

- **Gnosis Safe**: https://app.safe.global/
- **PolygonScan - Treasury**: https://polygonscan.com/address/0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93
- **PolygonScan - Token**: https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
- **PolygonScan - BadgeNFT**: https://polygonscan.com/address/0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce
- **PolygonScan - Governance**: https://polygonscan.com/address/0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa
- **PolygonScan - Membership**: https://polygonscan.com/address/0x52926F509d7BD565c02fbd72265E4F5Dda300099
- **PolygonScan - CollabEngine**: https://polygonscan.com/address/0x3bFB7e43517B0C91F5Bee75FeDd88317Db7C763C

---

## ⚠️ Importante

- Cada transação precisa de **aprovação multi-sig** (2 de 3 ou 3 de 5)
- Certifique-se de que a Safe tem **POL suficiente** para pagar gas (~0.1-0.2 POL por transação)
- **Ordem não importa muito**, mas recomendo fazer na ordem listada
- Após todas as configurações, a DAO estará **100% operacional**!

---

## 🆘 Problemas Comuns

**Problema**: "Function not found"
- **Solução**: Certifique-se de estar usando o endereço correto do contrato

**Problema**: "Transaction failed"
- **Solução**: Verifique se você tem POL suficiente na Safe para gas

**Problema**: "Not enough signatures"
- **Solução**: Aguarde mais signatários aprovarem a transação

---

Boa sorte! 🚀

