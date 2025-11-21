# 🎨 Estrutura do Front-End Próprio (CAMINHO 2)

## 📋 Stack Recomendada

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "wagmi": "^2.0.0",
    "@privy-io/react-auth": "^1.0.0",
    "viem": "^2.0.0",
    "@tanstack/react-query": "^5.0.0"
  }
}
```

---

## 📁 Estrutura de Pastas

```
fluxx-dao-frontend/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Home
│   ├── dashboard/               # Painel da DAO
│   │   ├── page.tsx
│   │   └── components/
│   ├── governance/              # Votações
│   │   ├── page.tsx
│   │   ├── [proposalId]/
│   │   └── create/
│   ├── missions/                # Missões
│   │   ├── page.tsx
│   │   ├── [missionId]/
│   │   └── create/
│   └── members/                 # Membros
│       ├── page.tsx
│       └── [address]/
│
├── components/
│   ├── contracts/               # Componentes de contrato
│   │   ├── TokenBalance.tsx
│   │   ├── BadgeDisplay.tsx
│   │   ├── TreasuryBalance.tsx
│   │   └── GovernanceProposal.tsx
│   ├── ui/                      # UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   └── layout/
│       ├── Header.tsx
│       └── Sidebar.tsx
│
├── hooks/
│   ├── useDAO.ts                # Hooks customizados DAO
│   ├── useToken.ts
│   ├── useGovernance.ts
│   ├── useMissions.ts
│   └── useMembership.ts
│
├── lib/
│   ├── contracts.ts            # ABIs e endereços
│   ├── ipfs.ts                 # Cliente IPFS
│   ├── config.ts               # Configurações
│   └── utils.ts
│
├── public/
│   └── metadata/
│       └── contract-metadata.json
│
└── types/
    └── dao.ts                   # TypeScript types
```

---

## 🔧 Exemplo de Implementação

### `lib/contracts.ts`

```typescript
import { polygon } from 'wagmi/chains'

export const CONTRACTS = {
  token: {
    address: '0xB1430cc106bd664F68BE8d0167A52a29654CF8BA' as const,
    abi: TOKEN_ABI,
  },
  treasury: {
    address: '0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93' as const,
    abi: TREASURY_ABI,
  },
  governance: {
    address: '0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa' as const,
    abi: GOVERNANCE_ABI,
  },
  badgeNFT: {
    address: '0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce' as const,
    abi: BADGE_NFT_ABI,
  },
  membership: {
    address: '0x52926F509d7BD565c02fbd72265E4F5Dda300099' as const,
    abi: MEMBERSHIP_ABI,
  },
  collabEngine: {
    address: '0x3bFB7e43517B0C91F5Bee75FeDd88317Db7C763C' as const,
    abi: COLLAB_ENGINE_ABI,
  },
} as const

export const CHAIN = polygon
```

### `hooks/useDAO.ts`

```typescript
import { useReadContract, useWriteContract } from 'wagmi'
import { CONTRACTS } from '@/lib/contracts'
import { formatEther } from 'viem'

export function useTokenBalance(address?: `0x${string}`) {
  const { data, isLoading } = useReadContract({
    address: CONTRACTS.token.address,
    abi: CONTRACTS.token.abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  return {
    balance: data ? formatEther(data) : '0',
    isLoading,
  }
}

export function useBadges(address?: `0x${string}`) {
  const { data: memberBadges } = useReadContract({
    address: CONTRACTS.badgeNFT.address,
    abi: CONTRACTS.badgeNFT.abi,
    functionName: 'balanceOf',
    args: address ? [address, 1n] : undefined,
    query: { enabled: !!address },
  })

  const { data: collaboratorBadges } = useReadContract({
    address: CONTRACTS.badgeNFT.address,
    abi: CONTRACTS.badgeNFT.abi,
    functionName: 'balanceOf',
    args: address ? [address, 2n] : undefined,
    query: { enabled: !!address },
  })

  return {
    member: memberBadges || 0n,
    collaborator: collaboratorBadges || 0n,
  }
}

export function useTreasuryBalance() {
  const { data, isLoading } = useReadContract({
    address: CONTRACTS.treasury.address,
    abi: CONTRACTS.treasury.abi,
    functionName: 'getTokenBalance',
    args: [CONTRACTS.token.address],
  })

  return {
    balance: data ? formatEther(data) : '0',
    isLoading,
  }
}
```

### `components/contracts/TokenBalance.tsx`

```typescript
'use client'

import { useAccount } from 'wagmi'
import { useTokenBalance } from '@/hooks/useDAO'

export function TokenBalance() {
  const { address } = useAccount()
  const { balance, isLoading } = useTokenBalance(address)

  if (isLoading) return <div>Carregando...</div>
  if (!address) return <div>Conecte sua wallet</div>

  return (
    <div className="card">
      <h3>Seu Saldo FLUXX</h3>
      <p className="text-2xl font-bold">{balance} FLUXX</p>
    </div>
  )
}
```

### `app/layout.tsx`

```typescript
'use client'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PrivyProvider } from '@privy-io/react-auth'
import { config } from '@/lib/config'

const queryClient = new QueryClient()

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </WagmiProvider>
        </PrivyProvider>
      </body>
    </html>
  )
}
```

---

## 📦 Metadados no IPFS

### `public/metadata/contract-metadata.json`

```json
{
  "name": "FLUXX DAO",
  "description": "Decentralized Autonomous Organization for collaborative value creation",
  "image": "ipfs://Qm...",
  "external_link": "https://fluxx.space",
  "contracts": {
    "token": "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA",
    "treasury": "0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93",
    "governance": "0xaAf07b58b9658f103C9Cac9dbEAE622ED21c2BFa",
    "badgeNFT": "0xAba2f3E32C0Fac859e21bC7a8EcAAF173200F7Ce",
    "membership": "0x52926F509d7BD565c02fbd72265E4F5Dda300099",
    "collabEngine": "0x3bFB7e43517B0C91F5Bee75FeDd88317Db7C763C"
  },
  "network": {
    "name": "Polygon",
    "chainId": 137,
    "explorer": "https://polygonscan.com"
  }
}
```

### Upload para IPFS

```typescript
// lib/ipfs.ts
import { Web3Storage } from 'web3.storage'

const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN! })

export async function uploadMetadata(metadata: object): Promise<string> {
  const blob = new Blob([JSON.stringify(metadata)], { type: 'application/json' })
  const file = new File([blob], 'contract-metadata.json')
  const cid = await client.put([file])
  return `ipfs://${cid}/contract-metadata.json`
}
```

---

## ✅ Vantagens desta Abordagem

1. **Controle Total**: Você decide exatamente o que mostrar
2. **Otimizado para DAO**: UI focada em governança, não em vendas
3. **Descentralizado**: Metadados no IPFS
4. **Sem Dependências**: Não precisa do Thirdweb Dashboard
5. **Performance**: Lê diretamente dos contratos on-chain
6. **Customizável**: Pode adicionar features específicas da DAO

---

## 🚀 Próximos Passos

1. Criar projeto Next.js
2. Instalar dependências (Wagmi, Privy, etc)
3. Configurar providers
4. Criar hooks customizados
5. Desenvolver componentes
6. Fazer deploy (Vercel, Fleek, etc)

---

## 📚 Recursos

- [Wagmi Docs](https://wagmi.sh)
- [Privy Docs](https://docs.privy.io)
- [Next.js Docs](https://nextjs.org/docs)
- [Web3.Storage](https://web3.storage)

