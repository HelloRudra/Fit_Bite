"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const PlanContext = createContext(null);

const PLAN_KEY = "fitlog_plan_v1";
const SAVED_KEY = "fitlog_saved_v1";
const PLAN_CAP = 5;

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedPlan = JSON.parse(localStorage.getItem(PLAN_KEY) || "[]");
      const storedSaved = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
      setPlan(Array.isArray(storedPlan) ? storedPlan : []);
      setSaved(Array.isArray(storedSaved) ? storedSaved : []);
    } catch (e) {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  // Persist plan
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
    } catch (e) {}
  }, [plan, hydrated]);

  // Persist saved
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
    } catch (e) {}
  }, [saved, hydrated]);

  function addToast(message, type = "success") {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 2600);
  }

  function addToPlan(workout) {
    let result = { ok: false, reason: "" };
    setPlan((prev) => {
      if (prev.some((w) => w.id === workout.id)) {
        result = { ok: false, reason: "duplicate" };
        return prev;
      }
      if (prev.length >= PLAN_CAP) {
        result = { ok: false, reason: "cap" };
        return prev;
      }
      result = { ok: true };
      return [...prev, { ...workout, done: false }];
    });
    return result;
  }

  function addToSaved(workout) {
    let result = { ok: false, reason: "" };
    setSaved((prev) => {
      if (prev.some((w) => w.id === workout.id)) {
        result = { ok: false, reason: "duplicate" };
        return prev;
      }
      result = { ok: true };
      return [...prev, workout];
    });
    return result;
  }

  function removeFromPlan(id) {
    setPlan((prev) => prev.filter((w) => w.id !== id));
  }

  function removeFromSaved(id) {
    setSaved((prev) => prev.filter((w) => w.id !== id));
  }

  function toggleDone(id) {
    setPlan((prev) =>
      prev.map((w) => (w.id === id ? { ...w, done: !w.done } : w))
    );
  }

  const value = useMemo(
    () => ({
      plan,
      saved,
      hydrated,
      planCap: PLAN_CAP,
      addToPlan,
      addToSaved,
      removeFromPlan,
      removeFromSaved,
      toggleDone,
      toasts,
      addToast,
    }),
    [plan, saved, hydrated, toasts]
  );

  return (
    <PlanContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} />
    </PlanContext.Provider>
  );
}

function ToastViewport({ toasts }) {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 items-end pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast-anim pointer-events-auto rounded-lg border px-4 py-3 text-sm font-medium shadow-lg backdrop-blur ${
            t.type === "error"
              ? "border-red-500/40 bg-red-950/80 text-red-200"
              : "border-accent/40 bg-neutral-900/90 text-accent"
          }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
