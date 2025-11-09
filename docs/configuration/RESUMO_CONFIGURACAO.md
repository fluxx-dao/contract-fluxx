# 📋 Resumo Rápido - Configurações no Gnosis Safe

## 🎯 5 Transações Necessárias

### 1️⃣ Autorizar Treasury a mintar tokens
```
Contrato: 0xB1430cc106bd664F68BE8d0167A52a29654CF8BA (Token)
Função: authorizeMinter
Parâmetro: 0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93 (Treasury)
```

### 2️⃣ Autorizar Governance a mintar tokens
```
Contrato: 0xB1430cc106bd664F68BE8d0167A52a29654CF8BA (Token)
Função: authorizeMinter
Parâmetro: 0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa (Governance)
```

### 3️⃣ Conectar Treasury com Governance
```
Contrato: 0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93 (Treasury)
Função: setGovernance
Parâmetro: 0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa (Governance)
```

### 4️⃣ Autorizar Membership a mintar badges
```
Contrato: 0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce (BadgeNFT)
Função: authorizeMinter
Parâmetro: 0x52926F509d7BD565c02fbd72265E4F5Dda300099 (Membership)
```

### 5️⃣ Autorizar CollabEngine a mintar badges
```
Contrato: 0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce (BadgeNFT)
Função: authorizeMinter
Parâmetro: 0x3bFB7e43517B0C91F5Bee75FeDd88317Db7C763C (CollabEngine)
```

---

## 🚀 Como Fazer

1. Acesse: https://app.safe.global/
2. Abra sua Safe: `0xF040BbD411542F09f775E974fA88E16bF7406d26`
3. Clique em **"New transaction"** → **"Contract interaction"**
4. Cole o endereço do contrato
5. Selecione a função
6. Cole o parâmetro
7. Crie e assine a transação
8. Aguarde aprovação dos outros signatários
9. Execute após aprovação suficiente

**Repita para cada uma das 5 configurações acima.**

---

Veja o guia completo em: `CONFIGURAR_SAFE.md`

