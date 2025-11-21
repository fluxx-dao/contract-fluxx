# 📋 Preencher Transaction Builder - Passo a Passo

## 🎯 Campos para Preencher

Vejo que você está no Safe Transaction Builder. Aqui está o que preencher:

---

## 📝 Campos Obrigatórios

### 1. **Enter Address or ENS Name**
```
0xC36442b4a4522E871399CD717aBDD847Ab11FE88
```
*(Uniswap Position Manager)*

### 2. **POL value** ⭐ IMPORTANTE
```
0
```
**Deixe em ZERO!** Você não precisa enviar POL, só os tokens (FLUXX e USDC).

### 3. **Data (Hex encoded)**
```
0x883164560000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa84174000000000000000000000000b1430cc106bd664f68be8d0167a52a29654cf8ba0000000000000000000000000000000000000000000000000000000000000bb8fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2761800000000000000000000000000000000000000000000000000000000000d89e800000000000000000000000000000000000000000000000000000000009896800000000000000000000000000000000000000000000000056bc75e2d6310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f040bbd411542f09f775e974fa88e16bf7406d26000000000000000000000000000000000000000000000000000000006b005021
```

---

## ✅ Resumo Rápido

| Campo | Valor |
|-------|-------|
| **To Address** | `0xC36442b4a4522E871399CD717aBDD847Ab11FE88` |
| **POL value** | `0` ⭐ |
| **Data** | `0x88316456...` (hex completo acima) |

---

## ⚠️ Por Que POL value = 0?

**Você não está enviando POL!**

Esta transação:
- ✅ Usa FLUXX e USDC (já aprovados)
- ✅ Cria pool no Uniswap
- ❌ **NÃO** envia POL

O POL só é usado para **gas** (taxa de transação), não como valor da transação.

---

## 🎯 Passo a Passo Visual

1. **Enter Address:** Cole `0xC36442b4a4522E871399CD717aBDD847Ab11FE88`
2. **POL value:** Digite `0` (zero)
3. **Data:** Cole o hex completo
4. **Revise**
5. **Execute**

---

## ✅ Checklist

- [ ] To Address preenchido
- [ ] POL value = 0 ⭐
- [ ] Data (hex) colado
- [ ] Revisado
- [ ] Pronto para executar

---

**Status:** Preenchendo Transaction Builder  
**POL value:** 0 (zero)  
**Próximo passo:** Colar Data e executar

