# ✅ Executar Configuração de Badge URIs - AGORA

## 🎯 Método Mais Simples e Confiável

Como o Safe SDK está com problemas de dependências, use o método mais direto:

---

## 📋 Opção Recomendada: Importar JSON no Safe

### 1. Acesse o Safe Transaction Builder

🔗 **Link direto:**
https://app.safe.global/apps/open?safe=matic:0xF040BbD411542F09f775E974fA88E16bF7406d26&appUrl=https%3A%2F%2Fapps-portal.safe.global%2Ftx-builder

### 2. Importe o Arquivo JSON

1. No Safe Transaction Builder, clique em **"Import"** ou **"Import JSON"**
2. Selecione o arquivo: **`badge-uris-transactions.json`**
3. As 4 transações serão importadas automaticamente:
   - Badge 1 (Membro Ativo)
   - Badge 2 (Colaborador)
   - Badge 3 (Aplicador)
   - Badge 4 (Referral)

### 3. Revise e Execute

1. Revise todas as transações
2. Clique em **"Create batch"** ou **"Create transaction"**
3. Assine a transação
4. Aguarde aprovações (se necessário)
5. Execute quando tiver aprovações suficientes

---

## ✅ Verificar Após Executar

Após executar, verifique no PolygonScan:

https://polygonscan.com/address/0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd#readContract

Chame `badgeURIs(uint256)` com:
- ID `1` → deve retornar `ipfs://bafkreifx3oyygr5ektwwne2zy23boefcaj3b56t2gmqed42zxpmnq56xpe`
- ID `2` → deve retornar `ipfs://bafkreibodhsmtbebgpyxynje57obt3udfrfpi2u7uogw6u5t5fjelilgrq`
- ID `3` → deve retornar `ipfs://bafkreih6oh6cvac77xkfylrcuqigr5xvjubz6mvb7hqzspsfh7ealydpvy`
- ID `4` → deve retornar `ipfs://bafkreibxdzvgubsjbqp6yttc5qend7pmrbubildomlhxaa2qskiagjamci`

---

## 📝 Resumo

- ✅ Arquivo JSON gerado: `badge-uris-transactions.json`
- ✅ 4 transações prontas para importar
- ✅ Método mais simples e confiável
- ⏳ **Próximo:** Importar no Safe Transaction Builder

---

**Status:** ✅ Pronto para executar!

