# 🔄 Atualização de Domínio: fluxx.space

## ✅ Status

- ✅ Domínio `fluxx.space` adquirido
- ✅ DNS configurado na Vercel (ns1.vercel-dns.com, ns2.vercel-dns.com)
- ⏳ Aguardando propagação DNS

---

## 📋 Checklist de Atualização

### 1. **Documentação Atualizada** ✅

- [x] `FORMULARIO_TOKEN_UPDATE.md` - Atualizado com `https://fluxx.space`
- [x] `EMAIL_WEB3_SERVICOS.md` - Criado guia de serviços de email
- [x] `scripts/deploy.js` - Atualizado `BADGE_BASE_URI` para novos deploys

---

### 2. **Contratos Inteligentes** ⚠️

#### ⚠️ IMPORTANTE: URLs nos Contratos

**BadgeNFT Base URI:**
- **Status:** Já deployado com `https://api.fluxx-dao.io/badges/` (ou URL antiga)
- **Ação:** Se você quiser atualizar, precisa usar a função `setBadgeURI()` do contrato BadgeNFT
- **Endereço:** `0xAba2f3E32C0Fac859e21b7a8EcAAF173200F7Ce`

**Como atualizar Base URI do BadgeNFT:**

```javascript
// Via Hardhat console ou script
const BadgeNFT = await ethers.getContractAt("BadgeNFT", "0xAba2f3E32C0Fac859e21b7a8EcAAF173200F7Ce");
await BadgeNFT.setBadgeURI(1, "https://fluxx.space/badges/membro-ativo.json");
await BadgeNFT.setBadgeURI(2, "https://fluxx.space/badges/colaborador.json");
// ... etc
```

**OU atualizar Base URI global (se o contrato tiver essa função):**
```javascript
// Verificar se BadgeNFT tem função para atualizar baseURI
// Se não tiver, cada badge precisa ser atualizado individualmente
```

**⚠️ Nota:** Se o contrato BadgeNFT não tiver função para atualizar baseURI, você precisará atualizar cada badge individualmente usando `setBadgeURI()`.

---

### 3. **Scripts e Configurações** ✅

- [x] `scripts/deploy.js` - `BADGE_BASE_URI` atualizado para `https://fluxx.space/badges/`
  - **Nota:** Isso só afeta **novos deploys**. Contratos já deployados não são afetados.

---

### 4. **APIs e Backend** 📡

Se você tiver APIs ou backend:

- [ ] Atualizar URLs de API endpoints
- [ ] Atualizar CORS para aceitar `fluxx.space`
- [ ] Atualizar webhooks e callbacks
- [ ] Atualizar variáveis de ambiente

**Exemplo:**
```env
# .env
API_URL=https://api.fluxx.space
FRONTEND_URL=https://fluxx.space
BADGE_API_URL=https://fluxx.space/badges
```

---

### 5. **Frontend e Site** 🌐

- [ ] Atualizar todas as referências ao domínio antigo
- [ ] Atualizar links internos
- [ ] Atualizar meta tags (Open Graph, Twitter Cards)
- [ ] Atualizar sitemap.xml
- [ ] Atualizar robots.txt

**Meta tags exemplo:**
```html
<meta property="og:url" content="https://fluxx.space" />
<meta property="og:site_name" content="FLUXX DAO" />
<link rel="canonical" href="https://fluxx.space" />
```

---

### 6. **Serviços Externos** 🔗

#### PolygonScan
- [ ] Atualizar formulário de token update (ver `FORMULARIO_TOKEN_UPDATE.md`)
- [ ] Website: `https://fluxx.space`
- [ ] Email: `fluxx-dao.web3@ethermail.io` ✅

#### CoinGecko / CoinMarketCap (quando listar)
- [ ] Website: `https://fluxx.space`
- [ ] Links sociais atualizados

#### Redes Sociais
- [x] Twitter/X: https://x.com/fluxxdao ✅
- [x] Instagram: https://www.instagram.com/fluxxdao/ ✅
- [x] Telegram: https://t.me/fluxxdao ✅
- [ ] Adicionar links no footer do site

---

### 7. **Email Empresarial** 📧

**Status:** ✅ Configurado

**Email:** `fluxx-dao.web3@ethermail.io`  
**Serviço:** Ethermail.io (Web3 email)

**Próximos passos:**
- [x] Email configurado
- [ ] Adicionar email no footer do site
- [ ] Adicionar página de contato (opcional)

---

## 🔍 Verificação de Propagação DNS

**Como verificar se o DNS está funcionando:**

```bash
# Verificar DNS
dig fluxx.space
nslookup fluxx.space

# Verificar propagação global
# Use: https://www.whatsmydns.net/#A/fluxx.space
```

**Tempo esperado:** 1-48 horas (geralmente 1-2 horas)

---

## 📝 URLs que Precisam Ser Atualizadas

### No Código:
- ✅ `scripts/deploy.js` - `BADGE_BASE_URI` → `https://fluxx.space/badges/`

### Em Contratos (se necessário):
- ⚠️ BadgeNFT Base URI (via função `setBadgeURI()` se disponível)

### Em Documentação:
- ✅ `FORMULARIO_TOKEN_UPDATE.md` - Website atualizado

### Em Serviços Externos:
- ⏳ PolygonScan (quando enviar formulário)
- ⏳ Site/Vercel (quando criar)
- ⏳ Redes sociais (quando atualizar)

---

## 🚀 Próximos Passos Imediatos

1. **Aguardar propagação DNS** (1-2 horas)
2. **Configurar email empresarial** (Google Workspace recomendado)
3. **Criar site básico** na Vercel com domínio `fluxx.space`
4. **Atualizar BadgeNFT URIs** (se necessário) via contrato
5. **Enviar formulário PolygonScan** com novo domínio

---

## ⚠️ Notas Importantes

### Sobre Contratos Deployados

- **BadgeNFT Base URI:** Se foi deployado com URL antiga, você pode atualizar via função `setBadgeURI()` do contrato
- **Outros contratos:** Token, Treasury, Governance, Membership, CollabEngine **não têm URLs hardcoded** - não precisam atualização

### Sobre Novos Deploys

- O `scripts/deploy.js` já está atualizado
- Novos deploys usarão automaticamente `https://fluxx.space/badges/`

---

**Última atualização:** Novembro 2025  
**Status:** ✅ Domínio configurado, aguardando propagação DNS

