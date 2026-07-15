# Coding Conventions

**Analysis Date:** 2026-07-11

## Naming Patterns

**Files:**
- React Components: `PascalCase.jsx` (e.g., `Registration.jsx`, `BookingFlow.jsx`).
- Custom Hooks: `useCamelCase.js` (e.g., `useScrollProgress.js`, `useReveal.js`).
- API & Logic modules: `camelCase.js` (e.g., `wowslyApi.js`, `razorpay.js`).
- Stylesheets: `kebab-case.css` (e.g., `animations.css`).

**Functions & Variables:**
- Functions: `camelCase` (e.g., `submitRegistration`, `isWowslyConfigured`).
- Local Variables: `camelCase`.
- Global Configuration Settings: `UPPER_SNAKE_CASE` (e.g., `WOWSLY_API_BASE`, `RAZORPAY_KEY_ID`).
- UI Palette / Gradients: `camelCase` properties inside a exported object (e.g., `colors.bgSoft`).

## Code Style

**Formatting:**
- **No Semicolons:** Semicolons are omitted throughout the codebase (in JavaScript and JSX files).
- **Single Quotes:** Single quotes are used for string literals (e.g., `import Box from '@mui/material/Box'`).
- **Indentation:** Standard 2-space indentation.
- **Arrow Functions:** Frequently used for inline component definitions and simple callbacks, while standard function syntax is used for component declarations (`export default function Registration() {}`).

**Linting:**
- Checked via **Oxlint** (`npm run lint`), configured in `.oxlintrc.json`.

## Import Organization

**Order:**
1. React core React hooks (`useEffect`, `useState`, `useMemo`).
2. Third-party dependencies (`react-router-dom`, `@mui/material/*`, `@mui/icons-material/*`).
3. Local UI components and shared utilities (`./shared`, `./NonRefundableCheckbox`).
4. Constants and theme tokens (`../constants/colors`).
5. Application services and configurations (`../services/wowslyBooking`).

**barrel Files:**
- Some files export multiple elements (e.g., `src/components/shared.jsx` exports `Eyebrow`, `RevealBox`, etc.).

## Error Handling

**Patterns:**
- **Centralized API Parsing:** API requests invoke the helper wrapper `parseResponse` which inspects `response.ok`, extracts errors, and throws generic `Error(message)` instances.
- **Component Catch Blocks:** Async operations in components (like payment trigger steps in `BookingFlow.jsx`) utilize try/catch blocks to trap thrown exceptions, update reactive states (`setPaymentError`), and toggle loading indicators (`setPaying(false)`).

## JSDoc / Comments

- JSDoc is used selectively to document interface contracts (e.g., configuration mapping logic in `wowsly.js`).
- Business logic commentary explains the "why" rather than the "what" (e.g. noting Razorpay constraints on metadata sizes).

---

*Convention analysis: 2026-07-11*
*Update when patterns change*
