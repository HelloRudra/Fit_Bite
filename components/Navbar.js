"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const linkClass = (href) =>
    `text-sm font-semibold uppercase tracking-wide transition ${
      pathname === href ? "text-accent" : "text-neutral-300 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-black/80 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.png" alt="FitLog" width={28} height={28} />
          <span className="font-display text-lg font-bold tracking-widest">
            FITLOG
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#library" className={linkClass("/#library")}>
            Workout
          </Link>
          <Link href="/my-plan" className={linkClass("/my-plan")}>
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="pill bg-accent text-black"
            title="Today's Plan"
          >
            Plan {plan.length}
          </Link>
          <Link
            href="/my-plan"
            className="pill border border-neutral-500 text-neutral-200"
            title="Saved"
          >
            Saved {saved.length}
          </Link>
        </div>
      </div>
    </header>
  );
}
