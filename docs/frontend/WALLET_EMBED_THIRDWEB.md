# 🔌 Wallet Embed no Front-End - Thirdweb SDK

## ✅ Sim, você PODE usar Wallet Embed!

**Importante:** O Thirdweb SDK é **independente** do Thirdweb Dashboard. Você pode usar todos os recursos do SDK (incluindo wallet embed) mesmo sem usar o dashboard.

---

## 🎯 Diferença Importante

### ❌ O que NÃO funciona sem as interfaces:

- **Thirdweb Dashboard** (interface web para gerenciar contratos)
- Dashboard exige contratos com `IContractMetadata`, `IPrimarySale`, etc.

### ✅ O que FUNCIONA normalmente:

- **Thirdweb SDK** (biblioteca JavaScript/TypeScript)
- **Wallet Embed** (componente de conexão de wallet)
- **Hooks do SDK** (`useContract`, `useReadContract`, etc.)
- **Autenticação** (Privy, WalletConnect, etc.)
- **Storage** (IPFS via Thirdweb Storage)

---

## 🚀 Implementação: Wallet Embed + SDK

### Opção 1: Thirdweb SDK Puro

```typescript
// app/layout.tsx
'use client'

import { ThirdwebProvider } from 'thirdweb/react'
import { createThirdwebClient } from 'thirdweb'

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!
})

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThirdwebProvider>
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  )
}
```

```typescript
// components/WalletConnect.tsx
'use client'

import { ConnectButton } from 'thirdweb/react'
import { createWallet, inAppWallet } from 'thirdweb/wallets'

const wallets = [
  inAppWallet(),
  createWallet('io.metamask'),
  createWallet('com.coinbase.wallet'),
]

export function WalletConnect() {
  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      connectModal={{
        size: 'wide',
        title: 'Conectar à FLUXX DAO',
      }}
    />
  )
}
```

### Opção 2: Thirdweb SDK + Wagmi (Recomendado)

```typescript
// lib/config.ts
import { createConfig, http } from 'wagmi'
import { polygon } from 'wagmi/chains'
import { createThirdwebClient } from 'thirdweb'
import { createWalletAdapter } from 'thirdweb/wagmi'

const thirdwebClient = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!
})

export const wagmiConfig = createConfig({
  chains: [polygon],
  transports: {
    [polygon.id]: http(),
  },
  connectors: [
    createWalletAdapter(thirdwebClient, {
      wallets: [
        inAppWallet(),
        createWallet('io.metamask'),
      ],
    }),
  ],
})
```

```typescript
// app/layout.tsx
'use client'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiConfig } from '@/lib/config'

const queryClient = new QueryClient()

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  )
}
```

```typescript
// components/WalletConnect.tsx
'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { ConnectButton } from 'thirdweb/react'

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div>
        <p>Conectado: {address}</p>
        <button onClick={() => disconnect()}>Desconectar</button>
      </div>
    )
  }

  return (
    <ConnectButton
      client={thirdwebClient}
      wallets={wallets}
    />
  )
}
```

---

## 📦 Usando Contratos sem Interfaces Especiais

Você pode ler/escrever nos contratos da DAO normalmente, mesmo sem as interfaces:

```typescript
// hooks/useToken.ts
import { useReadContract, useWriteContract } from 'wagmi'
import { CONTRACTS } from '@/lib/contracts'

export function useTokenBalance(address?: `0x${string}`) {
  const { data, isLoading } = useReadContract({
    address: CONTRACTS.token.address,
    abi: CONTRACTS.token.abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  })

  return {
    balance: data ? formatEther(data) : '0',
    isLoading,
  }
}

export function useTransferToken() {
  const { writeContract } = useWriteContract()

  const transfer = async (to: string, amount: string) => {
    await writeContract({
      address: CONTRACTS.token.address,
      abi: CONTRACTS.token.abi,
      functionName: 'transfer',
      args: [to, parseEther(amount)],
    })
  }

  return { transfer }
}
```

---

## 🎨 Exemplo Completo: Wallet Embed + DAO

```typescript
// app/page.tsx
'use client'

import { WalletConnect } from '@/components/WalletConnect'
import { useTokenBalance } from '@/hooks/useToken'
import { useAccount } from 'wagmi'

export default function Home() {
  const { address, isConnected } = useAccount()
  const { balance, isLoading } = useTokenBalance(address)

  return (
    <main>
      <header>
        <h1>FLUXX DAO</h1>
        <WalletConnect />
      </header>

      {isConnected && (
        <section>
          <h2>Seu Saldo</h2>
          {isLoading ? (
            <p>Carregando...</p>
          ) : (
            <p>{balance} FLUXX</p>
          )}
        </section>
      )}
    </main>
  )
}
```

---

## 🔑 Configuração Necessária

### 1. Obter Client ID do Thirdweb

1. Acesse: https://thirdweb.com/dashboard
2. Crie uma conta (gratuita)
3. Crie um novo projeto
4. Copie o **Client ID**

### 2. Adicionar ao `.env`

```bash
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=seu_client_id_aqui
```

### 3. Instalar Dependências

```bash
npm install thirdweb wagmi viem @tanstack/react-query
```

---

## ✅ Vantagens desta Abordagem

1. **Wallet Embed Funciona**: Você pode usar todos os componentes do Thirdweb SDK
2. **Sem Dependência do Dashboard**: Não precisa das interfaces especiais nos contratos
3. **Flexibilidade**: Pode usar Wagmi + Thirdweb juntos
4. **Contratos Normais**: Lê/escreve diretamente nos contratos da DAO
5. **UI Customizada**: Controle total sobre a experiência

---

## 📚 Recursos

- [Thirdweb React SDK](https://portal.thirdweb.com/react)
- [Thirdweb Wallet SDK](https://portal.thirdweb.com/wallets)
- [Wagmi Docs](https://wagmi.sh)
- [ConnectButton Component](https://portal.thirdweb.com/react/v5/components/ConnectButton)

---

## 🎯 Conclusão

**Sim, você PODE e DEVE usar wallet embed!**

O problema era apenas com o **Thirdweb Dashboard** (interface web), não com o **SDK**. O SDK funciona perfeitamente com seus contratos, mesmo sem as interfaces especiais.

**Recomendação:**
- Use **Thirdweb SDK** para wallet embed e autenticação
- Use **Wagmi** para interação com contratos
- Ignore o **Thirdweb Dashboard** (não é necessário)

