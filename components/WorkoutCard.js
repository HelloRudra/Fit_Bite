import Image from "next/image";
import Link from "next/link";
import { IconClock, IconFlame, IconStar } from "./icons";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="card-surface group flex flex-col transition hover:border-accent/60 hover:-translate-y-1"
    >
      <div className="relative h-44 w-full bg-surface2">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups?.map((tag) => (
            <span
              key={tag}
              className="pill border border-line text-[10px] text-neutral-300"
            >
              {tag.toUpperCase()}
            </span>
          ))}
        </div>
        <h3 className="font-display text-lg font-bold uppercase leading-tight">
          {workout.name}
        </h3>
        <p className="text-xs text-neutral-500">{workout.equipment}</p>
        <div className="mt-auto flex items-center gap-4 pt-2 text-neutral-300">
          <span className="stat-icon">
            <IconClock /> {workout.duration} min
          </span>
          <span className="stat-icon">
            <IconFlame /> {workout.caloriesBurned} kcal
          </span>
          <span className="stat-icon text-accent">
            <IconStar /> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
