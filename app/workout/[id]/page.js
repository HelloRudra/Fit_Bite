"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getWorkout } from "@/lib/api";
import { usePlan } from "@/context/PlanContext";
import { IconPlus, IconBookmark } from "@/components/icons";

const SPEC_ROWS = [
  { label: "EQUIPMENT", key: "equipment" },
  { label: "DIFFICULTY", key: "difficulty" },
  { label: "SETS", key: "sets" },
  { label: "REPS", key: "reps" },
  { label: "DURATION", key: "duration", suffix: " min" },
  { label: "CALORIES", key: "caloriesBurned", suffix: " kcal" },
  { label: "RATING", key: "rating" },
];

export default function WorkoutDetailPage() {
  const params = useParams();
  const { addToPlan, addToSaved, addToast, plan, planCap } = usePlan();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    let mounted = true;
    getWorkout(params.id)
      .then((data) => {
        if (!mounted) return;
        if (!data || data.error) {
          setNotFoundState(true);
        } else {
          setWorkout(data);
        }
      })
      .catch(() => mounted && setNotFoundState(true))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [params.id]);

  const planFull = plan.length >= planCap;

  function handleAddToPlan() {
    const result = addToPlan(workout);
    if (result.ok) {
      addToast("Added to today's plan");
    } else if (result.reason === "cap") {
      addToast(`Plan is full (max ${planCap} lifts)`, "error");
    } else {
      addToast("Already in today's plan", "error");
    }
  }

  function handleSave() {
    const result = addToSaved(workout);
    if (result.ok) {
      addToast("Saved for later");
    } else {
      addToast("Already saved", "error");
    }
  }

  if (notFoundState) {
    return notFound();
  }

  return (
    <>
      <Navbar />
      <main className="container-page py-12">
        {loading || !workout ? (
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-neutral-400">
            <div className="h-10 w-10 animate-spin-slow rounded-full border-2 border-line border-t-accent" />
            <p>Loading workout…</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line bg-surface2 lg:sticky lg:top-24 lg:h-[520px]">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                {workout.muscleGroups?.map((tag) => (
                  <span
                    key={tag}
                    className="pill border border-line text-[10px] text-neutral-300"
                  >
                    {tag.toUpperCase()}
                  </span>
                ))}
              </div>
              <h1 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
                {workout.name}
              </h1>
              <p className="mt-4 text-neutral-400">{workout.description}</p>

              <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-surface">
                {SPEC_ROWS.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between px-5 py-3 text-sm"
                  >
                    <span className="font-semibold tracking-wide text-neutral-500">
                      {row.label}
                    </span>
                    <span className="font-medium text-neutral-100">
                      {workout[row.key]}
                      {row.suffix || ""}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h2 className="font-display text-xl font-bold uppercase tracking-wide">
                  Instructions
                </h2>
                <ol className="mt-4 space-y-3">
                  {workout.instructions?.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-neutral-300">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-black">
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={handleAddToPlan}
                  disabled={planFull}
                  className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <IconPlus /> Add to today&apos;s plan
                </button>
                <button onClick={handleSave} className="btn-secondary">
                  <IconBookmark /> Save for later
                </button>
              </div>
              {planFull && (
                <p className="mt-3 text-xs text-red-400">
                  Today&apos;s plan is full — remove a lift on the My Plan page to add another.
                </p>
              )}
              <Link
                href="/"
                className="mt-6 inline-block text-sm text-neutral-500 hover:text-accent"
              >
                ← Back to library
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
