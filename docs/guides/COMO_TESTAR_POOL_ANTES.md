# 🧪 Como Testar a Criação da Pool ANTES de Executar na Mainnet

## ✅ Por Que Testar Antes?

- **Evitar erros caros** na mainnet
- **Validar parâmetros** antes de executar
- **Confirmar que tudo funciona** corretamente
- **Economizar gas** em testes

---

## 🚀 Métodos de Teste

### 1️⃣ Tenderly Fork (Recomendado) ⭐

**Vantagens:**
- ✅ Fork real da Polygon mainnet
- ✅ Contratos reais disponíveis
- ✅ Simulação precisa
- ✅ Interface visual no Tenderly

**Como usar:**

1. **Criar Fork no Tenderly:**
   - Acesse: https://dashboard.tenderly.co/
   - Vá em "Forks"
   - Clique em "Create Fork"
   - Selecione "Polygon"
   - Copie a URL do fork

2. **Configurar no `.env`:**
   ```bash
   TENDERLY_FORK_URL=https://rpc.tenderly.co/fork/SEU_FORK_ID
   ```

3. **Executar teste:**
   ```bash
   npx hardhat run scripts/testarPoolAntes.js --network tenderly
   ```

4. **Ver resultado no Tenderly:**
   - Acesse o fork no dashboard
   - Veja todas as transações
   - Analise gas usado
   - Verifique eventos emitidos

---

### 2️⃣ Hardhat Local Fork

**Vantagens:**
- ✅ Rápido e local
- ✅ Não precisa de API keys
- ✅ Controle total

**Como usar:**

1. **Configurar fork no `hardhat.config.js`:**
   ```javascript
   networks: {
     hardhat: {
       forking: {
         url: process.env.POLYGON_RPC_URL || "https://polygon-rpc.com",
         blockNumber: 79299518 // Opcional: fork de um bloco específico
       }
     }
   }
   ```

2. **Executar teste:**
   ```bash
   npx hardhat run scripts/testarPoolAntes.js --network hardhat
   ```

3. **Ver resultado:**
   - Logs no terminal
   - Transações simuladas localmente

---

### 3️⃣ Polygon Mumbai Testnet

**Vantagens:**
- ✅ Testnet oficial
- ✅ Ambiente real (mas sem valor real)
- ✅ Testa integração completa

**Desvantagens:**
- ⚠️ Precisa deployar contratos na Mumbai
- ⚠️ Tokens de teste necessários

**Como usar:**

1. **Configurar Mumbai no `hardhat.config.js`:**
   ```javascript
   networks: {
     mumbai: {
       url: process.env.MUMBAI_RPC_URL || "https://rpc-mumbai.maticvigil.com",
       accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
       chainId: 80001
     }
   }
   ```

2. **Deployar contratos na Mumbai:**
   ```bash
   npx hardhat run scripts/deploy.js --network mumbai
   ```

3. **Obter tokens de teste:**
   - Faucet de POL: https://faucet.polygon.technology/
   - Faucet de USDC: https://staging.aave.com/faucet/

4. **Executar teste:**
   ```bash
   npx hardhat run scripts/testarPoolAntes.js --network mumbai
   ```

---

## 📋 Script de Teste

O script `scripts/testarPoolAntes.js` faz automaticamente:

1. ✅ **Verifica saldos** (FLUXX e USDC)
2. ✅ **Aprova tokens** para o Position Manager
3. ✅ **Cria a pool** (createAndInitializePoolIfNecessary)
4. ✅ **Adiciona liquidez** (mint)

**Uso:**
```bash
# Tenderly Fork
npx hardhat run scripts/testarPoolAntes.js --network tenderly

# Hardhat Fork
npx hardhat run scripts/testarPoolAntes.js --network hardhat

# Mumbai Testnet
npx hardhat run scripts/testarPoolAntes.js --network mumbai
```

---

## 🔍 O Que Verificar no Teste

### ✅ Checklist:

- [ ] **Saldos suficientes** (50 FLUXX + 5 USDC)
- [ ] **Aprovações funcionaram** (sem erros)
- [ ] **Pool criada** (hash de transação válido)
- [ ] **Liquidez adicionada** (NFT position criada)
- [ ] **Sem erros** de overflow ou revert
- [ ] **Gas usado** dentro do esperado

---

## 🎯 Fluxo Recomendado

### Passo 1: Teste Local (Hardhat Fork)
```bash
npx hardhat run scripts/testarPoolAntes.js --network hardhat
```
**Objetivo:** Validar lógica rapidamente

### Passo 2: Teste no Tenderly
```bash
npx hardhat run scripts/testarPoolAntes.js --network tenderly
```
**Objetivo:** Simulação precisa com interface visual

### Passo 3: Executar na Mainnet
```bash
# Importar JSON no Safe Transaction Builder
scripts/poolSafeTransactionReduzido.json
```
**Objetivo:** Execução real na mainnet

---

## ⚠️ Diferenças Entre Teste e Mainnet

### Em Fork/Testnet:
- ✅ Você pode fazer transfer direto do contrato
- ✅ Não precisa ter tokens na wallet
- ✅ Pode usar `impersonateAccount` para testar como Safe

### Na Mainnet:
- ⚠️ Precisa ter tokens na Safe
- ⚠️ Precisa aprovar via Safe Transaction Builder
- ⚠️ Gas custa POL real

---

## 🐛 Troubleshooting

### Erro: "Insufficient balance"
**Solução:**
- Em fork: Faça transfer do contrato diretamente
- Em testnet: Use faucet para obter tokens

### Erro: "Pool already exists"
**Solução:**
- Normal se já testou antes
- O script continua e tenta adicionar liquidez

### Erro: "Overflow uint128"
**Solução:**
- Use amounts reduzidos (50 FLUXX + 5 USDC)
- Já implementado no script

### Erro: "GS013" (Safe)
**Solução:**
- Este erro só aparece na Safe
- No teste local, você usa sua wallet pessoal
- O teste valida a lógica, não a Safe especificamente

---

## 📊 Comparação dos Métodos

| Método | Velocidade | Precisão | Facilidade | Custo |
|--------|-----------|----------|------------|-------|
| **Tenderly Fork** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Grátis |
| **Hardhat Fork** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Grátis |
| **Mumbai Testnet** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ | Grátis |

**Recomendação:** Use **Tenderly Fork** para máxima precisão ou **Hardhat Fork** para velocidade.

---

## ✅ Após Teste Bem-Sucedido

1. **Confirme que tudo funcionou:**
   - Pool criada
   - Liquidez adicionada
   - Sem erros

2. **Execute na mainnet:**
   - Importe `poolSafeTransactionReduzido.json` no Safe
   - Revise todas as transações
   - Assine e execute

3. **Monitore:**
   - Acompanhe no PolygonScan
   - Verifique eventos emitidos
   - Confirme NFT position criada

---

## 📚 Arquivos Relacionados

- `scripts/testarPoolAntes.js` - Script de teste completo
- `scripts/poolSafeTransactionReduzido.json` - JSON para mainnet
- `docs/guides/RESOLVER_OVERFLOW_UINT128.md` - Solução do overflow

---

## 💡 Dica Final

**Sempre teste antes de executar na mainnet!**

O teste leva alguns minutos e pode economizar muito gas e evitar erros caros.

**Status:** Script de teste criado e pronto para usar ✅

