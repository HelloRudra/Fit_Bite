"use client";

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

const PlanContext = createContext(null);

const PLAN_KEY = "fitlog_plan_v1";
const SAVED_KEY = "fitlog_saved_v1";
const PLAN_CAP = 5;

function readStorage(key) {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPlan(readStorage(PLAN_KEY));
    setSaved(readStorage(SAVED_KEY));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  const pushToast = useCallback((message) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id));
    }, 2800);
  }, []);

  const isPlanFull = plan.length >= PLAN_CAP;

  // NOTE: side effects (pushToast) are intentionally kept OUT of the setState
  // updater callbacks below. React 18 Strict Mode invokes updater functions
  // twice in development to surface impure updaters, which was previously
  // causing every toast to render twice. The outcome is now decided first
  // from the current state, then applied with a single setState + a single
  // pushToast call.
  const addToPlan = useCallback(
    (workout) => {
      if (plan.some((w) => w.id === workout.id)) {
        pushToast("Already in today's plan");
        return;
      }
      if (plan.length >= PLAN_CAP) {
        pushToast("Today's plan is full (5 lifts max)");
        return;
      }
      setPlan([...plan, { ...workout, done: false }]);
      pushToast("Added to today's plan");
    },
    [plan, pushToast]
  );

  const addToSaved = useCallback(
    (workout) => {
      if (saved.some((w) => w.id === workout.id)) {
        pushToast("Already saved");
        return;
      }
      setSaved([...saved, workout]);
      pushToast("Saved for later");
    },
    [saved, pushToast]
  );

  const removeFromPlan = useCallback(
    (id) => {
      setPlan(plan.filter((w) => w.id !== id));
      pushToast("Removed from plan");
    },
    [plan, pushToast]
  );

  const removeFromSaved = useCallback(
    (id) => {
      setSaved(saved.filter((w) => w.id !== id));
      pushToast("Removed from saved");
    },
    [saved, pushToast]
  );

  const markDone = useCallback(
    (id) => {
      const target = plan.find((w) => w.id === id);
      setPlan(plan.map((w) => (w.id === id ? { ...w, done: !w.done } : w)));
      pushToast(target && !target.done ? "Marked as done" : "Marked as not done");
    },
    [plan, pushToast]
  );

  const value = useMemo(
    () => ({
      plan,
      saved,
      toasts,
      isPlanFull,
      addToPlan,
      addToSaved,
      removeFromPlan,
      removeFromSaved,
      markDone,
      pushToast,
    }),
    [plan, saved, toasts, isPlanFull, addToPlan, addToSaved, removeFromPlan, removeFromSaved, markDone, pushToast]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
