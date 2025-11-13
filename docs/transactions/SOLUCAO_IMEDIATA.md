# 🚨 Solução Imediata: Como Transferir Agora

## ❌ Problema

O contrato Treasury atual **não permite** que o owner (Safe) transfira tokens diretamente. Apenas o Governance pode fazer isso.

---

## ✅ Solução Imediata: Fazer Deploy do Novo Treasury

### Passo 1: Compilar o Novo Contrato

O contrato já foi atualizado com a função `withdrawTokensByOwner`. Agora precisa:

1. **Compilar:**
   ```bash
   npx hardhat compile
   ```

2. **Fazer deploy do novo Treasury:**
   ```bash
   npx hardhat run scripts/deployTreasuryOnly.js --network polygon
   ```

3. **Migrar tokens** do Treasury antigo para o novo

4. **Usar a nova função** no Safe

---

## 🔄 Alternativa: Usar Governance (Mais Trabalhoso)

Se não quiser fazer deploy agora, pode usar o Governance:

1. Registrar fundadores manualmente (via Safe, se possível)
2. Criar propostas no Governance para transferir tokens
3. Votar e executar

---

## 📝 Qual Solução Você Prefere?

**A)** Fazer deploy do novo Treasury (recomendado - ~5 minutos)
**B)** Usar Governance (mais demorado, mas funciona com contrato atual)

Me diga qual prefere e eu crio o script necessário! 🚀

