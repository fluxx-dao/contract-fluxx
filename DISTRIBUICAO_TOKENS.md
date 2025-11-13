# 📊 Distribuição de Tokens FLUXX

## ✅ Status: Pronto para Transferência Inicial

---

## 📋 Distribuição Planejada (100 milhões de FLUXX)

| Categoria | Percentual | Quantidade | Status |
|-----------|------------|------------|--------|
| **Fundadores** | 10% | 10.000.000 FLUXX | ⚠️ Teste inicial apenas |
| **Tesouro DAO** | 25% | 25.000.000 FLUXX | ✅ Wallet definida |
| **Missões & Recompensas** | 35% | 35.000.000 FLUXX | ⚠️ Wallet pendente |
| **Parcerias** | 10% | 10.000.000 FLUXX | ⚠️ Wallet pendente |
| **Liquidez Inicial** | 20% | 20.000.000 FLUXX | ✅ Wallet definida |
| **TOTAL** | 100% | 100.000.000 FLUXX | - |

---

## 🎯 Fase 1: Teste Inicial (AGORA)

**Objetivo:** Distribuir pequenas quantidades para testar o sistema.

### Fundadores - Quantidades para Teste:

| Fundador | Quantidade | Endereço | Finalidade |
|----------|------------|----------|------------|
| **Fundador #1** | 600 FLUXX | `0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f` | Registro (500) + Criar missão (100) |
| **Fundador #2** | 200 FLUXX | `0xa387691E594dF109aD9cA83767F39D419CBC6001` | Registro (100) + Extra |
| **Fundador #3** | 200 FLUXX | `0x887b641EF4A1e99022e290dF6Ac9c81eA50AE0CD` | Registro (100) + Extra |
| **Fundador #4** | 200 FLUXX | `0xc8b6C6cF88ecE28EfDede72ed625b95b73Cb649F` | Registro (100) + Extra |
| **TOTAL** | **1.200 FLUXX** | - | - |

---

## 🚀 Como Executar a Transferência

### Opção 1: Usar o JSON Gerado (Recomendado)

1. **Acesse o Safe Transaction Builder:**
   ```
   https://app.safe.global/apps/open?safe=matic:0xF040BbD411542F09f775E974fA88E16bF7406d26&appUrl=https%3A%2F%2Fapps-portal.safe.global%2Ftx-builder
   ```

2. **Importe o JSON:**
   - Abra o arquivo `test-transfers.json` gerado pelo script
   - No Transaction Builder, clique em "Import" ou "Load JSON"
   - Cole o conteúdo do arquivo
   - Revise todas as 4 transações

3. **Execute:**
   - Crie o batch
   - Aguarde aprovações dos signatários
   - Execute quando tiver aprovações suficientes

### Opção 2: Criar Manualmente no Safe

Para cada fundador, adicione uma transação:

1. **To Address:** `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (Token)
2. **Function:** `transfer(address to, uint256 amount)`
3. **Parâmetros:**
   - `to`: Endereço do fundador
   - `amount`: Quantidade em wei (veja tabela abaixo)

**Quantidades em Wei:**
- 600 FLUXX = `600000000000000000000`
- 200 FLUXX = `200000000000000000000`

---

## 📝 Wallets Configuradas

### ✅ Wallets Validadas:

| Nome | Endereço | Tipo |
|------|----------|------|
| **Gnosis Safe** | `0xF040BbD411542F09f775E974fA88E16bF7406d26` | Tesouro DAO |
| **Liquidez** | `0x3242FcE40be49b25DDBb86a7119E55De54b99d57` | Liquidez Inicial |
| **Fundador #1** | `0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f` | Fundador |
| **Fundador #2** | `0xa387691E594dF109aD9cA83767F39D419CBC6001` | Fundador |
| **Fundador #3** | `0x887b641EF4A1e99022e290dF6Ac9c81eA50AE0CD` | Fundador |
| **Fundador #4** | `0xc8b6C6cF88ecE28EfDede72ed625b95b73Cb649F` | Fundador |

### ⚠️ Wallets Pendentes:

| Nome | Quantidade | Status |
|------|------------|--------|
| **Missões & Recompensas** | 35.000.000 FLUXX | ⚠️ Wallet não definida |
| **Parcerias** | 10.000.000 FLUXX | ⚠️ Wallet não definida |

**Nota:** As wallets de Missões e Parcerias podem ser:
- Novas wallets criadas especificamente para isso
- O próprio Treasury (e depois distribuir via Governance)
- O Gnosis Safe (e depois distribuir via propostas)

---

## 🔄 Fase 2: Distribuição Completa (Depois do Teste)

Após testar o sistema com as quantidades iniciais, execute a distribuição completa:

### Quantidades Completas:

| Categoria | Quantidade | Wallet |
|-----------|------------|--------|
| Fundadores | 10.000.000 FLUXX | Distribuir entre os 4 fundadores |
| Tesouro DAO | 25.000.000 FLUXX | `0xF040BbD411542F09f775E974fA88E16bF7406d26` |
| Missões | 35.000.000 FLUXX | [Definir wallet] |
| Parcerias | 10.000.000 FLUXX | [Definir wallet] |
| Liquidez | 20.000.000 FLUXX | `0x3242FcE40be49b25DDBb86a7119E55De54b99d57` |

**Total:** 100.000.000 FLUXX

---

## ✅ Checklist Antes de Executar

- [x] Endereços dos fundadores validados
- [x] Wallet de liquidez definida
- [x] Gnosis Safe configurado
- [x] JSON de transações gerado
- [ ] **Você está conectado ao Safe correto** (`0xF040...6d26`)
- [ ] **Rede está correta** (Polygon Mainnet)
- [ ] **Você é signatário do Safe**
- [ ] **Safe tem POL suficiente** para gas (~0.01-0.02 POL para 4 transações)
- [ ] **Revise todos os endereços** antes de executar

---

## 🔗 Links Úteis

- **Gnosis Safe:** https://app.safe.global/
- **Token no PolygonScan:** https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
- **Treasury no PolygonScan:** https://polygonscan.com/address/0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93
- **Transaction Builder:** https://apps-portal.safe.global/tx-builder
- **Link Direto Safe + Builder:** https://app.safe.global/apps/open?safe=matic:0xF040BbD411542F09f775E974fA88E16bF7406d26&appUrl=https%3A%2F%2Fapps-portal.safe.global%2Ftx-builder

---

## 📄 Arquivos Gerados

- `test-transfers.json` - JSON com as 4 transações para teste inicial
- `scripts/distribuirTokens.js` - Script para gerar transações

---

**Status:** ✅ Pronto para execução  
**Data:** Novembro 2025  
**Última atualização:** Validação de endereços concluída

