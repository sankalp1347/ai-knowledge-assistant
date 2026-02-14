export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
      <div className="h-6 bg-muted rounded-lg skeleton w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded skeleton"></div>
        <div className="h-4 bg-muted rounded skeleton w-5/6"></div>
      </div>
      <div className="h-10 bg-muted rounded-xl skeleton w-32"></div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
