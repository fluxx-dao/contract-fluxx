# ✅ Pós-Deploy v0.5.1+ - Próximos Passos

## 🎉 Deploy Concluído com Sucesso!

**Data:** Novembro 2025  
**Versão:** v0.5.1+ com Melhorias de Segurança

---

## 📋 Novos Endereços dos Contratos

| Contrato | Endereço | PolygonScan |
|----------|----------|-------------|
| **Treasury** | `0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af` | [Ver](https://polygonscan.com/address/0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af) |
| **Token** | `0x263Fe9898b8A9bba3E08403cC9054dCa39a11636` | [Ver](https://polygonscan.com/address/0x263Fe9898b8A9bba3E08403cC9054dCa39a11636) |
| **BadgeNFT** | `0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd` | [Ver](https://polygonscan.com/address/0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd) |
| **Governance** | `0x00A4006ce4F0E9693Fa631A834d99dFEbb72F013` | [Ver](https://polygonscan.com/address/0x00A4006ce4F0E9693Fa631A834d99dFEbb72F013) |
| **Membership** | `0x707f9a126D8d7bbCd7e40Fc0CEF1cdAa76678925` | [Ver](https://polygonscan.com/address/0x707f9a126D8d7bbCd7e40Fc0CEF1cdAa76678925) |
| **CollabEngine** | `0xfF972C1917FBaaE17a02Dea0BBEC29EBbd5c4f28` | [Ver](https://polygonscan.com/address/0xfF972C1917FBaaE17a02Dea0BBEC29EBbd5c4f28) |

**Gnosis Safe:** `0xF040BbD411542F09f775E974fA88E16bF7406d26`

---

## ⚙️ Configurações Necessárias (Via Safe)

Execute **7 transações** no Gnosis Safe para configurar o sistema:

**📋 ABIs para cada função:** Veja `ABIS_PARA_SAFE.md` para copiar e colar os ABIs no Safe Transaction Builder.

### 1️⃣ Token.authorizeMinter(Treasury)

```
To: 0x263Fe9898b8A9bba3E08403cC9054dCa39a11636
Function: authorizeMinter(address)
Parameter: 0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af
```

### 2️⃣ Token.authorizeMinter(Governance)

```
To: 0x263Fe9898b8A9bba3E08403cC9054dCa39a11636
Function: authorizeMinter(address)
Parameter: 0x00A4006ce4F0E9693Fa631A834d99dFEbb72F013
```

### 3️⃣ Treasury.setGovernance(Governance)

```
To: 0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af
Function: setGovernance(address)
Parameter: 0x00A4006ce4F0E9693Fa631A834d99dFEbb72F013
```

### 4️⃣ BadgeNFT.authorizeMinter(Membership)

```
To: 0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd
Function: authorizeMinter(address)
Parameter: 0x707f9a126D8d7bbCd7e40Fc0CEF1cdAa76678925
```

### 5️⃣ BadgeNFT.authorizeMinter(CollabEngine)

```
To: 0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd
Function: authorizeMinter(address)
Parameter: 0xfF972C1917FBaaE17a02Dea0BBEC29EBbd5c4f28
```

### 6️⃣ BadgeNFT.authorizeBurner(Governance) ⭐ NOVO

```
To: 0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd
Function: authorizeBurner(address)
Parameter: 0x00A4006ce4F0E9693Fa631A834d99dFEbb72F013
```

**⚠️ IMPORTANTE:** Permite que Governance queime badges em punições.

### 7️⃣ Governance.atualizarParametros() [OPCIONAL]

```
To: 0x00A4006ce4F0E9693Fa631A834d99dFEbb72F013
Function: atualizarParametros(uint256,uint256)
Parameters:
  - duracaoVotacao: 259200 (3 dias em segundos)
  - quorumMinimo: 10 (fallback mínimo)
```

**Nota:** `quorumPercentual` já está em 20% por padrão.

---

## 💰 Transferir Tokens aos Fundadores

Após configurar tudo, use `Treasury.withdrawTokensByOwner()`:

### Transação 1: Fundador #1 (600 FLUXX)

```
To: 0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af (Treasury)
Function: withdrawTokensByOwner(address tokenAddress, uint256 amount, address to)
Parameters:
  tokenAddress: 0x263Fe9898b8A9bba3E08403cC9054dCa39a11636
  amount: 600000000000000000000
  to: 0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f
```

### Transação 2: Fundador #2 (200 FLUXX)

```
To: 0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af
Function: withdrawTokensByOwner(address tokenAddress, uint256 amount, address to)
Parameters:
  tokenAddress: 0x263Fe9898b8A9bba3E08403cC9054dCa39a11636
  amount: 200000000000000000000
  to: 0xa387691E594dF109aD9cA83767F39D419CBC6001
```

### Transação 3: Fundador #3 (200 FLUXX)

```
To: 0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af
Function: withdrawTokensByOwner(address tokenAddress, uint256 amount, address to)
Parameters:
  tokenAddress: 0x263Fe9898b8A9bba3E08403cC9054dCa39a11636
  amount: 200000000000000000000
  to: 0x887b641EF4A1e99022e290dF6Ac9c81eA50AE0CD
```

### Transação 4: Fundador #4 (200 FLUXX)

```
To: 0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af
Function: withdrawTokensByOwner(address tokenAddress, uint256 amount, address to)
Parameters:
  tokenAddress: 0x263Fe9898b8A9bba3E08403cC9054dCa39a11636
  amount: 200000000000000000000
  to: 0xc8b6C6cF88ecE28EfDede72ed625b95b73Cb649F
```

---

## ✅ Verificações Pós-Deploy

Execute para verificar se tudo está correto:

```bash
npx hardhat run scripts/verificarDeploy.js --network polygon
```

---

## 🔗 Links Úteis

- **Gnosis Safe:** https://app.safe.global/
- **Transaction Builder:** https://apps-portal.safe.global/tx-builder
- **Link Direto Safe + Builder:** https://app.safe.global/apps/open?safe=matic:0xF040BbD411542F09f775E974fA88E16bF7406d26&appUrl=https%3A%2F%2Fapps-portal.safe.global%2Ftx-builder

---

## 📚 Melhorias Implementadas

- ✅ Timelock de 2 dias no Treasury
- ✅ Quorum proporcional (20%) no Governance
- ✅ Timeout de 14 dias para missões
- ✅ Sistema de slots para fiadores
- ✅ Burn controlado de badges

---

**Status:** ✅ Deploy concluído, aguardando configurações no Safe

