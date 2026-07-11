# External Integrations

**Analysis Date:** 2026-07-11

## APIs & External Services

**Wowsly Event API:**
- **Purpose:** Manages registration forms, retrieves tickets, provides dynamic pricing quotes, handles ticket selection/reservation, creates orders, and verifies payment signatures.
- **Integration Method:** Native REST API client using standard `fetch` API (`src/services/wowslyApi.js`).
- **Configuration:**
  - Base URL: `import.meta.env.VITE_WOWSLY_API_BASE`
  - Event ID: `import.meta.env.VITE_WOWSLY_EVENT_ID`
  - Form ID: Constant `122` in configuration.
  - Verification path: `import.meta.env.VITE_WOWSLY_VERIFY_PATH`
- **Endpoints Used:**
  - `POST /events/{eventId}/commonEvent/registrationform/answer?common_event_link=true` (Submit Registration Form)
  - `GET /events/{eventId}/eventticket?include_hidden_tickets=0&has_split_share=0&common_event_link=true&uuid={uuid}` (Retrieve Tickets)
  - `POST /v2/pricing/quote` (Get Ticket Pricing Quote)
  - `POST /events/{eventId}/commonEvent/ticket/select?common_event_link=true` (Select and lock ticket booking)
  - `POST /v2/checkout/create-order` (Initiate order creation for payment gateway)
  - `POST {verify_path}` (Verify final payment response from Razorpay)

**Razorpay Checkout:**
- **Purpose:** Handles credit card, UPI, wallet, and net banking payments inside the browser.
- **Integration Method:** Dynamic script injection loading the standard Razorpay web overlay from `https://checkout.razorpay.com/v1/checkout.js` (`src/utils/razorpay.js`).
- **Configuration:**
  - Key ID: `import.meta.env.VITE_RAZORPAY_KEY_ID`
- **Event Callbacks:**
  - `handler`: Returns payment confirmation payload (signature, order ID, payment ID).
  - `modal.ondismiss`: Catches checkout close events to mark bookings as cancelled.
  - `payment.failed`: Intercepts and reports processing errors.

## Data Storage

**Local/Session Storage:**
- **Booking Sessions:** Saves current step, UUID, pricing, selection details, and payment state inside the browser's `sessionStorage` under the key `mgm_wowsly_session` (`src/services/wowslyBooking.js`).

## Authentication & Identity

- No explicit user authentication system (like JWT/OAuth) exists.
- Guest identities are tracked anonymously via a registration-generated `guest_uuid` returned from the initial Wowsly Form submit.

## Environment Configuration

**Required variables (defined in `.env.example`):**
- `VITE_WOWSLY_API_BASE` - Endpoint URL for Wowsly services.
- `VITE_WOWSLY_EVENT_ID` - Event ID configured on the platform.
- `VITE_RAZORPAY_KEY_ID` - Key ID for Razorpay integration.
- `VITE_DEFAULT_DIALING_CODE` - Country calling code (default: `91`).
- `VITE_DEFAULT_TIMEZONE` - Local timezone (default: `Asia/Calcutta`).
- `VITE_ENABLE_LIVE_PAYMENT` - Flag toggling live transactions.
- `VITE_WOWSLY_VERIFY_PATH` - Override route for signature verification.
- `VITE_WOWSLY_REQUIRE_PAYMENT_VERIFY` - Boolean enabling signature verification enforcement.

---

*Integration audit: 2026-07-11*
*Update when adding/removing external services*
