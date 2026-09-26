import { NextResponse } from "next/server";
import { getAllWorkouts } from "../../../lib/workouts";

export async function GET() {
  // Simulated small delay so the loading state is visible, like a real API call.
  await new Promise((resolve) => setTimeout(resolve, 500));
  return NextResponse.json(getAllWorkouts());
}
