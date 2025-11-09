# 🔥 TESTE DO SISTEMA COMPLETO - FLUXX DAO

## 🎯 Objetivo

Provar que o sistema funciona end-to-end: desde o registro de membros até a conclusão de uma missão com pagamento e badges.

---

## ⚠️ PRÉ-REQUISITOS

Antes de começar, certifique-se de ter:

- [ ] **Todas as configurações pós-deploy feitas** (ver `POS_DEPLOY_CHECKLIST.md`)
- [ ] **Treasury tem $FLUXX** (100 milhões foram mintados no deploy)
- [ ] **Fundadores têm $FLUXX** na wallet (para fazer stake)
- [ ] **Fundadores têm POL** para pagar gas
- [ ] **Pelo menos 3 fundadores** prontos para testar

---

## 📋 ETAPA 1: A IGNIÇÃO DOS MEMBROS (O PORTÃO)

### 🎯 Objetivo

Registrar os fundadores como membros da DAO e validar o sistema de Membership.

---

### 1.1 O Primeiro Fiador (O Pioneiro)

**Ação:** O Fundador #1 (você) se registra via **Acesso por Stake**.

**Por quê?** É o caminho mais limpo. Não precisa de fiador e valida o sistema completo.

#### Passo a Passo:

1. **Acesse o contrato Membership no PolygonScan:**
   - https://polygonscan.com/address/0x52926F509d7BD565c02fbd72265E4F5Dda300099#writeContract

2. **Conecte sua wallet** (Fundador #1)

3. **Chame a função `register()`:**
   - **Parâmetros:** Nenhum
   - **Stake necessário:** 500 $FLUXX
   - **Gas estimado:** ~150.000

4. **Aprove a transação** na sua wallet

5. **Verifique o sucesso:**
   - ✅ BadgeNFT mintado (Badge ID 1 - Membro Ativo)
   - ✅ Treasury recebeu 500 $FLUXX
   - ✅ `isMember[seuEndereco]` = true

#### Como Verificar:

```solidity
// No Membership, chame:
isMember(seuEndereco) // deve retornar true

// No BadgeNFT, chame:
balanceOf(seuEndereco, 1) // deve retornar 1 (Badge de Membro Ativo)
```

---

### 1.2 A Entrada dos Outros Fiadores (A Fiança)

**Ação:** Os outros Fundadores (#2, #3, etc.) se registram via **Acesso por Fiança**, usando o Fundador #1 como fiador.

**Fluxo:** Cada fundador chama `registerWithGuarantor()` passando o endereço do Fundador #1.

#### Passo a Passo (para cada Fundador #2, #3, etc.):

1. **Acesse o contrato Membership no PolygonScan:**
   - https://polygonscan.com/address/0x52926F509d7BD565c02fbd72265E4F5Dda300099#writeContract

2. **Conecte a wallet** do Fundador (ex: Fundador #2)

3. **Chame a função `registerWithGuarantor(address _fiador)`:**
   - **Parâmetro `_fiador`:** `0x...` (endereço do Fundador #1)
   - **Stake necessário:** 100 $FLUXX
   - **Gas estimado:** ~200.000

4. **Aprove a transação**

5. **Verifique o sucesso:**
   - ✅ BadgeNFT mintado para o novo membro (Badge ID 1)
   - ✅ BadgeNFT mintado para o Fiador #1 (Badge ID 4 - Referral)
   - ✅ Treasury recebeu 100 $FLUXX
   - ✅ `fiadorDe[novoMembro]` = endereço do Fundador #1

#### Como Verificar:

```solidity
// No Membership, chame:
isMember(enderecoFundador2) // deve retornar true
fiadorDe(enderecoFundador2) // deve retornar enderecoFundador1
contadorFiador(enderecoFundador1) // deve incrementar
```

---

### ✅ Verificação Final da Etapa 1

Após registrar todos os fundadores, verifique:

- [ ] **Total de membros:** `totalMembers()` deve ser igual ao número de fundadores
- [ ] **Treasury recebeu stakes:** Verifique o saldo de $FLUXX no Treasury
- [ ] **Badges mintados:** Cada membro deve ter Badge ID 1
- [ ] **Fiador #1 tem Badge de Referral:** Badge ID 4

---

## 📋 ETAPA 2: O TESTE DE CARGA (O MOTOR)

### 🎯 Objetivo

Criar, executar e concluir uma missão completa, validando todo o fluxo do CollabEngine.

---

### 2.1 A Criação da Missão (O Demandante)

**Ação:** O Fundador #1 cria a primeira missão no CollabEngine.

#### Passo a Passo:

1. **Acesse o contrato CollabEngine no PolygonScan:**
   - https://polygonscan.com/address/0x3bFB7e43517B0C91F5Bee75FeDd88317Db7C763C#writeContract

2. **Conecte a wallet** do Fundador #1

3. **Aprove $FLUXX para o CollabEngine:**
   - **Contrato Token:** https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA#writeContract
   - **Função:** `approve(address spender, uint256 amount)`
   - **spender:** `0x3bFB7e43517B0C91F5Bee75FeDd88317Db7C763C` (CollabEngine)
   - **amount:** `100000000000000000000` (100 $FLUXX em wei)

4. **Chame a função `criarMissao(uint256 _recompensa, string memory _urlDescricao)`:**
   - **`_recompensa`:** `100000000000000000000` (100 $FLUXX em wei)
   - **`_urlDescricao`:** `"https://fluxx.space/missao-0"` (ou qualquer URL)
   - **Gas estimado:** ~200.000

5. **Aprove a transação**

6. **Anote o `missaoId` retornado** (geralmente 0 para a primeira missão)

#### Como Verificar:

```solidity
// No CollabEngine, chame:
getMissao(0) // deve retornar os detalhes da missão
// estado deve ser "Aberta" (0)
```

---

### 2.2 O Aceite da Missão (O Colaborador)

**Ação:** O Fundador #2 aceita a missão criada.

#### Passo a Passo:

1. **Acesse o contrato CollabEngine no PolygonScan:**
   - https://polygonscan.com/address/0x3bFB7e43517B0C91F5Bee75FeDd88317Db7C763C#writeContract

2. **Conecte a wallet** do Fundador #2

3. **Chame a função `aceitarMissao(uint256 _missaoId)`:**
   - **`_missaoId`:** `0` (o ID da missão criada)
   - **Gas estimado:** ~100.000

4. **Aprove a transação**

#### Como Verificar:

```solidity
// No CollabEngine, chame:
getMissao(0) 
// estado deve ser "EmProgresso" (1)
// colaborador deve ser enderecoFundador2
```

---

### 2.3 A Entrega do Trabalho

**Ação:** O Fundador #2 entrega o trabalho concluído.

#### Passo a Passo:

1. **Acesse o contrato CollabEngine no PolygonScan**

2. **Conecte a wallet** do Fundador #2

3. **Chame a função `entregarMissao(uint256 _missaoId, string memory _urlEntrega)`:**
   - **`_missaoId`:** `0`
   - **`_urlEntrega`:** `"https://fluxx.space/entrega-missao-0"` (ou qualquer URL)
   - **Gas estimado:** ~150.000

4. **Aprove a transação**

#### Como Verificar:

```solidity
// No CollabEngine, chame:
getMissao(0)
// estado deve ser "Entregue" (2)
// urlEntrega deve ser a URL que você passou
```

---

### 2.4 A Aprovação da Entrega

**Ação:** O Fundador #1 (demandante) aprova a entrega.

#### Passo a Passo:

1. **Acesse o contrato CollabEngine no PolygonScan**

2. **Conecte a wallet** do Fundador #1

3. **Chame a função `aprovarEntrega(uint256 _missaoId)`:**
   - **`_missaoId`:** `0`
   - **Gas estimado:** ~80.000

4. **Aprove a transação**

#### Como Verificar:

```solidity
// No CollabEngine, chame:
getMissao(0)
// estado deve ser "Aprovada" (3)
```

---

### 2.5 A Prova de Aplicação (O GATILHO CRÍTICO)

**Ação:** O Fundador #1 prova que o trabalho foi aplicado e libera o pagamento.

**⚠️ IMPORTANTE:** Esta é a função mais crítica. Ela:
- Libera o pagamento para o colaborador
- Minta badges de Aplicador e Colaborador
- Marca a missão como concluída

#### Passo a Passo:

1. **Acesse o contrato CollabEngine no PolygonScan**

2. **Conecte a wallet** do Fundador #1

3. **Chame a função `provarAplicacao(uint256 _missaoId, string memory _urlAplicacao)`:**
   - **`_missaoId`:** `0`
   - **`_urlAplicacao`:** `"https://fluxx.space"` (URL onde o trabalho está sendo usado)
   - **Gas estimado:** ~250.000

4. **Aprove a transação**

#### Como Verificar:

```solidity
// No CollabEngine, chame:
getMissao(0)
// estado deve ser "Concluida" (5)

// No Token, verifique o saldo do Fundador #2:
balanceOf(enderecoFundador2) // deve ter aumentado em 100 $FLUXX

// No BadgeNFT, verifique os badges:
balanceOf(enderecoFundador1, 3) // deve ser 1 (Badge de Aplicador)
balanceOf(enderecoFundador2, 2) // deve ser 1 (Badge de Colaborador)
```

---

## ✅ VERIFICAÇÃO FINAL DO SISTEMA

Após completar ambas as etapas, verifique:

### Etapa 1 (Membership):
- [ ] Fundador #1 registrado (500 $FLUXX stake)
- [ ] Fundadores #2, #3 registrados (100 $FLUXX cada, com fiador)
- [ ] Treasury recebeu todos os stakes
- [ ] Badges de Membro Ativo mintados
- [ ] Badge de Referral mintado para Fiador #1

### Etapa 2 (CollabEngine):
- [ ] Missão criada e aceita
- [ ] Trabalho entregue e aprovado
- [ ] Prova de aplicação executada
- [ ] Pagamento liberado para colaborador
- [ ] Badges de Aplicador e Colaborador mintados
- [ ] Missão marcada como concluída

---

## 🎯 A PROVA DE VIDA

Se você completou ambas as etapas com sucesso:

✅ **O motor liga** - CollabEngine funciona  
✅ **O combustível está certo** - POL para gas funciona  
✅ **O filtro funciona** - Membership valida membros  
✅ **O pagamento executa** - Tokens são transferidos  
✅ **A reputação funciona** - Badges são mintados  

**Você provou que o sistema não é só código no PolygonScan. É um motor que funciona.**

---

## 📊 CUSTOS ESTIMADOS

| Ação | Gas Estimado | Custo (POL) |
|------|--------------|-------------|
| `register()` | ~150.000 | ~0.015 |
| `registerWithGuarantor()` | ~200.000 | ~0.020 |
| `approve()` (Token) | ~50.000 | ~0.005 |
| `criarMissao()` | ~200.000 | ~0.020 |
| `aceitarMissao()` | ~100.000 | ~0.010 |
| `entregarMissao()` | ~150.000 | ~0.015 |
| `aprovarEntrega()` | ~80.000 | ~0.008 |
| `provarAplicacao()` | ~250.000 | ~0.025 |
| **TOTAL** | **~1.180.000** | **~0.118 POL** |

**Custo total por fundador:** ~0.05-0.10 POL (dependendo de quantas ações cada um faz)

---

## 🚨 TROUBLESHOOTING

### Erro: "Nao e membro"
- **Causa:** Wallet não está registrada no Membership
- **Solução:** Execute `register()` ou `registerWithGuarantor()` primeiro

### Erro: "Saldo de token insuficiente"
- **Causa:** Wallet não tem $FLUXX suficiente
- **Solução:** Transfira $FLUXX do Treasury para a wallet

### Erro: "Transferencia falhou" no approve
- **Causa:** Token não foi aprovado corretamente
- **Solução:** Verifique se o `spender` está correto (endereço do CollabEngine)

### Erro: "Missao nao disponivel"
- **Causa:** Missão já foi aceita ou está em estado incorreto
- **Solução:** Verifique o estado da missão com `getMissao()`

---

**Data:** Novembro 2025  
**Status:** ✅ Pronto para execução

