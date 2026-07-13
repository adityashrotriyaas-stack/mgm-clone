import { z } from 'zod'

export const registrationSchema = z.object({
  form_id: z.string().optional(),
  dialing_code: z.string().optional(),
  mobile: z.string().min(10).max(10),
  QAs: z.array(z.object({
    question_id: z.string(),
    answer: z.string(),
  })).optional(),
})

export const pricingQuoteSchema = z.object({
  items: z.array(z.object({
    ticket_id: z.number().int().positive(),
    quantity: z.number().int().positive().max(10),
  })).min(1),
  facility_ids: z.array(z.number().int().positive()).optional(),
  event_slot_id: z.number().int().positive().optional(),
})

export const ticketSelectSchema = z.object({
  guest_uuid: z.string().min(1),
  ticket_id: z.number().int().positive(),
  ticket_name: z.string().min(1),
  quantity: z.number().int().positive(),
  amount: z.number().positive(),
  facilities: z.array(z.any()).optional(),
  event_slot_id: z.number().int().positive().optional(),
})

export const createOrderSchema = z.object({
  guest_uuid: z.string().min(1),
  ticket_id: z.number().int().positive(),
  quantity: z.number().int().positive().max(10),
  facility_ids: z.array(z.number().int().positive()).optional(),
  event_slot_id: z.number().int().positive().optional(),
  notes: z.record(z.any()).optional(),
  send_to_whatsapp: z.number().int().min(0).max(1).optional(),
})

export const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
  guest_uuid: z.string().optional(),
  user_id: z.number().optional(),
  guest_ticket_id: z.string().optional(),
  batch_id: z.string().optional(),
})