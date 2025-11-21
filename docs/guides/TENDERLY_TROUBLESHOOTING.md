# 🔧 Tenderly - Solução de Problemas

## ⚠️ Avisos Comuns

### "Tenderly config doesn't exist"

**Este aviso é normal e pode ser ignorado.**

O plugin do Tenderly procura um arquivo de configuração adicional, mas funciona perfeitamente usando apenas as variáveis de ambiente do `.env`.

**Solução:** Nenhuma ação necessária. O plugin funciona normalmente.

---

## ❌ Erros Comuns

### 1. "Plugin Tenderly não encontrado"

**Erro:**
```
Plugin Tenderly não encontrado
```

**Solução:**
```bash
npm install --save-dev @tenderly/hardhat-tenderly
```

---

### 2. "Tenderly authentication failed"

**Erro:**
```
Tenderly authentication failed
```

**Solução:**
1. Verifique se o `TENDERLY_ACCESS_TOKEN` está correto no `.env`
2. Gere um novo token em: https://dashboard.tenderly.co/settings/authorization
3. Certifique-se de que o token não expirou

---

### 3. "Project not found"

**Erro:**
```
Project 'fluxx-dao' not found
```

**Solução:**
1. Verifique se o projeto existe no Tenderly Dashboard
2. Confirme o nome exato do projeto no `.env`:
   ```bash
   TENDERLY_PROJECT=fluxx-dao
   ```
3. Verifique o username:
   ```bash
   TENDERLY_USERNAME=seu-usuario
   ```

---

### 4. "Contract verification failed"

**Erro:**
```
Contract verification failed
```

**Solução:**
1. Certifique-se de que o contrato foi compilado:
   ```bash
   npx hardhat compile
   ```
2. Verifique se o endereço do contrato está correto
3. Verifique se os argumentos do construtor estão corretos
4. Tente verificar manualmente no Tenderly Dashboard

---

### 5. "Simulation failed"

**Erro:**
```
Simulation failed
```

**Solução:**
1. Verifique se a rede está correta (chain: 137 para Polygon)
2. Verifique se o endereço do contrato está correto
3. Verifique se os parâmetros da função estão corretos
4. Verifique se há saldo suficiente na conta (para transações que requerem gas)

---

## 🔍 Verificar Configuração

Execute o script de setup para verificar se tudo está configurado corretamente:

```bash
npx hardhat run scripts/tenderlySetup.js --network polygon
```

---

## 📞 Suporte

- **Documentação Tenderly:** https://docs.tenderly.co/
- **Dashboard:** https://dashboard.tenderly.co/
- **GitHub Issues:** https://github.com/Tenderly/hardhat-tenderly/issues

---

**Última atualização:** Novembro 2025

