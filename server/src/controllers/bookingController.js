import { AppError, asyncHandler } from '../middleware/errorHandler.js'
import { createGuest, getGuest, createSession, createOrder as createOrderStorage, findOrderByRazorpayOrderId, updateOrder, guestsMap, sessionsMap, ordersMap } from '../services/storage.js'
import { schedule, ticketTypes, NIGHT_SLOT_MAP } from '../config/index.js'

const EVENT_ID = 163

function resolveSlot(dateId, venueId, showId) {
  return schedule.slots.find(s =>
    s.event_date_id === dateId && s.event_venue_id === venueId && s.event_show_id === showId && s.status === 'active'
  )?.id ?? null
}

export const registerGuest = asyncHandler(async (req, res) => {
  console.log('[registerGuest] req.body:', JSON.stringify(req.body))
  console.log('[registerGuest] Content-Type:', req.headers['content-type'])
  const { mobile, dialing_code, QAs } = req.body
  if (!mobile) throw new AppError('Mobile is required', 400, 'MISSING_MOBILE')

  const name = QAs?.[0]?.answer || 'Guest'
  const guest = createGuest({ name, mobile, dialingCode: dialing_code || '91' })

  res.json({
    success: true,
    guest_data: { uuid: guest.uuid, user_id: guest.userId, name: guest.name, mobile: guest.mobile },
  })
})

export const getSchedule = asyncHandler(async (req, res) => {
  res.json({ data: schedule })
})

export const getTickets = asyncHandler(async (req, res) => {
  const { uuid } = req.query
  if (!uuid || !getGuest(uuid)) throw new AppError('Guest not found', 404, 'GUEST_NOT_FOUND')
  res.json({ data: ticketTypes })
})

export const getPricingQuote = asyncHandler(async (req, res) => {
  const { items, facility_ids = [], event_slot_id } = req.body
  const ticket = items?.[0]
  if (!ticket) throw new AppError('Ticket item required', 400, 'MISSING_TICKET')

  const ticketType = ticketTypes.find(t => t.id === ticket.ticket_id)
  const basePrice = ticketType?.price || 499
  const quantity = ticket.quantity || 1
  const facilityCost = facility_ids.length * 100
  const total = basePrice * quantity + facilityCost

  res.json({
    success: true,
    breakdown: { final_payable: total, base_price: basePrice, quantity, facility_cost: facilityCost },
    snapshot: { final_payable: total },
  })
})

export const selectTicket = asyncHandler(async (req, res) => {
  const { guest_uuid, event_slot_id } = req.body
  if (!guest_uuid || !getGuest(guest_uuid)) throw new AppError('Invalid guest', 400, 'INVALID_GUEST')

  const session = createSession({ guest_uuid, eventSlotId: event_slot_id })
  res.json({ success: true, id: session.guestTicketId, guest_ticket_id: session.guestTicketId, batch_id: session.batchId })
})

export const createOrder = asyncHandler(async (req, res) => {
  const { guest_uuid, items, facility_ids = [], event_slot_id } = req.body
  if (!guest_uuid || !getGuest(guest_uuid)) throw new AppError('Invalid guest', 400, 'INVALID_GUEST')

  const ticket = items?.[0]
  const ticketType = ticketTypes.find(t => t.id === ticket?.ticket_id)
  const basePrice = ticketType?.price || 499
  const quantity = ticket?.quantity || 1
  const amount = basePrice * quantity + facility_ids.length * 100

  const order = createOrderStorage({ guest_uuid, amount, currency: 'INR', event_slot_id, items })
  const razorpayKey = 'rzp_test_demo_'

  res.json({ success: true, data: { id: order.id, order_id: order.order_id, amount, currency: 'INR' }, razorpay_key: razorpayKey })
})

export const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw new AppError('Missing payment verification fields', 400, 'MISSING_FIELDS')
  }

  const order = findOrderByRazorpayOrderId(razorpay_order_id)
  if (order) {
    updateOrder(order.id, { status: 'paid', paymentId: razorpay_payment_id, signature: razorpay_signature, paidAt: Date.now() })
  }

  res.json({ success: true, message: 'Payment verified' })
})

export const healthCheck = asyncHandler(async (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    stats: { guests: guestsMap.size, sessions: sessionsMap.size, orders: ordersMap.size },
  })
})