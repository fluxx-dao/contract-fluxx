# 🛡️ Configuração do Gnosis Safe - FLUXX DAO

## 📋 Visão Geral

O **Gnosis Safe** será o **owner** de todos os contratos da FLUXX DAO. Isso garante que nenhuma ação administrativa pode ser feita por uma única pessoa - requer aprovação de múltiplos signatários.

## 🎯 Por que usar Gnosis Safe?

- ✅ **Segurança**: Requer múltiplas assinaturas para qualquer ação administrativa
- ✅ **Descentralização**: Nenhuma pessoa tem controle total
- ✅ **Transparência**: Todas as ações ficam registradas no Safe
- ✅ **Flexibilidade**: Pode adicionar/remover signatários via governança

## 📝 Passo a Passo

### 1. Criar o Gnosis Safe

1. Acesse: **https://app.safe.global/**
2. Conecte sua wallet (MetaMask, WalletConnect, etc.)
3. Selecione a rede: **Polygon**
4. Clique em **"Create new Safe"**

### 2. Configurar Signatários

**Recomendação: 2 de 3 ou 3 de 5**

- **2 de 3**: Mais simples, 2 pessoas precisam aprovar
- **3 de 5**: Mais seguro, 3 pessoas precisam aprovar

**Adicione os endereços dos signatários:**

- Você (fundador)
- Conselheiro 1
- Conselheiro 2
- (Opcional) Conselheiro 3
- (Opcional) Conselheiro 4

### 3. Configurar Threshold

- **Threshold**: Número mínimo de assinaturas necessárias
- Exemplo: Se tiver 3 signatários, threshold = 2 (2 de 3)
- Exemplo: Se tiver 5 signatários, threshold = 3 (3 de 5)

### 4. Revisar e Criar

- Revise todas as informações
- Confirme a criação do Safe
- **IMPORTANTE**: Anote o endereço do Safe (começa com `0x...`)

### 5. Adicionar ao .env

Copie o endereço do Safe e adicione no seu `.env`:

```bash
GNOSIS_SAFE_ADDRESS=0xSeuEnderecoDoSafeAqui
```

## ⚠️ Importante

1. **O Safe precisa ter POL** para pagar gas das transações administrativas
   - ✅ **POL** é o token nativo da Polygon PoS (desde setembro de 2024)
   - ❌ **MATIC** não é mais usado na Polygon PoS
   - Você precisa de **POL** (não MATIC) para pagar gas na rede Polygon
   - Se você ainda tem MATIC, migre para POL via Polygon Portal
2. **Cada ação administrativa** (como `authorizeMinter`, `setGovernance`) precisará ser aprovada pelos signatários
3. **O deploy inicial** é feito pela wallet normal, mas o **owner** será o Safe

## 🔄 Adicionar Signatários Após a Criação

Se você já criou a Safe (como na imagem) e precisa adicionar mais signatários:

1. **Acesse sua Safe** no app.safe.global (você já está lá!)
2. **Clique em "Settings"** (Configurações) no menu lateral esquerdo
3. **Clique em "Owners"** (Proprietários/Signatários)
4. **Clique no botão "+" ou "Add owner"** (Adicionar proprietário)
5. **Digite o endereço** do novo signatário (0x...)
6. **Revise e confirme** a transação
7. **A transação aparecerá em "Pending transactions"** (no painel direito) para os signatários atuais aprovarem
8. **Após aprovação suficiente** (threshold), o novo signatário será adicionado

**Para alterar o threshold** (ex: de 1 de 2 para 2 de 3):
1. Vá em **Settings → Owners**
2. Clique em **"Change threshold"** ou no número atual do threshold
3. Defina o novo número mínimo de assinaturas
4. Confirme e aguarde aprovação dos signatários

**Exemplo prático:**
- Se você tem 1 signatário agora e quer 2 de 3:
  1. Adicione 2 novos signatários (total = 3)
  2. Altere threshold para 2
  3. Agora precisa de 2 assinaturas de 3 para qualquer ação

## 🔄 Após o Deploy

Após fazer o deploy dos contratos, você precisará executar as seguintes configurações **via Gnosis Safe**:

1. `Token.authorizeMinter(Treasury)` - Autorizar Treasury a mintar tokens
2. `Token.authorizeMinter(Governance)` - Autorizar Governance a mintar tokens
3. `Treasury.setGovernance(Governance)` - Conectar Treasury com Governance
4. `BadgeNFT.authorizeMinter(Membership)` - Autorizar Membership a mintar badges
5. `BadgeNFT.authorizeMinter(CollabEngine)` - Autorizar CollabEngine a mintar badges

Cada uma dessas ações precisará ser:
1. Criada como transação no Safe
2. Assinada pelos signatários necessários (2 de 3 ou 3 de 5)
3. Executada após aprovação

## 📚 Recursos

- **Documentação Gnosis Safe**: https://docs.safe.global/
- **App Safe**: https://app.safe.global/
- **Polygon Safe**: https://app.safe.global/welcome?chain=polygon

## 🔒 Segurança

- ✅ Use wallets hardware (Ledger, Trezor) para os signatários
- ✅ Distribua as chaves entre pessoas confiáveis
- ✅ Configure threshold adequado (não muito baixo, não muito alto)
- ✅ Mantenha backup das informações do Safe

