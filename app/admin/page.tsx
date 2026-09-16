import { dbService } from "@/lib/db-service";
import Link from "next/link";
import {
  Users,
  FolderGit2,
  Star,
  Database,
  Activity,
  ShieldCheck,
  ArrowRight,
  UserCheck,
  Sparkles,
  ScrollText,
  Clock,
} from "lucide-react";
import { formatCompactNumber, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [stats, users, projects, auditLogs] = await Promise.all([
    dbService.getStats(),
    dbService.getUsers(),
    dbService.getProjects(),
    dbService.getAuditLogs(),
  ]);

  const recentUsers = users.slice(0, 4);
  const recentLogs = auditLogs.slice(0, 4);
  const featuredCount = projects.filter((p) => p.featured).length;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#e2a76f]/15 text-[#f3c99f] border border-[#e2a76f]/30 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#e2a76f]" /> Global System Authority
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            System Control Center
          </h1>
          <p className="text-xs sm:text-sm text-rose-200/70 mt-1">
            Real-time platform telemetry, user role delegation, and project moderation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/users"
            className="btn-bouncy px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#c06c84] to-[#d8829d] hover:from-[#d8829d] hover:to-[#c06c84] shadow-md shadow-rose-900/30 flex items-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Manage Users</span>
          </Link>
          <Link
            href="/admin/projects"
            className="btn-bouncy px-4 py-2 rounded-xl text-xs font-bold text-rose-100 bg-[#251825] hover:bg-[#342235] border border-rose-400/20 flex items-center gap-1.5"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-[#d8829d]" />
            <span>Moderate Projects</span>
          </Link>
        </div>
      </div>

      {/* Top 4 Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <div className="glass-card rounded-2xl p-5 border border-rose-900/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-rose-200/70 uppercase tracking-wider">
              Total Users
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#7eb898]/15 flex items-center justify-center text-[#9ad4b4]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            {stats.totalUsers}
          </div>
          <p className="text-[11px] text-[#9ad4b4] mt-1 flex items-center gap-1 font-medium">
            <UserCheck className="w-3 h-3" /> Registered Accounts
          </p>
        </div>

        {/* Total Projects */}
        <div className="glass-card rounded-2xl p-5 border border-rose-900/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-rose-200/70 uppercase tracking-wider">
              Repositories
            </span>
            <div className="w-8 h-8 rounded-xl bg-rose-500/15 flex items-center justify-center text-[#d8829d]">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            {stats.totalProjects}
          </div>
          <p className="text-[11px] text-rose-300/60 mt-1">
            {featuredCount} featured templates
          </p>
        </div>

        {/* Total Stars */}
        <div className="glass-card rounded-2xl p-5 border border-rose-900/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-rose-200/70 uppercase tracking-wider">
              Total Stars
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#e2a76f]/15 flex items-center justify-center text-[#e2a76f]">
              <Star className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            {formatCompactNumber(stats.totalStars)}
          </div>
          <p className="text-[11px] text-[#f3c99f] mt-1">
            {formatCompactNumber(stats.totalViews)} total impressions
          </p>
        </div>

        {/* Database Mode */}
        <div className="glass-card rounded-2xl p-5 border border-rose-900/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-rose-200/70 uppercase tracking-wider">
              Database Mode
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#c06c84]/15 flex items-center justify-center text-[#f0afc3]">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="text-base font-black text-white tracking-tight truncate">
            {stats.isMongoLive ? "MongoDB Atlas" : "Resilient Store"}
          </div>
          <p className="text-[11px] text-[#9ad4b4] mt-1 flex items-center gap-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7eb898] animate-pulse" />
            {stats.isMongoLive ? "Cluster Live" : "In-Memory Active"}
          </p>
        </div>
      </div>

      {/* Two Column Grid: Users Preview & Audit Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* User Directory Preview */}
        <div className="lg:col-span-6 glass-panel rounded-3xl p-6 border border-rose-900/30 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-rose-900/30">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#7eb898]" />
              <h2 className="text-sm font-bold text-white">Registered Developers</h2>
            </div>
            <Link
              href="/admin/users"
              className="text-xs font-bold text-[#d8829d] hover:text-[#f3c1cf] flex items-center gap-1 transition-colors"
            >
              <span>View All ({users.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {recentUsers.map((u) => {
              const isAdmin = u.role === "admin";
              return (
                <div
                  key={u._id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#1c121d]/80 border border-rose-900/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#c06c84] to-[#e2a76f] flex items-center justify-center text-xs font-bold text-white">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{u.name}</div>
                      <div className="text-[10px] text-rose-300/60 font-mono">{u.email}</div>
                    </div>
                  </div>

                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase border ${
                      isAdmin
                        ? "bg-[#e2a76f]/15 text-[#f3c99f] border-[#e2a76f]/30"
                        : "bg-[#7eb898]/15 text-[#9ad4b4] border-[#7eb898]/30"
                    }`}
                  >
                    {u.role}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Audit Log Preview */}
        <div className="lg:col-span-6 glass-panel rounded-3xl p-6 border border-rose-900/30 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-rose-900/30">
            <div className="flex items-center gap-2">
              <ScrollText className="w-4 h-4 text-[#f0afc3]" />
              <h2 className="text-sm font-bold text-white">Recent Audit Events</h2>
            </div>
            <Link
              href="/admin/audit"
              className="text-xs font-bold text-[#d8829d] hover:text-[#f3c1cf] flex items-center gap-1 transition-colors"
            >
              <span>Full Log ({auditLogs.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {recentLogs.map((log) => (
              <div
                key={log._id}
                className="p-3 rounded-2xl bg-[#1c121d]/80 border border-rose-900/20 space-y-1"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{log.action}</span>
                  <span className="text-[10px] font-mono text-rose-300/50 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(log.createdAt)}
                  </span>
                </div>
                <p className="text-[11px] text-rose-200/70 truncate">{log.details}</p>
                <div className="text-[10px] text-rose-300/40 font-mono">Actor: {log.actor}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
