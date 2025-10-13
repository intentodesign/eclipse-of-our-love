/**
 * Utilitários para criação de eventos de calendário
 */

/**
 * Cria URL do Google Calendar com o evento do casamento
 * Formato: yyyyMMddTHHmmss (UTC)
 */
export function getGoogleCalendarUrl(): string {
  // Data do evento: 16/01/2026 às 17h (horário de Brasília = UTC-3)
  // Em UTC seria 20h do mesmo dia
  const startDate = '20260116T200000Z'; // 16/01/2026 20:00 UTC (17:00 BRT)
  const endDate = '20260117T000000Z';   // 17/01/2026 00:00 UTC (21:00 BRT)

  const event = {
    title: 'Casamento Gabriel e Duda',
    description: 'Celebração do casamento de Gabriel e Duda no Salão de Festas do Condomínio Versatto Jardins',
    location: 'Versatto Jardins, Aracaju, SE',
    dates: `${startDate}/${endDate}`
  };

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.description,
    location: event.location,
    dates: event.dates,
    // Adiciona lembretes (em minutos antes do evento)
    // Google Calendar aceita múltiplos lembretes via parâmetro 'reminder'
    // Formato: reminder1=43200&reminder2=28800 etc
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Abre o Google Calendar em nova aba com o evento
 */
export function openGoogleCalendar(): void {
  const url = getGoogleCalendarUrl();
  window.open(url, '_blank');
}
