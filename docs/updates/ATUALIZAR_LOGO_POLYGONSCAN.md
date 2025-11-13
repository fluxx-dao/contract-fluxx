# 🖼️ Atualizar Logo do Token no PolygonScan

## 📋 Informações

**Contrato Token**: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`  
**Owner (Gnosis Safe)**: `0xF040BbD411542F09f775E974fA88E16bF7406d26`  
**URL da Imagem**: `https://gateway.lighthouse.storage/ipfs/bafkreicncteu57sjmxa4awtfvfal65hfr7oy5lx2zd35evqc2a2pkkcwe4`

---

## ✅ Importante: Ambas as Páginas Funcionam!

⚠️ **O formulário pode ser acessado de AMBAS as páginas**:
- ✅ **Página do Token**: https://polygonscan.com/token/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
- ✅ **Página do Contrato**: https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA

**Se você já enviou o formulário pela página do contrato e foi aceito, está tudo certo!** Não precisa fazer nada diferente. Ambas as páginas levam ao mesmo formulário e têm o mesmo resultado.

---

## 🔐 Como Assinar a Mensagem via Gnosis Safe

Como o owner do contrato é o **Gnosis Safe**, você precisa assinar a mensagem usando o Safe, não uma wallet individual.

### Opção 1: Via Interface do PolygonScan (Mais Simples)

⚠️ **IMPORTANTE**: O formulário pode ser acessado de **AMBAS as páginas**:
- ✅ **Página do Token**: https://polygonscan.com/token/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
- ✅ **Página do Contrato**: https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA

**Ambas funcionam!** Use a que você preferir ou onde encontrar o botão.

1. **Acesse qualquer uma das páginas acima**

2. **Procure por:**
   - **"More Options"** → **"Update Token Info"**
   - Ou **"Update Token Logo"**
   - Ou um botão **"Update Token Info"** na parte superior da página
   - Ou na página do contrato: **"Contract"** → **"More Options"** → **"Update Token Info"**

3. **Se pedir para assinar:**
   - Conecte sua wallet que é signatária do Gnosis Safe
   - A mensagem será: `I, hereby verify that I am the owner/creator of the address [0xB1430cc106bd664F68BE8d0167A52a29654CF8BA]`
   - Assine com sua wallet (que é signatária do Safe)

4. **Cole a URL da imagem:**
   ```
   https://gateway.lighthouse.storage/ipfs/bafkreicncteu57sjmxa4awtfvfal65hfr7oy5lx2zd35evqc2a2pkkcwe4
   ```

5. **Envie e aguarde confirmação**

---

### Opção 2: Via Gnosis Safe (Recomendado)

Se o PolygonScan não aceitar assinatura direta, você pode criar uma transação no Safe:

1. **Acesse o Gnosis Safe:**
   - https://app.safe.global/
   - Abra sua Safe: `0xF040BbD411542F09f775E974fA88E16bF7406d26`

2. **Crie uma transação:**
   - Clique em "New transaction"
   - Selecione "Contract interaction"

3. **Configure a transação:**
   - **To**: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (Token)
   - **Function**: Não há função no contrato para atualizar logo (é off-chain)
   - **Nota**: O logo é atualizado diretamente no PolygonScan, não via contrato

---

### Opção 3: Assinar Mensagem Manualmente

Se o PolygonScan pedir assinatura de mensagem:

1. **Use o MetaMask ou outra wallet:**
   - Conecte uma wallet que seja signatária do Gnosis Safe
   - Vá em "Account Details" → "Sign Message"

2. **Cole a mensagem:**
   ```
   I, hereby verify that I am the owner/creator of the address [0xB1430cc106bd664F68BE8d0167A52a29654CF8BA]
   ```

3. **Assine a mensagem**

4. **No PolygonScan:**
   - Cole a assinatura gerada
   - Cole a URL da imagem
   - Envie

---

## 📝 Passo a Passo Detalhado (Recomendado)

### 1. Acessar o PolygonScan

1. Vá para qualquer uma das páginas:
   - **Página do Token**: https://polygonscan.com/token/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
   - **Página do Contrato**: https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
   
   ⚠️ **Ambas funcionam!** O formulário está disponível em ambas.
   
2. Faça login na sua conta PolygonScan (se não tiver, crie uma)

### 2. Encontrar a Opção de Atualizar Logo

1. Na página do contrato, procure por:
   - **"More Options"** → **"Update Token Info"**
   - Ou **"Contract"** → **"Update Logo"**
   - Ou um botão **"Update Token Logo"**

### 3. Preencher os Dados

1. **URL da Imagem**: Cole:
   ```
   https://gateway.lighthouse.storage/ipfs/bafkreicncteu57sjmxa4awtfvfal65hfr7oy5lx2zd35evqc2a2pkkcwe4
   ```

2. **Assinatura da Mensagem**:
   - Se pedir para assinar, conecte sua wallet (signatária do Safe)
   - A mensagem será:
   ```
   I, hereby verify that I am the owner/creator of the address [0xB1430cc106bd664F68BE8d0167A52a29654CF8BA]
   ```
   - Assine com sua wallet

### 4. Enviar

1. Revise os dados
2. Clique em **"Submit"** ou **"Update"**
3. Aguarde confirmação

---

## ⚠️ Importante

- O **owner do contrato é o Gnosis Safe**, não uma wallet individual
- Você precisa usar uma **wallet que seja signatária do Safe** para assinar
- O PolygonScan pode aceitar assinatura de qualquer signatário do Safe
- Se não funcionar, pode ser necessário fazer via transação no Safe (mas geralmente não é necessário)

---

## 🔗 Links Úteis

- **Contrato Token**: https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
- **Gnosis Safe**: https://app.safe.global/
- **Imagem IPFS**: https://gateway.lighthouse.storage/ipfs/bafkreicncteu57sjmxa4awtfvfal65hfr7oy5lx2zd35evqc2a2pkkcwe4

---

## 💡 Dica

Se o PolygonScan não aceitar assinatura de signatário do Safe, você pode:
1. Verificar se há uma opção "I am a signer of the owner (Gnosis Safe)"
2. Ou entrar em contato com o suporte do PolygonScan
3. Ou usar uma ferramenta de assinatura de mensagem do Safe (se disponível)

---

Boa sorte! 🚀

