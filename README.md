# FitLog — Workout Library

A dark, no-nonsense gym companion built with Next.js. Browse a live library
of lifts pulled from the FitLog API, drill into a detailed workout page, and
lock exercises into today's plan or save them for later — all tracked live
in the navbar and persisted across reloads.

## Description

FitLog lets a lifter pick a lift, lock it into today's plan, and watch the
week's work add up. The Home page showcases the full workout library — live
from the FitLog API — in a responsive card grid; each card links to a detail
page with full instructions and specs. From there, workouts can be added to
**Today's Plan** (capped at 5 lifts) or **Saved for later**, both tracked on
a dedicated `/my-plan` page with live stat totals, tabs, and per-item
actions. Every add, remove, and duplicate attempt surfaces a toast
notification.

## Technologies Used

- **Next.js 14** (App Router) — routing, layouts, dynamic workout detail route
- **React 18** — component state and context
- **Tailwind CSS** — styling, theming, and fully responsive layout
- **FitLog REST API** (`api.abcz.workers.dev`) — live workout data and images
- **Browser localStorage** — persists the plan and saved lists across reloads
- **Custom inline SVG icon set** — no external icon dependency

## Features

1. **Live workout library** — a 4-column (desktop) / 2-column (tablet) /
   1-column (mobile) responsive grid of every workout returned by the API,
   each card showing its photo, category tags, equipment, and a
   duration/calories/rating stats row, with a loading spinner and error
   state while data is fetched.
2. **Sort & search** — a "Sort By" dropdown (Duration, Calories, Rating) and
   a live text search across workout name and tags, available on both the
   Library and My Plan pages.
3. **Detail pages with plan actions** — a two-column detail page per workout
   with full specs, numbered instructions, and "Add to today's plan" /
   "Save for later" buttons, each firing a toast notification.
4. **My Plan dashboard** — live Exercises / Minutes / Calories stat cards,
   a Today's Plan vs. Saved segmented tab control, "Mark as Done", and
   remove (×) actions, with a 5-lift plan cap and a friendly empty state.
5. **Toasts for every plan action** — adding a workout, removing a workout,
   and attempting to re-add a workout already in the plan or saved list all
   trigger a clear, color-coded toast in the top-right corner.
6. **Persistent state & navbar badges** — the Plan and Saved counts in the
   navbar update live and persist in `localStorage`, so progress survives a
   page reload. A custom 404 page handles unknown routes and unknown
   workout ids.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Data Source

This app fetches workout data from the FitLog API:

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

See `lib/api.js` for the fetch implementation.

## Project Structure

```
app/
  page.js                 Home page (hero + library)
  workout/[id]/page.js    Workout detail page (client-fetched by id)
  my-plan/page.js         Today's Plan / Saved page
  not-found.js            Custom 404 page
  loading.js              Route-level loading fallback
components/               Navbar, Footer, Hero, cards, icons, toasts
context/PlanContext.js    Plan/Saved/toast state + localStorage sync
lib/api.js                FitLog API client
lib/categoryStyles.js     Muscle-group tag color mapping
```
