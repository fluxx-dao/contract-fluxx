# ✅ Explicação: Transações do Token no PolygonScan

## 📋 Situação Observada

Após executar `Treasury.withdrawTokensByOwner()`, você observou:

- ✅ **Transações aparecem na aba do Token:** https://polygonscan.com/token/0x263Fe9898b8A9bba3E08403cC9054dCa39a11636
- ❓ **Transações NÃO aparecem na aba do Contrato:** https://polygonscan.com/address/0x263Fe9898b8A9bba3E08403cC9054dCa39a11636

---

## ✅ Isso é Normal e Esperado!

### Por que isso acontece?

Quando você usa `Treasury.withdrawTokensByOwner()`:

1. **A transação é enviada pelo Treasury:**
   - `msg.sender` = Treasury (`0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93`)
   - A transação aparece na aba do **Treasury**, não do Token

2. **O evento Transfer é emitido pelo Token:**
   - O Token emite o evento `Transfer(from, to, amount)`
   - Por isso aparece na aba do **Token** (todas as transferências)

3. **O PolygonScan categoriza assim:**
   - **Aba Token (`/token/...`):** Mostra TODOS os eventos `Transfer` emitidos pelo token
   - **Aba Contrato (`/address/...`):** Mostra apenas transações enviadas DIRETAMENTE ao contrato

---

## 🔍 Onde Ver as Transações

### 1. Aba do Token (Todas as Transferências)

**URL:** https://polygonscan.com/token/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA

**O que mostra:**
- ✅ Todas as transferências (via Treasury, diretas, etc.)
- ✅ Eventos `Transfer` emitidos pelo token
- ✅ Histórico completo de movimentações

**Aqui você verá:**
- Transferências via `Treasury.withdrawTokensByOwner()`
- Transferências diretas (se houver)
- Mints e burns

---

### 2. Aba do Treasury (Transações Executadas)

**URL:** https://polygonscan.com/address/0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93

**O que mostra:**
- ✅ Transações enviadas ao Treasury
- ✅ Chamadas de `withdrawTokensByOwner()`
- ✅ Histórico de execuções do Treasury

**Aqui você verá:**
- As transações que você executou via Safe
- Chamadas de `withdrawTokensByOwner()`
- Outras operações do Treasury

---

### 3. Aba do Contrato Token (Apenas Diretas)

**URL:** https://polygonscan.com/address/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA

**O que mostra:**
- ❌ Apenas transações enviadas DIRETAMENTE ao Token
- ❌ Normalmente só mints (se houver)
- ❌ Não mostra transferências via contratos intermediários

**Por que não aparece:**
- A transação foi enviada ao **Treasury**, não ao Token
- O Token apenas emitiu o evento, mas não recebeu a transação diretamente

---

## 📊 Fluxo da Transação

```
1. Safe → Treasury.withdrawTokensByOwner()
   └─> Transação aparece na aba do Treasury

2. Treasury → Token.transfer(to, amount)
   └─> Token emite evento Transfer(from, to, amount)
   └─> Evento aparece na aba do Token

3. Resultado:
   ✅ Tokens transferidos com sucesso
   ✅ Evento Transfer indexado corretamente
   ✅ Aparece na aba do Token (correto)
   ❌ NÃO aparece na aba do Contrato Token (esperado)
```

---

## ✅ Verificação: Tudo Está Funcionando

### Como verificar que funcionou:

1. **Verificar saldos dos fundadores:**
   - Fundador #1: https://polygonscan.com/address/0xB04A61b436cFc40e7Aad7B73b34E47dAd79cc57f#tokentxns
   - Fundador #2: https://polygonscan.com/address/0xa387691E594dF109aD9cA83767F39D419CBC6001#tokentxns
   - Fundador #3: https://polygonscan.com/address/0x887b641EF4A1e99022e290dF6Ac9c81eA50AE0CD#tokentxns
   - Fundador #4: https://polygonscan.com/address/0xc8b6C6cF88ecE28EfDede72ed625b95b73Cb649F#tokentxns

2. **Verificar na aba do Token:**
   - https://polygonscan.com/token/0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
   - Você deve ver os eventos `Transfer` para cada fundador

3. **Verificar na aba do Treasury:**
   - https://polygonscan.com/address/0x5eC0FE666E99a697BB9B88b4b053AEFB78570F93
   - Você deve ver as chamadas de `withdrawTokensByOwner()`

---

## 🎯 Resumo

| Local | O que Mostra | Por quê |
|-------|--------------|---------|
| **Aba Token** | ✅ Todas as transferências | Mostra eventos `Transfer` emitidos |
| **Aba Treasury** | ✅ Transações executadas | Mostra chamadas ao Treasury |
| **Aba Contrato Token** | ❌ Apenas diretas | Não mostra via contratos intermediários |

**Conclusão:** ✅ **Tudo está funcionando corretamente!**

O comportamento observado é o padrão esperado em todos os explorers EVM (PolygonScan, Etherscan, etc.) quando tokens são transferidos via contratos intermediários.

---

## 📝 Nota Técnica

Isso acontece porque:

1. **PolygonScan categoriza transações por `to` address:**
   - Se `to` = Token → Aparece na aba do Contrato Token
   - Se `to` = Treasury → Aparece na aba do Treasury

2. **Mas eventos são indexados pelo contrato que os emite:**
   - Evento `Transfer` emitido pelo Token → Aparece na aba do Token
   - Independente de quem chamou a função

3. **Isso é o comportamento padrão:**
   - Todos os tokens ERC20 funcionam assim
   - Não é um bug ou problema
   - É a forma como os explorers organizam as informações

---

**Status:** ✅ Comportamento normal e esperado  
**Ação necessária:** Nenhuma - tudo funcionando corretamente

