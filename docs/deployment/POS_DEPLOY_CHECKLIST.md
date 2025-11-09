# ✅ Checklist Pós-Deploy - FLUXX DAO

## 🎯 Configurações Obrigatórias

Após fazer deploy de todos os contratos, você precisa configurar as permissões para que o sistema funcione corretamente.

---

## 📋 Ordem de Execução

### 1️⃣ **BadgeNFT** → Autorizar Minters

**Objetivo:** Permitir que Membership e CollabEngine possam mintar badges.

```solidity
// No contrato BadgeNFT
badgeNFT.authorizeMinter(enderecoMembership);
badgeNFT.authorizeMinter(enderecoCollabEngine);
```

**Transações necessárias:**
- [ ] `BadgeNFT.authorizeMinter(Membership)` 
- [ ] `BadgeNFT.authorizeMinter(CollabEngine)`

---

### 2️⃣ **Token** → Autorizar Minters

**Objetivo:** Permitir que Treasury e Governance possam mintar novos tokens (inflação controlada).

```solidity
// No contrato Token
token.authorizeMinter(enderecoTreasury);  // Opcional - se Treasury precisar mintar
token.authorizeMinter(enderecoGovernance); // Para Governance poder mintar via propostas
```

**Transações necessárias:**
- [ ] `Token.authorizeMinter(Governance)` - **OBRIGATÓRIO**
- [ ] `Token.authorizeMinter(Treasury)` - **OPCIONAL** (se necessário)

---

### 3️⃣ **Treasury** → Configurar Governance

**Objetivo:** Permitir que Governance possa autorizar saques do Treasury.

```solidity
// No contrato Treasury
treasury.setGovernance(enderecoGovernance);
```

**Transações necessárias:**
- [ ] `Treasury.setGovernance(Governance)` - **OBRIGATÓRIO**

---

## 📊 Resumo das Permissões

| Contrato | Função | Endereço Alvo | Status |
|----------|--------|---------------|--------|
| **BadgeNFT** | `authorizeMinter()` | Membership | ⬜ Pendente |
| **BadgeNFT** | `authorizeMinter()` | CollabEngine | ⬜ Pendente |
| **Token** | `authorizeMinter()` | Governance | ⬜ Pendente |
| **Treasury** | `setGovernance()` | Governance | ⬜ Pendente |

---

## 🔍 Como Verificar se Está Configurado

### Verificar BadgeNFT:
```solidity
badgeNFT.authorizedMinter(enderecoMembership); // deve retornar true
badgeNFT.authorizedMinter(enderecoCollabEngine); // deve retornar true
```

### Verificar Token:
```solidity
token.authorizedMinters(enderecoGovernance); // deve retornar true
```

### Verificar Treasury:
```solidity
treasury.governanceContract(); // deve retornar enderecoGovernance
```

---

## ⚠️ Importante

1. **Todas essas transações devem ser feitas pela wallet owner** de cada contrato
2. **Ordem importa:** Configure BadgeNFT primeiro, depois Token, depois Treasury
3. **Verifique cada transação** no PolygonScan antes de prosseguir
4. **Salve os endereços** de todos os contratos deployados

---

## 🚀 Após Configuração

Uma vez que todas as permissões estiverem configuradas:

- ✅ **Membership** pode registrar membros e mintar badges
- ✅ **CollabEngine** pode criar missões e mintar badges
- ✅ **Governance** pode criar propostas e mintar tokens (se aprovado)
- ✅ **Treasury** pode sacar fundos via propostas aprovadas

---

## 📝 Próximos Passos

1. [ ] Verificar todos os contratos no PolygonScan
2. [ ] Fazer verificação dos contratos (se tiver POLYGONSCAN_API_KEY)
3. [ ] Testar registro de primeiro membro via Membership
4. [ ] Documentar endereços dos contratos deployados
5. [ ] Considerar transferir ownership para multisig (futuro)

---

**Status:** ⬜ Aguardando configuração pós-deploy
**Data:** Novembro 2025

