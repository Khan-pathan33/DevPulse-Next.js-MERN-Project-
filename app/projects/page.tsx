import { Suspense } from "react";
import { dbService } from "@/lib/db-service";
import { ProjectCard } from "@/components/project-card";
import { ProjectFilters } from "@/components/project-filters";
import { Layers, FolderX } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Catalog & Ecosystems",
  description: "Browse full-stack MERN, Next.js App Router, and AI engineering projects with live architectures in dusty pink aesthetics.",
};

export const dynamic = "force-dynamic";

interface ProjectsPageProps {
  searchParams: Promise<{
    stack?: string;
    search?: string;
  }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  // Next.js 15+ asynchronous searchParams
  const resolvedSearchParams = await searchParams;
  const stack = resolvedSearchParams.stack;
  const search = resolvedSearchParams.search;

  const projects = await dbService.getProjects({ stack, search });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d8829d] uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" /> Project Catalog
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Explore Developer Architectures
        </h1>
        <p className="text-xs sm:text-sm text-rose-200/60 max-w-2xl">
          Search and filter across MERN stack apps, Next.js Server Action showcases, and AI solutions with live source code.
        </p>
      </div>

      {/* Filter and Search Bar (Client Component with URL synchronization) */}
      <Suspense fallback={<div className="h-12 bg-[#1d131e] rounded-xl animate-pulse" />}>
        <ProjectFilters />
      </Suspense>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="space-y-4">
          <div className="text-xs text-rose-300/70 font-medium">
            Showing <span className="text-white font-bold">{projects.length}</span> projects
            {stack && stack !== "All" && (
              <span> in <span className="text-[#d8829d] font-bold">{stack}</span></span>
            )}
            {search && (
              <span> matching &quot;<span className="text-white font-bold">{search}</span>&quot;</span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </div>
      ) : (
        <div className="glass-panel rounded-3xl p-12 text-center border border-rose-900/30 space-y-4 max-w-md mx-auto my-12">
          <div className="w-14 h-14 rounded-2xl bg-[#1f1420] border border-rose-900/30 flex items-center justify-center text-rose-300/60 mx-auto">
            <FolderX className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">No projects found</h3>
            <p className="text-xs text-rose-200/60 mt-1">
              Try modifying your search keywords or selecting a different tech stack filter.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-block px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#c06c84] to-[#d8829d] hover:from-[#d8829d] hover:to-[#c06c84] text-white transition-all shadow-md shadow-rose-900/30"
          >
            Clear All Filters
          </Link>
        </div>
      )}
    </div>
  );
}
