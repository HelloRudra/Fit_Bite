"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "../context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const linkClass = (href) =>
    `text-sm font-semibold uppercase tracking-wide transition ${
      pathname === href ? "text-accent" : "text-white/80 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={28} height={28} />
          <span className="font-display text-xl font-bold tracking-wide text-white">
            FIT<span className="text-accent">LOG</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/#library" className={linkClass("/")}>
            Workout
          </Link>
          <Link href="/my-plan" className={linkClass("/my-plan")}>
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/my-plan" className="pill bg-accent text-ink">
            Plan&nbsp;{plan.length}
          </Link>
          <Link href="/my-plan" className="pill border border-line text-white">
            Saved&nbsp;{saved.length}
          </Link>
        </div>
      </div>
    </header>
  );
}
