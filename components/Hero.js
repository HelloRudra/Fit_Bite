import Image from "next/image";
import { IconArrowRight } from "./Icons";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
      <div className="flex flex-col items-start gap-6">
        <span className="pill border border-accent/40 bg-accent/10 text-accent">
          WORKOUT LIBRARY
        </span>
        <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] text-white sm:text-5xl lg:text-6xl">
          Train with intent.
          <br />
          Log every set.
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
          into today&rsquo;s plan, and watch the week&rsquo;s work add up.
        </p>
        <a href="#library" className="btn-primary">
          Browse workouts <IconArrowRight />
        </a>
      </div>

      <div className="relative mx-auto h-72 w-72 sm:h-96 sm:w-96 lg:ml-auto lg:h-[420px] lg:w-[420px]">
        <div className="absolute inset-0 rounded-full bg-accent/10 blur-3xl" />
        <Image
          src="/banner.png"
          alt="Muscle anatomy illustration on a gym machine"
          fill
          priority
          className="relative object-contain drop-shadow-2xl"
        />
      </div>
    </section>
  );
}
