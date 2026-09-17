import { getCurrentUser } from "@/lib/auth";
import { dbService } from "@/lib/db-service";
import Link from "next/link";
import { Metadata } from "next";
import {
  FolderGit2,
  PlusCircle,
  Sparkles,
  ExternalLink,
  Eye,
  Star,
  ArrowRight,
  ShieldCheck,
  Layers,
  LogIn,
  UserPlus,
  Calendar,
  Code2,
  CheckCircle,
} from "lucide-react";
import { GithubIcon } from "@/components/github-icon";
import { DeleteProjectButton } from "@/components/delete-project-button";
import { formatDate, formatCompactNumber } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My Projects",
  description: "View, manage, and submit your personal Next.js and MERN showcase projects.",
};

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

export default async function MyProjectsPage() {
  const user = await getCurrentUser();

  // If not logged in, render authentication gate
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-rose-900/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#c06c84] to-[#d8829d] flex items-center justify-center mx-auto text-white shadow-lg shadow-rose-950/40">
            <FolderGit2 className="w-8 h-8" />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Sign In to View My Projects
            </h1>
            <p className="text-xs sm:text-sm text-rose-100/75 leading-relaxed">
              Log in to your account to view, publish, and manage all your personal Next.js &amp; MERN projects with working live demos and GitHub repositories.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/login?redirect=/my-projects"
              className="btn-bouncy px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#c06c84] to-[#d8829d] hover:from-[#d8829d] hover:to-[#c06c84] shadow-md shadow-rose-900/40 flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Log In to Account</span>
            </Link>
            <Link
              href="/register"
              className="btn-bouncy px-6 py-2.5 rounded-xl text-xs font-bold text-rose-200 bg-[#241725] hover:bg-[#322034] border border-rose-400/25 flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Free Account</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Fetch projects created by this user
  const myProjects = await dbService.getUserProjects(user);

  const totalStars = myProjects.reduce((acc, p) => acc + (p.stars || 0), 0);
  const totalViews = myProjects.reduce((acc, p) => acc + (p.metrics?.views || 0), 0);
  const totalLikes = myProjects.reduce((acc, p) => acc + (p.metrics?.likes || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* User Welcome & Overview Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-rose-900/30 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#c06c84] via-[#d8829d] to-[#e2a76f] p-0.5 shadow-lg shadow-rose-950/40 shrink-0">
              <div className="w-full h-full bg-[#1b121c] rounded-[14px] flex items-center justify-center text-xl font-black text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {user.name}
                </h1>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase border ${
                    user.role === "admin"
                      ? "bg-[#e2a76f]/15 text-[#e2a76f] border-[#e2a76f]/30"
                      : "bg-[#7eb898]/15 text-[#9ad4b4] border-[#7eb898]/30"
                  }`}
                >
                  {user.role === "admin" ? "🛡 Staff Admin" : "Developer"}
                </span>
              </div>
              <p className="text-xs text-rose-300/70 font-mono">{user.email}</p>
              <p className="text-xs text-rose-100/70">
                Personal showcase portfolio of your submitted repositories and live apps.
              </p>
            </div>
          </div>

          {/* Action button */}
          <div className="shrink-0 flex items-center gap-3">
            <Link
              href="/dashboard/new"
              className="btn-bouncy inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#c06c84] to-[#d8829d] hover:from-[#d8829d] hover:to-[#c06c84] shadow-md shadow-rose-900/40 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit New Project</span>
            </Link>
          </div>
        </div>

        {/* User Portfolio KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-rose-900/25">
          <div className="p-3.5 rounded-2xl bg-[#1d121e]/80 border border-rose-900/30">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-rose-300/60 block mb-1">
              My Projects
            </span>
            <div className="text-xl font-black text-white font-mono">{myProjects.length}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#1d121e]/80 border border-rose-900/30">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-rose-300/60 block mb-1">
              Total Stars
            </span>
            <div className="text-xl font-black text-[#e2a76f] font-mono flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-[#e2a76f]" />
              <span>{formatCompactNumber(totalStars)}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#1d121e]/80 border border-rose-900/30">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-rose-300/60 block mb-1">
              Total Views
            </span>
            <div className="text-xl font-black text-rose-200 font-mono flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-rose-300" />
              <span>{formatCompactNumber(totalViews)}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#1d121e]/80 border border-rose-900/30">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-rose-300/60 block mb-1">
              Community Likes
            </span>
            <div className="text-xl font-black text-[#9ad4b4] font-mono flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#9ad4b4]" />
              <span>{formatCompactNumber(totalLikes)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#d8829d]" />
              Submitted Repositories ({myProjects.length})
            </h2>
            <p className="text-xs text-rose-200/60">
              Repositories and live demos submitted by your account.
            </p>
          </div>
        </div>

        {myProjects.length === 0 ? (
          /* Empty State */
          <div className="glass-panel rounded-3xl p-12 border border-rose-900/30 text-center space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-400/20 flex items-center justify-center mx-auto text-rose-300">
              <Layers className="w-7 h-7 text-[#d8829d]" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="text-lg font-bold text-white">No Submitted Projects Yet</h3>
              <p className="text-xs text-rose-100/70 leading-relaxed">
                You haven&apos;t published any projects under your account yet. Share your Next.js or MERN repository with the developer community!
              </p>
            </div>
            <Link
              href="/dashboard/new"
              className="btn-bouncy inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#c06c84] to-[#d8829d] hover:from-[#d8829d] hover:to-[#c06c84] shadow-md shadow-rose-900/30 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Your First Project</span>
            </Link>
          </div>
        ) : (
          /* Grid of User's Projects */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myProjects.map((project) => {
              const stackStyle = STACK_BADGES[project.stack] || STACK_BADGES.FullStack;

              return (
                <div
                  key={project._id}
                  className="glass-card rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden border border-rose-900/30"
                >
                  <div>
                    {/* Header: Stack badge & Delete */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${stackStyle.bg}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${stackStyle.dot}`} />
                        {project.stack}
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-xs text-[#e2a76f] font-bold">
                          <Star className="w-3.5 h-3.5 fill-[#e2a76f]" />
                          {project.stars}
                        </span>
                        <DeleteProjectButton id={project._id} title={project.title} />
                      </div>
                    </div>

                    {/* Title */}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="block group-hover:text-[#f3c1cf] transition-colors"
                    >
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

                  {/* Footer: Action Links */}
                  <div className="pt-4 border-t border-rose-900/25 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5 text-[10px] text-rose-300/60">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(project.createdAt)}</span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Live Demo for ${project.title}`}
                          title="Open Live Demo"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-[#c06c84] to-[#d8829d] hover:brightness-110 shadow-sm shadow-rose-950/40 transition-all shrink-0"
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
            })}
          </div>
        )}
      </div>
    </div>
  );
}
