# 🛡️ Guia Passo a Passo: Atualizar Badge URIs via Gnosis Safe

## 📋 Informações Importantes

**BadgeNFT:** `0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce`  
**Gnosis Safe:** `0xF040BbD411542F09f775E974fA88E16bF7406d26`  
**Rede:** Polygon Mainnet

---

## 🚀 Passo a Passo Completo

### Passo 1: Acessar o Gnosis Safe

1. Acesse: **https://app.safe.global/**
2. Conecte sua wallet (MetaMask, WalletConnect, etc.)
3. Selecione a rede: **Polygon**
4. Abra sua Safe: `0xF040BbD411542F09f775E974fA88E16bF7406d26`

---

### Passo 2: Abrir o Transaction Builder

1. No menu lateral, clique em **"Apps"**
2. Procure por **"Transaction Builder"** ou **"Tx Builder"**
3. Clique para abrir

**OU** acesse diretamente:
```
https://app.safe.global/apps/open?safe=matic:0xF040BbD411542F09f775E974fA88E16bF7406d26&appUrl=https%3A%2F%2Fapps-portal.safe.global%2Ftx-builder
```

---

### Passo 3: Carregar o Contrato BadgeNFT

1. No campo **"Enter Address or ENS Name"**, cole:
   ```
   0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce
   ```

2. Clique em **"Load"** ou pressione Enter

3. **Carregar ABI:**
   - Clique em **"Enter ABI"** ou **"Load ABI"**
   - Você pode:
     - **Opção A:** Copiar o conteúdo do arquivo `badgenft-abi.json` do projeto
     - **Opção B:** Deixar vazio e o Safe tentará buscar automaticamente (pode não funcionar se o contrato não estiver verificado)

**Se precisar do ABI completo:**
- Abra o arquivo `badgenft-abi.json` no projeto
- Copie todo o conteúdo JSON
- Cole no campo "Enter ABI"

---

### Passo 4: Criar as 4 Transações

Você vai criar **4 transações** (uma para cada badge). Vamos fazer uma de cada vez:

---

#### 🔵 Transação 1: Badge ID 1 (Membro Ativo)

1. **Selecione a função:**
   - No dropdown "Select function", escolha: `setBadgeURI(uint256,string)`

2. **Preencha os parâmetros:**
   - **badgeId (uint256):** `1`
   - **newuri (string):** `https://fluxx.space/badges/1.json`

3. **Adicionar ao batch:**
   - Clique em **"+ Add new transaction"** ou **"Add transaction"**
   - A transação será adicionada à lista abaixo

---

#### 🟢 Transação 2: Badge ID 2 (Colaborador)

1. **Selecione a função:**
   - `setBadgeURI(uint256,string)`

2. **Preencha os parâmetros:**
   - **badgeId (uint256):** `2`
   - **newuri (string):** `https://fluxx.space/badges/2.json`

3. **Adicionar ao batch:**
   - Clique em **"+ Add new transaction"**

---

#### 🟡 Transação 3: Badge ID 3 (Aplicador)

1. **Selecione a função:**
   - `setBadgeURI(uint256,string)`

2. **Preencha os parâmetros:**
   - **badgeId (uint256):** `3`
   - **newuri (string):** `https://fluxx.space/badges/3.json`

3. **Adicionar ao batch:**
   - Clique em **"+ Add new transaction"**

---

#### 🔴 Transação 4: Badge ID 4 (Referral)

1. **Selecione a função:**
   - `setBadgeURI(uint256,string)`

2. **Preencha os parâmetros:**
   - **badgeId (uint256):** `4`
   - **newuri (string):** `https://fluxx.space/badges/4.json`

3. **Adicionar ao batch:**
   - Clique em **"+ Add new transaction"**

---

### Passo 5: Revisar o Batch

Agora você deve ter **4 transações** na lista:

```
1. setBadgeURI(1, "https://fluxx.space/badges/1.json")
2. setBadgeURI(2, "https://fluxx.space/badges/2.json")
3. setBadgeURI(3, "https://fluxx.space/badges/3.json")
4. setBadgeURI(4, "https://fluxx.space/badges/4.json")
```

**Revise cada uma:**
- ✅ Endereço do contrato está correto
- ✅ Função está correta (`setBadgeURI`)
- ✅ Parâmetros estão corretos
- ✅ URIs estão com `fluxx.space`

---

### Passo 6: Criar e Enviar o Batch

1. **Criar Batch:**
   - Clique em **"Create Batch"** ou **"Send Batch"**
   - O Safe vai calcular o gas necessário

2. **Revisar Gas:**
   - Verifique o custo estimado em POL
   - Certifique-se de que o Safe tem POL suficiente

3. **Assinar:**
   - Clique em **"Sign"** ou **"Approve"**
   - Confirme na sua wallet
   - A transação aparecerá como **"Pending"** no Safe

---

### Passo 7: Aguardar Aprovações

1. **Verificar Status:**
   - Vá para **"Transactions"** ou **"Queue"** no menu lateral
   - Você verá a transação pendente

2. **Aprovações Necessárias:**
   - Se sua Safe é **2 de 3**: precisa de mais 1 aprovação
   - Se sua Safe é **3 de 5**: precisa de mais 2 aprovações
   - Os outros signatários precisam aprovar também

3. **Notificar Signatários:**
   - Compartilhe o link da transação ou peça para eles acessarem o Safe
   - Eles verão a transação pendente e podem aprovar

---

### Passo 8: Executar a Transação

Quando tiver aprovações suficientes:

1. **Executar:**
   - Clique em **"Execute"** na transação
   - Confirme na sua wallet
   - Aguarde a confirmação na blockchain

2. **Aguardar Confirmação:**
   - A transação será processada na Polygon
   - Pode levar alguns segundos/minutos

---

## ✅ Verificação Após Execução

### Verificar no PolygonScan

1. Acesse: https://polygonscan.com/address/0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce

2. Vá em **"Contract"** → **"Read Contract"**

3. Chame a função `uri(uint256)` para cada badge:
   - **badgeId: 1** → Deve retornar: `https://fluxx.space/badges/1.json`
   - **badgeId: 2** → Deve retornar: `https://fluxx.space/badges/2.json`
   - **badgeId: 3** → Deve retornar: `https://fluxx.space/badges/3.json`
   - **badgeId: 4** → Deve retornar: `https://fluxx.space/badges/4.json`

### Verificar via Script

```bash
npx hardhat run scripts/updateBadgeURIs.js --network polygon
```

O script mostrará as URIs atuais de cada badge.

---

## ⚠️ Troubleshooting

### Problema: Não encontro a função `setBadgeURI`

**Solução:**
- Certifique-se de que o ABI foi carregado corretamente
- Tente carregar o ABI manualmente do arquivo `badgenft-abi.json`
- Verifique se o endereço do contrato está correto

### Problema: ABI não carrega automaticamente

**Solução:**
- O contrato pode não estar verificado no PolygonScan
- Carregue o ABI manualmente do arquivo `badgenft-abi.json`

### Problema: Transação falha

**Solução:**
- Verifique se o Safe tem POL suficiente para gas
- Verifique se você é signatário do Safe
- Verifique se os parâmetros estão corretos
- Veja o erro específico no PolygonScan

### Problema: Não consigo executar

**Solução:**
- Certifique-se de que tem aprovações suficientes
- Verifique o threshold do seu Safe (2 de 3, 3 de 5, etc.)
- Aguarde aprovação dos outros signatários

---

## 📋 Checklist Rápido

- [ ] Acessei o Gnosis Safe
- [ ] Abri o Transaction Builder
- [ ] Carreguei o contrato BadgeNFT
- [ ] Carreguei o ABI (se necessário)
- [ ] Criei transação 1 (Badge ID 1)
- [ ] Criei transação 2 (Badge ID 2)
- [ ] Criei transação 3 (Badge ID 3)
- [ ] Criei transação 4 (Badge ID 4)
- [ ] Revisei todas as transações
- [ ] Criei o batch
- [ ] Assinei a transação
- [ ] Notifiquei outros signatários (se necessário)
- [ ] Aguardei aprovações suficientes
- [ ] Executei a transação
- [ ] Verifiquei no PolygonScan

---

## 🔗 Links Úteis

- **Gnosis Safe:** https://app.safe.global/
- **Transaction Builder Direto:** https://app.safe.global/apps/open?safe=matic:0xF040BbD411542F09f775E974fA88E16bF7406d26&appUrl=https%3A%2F%2Fapps-portal.safe.global%2Ftx-builder
- **BadgeNFT no PolygonScan:** https://polygonscan.com/address/0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce
- **Safe no PolygonScan:** https://polygonscan.com/address/0xF040BbD411542F09f775E974fA88E16bF7406d26

---

## 💡 Dicas

1. **Salve o Batch:** Você pode salvar o batch antes de enviar para revisar depois
2. **Teste em Testnet:** Se possível, teste primeiro em Mumbai (testnet)
3. **Gas Estimado:** O Safe mostra o gas estimado antes de executar
4. **Histórico:** Todas as transações ficam registradas no histórico do Safe

---

**Boa sorte! 🚀**

Se tiver alguma dúvida durante o processo, consulte o guia completo em `ATUALIZAR_BADGE_URIS.md`.

