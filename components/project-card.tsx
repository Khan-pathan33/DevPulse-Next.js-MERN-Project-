import Link from "next/link";
import { ProjectData, getProjectFallbackImage } from "@/lib/seed-data";
import { UpvoteButton } from "./upvote-button";
import { GithubIcon } from "./github-icon";
import { ExternalLink, Eye, ArrowRight, Sparkles, Globe } from "lucide-react";
import { formatCompactNumber } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectData;
  priority?: boolean;
}

const STACK_BADGES = {
  MERN: {
    bg: "bg-[#7eb898]/20 text-[#9ad4b4] border-[#7eb898]/40",
    dot: "bg-[#7eb898]",
  },
  "Next.js": {
    bg: "bg-[#d8829d]/20 text-[#f0afc3] border-[#d8829d]/40",
    dot: "bg-[#d8829d]",
  },
  AI: {
    bg: "bg-[#b07d9b]/20 text-[#d9a8c6] border-[#b07d9b]/40",
    dot: "bg-[#b07d9b]",
  },
  FullStack: {
    bg: "bg-[#e2a76f]/20 text-[#f3c99f] border-[#e2a76f]/40",
    dot: "bg-[#e2a76f]",
  },
};

export function ProjectCard({ project }: ProjectCardProps) {
  const stackStyle = STACK_BADGES[project.stack] || STACK_BADGES.FullStack;
  const imageUrl = project.image || getProjectFallbackImage(project.stack, project.slug);

  const displayUrl = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `${project.slug}.dev`;

  return (
    <div className="glass-card rounded-2xl flex flex-col justify-between group relative overflow-hidden border border-rose-950/40 hover:border-rose-400/40 transition-all duration-300 shadow-xl hover:shadow-rose-950/40">
      {/* Top ambient dusty pink highlight on hover */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8829d]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30" />

      {/* 1. Website Live Preview Mockup Header */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#150d17] border-b border-rose-950/40 select-none">
        {/* Mock browser window chrome bar */}
        <div className="absolute top-0 inset-x-0 z-20 h-7 bg-[#140b15]/90 backdrop-blur-md border-b border-rose-900/30 px-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2 h-2 rounded-full bg-amber-400/80 inline-block" />
            <span className="w-2 h-2 rounded-full bg-emerald-400/80 inline-block" />
          </div>
          <div className="flex items-center gap-1 text-[10px] font-mono text-rose-200/60 truncate max-w-[170px] sm:max-w-[210px] px-2 py-0.5 rounded bg-black/40 border border-rose-900/30">
            <Globe className="w-2.5 h-2.5 text-rose-300/60 shrink-0" />
            <span className="truncate">{displayUrl}</span>
          </div>
          <div className="w-6" />
        </div>

        {/* Website Preview Screenshot */}
        <Link href={`/projects/${project.slug}`} className="block w-full h-full">
          <img
            src={imageUrl}
            alt={`${project.title} live website screenshot`}
            loading="lazy"
            className="w-full h-full object-cover object-top pt-7 group-hover:scale-105 transition-transform duration-500 ease-out brightness-95 group-hover:brightness-105"
          />
        </Link>

        {/* Bottom gradient fade into card body */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#1b121c] via-[#1b121c]/60 to-transparent z-10 pointer-events-none" />

        {/* Floating Stack & Featured Badges */}
        <div className="absolute top-9 left-3 z-20 flex items-center gap-1.5 pointer-events-none">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border backdrop-blur-md shadow-lg ${stackStyle.bg}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${stackStyle.dot}`} />
            {project.stack}
          </span>
          {project.featured && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/30 text-rose-100 border border-rose-400/50 backdrop-blur-md shadow-lg">
              <Sparkles className="w-3 h-3 text-rose-300" /> Featured
            </span>
          )}
        </div>

        {/* Upvote Button Floating on Top Right */}
        <div className="absolute top-9 right-3 z-20">
          <UpvoteButton id={project._id} initialStars={project.stars} compact />
        </div>
      </div>

      {/* 2. Card Content & Meta */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Title */}
          <Link
            href={`/projects/${project.slug}`}
            className="block group-hover:text-[#f3c1cf] transition-colors"
          >
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mb-2 group-hover:translate-x-0.5 transition-transform duration-200 line-clamp-1">
              {project.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs sm:text-sm text-rose-100/75 line-clamp-2 leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#251825]/80 text-rose-100/80 border border-rose-400/15"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-md bg-[#251825]/40 text-rose-300/50">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Footer: Author & Action Buttons */}
        <div className="pt-4 border-t border-rose-900/25 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            {/* Avatar */}
            <div className="w-7 h-7 rounded-full overflow-hidden border border-rose-400/30 bg-[#2b1b2a] flex items-center justify-center text-xs font-bold text-rose-200">
              {project.author.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-rose-100 truncate max-w-[90px] sm:max-w-[120px]">
                {project.author.name}
              </span>
              <div className="flex items-center gap-1 text-[10px] text-rose-300/60">
                <Eye className="w-3 h-3" />
                <span>{formatCompactNumber(project.metrics.views)} views</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live Demo for ${project.title}`}
                title="Open Live Demo"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-[#c06c84] to-[#d8829d] hover:brightness-110 shadow-sm shadow-rose-950/40 transition-all shrink-0"
              >
                <span>Demo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Source Code for ${project.title}`}
              title="View Source Code on GitHub"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-rose-200/90 hover:text-white bg-[#261927] hover:bg-[#382136] border border-rose-400/20 transition-all shrink-0"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Code</span>
            </a>
            <Link
              href={`/projects/${project.slug}`}
              className="flex items-center gap-1 text-xs font-semibold text-[#d8829d] hover:text-[#f3c1cf] pl-1 group/btn shrink-0"
            >
              <span>Details</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
