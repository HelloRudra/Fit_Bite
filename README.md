# FitLog — Workout Library

A dark, no-nonsense gym companion built with Next.js. Browse a library of
twelve lifts, drill into a detailed workout page, and lock exercises into
today's plan or save them for later — all tracked live in the navbar and
persisted across reloads.

## Description

FitLog lets a lifter pick a lift, lock it into today's plan, and watch the
week's work add up. The Home page showcases the full workout library in a
responsive card grid; each card links to a detail page with full instructions
and specs. From there, workouts can be added to **Today's Plan** (capped at 5
lifts) or **Saved for later**, both tracked on a dedicated `/my-plan` page
with live stat totals, tabs, and per-item actions.

## Technologies Used

- **Next.js 14** (App Router) — routing, layouts, API route, static params
- **React 18** — component state and context
- **Tailwind CSS** — styling, theming, and responsive layout
- **Browser localStorage** — persists the plan and saved lists across reloads
- **Custom inline SVG icon set** — no external icon dependency

## Features

1. **Responsive workout library** — a 4-column (desktop) / 2-column (tablet)
   / 1-column (mobile) grid of all 12 workouts, each with image, category
   tags, equipment, and a duration/calories/rating stats row.
2. **Sort & search** — a "Sort By" dropdown (Duration, Calories, Rating) and
   a live text search across workout name and tags.
3. **Detail pages with plan actions** — a two-column detail page per workout
   with full specs, numbered instructions, and "Add to today's plan" /
   "Save for later" buttons that trigger toast notifications.
4. **My Plan dashboard** — live Exercises / Minutes / Calories stat cards,
   Today's Plan vs. Saved tabs, "Mark as Done", and remove (X) actions, with
   a 5-lift plan cap and a friendly empty state.
5. **Persistent state & navbar badges** — the Plan and Saved counts in the
   navbar update live and persist in `localStorage`, so progress survives a
   page reload. A custom 404 page handles unknown routes.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
app/
  page.js                 Home page (hero + library)
  workout/[id]/page.js    Workout detail page
  my-plan/page.js         Today's Plan / Saved page
  api/workouts/route.js   Workouts API endpoint
  not-found.js            Custom 404 page
components/               Navbar, Footer, cards, icons, toasts
context/PlanContext.js    Plan/Saved state + localStorage sync
data/workouts.json        Workout data (12 lifts)
```
