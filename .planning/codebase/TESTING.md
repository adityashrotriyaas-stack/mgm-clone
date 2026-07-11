# Testing Patterns

**Analysis Date:** 2026-07-11

## Test Framework

**Runner & Assertion Library:**
- **None:** The codebase does not currently contain any automated testing libraries (e.g. Jest, Vitest, Cypress, or Playwright).
- There is no `test` script defined in `package.json`.

## Manual Verification

As the codebase relies entirely on manual verification, developer testing should follow this structured checklist:

### 1. Build and Syntax Audits
Ensure the compiler and syntax checks pass before staging:
```bash
npm run lint      # Check formatting and syntax violations using Oxlint
npm run build     # Verify the Vite production bundle builds successfully
```

### 2. Layout & Responsiveness Audits
- Verify layout scaling across viewport breakpoints:
  - **Mobile (< 600px):** Check bottom floating CTA button (`StickyCTA.jsx`), timeline items, and mobile nav sheet.
  - **Tablet (600px - 1024px):** Ensure the registration grid scales cleanly.
  - **Desktop (> 1024px):** Test the full horizontal grid displays for upcoming/past nights.
- Validate animations:
  - Check entry effects (Reveal boxes) and smooth scroll triggers.
  - Confirm animations fallback gracefully when `prefers-reduced-motion` is enabled in client systems.

### 3. Live API & Booking Workflow Verification Checklist
To verify integration success:

1. Configure `.env` with:
   - `VITE_WOWSLY_API_BASE=https://dev-backend.wowsly.com/api`
   - `VITE_WOWSLY_EVENT_ID=163`
   - `VITE_ENABLE_LIVE_PAYMENT=true`
   - Valid `VITE_RAZORPAY_KEY_ID`
2. **Restart** the local development server (Vite only loads env variables on launch).
3. **Daily Pass Flow Test:**
   - Open `/event/2` (Night 2).
   - Select Daily Pass -> Choose Category -> Pick Date/Venue/Time.
   - Open Browser DevTools Network tab.
   - Fill registration details and click **Proceed to Payment**.
   - **Verification:**
     - Confirm `POST /events/163/commonEvent/registrationform/answer?common_event_link=true` succeeds and returns `uuid` and `user_id`.
     - Confirm `POST /v2/pricing/quote` includes `event_slot_id: 716` and the response details `breakdown.final_payable`.
     - Confirm `POST /events/163/commonEvent/ticket/select?common_event_link=true` matches `guest_ticket_id` and `batch_id`.
   - On the `/book` page, verify the calculated amount matches `final_payable` from the quote (not hardcoded values).
   - Click **Pay Securely**:
     - Confirm `POST /v2/checkout/create-order` matches with `invited_guest_uuid` and `guest_ticket_id` inside the `notes` payload.
     - Verify the Razorpay payment modal overlay opens.
4. **Seasonal Pass Flow Test:**
   - Repeat the registration step selecting **Seasonal Pass**.
   - Verify the scheduling step is skipped automatically.
   - **Verification:** Confirm that pricing quote, ticket selection, and create-order payloads **omit** `event_slot_id` entirely.

---

*Testing analysis: 2026-07-11*
*Update when test patterns change*
