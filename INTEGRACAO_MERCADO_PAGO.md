# Integração com Mercado Pago

Este documento explica como integrar o sistema de presentes com o Mercado Pago para processar pagamentos.

## Visão Geral

Atualmente, o site está preparado para integração com Mercado Pago, mas o código de pagamento ainda precisa ser implementado. O fluxo está marcado com `// TODO: Integrar com Mercado Pago` no arquivo `src/pages/Presentes.tsx`.

## Opções de Integração

### Opção 1: Link de Pagamento Direto (Mais Simples)

Criar links de pagamento diretamente no Mercado Pago e redirecionar o usuário:

1. Acesse: https://www.mercadopago.com.br/tools/create
2. Crie um link de pagamento para cada presente
3. Adicione os links no código:

```typescript
const presents: Present[] = [
  {
    id: 1,
    name: "Airfryer",
    price: 350,
    icon: Wind,
    available: true,
    paymentLink: "https://mpago.la/XXXXX" // Link gerado no MP
  },
  // ... outros presentes
];

const handleBuyPresent = () => {
  if (!selectedPresent?.paymentLink) return;
  window.location.href = selectedPresent.paymentLink;
};
```

**Vantagens:**
- Sem código backend necessário
- Implementação imediata
- Seguro (gerenciado pelo Mercado Pago)

**Desvantagens:**
- Links fixos (precisa gerar um por presente)
- Não marca automaticamente como "vendido"

### Opção 2: Mercado Pago SDK (Recomendado)

Usar o SDK do Mercado Pago para criar pagamentos dinâmicos:

#### Passo 1: Obter Credenciais

1. Acesse: https://www.mercadopago.com.br/developers/panel
2. Crie um aplicativo
3. Copie suas credenciais:
   - **Access Token** (público)
   - **Access Token** (privado - NÃO expor no frontend)

#### Passo 2: Instalar SDK

```bash
npm install @mercadopago/sdk-react
```

#### Passo 3: Criar Arquivo de Configuração

Crie `src/config/mercadopago.ts`:

```typescript
export const MERCADO_PAGO_PUBLIC_KEY = 'TEST-xxxxx-xxxxx'; // Substitua pela sua chave pública
```

#### Passo 4: Implementar no Código

Atualize `src/pages/Presentes.tsx`:

```typescript
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { MERCADO_PAGO_PUBLIC_KEY } from '@/config/mercadopago';

// Inicializar no componente
useEffect(() => {
  initMercadoPago(MERCADO_PAGO_PUBLIC_KEY);
}, []);

const handleBuyPresent = async () => {
  if (!selectedPresent) return;

  try {
    // Chamar seu backend para criar preferência
    const response = await fetch('/api/create-preference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: selectedPresent.name,
        quantity: 1,
        unit_price: selectedPresent.price,
      }),
    });

    const { id } = await response.json();

    // Redirecionar para checkout
    // Ou usar o componente Wallet do MP
  } catch (error) {
    console.error('Erro ao criar pagamento:', error);
    toast.error('Erro ao processar pagamento');
  }
};
```

### Opção 3: API do Mercado Pago (Máximo Controle)

#### Backend Necessário (Google Apps Script ou similar)

Crie um endpoint que gera preferências de pagamento:

```javascript
// No Apps Script
function doPost(e) {
  const data = JSON.parse(e.postData.contents);

  const preferenceData = {
    items: [{
      title: data.title,
      quantity: 1,
      unit_price: data.unit_price,
    }],
    back_urls: {
      success: "https://intentodesign.github.io/eclipse-of-our-love/#/obrigado",
      failure: "https://intentodesign.github.io/eclipse-of-our-love/#/presentes",
      pending: "https://intentodesign.github.io/eclipse-of-our-love/#/presentes"
    },
    auto_return: "approved",
  };

  // Chamar API do Mercado Pago
  const mpResponse = UrlFetchApp.fetch('https://api.mercadopago.com/checkout/preferences', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
      'Content-Type': 'application/json',
    },
    payload: JSON.stringify(preferenceData),
  });

  const preference = JSON.parse(mpResponse.getContentText());

  return ContentService
    .createTextOutput(JSON.stringify({
      preferenceId: preference.id,
      initPoint: preference.init_point,
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Marcar Presente como "Vendido"

Para evitar que duas pessoas comprem o mesmo presente:

### Solução 1: Google Sheets (Simples)

Adicione uma coluna "Vendido" na planilha e atualize via Apps Script quando receber confirmação de pagamento.

### Solução 2: Webhook do Mercado Pago (Avançado)

Configure um webhook que notifica quando um pagamento é aprovado:

1. No painel do MP: Webhooks > Criar
2. URL: Seu endpoint do Apps Script
3. Quando receber notificação de pagamento aprovado:
   - Marque o presente como vendido na planilha
   - Atualize o campo `available: false`

## Vaquinha (Contribuições de Valor Livre)

Para contribuições livres, use QR Code PIX ou link direto:

### Opção 1: PIX Copia e Cola

```typescript
const handleConfirmContribution = () => {
  const pixKey = "sua-chave-pix@email.com"; // Sua chave PIX

  toast.success("Copie a chave PIX:", {
    description: pixKey,
    duration: 10000,
  });

  navigator.clipboard.writeText(pixKey);
};
```

### Opção 2: Mercado Pago Link de Pagamento Flexível

Crie um link que aceita qualquer valor:
- https://www.mercadopago.com.br/tools/create
- Marque "Permitir que o comprador altere o valor"

## Ambiente de Testes

Antes de ir para produção:

1. Use credenciais de teste do Mercado Pago
2. Cartões de teste: https://www.mercadopago.com.br/developers/pt/docs/sdks-library/testing/test-cards
3. Teste todos os fluxos: sucesso, falha, pendente

## Próximos Passos

1. Decidir qual opção usar (recomendo Opção 1 ou 2)
2. Obter credenciais do Mercado Pago
3. Implementar o código
4. Testar em ambiente de sandbox
5. Fazer deploy em produção

## Recursos Úteis

- Documentação oficial: https://www.mercadopago.com.br/developers/pt/docs
- SDK React: https://github.com/mercadopago/sdk-react
- Criar aplicativo: https://www.mercadopago.com.br/developers/panel
- Ferramentas: https://www.mercadopago.com.br/tools

## Observações Importantes

- **NUNCA** exponha seu Access Token privado no frontend
- Use HTTPS em produção
- Configure webhooks para confirmação automática
- Teste extensivamente antes de divulgar o link
- Considere taxa do Mercado Pago nos preços (aprox. 4,99%)
