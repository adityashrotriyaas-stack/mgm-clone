# Codebase Structure

**Analysis Date:** 2026-07-11

## Directory Layout

```
MGM-NAVRATRI-WEBSITE/
├── public/                 # Root static assets served directly
│   └── images/             # High-res site artwork (e.g., hero illustrations)
├── src/                    # Primary application source code
│   ├── assets/             # Bundled local media assets (logos, background images)
│   │   └── past-nights/    # Visual highlights from previous festival nights
│   ├── components/         # Modular UI elements and layout sections
│   ├── config/             # App integration settings
│   ├── constants/          # Theme constants (color palettes, grids, typography)
│   ├── data/               # Structured data files (event schedules, menus)
│   ├── hooks/              # Reusable React custom hook abstractions
│   ├── services/           # API handlers and business workflow managers
│   ├── styles/             # Application-wide global stylesheets
│   ├── utils/              # External script integrations and utilities
│   ├── App.jsx             # Landing page layout assembly
│   ├── main.jsx            # Root entry point configuring React Router
│   └── theme.js            # MUI design system specification
├── vercel.json             # Vercel platform configurations
└── vite.config.js          # Vite build system options
```

## Directory Purposes

**public/**
- Purpose: Files served directly without Vite asset compiling.
- Contains: Favicons, inline SVGs, background hero illustrations.

**src/assets/**
- Purpose: Static image, video, and vector branding imports compiled during the Vite bundling process.
- Key files: `navratri video.mp4`, `past-nights/*.png`.

**src/components/**
- Purpose: Houses all view controls, forms, sections, and structural layouts.
- Key files:
  - `BookingFlow.jsx` - Core wizard that controls checkout state.
  - `Registration.jsx` - Interactive user registration page containing category/ticket inputs.
  - `shared.jsx` - Modular styled sub-components (Eyebrows, RevealBoxes).

**src/config/**
- Purpose: Contains integrations environment setups.
- Key files: `wowsly.js` - API maps, slots, and environment definitions.

**src/constants/**
- Purpose: Global design specifications.
- Key files: `colors.js` - Complete theme palettes and custom CSS gradients.

**src/data/**
- Purpose: Separates copywriting/data structures from styling.
- Key files: `siteData.js` - Event night themes, artist rosters, and site configurations.

**src/services/**
- Purpose: API clients and state machine workflows.
- Key files:
  - `wowslyApi.js` - Raw HTTP fetch operations.
  - `wowslyBooking.js` - Transactional logic coupling Wowsly and Razorpay.

**src/utils/**
- Purpose: Third-party initialization routines.
- Key files: `razorpay.js` - Script loader wrapper.

## Key File Locations

**Entry Points:**
- `src/main.jsx` - React Router configuration and MUI Theme injection.
- `src/App.jsx` - Home page assembly.

**Configuration:**
- `package.json` - Dependencies and build scripts.
- `vite.config.js` - Vite compiler properties.
- `vercel.json` - Routing rewrite declarations for clean SPA paths.

## Naming Conventions

**Files:**
- React Components: `PascalCase.jsx` (e.g., `AadhaarNumberField.jsx`).
- Logic modules and services: `camelCase.js` (e.g., `wowslyApi.js`).
- Style files: `kebab-case.css` (e.g., `animations.css`).

**Directories:**
- Directories are named using standard pluralized `camelCase` / `kebab-case` (e.g., `components`, `past-nights`).

## Where to Add New Code

**Adding a New Section or UI Card:**
- Implementation: Create a component under `src/components/NewSection.jsx`.
- Styles: Add custom animations to `src/styles/animations.css` if necessary, or specify custom `sx` rules using tokens from `src/constants/colors.js`.
- Register in landing layout: Import and inject inside `src/App.jsx`.

**Adding a New API Service Hook:**
- Implementation: Define queries/endpoints inside `src/services/wowslyApi.js`.
- Integrate in transaction model: Call the endpoint inside the booking coordinator `src/services/wowslyBooking.js`.

---

*Structure analysis: 2026-07-11*
*Update when directory structure changes*
