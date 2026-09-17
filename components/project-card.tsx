import Link from "next/link";
import { ProjectData } from "@/lib/seed-data";
import { UpvoteButton } from "./upvote-button";
import { GithubIcon } from "./github-icon";
import { ExternalLink, Eye, ArrowRight, Sparkles } from "lucide-react";
import { formatCompactNumber } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectData;
  priority?: boolean;
}

const STACK_BADGES = {
  MERN: {
    bg: "bg-[#7eb898]/15 text-[#9ad4b4] border-[#7eb898]/30",
    dot: "bg-[#7eb898]",
  },
  "Next.js": {
    bg: "bg-[#d8829d]/15 text-[#f0afc3] border-[#d8829d]/30",
    dot: "bg-[#d8829d]",
  },
  AI: {
    bg: "bg-[#b07d9b]/15 text-[#d9a8c6] border-[#b07d9b]/30",
    dot: "bg-[#b07d9b]",
  },
  FullStack: {
    bg: "bg-[#e2a76f]/15 text-[#f3c99f] border-[#e2a76f]/30",
    dot: "bg-[#e2a76f]",
  },
};

export function ProjectCard({ project }: ProjectCardProps) {
  const stackStyle = STACK_BADGES[project.stack] || STACK_BADGES.FullStack;

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden">
      {/* Top ambient dusty pink highlight on hover */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#d8829d]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Header: Stack badge & Stars */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${stackStyle.bg}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${stackStyle.dot}`} />
              {project.stack}
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/20 text-rose-200 border border-rose-400/40">
                <Sparkles className="w-3 h-3 text-rose-300" /> Featured
              </span>
            )}
          </div>
          <UpvoteButton id={project._id} initialStars={project.stars} compact />
        </div>

        {/* Title */}
        <Link href={`/projects/${project.slug}`} className="block group-hover:text-[#f3c1cf] transition-colors">
          <h3 className="text-lg font-bold text-white tracking-tight mb-2 group-hover:translate-x-0.5 transition-transform duration-200">
            {project.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-rose-100/75 line-clamp-2 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
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

      {/* Footer: Author & Links */}
      <div className="pt-4 border-t border-rose-900/25 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <div className="w-7 h-7 rounded-full overflow-hidden border border-rose-400/30 bg-[#2b1b2a] flex items-center justify-center text-xs font-bold text-rose-200">
            {project.author.name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-rose-100">{project.author.name}</span>
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
  );
}
