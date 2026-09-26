"use client";

import { usePlan } from "../context/PlanContext";

export default function ToastContainer() {
  const { toasts } = usePlan();

  return (
    <div className="pointer-events-none fixed right-4 top-20 z-50 flex w-[calc(100%-2rem)] max-w-xs flex-col items-end gap-2 sm:right-6 sm:top-24">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="fade-in pointer-events-auto w-full rounded-xl border border-line bg-panel2 px-4 py-3 text-sm font-medium text-white shadow-xl"
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
