import Link from "next/link";
import { ArrowLeft, Search, Layers } from "lucide-react";

export default function ProjectNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full glass-panel rounded-3xl p-8 border border-slate-800 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
          <Layers className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white tracking-tight">Project Not Found</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            The project identifier or slug does not match any entry currently cataloged in the database.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-600/30"
          >
            <Search className="w-3.5 h-3.5" /> Return to Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
