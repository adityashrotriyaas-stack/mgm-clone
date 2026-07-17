import {
  COMMON_EVENT_QUERY,
  DEFAULT_DIALING_CODE,
  DEFAULT_TIMEZONE,
  FORM_ID,
  QUESTION_MAP,
  RAZORPAY_KEY_ID,
  WOWSLY_API_BASE,
  WOWSLY_EVENT_ID,
  WOWSLY_VERIFY_PATH,
} from '../config/wowsly'

async function parseResponse(response) {
  const text = await response.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = text
  }

  if (!response.ok) {
    const message =
      (data && typeof data === 'object' && (data.message || data.error)) ||
      (typeof data === 'string' ? data : null) ||
      `Request failed (${response.status})`
    throw new Error(message)
  }

  return data
}

async function wowslyFetch(path, options = {}) {
  const url = `${WOWSLY_API_BASE}${path}`
  console.log('[wowslyApi] Request:', url, options)
  const response = await fetch(url, options)
  console.log('[wowslyApi] Response status:', response.status)
  return parseResponse(response)
}

export function extractFinalPayable(quote) {
  return (
    quote?.breakdown?.final_payable ??
    quote?.data?.breakdown?.final_payable ??
    quote?.snapshot?.final_payable ??
    quote?.data?.snapshot?.final_payable ??
    null
  )
}

export function extractGuestTicketId(data) {
  return data?.id ?? data?.guest_ticket_id ?? data?.data?.id ?? data?.data?.guest_ticket_id ?? null
}

export function extractBatchId(data) {
  return data?.batch_id ?? data?.previous_batch_id ?? data?.data?.batch_id ?? null
}

export function extractOrderDetails(orderResponse) {
  const payload = orderResponse?.data ?? orderResponse
  return {
    orderId: payload?.id ?? payload?.order_id ?? null,
    amount: payload?.amount ?? null,
    currency: payload?.currency ?? 'INR',
    razorpayKey: orderResponse?.razorpay_key || RAZORPAY_KEY_ID,
  }
}

export function buildFacilityNameMap(ticketsResponse) {
  const map = {}
  const tickets = ticketsResponse?.data ?? ticketsResponse?.tickets ?? ticketsResponse ?? []

  if (!Array.isArray(tickets)) return map

  tickets.forEach((ticket) => {
    const facilities = ticket?.facilities ?? ticket?.facility ?? []
    facilities.forEach((facility) => {
      const id = facility?.id ?? facility?.facility_id
      const name = facility?.name ?? facility?.facility_name
      if (id != null && name) {
        map[id] = name
      }
    })
  })

  return map
}

async function getBlobFromUrl(url) {
  if (!url) return null
  if (!url.startsWith('blob:')) return url
  try {
    const response = await fetch(url)
    return await response.blob()
  } catch (err) {
    console.error('Failed to get blob from URL:', err)
    return null
  }
}

export async function submitRegistration({ name, countryCode, mobile, email, gender, aadhaar, photo }, questionMap = QUESTION_MAP) {
  const formData = new FormData()
  formData.append('form_id', String(FORM_ID))
  formData.append('dialing_code', DEFAULT_DIALING_CODE)
  formData.append('mobile', mobile)

  const answers = [
    { question_id: questionMap.NAME, answer: name },
    { question_id: questionMap.COUNTRY_CODE, answer: countryCode || DEFAULT_DIALING_CODE },
    { question_id: questionMap.MOBILE, answer: mobile },
    { question_id: questionMap.EMAIL, answer: email },
    { question_id: questionMap.GENDER, answer: gender },

  ]

  if (aadhaar && questionMap.AADHAAR) {
    answers.push({ question_id: questionMap.AADHAAR, answer: aadhaar })
  }

  if (photo && questionMap.PHOTO) {
    let photoBlob = photo
    if (typeof photo === 'string' && photo.startsWith('blob:')) {
      photoBlob = await getBlobFromUrl(photo)
    }
    if (photoBlob) {
      answers.push({ question_id: questionMap.PHOTO, answer: photoBlob, isFile: true })
    }
  }

  answers.forEach((qa, index) => {
    formData.append(`QAs[${index}][question_id]`, qa.question_id)
    if (qa.isFile) {
      formData.append(`QAs[${index}][answer]`, qa.answer, 'selfie.jpg')
    } else {
      formData.append(`QAs[${index}][answer]`, qa.answer)
    }
  })

  return wowslyFetch(
    `/events/${WOWSLY_EVENT_ID}/commonEvent/registrationform/answer${COMMON_EVENT_QUERY}`,
    { method: 'POST', body: formData },
  )
}

export async function fetchRegistrationForm() {
  return wowslyFetch(`/events/${WOWSLY_EVENT_ID}/registration/status${COMMON_EVENT_QUERY}`)
}

export async function getPublicSchedule() {
  return wowslyFetch(`/events/${WOWSLY_EVENT_ID}/schedule/public`)
}

export async function getEventTickets(guestUuid) {
  const params = new URLSearchParams({
    include_hidden_tickets: '0',
    has_split_share: '0',
    common_event_link: 'true',
    uuid: guestUuid,
  })

  return wowslyFetch(`/events/${WOWSLY_EVENT_ID}/eventticket?${params.toString()}`)
}

export async function getPricingQuote({ ticketId, quantity, eventSlotId, facilityIds = [] }) {
  const payload = {
    event_id: WOWSLY_EVENT_ID,
    items: [{ ticket_id: ticketId, quantity }],
    facility_ids: facilityIds,
    send_to_whatsapp: false,
    is_event_poster_selected: false,
  }

  if (eventSlotId) {
    payload.event_slot_id = eventSlotId
  }

  return wowslyFetch('/v2/pricing/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })
}

export function buildTicketSelectPayload({
  guestUuid,
  ticketId,
  ticketTitle,
  quantity,
  finalPayable,
  eventSlotId,
  holders = [],
  facilities = [],
  facilityIds = [],
}) {
  const unitPrice = finalPayable / quantity

  const payload = {
    guest_uuid: guestUuid,
    selected_tickets: [
      {
        ticket_id: ticketId,
        ticket_name: ticketTitle,
        ticket_count: quantity,
        ticket_price: unitPrice,
        amount: finalPayable,
        holders,
        facilities,
        razor_pay_fee: 0,
        system_charges: 0,
        wowsly_gst: 0,
      },
    ],
    facility_details: facilityIds,
    facility_ids: facilityIds.join(','),
    amount_currency: 'rupees',
    send_to_whatsapp: 0,
    is_event_poster_selected: false,
    total_amount: finalPayable,
    previous_batch_id: null,
  }

  if (eventSlotId) {
    payload.event_slot_id = eventSlotId
  }

  return payload
}

export async function selectTicket(payload) {
  return wowslyFetch(
    `/events/${WOWSLY_EVENT_ID}/commonEvent/ticket/select${COMMON_EVENT_QUERY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    },
  )
}

export function buildCheckoutOrderNotes({
  userId,
  guestUuid,
  guestTicketId,
  guestName,
  guestEmail,
  ticketId,
  quantity,
  facilityNames = [],
  sendToWhatsapp = 1,
}) {
  return {
    task: 'event_ticket_payment',
    event_id: WOWSLY_EVENT_ID,
    user_id: userId,
    invited_guest_uuid: guestUuid,
    guest_ticket_id: guestTicketId,
    guest_ticket_name: guestName,
    guest_ticket_email: guestEmail,
    current_timezone: DEFAULT_TIMEZONE,
    amount_currency_symbol: '&#8377;',
    send_to_whatsapp: sendToWhatsapp,
    registered_by: null,
    facility_details: JSON.stringify(facilityNames),
    ticket_details: `${ticketId}:${quantity}`,
    facility_ids: null,
    poster_charge: 0,
  }
}

export async function createCheckoutOrder({
  guestUuid,
  ticketId,
  quantity,
  facilityIds = [],
  eventSlotId,
  notes,
  sendToWhatsapp = 1,
}) {
  const payload = {
    event_id: WOWSLY_EVENT_ID,
    items: [{ ticket_id: ticketId, quantity }],
    facility_ids: facilityIds,
    send_to_whatsapp: sendToWhatsapp,
    is_event_poster_selected: false,
    receipt: 'Wowsly_Ticket_Purchase',
    guest_uuid: guestUuid,
    notes: notes || {},
  }

  if (eventSlotId) {
    payload.event_slot_id = eventSlotId
  }

  return wowslyFetch('/v2/checkout/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })
}

export async function verifyPayment({
  guestUuid,
  userId,
  guestTicketId,
  batchId,
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}) {
  return wowslyFetch(WOWSLY_VERIFY_PATH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      event_id: WOWSLY_EVENT_ID,
      guest_uuid: guestUuid,
      user_id: userId,
      guest_ticket_id: guestTicketId,
      batch_id: batchId,
      razorpay_order_id: razorpayOrderId,
      razorpay_payment_id: razorpayPaymentId,
      razorpay_signature: razorpaySignature,
    }),
  })
}
