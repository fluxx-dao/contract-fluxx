# 🔥 POOL DE IGNIÇÃO - FLUXX/USDC

## 🎯 Objetivo

Criar a primeira pool FLUXX/USDC, ancorada no **Preço de Fundação ($0.10 USD)**, garantindo coerência com o Membership v0.5.1 e preparando o caminho para a v0.5.2 (Oracle).

---

## 1. O PRINCÍPIO SAGRADO

O preço de fundação é inviolável:

**1 FLUXX = 0.10 USDC**

Portanto, com **10 USDC**, você precisa colocar:

**100 FLUXX**

Nada mais. Nada menos.
Excesso distorce. Falta quebra.
Esse é o ritual mínimo.

---

## 2. DEX OFICIAL

**→ Uniswap v3 (Polygon)**

### Por quê?

- ✅ Maior credibilidade
- ✅ Compatível com futuros oráculos
- ✅ Caminhos limpos para agregadores
- ✅ "Nascer no templo certo"

**Link:** https://app.uniswap.org/

---

## 3. CONFIGURAÇÃO DO POOL

| Parâmetro | Valor |
|-----------|-------|
| **Par** | `FLUXX / USDC` |
| **Fee Tier** | `0.30%` (standard para tokens emergentes) |
| **Range** | `Full Range` (evita distorções violentas com pouca liquidez) |
| **Preço Inicial** | `1 FLUXX = 0.10 USDC` |
| **Quantidade Inicial** | 100 FLUXX + 10 USDC |

---

## 4. PASSO A PASSO PRÁTICO - VIA SAFE

### ⚠️ IMPORTANTE: Preparar a Safe

A Safe precisa ter:

- ✅ **10 USDC** (Polygon) - Transferir para a Safe se necessário
- ✅ **100 FLUXX** - Já está no Treasury, vamos transferir para a Safe
- ✅ **MATIC suficiente** para o gás (~0.05-0.1 POL para múltiplas transações)

**Safe Address:** `0xF040BbD411542F09f775E974fA88E16bF7406d26`

---

### (A) Preparar Tokens na Safe

#### Passo 1: Transferir 100 FLUXX para a Safe

**Se o FLUXX ainda não estiver na Safe:**

1. Acesse: https://app.safe.global/
2. Conecte sua wallet (signatário do Safe)
3. Rede: **Polygon**
4. Safe: `0xF040BbD411542F09f775E974fA88E16bF7406d26`
5. Crie nova transação:
   - **To:** `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (Token FLUXX)
   - **Function:** `transfer(address to, uint256 amount)`
   - **Parâmetros:**
     - `to`: `0xF040BbD411542F09f775E974fA88E16bF7406d26` (a própria Safe)
     - `amount`: `100000000000000000000` (100 FLUXX em wei)
6. Assine e execute

**📋 Guia completo:** Veja `docs/transactions/TRANSFERIR_FLUXX_SAFE.md`

#### Passo 2: Transferir 10 USDC para a Safe

**Se o USDC ainda não estiver na Safe:**

1. Na mesma Safe, crie nova transação:
   - **To:** `0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174` (USDC Polygon)
   - **Function:** `transfer(address to, uint256 amount)`
   - **Parâmetros:**
     - `to`: `0xF040BbD411542F09f775E974fA88E16bF7406d26` (a própria Safe)
     - `amount`: `10000000` (10 USDC - USDC tem 6 decimais)

---

### (B) Criar Pool via Uniswap Interface (Recomendado)

**Método mais simples:** Usar a interface do Uniswap conectada à Safe.

1. **Acesse:** https://app.uniswap.org/
2. **Conecte a Safe:**
   - Clique em "Connect Wallet"
   - Selecione "WalletConnect"
   - Escaneie o QR code com o app Safe no celular
   - OU use a extensão Safe no navegador (se disponível)
3. **Rede:** **Polygon**
4. **Navegue:** *Pool → New Position*
5. **Selecione o par:**
   - Token 0: **USDC** (Polygon)
   - Token 1: **FLUXX** 
     - Endereço: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`
     - Se não aparecer, adicione manualmente
6. **Escolha o fee tier:** `0.30%`
7. **Defina o range:** `Full Range (∞ a ∞)`
8. **Defina o preço inicial:**
   - *"Set Initial Price"*
   - **1 FLUXX = 0.10 USDC**
   - Ou: **0.10** (preço em USDC por FLUXX)
9. **Adicione liquidez:**
   - **10 USDC**
   - **100 FLUXX**
10. **Revise e confirme:**
    - Verifique que o preço está correto: **0.10 USDC por FLUXX**
    - Verifique as quantidades: **10 USDC + 100 FLUXX**
11. **Confirme a transação**
    - A transação será criada na Safe
    - Aguarde aprovações dos signatários
    - Execute quando tiver aprovações suficientes
12. **Receba o token de LP na Safe**

✅ **Pronto!** FLUXX agora existe como ativo vivo no mercado.

---

### (C) Criar Pool via Safe Transaction Builder (Avançado)

**Método alternativo:** Criar transações diretas no Safe usando os contratos do Uniswap.

**⚠️ Este método é mais complexo. Use apenas se a interface do Uniswap não funcionar com a Safe.**

#### Endereços do Uniswap v3 na Polygon:

- **Factory:** `0x1F98431c8aD98523631AE4a59f267346ea31F984`
- **NonfungiblePositionManager:** `0xC36442b4a4522E871399CD717aBDD847Ab11FE88`

#### Transações necessárias (via Safe Transaction Builder):

1. **Aprovar FLUXX para Position Manager:**
   - **To:** `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (Token FLUXX)
   - **Function:** `approve(address spender, uint256 amount)`
   - **Parâmetros:**
     - `spender`: `0xC36442b4a4522E871399CD717aBDD847Ab11FE88` (Position Manager)
     - `amount`: `100000000000000000000` (100 FLUXX)

2. **Aprovar USDC para Position Manager:**
   - **To:** `0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174` (USDC)
   - **Function:** `approve(address spender, uint256 amount)`
   - **Parâmetros:**
     - `spender`: `0xC36442b4a4522E871399CD717aBDD847Ab11FE88` (Position Manager)
     - `amount`: `10000000` (10 USDC)

3. **Criar Pool e Adicionar Liquidez:**
   - **To:** `0xC36442b4a4522E871399CD717aBDD847Ab11FE88` (Position Manager)
   - **Function:** `mint(INonfungiblePositionManager.MintParams params)`
   - **Parâmetros:** (complexo - requer struct)
     - `token0`: `0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174` (USDC)
     - `token1`: `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA` (FLUXX)
     - `fee`: `3000` (0.30% = 3000 bps)
     - `tickLower`: `-887272` (Full Range inferior)
     - `tickUpper`: `887272` (Full Range superior)
     - `amount0Desired`: `10000000` (10 USDC)
     - `amount1Desired`: `100000000000000000000` (100 FLUXX)
     - `amount0Min`: `0` (slippage mínimo)
     - `amount1Min`: `0` (slippage mínimo)
     - `recipient`: `0xF040BbD411542F09f775E974fA88E16bF7406d26` (Safe)
     - `deadline`: timestamp futuro (ex: `9999999999`)

**⚠️ Recomendação:** Use o método (B) via interface do Uniswap, é muito mais simples e seguro.

---

## 5. ONDE GUARDAR O TOKEN LP

Com tão pouca liquidez, não faz sentido travar.

**Recomendado:**

**→ Guardar o LP na Safe (`0xF040BbD411542F09f775E974fA88E16bF7406d26`).**

O token de LP (NFT no Uniswap v3) será recebido diretamente na Safe após a criação da pool.

Quando tivermos liquidez institucional (mais USDC e milhões de FLUXX), aí sim movemos para a Treasury e aplicamos locking.

---

## 6. CONSEQUÊNCIAS IMEDIATAS DA IGNIÇÃO

✅ O preço de fundação ($0.10) vira o preço real no mercado  
✅ FLUXX passa a aparecer em agregadores e wallets  
✅ Permite integrar Chainlink na v0.5.2  
✅ Abre caminho para volume futuro  
✅ Cria o "nascer do token" de forma respeitosa com o design econômico  
✅ Swap fica permitido e não causa ruído estrutural  

**O token agora respira.**

---

## 7. O QUE NÃO FAZER

⚠️ **NÃO mover 20M FLUXX para a pool agora**  
⚠️ **NÃO adicionar flutuações de range**  
⚠️ **NÃO adicionar FLUXX em excesso**  
⚠️ **NÃO alterar o preço inicial**

Qualquer uma dessas ações quebraria o design do protocolo.

---

## 8. VERIFICAÇÃO PÓS-CRIAÇÃO

Após criar o pool, verifique:

1. **Pool criado no Uniswap:**
   - Acesse: https://app.uniswap.org/pools
   - Verifique que o par FLUXX/USDC aparece
   - Verifique o preço: **0.10 USDC por FLUXX**

2. **Token LP recebido:**
   - Verifique na Safe
   - Você deve ter recebido um NFT de posição (Uniswap v3 usa NFTs para LP)
   - O NFT estará na Safe: `0xF040BbD411542F09f775E974fA88E16bF7406d26`

3. **Agregadores:**
   - Aguarde alguns minutos
   - Verifique se FLUXX aparece em:
     - CoinGecko (pode levar dias)
     - CoinMarketCap (pode levar dias)
     - DeFiLlama
     - Wallets (MetaMask, etc.)

---

## 9. PRÓXIMOS PASSOS (Após IGNIÇÃO)

### Fase 1: IGNIÇÃO ✅ (Este Guia)
- Pool mínima: 100 FLUXX + 10 USDC
- Preço: $0.10
- Objetivo: Nascer no mercado

### Fase 2: LIQUIDEZ INSTITUCIONAL (Futuro)
- Pool maior: 20.000.000 FLUXX + 2.000.000 USDC
- Manter preço ancorado
- Locking de LP na Treasury
- Objetivo: Liquidez robusta

### Fase 3: ORACLE (v0.5.2)
- Implementar Chainlink Oracle
- Preço dinâmico baseado em mercado
- Upgrade do Membership
- Objetivo: Preço real-time

---

## 10. RESUMO AFIADO

| Item | Valor |
|------|-------|
| **Pool de Ignição** | 100 FLUXX + 10 USDC |
| **Preço** | 0.10 USDC por FLUXX |
| **DEX** | Uniswap v3 (Polygon) |
| **Range** | Full Range |
| **Fee** | 0.30% |
| **LP** | Guardado no Safe |

**Isso não é a liquidez da DAO.**

**É o fósforo que permite que a liquidez da DAO venha depois.**

---

## 🔗 Links Úteis

- **Uniswap v3:** https://app.uniswap.org/
- **Gnosis Safe:** https://app.safe.global/
- **Token FLUXX:** https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
- **Guia Transferir FLUXX:** `docs/transactions/TRANSFERIR_FLUXX_SAFE.md`
- **PATCH v0.5.1:** `docs/deployment/PATCH_v0.5.1.md`

---

## 📋 Checklist

Antes de criar o pool:

- [ ] Safe tem 10 USDC (Polygon) - Transferir se necessário
- [ ] Safe tem 100 FLUXX - Transferir do Treasury se necessário
- [ ] Safe tem MATIC para gas (~0.05-0.1 POL)
- [ ] Uniswap conectado à Safe (via WalletConnect ou extensão)
- [ ] Preço inicial definido: **0.10 USDC por FLUXX**
- [ ] Range definido: **Full Range**
- [ ] Fee tier: **0.30%**
- [ ] Quantidades corretas: **10 USDC + 100 FLUXX**
- [ ] Revisado todas as configurações
- [ ] Transação criada na Safe
- [ ] Aguardando aprovações dos signatários
- [ ] Transação executada
- [ ] Pool criada com sucesso
- [ ] Token LP (NFT) recebido na Safe
- [ ] Pool verificada no Uniswap

---

**Status:** ✅ Pronto para execução  
**Versão:** IGNIÇÃO (v0.5.1)  
**Data:** Novembro 2025

---

## 🎯 Nota Final

Este é o **ritual de nascimento** do token FLUXX no mercado.

Respeite o preço de fundação. Mantenha a coerência com o Membership v0.5.1.

**O futuro da DAO depende dessa primeira impressão.**

