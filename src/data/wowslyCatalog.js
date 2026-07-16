export function buildTicketMap(apiTickets) {
  const map = {
    daily: { male: null, female: null, couple: null },
    seasonal: { male: null, female: null, couple: null },
  }

  if (!Array.isArray(apiTickets)) return map

  apiTickets.forEach((ticket) => {
    const rawName = String(ticket.ticket_display_name || ticket.title || ticket.name || '').toLowerCase()
    const name = rawName.replace(/<[^>]*>?/gm, '')

    const isSeasonal = name.includes('season')
    const type = isSeasonal ? 'seasonal' : 'daily'

    let category = null
    if (name.includes('male') && !name.includes('female')) category = 'male'
    else if (name.includes('female')) category = 'female'
    else if (name.includes('couple')) category = 'couple'

    if (category) {
      map[type][category] = {
        ticketId: ticket.id,
        title: ticket.title || ticket.name,
        displayName: ticket.title || ticket.name || String(ticket.ticket_display_name || '').replace(/<[^>]*>?/gm, ''),
      }
    }
  })

  return map
}

export function resolveTicketFromPassMode(ticketMap, passMode, category) {
  const mode = passMode === 'seasonal' ? 'seasonal' : 'daily'
  if (!ticketMap) return null
  return ticketMap[mode]?.[category] || ticketMap[mode]?.male
}
