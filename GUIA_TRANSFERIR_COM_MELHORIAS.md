# 🚀 Guia: Transferir FLUXX com as Melhorias Implementadas

## ✅ Versão Atualizada: v0.5.1+ com Melhorias de Segurança

---

## 📋 Duas Formas de Transferir Tokens

### 1️⃣ Distribuição Inicial (Owner/Safe) - SEM Timelock

**Quando usar:** Para distribuição inicial aos fundadores, antes do Governance estar configurado.

**Função:** `Treasury.withdrawTokensByOwner()`

**Características:**
- ✅ Sem timelock (execução imediata)
- ✅ Apenas owner (Safe) pode chamar
- ✅ Ideal para distribuição inicial

**Como usar no Safe:**

1. **To Address:** `0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93` (Treasury)
2. **Function:** `withdrawTokensByOwner(address tokenAddress, uint256 amount, address to)`
3. **Parâmetros:**
   - `tokenAddress`: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (Token)
   - `amount`: `600000000000000000000` (600 FLUXX em wei)
   - `to`: `0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f` (Fundador #1)

---

### 2️⃣ Via Governance (Com Timelock) - MAIS Seguro

**Quando usar:** Após o Governance estar configurado, para saques aprovados pela DAO.

**Fluxo:**
1. Criar proposta no Governance
2. Votar e aprovar
3. Proposta enfileira saque (com timelock de 2 dias)
4. Após 2 dias, executar saque

**Características:**
- ✅ Timelock de 2 dias (segurança)
- ✅ Requer aprovação da DAO
- ✅ Transparente e auditável

---

## 🎯 Para Distribuir aos Fundadores AGORA

### Método Recomendado: `withdrawTokensByOwner()`

Use esta função para transferir tokens diretamente do Treasury para os fundadores.

### Transações para Criar no Safe:

#### Transação 1: Fundador #1 (600 FLUXX)

```
To: 0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93 (Treasury)
Function: withdrawTokensByOwner(address tokenAddress, uint256 amount, address to)
Parameters:
  tokenAddress: 0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
  amount: 600000000000000000000
  to: 0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f
```

#### Transação 2: Fundador #2 (200 FLUXX)

```
To: 0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93 (Treasury)
Function: withdrawTokensByOwner(address tokenAddress, uint256 amount, address to)
Parameters:
  tokenAddress: 0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
  amount: 200000000000000000000
  to: 0xa387691E594dF109aD9cA83767F39D419CBC6001
```

#### Transação 3: Fundador #3 (200 FLUXX)

```
To: 0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93 (Treasury)
Function: withdrawTokensByOwner(address tokenAddress, uint256 amount, address to)
Parameters:
  tokenAddress: 0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
  amount: 200000000000000000000
  to: 0x887b641EF4A1e99022e290dF6Ac9c81eA50AE0CD
```

#### Transação 4: Fundador #4 (200 FLUXX)

```
To: 0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93 (Treasury)
Function: withdrawTokensByOwner(address tokenAddress, uint256 amount, address to)
Parameters:
  tokenAddress: 0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
  amount: 200000000000000000000
  to: 0xc8b6C6cF88ecE28EfDede72ed625b95b73Cb649F
```

---

## 📝 Passo a Passo no Safe Transaction Builder

1. **Acesse:** https://app.safe.global/apps/open?safe=matic:0xF040BbD411542F09f775E974fA88E16bF7406d26&appUrl=https%3A%2F%2Fapps-portal.safe.global%2Ftx-builder

2. **Para cada fundador:**
   - **To Address:** `0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93` (Treasury)
   - **Function:** `withdrawTokensByOwner`
   - **Parâmetros:**
     - `tokenAddress`: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`
     - `amount`: [quantidade em wei]
     - `to`: [endereço do fundador]

3. **Clique em "+ Add new transaction"** para cada fundador

4. **Crie o batch** e aguarde aprovações

5. **Execute** quando tiver aprovações suficientes

---

## ✅ Vantagens do Novo Sistema

- ✅ **Segurança:** Timelock protege contra drenagem instantânea
- ✅ **Flexibilidade:** Owner pode distribuir inicialmente sem timelock
- ✅ **Governança:** Após configurado, todos os saques passam por votação
- ✅ **Auditável:** Todas as transferências são registradas

---

## 🔗 Links Úteis

- **Gnosis Safe:** https://app.safe.global/
- **Treasury no PolygonScan:** https://polygonscan.com/address/0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93
- **Token no PolygonScan:** https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA

---

**Status:** ✅ Pronto para usar  
**Método:** `withdrawTokensByOwner()` (sem timelock para distribuição inicial)

