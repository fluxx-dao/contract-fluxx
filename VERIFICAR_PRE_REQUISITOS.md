# ✅ Verificação de Pré-Requisitos - Teste do Sistema

## 🎯 Checklist Rápido

Vamos verificar cada item antes de começar o teste:

---

## 1️⃣ Configurações Pós-Deploy

### Verificar no PolygonScan:

#### BadgeNFT → Autorizar Membership:

- **Contrato:** https://polygonscan.com/address/0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce#readContract
- **Função:** `authorizedMinter(address)`
- **Parâmetro:** `0x52926F509d7BD565c02fbd72265E4F5Dda300099` (Membership)
- **Resultado esperado:** `true` ✅

#### BadgeNFT → Autorizar CollabEngine:

- **Contrato:** https://polygonscan.com/address/0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce#readContract
- **Função:** `authorizedMinter(address)`
- **Parâmetro:** `0x3bFB7e43517B0C91F5Bee75FeDd88317Db7C763C` (CollabEngine)
- **Resultado esperado:** `true` ✅

#### Token → Autorizar Governance:

- **Contrato:** https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA#readContract
- **Função:** `authorizedMinters(address)`
- **Parâmetro:** `0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa` (Governance)
- **Resultado esperado:** `true` ✅

#### Treasury → Configurar Governance:

- **Contrato:** https://polygonscan.com/address/0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93#readContract
- **Função:** `governanceContract()`
- **Resultado esperado:** `0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa` (Governance) ✅

---

## 2️⃣ Treasury tem $FLUXX

### Verificar Saldo do Treasury:

- **Contrato Token:** https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA#readContract
- **Função:** `balanceOf(address)`
- **Parâmetro:** `0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93` (Treasury)
- **Resultado esperado:** `100000000000000000000000000` (100 milhões de FLUXX) ✅

---

## 3️⃣ Fundadores têm $FLUXX na Wallet

### Para cada Fundador, verificar:

**Fundador #1 precisa de:**

- **Mínimo:** 500 $FLUXX (para `register()`)
- **Recomendado:** 600 $FLUXX (500 para registro + 100 para criar missão)

**Fundadores #2, #3 precisam de:**

- **Mínimo:** 100 $FLUXX (para `registerWithGuarantor()`)
- **Recomendado:** 200 $FLUXX (100 para registro + 100 extra)

### Como Verificar:

1. Acesse: https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA#readContract
2. Chame `balanceOf(address)` com o endereço de cada fundador
3. Verifique se tem saldo suficiente

### Como Transferir $FLUXX do Treasury:

Se os fundadores não têm $FLUXX, você precisa transferir do Treasury:

1. **Via Gnosis Safe:**
   - Acesse: https://app.safe.global/
   - Crie transação no Token: `transfer(address to, uint256 amount)`
   - **to:** Endereço do fundador
   - **amount:** Quantidade em wei (ex: 600 * 1e18 = 600000000000000000000)

2. **Ou via PolygonScan (se você for owner do Treasury):**
   - Acesse o Token: https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA#writeContract
   - Conecte wallet do owner do Treasury (Gnosis Safe)
   - Chame `transfer(address to, uint256 amount)`

---

## 4️⃣ Fundadores têm POL para Gas

### Verificar Saldo de POL:

Para cada fundador, verifique se tem POL suficiente:

- **Mínimo recomendado:** 0.1 POL por fundador
- **Ideal:** 0.5 POL por fundador (para múltiplas transações)

### Como Verificar:

1. Acesse o PolygonScan do endereço do fundador
2. Veja o saldo de POL (MATIC) no topo da página

### Como Obter POL:

- Comprar em exchange (Binance, Coinbase, etc.)
- Usar bridge (Polygon Bridge)
- Receber de outro endereço

---

## 5️⃣ Pelo Menos 3 Fundadores Prontos

### Checklist de Fundadores:

- [ ] **Fundador #1:** Tem wallet, tem $FLUXX, tem POL, está online
- [ ] **Fundador #2:** Tem wallet, tem $FLUXX, tem POL, está online
- [ ] **Fundador #3:** Tem wallet, tem $FLUXX, tem POL, está online

### Endereços dos Fundadores:

Documente os endereços aqui:
- Fundador #1: `0x...`
- Fundador #2: `0x...`
- Fundador #3: `0x...`

---

## ✅ Checklist Final

Antes de começar o teste, confirme:

- [ ] BadgeNFT autorizou Membership e CollabEngine
- [ ] Token autorizou Governance
- [ ] Treasury configurou Governance
- [ ] Treasury tem 100 milhões de $FLUXX
- [ ] Fundador #1 tem pelo menos 600 $FLUXX
- [ ] Fundadores #2, #3 têm pelo menos 100 $FLUXX cada
- [ ] Todos os fundadores têm POL para gas
- [ ] Pelo menos 3 fundadores estão prontos

---

## 🚀 Próximo Passo

Se todos os itens acima estão ✅, você está pronto para começar a **Etapa 1: A Ignição dos Membros**.

Volte para `TESTE_SISTEMA_COMPLETO.md` e siga o passo a passo!

---

**Status:** ⬜ Aguardando verificação  
**Data:** Novembro 2025

