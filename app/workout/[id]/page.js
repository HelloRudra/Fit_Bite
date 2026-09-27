"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getWorkout } from "@/lib/api";
import DetailContent from "@/components/DetailContent";
import NotFoundBlock from "@/components/NotFoundBlock";

export default function WorkoutDetailPage() {
  const params = useParams();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setMissing(false);
    getWorkout(params.id)
      .then((data) => {
        if (!active) return;
        if (data) {
          setWorkout(data);
        } else {
          setMissing(true);
        }
      })
      .catch(() => active && setMissing(true))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-muted">
        <div className="h-10 w-10 spin-slow rounded-full border-2 border-line border-t-accent" />
        <p className="text-sm">Loading workout…</p>
      </div>
    );
  }

  if (missing || !workout) {
    return <NotFoundBlock />;
  }

  return <DetailContent workout={workout} />;
}
