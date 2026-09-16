import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import {
  ShieldCheck,
  Users,
  FolderGit2,
  ScrollText,
  Activity,
  Layers,
  LayoutDashboard,
  ExternalLink,
  Lock,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Control Center - DevPulse",
  description: "Administrative console for managing user roles, project moderation, and system telemetry.",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // Ironclad server-side access enforcement
  if (!user || user.role !== "admin") {
    redirect("/login?redirect=/admin&error=admin_required");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Admin Sidebar */}
        <aside className="lg:col-span-3 glass-panel rounded-3xl p-6 border border-[#e2a76f]/30 space-y-6 shadow-2xl">
          
          {/* Admin Identity Card */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#221524]/90 border border-[#e2a76f]/40">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#e2a76f] via-[#d8829d] to-[#c06c84] text-white font-black flex items-center justify-center text-sm shadow-md shadow-rose-950/40">
              {user.name.charAt(0)}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-white truncate">{user.name}</span>
              <span className="text-[10px] text-[#e2a76f] font-mono flex items-center gap-1 font-bold uppercase">
                <ShieldCheck className="w-3 h-3 text-[#e2a76f]" /> Staff Administrator
              </span>
            </div>
          </div>

          {/* Admin Navigation */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-rose-300/50 px-3 pb-1">
              Admin Systems
            </div>

            <Link
              href="/admin"
              className="btn-bouncy-subtle flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white hover:bg-rose-500/15 border border-transparent hover:border-rose-400/20 transition-all"
            >
              <Activity className="w-4 h-4 text-[#e2a76f]" />
              <span>Telemetry & Overview</span>
            </Link>

            <Link
              href="/admin/users"
              className="btn-bouncy-subtle flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-100 hover:text-white hover:bg-rose-500/15 border border-transparent hover:border-rose-400/20 transition-all"
            >
              <Users className="w-4 h-4 text-[#7eb898]" />
              <span>User Management</span>
            </Link>

            <Link
              href="/admin/projects"
              className="btn-bouncy-subtle flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-100 hover:text-white hover:bg-rose-500/15 border border-transparent hover:border-rose-400/20 transition-all"
            >
              <FolderGit2 className="w-4 h-4 text-[#d8829d]" />
              <span>Project Moderation</span>
            </Link>

            <Link
              href="/admin/audit"
              className="btn-bouncy-subtle flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-100 hover:text-white hover:bg-rose-500/15 border border-transparent hover:border-rose-400/20 transition-all"
            >
              <ScrollText className="w-4 h-4 text-[#f0afc3]" />
              <span>Audit Timeline</span>
            </Link>
          </div>

          {/* Navigation to User Views */}
          <div className="pt-4 border-t border-rose-900/20 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-rose-300/50 px-3 pb-1">
              Workspaces
            </div>

            <Link
              href="/dashboard"
              className="btn-bouncy-subtle flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-rose-200/70 hover:text-white hover:bg-rose-500/10 transition-colors"
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-3.5 h-3.5 text-rose-400" />
                <span>Creator Dashboard</span>
              </div>
              <ExternalLink className="w-3 h-3 text-rose-300/40" />
            </Link>

            <Link
              href="/projects"
              className="btn-bouncy-subtle flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-rose-200/70 hover:text-white hover:bg-rose-500/10 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-rose-400" />
                <span>Public Showcase</span>
              </div>
              <ExternalLink className="w-3 h-3 text-rose-300/40" />
            </Link>
          </div>

          {/* Security Badge */}
          <div className="p-3.5 rounded-2xl bg-[#e2a76f]/10 border border-[#e2a76f]/25 text-[11px] text-rose-200/80 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#f3c99f]">
              <Lock className="w-3.5 h-3.5 text-[#e2a76f]" />
              <span>RBAC Enforced</span>
            </div>
            <p className="text-[10px] leading-relaxed text-rose-300/60">
              Only authenticated users with &apos;admin&apos; role tokens are authorized.
            </p>
          </div>
        </aside>

        {/* Main Content Pane */}
        <main className="lg:col-span-9">{children}</main>
      </div>
    </div>
  );
}
