import { notFound } from "next/navigation";
import { dbService } from "@/lib/db-service";
import { UpvoteButton } from "@/components/upvote-button";
import { ReviewForm } from "@/components/review-form";
import { GithubIcon } from "@/components/github-icon";
import { WebsitePreview } from "@/components/website-preview";
import {
  ArrowLeft,
  ExternalLink,
  Eye,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle,
  MessageSquare,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { formatDate, formatCompactNumber } from "@/lib/utils";

interface ProjectDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Next.js Static Site Generation (SSG): Pre-renders known top projects at build time
export async function generateStaticParams() {
  const projects = await dbService.getProjects();
  return projects.map((p) => ({
    id: p.slug,
  }));
}

// Next.js Dynamic Metadata Generation
export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await dbService.getProjectByIdOrSlug(id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - Full-Stack Architecture`,
    description: project.description,
    openGraph: {
      title: `${project.title} | DevPulse`,
      description: project.description,
      type: "article",
    },
  };
}

export const revalidate = 60; // Incremental Static Regeneration (ISR)

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  // Await the asynchronous params in Next.js 15+
  const { id } = await params;
  const project = await dbService.getProjectByIdOrSlug(id);

  if (!project) {
    notFound();
  }

  const reviews = await dbService.getReviews(project._id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Top Breadcrumb navigation */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-rose-300/70 hover:text-[#f3c1cf] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Project Catalog
        </Link>
      </div>

      {/* Main Project Hero Card */}
      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-rose-900/30 space-y-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-rose-900/25">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-200 border border-rose-400/30">
                {project.stack} Ecosystem
              </span>
              {project.featured && (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#e2a76f]/15 text-[#f3c99f] border border-[#e2a76f]/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#e2a76f]" /> Featured Template
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {project.title}
            </h1>

            <p className="text-sm sm:text-base text-rose-100/80 max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <UpvoteButton id={project._id} initialStars={project.stars} />
            <Link
              href={`/projects/${project.slug}/website`}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#c06c84] to-[#d8829d] hover:brightness-110 flex items-center justify-center gap-2 transition-all shadow-md shadow-rose-900/30"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>See Website</span>
            </Link>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-200 hover:text-white bg-[#261927] hover:bg-[#342235] flex items-center justify-center gap-2 transition-all border border-rose-400/20"
              >
                <span>Live URL</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-200 hover:text-white bg-[#261927] hover:bg-[#342235] flex items-center justify-center gap-2 transition-all border border-rose-400/20"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Source Code</span>
            </a>
          </div>
        </div>

        {/* Author & Meta Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-300/50 block mb-1">
              Architect / Author
            </span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-200 flex items-center justify-center text-xs font-bold">
                {project.author.name.charAt(0)}
              </div>
              <span className="text-xs font-bold text-rose-100">{project.author.name}</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-300/50 block mb-1">
              Role
            </span>
            <span className="text-xs font-medium text-rose-200/70">{project.author.role}</span>
          </div>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-300/50 block mb-1">
              Published
            </span>
            <div className="flex items-center gap-1.5 text-xs text-rose-200/70">
              <Calendar className="w-3.5 h-3.5 text-rose-400" />
              <span>{formatDate(project.createdAt)}</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-300/50 block mb-1">
              Total Views
            </span>
            <div className="flex items-center gap-1.5 text-xs text-rose-200/70">
              <Eye className="w-3.5 h-3.5 text-rose-400" />
              <span>{formatCompactNumber(project.metrics.views)} views</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Interactive Website Showcase Section */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-rose-900/30 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-rose-900/25">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
              <Globe className="w-5 h-5 text-[#d8829d]" />
              <span>Live Website Preview</span>
            </h2>
            <p className="text-xs sm:text-sm text-rose-200/70 mt-1">
              Interact with this project's website directly or test across Desktop, Tablet, and Mobile viewports.
            </p>
          </div>
          <Link
            href={`/projects/${project.slug}/website`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#c06c84] to-[#d8829d] hover:brightness-110 shadow-sm self-start sm:self-auto"
          >
            <span>Full-Screen Experience</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        <WebsitePreview project={project} embedded={true} />
      </section>

      {/* Grid: Architecture Breakdown & Stack Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Deep Dive */}
        <div className="lg:col-span-2 space-y-8">
          {/* Detailed Overview */}
          <div className="glass-panel rounded-3xl p-8 border border-rose-900/30 space-y-4">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d8829d]" /> Architectural Overview
            </h2>
            <p className="text-xs sm:text-sm text-rose-100/80 leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Key Architectural Decisions */}
          {project.architecture && project.architecture.length > 0 && (
            <div className="glass-panel rounded-3xl p-8 border border-rose-900/30 space-y-4">
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#7eb898]" /> Design Principles & Patterns
              </h2>
              <ul className="space-y-3">
                {project.architecture.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-rose-100/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7eb898] mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Community Reviews & Feedback */}
          <div className="glass-panel rounded-3xl p-8 border border-rose-900/30 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#d8829d]" /> Peer Reviews ({reviews.length})
              </h2>
              <span className="text-[11px] text-rose-300/60 font-medium">Verified Developers</span>
            </div>

            {/* Existing Reviews */}
            <div className="space-y-4">
              {reviews.map((rev: any) => (
                <div
                  key={rev._id}
                  className="p-4 rounded-2xl bg-[#1c121d]/80 border border-rose-900/25 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-200 flex items-center justify-center text-xs font-bold">
                        {rev.authorName.charAt(0)}
                      </div>
                      <span className="text-xs font-bold text-rose-100">{rev.authorName}</span>
                    </div>
                    <div className="flex items-center text-[#e2a76f] text-xs">
                      {"★".repeat(rev.rating)}
                    </div>
                  </div>
                  <p className="text-xs text-rose-100/80 leading-relaxed">{rev.comment}</p>
                  <span className="text-[10px] text-rose-300/40">{formatDate(rev.createdAt)}</span>
                </div>
              ))}
            </div>

            {/* Post Review Form via Server Action Client Component */}
            <ReviewForm projectId={project._id} />
          </div>
        </div>

        {/* Right 1 Col: Tech Stack & API Info */}
        <div className="space-y-6">
          {/* Tech Stack List */}
          <div className="glass-panel rounded-3xl p-6 border border-rose-900/30 space-y-4">
            <h3 className="text-xs font-bold text-rose-300/70 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#d8829d]" /> Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-[#231724] border border-rose-400/20 text-rose-100 hover:border-rose-400/50 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Direct API Endpoint Info */}
          <div className="glass-panel rounded-3xl p-6 border border-rose-900/30 space-y-3">
            <h3 className="text-xs font-bold text-rose-300/70 uppercase tracking-wider">
              JSON API Route
            </h3>
            <p className="text-xs text-rose-200/60">
              Query this project directly from any REST client or frontend fetch call:
            </p>
            <div className="p-3 rounded-xl bg-[#140c15] font-mono text-[11px] text-[#f3c1cf] border border-rose-900/40 overflow-x-auto">
              GET /api/projects/{project._id}
            </div>
            <Link
              href={`/api/projects/${project._id}`}
              target="_blank"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#d8829d] hover:text-[#f3c1cf]"
            >
              <span>Inspect Raw JSON</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
