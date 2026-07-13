import dotenv from 'dotenv'
dotenv.config({ path: '.env.server' })

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  eventId: parseInt(process.env.EVENT_ID || '163', 10),
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_demo_',
    keySecret: process.env.RAZORPAY_KEY_SECRET || '',
  },
  corsOrigin: process.env.CORS_ORIGIN || '*',
  nodeEnv: process.env.NODE_ENV || 'development',
}

export const NIGHT_SLOT_MAP = { 1: 715, 2: 716, 3: 717, 4: 718, 5: 719, 6: 720, 7: 721, 8: 722, 9: 723, 10: 724 }

export const schedule = {
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
    { id: 174, venue: { name: 'Seasons Hotel Rajkot, Gujarat', address: 'Seasons Hotel', city: 'Rajkot' } },
  ],
  shows: [
    { id: 177, show_name: 'Evening Show', name: 'Evening Show', start_time: '21:00:00', end_time: '01:00:00', status: 'active' },
  ],
  slots: Object.entries(NIGHT_SLOT_MAP).map(([nightId, slotId]) => ({
    id: slotId,
    event_date_id: 1866 + Number(nightId),
    event_venue_id: 174,
    event_show_id: 177,
    status: 'active',
  })),
}

export const ticketTypes = [
  { id: 101, title: 'Single Day Pass', price: 499, facilities: [{ id: 1, name: 'Food Coupon', facility_id: 1 }, { id: 2, name: 'Parking', facility_id: 2 }] },
  { id: 102, title: 'Seasonal Pass', price: 2999, facilities: [] },
]