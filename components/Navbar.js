"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const isWorkouts = pathname === "/";
  const isMyPlan = pathname === "/my-plan";

  return (
    <header className="border-b border-white/5 bg-ink">
      <div className="container-page flex flex-wrap items-center justify-between gap-3 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={24} height={24} />
          <span className="font-display text-lg font-bold tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        <nav className="order-3 flex w-full items-center justify-center gap-1 sm:order-none sm:w-auto">
          <Link
            href="/"
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              isWorkouts ? "bg-accent/15 text-accent" : "text-muted hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              isMyPlan ? "bg-accent/15 text-accent" : "text-muted hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-3 text-sm sm:gap-4">
          <Link href="/my-plan" className="flex items-center gap-2">
            <span className="hidden text-white sm:inline">Plan</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-black">
              {plan.length}
            </span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-2">
            <span className="hidden text-muted sm:inline">Saved</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-line text-xs font-bold text-muted">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
