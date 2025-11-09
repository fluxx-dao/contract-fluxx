# 🖼️ Configurar Imagem/Avatar do Token FLUXX

## 📋 Resumo

Para tokens ERC20, a imagem/logo não fica no contrato, mas sim em agregadores e exploradores. Você pode configurar agora mesmo!

---

## 🎯 Onde Configurar a Imagem

### 1️⃣ PolygonScan (Mais Importante - Aparece em Wallets)

**Após verificar o contrato no PolygonScan:**

1. Acesse: https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
2. Faça login na sua conta PolygonScan
3. Vá em **"Update Token Info"** ou **"Update Logo"**
4. Faça upload da imagem (recomendado: 256x256px ou 512x512px, PNG com fundo transparente)
5. Preencha os metadados:
   - **Name**: FLUXX DAO
   - **Symbol**: FLUXX
   - **Decimals**: 18
   - **Logo**: Sua imagem do IPFS

**URL do IPFS para a imagem:**
```
ipfs://SEU_HASH_AQUI
```
ou
```
https://ipfs.io/ipfs/SEU_HASH_AQUI
```

---

### 2️⃣ Criar Token List (Opcional mas Recomendado)

Crie um arquivo JSON seguindo o padrão Token Lists:

```json
{
  "name": "FLUXX DAO Token List",
  "version": {
    "major": 1,
    "minor": 0,
    "patch": 0
  },
  "tokens": [
    {
      "chainId": 137,
      "address": "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA",
      "name": "FLUXX DAO",
      "symbol": "FLUXX",
      "decimals": 18,
      "logoURI": "ipfs://SEU_HASH_DA_IMAGEM"
    }
  ]
}
```

1. Faça upload deste JSON no IPFS também
2. Submeta para Token Lists (Uniswap, etc.)

---

### 3️⃣ CoinGecko / CoinMarketCap (Para Listagem)

Se quiser listar o token:

1. **CoinGecko**: https://www.coingecko.com/en/coins/new
2. **CoinMarketCap**: https://coinmarketcap.com/community/portal/
3. Submeta com:
   - Endereço do contrato
   - Logo (URL do IPFS)
   - Descrição
   - Links sociais

---

## 📝 Passo a Passo Recomendado

### Passo 1: Preparar a Imagem

1. **Tamanho recomendado**: 256x256px ou 512x512px
2. **Formato**: PNG com fundo transparente
3. **Qualidade**: Alta resolução, sem compressão excessiva

### Passo 2: Fazer Upload no IPFS

1. Use um serviço de IPFS:
   - **Pinata**: https://www.pinata.cloud/ (recomendado)
   - **NFT.Storage**: https://nft.storage/
   - **Web3.Storage**: https://web3.storage/
   - **IPFS Desktop**: https://docs.ipfs.tech/install/ipfs-desktop/

2. Faça upload da imagem
3. Copie o hash/IPFS URL:
   ```
   ipfs://QmSeuHashAqui...
   ```
   ou
   ```
   https://ipfs.io/ipfs/QmSeuHashAqui...
   ```

### Passo 3: Verificar Contrato no PolygonScan

1. Acesse: https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
2. Vá em **"Contract"** → **"Verify and Publish"**
3. Preencha:
   - **Compiler Type**: Solidity (Single file)
   - **Compiler Version**: 0.8.20
   - **License**: MIT
   - Cole o código do contrato Token.sol
4. Após verificar, você poderá atualizar o logo

### Passo 4: Atualizar Logo no PolygonScan

1. Após verificar o contrato, vá em **"More Options"** → **"Update Token Info"**
2. Faça upload do logo ou cole a URL do IPFS
3. Salve

---

## 🔗 Links Úteis

- **PolygonScan**: https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
- **Pinata (IPFS)**: https://www.pinata.cloud/
- **Token Lists**: https://tokenlists.org/
- **CoinGecko**: https://www.coingecko.com/
- **CoinMarketCap**: https://coinmarketcap.com/

---

## ⚠️ Importante

- A imagem **não fica no contrato** - é configurada off-chain
- **PolygonScan** é o mais importante - wallets como MetaMask pegam o logo de lá
- Use **IPFS** para garantir que a imagem fique disponível permanentemente
- Após configurar no PolygonScan, pode levar algumas horas para aparecer nas wallets

---

## ✅ Checklist

- [ ] Preparar imagem (256x256px ou 512x512px, PNG)
- [ ] Fazer upload no IPFS
- [ ] Verificar contrato no PolygonScan
- [ ] Atualizar logo no PolygonScan com URL do IPFS
- [ ] (Opcional) Criar Token List e fazer upload
- [ ] (Opcional) Submeter para CoinGecko/CoinMarketCap

---

**Você pode fazer isso agora mesmo, mesmo antes de executar as transações do Safe!**

