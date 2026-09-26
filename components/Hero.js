import Image from "next/image";
import { IconArrowRight } from "./icons";

export default function Hero() {
  return (
    <section className="container-page grid grid-cols-1 items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
      <div>
        <p className="mb-4 text-xs font-bold tracking-[0.3em] text-accent">
          WORKOUT LIBRARY
        </p>
        <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          Train with intent.
          <br />
          Log every set.
        </h1>
        <p className="mt-6 max-w-md text-neutral-400">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
          into today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <a href="#library" className="btn-primary mt-8">
          Browse Workouts
          <IconArrowRight />
        </a>
      </div>
      <div className="relative mx-auto aspect-square w-full max-w-md">
        <div className="absolute inset-0 rounded-full bg-accent/10 blur-3xl" />
        <Image
          src="/banner.png"
          alt="Workout illustration"
          fill
          className="relative object-contain drop-shadow-2xl"
          priority
        />
      </div>
    </section>
  );
}
