export default function ProjectDetailLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-pulse">
      <div className="h-5 w-36 bg-slate-800 rounded-lg" />

      {/* Hero skeleton */}
      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-6">
        <div className="flex gap-2">
          <div className="h-6 w-24 bg-slate-800 rounded-full" />
          <div className="h-6 w-28 bg-slate-800 rounded-full" />
        </div>
        <div className="h-10 w-2/3 bg-slate-800 rounded-2xl" />
        <div className="h-4 w-full bg-slate-800/60 rounded" />
        <div className="h-4 w-4/5 bg-slate-800/60 rounded" />

        <div className="grid grid-cols-4 gap-4 pt-6 border-t border-slate-800">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-16 bg-slate-800 rounded" />
              <div className="h-5 w-24 bg-slate-800 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel rounded-3xl p-8 border border-slate-800 h-48" />
          <div className="glass-panel rounded-3xl p-8 border border-slate-800 h-64" />
        </div>
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 h-40" />
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 h-32" />
        </div>
      </div>
    </div>
  );
}
