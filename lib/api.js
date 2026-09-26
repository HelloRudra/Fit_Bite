const BASE_URL = "https://api.api-store.workers.dev/api/fitlog";

export async function getWorkouts() {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch workouts");
  return res.json();
}

export async function getWorkout(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch workout");
  return res.json();
}
