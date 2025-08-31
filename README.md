## Logieman Landing Page (React + Vite + Tailwind)

A modern, animated, responsive landing page for the Logieman platform, built with React, Vite, TypeScript, Tailwind CSS, GSAP animations, and Headless UI. It includes a production‑ready Post Load form with validation (Zod), date picking, and an API integration via Axios.

### Contents
- Overview
- Features
- Tech stack
- Project structure
- Getting started
- Scripts
- Environment variables
- API contract (Temp Load create)
- Architecture notes (components, validation, animations, styling)
- Build and deploy
- Troubleshooting
- Contributing
- License

## Overview
This project renders a single‑page landing experience with a responsive `Navbar`, animated `HeroSection`, and a `PostLoad` form that saves a temporary load on the backend and redirects users to the dashboard for sign‑in/next steps.

## Features
- **Responsive Navbar**: Mobile menu using Headless UI `Dialog`, animated mount with GSAP.
- **Animated Hero**: Smooth intro and subtle parallax/float effects via GSAP and `ScrollTrigger`.
- **Post Load form**: Country pickers, load details, date picker, client‑side validation with Zod, and API submission with Axios.
- **Type‑safe validation**: Strong field validation and useful error messages; prevents past dates and identical source/destination.
- **Theming with Tailwind**: Extended color palette and Poppins font; clean utility‑first styles.
- **Production‑grade build**: Vite 7 for fast dev server and optimized production builds.

## Tech stack
- **Framework**: `react`, `react-dom`, `react-router-dom`
- **Build tool**: `vite`
- **Language**: `typescript`
- **Styling**: `tailwindcss`, `postcss`, `autoprefixer`
- **UI**: `@headlessui/react`, `@heroicons/react`
- **Animations**: `gsap` (with `ScrollTrigger`)
- **Forms/Validation**: `zod`, `react-datepicker`
- **HTTP**: `axios`
- **Linting**: `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`

## Project structure
```text
src/
  api/
    axios.ts                # Centralized Axios instance (base URL via env)
    tempLoads.ts            # createTempLoad API call and payload types
  assets/
    components/
      navbar.tsx            # Header with Headless UI dialog for mobile
      heroSection.tsx       # Animated hero with GSAP + ScrollTrigger
      postLoad.tsx          # Form UI, GSAP micro‑interactions, submit flow
      ...                   # Other presentation components
    media/                  # Images (e.g., app screenshot, logo)
    pages/
      LandingPage.tsx       # Page composition (imports components)
  constants/                # Copy, options, and UI constants
  validation/
    postLoadSchema.ts       # Zod schema + helpers for error extraction
  App.tsx                   # Router and routes
  main.tsx                  # App bootstrap
  index.css                 # Tailwind layers and base styles
```

## Getting started
### Prerequisites
- Node.js 18+ recommended
- npm 9+ (or a compatible package manager)

### Setup
```bash
npm install
```

### Run the dev server
```bash
npm run dev
```
The server URL will be printed by Vite (typically `http://localhost:5173`).

## Scripts
- `npm run dev`: Start Vite dev server.
- `npm run build`: Type‑check and create a production build.
- `npm run preview`: Preview the production build locally.
- `npm run lint`: Run ESLint.

## Environment variables
Create a `.env` (or `.env.local`) in the project root to configure runtime options.

```bash
# Backend API base; used by src/api/axios.ts
VITE_API_BASE_URL=https://api.example.com

# Dashboard base; used for redirect after successful temp load submit
VITE_DASHBOARD_URL=https://dashboard.example.com
```

Notes:
- Environment variables must be prefixed with `VITE_` to be exposed to the client at build time.
- If `VITE_API_BASE_URL` is not set, requests default to same‑origin (`""`). Configure a dev proxy or serve the API under the same domain to avoid CORS issues.

## API contract (Temp Load create)
The `PostLoad` form posts to `/api/temp-loads/create` using the centralized Axios instance (`src/api/axios.ts`). The endpoint is expected to exist under `VITE_API_BASE_URL`.

### Request
```http
POST /api/temp-loads/create
Content-Type: application/json
```

```json
{
  "deviceHash": "df-0fd4ab12",
  "loadData": {
    "sourceCountry": "India",
    "destCountry": "United Arab Emirates",
    "scheduledDate": "2025-10-01",
    "weight": "20",
    "material": "Steel Coils",
    "materialHSNCode": "7208",
    "loadType": "FTL"
  }
}
```

### Response
```json
{
  "id": "temp-load-id",
  "status": "ok"
}
```

### Redirect behavior
On success, if `VITE_DASHBOARD_URL` is configured, the app redirects to:
```
${VITE_DASHBOARD_URL}/signin?redirect=post-load&deviceFingerprint=${deviceHash}
```

## Architecture notes
### Components and routing
- `src/App.tsx` registers routes with `react-router-dom` and renders `LandingPage` at `/`.
- `src/assets/pages/LandingPage.tsx` composes the page from `Navbar`, `HeroSection`, `PostLoad`, and other presentation components.

### Validation
`src/validation/postLoadSchema.ts` uses Zod to enforce:
- `sourceCountry` and `destinationCountry` are valid and not identical.
- `weightKg` is numeric and greater than 0.
- `loadType` is one of the allowed options.
- `scheduledDate` is `YYYY-MM-DD` and not in the past.
- Optional `hsnCode` is 4–8 digits when present.

Helper `extractFieldErrors` converts Zod issues to a simple field → message map for inline UI feedback.

### Date handling
`react-datepicker` stores the picked date in local state and formats it to `YYYY-MM-DD` before validation/submission.

### Animations
- `HeroSection` registers GSAP `ScrollTrigger` for intro and parallax effects.
- `PostLoad` uses GSAP for mount transitions and subtle focus/hover micro‑interactions on inputs and the submit button.

### Styling and theming
- Tailwind is configured in `tailwind.config.js` with an extended palette: `primary`, `secondary`, `accent`, `success`, `warning`, `error`, `info`, `light`, `dark`, `muted`, `border`.
- Global base styles in `src/index.css` set the Poppins font family and ensure no horizontal overflow.

### HTTP and configuration
- `src/api/axios.ts` creates a single Axios instance with `baseURL` from `VITE_API_BASE_URL` and JSON headers.
- `src/api/tempLoads.ts` defines the `createTempLoad` call and TypeScript types for payloads.

### Linting/Type‑checking
ESLint is configured in `eslint.config.js` with TypeScript, React Hooks, and React Refresh plugins. TypeScript uses strict settings via `tsconfig.app.json`.

## Build and deploy
### Production build
```bash
npm run build
```
Outputs an optimized bundle to `dist/`.

### Preview locally
```bash
npm run preview
```

### Hosting
The output in `dist/` is a static site and can be hosted on any static host (e.g., Netlify, Vercel, GitHub Pages, Nginx, S3+CloudFront). If your API is on a different domain, ensure CORS and/or reverse proxying are configured.

## Troubleshooting
- **404 on `/api/temp-loads/create`**: Ensure `VITE_API_BASE_URL` is set correctly and the backend route exists. For local dev, consider a proxy or run the API on the same origin.
- **CORS errors**: Configure CORS on the API or use a dev proxy so the browser can call the endpoint.
- **Date cannot be selected**: The form prevents past dates; ensure your system clock/timezone is correct.
- **Validation errors not clearing**: The UI clears field errors on change; confirm there are no console errors and that all required fields are filled.


