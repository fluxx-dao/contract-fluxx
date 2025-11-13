# ✅ Resumo: Configurar Badge URIs via CLI

## 🎯 Status

✅ **Arquivo JSON gerado:** `badge-uris-transactions.json`  
✅ **Script CLI atualizado:** `scripts/updateBadgeURIsViaSafe.js`  
✅ **URIs IPFS confirmadas:** Todas as 4 URIs estão corretas

---

## 🚀 Opções para Executar

### Opção 1: Via CLI com Safe SDK (Recomendado)

**Pré-requisito:** Instalar dependência faltante:
```bash
npm install @safe-global/safe-ethers-lib
```

**Executar:**
```bash
npx hardhat run scripts/updateBadgeURIsViaSafe.js --network polygon
```

**O que faz:**
- Conecta ao Safe automaticamente
- Cria e propõe as 4 transações
- Você só precisa aprovar no Safe Web App

---

### Opção 2: Importar JSON no Safe (Mais Fácil)

1. Acesse: https://app.safe.global/apps/open?safe=matic:0xF040BbD411542F09f775E974fA88E16bF7406d26&appUrl=https%3A%2F%2Fapps-portal.safe.global%2Ftx-builder

2. Clique em **"Import"** ou **"Import JSON"**

3. Selecione o arquivo: `badge-uris-transactions.json`

4. As 4 transações serão importadas automaticamente

5. Revise, assine e execute

---

## 📋 Hashes IPFS Confirmados

- **Badge 1 (Membro Ativo):** `bafkreifx3oyygr5ektwwne2zy23boefcaj3b56t2gmqed42zxpmnq56xpe`
- **Badge 2 (Colaborador):** `bafkreibodhsmtbebgpyxynje57obt3udfrfpi2u7uogw6u5t5fjelilgrq`
- **Badge 3 (Aplicador):** `bafkreih6oh6cvac77xkfylrcuqigr5xvjubz6mvb7hqzspsfh7ealydpvy`
- **Badge 4 (Referral):** `bafkreibxdzvgubsjbqp6yttc5qend7pmrbubildomlhxaa2qskiagjamci`

---

## ✅ Verificar Após Executar

https://polygonscan.com/address/0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd#readContract

Chame `badgeURIs(uint256)` com IDs 1, 2, 3, 4.

---

## 📝 Arquivos Criados

1. `badge-uris-transactions.json` - JSON para importar no Safe
2. `scripts/updateBadgeURIsViaSafe.js` - Script CLI atualizado
3. `EXECUTAR_BADGE_URIS_VIA_CLI.md` - Guia completo CLI
4. `EXECUTAR_BADGE_URIS_CLI.md` - Guia alternativo

---

**Recomendação:** Use a **Opção 2** (importar JSON) se quiser algo mais visual e fácil!

