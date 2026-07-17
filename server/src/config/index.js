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

export let schedule = {
  dates: [], venues: [], shows: [], slots: []
}

export let NIGHT_SLOT_MAP = {}

export async function fetchSchedule() {
  try {
    const eventId = process.env.EVENT_ID || 178
    const res = await fetch(`https://dev-backend.wowsly.com/api/events/${eventId}/schedule/public`)
    const data = await res.json()
    if (data && data.data) {
      schedule = data.data
      NIGHT_SLOT_MAP = schedule.slots.reduce((acc, slot, idx) => {
        acc[idx + 1] = slot.id
        return acc
      }, {})
      console.log('Dynamic schedule loaded from Wowsly API')
    }
  } catch (err) {
    console.error('Failed to fetch dynamic schedule:', err)
  }
}

export const ticketTypes = [
  { id: 101, title: 'Single Day Pass', price: 499, facilities: [{ id: 1, name: 'Food Coupon', facility_id: 1 }, { id: 2, name: 'Parking', facility_id: 2 }] },
  { id: 102, title: 'Seasonal Pass', price: 2999, facilities: [] },
]