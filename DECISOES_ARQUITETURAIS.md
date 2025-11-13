# 🏗️ Decisões Arquiteturais - FLUXX DAO

## ✅ Decisões Implementadas

---

## 1️⃣ `cancelarMissaoTimeout()` - Qualquer um pode chamar

### ✅ Decisão: Qualquer um pode chamar (melhor UX)

**Justificativa:**
- ✅ Permite que a comunidade ajude a limpar missões travadas
- ✅ Não há risco de segurança (só devolve tokens ao demandante)
- ✅ Melhor experiência do usuário (demandante não precisa estar online)
- ✅ Incentiva participação da comunidade

**Implementação:**
```solidity
function cancelarMissaoTimeout(uint256 _missaoId) external nonReentrant {
    // Sem require de msg.sender - qualquer um pode chamar
    // Apenas valida timeout e estado
}
```

---

## 2️⃣ Sistema de Fiança - Slots vs Stake

### ✅ Decisão: Sistema de Slots (sem stake adicional do fiador)

**Justificativa:**
- ✅ Fiador não precisa travar stake adicional
- ✅ Penalidade é perder slots (não pode indicar mais)
- ✅ Mais simples e eficiente
- ✅ Stake do indicado já está no Treasury

**Implementação:**
```solidity
mapping(address => uint256) public slotsDisponiveis; // Padrão: 5

function registerWithGuarantor(address _fiador) external {
    require(slotsDisponiveis[_fiador] > 0, "Fiador sem slots disponiveis");
    slotsDisponiveis[_fiador]--; // Consome 1 slot
}

function slashGuarantor(address _infrator) external {
    if (slotsDisponiveis[fiador] > 0) {
        slotsDisponiveis[fiador]--; // Perde 1 slot
    }
}
```

**Vantagens:**
- Fiador não precisa ter tokens adicionais
- Penalidade é clara (perde capacidade de indicar)
- Sistema mais simples de gerenciar

---

## 3️⃣ Timeout de Missões

### ✅ Decisão: 14 dias (ajustado de 30 dias)

**Justificativa:**
- ✅ Mais rápido para limpar missões travadas
- ✅ 14 dias é tempo suficiente para entregar trabalho
- ✅ Evita que recompensas fiquem presas por muito tempo

**Implementação:**
```solidity
uint256 public constant TIMEOUT_MISSAO = 14 days;
```

---

## 📊 Comparação: Slots vs Stake Adicional

| Aspecto | Slots (Implementado) | Stake Adicional |
|---------|----------------------|----------------|
| **Complexidade** | ✅ Simples | ❌ Mais complexo |
| **Gas** | ✅ Menor | ❌ Maior (transferências) |
| **UX** | ✅ Fiador não precisa ter tokens | ❌ Fiador precisa travar tokens |
| **Penalidade** | ✅ Perde slots | ✅ Perde stake |
| **Flexibilidade** | ✅ Pode recuperar slots no futuro | ❌ Stake fica preso |

**Conclusão:** Sistema de slots é superior para este caso de uso.

---

## 🔒 Segurança

### Validações Implementadas:

1. **Fiador precisa ter slots disponíveis**
2. **Fiador precisa ser membro**
3. **Fiador precisa ter stake (se for "lobo")**
4. **Slash remove slots e reduz stake**

---

**Status:** ✅ Todas as decisões arquiteturais implementadas

