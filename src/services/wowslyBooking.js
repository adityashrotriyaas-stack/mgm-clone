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
      aadhaar: registration.male.aadhaar,
      photo: registration.male.selfiePreview,
      gender: registration.male.gender || 'Male',
    }
  }

  return {
    name: registration.name,
    mobile: registration.mobile,
    email: registration.email,
    countryCode: '91',
    aadhaar: registration.aadhaar,
    photo: registration.selfiePreview,
    gender: registration.gender || (registration.category === 'female' ? 'Female' : 'Male'),
  }
}

export function resolveTicketSelection(registration, ticketMap) {
  const ticket = resolveTicketFromPassMode(ticketMap, registration.passMode, registration.category)
  if (!ticket) {
    throw new Error('Ticket mapping is not loaded yet. Please try again.')
  }
  const isSeasonal = registration.passMode === 'seasonal'
  // A Couple ticket includes entry for 2 people. So if the category is couple, the quantity to buy is 1.
  // Otherwise, the quantity is the exact number of tickets selected (e.g. 2 Male tickets = quantity 2).
  const quantity = registration.category === 'couple' ? 1 : Number(registration.ticketCount || 1)

  let eventSlotId = null
  if (!isSeasonal) {
    eventSlotId = registration.eventSlotId ?? null
    if (!eventSlotId) {
      const nightId = Number(registration.selectedDay || registration.eventId)
      eventSlotId = nightId ? NIGHT_SLOT_MAP[nightId] ?? null : null
    }
  } else {
    eventSlotId = ticket.slotMappings?.[0]?.event_slot_id ?? null
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

export async function prepareWowslyBooking(registration, ticketMap) {
  if (!isWowslyConfigured()) {
    return null
  }

  const guest = extractGuestFromRegistration(registration)
  const { ticketId, ticketTitle, quantity, eventSlotId } = resolveTicketSelection(registration, ticketMap)

  // Fetch form dynamically to resolve field mappings
  let activeQuestionMap = { ...QUESTION_MAP }
  try {
    const formResponse = await fetchRegistrationForm()
    const fields = formResponse?.form?.[0]?.fields || formResponse?.data?.form?.[0]?.fields || []
    if (fields.length > 0) {
      const dynamicMap = mapFormFields(fields)
      if (dynamicMap.NAME) activeQuestionMap.NAME = String(dynamicMap.NAME)
      if (dynamicMap.COUNTRY_CODE) activeQuestionMap.COUNTRY_CODE = String(dynamicMap.COUNTRY_CODE)
      if (dynamicMap.MOBILE) activeQuestionMap.MOBILE = String(dynamicMap.MOBILE)
      if (dynamicMap.EMAIL) activeQuestionMap.EMAIL = String(dynamicMap.EMAIL)
      if (dynamicMap.GENDER) activeQuestionMap.GENDER = String(dynamicMap.GENDER)
      if (dynamicMap.AADHAAR) activeQuestionMap.AADHAAR = String(dynamicMap.AADHAAR)
      if (dynamicMap.PHOTO) activeQuestionMap.PHOTO = String(dynamicMap.PHOTO)
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

  // Retrieve S3 URL of Holder 1's photo from registration answers
  const regReplies = regResponse?.QAs || regResponse?.data?.QAs || regResponse?.additional_form_replies || regResponse?.data?.additional_form_replies || []
  const holder1PhotoQA = regReplies.find(
    (qa) =>
      String(qa.question_id || qa.id) === String(activeQuestionMap.PHOTO) ||
      String(qa.question || '').toLowerCase() === 'pass photo' ||
      String(qa.question || '').toLowerCase() === 'selfie photo'
  )
  const holder1PhotoUrl = holder1PhotoQA?.answer || guest.photo || ''

  // Register/upload Holder 2 details to get S3 link
  let holder2PhotoUrl = ''
  let holder2Data = null

  if (registration.secondGuest || registration.female) {
    const secondGuestRaw = registration.secondGuest || registration.female
    const secondGuestFormatted = {
      name: secondGuestRaw.name,
      mobile: secondGuestRaw.mobile,
      email: secondGuestRaw.email,
      countryCode: '91',
      aadhaar: secondGuestRaw.aadhaar,
      photo: secondGuestRaw.selfiePreview,
      gender: secondGuestRaw.gender || (registration.female ? 'Female' : (registration.category === 'female' ? 'Female' : 'Male')),
    }

    try {
      const regResponse2 = await submitRegistration(secondGuestFormatted, activeQuestionMap)
      const regReplies2 = regResponse2?.QAs || regResponse2?.data?.QAs || regResponse2?.additional_form_replies || regResponse2?.data?.additional_form_replies || []
      const holder2PhotoQA = regReplies2.find(
        (qa) =>
          String(qa.question_id || qa.id) === String(activeQuestionMap.PHOTO) ||
          String(qa.question || '').toLowerCase() === 'pass photo' ||
          String(qa.question || '').toLowerCase() === 'selfie photo'
      )
      holder2PhotoUrl = holder2PhotoQA?.answer || secondGuestFormatted.photo || ''
      holder2Data = secondGuestFormatted
    } catch (err) {
      console.warn('Failed to upload Holder 2 details, continuing with raw fields:', err)
      holder2PhotoUrl = secondGuestFormatted.photo || ''
      holder2Data = secondGuestFormatted
    }
  }

  // Construct holders payload
  const holders = [
    {
      holder_index: 1,
      name: guest.name,
      email: guest.email,
      phone: guest.mobile,
      dialing_code: guest.countryCode || '91',
      answers: [
        { question_id: Number(activeQuestionMap.NAME), answer: guest.name },
        { question_id: Number(activeQuestionMap.COUNTRY_CODE), answer: guest.countryCode || '91' },
        { question_id: Number(activeQuestionMap.MOBILE), answer: guest.mobile },
        { question_id: Number(activeQuestionMap.EMAIL), answer: guest.email },
        { question_id: Number(activeQuestionMap.GENDER), answer: guest.gender },
      ],
    },
  ]

  if (guest.aadhaar && activeQuestionMap.AADHAAR) {
    holders[0].answers.push({ question_id: Number(activeQuestionMap.AADHAAR), answer: guest.aadhaar })
  }
  if (holder1PhotoUrl && activeQuestionMap.PHOTO) {
    holders[0].answers.push({ question_id: Number(activeQuestionMap.PHOTO), answer: holder1PhotoUrl })
  }

  if (holder2Data) {
    const holder2 = {
      holder_index: 2,
      name: holder2Data.name,
      email: holder2Data.email,
      phone: holder2Data.mobile,
      dialing_code: holder2Data.countryCode || '91',
      answers: [
        { question_id: Number(activeQuestionMap.NAME), answer: holder2Data.name },
        { question_id: Number(activeQuestionMap.COUNTRY_CODE), answer: holder2Data.countryCode || '91' },
        { question_id: Number(activeQuestionMap.MOBILE), answer: holder2Data.mobile },
        { question_id: Number(activeQuestionMap.EMAIL), answer: holder2Data.email },
        { question_id: Number(activeQuestionMap.GENDER), answer: holder2Data.gender },
      ],
    }

    if (holder2Data.aadhaar && activeQuestionMap.AADHAAR) {
      holder2.answers.push({ question_id: Number(activeQuestionMap.AADHAAR), answer: holder2Data.aadhaar })
    }
    if (holder2PhotoUrl && activeQuestionMap.PHOTO) {
      holder2.answers.push({ question_id: Number(activeQuestionMap.PHOTO), answer: holder2PhotoUrl })
    }
    holders.push(holder2)
  }

  // Format selected facilities
  const selectedFacilities = registration.selectedFacilities || []
  const facilityIds = selectedFacilities.map((f) => f.id)
  const facilitiesPayload = selectedFacilities.map((f) => ({
    id: f.id,
    is_included: 1,
    selected: true,
    name: f.name,
    ticket_id: ticketId,
  }))

  await getEventTickets(uuid)

  const quote = await getPricingQuote({ ticketId, quantity, eventSlotId, facilityIds })
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
      holders,
      facilities: facilitiesPayload,
      facilityIds,
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

  console.log('[wowslyBooking] completeWowslyPayment started with session:', session)

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

  console.log('[wowslyBooking] Creating checkout order...')
  const orderResponse = await createCheckoutOrder({
    guestUuid: session.uuid,
    ticketId: session.ticketId,
    quantity: session.quantity,
    eventSlotId: session.eventSlotId,
    notes,
    sendToWhatsapp: 1,
  })

  console.log('[wowslyBooking] Order response:', orderResponse)

  const { orderId, amount, currency, razorpayKey } = extractOrderDetails(orderResponse)

  console.log('[wowslyBooking] Extracted order details:', { orderId, amount, currency, razorpayKey })

  if (!orderId || !razorpayKey) {
    throw new Error('Could not start payment. Please try again.')
  }

  console.log('[wowslyBooking] Opening Razorpay checkout...')
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

  console.log('[wowslyBooking] Payment response:', paymentResponse)

  if (shouldVerifyPayment()) {
    console.log('[wowslyBooking] Verifying payment...')
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
