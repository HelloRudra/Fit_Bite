import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink">
      <div className="container-page flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={20} height={20} />
          <span className="font-display text-sm font-bold tracking-wide text-white">
            FITLOG
          </span>
        </div>
        <p className="text-xs text-muted">
          © 2026 FitLog By Rudra — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
