# ✅ Verificar Configurações do Safe

## 📋 O que você já executou:

Pela transação "5 Transaction Builder" com 6 ações, você já executou:

1. ✅ `authorizeMinter` (Token → Treasury ou Governance)
2. ✅ `setGovernance` (Treasury → Governance)
3. ✅ `authorizeMinter` (BadgeNFT → Membership)
4. ✅ `authorizeMinter` (BadgeNFT → CollabEngine)
5. ✅ `authorizeMinter` (Token → outro contrato)
6. ✅ `contract interaction` (outra interação)

---

## 🔍 Verificar o que está configurado:

### 1. Verificar Token.authorizeMinter

**Contrato:** `0x263Fe9898b8A9bba3E08403cC9054dCa39a11636`  
**Função:** `authorizedMinters(address)`  
**Verificar:**
- `0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af` (Treasury) → deve retornar `true`
- `0x00A4006ce4F0E9693Fa631A834d99dFEbb72F013` (Governance) → deve retornar `true`

**Link:** https://polygonscan.com/address/0x263Fe9898b8A9bba3E08403cC9054dCa39a11636#readContract

---

### 2. Verificar Treasury.setGovernance

**Contrato:** `0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af`  
**Função:** `governanceContract()`  
**Deve retornar:** `0x00A4006ce4F0E9693Fa631A834d99dFEbb72F013`

**Link:** https://polygonscan.com/address/0x4ccbA0a6230028d92CD71B81638a6eE56ba1C9af#readContract

---

### 3. Verificar BadgeNFT.authorizeMinter

**Contrato:** `0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd`  
**Função:** `authorizedMinter(address)`  
**Verificar:**
- `0x707f9a126D8d7bbCd7e40Fc0CEF1cdAa76678925` (Membership) → deve retornar `true`
- `0xfF972C1917FBaaE17a02Dea0BBEC29EBbd5c4f28` (CollabEngine) → deve retornar `true`

**Link:** https://polygonscan.com/address/0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd#readContract

---

### 4. Verificar BadgeNFT.authorizeBurner ⚠️

**Contrato:** `0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd`  
**Função:** `authorizedBurner(address)`  
**Verificar:**
- `0x00A4006ce4F0E9693Fa631A834d99dFEbb72F013` (Governance) → deve retornar `true`

**Link:** https://polygonscan.com/address/0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd#readContract

**⚠️ Esta pode estar faltando!** (não vi na lista de 6 ações)

---

## ✅ Checklist Rápido:

- [ ] Token.authorizeMinter(Treasury) → `true`
- [ ] Token.authorizeMinter(Governance) → `true`
- [ ] Treasury.setGovernance(Governance) → endereço correto
- [ ] BadgeNFT.authorizeMinter(Membership) → `true`
- [ ] BadgeNFT.authorizeMinter(CollabEngine) → `true`
- [ ] BadgeNFT.authorizeBurner(Governance) → `true` ⚠️
- [ ] Governance.atualizarParametros() [OPCIONAL]

---

## 🔍 Como Verificar no PolygonScan:

1. Acesse o contrato no PolygonScan
2. Vá na aba "Contract" → "Read Contract"
3. Chame a função de verificação
4. Confirme se retorna `true` ou o endereço correto

---

## ⚠️ Se faltar algo:

Se `authorizeBurner` não estiver configurado, execute:

**BadgeNFT.authorizeBurner(Governance)**
- Contrato: `0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd`
- Função: `authorizeBurner`
- Parâmetro: `0x00A4006ce4F0E9693Fa631A834d99dFEbb72F013`

**ABI:** Veja `ABIS_COMPLETOS_SAFE.md` (seção BadgeNFT)

---

**Status:** Verifique os links acima para confirmar o que está configurado!

