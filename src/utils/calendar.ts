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
    title: 'Casamento Gabriel e Eduarda',
    description: 'Celebração do casamento de Gabriel e Eduarda no Salão de Festas do Condomínio Versatto Jardins',
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

/**
 * Cria URL do Google Calendar para lembrete de presente
 */
export function createPresentReminderUrl(
  presentName: string,
  presentValue: number,
  paymentLink: string,
  reminderDate: Date
): string {
  // Converte a data local (19h BRT) para UTC
  const startDate = new Date(reminderDate);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // +1 hora

  // Formato: yyyyMMddTHHmmss (UTC)
  const formatDate = (date: Date) => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
  };

  const event = {
    title: `Presente Gabriel e Eduarda - ${presentName}`,
    description: `Lembrete para dar o presente!\n\nPresente: ${presentName}\nValor: R$ ${presentValue.toFixed(2)}\n\nClique no link abaixo para fazer o pagamento:\n${paymentLink}`,
    dates: `${formatDate(startDate)}/${formatDate(endDate)}`
  };

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.description,
    dates: event.dates,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Abre Google Calendar com lembrete de presente
 */
export function openPresentReminder(
  presentName: string,
  presentValue: number,
  paymentLink: string,
  reminderDate: Date
): void {
  const url = createPresentReminderUrl(presentName, presentValue, paymentLink, reminderDate);
  window.open(url, '_blank');
}
