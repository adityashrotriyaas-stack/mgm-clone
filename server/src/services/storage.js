import { randomUUID } from 'crypto'

const guests = new Map()
const sessions = new Map()
const orders = new Map()

export const guestsMap = guests
export const sessionsMap = sessions
export const ordersMap = orders

export function createGuest(data) {
  const uuid = `guest-${Date.now()}-${randomUUID().slice(0, 8)}`
  const userId = Math.floor(Math.random() * 10000) + 100
  const guest = { uuid, userId, ...data, createdAt: Date.now() }
  guests.set(uuid, guest)
  return guest
}

export function getGuest(uuid) {
  return guests.get(uuid)
}

export function createSession(data) {
  const guestTicketId = `gt-${Date.now()}-${randomUUID().slice(0, 6)}`
  const batchId = `batch-${Date.now()}-${randomUUID().slice(0, 6)}`
  const session = { guestTicketId, batchId, ...data, step: 'ticket_selected', createdAt: Date.now() }
  sessions.set(guestTicketId, session)
  return session
}

export function getSession(guestTicketId) {
  return sessions.get(guestTicketId)
}

export function updateSession(guestTicketId, patch) {
  const session = sessions.get(guestTicketId)
  if (session) {
    Object.assign(session, patch)
    sessions.set(guestTicketId, session)
  }
  return session
}

export function createOrder(data) {
  const orderId = `order_${Date.now()}-${randomUUID().slice(0, 6)}`
  const order = { id: orderId, order_id: orderId, status: 'created', ...data, createdAt: Date.now() }
  orders.set(orderId, order)
  return order
}

export function getOrder(orderId) {
  return orders.get(orderId)
}

export function updateOrder(orderId, patch) {
  const order = orders.get(orderId)
  if (order) {
    Object.assign(order, patch)
    orders.set(orderId, order)
  }
  return order
}

export function findOrderByRazorpayOrderId(razorpayOrderId) {
  for (const order of orders.values()) {
    if (order.order_id === razorpayOrderId || order.id === razorpayOrderId) {
      return order
    }
  }
  return null
}

export function clearAll() {
  guests.clear()
  sessions.clear()
  orders.clear()
}