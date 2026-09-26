import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-black">
      <div className="container-page flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog" width={24} height={24} />
          <span className="font-display text-base font-bold tracking-widest">
            FITLOG
          </span>
        </div>
        <p className="text-center text-xs text-neutral-500 sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
