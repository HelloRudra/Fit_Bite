"use client";

import { useEffect, useRef, useState } from "react";
import { IconChevronDown } from "./Icons";

const OPTIONS = [
  { value: "duration", label: "Duration" },
  { value: "caloriesBurned", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export default function SortDropdown({ value, onChange, showLabel = true }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current = OPTIONS.find((o) => o.value === value) || OPTIONS[0];

  return (
    <div className="flex items-center gap-2" ref={ref}>
      {showLabel && <span className="text-sm text-muted">Sort By</span>}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 rounded-full border border-line bg-panel2 px-4 py-2 text-sm font-semibold text-white"
        >
          {current.label}
          <IconChevronDown className={open ? "rotate-180 transition" : "transition"} />
        </button>
        {open && (
          <div className="absolute right-0 z-20 mt-2 w-36 overflow-hidden rounded-xl border border-line bg-panel2 shadow-xl">
            {OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`block w-full px-4 py-2.5 text-left text-sm hover:bg-white/5 ${
                  opt.value === value ? "text-accent" : "text-white"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
