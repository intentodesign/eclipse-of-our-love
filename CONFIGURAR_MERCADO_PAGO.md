# Como Configurar URL de Retorno no Mercado Pago

Depois que a pessoa pagar, ela precisa voltar para o site para ver a mensagem de agradecimento.

## URL de Retorno para TODOS os links

Configure esta URL em **TODOS** os 11 links de pagamento (presentes e vaquinha):

```
https://intentodesign.github.io/eclipse-of-our-love/#/obrigado?presente=sim
```

## Como Configurar no Mercado Pago

1. Acesse cada link de pagamento no painel do Mercado Pago
2. Procure por "URL de retorno" ou "URL de sucesso" ou "Redirect URL"
3. Cole a URL acima
4. Salve as alterações

## Links que precisam da configuração

### Presentes (6 links)
- Jogo de Toalhas: https://mpago.li/1gHyXWW
- Cafeteira: https://mpago.li/19HvsaU
- Jogo de Panelas: https://mpago.li/1zLY8Ve
- Airfryer: https://mpago.li/1nCLwYr
- Aparelho de Jantar: https://mpago.li/2ciB29K
- Kit Cozinha: https://mpago.li/1FP37Dv

### Vaquinha (5 links)
- Pastelzinho (R$ 20): https://mpago.li/2z5zP3k
- Hambúrguer (R$ 50): https://mpago.li/1waPnoe
- Jantar (R$ 200): https://mpago.li/2uzmT6x
- Viagem Maceió (R$ 300): https://mpago.li/2DPgzk1
- Outro valor: https://link.mercadopago.com.br/leaveyourmark

## Como Funciona

### Com presente (vindo do Mercado Pago)
A pessoa paga → MP redireciona para `/obrigado?presente=sim` → Mostra mensagem:
- "Sua generosidade nos emociona!"
- "Este presente nos ajudará a construir nossa vida juntos e será usado com muito carinho."
- "Cada vez que usarmos o que você nos deu, vamos lembrar do seu apoio..."

### Sem presente (quando clica "Não, obrigado")
A pessoa clica em não dar presente → Vai para `/obrigado` (sem parâmetro) → Mostra mensagem:
- "Sua presença é o maior presente que poderíamos receber"
- "Saber que você estará ao nosso lado neste momento tão especial já nos enche de alegria..."

## Importante

Se você **não configurar** a URL de retorno, não tem problema. A pessoa simplesmente fica na página de sucesso do Mercado Pago e não volta para o site. Mas é melhor configurar para dar uma experiência completa! 😊
