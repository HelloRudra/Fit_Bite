import { notFound } from "next/navigation";
import { getAllWorkouts, getWorkoutById } from "../../../lib/workouts";
import DetailContent from "../../../components/DetailContent";

export function generateStaticParams() {
  return getAllWorkouts().map((w) => ({ id: w.id }));
}

export function generateMetadata({ params }) {
  const workout = getWorkoutById(params.id);
  if (!workout) return { title: "Workout not found — FitLog" };
  return {
    title: `${workout.name} — FitLog`,
    description: workout.description,
  };
}

export default function WorkoutDetailPage({ params }) {
  const workout = getWorkoutById(params.id);
  if (!workout) notFound();
  return <DetailContent workout={workout} />;
}
