import Link from "next/link";
import { Sparkles, ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full glass-panel rounded-3xl p-8 sm:p-10 border border-slate-800 text-center space-y-6 shadow-2xl">
        <div className="relative w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
          <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
            404
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-white tracking-tight">Resource Not Found</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            The project, route, or resource you requested does not exist or has been relocated within the ecosystem.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/projects"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2 shadow-md shadow-indigo-600/30"
          >
            <Search className="w-3.5 h-3.5" /> Browse Projects
          </Link>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
