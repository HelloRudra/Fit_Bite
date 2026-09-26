import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-32 text-center sm:px-6 lg:px-8">
      <span className="font-display text-7xl font-bold text-accent">404</span>
      <h1 className="font-display text-2xl font-bold uppercase text-white sm:text-3xl">
        This set doesn&rsquo;t exist
      </h1>
      <p className="max-w-sm text-sm text-muted">
        The page you&rsquo;re looking for got racked somewhere else. Head back
        to the library and pick a lift.
      </p>
      <Link href="/" className="btn-primary">
        Back to workouts
      </Link>
    </section>
  );
}
