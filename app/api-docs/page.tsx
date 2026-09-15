import { ApiTester } from "@/components/api-tester";
import { Terminal, Code2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Documentation & Interactive Playground",
  description: "Test and inspect Next.js App Router REST Route Handlers in real-time with dusty pink styling.",
};

export default function ApiDocsPage() {
  const ENDPOINTS = [
    {
      method: "GET",
      route: "/api/projects",
      description: "Query and filter all projects by stack, search term, or featured status.",
      params: "Optional: ?stack=MERN&search=nexus&featured=true",
    },
    {
      method: "POST",
      route: "/api/projects",
      description: "Submit a new project document to the MongoDB database collection.",
      params: "JSON body containing title, description, stack, technologies, githubUrl",
    },
    {
      method: "GET",
      route: "/api/projects/[id]",
      description: "Retrieve a specific project along with all associated user reviews.",
      params: "Route param: project ID or slug string",
    },
    {
      method: "PUT",
      route: "/api/projects/[id]",
      description: "Perform partial updates such as upvoting or incrementing metrics.",
      params: 'JSON body: { "action": "upvote" }',
    },
    {
      method: "DELETE",
      route: "/api/projects/[id]",
      description: "Remove a project document from the persistent storage layer.",
      params: "Route param: project ID or slug string",
    },
    {
      method: "GET",
      route: "/api/stats",
      description: "Retrieve platform KPIs, star counts, and MongoDB cluster connectivity status.",
      params: "None",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d8829d] uppercase tracking-wider">
          <Terminal className="w-3.5 h-3.5" /> Next.js Route Handlers
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          REST API Documentation & Playground
        </h1>
        <p className="text-xs sm:text-sm text-rose-200/60 max-w-3xl leading-relaxed">
          In Next.js App Router, Route Handlers replace traditional Express.js routers while granting access to the Web Request and Response standards, edge runtimes, streaming, and caching headers.
        </p>
      </div>

      {/* Live Interactive API Tester Console */}
      <ApiTester />

      {/* Endpoints Reference Grid */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Code2 className="w-5 h-5 text-[#7eb898]" /> Complete Endpoint Reference
          </h2>
          <p className="text-xs text-rose-200/60 mt-1">
            All endpoints are live and hosted in the <code>app/api/</code> directory of this repository.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ENDPOINTS.map((ep, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl p-5 border border-rose-900/30 space-y-2.5"
            >
              <div className="flex items-center gap-2 font-mono text-xs">
                <span
                  className={`px-2 py-0.5 rounded font-black text-[10px] ${
                    ep.method === "GET"
                      ? "bg-[#7eb898]/20 text-[#9ad4b4]"
                      : ep.method === "POST"
                      ? "bg-rose-500/20 text-rose-300"
                      : ep.method === "DELETE"
                      ? "bg-rose-700/20 text-rose-400"
                      : "bg-[#e2a76f]/20 text-[#e2a76f]"
                  }`}
                >
                  {ep.method}
                </span>
                <span className="text-white font-semibold">{ep.route}</span>
              </div>
              <p className="text-xs text-rose-100/80">{ep.description}</p>
              <p className="text-[11px] text-rose-300/50 font-mono">
                Payload / Params: {ep.params}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
