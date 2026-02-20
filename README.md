# Alex AI Dashboard

A responsive dashboard built with React + TypeScript + React Router showcasing a collapsible sidebar layout, mock product data tooling, and persistable user settings.

## Features

- **Adaptive App Shell**: Collapsible sidebar with nav state persisted to `localStorage`, keyboard accessible controls, and off-canvas mode on mobile with overlay close.
- **Routing**: React Router v6 with lazy-loaded routes (`/`, `/products`, `/settings`, `*`).
- **Products Workspace**: Mock API with latency + failure simulation, debounced search, sorting, resilient loading/error states, and a detail modal.
- **Settings Panel**: Validated form (display name, email, theme toggle) with dirty detection, disabled save until valid, success toast, and persisted preferences (including document theme sync).
- **Reusable UI kit**: Buttons, cards, inputs, modal/drawer, toast system, debounced hook, theme/localStorage hooks.
- **Testing**: Vitest + React Testing Library covers sidebar state/persistence, product filtering & retry flow, and settings validation.
- **Tooling**: ESLint (flat config), Prettier, TypeScript strictness via Vite, route-level code splitting, and npm scripts for CI flows.

## Getting Started

```bash
npm install
npm run dev
```

Visit http://localhost:5173 and use sidebar controls (try collapsing, navigating, and opening the mobile drawer on narrow widths).

## Key Scripts

- `npm run dev` – Vite dev server with HMR
- `npm run lint` – ESLint (flat config)
- `npm run test` – Vitest unit tests
- `npm run build` – Type-check and build production assets
- `npm run preview` – Preview the production build

## Architecture

```
src/
 ├─ app/            # Router + layout composition
 ├─ components/     # Reusable UI + app shell pieces
 ├─ features/       # Route-scoped domains (home, products, settings, not-found)
 ├─ hooks/          # Shared hooks (localStorage, media, debounced values, theme sync)
 ├─ lib/            # Utilities (classnames, theme helpers, mock delays)
 ├─ test/           # Testing helpers & setup
 └─ __tests__/      # RTL + Vitest coverage
```

Mock services live in `features/products/api.ts`, intentionally injecting 300–800 ms latency and a 10% failure chance to exercise the retry/error UX.

## Tradeoffs & Decisions

- **Local state + hooks vs. global store**: Requirements fit colocated hook-based state (sidebar, settings) without heavier state libraries.
- **Portal-based modal**: Keeps DOM semantics simple while supporting drawer-like behavior on mobile breakpoints.
- **Testing scope**: Focused on behavior most likely to regress (nav persistence, search filtering, validation, retry). Broader snapshot or e2e coverage can be layered later.
- **Accessibility**: Nav uses `aria-current`, overlay buttons have labels, inputs wire hints/errors to `aria-describedby`, and toasts announce via `aria-live`.

## Linting & Formatting

- ESLint flat config with React Hooks + Refresh plugins
- Prettier (`.prettierrc`) for consistent formatting

## Mock API

`getProducts`/`getProductById` live under `features/products/api.ts`. The helpers use randomized delays and failure rates to keep the UI resilient.

## Testing

```
npm run test
```

Vitest is configured with jsdom + RTL (`src/test/setup.ts`). Tests live in `src/__tests__`.

## Deployment Preview

Use `npm run build && npm run preview -- --host 0.0.0.0 --port 4000` (managed via PM2 in this environment) to serve the production bundle.
