"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const PlanContext = createContext(null);

const PLAN_KEY = "fitlog_plan_v1";
const SAVED_KEY = "fitlog_saved_v1";
export const PLAN_CAP = 5;

function readStorage(key) {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted state once on mount.
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

  const pushToast = useCallback((message, tone = "default") => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((t) => [...t, { id, message, tone }]);
    setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id));
    }, 2800);
  }, []);

  const isPlanFull = plan.length >= PLAN_CAP;

  // Every action below decides its outcome from the CURRENT state first,
  // then performs exactly one setState + one pushToast call. Side effects
  // are intentionally kept out of setState updater functions — React 18
  // Strict Mode invokes updater callbacks twice in development, and a
  // pushToast call living inside an updater would fire twice per click.
  const addToPlan = useCallback(
    (workout) => {
      if (plan.some((w) => w.id === workout.id)) {
        pushToast("Already in today's plan", "error");
        return;
      }
      if (plan.length >= PLAN_CAP) {
        pushToast(`Plan is full — max ${PLAN_CAP} lifts`, "error");
        return;
      }
      setPlan([...plan, { ...workout, done: false }]);
      pushToast("Added to today's plan", "success");
    },
    [plan, pushToast]
  );

  const addToSaved = useCallback(
    (workout) => {
      if (saved.some((w) => w.id === workout.id)) {
        pushToast("Already saved", "error");
        return;
      }
      setSaved([...saved, workout]);
      pushToast("Saved for later", "success");
    },
    [saved, pushToast]
  );

  const removeFromPlan = useCallback(
    (id) => {
      setPlan(plan.filter((w) => w.id !== id));
      pushToast("Removed from today's plan", "default");
    },
    [plan, pushToast]
  );

  const removeFromSaved = useCallback(
    (id) => {
      setSaved(saved.filter((w) => w.id !== id));
      pushToast("Removed from saved", "default");
    },
    [saved, pushToast]
  );

  const markDone = useCallback(
    (id) => {
      const target = plan.find((w) => w.id === id);
      setPlan(plan.map((w) => (w.id === id ? { ...w, done: !w.done } : w)));
      pushToast(target && !target.done ? "Marked as done" : "Marked as not done", "success");
    },
    [plan, pushToast]
  );

  const value = useMemo(
    () => ({
      plan,
      saved,
      toasts,
      hydrated,
      isPlanFull,
      planCap: PLAN_CAP,
      addToPlan,
      addToSaved,
      removeFromPlan,
      removeFromSaved,
      markDone,
      pushToast,
    }),
    [plan, saved, toasts, hydrated, isPlanFull, addToPlan, addToSaved, removeFromPlan, removeFromSaved, markDone, pushToast]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
