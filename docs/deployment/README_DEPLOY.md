# 🚀 Deploy FLUXX DAO - Guia Completo

## ✅ Versão: v0.5.1+ com Melhorias de Segurança

---

## 📋 Pré-requisitos

1. **Gnosis Safe criado** na Polygon
2. **Endereço do Safe** configurado no `.env` como `GNOSIS_SAFE_ADDRESS`
3. **Wallet de deploy** com pelo menos 5-10 POL
4. **Contratos compilados** (`npx hardhat compile`)

---

## 🚀 Executar Deploy

```bash
npx hardhat run scripts/deploy.js --network polygon
```

---

## 🔍 Verificar Deploy

Após o deploy, verifique se tudo está correto:

```bash
npx hardhat run scripts/verificarDeploy.js --network polygon
```

---

## ⚙️ Configurações Pós-Deploy (Via Safe)

Após o deploy, execute **7 transações** no Safe:

1. `Token.authorizeMinter(Treasury)`
2. `Token.authorizeMinter(Governance)`
3. `Treasury.setGovernance(Governance)`
4. `BadgeNFT.authorizeMinter(Membership)`
5. `BadgeNFT.authorizeMinter(CollabEngine)`
6. `BadgeNFT.authorizeBurner(Governance)` ⭐ NOVO
7. `Governance.atualizarParametros()` [OPCIONAL]

---

## 💰 Distribuir Tokens aos Fundadores

Após configurar tudo, use `Treasury.withdrawTokensByOwner()`:

**Guia completo:** `GUIA_TRANSFERIR_COM_MELHORIAS.md`

---

## 📚 Melhorias Implementadas

- ✅ Timelock de 2 dias no Treasury
- ✅ Quorum proporcional (20%) no Governance
- ✅ Validação de membership em funções críticas
- ✅ Timeout para missões (30 dias)
- ✅ Sistema de fiança melhorado
- ✅ Política de burn de badges controlada

**Documentação:** `MELHORIAS_IMPLEMENTADAS.md`

---

## 🔗 Links Úteis

- **Gnosis Safe:** https://app.safe.global/
- **PolygonScan:** https://polygonscan.com/
- **Transaction Builder:** https://apps-portal.safe.global/tx-builder

---

**Status:** ✅ Pronto para deploy

