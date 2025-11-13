# ⚠️ Correção: Configuração da Transação

## ❌ Problema Identificado na Imagem

Você preencheu o campo **"POL value"** com `600000000000000000000`, mas isso está **ERRADO**!

O campo **"POL value"** é para enviar **POL** (moeda nativa da Polygon), não para o parâmetro `amount` da função `transfer()`.

---

## ✅ Como Corrigir

### Passo 1: Limpar o Campo POL value

1. **Deixe o campo "POL value" em 0 ou vazio**
   - Este campo é apenas para enviar POL junto com a transação
   - Para transferir tokens, você não precisa enviar POL (apenas gas)

### Passo 2: Selecionar a Função `transfer`

1. Após carregar o contrato (`0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`)
2. Você deve ver uma lista de funções disponíveis
3. **Selecione:** `transfer(address to, uint256 amount)`

### Passo 3: Preencher os Parâmetros Corretos

Quando você selecionar a função `transfer`, aparecerão **dois campos separados**:

1. **Parâmetro `to` (address):**
   - Cole: `0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f`
   - Este é o endereço do Fundador #1

2. **Parâmetro `amount` (uint256):**
   - Cole: `600000000000000000000`
   - Este é o valor em wei (600 FLUXX)

### Passo 4: Verificar Antes de Adicionar

Antes de clicar em "+ Add new transaction", verifique:

- ✅ **To Address:** `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (Token)
- ✅ **Function:** `transfer(address to, uint256 amount)`
- ✅ **Parâmetro `to`:** `0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f`
- ✅ **Parâmetro `amount`:** `600000000000000000000`
- ✅ **POL value:** `0` (ou vazio)

---

## 📋 Resumo Visual

```
┌─────────────────────────────────────┐
│ Enter Address:                      │
│ 0xB1430cc106bd664F68BE8d0167A52a... │ ✅ Correto
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Function: transfer                  │ ✅ Selecionar
│   ┌─────────────────────────────┐   │
│   │ to (address):                │   │
│   │ 0xB04A61b436cFc40e7Aad7B... │   │ ✅ Preencher aqui
│   └─────────────────────────────┘   │
│   ┌─────────────────────────────┐   │
│   │ amount (uint256):            │   │
│   │ 600000000000000000000        │   │ ✅ Preencher aqui
│   └─────────────────────────────┘   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ POL value: 0                        │ ✅ Deixar em 0
└─────────────────────────────────────┘
```

---

## 🎯 Passo a Passo Correto

1. **Carregar Contrato:**
   - Campo "Enter Address": `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`
   - Clique em "Load"

2. **Selecionar Função:**
   - Procure na lista: `transfer(address to, uint256 amount)`
   - Clique para selecionar

3. **Preencher Parâmetros:**
   - **to:** `0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f`
   - **amount:** `600000000000000000000`

4. **POL value:**
   - Deixe em `0` ou vazio

5. **Adicionar:**
   - Clique em "+ Add new transaction"

---

## ⚠️ Importante

- O campo **"POL value"** é diferente do parâmetro **`amount`**
- **POL value** = enviar POL junto (não necessário aqui)
- **amount** = quantidade de tokens FLUXX a transferir (em wei)

---

**Corrija isso e depois adicione a transação!** ✅

