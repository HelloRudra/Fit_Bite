"use client";

import { useState, useRef, useEffect } from "react";
import { IconChevronDown } from "./icons";

const OPTIONS = [
  { value: "duration", label: "Duration" },
  { value: "caloriesBurned", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export default function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = OPTIONS.find((o) => o.value === value) || OPTIONS[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-neutral-200 hover:border-accent/60"
      >
        Sort By: <span className="text-accent">{current.label}</span>
        <IconChevronDown className={open ? "rotate-180 transition" : "transition"} />
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-xl border border-line bg-surface shadow-xl">
          {OPTIONS.map((o) => (
            <button
              key={o.value}
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2 text-left text-sm hover:bg-surface2 ${
                o.value === value ? "text-accent" : "text-neutral-200"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
