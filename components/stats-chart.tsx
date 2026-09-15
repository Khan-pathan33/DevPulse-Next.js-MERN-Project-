import { Layers, Star, Eye, Database, CheckCircle2, Cpu } from "lucide-react";
import { formatCompactNumber } from "@/lib/utils";

interface StatsProps {
  stats: {
    totalProjects: number;
    totalStars: number;
    totalViews: number;
    stackCounts: Record<string, number>;
    isMongoLive: boolean;
  };
}

export function StatsChart({ stats }: StatsProps) {
  const stacks = [
    { name: "MERN", color: "bg-[#7eb898]", textColor: "text-[#9ad4b4]", count: stats.stackCounts["MERN"] || 0 },
    { name: "Next.js", color: "bg-[#d8829d]", textColor: "text-[#f0afc3]", count: stats.stackCounts["Next.js"] || 0 },
    { name: "AI", color: "bg-[#b07d9b]", textColor: "text-[#d9a8c6]", count: stats.stackCounts["AI"] || 0 },
    { name: "FullStack", color: "bg-[#e2a76f]", textColor: "text-[#f3c99f]", count: stats.stackCounts["FullStack"] || 0 },
  ];

  const total = stats.totalProjects || 1;

  return (
    <div className="space-y-6">
      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Projects */}
        <div className="glass-card rounded-2xl p-5 border border-rose-900/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-rose-200/70 uppercase tracking-wider">
              Total Projects
            </span>
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 flex items-center justify-center text-[#d8829d]">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            {stats.totalProjects}
          </div>
          <p className="text-[11px] text-[#9ad4b4] mt-1 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3" /> Fully Seeded & Ready
          </p>
        </div>

        {/* Total Stars */}
        <div className="glass-card rounded-2xl p-5 border border-rose-900/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-rose-200/70 uppercase tracking-wider">
              Community Stars
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#e2a76f]/10 flex items-center justify-center text-[#e2a76f]">
              <Star className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            {formatCompactNumber(stats.totalStars)}
          </div>
          <p className="text-[11px] text-rose-300/60 mt-1">
            Across all repositories
          </p>
        </div>

        {/* Total Views */}
        <div className="glass-card rounded-2xl p-5 border border-rose-900/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-rose-200/70 uppercase tracking-wider">
              Impressions
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#b07d9b]/15 flex items-center justify-center text-[#d9a8c6]">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            {formatCompactNumber(stats.totalViews)}
          </div>
          <p className="text-[11px] text-rose-300/60 mt-1">
            Global catalog views
          </p>
        </div>

        {/* Database Status */}
        <div className="glass-card rounded-2xl p-5 border border-rose-900/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-rose-200/70 uppercase tracking-wider">
              Data Engine
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#7eb898]/15 flex items-center justify-center text-[#9ad4b4]">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg font-black text-white tracking-tight">
            {stats.isMongoLive ? "MongoDB Live" : "Resilient Store"}
          </div>
          <p className="text-[11px] text-rose-300/60 mt-1">
            {stats.isMongoLive ? "Cluster Connected" : "In-Memory Dual Mode"}
          </p>
        </div>
      </div>

      {/* Stack Distribution Visualization */}
      <div className="glass-panel rounded-2xl p-6 border border-rose-900/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">Tech Stack Distribution</h3>
            <p className="text-xs text-rose-200/60">Breakdown of ecosystems hosted on DevPulse</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#d8829d] font-mono">
            <Cpu className="w-3.5 h-3.5" /> Next.js App Router
          </div>
        </div>

        {/* Segmented Bar */}
        <div className="h-3 w-full rounded-full bg-[#201420] overflow-hidden flex mb-4">
          {stacks.map((s) => {
            const pct = (s.count / total) * 100;
            if (pct === 0) return null;
            return (
              <div
                key={s.name}
                style={{ width: `${pct}%` }}
                className={`${s.color} transition-all duration-500`}
                title={`${s.name}: ${s.count} (${pct.toFixed(0)}%)`}
              />
            );
          })}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stacks.map((s) => {
            const pct = ((s.count / total) * 100).toFixed(0);
            return (
              <div key={s.name} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#1d121c]/80 border border-rose-900/20">
                <span className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-rose-100">{s.name}</span>
                  <span className="text-[11px] text-rose-300/50">{s.count} projects ({pct}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
