export const TICKET_MAP = {
  daily: {
    male: { ticketId: 263, title: 'Day Pass - Male' },
    female: { ticketId: 287, title: 'Day Pass - Female' },
    couple: { ticketId: 289, title: 'Day Pass - Couple' },
  },
  seasonal: {
    male: { ticketId: 286, title: 'Season Pass - Male' },
    female: { ticketId: 288, title: 'Season Pass - Female' },
    couple: { ticketId: 265, title: 'Season Pass - Couple' },
  },
}

export function resolveTicketFromPassMode(passMode, category) {
  const mode = passMode === 'seasonal' ? 'seasonal' : 'daily'
  return TICKET_MAP[mode]?.[category] || TICKET_MAP[mode]?.male
}
