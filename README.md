# Flight Schedule Management

Flight schedule dashboard built with React + TypeScript + Vite.

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open the URL shown in terminal (usually `http://localhost:5173`).

## Available scripts

- `npm run dev` - start Vite dev server
- `npm run build` - type-check and production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

## Implemented features

- Flight table with pagination and virtualized rows (`react-window`)
- Row actions:
  - `Edit` button on each row
  - Edit mode for `date`, `STD`, `STA`, and `status`
  - `Save` + `Cancel` actions
- Save behavior:
  - Optimistic local update
  - Fake API delay (`setTimeout`)
  - Loading indicator while saving
  - Random failure path with rollback + error banner
- Filters:
  - Date range overlap logic (`startDate`/`endDate`)
  - Days of operation (multi-select)
  - Status
  - AOC
  - Body type
  - `Clear All` support

## State management

State is managed with `useReducer` in:

- `src/features/flights/hooks/useFlights.ts`

Reducer covers filters, search, selected rows, row saving states, optimistic updates, rollback, and error handling.

## Note on Node version

This repository currently uses Vite 8, which expects Node `20.19+` (or `22.12+`) for build commands.
