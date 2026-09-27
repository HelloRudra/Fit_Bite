import Link from "next/link";
import Image from "next/image";
import { IconClock, IconFlame, IconStar } from "./Icons";
import { tagStyle } from "@/lib/categoryStyles";

export default function WorkoutCard({ workout }) {
  return (
    
      <div className="relative h-44 w-full overflow-hidden bg-panel2">
        {workout.image ? (
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted">
            No image
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups?.map((tag) => (
            <span key={tag} className={`pill ${tagStyle(tag)}`}>
              {tag.toUpperCase()}
            </span>
          ))}
        </div>

        <h3 className="font-display text-lg font-bold leading-tight text-white">
          {workout.name}
        </h3>
        <p className="text-xs text-muted">{workout.equipment}</p>

        <div className="mt-auto flex items-center gap-4 pt-2 text-xs text-muted">
          <span className="flex items-center gap-1">
            <IconClock /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <IconFlame className="text-accent" /> {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <IconStar className="text-accent" /> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
