export const WOWSLY_API_BASE = import.meta.env.VITE_WOWSLY_API_BASE || ''
export const WOWSLY_EVENT_ID = Number(import.meta.env.VITE_WOWSLY_EVENT_ID || 0)
export const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || ''
export const DEFAULT_DIALING_CODE = import.meta.env.VITE_DEFAULT_DIALING_CODE || '91'
export const DEFAULT_TIMEZONE = import.meta.env.VITE_DEFAULT_TIMEZONE || 'Asia/Calcutta'
export const ENABLE_LIVE_PAYMENT = import.meta.env.VITE_ENABLE_LIVE_PAYMENT === 'true'
export const WOWSLY_VERIFY_PATH = import.meta.env.VITE_WOWSLY_VERIFY_PATH || '/v2/checkout/verify-payment'
export const WOWSLY_REQUIRE_PAYMENT_VERIFY = import.meta.env.VITE_WOWSLY_REQUIRE_PAYMENT_VERIFY === 'true'

export const FORM_ID = 122

export const QUESTION_MAP = {
  name: '622',
  countryCode: '623',
  mobile: '624',
  email: '625',
}

export const COMMON_EVENT_QUERY = '?common_event_link=true'

/** Local night id (1–10) → Wowsly event_slot_id */
export const NIGHT_SLOT_MAP = {
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

export function isWowslyConfigured() {
  return WOWSLY_EVENT_ID > 0 && ENABLE_LIVE_PAYMENT && Boolean(WOWSLY_API_BASE)
}

export function shouldVerifyPayment() {
  return WOWSLY_REQUIRE_PAYMENT_VERIFY || Boolean(import.meta.env.VITE_WOWSLY_VERIFY_PATH)
}
