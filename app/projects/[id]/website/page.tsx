import { notFound } from "next/navigation";
import { dbService } from "@/lib/db-service";
import { WebsitePreview } from "@/components/website-preview";
import { GithubIcon } from "@/components/github-icon";
import { ArrowLeft, ExternalLink, Globe, Sparkles } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface ProjectWebsitePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await dbService.getProjects();
  return projects.map((p) => ({
    id: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectWebsitePageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await dbService.getProjectByIdOrSlug(id);

  if (!project) {
    return {
      title: "Website Not Found",
    };
  }

  return {
    title: `${project.title} - Live Website Preview | DevPulse`,
    description: `Experience the live website and interactive architecture of ${project.title}`,
  };
}

export const revalidate = 60;

export default async function ProjectWebsitePage({ params }: ProjectWebsitePageProps) {
  const { id } = await params;
  const project = await dbService.getProjectByIdOrSlug(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Bar: Navigation & Project Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-rose-900/30">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-300/70 hover:text-[#f3c1cf] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Details
            </Link>
            <span className="text-rose-900/60">•</span>
            <span className="text-xs text-rose-300/50">Live Showcase</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#d8829d]" />
              <span>{project.title}</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-200 border border-rose-400/30">
              {project.stack}
            </span>
            {project.featured && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#e2a76f]/15 text-[#f3c99f] border border-[#e2a76f]/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#e2a76f]" /> Featured
              </span>
            )}
          </div>
        </div>

        {/* Right side CTA actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href={`/projects/${project.slug}`}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-200 hover:text-white bg-[#261927] hover:bg-[#342235] border border-rose-400/20 transition-colors"
          >
            Architecture Specs
          </Link>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl text-rose-200 hover:text-white bg-[#261927] hover:bg-[#342235] border border-rose-400/20 transition-colors"
            title="GitHub Repository"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#c06c84] to-[#d8829d] hover:brightness-110 shadow-md shadow-rose-950/40 transition-all"
            >
              <span>Launch URL</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Main Interactive Website Browser Window */}
      <WebsitePreview project={project} />
    </div>
  );
}
