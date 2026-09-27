import Image from "next/image";
import { IconArrowRight } from "./Icons";

export default function Hero() {
  return (
    <section className="container-page pt-8 sm:pt-10">
      <div className="card-surface relative overflow-hidden">
        <div className="grid grid-cols-1 items-center gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-2 lg:px-16 lg:py-20">
          <div className="flex flex-col items-start gap-5">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">
              Workout Library
            </span>
            <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              Train with intent.
              <br />
              Log every set.
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock
              it into today&rsquo;s plan, and watch the week&rsquo;s work add
              up.
            </p>
            <a href="#library" className="btn-primary mt-2">
              Browse Workouts <IconArrowRight />
            </a>
          </div>

          <div className="relative mx-auto h-64 w-64 sm:h-80 sm:w-80 lg:ml-auto lg:h-96 lg:w-96">
            <Image
              src="/banner.png"
              alt="Muscle anatomy illustration on a gym machine"
              fill
              priority
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
