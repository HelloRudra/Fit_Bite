import workouts from "../data/workouts.json";

export function getAllWorkouts() {
  return workouts;
}

export function getWorkoutById(id) {
  return workouts.find((w) => w.id === id) || null;
}
