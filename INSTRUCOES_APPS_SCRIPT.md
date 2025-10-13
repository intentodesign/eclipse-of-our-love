# Instruções para Configurar o Google Apps Script

O formulário de confirmação de presença está configurado para salvar os dados no Google Sheets através do Apps Script. Siga estas etapas para ativar a integração:

## Passo 1: Abrir a Planilha

Acesse sua planilha: https://docs.google.com/spreadsheets/d/19O0i_OMDhuV_1U7bgGx28rMbfuffq3IdZcFjSXs7Ng0/edit?gid=1767199409#gid=1767199409

## Passo 2: Criar o Apps Script

1. Na planilha, clique em **Extensões** > **Apps Script**
2. Delete qualquer código existente
3. Copie todo o código do arquivo `apps-script-sheets.js` (na raiz do projeto)
4. Cole no editor do Apps Script
5. Clique em **Salvar** (ícone de disquete)

## Passo 3: Implantar como Web App

1. Clique em **Implantar** > **Nova implantação**
2. Clique no ícone de engrenagem ⚙️ ao lado de "Selecionar tipo"
3. Escolha **Aplicativo da Web**
4. Configure:
   - **Descrição**: "API de Confirmação de Presença"
   - **Executar como**: "Eu (seu email)"
   - **Quem tem acesso**: "Qualquer pessoa"
5. Clique em **Implantar**
6. **IMPORTANTE**: Copie a URL do Web App gerada (vai ser algo como: `https://script.google.com/macros/s/XXXXX/exec`)

## Passo 4: Configurar a URL no Projeto

1. Abra o arquivo `src/config/api.ts`
2. Substitua `SEU_SCRIPT_ID_AQUI` pela URL completa que você copiou
3. Salve o arquivo

Exemplo:
```typescript
export const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
```

## Passo 5: Fazer Deploy

1. Commit e push das alterações:
```bash
git add src/config/api.ts
git commit -m "Configure Apps Script URL"
git push origin main
```

2. O GitHub Actions vai fazer o deploy automaticamente

## Passo 6: Testar

Após o deploy:
1. Acesse o site: https://intentodesign.github.io/eclipse-of-our-love/
2. Clique em "Confirmar Presença"
3. Preencha o formulário de teste
4. Verifique se os dados aparecem na planilha na aba "Confirmados"

## Estrutura da Planilha

O script criará automaticamente uma aba chamada "Confirmados" com as seguintes colunas:

- **Timestamp**: Data e hora da confirmação
- **Nome**: Nome completo do convidado
- **Papel**: Família da Noiva, Família do Noivo, Amigo(a) da Noiva, ou Amigo(a) do Noivo
- **Parentesco**: Se for família, o grau de parentesco
- **Email**: Email do convidado (opcional)
- **Telefone**: Telefone do convidado (opcional)

## Solução de Problemas

### O formulário não salva na planilha
- Verifique se você copiou a URL correta do Apps Script
- Certifique-se de que escolheu "Qualquer pessoa" no acesso
- Teste executando a função `testPost` no Apps Script (Ver > Execuções)

### Erro de permissão
- Ao implantar pela primeira vez, o Google vai pedir permissões
- Clique em "Revisar permissões"
- Escolha sua conta
- Clique em "Avançado" > "Ir para [nome do projeto]"
- Clique em "Permitir"

### Não aparece a aba "Confirmados"
- Execute a função `testPost` manualmente no Apps Script
- Isso vai criar a aba e você pode verificar se funciona

## Observações Importantes

- O site funciona mesmo sem o Apps Script configurado, mas os dados não serão salvos
- Usuários verão um aviso se o Apps Script não estiver configurado
- Após configurar, os dados serão salvos automaticamente na planilha
- Você pode adicionar validações e formatações na planilha depois
