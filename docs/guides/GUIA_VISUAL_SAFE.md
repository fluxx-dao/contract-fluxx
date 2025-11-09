# 🎯 Guia Visual - Configurar no Transaction Builder

## ✅ Você está no lugar certo!

Você está no **Transaction Builder** do Gnosis Safe, que é exatamente onde precisa estar.

---

## 📝 Passo a Passo - Primeira Transação

### 1️⃣ Carregar o ABI do Token

**Opção A: Usar o arquivo que criei**

1. No campo "Enter ABI", clique no ícone verde `< >` (code brackets)
2. Abra o arquivo `token-abi.json` que está na pasta do projeto
3. O ABI será carregado automaticamente

**Opção B: Copiar e colar**

1. Abra o arquivo `token-abi.json` no seu editor
2. Copie todo o conteúdo (Ctrl+A, Ctrl+C)
3. Cole no campo "Enter ABI"

### 2️⃣ Selecionar a Função

Após carregar o ABI, você verá uma lista de funções. Procure e selecione:

- **`authorizeMinter(address)`** ou **`authorizeMinter`**

### 3️⃣ Preencher o Parâmetro

No campo que aparecer, cole o endereço do **Treasury**:
```
0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93
```

### 4️⃣ Revisar e Adicionar

1. Verifique que:
   - **To Address**: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (Token)
   - **POL value**: `0` (deixe vazio ou 0)
   - **Function**: `authorizeMinter`
   - **Parameter**: `0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93` (Treasury)

2. Clique em **"+ Add new transaction"** (botão verde no final)

---

## 🔄 Repetir para as Outras 4 Transações

Após adicionar a primeira, você verá uma lista de transações. Para adicionar mais:

### Transação 2: Token.authorizeMinter(Governance)
1. Clique em **"+ Add new transaction"** novamente
2. **To Address**: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (Token)
3. **Function**: `authorizeMinter`
4. **Parameter**: `0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa` (Governance)

### Transação 3: Treasury.setGovernance(Governance)
1. Clique em **"+ Add new transaction"**
2. **To Address**: `0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93` (Treasury)
3. **Function**: `setGovernance`
4. **Parameter**: `0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa` (Governance)
5. **Nota**: Você precisará carregar o ABI do Treasury também (arquivo `treasury-abi.json`)

### Transação 4: BadgeNFT.authorizeMinter(Membership)
1. Clique em **"+ Add new transaction"**
2. **To Address**: `0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce` (BadgeNFT)
3. **Function**: `authorizeMinter`
4. **Parameter**: `0x52926F509d7BD565c02fbd72265E4F5Dda300099` (Membership)
5. **Nota**: Você precisará carregar o ABI do BadgeNFT também (arquivo `badgenft-abi.json`)

### Transação 5: BadgeNFT.authorizeMinter(CollabEngine)
1. Clique em **"+ Add new transaction"**
2. **To Address**: `0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce` (BadgeNFT)
3. **Function**: `authorizeMinter`
4. **Parameter**: `0x3bFB7e43517B0C91F5Bee75FeDd88317Db7C763C` (CollabEngine)

---

## 📋 Resumo dos Endereços

```
Token:       0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
Treasury:    0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93
BadgeNFT:    0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce
Governance:  0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa
Membership:  0x52926F509d7BD565c02fbd72265E4F5Dda300099
CollabEngine: 0x3bFB7e43517B0C91F5Bee75FeDd88317Db7C763C
```

---

## 🎯 Após Adicionar Todas as 5 Transações

1. Revise todas as transações na lista
2. Clique em **"Create batch"** ou **"Send batch"**
3. Revise novamente e confirme
4. Assine a transação (se você for signatário)
5. Aguarde aprovação dos outros signatários
6. Execute após aprovação suficiente

---

## 💡 Dica

Você pode criar todas as 5 transações de uma vez antes de enviar. Isso permite revisar tudo antes de assinar!

