# 📁 Scripts - Organização

## 🚀 Scripts Principais (Ativos)

### Deploy
- `deploy.js` - Deploy principal dos contratos
- `deployManager.js` - Deploy do FluxxDAOManager

### Pool de Liquidez
- `criarPoolAmountsReduzidos.js` - **USAR ESTE** - Cria pool com amounts reduzidos (50 FLUXX + 5 USDC)
- `testarPoolSimples.js` - Valida parâmetros antes de executar
- `poolSafeTransactionReduzido.json` - **USAR ESTE** - JSON para importar no Safe

### Verificação
- `verificarTodosContratos.js` - Verifica todos os contratos no PolygonScan
- `verificarStatusContratos.js` - Verifica status de verificação

### Distribuição
- `distribuirFundadores.js` - Distribui tokens para fundadores
- `distribuirFundadores.json` - JSON com dados dos fundadores

### Badges
- `setBadgeURIs.js` - Configura URIs dos badges
- `setBadgeURIsViaSafe.js` - Configura URIs via Safe

## 📦 Scripts de Teste/Debug

- `testarPoolSimples.js` - Teste simples de validação
- `testTenderly.js` - Teste básico do Tenderly

## 🗄️ Scripts Arquivados

Scripts antigos/duplicados foram movidos para `scripts/archive/`:
- Versões antigas de criar pool
- Scripts de debug não mais usados
- Scripts de simulação obsoletos

