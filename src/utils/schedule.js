import { NIGHT_SLOT_MAP } from '../config/wowsly'
import { navratriNights } from '../data/siteData'

const FALLBACK_SCHEDULE = {
  dates: [
    { id: 1867, date: '2026-10-10', label: 'Sat, 10 Oct', status: 'active', registration_disabled: false },
    { id: 1868, date: '2026-10-11', label: 'Sun, 11 Oct', status: 'active', registration_disabled: false },
    { id: 1869, date: '2026-10-12', label: 'Mon, 12 Oct', status: 'active', registration_disabled: false },
    { id: 1870, date: '2026-10-13', label: 'Tue, 13 Oct', status: 'active', registration_disabled: false },
    { id: 1871, date: '2026-10-14', label: 'Wed, 14 Oct', status: 'active', registration_disabled: false },
    { id: 1872, date: '2026-10-15', label: 'Thu, 15 Oct', status: 'active', registration_disabled: false },
    { id: 1873, date: '2026-10-16', label: 'Fri, 16 Oct', status: 'active', registration_disabled: false },
    { id: 1874, date: '2026-10-17', label: 'Sat, 17 Oct', status: 'active', registration_disabled: false },
    { id: 1875, date: '2026-10-18', label: 'Sun, 18 Oct', status: 'active', registration_disabled: false },
    { id: 1876, date: '2026-10-19', label: 'Mon, 19 Oct', status: 'active', registration_disabled: false },
  ],
  venues: [
    {
      id: 174,
      venue: {
        name: 'Seasons Hotel Rajkot, Gujarat',
        address: 'Seasons Hotel\nRajkot, Gujarat',
        city: 'Rajkot',
      },
    },
  ],
  shows: [
    { id: 177, show_name: 'Show 1', name: 'Show 1', start_time: '21:00:00', end_time: '14:00:00', status: 'active' },
  ],
  slots: [
    { id: 715, event_date_id: 1867, event_venue_id: 174, event_show_id: 177, status: 'active' },
    { id: 716, event_date_id: 1868, event_venue_id: 174, event_show_id: 177, status: 'active' },
    { id: 717, event_date_id: 1869, event_venue_id: 174, event_show_id: 177, status: 'active' },
    { id: 718, event_date_id: 1870, event_venue_id: 174, event_show_id: 177, status: 'active' },
    { id: 719, event_date_id: 1871, event_venue_id: 174, event_show_id: 177, status: 'active' },
    { id: 720, event_date_id: 1872, event_venue_id: 174, event_show_id: 177, status: 'active' },
    { id: 721, event_date_id: 1873, event_venue_id: 174, event_show_id: 177, status: 'active' },
    { id: 722, event_date_id: 1874, event_venue_id: 174, event_show_id: 177, status: 'active' },
    { id: 723, event_date_id: 1875, event_venue_id: 174, event_show_id: 177, status: 'active' },
    { id: 724, event_date_id: 1876, event_venue_id: 174, event_show_id: 177, status: 'active' },
  ],
}

export function normalizeScheduleResponse(response) {
  const data = response?.data ?? response ?? {}
  return {
    dates: Array.isArray(data.dates) ? data.dates : [],
    venues: Array.isArray(data.venues) ? data.venues : [],
    shows: Array.isArray(data.shows) ? data.shows : [],
    slots: Array.isArray(data.slots) ? data.slots : [],
  }
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
