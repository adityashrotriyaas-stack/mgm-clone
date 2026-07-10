export const TICKET_MAP = {
  daily: {
    ticketId: 263,
    title: 'SINGLE DAY TICKET',
  },
  seasonal: {
    ticketId: 265,
    title: 'Season Pass',
  },
}

export function resolveTicketFromPassMode(passMode) {
  return passMode === 'seasonal' ? TICKET_MAP.seasonal : TICKET_MAP.daily
}
