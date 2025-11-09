# ✅ Verificação: O que Precisa Ser Atualizado com o Novo Domínio

## 📊 Resumo Executivo

**Resposta curta:** **NÃO precisa mudar nada nos contratos agora.** Apenas atualizações opcionais quando necessário.

---

## 🔍 Análise Detalhada

### 1. **Contratos Inteligentes** ⚠️ (Opcional)

#### BadgeNFT - Base URI

**Status Atual:**

- ✅ Contrato já deployado: `0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce`
- ⚠️ Base URI foi definido no deploy (provavelmente `https://api.fluxx-dao.io/badges/` ou similar)
- ✅ O contrato **tem função** `setBadgeURI()` para atualizar URIs individuais

**Precisa Mudar?**

- ❌ **NÃO URGENTE** - O contrato funciona normalmente
- ✅ **OPCIONAL** - Você pode atualizar URIs individuais quando necessário usando `setBadgeURI()`

**Como atualizar (quando necessário):**

```javascript
// Via PolygonScan ou Hardhat
const badgeNFT = await ethers.getContractAt("BadgeNFT", "0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce");

// Atualizar URI de cada badge individualmente
await badgeNFT.setBadgeURI(1, "https://fluxx.space/badges/1.json");
await badgeNFT.setBadgeURI(2, "https://fluxx.space/badges/2.json");
await badgeNFT.setBadgeURI(3, "https://fluxx.space/badges/3.json");
await badgeNFT.setBadgeURI(4, "https://fluxx.space/badges/4.json");
```

**⚠️ Importante:**

- O `baseURI` original **não pode ser alterado** (foi definido no constructor)
- Mas você pode **sobrescrever** URIs individuais usando `setBadgeURI()`
- Isso só é necessário **quando você criar os arquivos JSON dos badges** em `https://fluxx.space/badges/`

#### Outros Contratos

**Token, Treasury, Governance, Membership, CollabEngine:**
- ✅ **NÃO têm URLs hardcoded**
- ✅ **NÃO precisam de atualização**
- ✅ Funcionam independentemente do domínio

---

### 2. **Scripts de Deploy** ✅ (Já Atualizado)

**Status:**

- ✅ `scripts/deploy.js` - `BADGE_BASE_URI` já atualizado para `https://fluxx.space/badges/`
- ✅ Novos deploys usarão automaticamente o novo domínio

**Nota:** Isso só afeta **novos deploys**. Contratos já deployados não são afetados.

---

### 3. **APIs e Backend** ❌ (Não Existe)

**Status:**
- ❌ **Não há APIs ou backend configurados no projeto**
- ❌ **Não há variáveis de ambiente** que precisem ser atualizadas
- ✅ **Nada para atualizar**

**Quando criar APIs no futuro:**
- Configure URLs usando `https://fluxx.space` ou `https://api.fluxx.space`
- Configure CORS para aceitar `fluxx.space` e `fluxx-app.com`

---

### 4. **Frontend/Landing Page** ⏳ (A Criar)

**Status:**
- ⏳ Landing page ainda não criada
- ✅ Quando criar, use `https://fluxx.space` como domínio principal

**O que incluir:**
- Footer com links de redes sociais
- Email: `fluxx-dao.web3@ethermail.io`
- Links para contratos no PolygonScan

---

### 5. **WebApp PWA (Futuro)** ⏳ (A Criar)

**Status:**
- ✅ Domínio `fluxx-app.com` já adquirido
- ⏳ Aplicação ainda não criada

**Quando criar:**
- Configure para usar `https://fluxx-app.com`
- Conecte com contratos na Polygon
- Use `https://fluxx.space/badges/` para metadados dos badges (se necessário)

---

## 📋 Checklist de Ações

### ✅ Já Feito
- [x] `scripts/deploy.js` atualizado com novo domínio
- [x] Documentação atualizada
- [x] Email configurado (`fluxx-dao.web3@ethermail.io`)

### ⏳ Quando Necessário (Não Urgente)
- [ ] Atualizar URIs dos badges no BadgeNFT (quando criar os arquivos JSON)
- [ ] Criar landing page em `fluxx.space`
- [ ] Criar WebApp PWA em `fluxx-app.com`

### ❌ Não Precisa Fazer
- ❌ Não precisa atualizar contratos agora
- ❌ Não precisa mudar nada nos contratos Token, Treasury, Governance, etc.
- ❌ Não há APIs para atualizar

---

## 🎯 Conclusão

### **Resposta Direta:**

**NÃO, você NÃO precisa mudar nada nos contratos agora.**

**Por quê?**
1. ✅ Os contratos funcionam independentemente do domínio
2. ✅ Apenas o BadgeNFT tem URLs, mas elas são opcionais (metadados)
3. ✅ Você pode atualizar URIs dos badges depois quando criar os arquivos JSON
4. ✅ Não há APIs ou backends que dependam do domínio

**Quando atualizar?**
- Quando você criar os arquivos JSON dos badges em `https://fluxx.space/badges/`
- Quando criar a landing page
- Quando criar o WebApp PWA

**O que já está pronto:**
- ✅ Scripts de deploy atualizados
- ✅ Documentação atualizada
- ✅ Email configurado
- ✅ Domínios adquiridos

---

## 💡 Recomendação

**Foque agora em:**
1. Criar a landing page em `fluxx.space`
2. Enviar formulário do PolygonScan
3. Criar os arquivos JSON dos badges (quando necessário)
4. Atualizar URIs dos badges no contrato (quando os JSONs estiverem prontos)

**Não se preocupe com:**
- ❌ Atualizar contratos agora
- ❌ Mudar código dos contratos
- ❌ Criar APIs imediatamente

---

**Última atualização:** Novembro 2025  
**Status:** ✅ Nada crítico precisa ser atualizado nos contratos

