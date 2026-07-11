# Architecture

**Analysis Date:** 2026-07-11

## Pattern Overview

**Overall:** Component-Driven Single Page Web Application (Vite + React) with external serverless API integrations for payments and ticketing.

**Key Characteristics:**
- **Modular Component Tree:** Highly modularized React components mapping to distinct sections on the landing page and booking pages.
- **Client-Side Navigation:** Uses React Router (`react-router-dom`) for fluid, instantaneous transition between landing pages, event detail screens, and booking checkout.
- **Centralized API Wrapper:** Clean separation between presentation components and API integration logic.
- **Dynamic CSS-in-JS:** Relies on Material UI System styling engine (Emotion) combined with keyframe CSS animations (`src/styles/animations.css`).

## Layers

**Router & Layout Layer:**
- **Purpose:** Declares page routes, handles layout view wrapping, manages scroll restoration, and renders floating utilities.
- **Files:**
  - `src/main.jsx` - Route configs, root provider setup, `ScrollToTopLayout`.
  - `src/App.jsx` - Main landing page layout.

**Presentation & UI Component Layer:**
- **Purpose:** Visual widgets, form interactions, and multi-step workflows.
- **Files:**
  - `src/components/*` (e.g., `src/components/BookingFlow.jsx`, `src/components/Hero.jsx`, `src/components/Registration.jsx`)

**Service Layer:**
- **Purpose:** Handles external data extraction, HTTP calls, and session management.
- **Files:**
  - `src/services/wowslyApi.js` - API request payloads, query parameters, endpoint definitions.
  - `src/services/wowslyBooking.js` - High-level booking orchestrator handling the registration -> quoting -> payment flow state machine.

**Utilities & Constants:**
- **Purpose:** Abstract third-party scripts, custom React hooks, shared themes, and theme variables.
- **Files:**
  - `src/utils/razorpay.js` - Razorpay integration helper.
  - `src/constants/colors.js` - Style guide configuration.
  - `src/theme.js` - Global MUI theme.
  - `src/hooks/*` - Utility hooks like `useCountUp` and `useReveal`.

## Data Flow

**Ticket Booking & Checkout Lifecycle:**
1. **Registration Form Submission:** The user fills out details in `Registration.jsx`. The service triggers `submitRegistration` sending Form Data to Wowsly, establishing a `guest_uuid` and `user_id`.
2. **Pricing Quote Retrieval:** The system retrieves available tickets for the UUID via `getEventTickets` and requests a dynamic pricing quote from `/v2/pricing/quote`.
3. **Ticket Reservation Locking:** The user confirms selection, invoking `selectTicket` to lock the slot, generating a `guest_ticket_id` and `batch_id`.
4. **Order Initialization:** Calling `createCheckoutOrder` generates a Razorpay Order ID.
5. **Gateway Payment Overlay:** The UI invokes `openRazorpayCheckout` loading Razorpay's checkout sheet inside the client window.
6. **Signature Verification:** The handler captures success callbacks, passes details to `verifyPayment`, updates session status to `paid`, and redirects the user to the QR Pass confirmation step.

**State Management:**
- Application state is localized using React hooks (`useState`, `useMemo`).
- Multi-step booking states are stored in browser session storage (`sessionStorage`) to survive transient page reloads.

## Entry Points

**Web Entry:**
- **Location:** `src/main.jsx`
- **Triggers:** Initial application load.
- **Responsibilities:** Mounts the React app inside the `#root` div, configures theme/styles, and handles client routing.

## Error Handling

- **API Layer:** `wowslyApi.js` contains `parseResponse` which inspects response status, extracts server-provided errors (`data.message` or `data.error`), and throws descriptive javascript Error instances.
- **UI Interaction Layer:** Component handlers catch errors, update state (`paymentError` in `BookingFlow.jsx`), and show alert dialogs.

---

*Architecture analysis: 2026-07-11*
*Update when major patterns change*
