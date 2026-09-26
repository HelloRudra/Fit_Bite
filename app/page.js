"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import WorkoutCard from "@/components/WorkoutCard";
import SortDropdown from "@/components/SortDropdown";
import { getWorkouts } from "@/lib/api";

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState("duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    getWorkouts()
      .then((data) => {
        if (mounted) setWorkouts(data);
      })
      .catch(() => mounted && setError(true))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const visible = useMemo(() => {
    let list = [...workouts];
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.muscleGroups?.some((m) => m.toLowerCase().includes(q))
      );
    }
    list.sort((a, b) => (b[sortBy] ?? 0) - (a[sortBy] ?? 0));
    return list;
  }, [workouts, sortBy, query]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <section id="library" className="container-page scroll-mt-20 py-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
                The Library
              </h2>
              <p className="mt-2 text-neutral-400">
                Twelve lifts covering every major muscle group.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or tag…"
                className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-neutral-200 placeholder:text-neutral-500 focus:border-accent focus:outline-none"
              />
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>
          </div>

          <div className="mt-10">
            {loading && (
              <div className="flex flex-col items-center justify-center gap-4 py-24 text-neutral-400">
                <div className="h-10 w-10 animate-spin-slow rounded-full border-2 border-line border-t-accent" />
                <p>Loading workouts…</p>
              </div>
            )}

            {!loading && error && (
              <p className="py-24 text-center text-red-400">
                Couldn&apos;t load workouts. Please try again later.
              </p>
            )}

            {!loading && !error && visible.length === 0 && (
              <p className="py-24 text-center text-neutral-400">
                No workouts match your search.
              </p>
            )}

            {!loading && !error && visible.length > 0 && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((w) => (
                  <WorkoutCard key={w.id} workout={w} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
