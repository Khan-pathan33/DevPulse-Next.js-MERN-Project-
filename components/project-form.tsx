"use client";

import { useActionState, useState } from "react";
import { createProjectAction, ActionState } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowLeft, Send, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

const initialState: ActionState = {
  success: false,
  message: "",
  errors: {},
};

export function ProjectForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createProjectAction, initialState);

  // Live preview states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stack, setStack] = useState<string>("MERN");
  const [technologies, setTechnologies] = useState("MongoDB, Express, React, Node.js");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Form Column */}
      <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-rose-900/30 shadow-xl">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-300/70 hover:text-white transition-colors mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-black text-white tracking-tight">Submit a Showcase Project</h1>
          <p className="text-xs text-rose-200/60 mt-1">
            Built using Next.js Server Actions with automatic cache revalidation in a dusty pink theme.
          </p>
        </div>

        {state.message && (
          <div
            className={`p-4 rounded-2xl mb-6 text-xs flex items-center gap-2.5 ${
              state.success
                ? "bg-[#7eb898]/15 text-[#9ad4b4] border border-[#7eb898]/30"
                : "bg-rose-500/15 text-rose-300 border border-rose-500/40"
            }`}
          >
            {state.success ? (
              <CheckCircle2 className="w-4 h-4 text-[#9ad4b4] shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <div>
              <p className="font-semibold">{state.message}</p>
              {state.success && (
                <button
                  type="button"
                  onClick={() => router.push("/projects")}
                  className="underline mt-1 text-[#d8829d] font-bold hover:text-white cursor-pointer"
                >
                  View in Project Explorer →
                </button>
              )}
            </div>
          </div>
        )}

        <form action={formAction} className="space-y-5">
          {/* Project Title */}
          <div>
            <label htmlFor="title" className="block text-xs font-semibold text-rose-200/80 mb-1.5">
              Project Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. NexusFlow - MERN SaaS Workspace"
              className="w-full px-4 py-2.5 rounded-xl bg-[#1b131d]/90 border border-rose-400/20 text-sm text-rose-100 placeholder-rose-300/40 focus:outline-none focus:border-[#d8829d] focus:ring-1 focus:ring-[#d8829d]"
            />
            {state.errors?.title && (
              <p className="text-xs text-rose-400 mt-1">{state.errors.title}</p>
            )}
          </div>

          {/* Primary Stack */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="stack" className="block text-xs font-semibold text-rose-200/80 mb-1.5">
                Primary Architecture *
              </label>
              <select
                id="stack"
                name="stack"
                value={stack}
                onChange={(e) => setStack(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#1b131d]/90 border border-rose-400/20 text-sm text-rose-100 focus:outline-none focus:border-[#d8829d]"
              >
                <option value="MERN">MERN Stack (Mongo/Express/React/Node)</option>
                <option value="Next.js">Next.js (App Router / Full-Stack)</option>
                <option value="AI">AI / LLM Integration</option>
                <option value="FullStack">Full-Stack Microservices</option>
              </select>
              {state.errors?.stack && (
                <p className="text-xs text-rose-400 mt-1">{state.errors.stack}</p>
              )}
            </div>

            {/* Technologies Comma-separated */}
            <div>
              <label htmlFor="technologies" className="block text-xs font-semibold text-rose-200/80 mb-1.5">
                Technologies (comma-separated)
              </label>
              <input
                id="technologies"
                name="technologies"
                type="text"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                placeholder="React, TypeScript, Tailwind, MongoDB"
                className="w-full px-4 py-2.5 rounded-xl bg-[#1b131d]/90 border border-rose-400/20 text-sm text-rose-100 placeholder-rose-300/40 focus:outline-none focus:border-[#d8829d]"
              />
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label htmlFor="description" className="block text-xs font-semibold text-rose-200/80 mb-1.5">
              Short Summary *
            </label>
            <textarea
              id="description"
              name="description"
              rows={2}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A one or two sentence pitch explaining what this project does..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#1b131d]/90 border border-rose-400/20 text-sm text-rose-100 placeholder-rose-300/40 focus:outline-none focus:border-[#d8829d]"
            />
            {state.errors?.description && (
              <p className="text-xs text-rose-400 mt-1">{state.errors.description}</p>
            )}
          </div>

          {/* Long Description / Architectural Breakdown */}
          <div>
            <label htmlFor="longDescription" className="block text-xs font-semibold text-rose-200/80 mb-1.5">
              Technical Architecture Details
            </label>
            <textarea
              id="longDescription"
              name="longDescription"
              rows={4}
              placeholder="Explain how the database models, server routes, caching layers, and front-end state are organized..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#1b131d]/90 border border-rose-400/20 text-sm text-rose-100 placeholder-rose-300/40 focus:outline-none focus:border-[#d8829d]"
            />
          </div>

          {/* Repository & Demo URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="githubUrl" className="block text-xs font-semibold text-rose-200/80 mb-1.5">
                GitHub Repository URL *
              </label>
              <input
                id="githubUrl"
                name="githubUrl"
                type="url"
                required
                placeholder="https://github.com/username/project"
                className="w-full px-4 py-2.5 rounded-xl bg-[#1b131d]/90 border border-rose-400/20 text-sm text-rose-100 placeholder-rose-300/40 focus:outline-none focus:border-[#d8829d]"
              />
              {state.errors?.githubUrl && (
                <p className="text-xs text-rose-400 mt-1">{state.errors.githubUrl}</p>
              )}
            </div>

            <div>
              <label htmlFor="liveUrl" className="block text-xs font-semibold text-rose-200/80 mb-1.5">
                Live Deployment URL (Optional)
              </label>
              <input
                id="liveUrl"
                name="liveUrl"
                type="url"
                placeholder="https://my-app.vercel.app"
                className="w-full px-4 py-2.5 rounded-xl bg-[#1b131d]/90 border border-rose-400/20 text-sm text-rose-100 placeholder-rose-300/40 focus:outline-none focus:border-[#d8829d]"
              />
            </div>
          </div>

          {/* Author info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="authorName" className="block text-xs font-semibold text-rose-200/80 mb-1.5">
                Author / Lead Engineer Name
              </label>
              <input
                id="authorName"
                name="authorName"
                type="text"
                placeholder="e.g. Alex Rivera"
                className="w-full px-4 py-2.5 rounded-xl bg-[#1b131d]/90 border border-rose-400/20 text-sm text-rose-100 placeholder-rose-300/40 focus:outline-none focus:border-[#d8829d]"
              />
            </div>

            <div>
              <label htmlFor="authorRole" className="block text-xs font-semibold text-rose-200/80 mb-1.5">
                Your Role / Title
              </label>
              <input
                id="authorRole"
                name="authorRole"
                type="text"
                placeholder="e.g. Full-Stack Systems Engineer"
                className="w-full px-4 py-2.5 rounded-xl bg-[#1b131d]/90 border border-rose-400/20 text-sm text-rose-100 placeholder-rose-300/40 focus:outline-none focus:border-[#d8829d]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="btn-bouncy w-full py-3 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#c06c84] via-[#d8829d] to-[#c06c84] hover:from-[#d8829d] hover:to-[#c06c84] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-rose-900/30 hover:shadow-rose-900/50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Submitting to Database via Server Action...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Publish Project</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Live Preview Column */}
      <div className="lg:col-span-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-rose-200/70 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#d8829d]" /> Live Card Preview
          </span>
          <span className="text-[11px] text-rose-300/40 font-mono">Dynamic RSC Sync</span>
        </div>

        {/* Mock Card Preview */}
        <div className="glass-card rounded-2xl p-6 border border-rose-900/30 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-rose-500/15 text-rose-200 border border-rose-400/30">
              {stack}
            </span>
            <span className="text-xs text-[#e2a76f] font-medium">★ 1 Star</span>
          </div>

          <h3 className="text-lg font-bold text-white mb-2">
            {title || "Your Project Title Here"}
          </h3>

          <p className="text-xs text-rose-100/70 line-clamp-3 mb-4 leading-relaxed">
            {description || "The project summary will render here as you type in the form..."}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {technologies
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
              .map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#251825] text-rose-100/80 border border-rose-400/15"
                >
                  {tech}
                </span>
              ))}
          </div>

          <div className="pt-3 border-t border-rose-900/30 flex items-center justify-between text-xs text-rose-300/60">
            <span>Author: Preview Mode</span>
            <span className="text-[#d8829d] font-medium">Ready to deploy</span>
          </div>
        </div>

        {/* Server Action Explainer Box */}
        <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-800/30 text-xs text-rose-200 space-y-2">
          <p className="font-bold flex items-center gap-1.5 text-[#f3c1cf]">
            <Sparkles className="w-3.5 h-3.5 text-[#d8829d]" /> Under the Hood: Next.js Server Actions
          </p>
          <p className="text-[11px] text-rose-200/60 leading-relaxed">
            When you click &quot;Publish Project&quot;, Next.js executes <code>createProjectAction</code> directly on the Node.js server without needing an auxiliary API route. It updates the database and triggers <code>revalidatePath(&apos;/projects&apos;)</code> to purge stale caches instantaneously.
          </p>
        </div>
      </div>
    </div>
  );
}
