export default function GlobalLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 animate-pulse">
      {/* Hero skeleton */}
      <div className="space-y-4 max-w-2xl">
        <div className="h-6 w-32 rounded-full bg-slate-800" />
        <div className="h-12 w-full rounded-2xl bg-slate-800" />
        <div className="h-4 w-3/4 rounded-lg bg-slate-800/60" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="glass-panel rounded-2xl p-6 h-64 flex flex-col justify-between border border-slate-800/80">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="h-5 w-20 rounded-full bg-slate-800" />
                <div className="h-5 w-12 rounded-lg bg-slate-800" />
              </div>
              <div className="h-6 w-4/5 rounded-lg bg-slate-800" />
              <div className="h-4 w-full rounded bg-slate-800/50" />
              <div className="h-4 w-2/3 rounded bg-slate-800/50" />
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-slate-800/50">
              <div className="h-6 w-24 rounded-full bg-slate-800/60" />
              <div className="h-6 w-16 rounded-lg bg-slate-800/60" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
