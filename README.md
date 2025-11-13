# FLUXX DAO

Sistema completo de DAO (Decentralized Autonomous Organization) na Polygon Mainnet com token ERC20, badges NFT, governança, treasury e motor de colaboração.

## 📋 Visão Geral

FLUXX DAO é uma organização autônoma descentralizada que utiliza tokens FLUXX e badges NFT para gerenciar membros, governança e colaborações. O sistema é composto por 6 contratos principais que trabalham em conjunto para criar uma DAO funcional e segura.

## 🏗️ Arquitetura

### Contratos Principais

| Contrato | Endereço | Descrição |
|----------|----------|-----------|
| **Token** | [`0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`](https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA) | Token ERC20 FLUXX (100M supply inicial) |
| **BadgeNFT** | [`0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce`](https://polygonscan.com/address/0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce) | NFTs ERC1155 para badges de membros |
| **Treasury** | [`0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93`](https://polygonscan.com/address/0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93) | Cofre da DAO com sistema de saque em 2 etapas |
| **Governance** | [`0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa`](https://polygonscan.com/address/0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa) | Sistema de votação baseado em badges |
| **Membership** | [`0x52926F509d7BD565c02fbd72265E4F5Dda300099`](https://polygonscan.com/address/0x52926F509d7BD565c02fbd72265E4F5Dda300099) | Gerenciamento de membros da DAO |
| **CollabEngine** | [`0x3bFB7e43517B0C91F5Bee75FeDd88317Db7C763C`](https://polygonscan.com/address/0x3bFB7e43517B0C91F5Bee75FeDd88317Db7C763C) | Motor de colaboração e missões |

**Gnosis Safe (Owner):** [`0xF040BbD411542F09f775E974fA88E16bF7406d26`](https://polygonscan.com/address/0xF040BbD411542F09f775E974fA88E16bF7406d26)

## 🚀 Início Rápido

### Pré-requisitos

- Node.js >= 18
- npm ou yarn
- Conta na Polygon com MATIC para gas

### Instalação

```bash
npm install
```

### Configuração

1. Copie `.env.example` para `.env`
2. Configure suas variáveis de ambiente:
   - `PRIVATE_KEY`: Sua chave privada (para deploy)
   - `POLYGONSCAN_API_KEY`: API key do PolygonScan (para verificação)
   - `POLYGON_RPC_URL`: URL do RPC da Polygon

### Deploy

```bash
npx hardhat run scripts/deploy.js --network polygon
```

## 📁 Estrutura do Projeto

```
fluxx-dao/
├── contracts/          # Contratos Solidity
│   ├── Token.sol
│   ├── BadgeNFT.sol
│   ├── Treasury.sol
│   ├── Governance.sol
│   ├── Membership.sol
│   └── CollabEngine.sol
├── scripts/            # Scripts de deploy e operação
│   ├── deploy.js
│   ├── distribuirTokens.js
│   └── ...
├── test/               # Testes
├── abis/               # ABIs dos contratos
├── docs/               # Documentação completa
└── hardhat.config.js   # Configuração Hardhat
```

## 🔧 Scripts Disponíveis

- `deploy.js` - Deploy completo dos contratos
- `distribuirTokens.js` - Distribuição de tokens
- `transferToFounders.js` - Transferência para fundadores
- `setBadgeURIs.js` - Configuração de URIs dos badges
- `verifyContracts.js` - Verificação no PolygonScan

## 📚 Documentação

Documentação completa disponível em [`docs/`](./docs/):

- **Guias:** [`docs/guides/`](./docs/guides/) - Tutoriais e guias de uso
- **Deploy:** [`docs/deployment/`](./docs/deployment/) - Informações sobre deploy
- **Configuração:** [`docs/configuration/`](./docs/configuration/) - Configurações do Safe
- **Verificação:** [`docs/verification/`](./docs/verification/) - Guias de verificação
- **Info:** [`docs/info/`](./docs/info/) - Informações do projeto e token

## 🔒 Segurança

- Todos os contratos são Ownable e transferidos para Gnosis Safe
- Treasury utiliza sistema de saque em 2 etapas (queue + execute)
- Governança baseada em badges, não em quantidade de tokens
- Contratos auditados e verificados no PolygonScan

## 🌐 Links

- **Website:** https://fluxx.space
- **PolygonScan Token:** https://polygonscan.com/token/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
- **Twitter:** https://x.com/fluxxdao
- **Telegram:** https://t.me/fluxxdao

## 📝 Licença

MIT

## 👥 Contribuindo

Este é um projeto de DAO. Para contribuir, entre em contato através das redes sociais ou email: `team@fluxx.space`

---

**Rede:** Polygon Mainnet (Chain ID: 137)  
**Token:** FLUXX (FLUXX DAO)  
**Supply Inicial:** 100,000,000 FLUXX  
**Supply Máximo:** 1,000,000,000 FLUXX

