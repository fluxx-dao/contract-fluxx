# 🔧 Resolver: Uniswap Não Reconhece FLUXX

## 🚨 Problema

Você tem 100 FLUXX na wallet, mas o Uniswap mostra:

- ❌ "Saldo de FLUXX insuficiente"
- ❌ "0 FLUXX" no campo de depósito

---

## ✅ Soluções

### Solução 1: Atualizar Página e Reconectar

1. **Atualize a página:** `F5` ou `Ctrl + R`
2. **Desconecte a wallet** no Uniswap
3. **Reconecte a wallet**
4. **Verifique se aparece 100 FLUXX**

### Solução 2: Adicionar Token Manualmente

**Se FLUXX não aparecer automaticamente:**

1. **No Uniswap**, no campo de seleção de token
2. **Clique em:** "Manage token lists" ou "Import token"
3. **Cole o endereço:** `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`
4. **Adicione:**
   - Nome: FLUXX DAO
   - Símbolo: FLUXX
   - Decimais: 18
5. **Confirme e adicione**

### Solução 3: Verificar Rede

**Certifique-se de estar na Polygon:**

1. **No Uniswap**, verifique a rede no topo
2. **Deve mostrar:** "Polygon" ou "Polygon Mainnet"
3. **Se não estiver:**
   - Clique e selecione Polygon
   - Ou configure no MetaMask

### Solução 4: Verificar no PolygonScan

**Confirme que tem FLUXX na wallet:**

1. **Acesse:** https://polygonscan.com/address/0x3242FcE40be49b25DDBb86a7119E55De54b99d57
2. **Vá em:** "Token" ou "ERC-20 Token Txns"
3. **Procure por:** FLUXX
4. **Verifique o saldo**

**Se aparecer 100 FLUXX no PolygonScan:**
- O problema é só o Uniswap não reconhecendo
- Use Solução 1 ou 2

**Se NÃO aparecer 100 FLUXX no PolygonScan:**
- Os tokens não estão na wallet
- Precisa transferir da Safe primeiro

### Solução 5: Limpar Cache e Tentar Novamente

1. **Limpe o cache do navegador:**
   - `Ctrl + Shift + Delete` (Windows)
   - `Cmd + Shift + Delete` (Mac)
2. **Feche e abra o navegador**
3. **Acesse o Uniswap novamente**
4. **Reconecte a wallet**

### Solução 6: Usar Outro Navegador

1. **Tente em outro navegador:**
   - Chrome
   - Firefox
   - Brave
2. **Conecte a wallet**
3. **Tente criar a pool**

---

## 🔍 Verificação Rápida

**Execute este comando para verificar:**

```bash
npx hardhat run scripts/verificarSaldo.js --network polygon
```

(Vou criar este script para você)

---

## 💡 Dica: Adicionar Token no MetaMask

**Se estiver usando MetaMask:**

1. **Abra o MetaMask**
2. **Vá em:** "Import tokens"
3. **Cole:** `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`
4. **Adicione**
5. **Deve aparecer 100 FLUXX**

**Depois reconecte ao Uniswap.**

---

## 🎯 Passo a Passo Recomendado

1. **Verifique no PolygonScan:**
   - https://polygonscan.com/address/0x3242FcE40be49b25DDBb86a7119E55De54b99d57
   - Confirme que tem 100 FLUXX

2. **Se tiver no PolygonScan:**
   - Atualize página do Uniswap (F5)
   - Desconecte e reconecte wallet
   - Adicione token manualmente se necessário

3. **Se NÃO tiver no PolygonScan:**
   - Transfira 100 FLUXX da Safe para a wallet
   - Depois tente novamente

---

## 📋 Checklist de Verificação

- [ ] Verificado no PolygonScan (tem 100 FLUXX?)
- [ ] Página do Uniswap atualizada (F5)
- [ ] Wallet desconectada e reconectada
- [ ] Token FLUXX adicionado manualmente
- [ ] Rede: Polygon
- [ ] MetaMask mostra 100 FLUXX (se usar MetaMask)

---

## 🚀 Próximo Passo

**Primeiro, verifique no PolygonScan:**
https://polygonscan.com/address/0x3242FcE40be49b25DDBb86a7119E55De54b99d57

**Me diga:**
- Aparece 100 FLUXX no PolygonScan?
- Ou não aparece?

Com essa informação, posso ajudar melhor!

---

**Status:** Resolvendo problema de reconhecimento  
**Próximo passo:** Verificar no PolygonScan

