export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-muted">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-accent" />
      <p className="text-sm">Loading FitLog…</p>
    </div>
  );
}
