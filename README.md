# Imperial Co

Pharmaceutical RLD & comparator sourcing landing site.

## Stack

- React 19 + Vite
- Tailwind CSS v4
- Redux Toolkit
- React Router

## Getting started

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## Project structure

```
src/
  app/                 # Redux store
  features/            # Redux slices (catalog, ui)
  components/
    layout/            # Header, Footer
    sections/          # Landing page sections
    modals/            # Quote request modal
    ui/                # Shared UI primitives
  data/                # Static content
  pages/               # Route pages
  assets/              # Brand logo
```

## Brand

- Primary navy: `#282A74`
- Soft lavender: `#E7E7F1`
- Mint accent: `#DCFCE7` / `#16A34A`

## Backend (next)

Catalog search and quote submission are wired through Redux with local mocks.
Replace the thunks/actions with Node API calls when the backend is ready.
