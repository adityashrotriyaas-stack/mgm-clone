export const WOWSLY_API_BASE = import.meta.env.VITE_WOWSLY_API_BASE || ''
export const WOWSLY_EVENT_ID = Number(import.meta.env.VITE_WOWSLY_EVENT_ID || 0)
export const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || ''
export const DEFAULT_DIALING_CODE = import.meta.env.VITE_DEFAULT_DIALING_CODE || '91'
export const DEFAULT_TIMEZONE = import.meta.env.VITE_DEFAULT_TIMEZONE || 'Asia/Calcutta'
export const ENABLE_LIVE_PAYMENT = import.meta.env.VITE_ENABLE_LIVE_PAYMENT === 'true'
export const WOWSLY_VERIFY_PATH = import.meta.env.VITE_WOWSLY_VERIFY_PATH || '/v2/checkout/verify-payment'
export const WOWSLY_REQUIRE_PAYMENT_VERIFY = import.meta.env.VITE_WOWSLY_REQUIRE_PAYMENT_VERIFY === 'true'

export const FORM_ID = 122

// export const QUESTION_MAP = {
//   name: '622',
//   countryCode: '623',
//   mobile: '624',
//   email: '625',
// }

/** Semantic keys mapped to the exact question strings in the API */
export const QUESTION_MAP = {
  NAME: 'Name',
  COUNTRY_CODE: 'Country Code',
  MOBILE: 'Mobile Number',
  EMAIL: 'Email',
  AADHAAR: 'Aadhaar Card Number',
  PHOTO: 'Pass Photo',
}

/** Maps API fields array to semantic map of IDs */
export const mapFormFields = (fields) => {
  if (!fields || !Array.isArray(fields)) return {}

  const map = {}
  Object.entries(QUESTION_MAP).forEach(([key, label]) => {
    const field = fields.find((f) => {
      const q = String(f.question || '').trim().toLowerCase()
      const l = String(label || '').trim().toLowerCase()
      return q === l
    })
    if (field) {
      map[key] = field.id
    }
  })
  return map
}

export const COMMON_EVENT_QUERY = '?common_event_link=true'

/** Local night id (1–10) → Wowsly event_slot_id */
export let NIGHT_SLOT_MAP = {
  1: 715,
  2: 716,
  3: 717,
  4: 718,
  5: 719,
  6: 720,
  7: 721,
  8: 722,
  9: 723,
  10: 724,
}

/** Dynamically populates NIGHT_SLOT_MAP from schedule public response */
export function updateNightSlotMap(scheduleData) {
  const data = scheduleData?.data ?? scheduleData ?? {}
  const dates = Array.isArray(data.dates) ? [...data.dates].sort((a, b) => String(a.date || '').localeCompare(String(b.date || ''))) : []
  const slots = Array.isArray(data.slots) ? data.slots : []

  if (dates.length === 0 || slots.length === 0) return

  const newMap = {}
  dates.forEach((dateObj, index) => {
    const nightNumber = index + 1
    const matchingSlot = slots.find((s) => s.event_date_id === dateObj.id || s.date_id === dateObj.id)
    if (matchingSlot) {
      newMap[nightNumber] = matchingSlot.id
    }
  })

  if (Object.keys(newMap).length > 0) {
    NIGHT_SLOT_MAP = { ...NIGHT_SLOT_MAP, ...newMap }
  }
}

export function isWowslyConfigured() {
  return WOWSLY_EVENT_ID > 0 && ENABLE_LIVE_PAYMENT && Boolean(WOWSLY_API_BASE)
}

export function shouldVerifyPayment() {
  return WOWSLY_REQUIRE_PAYMENT_VERIFY || Boolean(import.meta.env.VITE_WOWSLY_VERIFY_PATH)
}
