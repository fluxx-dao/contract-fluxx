# 🚀 Tenderly - Início Rápido

## ⚡ Setup em 5 Minutos

### 1. Instalar Plugin

```bash
npm install --save-dev @tenderly/hardhat-tenderly
```

### 2. Criar Conta no Tenderly

1. Acesse: https://tenderly.co/
2. Crie uma conta gratuita
3. Crie um projeto: "fluxx-dao"

### 3. Obter Token de Acesso

1. No Tenderly: **Settings → Authorization**
2. Gere um **Access Token**
3. Adicione no `.env`:

```bash
TENDERLY_ACCESS_TOKEN=seu_token_aqui
TENDERLY_PROJECT=fluxx-dao
TENDERLY_USERNAME=seu-usuario
```

### 4. Instalar Plugin (se ainda não instalou)

```bash
npm install --save-dev @tenderly/hardhat-tenderly
```

**Nota:** A autenticação é automática via variáveis de ambiente. Não é necessário fazer login manual.

**⚠️ Aviso:** Se você ver "Tenderly config doesn't exist", isso é normal. O plugin funciona mesmo assim usando as variáveis do `.env`.

### 5. Testar Integração (Recomendado Primeiro)

```bash
npx hardhat run scripts/testTenderly.js --network polygon
```

Este script testa a integração usando os contratos já deployados, sem precisar de `deployment-info.json`.

### 6. Verificar Contratos (Se tiver deployment-info.json)

```bash
npx hardhat run scripts/verifyTenderly.js --network polygon
```

### 7. Testar Simulação

```bash
npx hardhat run scripts/simulateTransaction.js --network polygon
```

---

## 📊 Funcionalidades Principais

### ✅ Verificação de Contratos
- Código-fonte verificado no Tenderly
- Interface visual para debugging

### ✅ Simulação de Transações
- Teste transações antes de executar
- Veja exatamente o que aconteceria

### ✅ Monitoramento
- Alertas em tempo real
- Dashboard com todas as transações

### ✅ Debugging
- Stack traces detalhados
- Variáveis em cada step
- Identifique erros rapidamente

---

## 🔗 Links

- **Dashboard:** https://dashboard.tenderly.co/
- **Guia Completo:** `docs/guides/GUIA_TENDERLY.md`
- **Documentação:** https://docs.tenderly.co/

---

**Pronto!** Agora você pode usar o Tenderly para monitorar e debugar seus contratos.

