
## NavyTrack (Event Analytics Dashboard)

NavyTrack is a fully responsive **React 18 + TypeScript** event analytics dashboard built with **Tailwind CSS** and **Recharts**.

This repo uses **mock data only** (no backend) and simulates live event collection with `setInterval`.

Design reference: `https://www.figma.com/design/KtJCt6tYqlSqjsvM75SPEn/Event-Analytics-Dashboard-Design`

## Running the app

- Install dependencies:

```bash
npm install
```

- Start the dev server:

```bash
npm run dev
```

- TypeScript typecheck (strict, no emit):

```bash
npm run typecheck
```

## How it works

### Data flow overview
There is one source of truth: an in-memory `events` array. The UI (KPIs, charts, table) renders directly from that array, so everything updates automatically whenever new events arrive.

### Event types (the contract)
File: `src/types/event.types.ts`

- `Event` matches the assessment schema (timestamp, type, userId, page, status, responseTime).
- `KPIData` represents derived KPI values + delta percentages.

### Seed data (first render)
File: `src/data/mockEvents.ts`

- Seeds **50 events** spread across the last **24 hours**.
- Sorts them with the newest event first so the dashboard feels “live” immediately.

### Random event generator
File: `src/data/eventGenerator.ts`

- `generateEvent()` creates a random `Event` (type/page/userId/status/responseTime).
- `type === 'error'` always produces `status: 'error'` for realism.

### Live feed (simulated updates)
File: `src/hooks/useEventFeed.ts`

- Uses a `useReducer` store to manage events.
- Every **3 seconds**, a new event is generated and **prepended** to the array.
- The array is capped at **200 events**.
- KPIs are recomputed from the live event array on every update.

### UI composition
File: `src/App.tsx`

- `useEventFeed()` provides `{ events, kpis }`.
- Components render from those props:
  - `Header`: app title + pulsing “Collecting Events” indicator + date (date hidden on mobile)
  - `KPIRow`: 4 KPI cards (2x2 on mobile/tablet, 4-in-row on desktop)
  - `ChartsRow`: line/area chart (events over time) + horizontal bar chart (event type breakdown)
  - `EventsTable`: paginated table (10 rows/page), mobile horizontal scroll (`min-width: 600px`)

## Responsiveness (breakpoints)
- **Mobile (< 640px)**: single column layout, KPI 2x2 grid, charts stacked, table scroll wrapper
- **Tablet (640px – 1024px)**: KPI 2x2 grid, charts stacked
- **Desktop (> 1024px)**: charts in a 60/40 two-column layout, KPI row of 4
  # Flo-Amadou-Nguevo-Kamel-Ride-Assignment-Submission
