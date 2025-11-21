# 🔧 Resolver Erro: "So a governanca"

## ❌ Problema

Ao tentar criar transações na Safe, você recebe:

```
Simulation Error: Reverted with reason string: 'So a governanca'
```

## 🔍 Causa

O erro vem do `Treasury.sol` linha 28:

```solidity
modifier onlyGovernance() {
    require(msg.sender == governanceContract, "So a governanca");
    _;
}
```

**O que aconteceu:**

- Você tentou chamar uma função que requer `onlyGovernance`
- Mas o Safe não é o Governance
- O Safe é o **owner** do Treasury, não o Governance

## ✅ Solução

### Para Transferir Tokens do Treasury

Use a função `withdrawTokensByOwner` (onlyOwner, sem timelock):

**Arquivo pronto:** `scripts/transferirTokensParaPool.json`

**Transação:**
- **To:** `0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93` (Treasury)
- **Function:** `withdrawTokensByOwner(address tokenAddress, uint256 amount, address to)`
- **Parâmetros:**
  - `tokenAddress`: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (FLUXX)
  - `amount`: `50000000000000000000` (50 FLUXX)
  - `to`: `0xF040BbD411542F09f775E974fA88E16bF7406d26` (Safe)

## 📋 Funções Disponíveis no Treasury

### ✅ Safe Pode Usar (onlyOwner)

1. **`withdrawTokensByOwner`** - Transferir tokens (sem timelock)
   - Use para distribuição inicial
   - Use para transferir tokens para pool

2. **`setGovernance`** - Configurar contrato de Governance

### ❌ Safe NÃO Pode Usar (onlyGovernance)

1. **`queueWithdrawal`** - Enfileirar saque (com timelock)
2. **`executeWithdrawal`** - Executar saque após timelock
3. **`withdrawEther`** - Sacar ETH/MATIC

## 🚀 Como Usar

### Passo 1: Importar JSON na Safe

1. Acesse: https://app.safe.global/
2. Safe: `0xF040BbD411542F09f775E974fA88E16bF7406d26`
3. **Apps** → **Transaction Builder**
4. **Import** → Cole o conteúdo de `scripts/transferirTokensParaPool.json`
5. Revise a transação
6. Assine e execute

### Passo 2: Verificar Saldo

Depois de executar, verifique se os tokens chegaram na Safe:

```bash
# Via Alchemy
curl -X POST https://polygon-mainnet.g.alchemy.com/v2/ShhqzIT2YctdBwF8D1wxteRuInYz3TsH \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_call","params":[{"to":"0xB1430cc106bd664F68BE8d0167A52a29654CF8BA","data":"0x70a08231000000000000000000000000f040bbd411542f09f775e974fa88e16bf7406d26"},"latest"],"id":1}'
```

## ⚠️ Importante

- **`withdrawTokensByOwner`** = Sem timelock (execução imediata)
- **`queueWithdrawal`** = Com timelock de 2 dias (requer Governance)

Para transferir tokens para a pool, use `withdrawTokensByOwner` (mais rápido).

## 📁 Arquivos Relacionados

- `scripts/transferirTokensParaPool.json` - Transação pronta
- `contracts/Treasury.sol` - Contrato com as funções
- `docs/guides/STATUS_POOL_ATUAL.md` - Status da pool

