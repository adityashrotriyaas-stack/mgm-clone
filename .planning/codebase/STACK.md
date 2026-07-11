# Technology Stack

**Analysis Date:** 2026-07-11

## Languages

**Primary:**
- JavaScript (ES6+) - All application UI components, state management, and services.

**Secondary:**
- HTML/CSS - Primary index and preview wrappers, custom styling/animations.

## Runtime

**Environment:**
- Browser environment (runs in modern desktop/mobile browsers).
- Build environment runs on Node.js 18+ (LTS).

**Package Manager:**
- npm 10.x - Package management.
- Lockfile: `package-lock.json` present.

## Frameworks

**Core:**
- React 19.2.7 - UI Library.
- React Router DOM 7.18.1 - Router for page transitions.
- Material UI (MUI) 9.1.2 - Main design system and component framework.
- Emotion (React 11.14.0, Styled 11.14.1) - CSS-in-JS library powering MUI.

**Testing:**
- None - No automated testing framework (e.g. Jest, Vitest) is installed.

**Build/Dev:**
- Vite 8.1.1 - Build tool, bundler, and development server.
- Oxlint 1.71.0 - Highly performant linting tool.

## Key Dependencies

**Critical:**
- swiper 14.0.2 - Carousel and slider components for night schedules/galleries.
- ogl 1.0.11 - Minimal WebGL library used for performant background effects.

**Infrastructure:**
- @mui/icons-material 9.1.1 - Icon library for navigation and booking flows.

## Configuration

**Environment:**
- Environment variables configured via Vite `import.meta.env` prefixing with `VITE_`.
- Environment variables defined in `.env`:
  - `VITE_WOWSLY_API_BASE=https://dev-backend.wowsly.com/api` (Dev backend API route)
  - `VITE_WOWSLY_EVENT_ID=163` (Event ID config)
  - `VITE_RAZORPAY_KEY_ID=` (Required for live payment overlay checkout)
  - `VITE_DEFAULT_DIALING_CODE=91`
  - `VITE_DEFAULT_TIMEZONE=Asia/Calcutta`
  - `VITE_ENABLE_LIVE_PAYMENT=true`

**Build:**
- `vite.config.js` - Configuration for the build runner and plugins (React).
- `package.json` - Custom NPM scripts (`dev`, `build`, `preview`, `lint`).
- `.oxlintrc.json` - Configuration rules for the Oxlint linter.

## Platform Requirements

**Development:**
- macOS/Linux/Windows with Node.js 18+.
- No external local database or services required (fully API-integrated).

**Production:**
- Vercel (configured via `vercel.json` for routing rewrites).
- Fully serverless static-site deployment.

---

*Stack analysis: 2026-07-11*
*Update after major dependency changes*
