"use client";

import { usePlan } from "@/context/PlanContext";
import { IconCheck, IconX } from "./Icons";

const TONE_STYLES = {
  success: "border-accent/40 text-white",
  error: "border-red-500/40 text-white",
  default: "border-line text-white",
};

export default function ToastContainer() {
  const { toasts } = usePlan();

  return (
    <div className="pointer-events-none fixed right-4 top-20 z-[100] flex w-[calc(100%-2rem)] max-w-xs flex-col items-end gap-2 sm:right-6 sm:top-24">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast-in pointer-events-auto flex w-full items-center gap-2 rounded-xl border bg-panel2/95 px-4 py-3 text-sm font-medium shadow-xl backdrop-blur ${
            TONE_STYLES[t.tone] || TONE_STYLES.default
          }`}
        >
          {t.tone === "error" ? (
            <IconX className="shrink-0 text-red-400" />
          ) : (
            <IconCheck className="shrink-0 text-accent" />
          )}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
