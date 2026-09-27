"use client";

import { useEffect, useMemo, useState } from "react";
import WorkoutCard from "./WorkoutCard";
import SortDropdown from "./SortDropdown";
import { IconSearch } from "./Icons";
import { getWorkouts } from "@/lib/api";

export default function LibrarySection() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState("duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    getWorkouts()
      .then((data) => {
        if (active) setWorkouts(Array.isArray(data) ? data : []);
      })
      .catch(() => active && setError(true))
      .finally(() => active && setLoading(false));
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
          w.name?.toLowerCase().includes(q) ||
          w.muscleGroups?.some((t) => t.toLowerCase().includes(q))
      );
    }
    list.sort((a, b) => (b[sortBy] ?? 0) - (a[sortBy] ?? 0));
    return list;
  }, [workouts, sortBy, query]);

  return (
    <section id="library" className="container-page scroll-mt-6 py-14 sm:py-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
            The Library
          </h2>
          <p className="mt-2 text-sm text-muted">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 rounded-full border border-line bg-panel2 px-4 py-2">
            <IconSearch className="text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or tag"
              className="w-40 bg-transparent text-sm text-white placeholder:text-muted focus:outline-none sm:w-56"
            />
          </div>
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center gap-4 py-24 text-muted">
          <div className="h-10 w-10 spin-slow rounded-full border-2 border-line border-t-accent" />
          <p className="text-sm">Loading workouts…</p>
        </div>
      ) : error ? (
        <p className="py-16 text-center text-sm text-red-400">
          Couldn&rsquo;t load workouts. Please try again later.
        </p>
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
