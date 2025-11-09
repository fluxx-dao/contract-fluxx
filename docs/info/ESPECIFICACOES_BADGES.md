# 🎨 Especificações dos Badges FLUXX DAO

## 📋 Visão Geral

Os badges são NFTs Soulbound (ERC1155) que representam reputação e conquistas na FLUXX DAO. Cada badge tem um arquivo JSON de metadados que segue o padrão ERC1155 Metadata URI.

---

## 🖼️ Especificações das Imagens

### Tamanho Recomendado

| Tipo | Tamanho | Formato | Uso |
|------|---------|---------|-----|
| **Badge Principal** | 512x512px | PNG (transparente) | Carteiras, marketplaces |
| **Badge Grande** | 1024x1024px | PNG (transparente) | Visualização detalhada |
| **Badge Pequeno** | 256x256px | PNG (transparente) | Listagens, thumbnails |
| **Favicon** | 32x32px | PNG (transparente) | Favicon do site |

**Recomendação Principal:** **512x512px** em PNG com fundo transparente

### Formato de Arquivo

- **Formato:** PNG (recomendado) ou SVG
- **Fundo:** Transparente (alpha channel)
- **Qualidade:** Alta resolução, sem compressão excessiva
- **Cores:** RGB ou RGBA
- **Espaço de cor:** sRGB

### Proporção

- **Formato:** Quadrado (1:1)
- **Orientação:** Pode ser circular, quadrado com bordas arredondadas, ou formato personalizado
- **Área segura:** Manter conteúdo importante dentro de 90% da área (461x461px em 512x512px)

---

## 📝 Estrutura dos Arquivos JSON

### Padrão ERC1155 Metadata

Cada badge precisa de um arquivo JSON seguindo o padrão ERC1155 Metadata URI:

```json
{
  "name": "Nome do Badge",
  "description": "Descrição detalhada do badge",
  "image": "URL da imagem do badge",
  "external_url": "URL externa (opcional)",
  "attributes": [
    {
      "trait_type": "Tipo",
      "value": "Valor"
    }
  ]
}
```

---

## 🎯 Especificações por Badge

### Badge ID 1: Membro Ativo

**Nome:** Membro Ativo  
**Descrição:** Badge concedido a membros ativos da FLUXX DAO que completaram o processo de registro.

**Arquivo:** `badges/1.json`

**Estrutura sugerida:**
```json
{
  "name": "Membro Ativo",
  "description": "Badge concedido a membros ativos da FLUXX DAO que completaram o processo de registro e estão participando ativamente da comunidade.",
  "image": "https://fluxx.space/badges/images/membro-ativo.png",
  "external_url": "https://fluxx.space/badges/1",
  "attributes": [
    {
      "trait_type": "Tipo",
      "value": "Membro"
    },
    {
      "trait_type": "Nível",
      "value": 1
    },
    {
      "trait_type": "Raridade",
      "value": "Comum"
    },
    {
      "trait_type": "Soulbound",
      "value": true
    }
  ]
}
```

**Imagem:** `badges/images/membro-ativo.png` (512x512px)

---

### Badge ID 2: Colaborador

**Nome:** Colaborador  
**Descrição:** Badge concedido a membros que contribuíram significativamente para projetos e missões da DAO.

**Arquivo:** `badges/2.json`

**Estrutura sugerida:**
```json
{
  "name": "Colaborador",
  "description": "Badge concedido a membros que demonstraram comprometimento e contribuíram significativamente para projetos e missões da FLUXX DAO.",
  "image": "https://fluxx.space/badges/images/colaborador.png",
  "external_url": "https://fluxx.space/badges/2",
  "attributes": [
    {
      "trait_type": "Tipo",
      "value": "Colaborador"
    },
    {
      "trait_type": "Nível",
      "value": 2
    },
    {
      "trait_type": "Raridade",
      "value": "Raro"
    },
    {
      "trait_type": "Soulbound",
      "value": true
    }
  ]
}
```

**Imagem:** `badges/images/colaborador.png` (512x512px)

---

### Badge ID 3: Aplicador

**Nome:** Aplicador  
**Descrição:** Badge concedido a membros que aplicaram trabalhos e soluções desenvolvidas na DAO em projetos reais.

**Arquivo:** `badges/3.json`

**Estrutura sugerida:**
```json
{
  "name": "Aplicador",
  "description": "Badge concedido a membros que aplicaram trabalhos e soluções desenvolvidas na FLUXX DAO em projetos reais, demonstrando impacto prático.",
  "image": "https://fluxx.space/badges/images/aplicador.png",
  "external_url": "https://fluxx.space/badges/3",
  "attributes": [
    {
      "trait_type": "Tipo",
      "value": "Aplicador"
    },
    {
      "trait_type": "Nível",
      "value": 3
    },
    {
      "trait_type": "Raridade",
      "value": "Épico"
    },
    {
      "trait_type": "Soulbound",
      "value": true
    }
  ]
}
```

**Imagem:** `badges/images/aplicador.png` (512x512px)

---

### Badge ID 4: Referral

**Nome:** Referral  
**Descrição:** Badge concedido a membros que trouxeram novos membros para a DAO através do programa de referral.

**Arquivo:** `badges/4.json`

**Estrutura sugerida:**
```json
{
  "name": "Referral",
  "description": "Badge concedido a membros que trouxeram novos membros para a FLUXX DAO através do programa de referral, ajudando a expandir a comunidade.",
  "image": "https://fluxx.space/badges/images/referral.png",
  "external_url": "https://fluxx.space/badges/4",
  "attributes": [
    {
      "trait_type": "Tipo",
      "value": "Referral"
    },
    {
      "trait_type": "Nível",
      "value": 1
    },
    {
      "trait_type": "Raridade",
      "value": "Comum"
    },
    {
      "trait_type": "Soulbound",
      "value": true
    }
  ]
}
```

**Imagem:** `badges/images/referral.png` (512x512px)

---

## 📁 Estrutura de Arquivos no Site

```
fluxx.space/
├── badges/
│   ├── 1.json          (Membro Ativo)
│   ├── 2.json          (Colaborador)
│   ├── 3.json          (Aplicador)
│   ├── 4.json          (Referral)
│   └── images/
│       ├── membro-ativo.png
│       ├── colaborador.png
│       ├── aplicador.png
│       └── referral.png
```

---

## 🎨 Diretrizes de Design

### Cores e Estilo

- **Paleta de cores:** Consistente com a identidade visual da FLUXX DAO
- **Estilo:** Moderno, profissional, alinhado com Web3
- **Elementos:** Pode incluir ícones, símbolos, ou elementos gráficos representativos

### Hierarquia Visual

1. **Membro Ativo (Nível 1):** Design mais simples, cores básicas
2. **Colaborador (Nível 2):** Design intermediário, mais detalhes
3. **Aplicador (Nível 3):** Design mais elaborado, cores mais vibrantes
4. **Referral (Nível 1):** Design simples, foco em networking/comunidade

### Elementos Visuais Sugeridos

- **Membro Ativo:** Ícone de pessoa/membro, cores azuis/verdes
- **Colaborador:** Ícone de mãos colaborando, cores laranja/amarelo
- **Aplicador:** Ícone de engrenagem/aplicação, cores roxo/rosa
- **Referral:** Ícone de rede/conexão, cores verde/azul

---

## 📐 Especificações Técnicas Detalhadas

### Imagem PNG

- **Resolução:** 512x512px (mínimo recomendado)
- **Profundidade de cor:** 32-bit RGBA (com transparência)
- **Compressão:** Otimizada (sem perda de qualidade visível)
- **Tamanho de arquivo:** Idealmente < 200KB por imagem
- **Fundo:** Transparente (alpha channel)

### Imagem SVG (Alternativa)

- **Formato:** SVG 1.1 ou 2.0
- **Tamanho viewBox:** `0 0 512 512`
- **Elementos:** Vetor, escalável
- **Vantagem:** Escala perfeitamente, arquivo menor

---

## ✅ Checklist de Implementação

### Arquivos JSON
- [ ] Criar `badges/1.json` (Membro Ativo)
- [ ] Criar `badges/2.json` (Colaborador)
- [ ] Criar `badges/3.json` (Aplicador)
- [ ] Criar `badges/4.json` (Referral)

### Imagens
- [ ] Criar `badges/images/membro-ativo.png` (512x512px)
- [ ] Criar `badges/images/colaborador.png` (512x512px)
- [ ] Criar `badges/images/aplicador.png` (512x512px)
- [ ] Criar `badges/images/referral.png` (512x512px)

### Verificação
- [ ] Testar URLs dos JSONs (devem retornar JSON válido)
- [ ] Testar URLs das imagens (devem carregar corretamente)
- [ ] Verificar no PolygonScan se as URIs estão corretas
- [ ] Testar em carteiras (MetaMask, etc.)
- [ ] Verificar em marketplaces (OpenSea, etc.)

---

## 🔗 URLs Finais

Após criar os arquivos, as URLs devem ser:

- **Metadados:**
  - `https://fluxx.space/badges/1.json`
  - `https://fluxx.space/badges/2.json`
  - `https://fluxx.space/badges/3.json`
  - `https://fluxx.space/badges/4.json`

- **Imagens:**
  - `https://fluxx.space/badges/images/membro-ativo.png`
  - `https://fluxx.space/badges/images/colaborador.png`
  - `https://fluxx.space/badges/images/aplicador.png`
  - `https://fluxx.space/badges/images/referral.png`

---

## 💡 Dicas de Implementação

### Hospedagem

- **Vercel:** Coloque os arquivos na pasta `public/badges/`
- **IPFS:** Faça upload e use URLs IPFS (mais descentralizado)
- **CDN:** Use Cloudflare ou similar para melhor performance

### Validação JSON

Use um validador JSON online para garantir que os arquivos estão corretos:
- https://jsonlint.com/
- https://jsonformatter.org/

### Teste de URLs

Antes de fazer deploy, teste se as URLs estão acessíveis:
```bash
curl https://fluxx.space/badges/1.json
curl https://fluxx.space/badges/images/membro-ativo.png
```

---

## 📚 Referências

- **ERC1155 Metadata Standard:** https://eips.ethereum.org/EIPS/eip-1155#metadata
- **OpenSea Metadata Standards:** https://docs.opensea.io/docs/metadata-standards

---

**Última atualização:** Novembro 2025  
**Status:** ✅ URIs configuradas, aguardando criação dos arquivos JSON e imagens

