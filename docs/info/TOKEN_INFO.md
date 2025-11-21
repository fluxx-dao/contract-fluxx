# 📋 Informações do Token FLUXX - Deploy Confirmado

## ✅ Dados do Token Deployado

**Endereço do Contrato:** `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`  
**Rede:** Polygon Mainnet (Chain ID: 137)  
**PolygonScan:** https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA

---

## 🏷️ Nome e Símbolo

| Campo | Valor |
|-------|-------|
| **Nome** | `FLUXX DAO` |
| **Símbolo** | `FLUXX` |
| **Decimais** | `18` |

---

## 📊 Supply

| Campo | Valor |
|-------|-------|
| **Supply Inicial** | `100,000,000 FLUXX` (100 milhões) |
| **Supply Máximo** | `1,000,000,000 FLUXX` (1 bilhão) |
| **Supply Atual** | Verificar no PolygonScan |

---

## 🔗 Links dos Contratos Relacionados

| Contrato | Endereço | PolygonScan |
|----------|----------|-------------|
| **Token** | `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` | [Ver](https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA) |
| **BadgeNFT** | `0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce` | [Ver](https://polygonscan.com/address/0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce) |
| **Treasury** | `0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93` | [Ver](https://polygonscan.com/address/0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93) |
| **Governance** | `0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa` | [Ver](https://polygonscan.com/address/0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa) |
| **Membership** | `0x52926F509d7BD565c02fbd72265E4F5Dda300099` | [Ver](https://polygonscan.com/address/0x52926F509d7BD565c02fbd72265E4F5Dda300099) |
| **CollabEngine** | `0x3bFB7e43517B0C91F5Bee75FeDd88317Db7C763C` | [Ver](https://polygonscan.com/address/0x3bFB7e43517B0C91F5Bee75FeDd88317Db7C763C) |

---

## ✅ Confirmação

**Nome do Token (ERC20):** `FLUXX DAO` ✅  
**Símbolo do Token (ERC20):** `FLUXX` ✅

Estes são os valores corretos conforme o script de deploy (`scripts/deploy.js`).

---

## 🔍 Diferença Importante: "Contract Name" vs "Token Name"

### ⚠️ Não confunda:

| Campo | Valor | Significado |
|-------|-------|-------------|
| **Contract Name** | `Token` | Nome da **classe Solidity** no código (`contract Token { ... }`) |
| **Token Name** | `FLUXX DAO` | Nome do **token ERC20** (retornado por `name()`) |
| **Token Symbol** | `FLUXX` | Símbolo do **token ERC20** (retornado por `symbol()`) |

### 📝 Explicação:

- **"Contract Name: Token"** no PolygonScan = Nome da classe do contrato no código Solidity
- **"Token Name: FLUXX DAO"** = Nome que aparece em carteiras, exchanges e interfaces
- **"Token Symbol: FLUXX"** = Símbolo que aparece em carteiras e exchanges

**O "Contract Name" é apenas um identificador interno do código. O que importa para usuários é o "Token Name" e "Token Symbol"!**

---

## 🔍 Como Verificar no PolygonScan

1. Acesse: https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
2. Na seção **"Contract"**, você verá:
   - **Token Name:** FLUXX DAO
   - **Token Symbol:** FLUXX
   - **Decimals:** 18

---

## 📝 Notas Importantes

- ✅ O nome e símbolo estão corretos conforme especificado
- ✅ O supply inicial (100 milhões) foi mintado para o Treasury no deploy
- ✅ O token está pronto para uso na DAO

---

---

## 📊 Transações e Transferências

### ✅ Comportamento Normal no PolygonScan

Quando você usa `Treasury.withdrawTokensByOwner()` para distribuir tokens:

- ✅ **Transações aparecem na aba do Token:** Todas as transferências são visíveis
- ✅ **Transações aparecem na aba do Treasury:** Chamadas de `withdrawTokensByOwner()` são visíveis
- ❌ **Transações NÃO aparecem na aba do Contrato Token:** Isso é normal e esperado

**Por quê?** A transação é enviada ao Treasury, que então chama `Token.transfer()`. O evento `Transfer` é emitido pelo Token, então aparece na aba do Token. Mas como a transação não foi enviada diretamente ao Token, não aparece na aba do Contrato Token.

**Isso é o comportamento padrão em todos os explorers EVM (PolygonScan, Etherscan, etc.).**

📖 **Documentação completa:** Ver [`docs/guides/EXPLICACAO_TRANSACOES_TOKEN.md`](../guides/EXPLICACAO_TRANSACOES_TOKEN.md)

---

**Última atualização:** Novembro 2025  
**Status:** ✅ Deploy Confirmado

