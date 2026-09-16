import { dbService } from "@/lib/db-service";
import {
  ScrollText,
  Clock,
  ShieldAlert,
  FolderGit2,
  Users,
  Server,
  CheckCircle2,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminAuditPage() {
  const logs = await dbService.getAuditLogs();

  const TYPE_ICONS = {
    security: ShieldAlert,
    project: FolderGit2,
    user: Users,
    system: Server,
  };

  const TYPE_BADGES = {
    security: "bg-[#e2a76f]/15 text-[#f3c99f] border-[#e2a76f]/30",
    project: "bg-rose-500/15 text-[#f3c1cf] border-rose-400/30",
    user: "bg-[#7eb898]/15 text-[#9ad4b4] border-[#7eb898]/30",
    system: "bg-[#b07d9b]/15 text-[#d9a8c6] border-[#b07d9b]/30",
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#f0afc3] mb-1">
          <ScrollText className="w-4 h-4" /> Compliance & Auditability
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          System Audit Trail
        </h1>
        <p className="text-xs text-rose-200/70 mt-1">
          Immutable chronological ledger tracking authentication events, role escalations, and moderation actions.
        </p>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-rose-900/30 shadow-xl space-y-6">
        <div className="space-y-4">
          {logs.map((log, idx) => {
            const Icon = TYPE_ICONS[log.type] || Server;
            const badgeStyle = TYPE_BADGES[log.type] || TYPE_BADGES.system;

            return (
              <div
                key={log._id}
                className="relative flex items-start gap-4 p-4 rounded-2xl bg-[#1c121d]/80 border border-rose-900/20 hover:border-rose-400/30 transition-all"
              >
                {/* Timeline Icon */}
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${badgeStyle}`}>
                  <Icon className="w-4 h-4" />
                </div>

                {/* Body */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white tracking-tight">
                        {log.action}
                      </span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase border ${badgeStyle}`}>
                        {log.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-mono text-rose-300/50">
                      <Clock className="w-3 h-3" />
                      <span>{formatDate(log.createdAt)}</span>
                    </div>
                  </div>

                  <p className="text-xs text-rose-200/80 leading-relaxed">
                    {log.details}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-rose-300/60 pt-1">
                    <span>
                      Actor: <strong className="text-rose-100">{log.actor}</strong>
                    </span>
                    {log.target && (
                      <span>
                        Target: <strong className="text-[#f3c1cf]">{log.target}</strong>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
