"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ProjectData } from "@/lib/seed-data";
import { toggleProjectFeaturedAction } from "@/lib/actions/auth-actions";
import { deleteProjectAction } from "@/lib/actions";
import {
  Sparkles,
  Trash2,
  ExternalLink,
  Star,
  Eye,
  Search,
  CheckCircle2,
  AlertCircle,
  FolderGit2,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface AdminProjectTableProps {
  initialProjects: ProjectData[];
}

export function AdminProjectTable({ initialProjects }: AdminProjectTableProps) {
  const [projects, setProjects] = useState<ProjectData[]>(initialProjects);
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.stack.toLowerCase().includes(search.toLowerCase()) ||
      p.author.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleFeatured = (projectId: string) => {
    startTransition(async () => {
      const res = await toggleProjectFeaturedAction(projectId);
      if (res.success) {
        setProjects((prev) =>
          prev.map((p) => (p._id === projectId ? { ...p, featured: res.featured ?? !p.featured } : p))
        );
        setStatusMessage("Project featured state updated successfully.");
        setTimeout(() => setStatusMessage(null), 3000);
      }
    });
  };

  const handleDeleteProject = (projectId: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    startTransition(async () => {
      const res = await deleteProjectAction(projectId);
      if (res.success) {
        setProjects((prev) => prev.filter((p) => p._id !== projectId));
        setStatusMessage("Project removed from repository.");
        setTimeout(() => setStatusMessage(null), 3000);
      }
    });
  };

  return (
    <div className="space-y-4">
      {statusMessage && (
        <div className="p-3 rounded-2xl bg-[#7eb898]/15 border border-[#7eb898]/30 text-xs text-[#9ad4b4] flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#7eb898]" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300/60" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects, stack, author..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#1b131d]/90 border border-rose-400/20 text-xs text-rose-100 placeholder-rose-300/40 focus:outline-none focus:border-[#d8829d] transition-all"
          />
        </div>

        <div className="text-xs text-rose-300/70 font-mono">
          Showing <span className="text-white font-bold">{filteredProjects.length}</span> of {projects.length} projects
        </div>
      </div>

      {/* Table */}
      <div className="glass-panel rounded-3xl border border-rose-900/30 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1a101b]/90 border-b border-rose-900/30 text-rose-300/70 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Architecture</th>
                <th className="px-6 py-3.5">Stack</th>
                <th className="px-6 py-3.5">Featured Showcase</th>
                <th className="px-6 py-3.5">Stars</th>
                <th className="px-6 py-3.5">Author</th>
                <th className="px-6 py-3.5 text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-950/40 text-rose-100/90">
              {filteredProjects.map((p) => (
                <tr key={p._id} className="hover:bg-rose-500/5 transition-colors">
                  {/* Title & Link */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <Link
                        href={`/projects/${p.slug}`}
                        className="font-bold text-white hover:text-[#f3c1cf] transition-colors flex items-center gap-1.5"
                      >
                        <span>{p.title}</span>
                        <ExternalLink className="w-3 h-3 text-rose-300/40" />
                      </Link>
                      <span className="text-[10px] text-rose-300/50 font-mono">/{p.slug}</span>
                    </div>
                  </td>

                  {/* Stack */}
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#261927] text-rose-200 border border-rose-400/20">
                      {p.stack}
                    </span>
                  </td>

                  {/* Featured Toggle Button */}
                  <td className="px-6 py-4">
                    <button
                      disabled={isPending}
                      onClick={() => handleToggleFeatured(p._id)}
                      className={`btn-bouncy-subtle inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                        p.featured
                          ? "bg-rose-500/20 text-[#f3c1cf] border border-rose-400/40 shadow-sm"
                          : "bg-[#251825]/60 text-rose-300/50 border border-rose-400/15 hover:text-white"
                      }`}
                    >
                      <Sparkles className={`w-3 h-3 ${p.featured ? "text-[#d8829d]" : "opacity-40"}`} />
                      <span>{p.featured ? "Featured" : "Standard"}</span>
                    </button>
                  </td>

                  {/* Stars */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-[#e2a76f] font-mono font-medium">
                      <Star className="w-3.5 h-3.5 fill-[#e2a76f]" />
                      <span>{p.stars}</span>
                    </div>
                  </td>

                  {/* Author */}
                  <td className="px-6 py-4 text-rose-200/80">
                    {p.author.name}
                  </td>

                  {/* Delete Button */}
                  <td className="px-6 py-4 text-right">
                    <button
                      disabled={isPending}
                      onClick={() => handleDeleteProject(p._id, p.title)}
                      className="p-1.5 rounded-lg text-rose-400/80 hover:text-rose-200 hover:bg-rose-500/15 transition-colors cursor-pointer"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
