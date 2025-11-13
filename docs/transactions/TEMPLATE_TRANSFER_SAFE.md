# 📋 Template Pronto para Gnosis Safe - Transferir FLUXX

## 🎯 Use Este Template no Transaction Builder do Safe

---

## 🔧 Configuração da Transação

### Dados Base:

```
To Address: 0xB1430cc106bd664F68BE8d0167A52a29654CF8BA
Function: transfer(address to, uint256 amount)
```

---

## 📝 Templates Prontos

### Template 1: Transferir para Fundador #1 (600 FLUXX)

```json
{
  "to": "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA",
  "value": "0",
  "data": "0xa9059cbb000000000000000000000000[ENDEREÇO_FUNDADOR_1]0000000000000000000000000000000000000000000000000827de6e618ea0000",
  "operation": 0
}
```

**Onde:**
- `[ENDEREÇO_FUNDADOR_1]` = Endereço do Fundador #1 (sem 0x, 40 caracteres hex)
- `827de6e618ea0000` = 600 FLUXX em hex (600 * 1e18)

**Exemplo com endereço:**
```
0xa9059cbb0000000000000000000000001234567890123456789012345678901234567890000000000000000000000000000000000000000000000000827de6e618ea0000
```

---

### Template 2: Transferir para Fundador #2 (200 FLUXX)

```json
{
  "to": "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA",
  "value": "0",
  "data": "0xa9059cbb000000000000000000000000[ENDEREÇO_FUNDADOR_2]00000000000000000000000000000000000000000000000002b5e3af16b1880000",
  "operation": 0
}
```

**Onde:**

- `[ENDEREÇO_FUNDADOR_2]` = Endereço do Fundador #2
- `02b5e3af16b1880000` = 200 FLUXX em hex (200 * 1e18)

---

### Template 3: Transferir para Fundador #3 (200 FLUXX)

```json
{
  "to": "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA",
  "value": "0",
  "data": "0xa9059cbb000000000000000000000000[ENDEREÇO_FUNDADOR_3]00000000000000000000000000000000000000000000000002b5e3af16b1880000",
  "operation": 0
}
```

---

### Template 4: Transferir para Carteira da DAO (10.000 FLUXX)

```json
{
  "to": "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA",
  "value": "0",
  "data": "0xa9059cbb000000000000000000000000[ENDEREÇO_CARTEIRA_DAO]00000000000000000000000000000000000000000000000021e19e0c9bab2400000",
  "operation": 0
}
```

**Onde:**

- `[ENDEREÇO_CARTEIRA_DAO]` = Endereço da carteira que vai criar liquidez
- `21e19e0c9bab2400000` = 10.000 FLUXX em hex (10000 * 1e18)

---

### Template 5: Transferir para Carteira da DAO (100.000 FLUXX)

```json
{
  "to": "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA",
  "value": "0",
  "data": "0xa9059cbb000000000000000000000000[ENDEREÇO_CARTEIRA_DAO]00000000000000000000000000000000000000000000000152d02c7e14af680000",
  "operation": 0
}
```

**Onde:**

- `152d02c7e14af680000` = 100.000 FLUXX em hex (100000 * 1e18)

---

## 🛠️ Como Usar no Safe Transaction Builder

### Método 1: Interface Visual

1. Acesse: https://apps-portal.safe.global/tx-builder
2. Conecte o Safe: `0xF040BbD411542F09f775E974fA88E16bF7406d26`
3. Clique em **"Add transaction"**
4. Preencha:
   - **To:** `0xB1430cc106bd664F68BE8d0167A52a29654CF8BA`
   - **Function:** Selecione `transfer` ou cole o ABI abaixo
   - **Parameters:**
     - **to:** `0x...` (endereço de destino)
     - **amount:** `600000000000000000000` (quantidade em wei)

### Método 2: JSON Batch (Múltiplas Transferências)

Para criar múltiplas transferências em uma única transação:

```json
[
  {
    "to": "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA",
    "value": "0",
    "data": "0xa9059cbb000000000000000000000000[FUNDADOR_1]0000000000000000000000000000000000000000000000000827de6e618ea0000",
    "operation": 0
  },
  {
    "to": "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA",
    "value": "0",
    "data": "0xa9059cbb000000000000000000000000[FUNDADOR_2]00000000000000000000000000000000000000000000000002b5e3af16b1880000",
    "operation": 0
  },
  {
    "to": "0xB1430cc106bd664F68BE8d0167A52a29654CF8BA",
    "value": "0",
    "data": "0xa9059cbb000000000000000000000000[FUNDADOR_3]00000000000000000000000000000000000000000000000002b5e3af16b1880000",
    "operation": 0
  }
]
```

---

## 📐 ABI do Token (Para o Safe)

```json
[
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "transfer",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
```

---

## 🔢 Conversor de Quantidades

### Quantidades Comuns (em wei):

| FLUXX | Wei (decimal) | Hex |
|-------|---------------|-----|
| 100 | 100000000000000000000 | `0x56bc75e2d6300000` |
| 200 | 200000000000000000000 | `0x02b5e3af16b1880000` |
| 500 | 500000000000000000000 | `0x6f05b59d3b200000` |
| 600 | 600000000000000000000 | `0x827de6e618ea0000` |
| 1.000 | 1000000000000000000000 | `0xd3c21bcecceda1000000` |
| 10.000 | 10000000000000000000000 | `0x21e19e0c9bab2400000` |
| 100.000 | 100000000000000000000000 | `0x152d02c7e14af680000` |

---

## ✅ Checklist Antes de Executar

- [ ] Endereços de destino estão corretos
- [ ] Quantidades estão corretas (em wei)
- [ ] Você está no Safe correto (`0xF040...6d26`)
- [ ] Rede está correta (Polygon Mainnet)
- [ ] Você é signatário do Safe
- [ ] Safe tem POL suficiente para gas

---

## 🚀 Link Direto para Transaction Builder

https://app.safe.global/apps/open?safe=matic:0xF040BbD411542F09f775E974fA88E16bF7406d26&appUrl=https%3A%2F%2Fapps-portal.safe.global%2Ftx-builder

---

**Status:** ✅ Pronto para usar  
**Data:** Novembro 2025

