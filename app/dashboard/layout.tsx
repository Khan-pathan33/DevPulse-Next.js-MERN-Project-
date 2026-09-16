import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import {
  LayoutDashboard,
  PlusCircle,
  Terminal,
  Layers,
  ShieldCheck,
  User,
  LogIn,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creator Dashboard",
  description: "Manage repository architectures, inspect metrics, and deploy new templates in dusty pink aesthetics.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const isAdmin = user?.role === "admin";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar */}
        <aside className="lg:col-span-3 glass-panel rounded-3xl p-6 border border-rose-900/30 space-y-6">
          {/* User Profile Card */}
          {user ? (
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#1d121e]/80 border border-rose-900/30">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#c06c84] via-[#d8829d] to-[#e2a76f] text-white font-black flex items-center justify-center text-sm shadow-md shadow-rose-900/30 shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold text-white truncate">{user.name}</span>
                <span
                  className={`text-[10px] flex items-center gap-1 font-semibold uppercase ${
                    isAdmin ? "text-[#e2a76f]" : "text-[#9ad4b4]"
                  }`}
                >
                  {isAdmin ? (
                    <>
                      <ShieldCheck className="w-3 h-3 text-[#e2a76f]" /> Staff Admin
                    </>
                  ) : (
                    <>
                      <User className="w-3 h-3 text-[#7eb898]" /> Verified Dev
                    </>
                  )}
                </span>
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-400/20 text-xs space-y-2">
              <div className="text-rose-200/80 font-medium">Browsing in Guest Mode</div>
              <Link
                href="/login"
                className="btn-bouncy flex items-center justify-center gap-1.5 w-full py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#c06c84] to-[#d8829d]"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In / Demo</span>
              </Link>
            </div>
          )}

          {/* Navigation */}
          <nav className="space-y-1">
            {isAdmin && (
              <Link
                href="/admin"
                className="btn-bouncy-subtle flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#f3c99f] bg-[#e2a76f]/15 border border-[#e2a76f]/30 hover:bg-[#e2a76f]/25 transition-colors mb-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#e2a76f]" />
                <span>Admin Control Center</span>
              </Link>
            )}

            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white bg-rose-500/20 text-rose-200 border border-rose-400/30 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-[#d8829d]" />
              <span>Project Inventory</span>
            </Link>

            <Link
              href="/dashboard/new"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-200/70 hover:text-white hover:bg-rose-500/10 transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-[#7eb898]" />
              <span>Submit Project</span>
            </Link>

            <Link
              href="/projects"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-200/70 hover:text-white hover:bg-rose-500/10 transition-colors"
            >
              <Layers className="w-4 h-4 text-[#e2a76f]" />
              <span>Public Catalog</span>
            </Link>

            <Link
              href="/api-docs"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-200/70 hover:text-white hover:bg-rose-500/10 transition-colors"
            >
              <Terminal className="w-4 h-4 text-[#b07d9b]" />
              <span>API Endpoints</span>
            </Link>
          </nav>

          {/* Educational Callout */}
          <div className="p-4 rounded-2xl bg-rose-950/25 border border-rose-800/30 text-[11px] text-rose-200/70 space-y-1.5">
            <p className="font-bold text-[#f3c1cf]">Nested App Router Layout</p>
            <p className="leading-relaxed">
              This layout persists across all <code>/dashboard/*</code> subroutes with dynamic session awareness.
            </p>
          </div>
        </aside>

        {/* Main Dashboard Content Area */}
        <div className="lg:col-span-9">{children}</div>
      </div>
    </div>
  );
}
