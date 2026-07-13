import { isWowslyConfigured, NIGHT_SLOT_MAP, shouldVerifyPayment, QUESTION_MAP, mapFormFields } from '../config/wowsly'
import { resolveTicketFromPassMode } from '../data/wowslyCatalog'
import { openRazorpayCheckout, sanitizeNotesForRazorpay } from '../utils/razorpay'
import {
  buildCheckoutOrderNotes,
  buildTicketSelectPayload,
  createCheckoutOrder,
  extractBatchId,
  extractFinalPayable,
  extractGuestTicketId,
  extractOrderDetails,
  fetchRegistrationForm,
  getEventTickets,
  getPricingQuote,
  selectTicket,
  submitRegistration,
  verifyPayment,
} from './wowslyApi'

const SESSION_KEY = 'mgm_wowsly_session'

export function saveWowslySession(session) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function loadWowslySession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function mergeWowslySession(patch) {
  const merged = { ...(loadWowslySession() || {}), ...patch }
  saveWowslySession(merged)
  return merged
}

export function clearWowslySession() {
  sessionStorage.removeItem(SESSION_KEY)
}

export function extractGuestFromRegistration(registration) {
  if (registration?.male) {
    return {
      name: registration.male.name,
      mobile: registration.male.mobile,
      email: registration.male.email,
      countryCode: '91',
    }
  }

  return {
    name: registration.name,
    mobile: registration.mobile,
    email: registration.email,
    countryCode: '91',
  }
}

export function resolveTicketSelection(registration) {
  const ticket = resolveTicketFromPassMode(registration.passMode)
  const quantity = Number(registration.ticketCount || 1)
  const isSeasonal = registration.passMode === 'seasonal'

  let eventSlotId = null
  if (!isSeasonal) {
    eventSlotId = registration.eventSlotId ?? null
    if (!eventSlotId) {
      const nightId = Number(registration.selectedDay || registration.eventId)
      eventSlotId = nightId ? NIGHT_SLOT_MAP[nightId] ?? null : null
    }
  }

  return {
    ticketId: ticket.ticketId,
    ticketTitle: ticket.title,
    quantity,
    eventSlotId,
    isSeasonal,
  }
}

function formatRupees(amount) {
  const value = Number(amount)
  if (!Number.isFinite(value)) return ''
  return `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
}

export async function prepareWowslyBooking(registration) {
  if (!isWowslyConfigured()) {
    return null
  }

  const guest = extractGuestFromRegistration(registration)
  const { ticketId, ticketTitle, quantity, eventSlotId } = resolveTicketSelection(registration)

  // Fetch form dynamically to resolve field mappings
  let activeQuestionMap = { ...QUESTION_MAP }
  try {
    const formResponse = await fetchRegistrationForm()
    const fields = formResponse?.form?.[0]?.fields || formResponse?.data?.form?.[0]?.fields || []
    if (fields.length > 0) {
      const dynamicMap = mapFormFields(fields)
      if (dynamicMap.NAME) activeQuestionMap.name = String(dynamicMap.NAME)
      if (dynamicMap.COUNTRY_CODE) activeQuestionMap.countryCode = String(dynamicMap.COUNTRY_CODE)
      if (dynamicMap.MOBILE) activeQuestionMap.mobile = String(dynamicMap.MOBILE)
      if (dynamicMap.EMAIL) activeQuestionMap.email = String(dynamicMap.EMAIL)
    }
  } catch (err) {
    console.warn('Failed to fetch dynamic form fields, using static fallback:', err)
  }

  const regResponse = await submitRegistration(guest, activeQuestionMap)
  const guestData = regResponse?.guest_data ?? regResponse?.data?.guest_data ?? {}
  const uuid = guestData.uuid
  const userId = guestData.user_id

  if (!uuid || !userId) {
    throw new Error('Registration failed. Please check your details and try again.')
  }

  await getEventTickets(uuid)

  const quote = await getPricingQuote({ ticketId, quantity, eventSlotId })
  const finalPayable = extractFinalPayable(quote)

  if (!finalPayable) {
    throw new Error('Could not fetch ticket price. Please try again.')
  }

  const selectResponse = await selectTicket(
    buildTicketSelectPayload({
      guestUuid: uuid,
      ticketId,
      ticketTitle,
      quantity,
      finalPayable,
      eventSlotId,
    }),
  )

  const guestTicketId = extractGuestTicketId(selectResponse)
  const batchId = extractBatchId(selectResponse)

  if (!guestTicketId) {
    throw new Error('Ticket could not be reserved. Please try again.')
  }

  const session = {
    uuid,
    userId,
    guestTicketId,
    batchId,
    ticketId,
    quantity,
    eventSlotId,
    finalPayable,
    ticketTitle,
    step: 'checkout_prepared',
  }

  saveWowslySession(session)
  return session
}

export async function completeWowslyPayment(registration, session) {
  if (!session?.uuid || !session?.guestTicketId) {
    throw new Error('Booking session expired. Please register again.')
  }

  const guest = extractGuestFromRegistration(registration)
  const notes = buildCheckoutOrderNotes({
    userId: session.userId,
    guestUuid: session.uuid,
    guestTicketId: session.guestTicketId,
    guestName: guest.name,
    guestEmail: guest.email,
    ticketId: session.ticketId,
    quantity: session.quantity,
    facilityNames: [],
    sendToWhatsapp: 1,
  })

  const orderResponse = await createCheckoutOrder({
    guestUuid: session.uuid,
    ticketId: session.ticketId,
    quantity: session.quantity,
    eventSlotId: session.eventSlotId,
    notes,
    sendToWhatsapp: 1,
  })

  const { orderId, amount, currency, razorpayKey } = extractOrderDetails(orderResponse)

  if (!orderId || !razorpayKey) {
    throw new Error('Could not start payment. Please try again.')
  }

  const paymentResponse = await openRazorpayCheckout({
    key: razorpayKey,
    order_id: orderId,
    amount,
    currency,
    name: 'MGM Cultural Navratri 2026',
    description: session.ticketTitle || 'Ticket purchase',
    notes: sanitizeNotesForRazorpay(notes),
    prefill: {
      name: guest.name,
      email: guest.email,
      contact: guest.mobile,
    },
  })

  if (shouldVerifyPayment()) {
    await verifyPayment({
      guestUuid: session.uuid,
      userId: session.userId,
      guestTicketId: session.guestTicketId,
      batchId: session.batchId,
      razorpayOrderId: paymentResponse.razorpay_order_id,
      razorpayPaymentId: paymentResponse.razorpay_payment_id,
      razorpaySignature: paymentResponse.razorpay_signature,
    })
  }

  mergeWowslySession({
    step: 'paid',
    razorpayOrderId: paymentResponse.razorpay_order_id,
    razorpayPaymentId: paymentResponse.razorpay_payment_id,
  })

  return paymentResponse
}

export function applyQuotedPriceToRegistration(registration, session) {
  if (!session?.finalPayable) return registration
  return {
    ...registration,
    passPrice: formatRupees(session.finalPayable),
    wowslyQuotedAmount: session.finalPayable,
  }
}
