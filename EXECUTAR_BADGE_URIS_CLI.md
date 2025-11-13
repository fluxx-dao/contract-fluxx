# 🚀 Executar Configuração de Badge URIs via CLI

## ✅ Arquivo JSON Gerado

O script gerou o arquivo `badge-uris-transactions.json` com todas as 4 transações prontas.

---

## 📋 Opção 1: Importar no Safe Transaction Builder (Mais Fácil)

1. **Acesse o Safe Transaction Builder:**
   https://app.safe.global/apps/open?safe=matic:0xF040BbD411542F09f775E974fA88E16bF7406d26&appUrl=https%3A%2F%2Fapps-portal.safe.global%2Ftx-builder

2. **Importe o arquivo:**
   - Clique em "Import" ou "Import JSON"
   - Selecione o arquivo `badge-uris-transactions.json`
   - As 4 transações serão importadas automaticamente

3. **Revise e execute:**
   - Revise todas as transações
   - Assine e aguarde aprovações
   - Execute quando tiver aprovações suficientes

---

## 📋 Opção 2: Safe CLI (Se você tem Safe CLI instalado)

### Pré-requisitos:
- Safe CLI instalado: `npm install -g @safe-global/safe-cli`
- Configurado com sua Safe

### Comandos:

```bash
# Para cada badge, execute:

# Badge 1
safe-cli send \
  --safe 0xF040BbD411542F09f775E974fA88E16bF7406d26 \
  --to 0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd \
  --data "0x65fb1ee2000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000042697066733a2f2f6261666b7265696678336f7979677235656b7477776e65327a793233626f656663616a336235367432676d71656434327a78706d6e713536787065000000000000000000000000000000000000000000000000000000000000" \
  --network polygon

# Badge 2
safe-cli send \
  --safe 0xF040BbD411542F09f775E974fA88E16bF7406d26 \
  --to 0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd \
  --data "0x65fb1ee2000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000042697066733a2f2f6261666b726569626f6468736d7462656267707978796e6a6535376f62743375646672667069327537756f67773675357435666a656c696c677271000000000000000000000000000000000000000000000000000000000000" \
  --network polygon

# Badge 3
safe-cli send \
  --safe 0xF040BbD411542F09f775E974fA88E16bF7406d26 \
  --to 0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd \
  --data "0x65fb1ee2000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000042697066733a2f2f6261666b72656968366f6836637661633737786b66796c726375716967723578766a75627a366d76623768717a73707366683765616c7964707679000000000000000000000000000000000000000000000000000000000000" \
  --network polygon

# Badge 4
safe-cli send \
  --safe 0xF040BbD411542F09f775E974fA88E16bF7406d26 \
  --to 0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd \
  --data "0x65fb1ee2000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000042697066733a2f2f6261666b7265696278647a76677562736a62717036797474633571656e6437706d72627562696c646f6d6c687861613271736b6961676a616d6369000000000000000000000000000000000000000000000000000000000000" \
  --network polygon
```

---

## 📋 Opção 3: Executar Diretamente (Se você é signatário do Safe)

Se você tem uma wallet que é signatária do Safe e quer executar diretamente:

```bash
# Execute o script (ele tentará executar, mas falhará se não for owner)
npx hardhat run scripts/setBadgeURIs.js --network polygon
```

**Nota:** Como o owner é o Safe, isso só funcionará se você usar uma wallet que seja signatária e execute via Safe.

---

## ✅ Verificar Após Executar

Após executar as transações, verifique no PolygonScan:

https://polygonscan.com/address/0xC25F373B2535F49Ca474dE76EfC9688e06d668Fd#readContract

Chame `badgeURIs(uint256)` com IDs 1, 2, 3, 4.

---

## 📝 Resumo

- ✅ Arquivo JSON gerado: `badge-uris-transactions.json`
- ✅ 4 transações prontas para importar no Safe
- ✅ Comandos CLI prontos (se usar Safe CLI)
- ⏳ **Próximo:** Importar no Safe Transaction Builder ou executar via CLI

---

**Recomendação:** Use a **Opção 1** (importar no Safe Transaction Builder) - é mais fácil e visual!

