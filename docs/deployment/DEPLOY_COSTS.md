# 💰 Custos de Deploy - FLUXX DAO na Polygon Mainnet

## 📊 Resumo Executivo

**Saldo Recomendado na Wallet: 5-10 POL**

> ⚠️ **ATENÇÃO**: Desde setembro de 2024, a Polygon migrou de MATIC para POL. O token nativo agora é **POL**.

Isso cobre:
- ✅ Deploy de 6 contratos
- ✅ Transações de configuração
- ✅ Margem de segurança para variações de gas

---

## 🔢 Detalhamento de Custos

### 1️⃣ Deploy dos Contratos (6 contratos)

| Contrato | Complexidade | Gas Estimado | Custo (MATIC)* |
|----------|--------------|--------------|----------------|
| **Token.sol** | Média (ERC20 + mint inicial) | ~1.200.000 | ~0.12 |
| **BadgeNFT.sol** | Média (ERC1155 Soulbound) | ~1.500.000 | ~0.15 |
| **Treasury.sol** | Baixa | ~800.000 | ~0.08 |
| **Membership.sol** | Alta (Oracle + lógica complexa) | ~2.000.000 | ~0.20 |
| **CollabEngine.sol** | Alta (múltiplas funções) | ~1.800.000 | ~0.18 |
| **Governance.sol** | Alta (sistema de votação) | ~1.700.000 | ~0.17 |
| **TOTAL DEPLOY** | | **~9.000.000** | **~0.90 POL** |

*Baseado em gas price de ~30 gwei na Polygon (preço típico)

---

### 2️⃣ Transações de Configuração (Após Deploy)

Após fazer deploy, você precisará configurar os contratos:

| Ação | Contrato | Gas Estimado | Custo (MATIC)* |
|------|----------|--------------|----------------|
| `authorizeMinter(Treasury)` | Token | ~50.000 | ~0.005 |
| `authorizeMinter(Governance)` | Token | ~50.000 | ~0.005 |
| `setGovernance(Governance)` | Treasury | ~50.000 | ~0.005 |
| `authorizeMinter(Membership)` | BadgeNFT | ~50.000 | ~0.005 |
| `authorizeMinter(CollabEngine)` | BadgeNFT | ~50.000 | ~0.005 |
| **TOTAL CONFIGURAÇÃO** | | **~250.000** | **~0.025 POL** |

---

### 3️⃣ Custo Total Estimado

```
Deploy:        ~0.90 POL
Configuração:  ~0.025 POL
────────────────────────────
TOTAL:         ~0.925 POL
```

**Com margem de segurança (10x): ~10 POL**

---

## 💵 Conversão para USD

**Preço atual do POL (2025): ~$0.60 - $1.00** (similar ao MATIC anterior)

- **Custo mínimo:** 0.925 POL ≈ **$0.55 - $0.93**
- **Com margem:** 10 POL ≈ **$6.00 - $10.00**

---

## ⚠️ Variações de Gas

O custo pode variar baseado em:

1. **Congestionamento da rede:** Gas price pode subir para 50-100 gwei
2. **Complexidade real:** Contratos podem ser maiores que o estimado
3. **Transações extras:** Se precisar fazer ajustes após deploy

**Por isso recomendamos 5-10 POL na wallet.**

---

## 📋 Checklist Pré-Deploy

Antes de fazer deploy, certifique-se de ter:

- [ ] **5-10 MATIC** na wallet de deploy
- [ ] `.env` configurado com `PRIVATE_KEY` e `POLYGON_RPC_URL`
- [ ] RPC URL funcionando (teste com `npx hardhat compile`)
- [ ] Todos os endereços necessários preparados:
  - [ ] Endereço do owner inicial
  - [ ] Endereço do Treasury (pode ser o mesmo do deploy)
- [ ] **NOTA v0.5.1:** Membership usa **Preço Fixo de Fundação** ($0.10 por FLUXX)
  - [ ] Oracle Chainlink será implementado na v0.5.2 **após** liquidez de mercado
  - [ ] Não é necessário configurar Chainlink Price Feed para o deploy inicial

---

## 🔍 Como Verificar Gas Atual

Você pode verificar o gas price atual em:
- **Polygon Gas Station:** https://docs.polygon.technology/tools/gas/polygon-gas-station/
- **PolygonScan:** https://polygonscan.com/gastracker

---

## 💡 Dicas para Economizar

1. **Deploy em horários de baixo tráfego** (madrugada UTC)
2. **Use RPC premium** (Alchemy/Infura) para transações mais rápidas
3. **Monitore o gas price** antes de fazer deploy
4. **Teste primeiro na testnet** (Mumbai) para validar tudo

---

## 🚨 Importante

- ⚠️ **NUNCA** faça deploy com toda sua carteira
- ⚠️ Use uma **wallet dedicada** apenas para deploy
- ⚠️ Mantenha **fundos mínimos** (5-10 MATIC)
- ⚠️ Após deploy, considere transferir ownership para **multisig**

---

**Última atualização:** Novembro 2025
**Rede:** Polygon Mainnet (Chain ID: 137)

