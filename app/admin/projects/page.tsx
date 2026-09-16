import { dbService } from "@/lib/db-service";
import { AdminProjectTable } from "@/components/admin-project-table";
import { FolderGit2, PlusCircle } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await dbService.getProjects();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d8829d] mb-1">
            <FolderGit2 className="w-4 h-4" /> Content Curation & Governance
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Repository Moderation Console
          </h1>
          <p className="text-xs text-rose-200/70 mt-1">
            Promote outstanding MERN & Next.js architectures to the homepage showcase, or remove flagged content.
          </p>
        </div>

        <Link
          href="/dashboard/new"
          className="btn-bouncy px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#c06c84] to-[#d8829d] flex items-center gap-1.5 self-start sm:self-auto"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>New Project</span>
        </Link>
      </div>

      <AdminProjectTable initialProjects={projects} />
    </div>
  );
}
