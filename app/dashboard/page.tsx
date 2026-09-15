import { dbService } from "@/lib/db-service";
import Link from "next/link";
import { DeleteProjectButton } from "@/components/delete-project-button";
import { PlusCircle, ExternalLink, Star, Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const projects = await dbService.getProjects();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Project Inventory</h1>
          <p className="text-xs text-rose-200/60 mt-1">
            Manage your published Next.js & MERN repositories and templates.
          </p>
        </div>

        <Link
          href="/dashboard/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#c06c84] to-[#d8829d] hover:from-[#d8829d] hover:to-[#c06c84] shadow-md shadow-rose-900/30 transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Project</span>
        </Link>
      </div>

      {/* Inventory Table */}
      <div className="glass-panel rounded-3xl border border-rose-900/30 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1a101b]/90 border-b border-rose-900/30 text-rose-300/70 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Project</th>
                <th className="px-6 py-3.5">Stack</th>
                <th className="px-6 py-3.5">Stars</th>
                <th className="px-6 py-3.5">Views</th>
                <th className="px-6 py-3.5">Created</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-950/40 text-rose-100/90">
              {projects.map((project) => (
                <tr key={project._id} className="hover:bg-rose-500/5 transition-colors">
                  {/* Title & Slug */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="font-bold text-white hover:text-[#f3c1cf] transition-colors"
                      >
                        {project.title}
                      </Link>
                      <span className="text-[11px] text-rose-300/40 font-mono">
                        /{project.slug}
                      </span>
                    </div>
                  </td>

                  {/* Stack */}
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#261927] text-rose-200 border border-rose-400/20">
                      {project.stack}
                    </span>
                  </td>

                  {/* Stars */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-[#e2a76f] font-medium">
                      <Star className="w-3.5 h-3.5 fill-[#e2a76f]" />
                      <span>{project.stars}</span>
                    </div>
                  </td>

                  {/* Views */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-rose-300/60">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{project.metrics.views}</span>
                    </div>
                  </td>

                  {/* Created */}
                  <td className="px-6 py-4 text-rose-300/60">
                    {formatDate(project.createdAt)}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="p-1.5 rounded-lg text-rose-300/60 hover:text-white hover:bg-rose-500/10 transition-colors"
                        title="View project page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <DeleteProjectButton id={project._id} title={project.title} />
                    </div>
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
