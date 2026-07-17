export function buildTicketMap(apiTickets, activePhase = '') {
  const map = {
    daily: { male: null, female: null, couple: null },
    seasonal: { male: null, female: null, couple: null },
  }

  if (!Array.isArray(apiTickets)) return map

  const phaseFilter = String(activePhase).toLowerCase().trim()

  apiTickets.forEach((ticket) => {
    const rawName = String(ticket.ticket_display_name || ticket.title || ticket.name || '').toLowerCase()
    const name = rawName.replace(/<[^>]*>?/gm, '')

    const isSeasonal = name.includes('season')
    
    // If we have an active phase filter, only accept seasonal tickets that match the phase
    if (isSeasonal && phaseFilter && !name.includes(phaseFilter)) {
      return
    }

    const type = isSeasonal ? 'seasonal' : 'daily'

    let category = null
    if (name.includes('male') && !name.includes('female')) category = 'male'
    else if (name.includes('female')) category = 'female'
    else if (name.includes('couple')) category = 'couple'

    if (category) {
      const title = ticket.title || ticket.name
      let displayName = title || String(ticket.ticket_display_name || '').replace(/<[^>]*>?/gm, '')
      
      // Clean up the name for the UI. e.g. "Season Pass(Phase 1) - Male" -> "Season Pass - Male"
      if (isSeasonal) {
        // If it looks like "Season Pass(Phase 1) - Male"
        const match = displayName.match(/(.*?)\((Phase \d+)\)(.*)/i)
        if (match) {
          const passType = match[1].trim()
          const suffix = match[3].replace(/^[\s-]+/, '').trim()
          
          if (suffix) {
            displayName = `${passType} - ${suffix}`
          } else {
            displayName = passType
          }
        }
      }

      map[type][category] = {
        ticketId: ticket.id,
        title: title,
        displayName: displayName,
        price: Number(ticket.amount || ticket.price || 0),
        slotMappings: ticket.slot_mappings || [],
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
