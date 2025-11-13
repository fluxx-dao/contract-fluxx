# ✅ Solução: Usar withdrawTokensByOwner

## 🎯 Nova Função Adicionada

Adicionei a função `withdrawTokensByOwner` no contrato Treasury que permite ao **owner (Safe)** transferir tokens diretamente.

---

## ⚠️ IMPORTANTE: Precisa Fazer Deploy do Novo Treasury

O contrato atual no Polygon **não tem** essa função ainda. Você precisa:

1. **Fazer deploy do novo contrato Treasury** com a função adicionada
2. **Migrar os tokens** do Treasury antigo para o novo
3. **Atualizar referências** nos outros contratos

**OU**

Usar uma solução temporária sem modificar o contrato.

---

## 🔧 Solução Temporária (Sem Modificar Contrato)

Enquanto não fazemos o deploy do novo Treasury, podemos usar o **Governance** de forma criativa:

### Opção 1: Registrar Fundadores Manualmente (Via Safe)

1. O Safe pode chamar funções `onlyOwner` do Membership
2. Registrar os fundadores diretamente (pular o stake)
3. Depois eles recebem tokens via Governance

### Opção 2: Transferir do Treasury para o Safe Primeiro

Usar uma função auxiliar ou fazer via Governance com uma proposta pré-aprovada.

---

## 📝 Como Usar a Nova Função (Após Deploy)

### No Safe Transaction Builder:

1. **To Address:** `0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93` (Treasury)
2. **Function:** `withdrawTokensByOwner(address tokenAddress, uint256 amount, address to)`
3. **Parâmetros:**
   - `tokenAddress`: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (Token)
   - `amount`: `600000000000000000000` (600 FLUXX em wei)
   - `to`: `0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f` (Fundador #1)

---

## 🚀 Próximos Passos

**Opção A:** Fazer deploy do novo Treasury (recomendado para longo prazo)
**Opção B:** Usar solução temporária via Governance ou registro manual

Qual você prefere?

