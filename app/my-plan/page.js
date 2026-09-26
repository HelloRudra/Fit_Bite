"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePlan } from "../../context/PlanContext";
import { tagStyle } from "../../lib/categoryStyles";
import { IconClock, IconFlame, IconStar, IconCheck, IconX, IconChevronDown } from "../../components/Icons";

const SORT_OPTIONS = [
  { value: "duration", label: "Duration" },
  { value: "calories", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeFromSaved, markDone } = usePlan();
  const [tab, setTab] = useState("plan");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState({ plan: "duration", saved: "duration" });
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  const currentSort = sortBy[tab];

  const list = useMemo(() => {
    const base = tab === "plan" ? plan : saved;
    return [...base].sort((a, b) => (b[currentSort] ?? 0) - (a[currentSort] ?? 0));
  }, [tab, plan, saved, currentSort]);

  const metrics = useMemo(() => {
    return plan.reduce(
      (acc, w) => ({
        exercises: acc.exercises + 1,
        minutes: acc.minutes + w.duration,
        calories: acc.calories + w.calories,
      }),
      { exercises: 0, minutes: 0, calories: 0 }
    );
  }, [plan]);

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-2 text-sm text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <StatCard label="Exercises" value={metrics.exercises} />
        <StatCard label="Minutes" value={metrics.minutes} />
        <StatCard label="Calories" value={metrics.calories} />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-line">
        <div className="flex gap-2">
          {[
            { key: "plan", label: "Today's Plan" },
            { key: "saved", label: "Saved" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => {
                setTab(t.key);
                setSortOpen(false);
              }}
              className={`px-4 py-3 text-sm font-semibold uppercase tracking-wide transition ${
                tab === t.key
                  ? "border-b-2 border-accent text-accent"
                  : "text-muted hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {list.length > 0 && (
          <div className="relative mb-3">
            <button
              onClick={() => setSortOpen((o) => !o)}
              className="flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2 text-sm font-semibold text-white"
            >
              Sort By:{" "}
              <span className="text-accent">
                {SORT_OPTIONS.find((o) => o.value === currentSort)?.label}
              </span>
              <IconChevronDown />
            </button>
            {sortOpen && (
              <div className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-xl border border-line bg-panel2 shadow-xl">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSortBy((prev) => ({ ...prev, [tab]: opt.value }));
                      setSortOpen(false);
                    }}
                    className={`block w-full px-4 py-2.5 text-left text-sm hover:bg-white/5 ${
                      currentSort === opt.value ? "text-accent" : "text-white"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-muted">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-accent" />
            <p className="text-sm">Loading workouts…</p>
          </div>
        ) : list.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-4">
            {list.map((w) => (
              <PlanCard
                key={w.id}
                workout={w}
                tab={tab}
                onRemove={() => (tab === "plan" ? removeFromPlan(w.id) : removeFromSaved(w.id))}
                onMarkDone={() => markDone(w.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="card-surface flex flex-col items-center justify-center gap-1 py-6">
      <span className="font-display text-3xl font-bold text-accent">{value}</span>
      <span className="text-xs uppercase tracking-wide text-muted">{label}</span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="card-surface flex flex-col items-center gap-4 py-20 text-center">
      <h3 className="font-display text-xl font-bold uppercase text-white">
        Nothing here yet
      </h3>
      <p className="max-w-sm text-sm text-muted">
        Browse the library and add a lift to get today moving.
      </p>
      <Link href="/" className="btn-primary">
        Go to workouts
      </Link>
    </div>
  );
}

function PlanCard({ workout, tab, onRemove, onMarkDone }) {
  return (
    <div className="card-surface flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
      <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-xl bg-panel2 sm:w-28">
        <Image src="/banner.png" alt={workout.name} fill className="object-cover" />
      </div>

      <div className="flex-1">
        <div className="mb-1 flex flex-wrap gap-2">
          {workout.tags?.map((tag) => (
            <span key={tag} className={`pill ${tagStyle(tag)}`}>
              {tag}
            </span>
          ))}
        </div>
        <h3
          className={`font-display text-base font-bold text-white ${
            workout.done ? "line-through opacity-50" : ""
          }`}
        >
          {workout.name}
        </h3>
        <p className="text-xs text-muted">{workout.equipment}</p>
        <div className="mt-2 flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1">
            <IconClock className="text-accent" /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <IconFlame className="text-accent" /> {workout.calories} kcal
          </span>
          <span className="flex items-center gap-1">
            <IconStar className="text-accent" /> {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-full border border-line px-4 py-2 text-xs font-semibold text-white transition hover:border-accent hover:text-accent"
        >
          View Details
        </Link>
        {tab === "plan" && (
          <button
            onClick={onMarkDone}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition ${
              workout.done
                ? "border border-line text-muted hover:text-white"
                : "bg-accent text-ink hover:brightness-95"
            }`}
          >
            <IconCheck /> {workout.done ? "Done" : "Mark as Done"}
          </button>
        )}
        <button
          onClick={onRemove}
          title="Remove"
          aria-label="Remove"
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition hover:text-red-400"
        >
          <IconX />
        </button>
      </div>
    </div>
  );
}
