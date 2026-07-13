# External Integrations

**Analysis Date:** 2026-07-11

## APIs & External Services

**Wowsly Event API:**
- **Purpose:** Manages registration forms, retrieves tickets, provides dynamic pricing quotes, handles ticket selection/reservation, creates orders, and verifies payment signatures.
- **Integration Method:** Native REST API client using standard `fetch` API (`src/services/wowslyApi.js`).
- **Configuration:**
  - Base URL: `import.meta.env.VITE_WOWSLY_API_BASE` (dev: `https://dev-backend.wowsly.com/api`)
  - Event ID: `163` (dev configuration)
  - Form ID: `122`
  - Path style: **Common event** → always `?common_event_link=true` and `/commonEvent/...`
- **Registration Questions Mappings (Dynamic with Static Fallback):**
  - **Dynamic Retrieval:** Fetches form questions dynamically from `GET /events/163/registration/status?common_event_link=true` (`fetchRegistrationForm()`).
  - **Semantic Mapping:** Maps questions dynamically using labels defined in `FORM_LABELS` (Name -> `NAME`, Country Code -> `COUNTRY_CODE`, Mobile Number -> `MOBILE`, Email -> `EMAIL`) via `mapFormFields()`.
  - **Static Fallback:** Falls back to static `QUESTION_MAP` (Name: `622`, Country Code: `623`, Mobile: `624`, Email: `625`) if the API call fails.
  - *Note: Aadhaar and selfie photo capture are UI-only and are not sent to Wowsly.*
- **Ticket Mapping:**
  - Daily Pass: `263` (SINGLE DAY TICKET)
  - Seasonal Pass: `265` (Season Pass)
- **Daily Night to Wowsly slot IDs (715 - 724):**
  - Night 1: `715` (Oct 10)
  - Night 2: `716` (Oct 11)
  - Night 3: `717` (Oct 12)
  - Night 4: `718` (Oct 13)
  - Night 5: `719` (Oct 14)
  - Night 6: `720` (Oct 15)
  - Night 7: `721` (Oct 16)
  - Night 8: `722` (Oct 17)
  - Night 9: `723` (Oct 18)
  - Night 10: `724` (Oct 19)
- **Endpoints Used:**
  - `POST /events/163/commonEvent/registrationform/answer?common_event_link=true` (Submit Registration Form)
  - `GET /events/163/eventticket?include_hidden_tickets=0&has_split_share=0&common_event_link=true&uuid={uuid}` (Retrieve Tickets)
  - `POST /v2/pricing/quote` (Get Ticket Pricing Quote)
  - `POST /events/163/commonEvent/ticket/select?common_event_link=true` (Select and lock ticket booking)
  - `POST /v2/checkout/create-order` (Initiate order creation for payment gateway)
  - `POST /v2/checkout/verify-payment` (Verify final payment response from Razorpay)
  - `GET /events/163/{guestUuid}/tickets/details` (Fetch ticket confirmation details and QR code - planned/unwired)

**Razorpay Checkout:**
- **Purpose:** Handles credit card, UPI, wallet, and net banking payments inside the browser.
- **Integration Method:** Dynamic script injection loading the standard Razorpay web overlay from `https://checkout.razorpay.com/v1/checkout.js` (`src/utils/razorpay.js`).
- **Configuration:**
  - Key ID: `import.meta.env.VITE_RAZORPAY_KEY_ID`
- **For fulfillment, notes must contain:**
  - `task`: `"event_ticket_payment"`
  - `invited_guest_uuid`
  - `guest_ticket_id` (Crucial for backend verification)
  - `ticket_details`: e.g. `"263:1"`
  - `facility_details`: JSON string of names (or `"[]"`)
- **Event Callbacks:**
  - `handler`: Returns payment confirmation payload (signature, order ID, payment ID).
  - `modal.ondismiss`: Catches checkout close events to mark bookings as cancelled.
  - `payment.failed`: Intercepts and reports processing errors.

## Data Storage

**Local/Session Storage:**
- **Booking Sessions:** Saves current step, UUID, pricing, selection details, and payment state inside the browser's `sessionStorage` under the key `mgm_wowsly_session` (`src/services/wowslyBooking.js`).
```json
{
  "uuid": "guest-uuid-string",
  "userId": 12345,
  "guestTicketId": 54321,
  "batchId": 98765,
  "ticketId": 263,
  "quantity": 1,
  "eventSlotId": 716,
  "finalPayable": 500,
  "ticketTitle": "SINGLE DAY TICKET",
  "step": "checkout_prepared"
}
```

---

*Integration audit: 2026-07-11*
*Update when adding/removing external services*
