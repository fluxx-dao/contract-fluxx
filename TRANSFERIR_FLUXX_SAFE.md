# 🛡️ Transferir FLUXX via Gnosis Safe - Guia Seguro

## 📋 Resumo

Este guia mostra como transferir $FLUXX do Treasury para outras carteiras de forma segura usando o Gnosis Safe (multisig).

---

## 🎯 Dois Cenários

### 1️⃣ Transferir para Sócios (Fundadores)

**Objetivo:** Dar $FLUXX aos fundadores para que possam fazer stake no Membership.

**Quantidade necessária:**
- **Fundador #1:** 600 $FLUXX (500 para registro + 100 para criar missão)
- **Fundadores #2, #3:** 100-200 $FLUXX cada (100 para registro + extra)

### 2️⃣ Transferir para Carteira da DAO (Liquidez)

**Objetivo:** Transferir $FLUXX para a carteira que vai criar a pool de liquidez no Uniswap.

**Quantidade necessária:**
- Depende da estratégia de liquidez
- Exemplo: 10.000-100.000 $FLUXX para pool inicial

---

## ⚠️ IMPORTANTE: De Onde Vem o $FLUXX?

### Saldo Atual:

O **Treasury** (`0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93`) recebeu **100 milhões de $FLUXX** no deploy.

### Quem Pode Transferir:

- **Owner do Token:** Gnosis Safe (`0xF040BbD411542F09f775E974fA88E16bF7406d26`)
- **Treasury:** Tem os tokens, mas não pode transferir sozinho
- **Governance:** Pode autorizar saques do Treasury via propostas

### ⚠️ ATENÇÃO:

O **Token** foi deployado com o **Gnosis Safe como owner**. Isso significa que:
- ✅ Apenas o Safe pode fazer `transfer()` diretamente do Treasury
- ✅ Ou você precisa usar `Treasury.withdrawTokens()` via Governance

---

## 🔧 Método 1: Transferir Diretamente do Token (Mais Simples)

**Quando usar:** Quando você quer transferir do Treasury para outras carteiras.

**Pré-requisito:** O Gnosis Safe precisa ser o owner do Token (já é).

### Passo a Passo:

#### 1. Acesse o Gnosis Safe

1. Acesse: https://app.safe.global/
2. Conecte sua wallet (deve ser signatário do Safe)
3. Selecione a rede: **Polygon**
4. Abra sua Safe: `0xF040BbD411542F09f775E974fA88E16bF7406d26`

#### 2. Criar Nova Transação

1. Clique em **"New transaction"**
2. Selecione **"Contract interaction"**

#### 3. Configurar a Transação

**Dados da Transação:**

- **To (Para):** `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (Token)
- **Function:** `transfer(address to, uint256 amount)`
- **Parâmetros:**
  - **`to`:** Endereço de destino (ex: carteira do fundador ou carteira da DAO)
  - **`amount`:** Quantidade em wei (18 decimais)

**Exemplos de Amount (em wei):**

```javascript
// 600 FLUXX
600 * 1e18 = "600000000000000000000"

// 100 FLUXX
100 * 1e18 = "100000000000000000000"

// 10.000 FLUXX
10000 * 1e18 = "10000000000000000000000"
```

#### 4. Preencher no Safe

1. **To Address:** `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`
2. **Function:** Selecione `transfer` ou cole o ABI:
   ```json
   {
     "inputs": [
       {"internalType": "address", "name": "to", "type": "address"},
       {"internalType": "uint256", "name": "amount", "type": "uint256"}
     ],
     "name": "transfer",
     "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
     "stateMutability": "nonpayable",
     "type": "function"
   }
   ```
3. **Parâmetros:**
   - **to:** `0x...` (endereço de destino)
   - **amount:** `600000000000000000000` (600 FLUXX em wei)

#### 5. Revisar e Assinar

1. Revise todos os dados
2. Clique em **"Create transaction"**
3. Assine a transação
4. Aguarde aprovação dos outros signatários
5. Execute quando tiver aprovações suficientes

---

## 🔧 Método 2: Usar Treasury.withdrawTokens() (Mais Seguro)

**Quando usar:** Quando você quer seguir o fluxo oficial da DAO (via Governance).

**Pré-requisito:** Treasury precisa ter `governanceContract` configurado.

### Passo a Passo:

#### 1. Criar Proposta no Governance

1. Acesse o Governance: https://polygonscan.com/address/0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa#writeContract
2. Chame `criarPropostaSaqueToken()`
3. Preencha os parâmetros

#### 2. Votar na Proposta

1. Membros votam na proposta
2. Aguarde quorum e aprovação

#### 3. Executar Proposta

1. Chame `finalizarVotacao()`
2. Isso executa `Treasury.withdrawTokens()` automaticamente

**⚠️ Nota:** Este método é mais demorado (requer votação), mas é o fluxo oficial da DAO.

---

## 📊 Exemplos Práticos

### Exemplo 1: Transferir 600 FLUXX para Fundador #1

**Transação no Safe:**

```
To: 0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
Function: transfer(address to, uint256 amount)
Parameters:
  to: 0xEnderecoFundador1
  amount: 600000000000000000000
```

### Exemplo 2: Transferir 10.000 FLUXX para Carteira da DAO (Liquidez)

**Transação no Safe:**

```
To: 0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
Function: transfer(address to, uint256 amount)
Parameters:
  to: 0xEnderecoCarteiraDAO
  amount: 10000000000000000000000
```

### Exemplo 3: Transferir para Múltiplos Fundadores (Batch)

**Opção A:** Criar múltiplas transações no Safe (uma para cada fundador)

**Opção B:** Usar Transaction Builder do Safe para criar batch:
1. Acesse: https://app.safe.global/apps/open?safe=matic:0xF040BbD411542F09f775E974fA88E16bF7406d26&appUrl=https%3A%2F%2Fapps-portal.safe.global%2Ftx-builder
2. Adicione múltiplas transações `transfer()`
3. Crie uma única transação batch

---

## ✅ Verificação Pós-Transferência

Após executar a transação no Safe:

1. **Verifique no PolygonScan:**
   - Acesse: https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA#readContract
   - Chame `balanceOf(address)` com o endereço de destino
   - Deve mostrar o novo saldo

2. **Verifique a Transação:**
   - Acesse a transação no Safe
   - Confirme que foi executada com sucesso
   - Veja o hash da transação no PolygonScan

---

## 🚨 Checklist de Segurança

Antes de executar, verifique:

- [ ] **Endereço de destino está correto** (copie e cole, não digite)
- [ ] **Quantidade está em wei** (18 decimais)
- [ ] **Você está no Safe correto** (`0xF040...6d26`)
- [ ] **Rede está correta** (Polygon Mainnet)
- [ ] **Você é signatário do Safe**
- [ ] **Safe tem POL suficiente** para gas

---

## 📝 Resposta: Precisa Enviar para Todos os Sócios?

### ✅ SIM, mas apenas para o teste inicial

**Para o teste do sistema:**
- **Fundador #1:** Precisa de 600 $FLUXX (para `register()` e criar missão)
- **Fundadores #2, #3:** Precisam de 100-200 $FLUXX cada (para `registerWithGuarantor()`)

**Após o teste:**
- Os fundadores podem receber $FLUXX via:
  - Recompensas de missões (CollabEngine)
  - Propostas de Governance
  - Distribuições da DAO

**Para criar liquidez:**
- Você precisa transferir $FLUXX para a **carteira da DAO** que vai criar a pool
- Não precisa enviar para todos os sócios individualmente

---

## 🎯 Recomendação

### Para o Teste:
1. Transfira 600 $FLUXX para Fundador #1
2. Transfira 200 $FLUXX para cada Fundador #2, #3
3. Execute o teste do sistema

### Para Liquidez:
1. Transfira $FLUXX para a carteira da DAO (ex: 10.000-100.000)
2. Use essa carteira para criar a pool no Uniswap
3. Não precisa distribuir para todos os sócios

---

## 🔗 Links Úteis

- **Gnosis Safe:** https://app.safe.global/
- **Token no PolygonScan:** https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
- **Treasury no PolygonScan:** https://polygonscan.com/address/0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93
- **Transaction Builder:** https://apps-portal.safe.global/tx-builder

---

**Status:** ✅ Pronto para execução  
**Data:** Novembro 2025

