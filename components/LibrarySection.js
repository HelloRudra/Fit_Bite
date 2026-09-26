"use client";

import { useEffect, useMemo, useState } from "react";
import WorkoutCard from "./WorkoutCard";
import { IconChevronDown, IconSearch } from "./Icons";

const SORT_OPTIONS = [
  { value: "duration", label: "Duration" },
  { value: "calories", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export default function LibrarySection() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("duration");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/workouts")
      .then((res) => res.json())
      .then((data) => {
        if (active) {
          setWorkouts(data);
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const visible = useMemo(() => {
    let list = [...workouts];
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    list.sort((a, b) => b[sortBy] - a[sortBy]);
    return list;
  }, [workouts, sortBy, query]);

  return (
    <section id="library" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
            The Library
          </h2>
          <p className="mt-2 text-sm text-muted">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2.5">
            <IconSearch className="text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search workouts or tags"
              className="w-40 bg-transparent text-sm text-white placeholder:text-muted focus:outline-none sm:w-56"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2.5 text-sm font-semibold text-white"
            >
              Sort By: <span className="text-accent">{SORT_OPTIONS.find((o) => o.value === sortBy)?.label}</span>
              <IconChevronDown />
            </button>
            {open && (
              <div className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-xl border border-line bg-panel2 shadow-xl">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSortBy(opt.value);
                      setOpen(false);
                    }}
                    className={`block w-full px-4 py-2.5 text-left text-sm hover:bg-white/5 ${
                      sortBy === opt.value ? "text-accent" : "text-white"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center gap-4 py-24 text-muted">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-accent" />
          <p className="text-sm">Loading workouts…</p>
        </div>
      ) : visible.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted">
          No workouts match your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      )}
    </section>
  );
}
