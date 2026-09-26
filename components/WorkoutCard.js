import Link from "next/link";
import Image from "next/image";
import { IconClock, IconFlame, IconStar } from "./Icons";
import { tagStyle } from "../lib/categoryStyles";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="card-surface group flex flex-col overflow-hidden transition hover:border-accent/60 hover:-translate-y-1"
    >
      <div className="relative h-44 w-full overflow-hidden bg-panel2">
        <Image
          src="/banner.png"
          alt={workout.name}
          fill
          className="object-cover opacity-90 transition duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-2">
          {workout.tags.map((tag) => (
            <span key={tag} className={`pill ${tagStyle(tag)}`}>
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-lg font-bold leading-tight text-white">
          {workout.name}
        </h3>
        <p className="text-xs text-muted">{workout.equipment}</p>

        <div className="mt-auto flex items-center gap-4 pt-2 text-xs text-muted">
          <span className="flex items-center gap-1">
            <IconClock className="text-accent" /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <IconFlame className="text-accent" /> {workout.calories} kcal
          </span>
          <span className="flex items-center gap-1">
            <IconStar className="text-accent" /> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
