"use client";

import { useState, useEffect } from "react";
import { ProjectData } from "@/lib/seed-data";
import {
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  RotateCw,
  Lock,
  Sparkles,
  CheckCircle2,
  ShoppingCart,
  TrendingUp,
  Send,
  Terminal,
  MessageSquare,
  ThumbsUp,
  Maximize2,
  Layers,
  ArrowRight,
  ShieldCheck,
  Globe,
} from "lucide-react";
import Link from "next/link";

interface WebsitePreviewProps {
  project: ProjectData;
  embedded?: boolean;
}

export function WebsitePreview({ project, embedded = false }: WebsitePreviewProps) {
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mode, setMode] = useState<"interactive" | "live-iframe">("interactive");
  const [iframeError, setIframeError] = useState(false);

  // NexusFlow state
  const [tasks, setTasks] = useState([
    { id: 1, title: "Optimize MongoDB aggregation pipeline", status: "done", priority: "High" },
    { id: 2, title: "Implement Redis token bucket rate limiting", status: "in_progress", priority: "Critical" },
    { id: 3, title: "React 19 Server Actions integration", status: "in_progress", priority: "Medium" },
    { id: 4, title: "Deploy WebSocket notification microservice", status: "todo", priority: "Low" },
  ]);

  // AuraCommerce state
  const [cartCount, setCartCount] = useState(2);
  const [cartTotal, setCartTotal] = useState(388);
  const [addedItem, setAddedItem] = useState<string | null>(null);

  // CryptoPulse state
  const [btcPrice, setBtcPrice] = useState(88420);
  const [priceFlash, setPriceFlash] = useState<"up" | "down" | null>(null);

  // NeuroDoc AI state
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState(
    "Welcome to NeuroDoc! Ask any question about your codebase, APIs, or architectural schemas to generate instant streaming documentation."
  );
  const [isGenerating, setIsGenerating] = useState(false);

  // CloudMatrix state
  const [logs, setLogs] = useState([
    "[16:42:01] pod/worker-7bf98c21-9x READY (2/2 containers)",
    "[16:42:03] ingress-nginx routing table updated (HTTP 200)",
    "[16:42:05] MongoDB replica set primary status: HEALTHY",
    "[16:42:09] Telemetry metric stream connected via gRPC",
  ]);

  // PulseSync state
  const [upvotes, setUpvotes] = useState(42);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState([
    { author: "DevAlpha", text: "The sub-10ms response times using Next.js route caching are insane!" },
    { author: "CodeNinja", text: "Great documentation structure. Loving the interactive visualizer." },
  ]);

  // Simulated live crypto ticker fluctuations
  useEffect(() => {
    if (project.slug !== "cryptopulse-mern-defi") return;
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.48) * 120;
      setBtcPrice((prev) => {
        const next = Math.round((prev + delta) * 100) / 100;
        setPriceFlash(delta >= 0 ? "up" : "down");
        setTimeout(() => setPriceFlash(null), 700);
        return next;
      });
    }, 2800);
    return () => clearInterval(interval);
  }, [project.slug]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handleAddTask = () => {
    const nextId = tasks.length + 1;
    setTasks([
      ...tasks,
      { id: nextId, title: `Task #${nextId}: Verify Edge Middleware headers`, status: "todo", priority: "Normal" },
    ]);
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "done" ? "in_progress" : "done" }
          : t
      )
    );
  };

  const handleAddToCart = (item: string, price: number) => {
    setCartCount((c) => c + 1);
    setCartTotal((t) => t + price);
    setAddedItem(item);
    setTimeout(() => setAddedItem(null), 1800);
  };

  const handleSendPrompt = (promptText?: string) => {
    const q = promptText || aiPrompt;
    if (!q) return;
    setIsGenerating(true);
    setAiResponse("Thinking & querying Pinecone vector index for relevant documentation...");
    setTimeout(() => {
      setAiResponse(
        `Generated documentation for: "${q}"\n\n### Architectural Summary\nUsing Next.js 15 App Router alongside MongoDB Mongoose models allows strict schema validation combined with React Server Components for zero client JavaScript overhead.\n\n\`\`\`typescript\n// Dynamic Route Handler\nexport async function GET(req: Request) {\n  const data = await Model.find().lean();\n  return Response.json(data);\n}\n\`\`\``
      );
      setIsGenerating(false);
      setAiPrompt("");
    }, 1100);
  };

  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setReplies([...replies, { author: "You", text: replyText.trim() }]);
    setReplyText("");
  };

  // Determine viewport width class
  const viewportWidthClass =
    viewport === "mobile"
      ? "max-w-[390px]"
      : viewport === "tablet"
      ? "max-w-[768px]"
      : "w-full";

  return (
    <div className="space-y-4">
      {/* Top Controls Bar: Viewport Toggles, Mode Switcher & External Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#170e18]/90 border border-rose-900/30 px-4 py-2.5 rounded-2xl">
        {/* Device Switchers */}
        <div className="flex items-center gap-1 bg-[#231524] p-1 rounded-xl border border-rose-400/15">
          <button
            type="button"
            onClick={() => setViewport("desktop")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              viewport === "desktop"
                ? "bg-[#d8829d] text-white shadow-sm"
                : "text-rose-200/70 hover:text-white"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setViewport("tablet")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              viewport === "tablet"
                ? "bg-[#d8829d] text-white shadow-sm"
                : "text-rose-200/70 hover:text-white"
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            type="button"
            onClick={() => setViewport("mobile")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              viewport === "mobile"
                ? "bg-[#d8829d] text-white shadow-sm"
                : "text-rose-200/70 hover:text-white"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* Mode Switcher (Interactive App Simulator vs Live Iframe) */}
        <div className="flex items-center gap-2">
          {project.liveUrl && (
            <div className="flex items-center gap-1 bg-[#231524] p-1 rounded-xl border border-rose-400/15 text-xs">
              <button
                type="button"
                onClick={() => setMode("interactive")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  mode === "interactive"
                    ? "bg-[#d8829d]/20 text-[#f3c1cf] border border-[#d8829d]/40"
                    : "text-rose-200/60 hover:text-rose-100"
                }`}
              >
                Interactive App
              </button>
              <button
                type="button"
                onClick={() => setMode("live-iframe")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  mode === "live-iframe"
                    ? "bg-[#d8829d]/20 text-[#f3c1cf] border border-[#d8829d]/40"
                    : "text-rose-200/60 hover:text-rose-100"
                }`}
              >
                Direct Webview
              </button>
            </div>
          )}

          {/* Dedicated Page Fullscreen Link (if embedded) */}
          {embedded && (
            <Link
              href={`/projects/${project.slug}/website`}
              className="p-1.5 rounded-xl bg-[#231524] hover:bg-[#342235] text-rose-200 hover:text-white border border-rose-400/15 transition-colors"
              title="Open dedicated preview page"
            >
              <Maximize2 className="w-4 h-4" />
            </Link>
          )}

          {/* Open live URL in external window */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#c06c84] to-[#d8829d] hover:brightness-110 transition-all shadow-md shadow-rose-950/40"
            >
              <span>Open External</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Browser Mockup Window */}
      <div
        className={`mx-auto transition-all duration-300 ${viewportWidthClass} rounded-3xl overflow-hidden border border-rose-900/40 bg-[#140b15] shadow-2xl`}
      >
        {/* Browser Chrome Header */}
        <div className="bg-[#1b101d] px-4 py-3 border-b border-rose-900/30 flex items-center justify-between gap-3">
          {/* Traffic light window controls */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block border border-red-400/50" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block border border-yellow-400/50" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block border border-green-400/50" />
          </div>

          {/* Address Bar */}
          <div className="flex-1 max-w-xl mx-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#110812] border border-rose-900/40 text-xs font-mono text-rose-200/80">
            <Lock className="w-3 h-3 text-[#7eb898] shrink-0" />
            <span className="text-[#7eb898] font-bold text-[11px]">https://</span>
            <span className="truncate">
              {project.liveUrl
                ? project.liveUrl.replace(/^https?:\/\//, "")
                : `${project.slug}.devpulse.app`}
            </span>
            <span className="ml-auto text-[10px] text-rose-400/40 bg-rose-500/10 px-1.5 py-0.5 rounded">
              SSL Verified
            </span>
          </div>

          {/* Refresh button */}
          <button
            type="button"
            onClick={handleRefresh}
            className={`p-1 text-rose-300/70 hover:text-white transition-all ${
              isRefreshing ? "animate-spin text-[#d8829d]" : ""
            }`}
            title="Reload website preview"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Website Content Area */}
        <div className="min-h-[520px] max-h-[750px] overflow-y-auto bg-[#160c18] text-rose-100 relative">
          {mode === "live-iframe" && project.liveUrl ? (
            <div className="w-full h-[600px] relative">
              <iframe
                src={project.liveUrl}
                title={project.title}
                className="w-full h-full border-0 bg-white"
                onError={() => setIframeError(true)}
              />
              {iframeError && (
                <div className="absolute inset-0 bg-[#160c18]/95 flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <Globe className="w-12 h-12 text-[#d8829d]" />
                  <h4 className="text-base font-bold text-white">External Site Protection</h4>
                  <p className="text-xs text-rose-200/70 max-w-md">
                    This domain restricts iframe embedding via browser security headers (X-Frame-Options).
                    Click below to open the website directly in a new window:
                  </p>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#c06c84] to-[#d8829d] flex items-center gap-2"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ) : (
            /* INTERACTIVE LIVE APPLICATION SIMULATIONS */
            <div className="p-6 space-y-6">
              {/* App Navbar Simulation */}
              <div className="flex items-center justify-between pb-4 border-b border-rose-900/30">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#c06c84] to-[#d8829d] flex items-center justify-center text-white font-black text-sm shadow-md">
                    {project.title.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{project.title.split("-")[0]}</h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live Production v2.4.0</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-[#231524] border border-rose-400/20 text-rose-200 text-[11px] font-medium">
                    {project.stack} Core
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRefresh()}
                    className="px-3 py-1 rounded-xl bg-[#2b172d] hover:bg-[#381e3a] text-white text-[11px] font-semibold transition-colors"
                  >
                    Sync State
                  </button>
                </div>
              </div>

              {/* PROJECT-SPECIFIC INTERACTIVE LIVE EXPERIENCES */}

              {/* 1. NEXUSFLOW (MERN SaaS Kanban & Team Sprint) */}
              {project.slug === "nexusflow-mern-saas" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-[#1f1221] border border-rose-900/30">
                      <div className="text-xs text-rose-300/60 font-semibold mb-1">Sprint Velocity</div>
                      <div className="text-2xl font-black text-white font-mono">48 pts / wk</div>
                      <div className="text-[11px] text-emerald-400 mt-1">▲ 14% vs last cycle</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#1f1221] border border-rose-900/30">
                      <div className="text-xs text-rose-300/60 font-semibold mb-1">MongoDB Latency</div>
                      <div className="text-2xl font-black text-[#f3c1cf] font-mono">4.2 ms</div>
                      <div className="text-[11px] text-rose-300/60 mt-1">Read preference: Secondary</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#1f1221] border border-rose-900/30">
                      <div className="text-xs text-rose-300/60 font-semibold mb-1">Active Team Members</div>
                      <div className="text-2xl font-black text-white font-mono">18 Online</div>
                      <div className="text-[11px] text-[#7eb898] mt-1">WebSocket connected</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-rose-200">
                        Interactive MERN Kanban Tasks ({tasks.length})
                      </h4>
                      <button
                        type="button"
                        onClick={handleAddTask}
                        className="px-3 py-1 rounded-lg text-xs font-bold bg-[#d8829d] text-white hover:brightness-110"
                      >
                        + Add Task
                      </button>
                    </div>

                    <div className="space-y-2">
                      {tasks.map((task) => (
                        <div
                          key={task.id}
                          onClick={() => toggleTask(task.id)}
                          className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            task.status === "done"
                              ? "bg-[#180e1a]/60 border-emerald-500/30 opacity-70"
                              : "bg-[#221324] border-rose-400/20 hover:border-[#d8829d]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                                task.status === "done"
                                  ? "bg-emerald-500 border-emerald-400 text-white"
                                  : "border-rose-400/40"
                              }`}
                            >
                              {task.status === "done" && <CheckCircle2 className="w-3.5 h-3.5" />}
                            </div>
                            <span
                              className={`text-xs font-medium ${
                                task.status === "done" ? "line-through text-rose-300/50" : "text-white"
                              }`}
                            >
                              {task.title}
                            </span>
                          </div>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              task.priority === "Critical"
                                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                                : task.priority === "High"
                                ? "bg-[#e2a76f]/20 text-[#f3c99f] border border-[#e2a76f]/40"
                                : "bg-[#7eb898]/20 text-[#9ad4b4] border border-[#7eb898]/40"
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. AURACOMMERCE (Next.js App Router Headless Storefront) */}
              {project.slug === "auracommerce-nextjs" && (
                <div className="space-y-6">
                  {/* Storefront Header */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[#29172c] to-[#1f1122] border border-rose-900/30 flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white">Spring Minimalist Collection</h4>
                      <p className="text-xs text-rose-200/70">Edge-rendered catalog with instant cart checkout</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#140b15] border border-rose-400/20">
                      <ShoppingCart className="w-4 h-4 text-[#f3c1cf]" />
                      <span className="text-xs font-bold text-white">{cartCount} Items</span>
                      <span className="text-xs font-mono text-[#d8829d] font-bold">${cartTotal}</span>
                    </div>
                  </div>

                  {addedItem && (
                    <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs text-center font-semibold animate-pulse">
                      ✓ Added {addedItem} to bag!
                    </div>
                  )}

                  {/* Product Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { name: "Nordic Minimalist Desk Lamp", price: 129, tag: "Best Seller" },
                      { name: "Noise-Cancelling Studio Pods", price: 189, tag: "New Arrival" },
                      { name: "Ergonomic Mechanical Keyboard", price: 159, tag: "In Stock" },
                    ].map((item) => (
                      <div
                        key={item.name}
                        className="p-4 rounded-2xl bg-[#201222] border border-rose-400/20 flex flex-col justify-between space-y-4 hover:border-[#d8829d] transition-colors"
                      >
                        <div className="space-y-1.5">
                          <span className="text-[10px] uppercase font-bold text-[#e2a76f] bg-[#e2a76f]/15 px-2 py-0.5 rounded-md">
                            {item.tag}
                          </span>
                          <h5 className="text-xs font-bold text-white leading-snug">{item.name}</h5>
                          <div className="text-sm font-black text-[#f3c1cf] font-mono">${item.price}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleAddToCart(item.name, item.price)}
                          className="w-full py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#c06c84] to-[#d8829d] hover:brightness-110 active:scale-95 transition-all shadow-md shadow-rose-950/40"
                        >
                          Add to Bag
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. CRYPTOPULSE (MERN DeFi Streaming Analytics) */}
              {project.slug === "cryptopulse-mern-defi" && (
                <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-[#1e1120] border border-rose-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-semibold text-rose-300/60 uppercase tracking-wider">
                        BTC / USD • MongoDB TimeSeries Feed
                      </span>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-3xl font-black text-white font-mono">
                          ${btcPrice.toLocaleString()}
                        </span>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                            priceFlash === "up"
                              ? "bg-emerald-500/30 text-emerald-300"
                              : priceFlash === "down"
                              ? "bg-rose-500/30 text-rose-300"
                              : "bg-emerald-500/15 text-emerald-400"
                          }`}
                        >
                          ▲ +3.42% 24h
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-rose-300/60">Simulated 24h Volume</div>
                      <div className="text-sm font-bold text-white font-mono">$1,420,850,290</div>
                    </div>
                  </div>

                  {/* Visual Candlestick / Depth Bars */}
                  <div className="p-4 rounded-2xl bg-[#170e19] border border-rose-900/30 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-rose-300/60 font-mono">
                      <span>Order Depth & High-DPI Canvas Ticks</span>
                      <span className="text-emerald-400">● 60 FPS WebSocket Stream</span>
                    </div>
                    <div className="h-28 flex items-end gap-1 pt-4">
                      {[40, 65, 55, 80, 70, 95, 85, 110, 90, 105, 120, 100, 115, 130, 125, 140].map(
                        (h, i) => (
                          <div
                            key={i}
                            style={{ height: `${h}%` }}
                            className={`flex-1 rounded-t transition-all duration-300 ${
                              i % 2 === 0
                                ? "bg-gradient-to-t from-emerald-500/40 to-emerald-400"
                                : "bg-gradient-to-t from-[#c06c84]/40 to-[#d8829d]"
                            }`}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 4. NEURODOC (AI Knowledge Studio) */}
              {project.slug === "neurodoc-nextjs-ai" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#1c111e] border border-rose-900/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#d8829d]" />
                        <span className="text-xs font-bold text-white">AI Documentation Engine</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#7eb898] bg-[#7eb898]/15 px-2 py-0.5 rounded">
                        Pinecone Vector RAG Ready
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#120913] border border-rose-900/30 text-xs leading-relaxed text-rose-100 whitespace-pre-wrap font-mono">
                      {aiResponse}
                      {isGenerating && <span className="animate-pulse ml-1 text-[#d8829d]">▋</span>}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="text-[11px] text-rose-300/60 font-semibold self-center">Try prompt:</span>
                      {[
                        "How does ISR work in Next.js?",
                        "Generate Mongoose Schema",
                        "Explain JWT session tokens",
                      ].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => handleSendPrompt(p)}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-[#251527] hover:bg-[#341c37] text-rose-200 border border-rose-400/20 transition-colors"
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input bar */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendPrompt()}
                      placeholder="Ask the AI doc generator anything about this architecture..."
                      className="flex-1 px-4 py-2.5 rounded-xl bg-[#1e1120] border border-rose-400/20 text-xs text-rose-100 placeholder-rose-300/40 focus:outline-none focus:border-[#d8829d]"
                    />
                    <button
                      type="button"
                      onClick={() => handleSendPrompt()}
                      disabled={isGenerating}
                      className="px-4 py-2.5 rounded-xl bg-[#d8829d] hover:brightness-110 text-white text-xs font-bold flex items-center gap-1.5 transition-all disabled:opacity-50"
                    >
                      <span>Generate</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* 5. CLOUDMATRIX (Full-Stack DevOps) */}
              {project.slug === "cloudmatrix-devops-portal" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: "Cluster Status", val: "Operational", color: "text-emerald-400" },
                      { label: "CPU Utilization", val: "28.4%", color: "text-white" },
                      { label: "Memory Allocated", val: "4.8 / 16 GB", color: "text-white" },
                      { label: "Active Pods", val: "32 Running", color: "text-[#f3c1cf]" },
                    ].map((m) => (
                      <div key={m.label} className="p-3 rounded-xl bg-[#1e1120] border border-rose-900/30">
                        <div className="text-[10px] text-rose-300/60 uppercase">{m.label}</div>
                        <div className={`text-sm font-black font-mono mt-0.5 ${m.color}`}>{m.val}</div>
                      </div>
                    ))}
                  </div>

                  {/* Live Terminal Stream */}
                  <div className="rounded-2xl bg-[#0e0710] border border-rose-900/40 p-4 font-mono text-xs space-y-2">
                    <div className="flex items-center justify-between text-rose-400/70 border-b border-rose-900/30 pb-2">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-[#d8829d]" />
                        <span>Live Kubernetes Pod Logs</span>
                      </div>
                      <span className="text-[10px] text-emerald-400">Stream Active</span>
                    </div>
                    <div className="space-y-1 text-[11px] text-rose-200/80">
                      {logs.map((log, idx) => (
                        <div key={idx}>{log}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 6. PULSESYNC (MERN Developer Community) */}
              {project.slug === "pulsesync-mern-community" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#1e1120] border border-rose-900/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">
                        Thread: Best practices for Next.js App Router caching with MongoDB?
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setUpvotes((v) => (hasUpvoted ? v - 1 : v + 1));
                          setHasUpvoted(!hasUpvoted);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                          hasUpvoted
                            ? "bg-[#d8829d] text-white"
                            : "bg-[#271629] text-rose-200 hover:text-white"
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{upvotes}</span>
                      </button>
                    </div>

                    {/* Replies */}
                    <div className="space-y-2 pt-2 border-t border-rose-900/30">
                      {replies.map((r, i) => (
                        <div key={i} className="p-3 rounded-xl bg-[#140b15] text-xs space-y-1">
                          <span className="font-bold text-[#f3c1cf]">{r.author}:</span>
                          <p className="text-rose-200/80">{r.text}</p>
                        </div>
                      ))}
                    </div>

                    {/* Quick reply */}
                    <form onSubmit={handleAddReply} className="flex gap-2 pt-1">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a quick comment..."
                        className="flex-1 px-3.5 py-2 rounded-xl bg-[#130b14] border border-rose-400/20 text-xs text-rose-100 placeholder-rose-300/40 focus:outline-none focus:border-[#d8829d]"
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-2 rounded-xl bg-[#d8829d] text-white text-xs font-bold hover:brightness-110"
                      >
                        Post
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* DEFAULT FALLBACK FOR ANY USER-CREATED PROJECT */}
              {![
                "nexusflow-mern-saas",
                "auracommerce-nextjs",
                "cryptopulse-mern-defi",
                "neurodoc-nextjs-ai",
                "cloudmatrix-devops-portal",
                "pulsesync-mern-community",
              ].includes(project.slug) && (
                <div className="p-8 rounded-3xl bg-[#1d111f] border border-rose-900/30 text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#c06c84] to-[#d8829d] flex items-center justify-center text-white mx-auto shadow-lg">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">{project.title}</h4>
                  <p className="text-xs text-rose-100/75 max-w-lg mx-auto leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg bg-[#271529] border border-rose-400/20 text-xs text-rose-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {project.liveUrl && (
                    <div className="pt-2">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#c06c84] to-[#d8829d] hover:brightness-110 shadow-lg"
                      >
                        <span>Open Live Deployment</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Browser Status Bar Footer */}
        <div className="bg-[#1b101d] px-4 py-2 border-t border-rose-900/30 flex items-center justify-between text-[11px] text-rose-300/60 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <span>Connected: 200 OK • Next.js App Router (Turbopack)</span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span>Viewport: {viewport.toUpperCase()}</span>
            <span>Stack: {project.stack}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
