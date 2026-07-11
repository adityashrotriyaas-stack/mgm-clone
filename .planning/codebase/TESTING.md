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

### 3. Ticketing & Booking Workflow Audits
Test the 6-step registration flow (`src/components/BookingFlow.jsx`):
- **Step 1-3 (Registration Details):** Input valid/invalid mobile and Aadhaar numbers. Confirm formatting masks apply correctly.
- **Step 4 (Pricing & Quoting):** Verify client issues quote requests. Check loading spinners.
- **Step 5 (Razorpay Checkout Overlay):**
  - Verify Razorpay scripts load over HTTPS.
  - Confirm the modal overlay displays correct pricing, phone numbers, and emails.
  - Test checkout cancellation (esc key or clicking outside) cancels the session gracefully.
  - Test test-mode card details trigger successful callback handler routes.
- **Step 6 (QR Pass Confirmation):** Verify page receives session responses, displays unique registration QR codes, and resets booking cache.

---

*Testing analysis: 2026-07-11*
*Update when test patterns change*
