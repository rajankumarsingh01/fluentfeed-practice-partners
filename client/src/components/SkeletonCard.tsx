export const SkeletonMatchCard = () => (
  <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
    <div className="flex items-center gap-3 mb-4">
      <div className="skeleton w-11 h-11 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-3.5 rounded-full w-2/3" />
        <div className="skeleton h-2.5 rounded-full w-1/2" />
      </div>
    </div>
    <div className="flex gap-2 mb-4">
      <div className="skeleton h-5 w-16 rounded-full" />
      <div className="skeleton h-5 w-16 rounded-full" />
      <div className="skeleton h-5 w-16 rounded-full" />
    </div>
    <div className="skeleton h-9 rounded-xl w-full" />
  </div>
);

export const SkeletonGrid = ({ count = 3 }: { count?: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonMatchCard key={i} />
    ))}
  </div>
);