"use client";

import Image from "next/image";
import { usePlan } from "../context/PlanContext";
import { tagStyle } from "../lib/categoryStyles";
import { IconPlus, IconBookmark } from "./Icons";

export default function DetailContent({ workout }) {
  const { addToPlan, addToSaved, isPlanFull } = usePlan();

  const specs = [
    ["EQUIPMENT", workout.equipment],
    ["DIFFICULTY", workout.difficulty],
    ["SETS", workout.sets],
    ["REPS", workout.reps],
    ["DURATION", `${workout.duration} min`],
    ["CALORIES", `${workout.calories} kcal`],
    ["RATING", workout.rating],
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-line bg-panel sm:h-96 lg:h-full lg:min-h-[520px]">
          <Image src="/banner.png" alt={workout.name} fill className="object-contain p-6" />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-2">
            {workout.tags.map((tag) => (
              <span key={tag} className={`pill ${tagStyle(tag)}`}>
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
            {workout.name}
          </h1>
          <p className="text-sm leading-relaxed text-muted sm:text-base">
            {workout.description}
          </p>

          <div className="card-surface divide-y divide-line overflow-hidden">
            {specs.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between px-5 py-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {label}
                </span>
                <span className="text-sm font-semibold text-white">{value}</span>
              </div>
            ))}
          </div>

          <div>
            <h2 className="mb-3 font-display text-lg font-bold uppercase text-white">
              Instructions
            </h2>
            <ol className="flex flex-col gap-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-white/90">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-ink">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => addToPlan(workout)}
              disabled={isPlanFull}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              <IconPlus /> Add to today&rsquo;s plan
            </button>
            <button onClick={() => addToSaved(workout)} className="btn-secondary">
              <IconBookmark /> Save for later
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
