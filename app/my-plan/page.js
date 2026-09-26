"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePlan } from "@/context/PlanContext";
import {
  IconClock,
  IconFlame,
  IconStar,
  IconCheck,
  IconX,
} from "@/components/icons";

export default function MyPlanPage() {
  const { plan, saved, hydrated, removeFromPlan, removeFromSaved, toggleDone, addToast } =
    usePlan();
  const [tab, setTab] = useState("plan");

  const metrics = useMemo(() => {
    const exercises = plan.length;
    const minutes = plan.reduce((sum, w) => sum + (w.duration || 0), 0);
    const calories = plan.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);
    return { exercises, minutes, calories };
  }, [plan]);

  const list = tab === "plan" ? plan : saved;

  function handleRemove(id) {
    if (tab === "plan") {
      removeFromPlan(id);
    } else {
      removeFromSaved(id);
    }
    addToast("Removed from " + (tab === "plan" ? "today's plan" : "saved"));
  }

  function handleDone(id) {
    toggleDone(id);
    addToast("Marked as done");
  }

  return (
    <>
      <Navbar />
      <main className="container-page py-12">
        <h1 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
          My Plan
        </h1>
        <p className="mt-2 text-neutral-400">
          Cap of five lifts for today. Finish them, then load more.
        </p>

        <div className="mt-8 grid grid-cols-3 gap-4">
          <StatCard label="Exercises" value={metrics.exercises} />
          <StatCard label="Minutes" value={metrics.minutes} />
          <StatCard label="Calories" value={metrics.calories} />
        </div>

        <div className="mt-10 flex gap-2 border-b border-line">
          <TabButton active={tab === "plan"} onClick={() => setTab("plan")}>
            Today&apos;s Plan
          </TabButton>
          <TabButton active={tab === "saved"} onClick={() => setTab("saved")}>
            Saved
          </TabButton>
        </div>

        <div className="mt-6">
          {!hydrated ? (
            <div className="flex flex-col items-center justify-center gap-4 py-24 text-neutral-400">
              <div className="h-10 w-10 animate-spin-slow rounded-full border-2 border-line border-t-accent" />
              <p>Loading workouts…</p>
            </div>
          ) : list.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="flex flex-col gap-4">
              {list.map((w) => (
                <PlanCard
                  key={w.id}
                  workout={w}
                  showDone={tab === "plan"}
                  onRemove={() => handleRemove(w.id)}
                  onDone={() => handleDone(w.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="card-surface flex flex-col items-center justify-center gap-1 py-6">
      <span className="font-display text-3xl font-bold text-accent">
        {value}
      </span>
      <span className="text-xs uppercase tracking-wide text-neutral-500">
        {label}
      </span>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`-mb-px border-b-2 px-4 py-3 text-sm font-semibold uppercase tracking-wide transition ${
        active
          ? "border-accent text-accent"
          : "border-transparent text-neutral-500 hover:text-neutral-200"
      }`}
    >
      {children}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-line py-24 text-center">
      <h3 className="font-display text-xl font-bold uppercase tracking-wide">
        Nothing Here Yet
      </h3>
      <p className="max-w-sm text-sm text-neutral-500">
        Browse the library and add a lift to get today moving.
      </p>
      <Link href="/" className="btn-primary mt-4">
        Go to workouts
      </Link>
    </div>
  );
}

function PlanCard({ workout, showDone, onRemove, onDone }) {
  return (
    <div
      className={`card-surface flex flex-col items-start gap-4 p-4 sm:flex-row sm:items-center ${
        workout.done ? "opacity-50" : ""
      }`}
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface2">
        <Image src={workout.image} alt={workout.name} fill className="object-cover" />
      </div>
      <div className="flex-1">
        <h3 className="font-display text-base font-bold uppercase leading-tight">
          {workout.name}
          {workout.done && (
            <span className="ml-2 text-xs font-semibold text-accent">DONE</span>
          )}
        </h3>
        <p className="text-xs text-neutral-500">{workout.equipment}</p>
        <div className="mt-2 flex items-center gap-4 text-neutral-300">
          <span className="stat-icon">
            <IconClock /> {workout.duration} min
          </span>
          <span className="stat-icon">
            <IconFlame /> {workout.caloriesBurned} kcal
          </span>
          <span className="stat-icon text-accent">
            <IconStar /> {workout.rating}
          </span>
        </div>
      </div>
      <div className="flex w-full items-center gap-2 sm:w-auto">
        <Link
          href={`/workout/${workout.id}`}
          className="flex-1 rounded-full border border-line px-4 py-2 text-center text-xs font-semibold uppercase text-neutral-200 hover:border-accent hover:text-accent sm:flex-none"
        >
          View Details
        </Link>
        {showDone && (
          <button
            onClick={onDone}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-neutral-300 hover:border-accent hover:text-accent"
            title="Mark as done"
          >
            <IconCheck />
          </button>
        )}
        <button
          onClick={onRemove}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-neutral-300 hover:border-red-500 hover:text-red-400"
          title="Remove"
        >
          <IconX />
        </button>
      </div>
    </div>
  );
}
