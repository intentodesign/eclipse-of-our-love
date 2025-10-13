/**
 * Utilitários para criação de eventos de calendário
 */

interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  reminders: number[]; // minutos antes do evento
}

/**
 * Cria um arquivo ICS para download com múltiplos lembretes
 */
export function createICSFile(event: CalendarEvent): string {
  const formatDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const createAlarm = (minutesBefore: number): string => {
    return `BEGIN:VALARM
TRIGGER:-PT${minutesBefore}M
ACTION:DISPLAY
DESCRIPTION:${event.title}
END:VALARM`;
  };

  const alarms = event.reminders.map(createAlarm).join('\n');

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Casamento Gabriel e Duda//PT
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${Date.now()}@casamento-gabriel-duda
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(event.startDate)}
DTEND:${formatDate(event.endDate)}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
STATUS:CONFIRMED
${alarms}
END:VEVENT
END:VCALENDAR`;

  return icsContent;
}

/**
 * Faz download do arquivo ICS
 */
export function downloadICS(event: CalendarEvent): void {
  const icsContent = createICSFile(event);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'casamento-gabriel-duda.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

/**
 * Cria evento do casamento com todos os lembretes configurados
 */
export function createWeddingEvent(): CalendarEvent {
  const eventDate = new Date('2026-01-16T17:00:00-03:00'); // 16/01/2026 às 17h (horário de Brasília)
  const endDate = new Date('2026-01-16T21:00:00-03:00'); // até 21h

  return {
    title: 'Casamento Gabriel e Duda',
    description: 'Celebração do casamento de Gabriel e Duda no Salão de Festas do Condomínio Versatto Jardins',
    location: 'Versatto Jardins, Aracaju, SE',
    startDate: eventDate,
    endDate: endDate,
    reminders: [
      43200, // 30 dias antes (30 * 24 * 60)
      28800, // 20 dias antes (20 * 24 * 60)
      21600, // 15 dias antes (15 * 24 * 60)
      7200,  // 5 dias antes (5 * 24 * 60)
      1440,  // 1 dia antes (24 * 60)
      240,   // 4 horas antes (4 * 60)
      10     // 10 minutos antes
    ]
  };
}
