import Link from "next/link";
import { dbService } from "@/lib/db-service";
import { ProjectCard } from "@/components/project-card";
import { StatsChart } from "@/components/stats-chart";
import { HeroLiveVisualizer } from "@/components/hero-live-visualizer";
import {
  Sparkles,
  ArrowRight,
  Database,
  Cpu,
  Layers,
  Terminal,
  Zap,
  Globe2,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export const revalidate = 60; // Incremental Static Regeneration every 60 seconds

export default async function HomePage() {
  // Direct Server-Side Data Fetching (Zero client JS bundle overhead)
  const [featuredProjects, allProjects, stats] = await Promise.all([
    dbService.getProjects({ featured: true }),
    dbService.getProjects(),
    dbService.getStats(),
  ]);

  const showcaseProjects = featuredProjects.length > 0 ? featuredProjects : allProjects.slice(0, 3);

  const CONCEPTS = [
    {
      title: "React Server Components",
      desc: "Zero-bundle data fetching rendered directly on Node.js runtime for optimal Core Web Vitals.",
      icon: Cpu,
      color: "text-[#d8829d]",
      border: "border-rose-400/20",
      bg: "bg-rose-500/10",
    },
    {
      title: "Server Actions",
      desc: "Direct type-safe database mutations with optimistic UI updates and instant path revalidations.",
      icon: Zap,
      color: "text-[#e2a76f]",
      border: "border-[#e2a76f]/20",
      bg: "bg-[#e2a76f]/10",
    },
    {
      title: "Route Handlers (REST API)",
      desc: "Full Express-like HTTP endpoints supporting standard Web Request/Response objects and caching headers.",
      icon: Terminal,
      color: "text-[#b07d9b]",
      border: "border-[#b07d9b]/20",
      bg: "bg-[#b07d9b]/10",
    },
    {
      title: "MongoDB & Mongoose",
      desc: "Production object modeling schemas with connection pooling and an automated in-memory fallback.",
      icon: Database,
      color: "text-[#7eb898]",
      border: "border-[#7eb898]/20",
      bg: "bg-[#7eb898]/10",
    },
    {
      title: "ISR & Static Generation",
      desc: "Edge-cached static pages with generateStaticParams and dynamic background cache invalidation.",
      icon: Globe2,
      color: "text-[#f0afc3]",
      border: "border-rose-300/20",
      bg: "bg-rose-400/10",
    },
    {
      title: "App Router & Nested Layouts",
      desc: "Composited hierarchical routing with streaming loading skeletons and error boundaries.",
      icon: Layers,
      color: "text-[#c06c84]",
      border: "border-rose-500/20",
      bg: "bg-rose-500/10",
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section: Left Side Text + Right Side Live Animation */}
      <section className="relative pt-10 md:pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text, Badges, Metrics & Bouncy CTAs */}
          <div className="lg:col-span-6 text-left space-y-6">
            {/* Release Badge with Live Pulse */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border-rose-400/40 text-xs font-semibold text-rose-200 shadow-md shadow-rose-950/40 btn-bouncy cursor-pointer">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d8829d] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d8829d]"></span>
              </span>
              <span>Full-Stack MERN & Next.js App Router</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#d8829d]"></span>
              <span className="text-[#f3c1cf] font-bold">Dusty Pink Edition</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Architect Modern Web Apps With{" "}
              <span className="bg-gradient-to-r from-pink-100 via-[#f0afc3] to-[#d8829d] bg-clip-text text-transparent">
                MERN & Next.js
              </span>
            </h1>

            {/* Description Text */}
            <p className="text-sm sm:text-base text-rose-100/80 leading-relaxed max-w-xl">
              A production-grade developer ecosystem uniting <strong>MongoDB Mongoose schemas</strong>, <strong>Express/Node Route Handlers</strong>, and <strong>React 19 Server Components</strong> with Next.js App Router, Server Actions, and dynamic ISR.
            </p>

            {/* Micro Metrics Strip */}
            <div className="grid grid-cols-3 gap-3 pt-1 max-w-lg">
              <div className="p-3 rounded-2xl bg-[#1a101c]/80 border border-rose-900/30">
                <div className="text-lg font-black text-white font-mono">100%</div>
                <div className="text-[11px] text-rose-300/60 font-medium">Type-Safe Contracts</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#1a101c]/80 border border-rose-900/30">
                <div className="text-lg font-black text-[#f3c1cf] font-mono">0 KB</div>
                <div className="text-[11px] text-rose-300/60 font-medium">Client JS (RSC Core)</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#1a101c]/80 border border-rose-900/30">
                <div className="text-lg font-black text-[#9ad4b4] font-mono">&lt; 4ms</div>
                <div className="text-[11px] text-rose-300/60 font-medium">Indexed DB Latency</div>
              </div>
            </div>

            {/* Bouncy Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/projects"
                className="btn-bouncy px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#c06c84] via-[#d8829d] to-[#c06c84] hover:from-[#d8829d] hover:to-[#c06c84] shadow-xl shadow-rose-900/40 hover:shadow-rose-900/60 flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Showcase</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/api-docs"
                className="btn-bouncy px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm text-rose-100 glass-panel hover:text-white hover:border-rose-400/40 flex items-center gap-2 cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-[#d8829d]" />
                <span>API Console</span>
              </Link>
              <Link
                href="/dashboard/new"
                className="btn-bouncy px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm text-[#9ad4b4] bg-[#7eb898]/15 hover:bg-[#7eb898]/25 border border-[#7eb898]/30 flex items-center gap-2 cursor-pointer"
              >
                <Database className="w-4 h-4 text-[#7eb898]" />
                <span>Submit Project</span>
              </Link>
            </div>

            {/* Tech Stack Pills Bar */}
            <div className="pt-4 border-t border-rose-950/40 flex flex-wrap items-center gap-2 text-xs text-rose-300/60">
              <span className="font-semibold text-rose-300/40 uppercase tracking-wider text-[10px]">Stack:</span>
              <span className="btn-bouncy-subtle px-2.5 py-1 rounded-lg bg-[#1a111b] border border-rose-900/30 text-rose-100/90 font-medium text-[11px]">🍃 MongoDB 7.0</span>
              <span className="btn-bouncy-subtle px-2.5 py-1 rounded-lg bg-[#1a111b] border border-rose-900/30 text-rose-100/90 font-medium text-[11px]">⚡ Express API</span>
              <span className="btn-bouncy-subtle px-2.5 py-1 rounded-lg bg-[#1a111b] border border-rose-900/30 text-rose-100/90 font-medium text-[11px]">⚛ React 19</span>
              <span className="btn-bouncy-subtle px-2.5 py-1 rounded-lg bg-[#1a111b] border border-rose-900/30 text-rose-100/90 font-medium text-[11px]">▲ Next.js 16</span>
            </div>
          </div>

          {/* Right Column: Live Animated Holographic Terminal & Floating Ecosystem Badges */}
          <div className="lg:col-span-6 relative">
            <HeroLiveVisualizer />
          </div>
        </div>
      </section>

      {/* Platform Analytics Visualizer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StatsChart stats={stats} />
      </section>

      {/* Next.js Core Concepts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-bold text-[#d8829d] uppercase tracking-wider mb-2">
            Comprehensive Architecture
          </h2>
          <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Every Next.js & MERN Concept in Action
          </p>
          <p className="text-xs sm:text-sm text-rose-200/60 mt-2">
            Engineered cleanly with modern patterns, zero deprecations, and robust TypeScript typing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONCEPTS.map((concept, idx) => {
            const Icon = concept.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-rose-900/30 hover:border-rose-400/30 space-y-4 btn-bouncy-subtle"
              >
                <div className={`w-10 h-10 rounded-xl ${concept.bg} border ${concept.border} flex items-center justify-center ${concept.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight mb-1">
                    {concept.title}
                  </h3>
                  <p className="text-xs text-rose-100/70 leading-relaxed">
                    {concept.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Projects Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e2a76f] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Featured Architecture
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Highlighted Developer Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="btn-bouncy flex items-center gap-1.5 text-xs font-bold text-[#d8829d] hover:text-[#f3c1cf] group"
          >
            <span>Browse all {allProjects.length} projects</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcaseProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </section>

      {/* Interactive CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden glass-panel border-rose-400/30 p-8 sm:p-12 text-center shadow-2xl">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-rose-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#c06c84]/15 rounded-full blur-3xl pointer-events-none" />

          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
            Ready to test Server Actions & Route Handlers?
          </h3>
          <p className="text-xs sm:text-sm text-rose-100/80 max-w-xl mx-auto mb-8">
            Create a custom project using our interactive form or fire test HTTP requests against our Next.js API route handlers in real time.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/dashboard/new"
              className="btn-bouncy px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#c06c84] to-[#d8829d] hover:from-[#d8829d] hover:to-[#c06c84] shadow-lg shadow-rose-900/30 transition-all"
            >
              Submit Project via Server Action
            </Link>
            <Link
              href="/api-docs"
              className="btn-bouncy px-6 py-3 rounded-xl font-bold text-xs text-rose-100 bg-[#251825] hover:bg-[#321f31] border border-rose-400/20 transition-all"
            >
              Launch Live API Console
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
