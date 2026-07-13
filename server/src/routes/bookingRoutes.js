import { Router } from 'express'
import * as bookingController from '../controllers/bookingController.js'
import { config } from '../config/index.js'

const router = Router()

const EVENT_ID = config.eventId

router.get('/health', bookingController.healthCheck)

router.post(`/events/${EVENT_ID}/commonEvent/registrationform/answer`, bookingController.registerGuest)
router.get(`/events/${EVENT_ID}/schedule/public`, bookingController.getSchedule)
router.get(`/events/${EVENT_ID}/eventticket`, bookingController.getTickets)
router.post('/v2/pricing/quote', bookingController.getPricingQuote)
router.post(`/events/${EVENT_ID}/commonEvent/ticket/select`, bookingController.selectTicket)
router.post('/v2/checkout/create-order', bookingController.createOrder)
router.post('/v2/checkout/verify-payment', bookingController.verifyPayment)

export default router