# FitLog — Workout Library

A dark, no-nonsense gym companion built with Next.js. Browse a library of twelve lifts, drop them into today's plan or save them for later, and track your session's exercises, minutes, and calories as you go.

## Description

FitLog lets you pick a lift, lock it into today's plan, and watch the week's work add up. It pulls live workout data from a REST API, presents it as a searchable, sortable card library, and gives every workout its own detail page with full instructions and specs. A dedicated "My Plan" page tracks what you've queued up and what you've saved, with live stats and persistence across reloads.

## Technologies Used

- **Next.js 14** (App Router) — routing, layouts, and client-side data fetching
- **React 18** — component architecture and state management via Context API
- **Tailwind CSS** — utility-first styling and full responsive design
- **Fetch API** — consuming the FitLog REST API (`/api/fitlog`, `/api/fitlog/:id`)
- **localStorage** — persisting the plan and saved lists across page reloads

## Features

1. **Responsive workout library** — a 3-column grid on desktop that collapses to 2 and 1 columns on tablet and mobile, with each card showing image, category tags, equipment, and a duration/calories/rating stats row.
2. **Workout detail pages** — a two-column layout with a large illustration, key specs panel, numbered instructions, and "Add to today's plan" / "Save for later" actions with toast confirmations.
3. **My Plan dashboard** — live Exercises / Minutes / Calories summary cards, tabbed Today's Plan vs. Saved views, a 5-lift cap with disabled state, Mark as Done, and Remove actions.
4. **Persistent state** — the plan and saved lists (and their navbar badge counts) survive a full page reload via localStorage.
5. **Sort & search** — a "Sort By" dropdown (Duration / Calories / Rating) and a live name/tag search on the library grid.
6. **Polished UX details** — loading spinners while data fetches, a custom 404 page for unknown routes, and toast notifications for every plan/saved action.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Build

```bash
npm run build
npm start
```

## API

- All data: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`
