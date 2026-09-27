"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePlan } from "@/context/PlanContext";
import { tagStyle } from "@/lib/categoryStyles";
import SortDropdown from "@/components/SortDropdown";
import { IconClock, IconFlame, IconStar, IconCheck, IconX } from "@/components/Icons";

export default function MyPlanPage() {
  const { plan, saved, hydrated, removeFromPlan, removeFromSaved, markDone } = usePlan();
  const [tab, setTab] = useState("plan");
  const [sortBy, setSortBy] = useState({ plan: "duration", saved: "duration" });

  const currentSort = sortBy[tab];
  const rawList = tab === "plan" ? plan : saved;

  const list = useMemo(() => {
    return [...rawList].sort((a, b) => (b[currentSort] ?? 0) - (a[currentSort] ?? 0));
  }, [rawList, currentSort]);

  const metrics = useMemo(() => {
    return plan.reduce(
      (acc, w) => ({
        exercises: acc.exercises + 1,
        minutes: acc.minutes + (w.duration || 0),
        calories: acc.calories + (w.caloriesBurned || 0),
      }),
      { exercises: 0, minutes: 0, calories: 0 }
    );
  }, [plan]);

  return (
    <section className="container-page py-10 sm:py-12">
      <h1 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-2 text-sm text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="card-surface mt-8 grid grid-cols-3 divide-x divide-line">
        <StatCard label="Exercises" value={metrics.exercises} accent />
        <StatCard label="Minutes" value={metrics.minutes} />
        <StatCard label="Calories" value={metrics.calories} />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex items-center gap-1 rounded-full border border-line bg-panel p-1">
          {[
            { key: "plan", label: "Today's Plan" },
            { key: "saved", label: "Saved" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                tab === t.key ? "bg-panel2 text-white" : "text-muted hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {list.length > 0 && (
          <SortDropdown
            value={currentSort}
            onChange={(v) => setSortBy((prev) => ({ ...prev, [tab]: v }))}
          />
        )}
      </div>

      <div className="mt-6">
        {!hydrated ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-muted">
            <div className="h-10 w-10 spin-slow rounded-full border-2 border-line border-t-accent" />
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

function StatCard({ label, value, accent }) {
  return (
    <div className="flex flex-col gap-1 px-6 py-5">
      <span className="text-xs text-muted">{label}</span>
      <span className={`font-display text-3xl font-bold ${accent ? "text-accent" : "text-white"}`}>
        {value}
      </span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="card-surface flex flex-col items-center gap-4 py-20 text-center">
      <h3 className="font-display text-xl font-bold uppercase text-white">
        Nothing Here Yet
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
        {workout.image ? (
          <Image src={workout.image} alt={workout.name} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted">
            No image
          </div>
        )}
      </div>

      <div className="flex-1">
        <div className="mb-1 flex flex-wrap gap-2">
          {workout.muscleGroups?.map((tag) => (
            <span key={tag} className={`pill ${tagStyle(tag)}`}>
              {tag.toUpperCase()}
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
            <IconClock /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <IconFlame className="text-accent" /> {workout.caloriesBurned} kcal
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
                : "bg-accent text-black hover:brightness-95"
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
