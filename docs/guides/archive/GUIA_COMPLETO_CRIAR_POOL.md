# 🎯 Guia Completo: Criar Pool FLUXX/USDC - Passo a Passo

## 🚨 Você Está Cansado? Vamos Fazer Juntos!

Este guia vai te ajudar passo a passo, sem pressa.

---

## ✅ O Que Você Já Tem (Tudo Pronto!)

- ✅ Safe tem 100 FLUXX
- ✅ Safe tem 22 USDC
- ✅ FLUXX aprovado para Position Manager
- ✅ USDC aprovado para Position Manager
- ✅ POL para gas

**Tudo está pronto! Só falta criar a pool.**

---

## 🎯 Método Mais Simples: Importar JSON no Safe Transaction Builder

### Passo 1: Acessar Transaction Builder

1. **Acesse:** https://apps-portal.safe.global/tx-builder
2. **Conecte sua wallet** (signatária da Safe)
3. **Selecione a Safe:** `0xF040BbD411542F09f775E974fA88E16bF7406d26`

### Passo 2: Importar Transação

1. **No lado direito**, você verá: "Drag and drop a JSON file or choose a file"
2. **Baixe o arquivo:** `scripts/poolTransaction.json`
3. **Arraste e solte** o arquivo JSON na área
4. **OU clique em "choose a file"** e selecione o arquivo

### Passo 3: Revisar

A transação será carregada automaticamente com todos os parâmetros corretos!

### Passo 4: Importar na Safe

1. **Clique em:** "Import to Safe" ou botão similar
2. **A transação será criada na Safe**
3. **Revise e execute**

**Pronto!** 🎉

---

## 🔧 Método Alternativo: Preencher Manualmente

Se o método acima não funcionar:

### Passo 1: Acessar Transaction Builder

1. **Acesse:** https://apps-portal.safe.global/tx-builder
2. **Conecte sua wallet**
3. **Selecione a Safe**

### Passo 2: Preencher Campos

**To Address:**
```
0xC36442b4a4522E871399CD717aBDD847Ab11FE88
```

**POL value:**
```
0
```

**Data (Hex):**
```
0x883164560000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa84174000000000000000000000000b1430cc106bd664f68be8d0167a52a29654cf8ba0000000000000000000000000000000000000000000000000000000000000bb8fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2761800000000000000000000000000000000000000000000000000000000000d89e800000000000000000000000000000000000000000000000000000000009896800000000000000000000000000000000000000000000000056bc75e2d6310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f040bbd411542f09f775e974fa88e16bf7406d26000000000000000000000000000000000000000000000000000000006b005021
```

### Passo 3: Importar na Safe

1. **Clique em:** "Import to Safe"
2. **Revise**
3. **Execute**

---

## 🎯 Método Mais Fácil: Usar Interface do Uniswap

Se os métodos acima forem complicados, tente esta alternativa:

### Passo 1: Transferir Tokens para Wallet Pessoal

**Na Safe, transfira:**

- 100 FLUXX para sua wallet pessoal
- 10 USDC para sua wallet pessoal

**Como fazer:**

1. Safe → Assets → FLUXX → Send
2. To: Seu endereço da wallet pessoal
3. Amount: 100
4. Execute

Repita para USDC (10 USDC).

### Passo 2: Conectar Wallet Pessoal ao Uniswap

1. **Acesse:** https://app.uniswap.org/
2. **Conecte sua wallet** (MetaMask, etc.)
3. **Rede:** Polygon

### Passo 3: Criar Pool

1. **Vá em:** Pool → New Position
2. **Configure:**
   - Token 0: USDC
   - Token 1: FLUXX (`0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`)
   - Fee: 0.30%
   - Range: Full Range
   - Preço: 0.10 USDC por FLUXX
   - Amount: 10 USDC + 100 FLUXX
3. **Aprove tokens** (se necessário)
4. **Crie a pool**

### Passo 4: Transferir NFT para Safe

Depois de criar:

1. **No Uniswap:** Your Positions
2. **Clique na posição**
3. **Transfer** → Envie para: `0xF040BbD411542F09f775E974fA88E16bF7406d26`

---

## 📋 Qual Método Escolher?

### Método 1: Importar JSON (Mais Fácil)

- ✅ Só arrastar arquivo
- ✅ Tudo preenchido automaticamente
- ✅ Menos chance de erro

### Método 2: Preencher Manualmente

- ⚠️ Precisa copiar e colar
- ⚠️ Mais chance de erro
- ✅ Mas funciona

### Método 3: Wallet Pessoal (Mais Simples)

- ✅ Interface do Uniswap funciona normalmente
- ⚠️ Precisa transferir tokens primeiro
- ⚠️ Depois transferir NFT de volta

**Recomendação:** Tente Método 1 primeiro (importar JSON).

---

## 🔍 Troubleshooting

### "Não consigo importar JSON"

**Solução:**

- Verifique se o arquivo está correto
- Tente método 2 (preencher manualmente)
- OU use método 3 (wallet pessoal)

### "Transação falha"

**Solução:**

- Verifique se as aprovações foram feitas
- Verifique se tem saldo suficiente
- Use Tenderly para debugar: https://dashboard.tenderly.co/

### "Não consigo conectar Safe ao Uniswap"

**Solução:**

- Use método 3 (wallet pessoal)
- É mais simples e funciona sempre

---

## 📊 Resumo dos Métodos

| Método | Dificuldade | Vantagem |
|--------|------------|----------|
| **Importar JSON** | ⭐ Fácil | Tudo automático |
| **Preencher Manual** | ⭐⭐ Médio | Controle total |
| **Wallet Pessoal** | ⭐ Fácil | Interface funciona |

---

## 🚀 Próximo Passo Agora

**Tente o Método 1 (Importar JSON):**

1. Acesse: https://apps-portal.safe.global/tx-builder
2. Arraste o arquivo: `scripts/poolTransaction.json`
3. Importe na Safe
4. Execute

**Se não funcionar, me diga qual erro aparece!**

---

**Status:** Ajudando a criar pool  
**Método recomendado:** Importar JSON  
**Arquivo:** `scripts/poolTransaction.json`

