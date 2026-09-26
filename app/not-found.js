import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black px-4 text-center">
      <p className="font-display text-7xl font-bold text-accent">404</p>
      <h1 className="font-display text-2xl font-bold uppercase tracking-wide">
        Lift Not Found
      </h1>
      <p className="max-w-sm text-neutral-500">
        This page doesn&apos;t exist, or the workout you&apos;re looking for
        isn&apos;t in the library.
      </p>
      <Link href="/" className="btn-primary mt-4">
        Back to Library
      </Link>
    </main>
  );
}
