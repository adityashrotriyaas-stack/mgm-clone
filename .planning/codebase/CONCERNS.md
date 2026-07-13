# Codebase Concerns

**Analysis Date:** 2026-07-11

## Tech Debt

**Hardcoded Event Slot & Form IDs:**
- **Issue:** Wowsly event slot IDs and the root form ID are hardcoded.
- **Files:** `src/config/wowsly.js` (Lines 10-50)
- **Why:** Simplifies project configuration setup.
- **Mitigation Status:** Registration form question mappings have been converted to run dynamically via `fetchRegistrationForm()` and `mapFormFields()`. However, the root `FORM_ID` (122) and `NIGHT_SLOT_MAP` remain hardcoded.
- **Impact:** Future modifications to the event's root form ID or calendar slot mappings will still require client rebuilds and redeployments.
- **Fix approach:** Move slot mappings to a dynamic config service or resolve them dynamically via backend APIs.

**Direct Session Storage Hooks:**
- **Issue:** Direct browser `sessionStorage` manipulation is used to manage booking status state transitions.
- **Files:** `src/services/wowslyBooking.js` (Lines 19-42)
- **Why:** Fast approach to persist multi-page state across path changes.
- **Impact:** React is unaware of out-of-band updates, which could lead to stale component renderings.
- **Fix approach:** Wrap `sessionStorage` in a React Context Provider or custom hook subscribing to updates.

**Marketing Price Sync Discrepancies:**
- **Issue:** UI prices are defined in `src/data/siteData.js` as static marketing copy and are not synced with the actual live ticket API pricing.
- **Impact:** If live prices change on the backend, the user might see different prices during checkout than what was advertised on the landing pages.
- **Fix approach:** Ensure pricing quotes from `/v2/pricing/quote` are used to render pricing in checkout/wizard stages.

## Known Bugs & Fragile Areas

**Razorpay Notes Truncation:**
- **Issue:** Razorpay limits custom notes to 15 keys and 256 characters per key value. The sanitizer truncates values silently.
- **Files:** `src/utils/razorpay.js` (Lines 30-38)
- **Why:** Enforces Razorpay API schema bounds.
- **Impact:** Long metadata payloads (such as facility name lists) might lose critical tracking or analytics information.
- **Fix approach:** Verify payload length and log warnings or compress data objects into a single short identifier.

**Dynamic CDN Injection Failures:**
- **Issue:** Script injection downloads the Razorpay library from `https://checkout.razorpay.com/v1/checkout.js` on compile/execution.
- **Files:** `src/utils/razorpay.js` (Lines 3-27)
- **Why:** Standard Razorpay integration recommendation.
- **Impact:** If the user has strict ad-blockers, custom DNS rules, or fires up payment steps offline, script loads will fail and crash with generic "Failed to load Razorpay" warnings.
- **Fix approach:** Improve connection verification; catch load failures and display clear diagnostic banners (e.g. "Check your network or disable ad blockers").

**Staging & Production CORS Access:**
- **Issue:** Accessing `https://dev-backend.wowsly.com/api` from localhost works but may hit CORS blocks on staging/production environments.
- **Impact:** Booking flow crashes on API calls in production deployment environments.
- **Fix approach:** Coordinate with the Wowsly team to whitelist deployment domains.

## Security Considerations

**Public API Keys & Client Bundling:**
- **Risk:** Keys like `VITE_RAZORPAY_KEY_ID` are bundled inside public client assets, making them readable by inspecting network logs.
- **Files:** `src/config/wowsly.js` (Line 3), `.env.example`
- **Current mitigation:** Only public-facing publishable client keys are stored.
- **Recommendations:** Use backend proxy functions to hide keys, or use strict origin protection headers inside the Razorpay dashboard.

**External Script Context Access:**
- **Risk:** Running third-party scripts loaded dynamically from external CDNs (like `checkout.razorpay.com`) grants those scripts full context permissions inside the browser window.
- **Current mitigation:** Relying on the HTTPS script location protocol check.
- **Recommendations:** Implement strict Content Security Policies (CSP) restricting allowed script sources.

## Missing Critical Features

**Placeholder QR Code / Receipt Ticket Details Integration:**
- **Issue:** The ticket confirmation screen in `src/components/BookingFlow.jsx` still displays a placeholder QR icon instead of dynamic ticket QR passes.
- **Impact:** Users do not receive their real booking QR pass on the confirmation page.
- **Fix approach:** Wire up `GET /events/163/{guestUuid}/tickets/details` to fetch the real booking details and render the generated QR pass code.

**Delegate Form Handling for Group Bookings:**
- **Issue:** Couples and multi-ticket quantities are sent as single registration payloads. It is unconfirmed whether Wowsly expects individual attendee delegations.
- **Impact:** Multi-person bookings might list all passes under one attendee's name.
- **Fix approach:** Confirm Wowsly API capability for multi-delegate form answers.

## Test Coverage Gaps

**Ticketing & Gateway Flows:**
- **What's not tested:** The end-to-end user checkout journey (Registration -> Quote -> Reserve -> Gateway popup -> Verification callback -> Success QR code).
- **Risk:** Integration changes in the Wowsly API or Razorpay payloads could break the payment flow silently in production.
- **Priority:** High
- **Difficulty to test:** Requires mock API endpoints, synthetic browser drivers, or test gateway keys.

---

*Concerns audit: 2026-07-11*
*Update as issues are fixed or new ones discovered*
