import Link from "next/link";
import { LayoutDashboard, PlusCircle, Terminal, Layers, ShieldCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creator Dashboard",
  description: "Manage repository architectures, inspect metrics, and deploy new templates in dusty pink aesthetics.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar */}
        <aside className="lg:col-span-3 glass-panel rounded-3xl p-6 border border-rose-900/30 space-y-6">
          {/* User Profile Simulation */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#1d121e]/80 border border-rose-900/30">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#c06c84] via-[#d8829d] to-[#e2a76f] text-white font-black flex items-center justify-center text-sm shadow-md shadow-rose-900/30">
              NK
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-white truncate">Nafisa Khanam</span>
              <span className="text-[10px] text-[#9ad4b4] flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3 h-3" /> Staff Architect
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
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
              This layout persists across all <code>/dashboard/*</code> subroutes without re-rendering the outer shell.
            </p>
          </div>
        </aside>

        {/* Main Dashboard Content Area */}
        <div className="lg:col-span-9">{children}</div>
      </div>
    </div>
  );
}
