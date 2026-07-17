import { NIGHT_SLOT_MAP } from '../config/wowsly'
import { navratriNights } from '../data/siteData'

const FALLBACK_SCHEDULE = { dates: [], venues: [], shows: [], slots: [] }

export function normalizeScheduleResponse(response) {
  const data = response?.data ?? response ?? {}
  const result = {
    dates: Array.isArray(data.dates) ? data.dates : [],
    venues: Array.isArray(data.venues) ? data.venues : [],
    shows: Array.isArray(data.shows) ? data.shows : [],
    slots: Array.isArray(data.slots) ? data.slots : [],
  }
  console.log('Normalized Schedule:', result)
  return result
}

export function buildFallbackSchedule() {
  return FALLBACK_SCHEDULE
}

export function formatScheduleTime(timeString) {
  if (!timeString) return ''
  const [hoursPart, minutesPart] = timeString.split(':')
  let hours = Number(hoursPart)
  const minutes = minutesPart ?? '00'
  const suffix = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12
  return `${hours}:${minutes} ${suffix}`
}

export function formatShowTimeRange(show) {
  if (!show) return ''
  const start = formatScheduleTime(show.start_time)
  const end = formatScheduleTime(show.end_time)
  return start && end ? `${start} – ${end}` : start || end
}

export function resolveSlotFromSelection(schedule, { eventDateId, eventVenueId, eventShowId }) {
  if (!schedule || !eventDateId || !eventVenueId || !eventShowId) return null
  const slot = schedule.slots.find(
    (item) =>
      item.event_date_id === eventDateId &&
      item.event_venue_id === eventVenueId &&
      item.event_show_id === eventShowId &&
      item.status === 'active',
  )
  return slot?.id ?? null
}

export function buildSlotSelection(schedule, { eventDateId, eventVenueId, eventShowId }) {
  const date = schedule.dates.find((item) => item.id === eventDateId)
  const venue = schedule.venues.find((item) => item.id === eventVenueId)
  const show = schedule.shows.find((item) => item.id === eventShowId)
  const eventSlotId = resolveSlotFromSelection(schedule, { eventDateId, eventVenueId, eventShowId })

  return {
    eventDateId,
    eventVenueId,
    eventShowId,
    eventSlotId,
    dateLabel: date?.label || date?.date || '',
    venueName: venue?.venue?.name || '',
    venueAddress: [venue?.venue?.address, venue?.venue?.city].filter(Boolean).join(', '),
    showLabel: show?.show_name || show?.name || 'Show',
    timeLabel: formatShowTimeRange(show),
  }
}

export function buildDefaultSlotSelection(schedule, nightId = 1) {
  const safeNightId = Math.min(Math.max(Number(nightId) || 1, 1), navratriNights.length)
  const date = schedule.dates[safeNightId - 1] ?? schedule.dates[0]
  const venue = schedule.venues[0]
  const show = schedule.shows[0]

  if (!date || !venue || !show) return null

  return buildSlotSelection(schedule, {
    eventDateId: date.id,
    eventVenueId: venue.id,
    eventShowId: show.id,
  })
}

export function getScheduleStepLabel(selection) {
  if (!selection?.dateLabel) return ''
  const parts = [selection.dateLabel, selection.venueName, selection.showLabel].filter(Boolean)
  return parts.join(' · ')
}
