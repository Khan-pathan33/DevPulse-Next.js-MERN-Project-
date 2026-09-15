"use client";

import { useState } from "react";
import { Play, Copy, Check, Terminal, RefreshCw } from "lucide-react";

interface Endpoint {
  method: "GET" | "POST" | "DELETE" | "PUT";
  path: string;
  description: string;
  defaultPayload?: string;
}

const PRESET_ENDPOINTS: Endpoint[] = [
  {
    method: "GET",
    path: "/api/projects",
    description: "Fetches list of all projects with optional query params (?stack=MERN&search=nexus)",
  },
  {
    method: "GET",
    path: "/api/projects/mern-saas-nexus",
    description: "Fetches dynamic single project by ID or slug along with user reviews",
  },
  {
    method: "GET",
    path: "/api/stats",
    description: "Fetches system analytics, star counts, and MongoDB cluster status",
  },
  {
    method: "POST",
    path: "/api/projects",
    description: "Creates a new project via JSON body",
    defaultPayload: JSON.stringify(
      {
        title: "OmniSearch AI - MERN Semantic Engine",
        description: "Vector similarity search with MongoDB Atlas Vector Search and Express stream handlers.",
        stack: "AI",
        technologies: ["MongoDB Atlas", "Express", "React 19", "Node.js", "OpenAI"],
        githubUrl: "https://github.com/example/omnisearch-ai",
        liveUrl: "https://omnisearch.dev",
      },
      null,
      2
    ),
  },
];

export function ApiTester() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint>(PRESET_ENDPOINTS[0]);
  const [customPath, setCustomPath] = useState(PRESET_ENDPOINTS[0].path);
  const [payload, setPayload] = useState(PRESET_ENDPOINTS[0].defaultPayload || "");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const selectPreset = (ep: Endpoint) => {
    setSelectedEndpoint(ep);
    setCustomPath(ep.path);
    setPayload(ep.defaultPayload || "");
    setResponse(null);
    setStatusCode(null);
    setResponseTime(null);
  };

  const handleSend = async () => {
    setLoading(true);
    const start = performance.now();

    try {
      const options: RequestInit = {
        method: selectedEndpoint.method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (selectedEndpoint.method === "POST" && payload) {
        options.body = payload;
      }

      const res = await fetch(customPath, options);
      const latency = Math.round(performance.now() - start);
      setResponseTime(latency);
      setStatusCode(res.status);

      const json = await res.json();
      setResponse(json);
    } catch (err: any) {
      setStatusCode(500);
      setResponse({ error: err.message || "Failed to make request" });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!response) return;
    navigator.clipboard.writeText(JSON.stringify(response, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-rose-900/30 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#d8829d]" />
            Live Next.js Route Handlers Console
          </h2>
          <p className="text-xs text-rose-200/60 mt-1">
            Test Next.js <code>app/api/...</code> endpoints directly inside the browser with real-time response rendering.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap gap-1.5">
          {PRESET_ENDPOINTS.map((ep, i) => (
            <button
              key={i}
              onClick={() => selectPreset(ep)}
              className={`btn-bouncy-subtle px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                selectedEndpoint.path === ep.path && selectedEndpoint.method === ep.method
                  ? "bg-[#c06c84] text-white shadow-md shadow-rose-900/30 border border-rose-300/30"
                  : "bg-[#251825]/80 text-rose-100/70 hover:bg-[#321f31] border border-rose-400/15"
              }`}
            >
              {ep.method} {ep.path.split("?")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* URL / Method Input Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1a111c] border border-rose-900/40 shrink-0">
          <span
            className={`text-xs font-black px-2 py-0.5 rounded ${
              selectedEndpoint.method === "GET"
                ? "bg-[#7eb898]/20 text-[#9ad4b4]"
                : "bg-rose-500/20 text-rose-300"
            }`}
          >
            {selectedEndpoint.method}
          </span>
        </div>

        <input
          type="text"
          value={customPath}
          onChange={(e) => setCustomPath(e.target.value)}
          placeholder="/api/projects"
          className="flex-1 px-4 py-2.5 rounded-xl bg-[#1a111c]/90 border border-rose-400/20 text-sm font-mono text-rose-100 focus:outline-none focus:border-[#d8829d]"
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="btn-bouncy px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#c06c84] to-[#d8829d] hover:from-[#d8829d] hover:to-[#c06c84] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-rose-900/30"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4 fill-white" />
          )}
          <span>Execute</span>
        </button>
      </div>

      {/* Body Payload if POST */}
      {selectedEndpoint.method === "POST" && (
        <div className="mb-4">
          <label className="block text-xs font-semibold text-rose-200/80 mb-1.5">
            JSON Request Body (POST):
          </label>
          <textarea
            rows={6}
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-[#140d16] font-mono text-xs text-rose-200 border border-rose-900/40 focus:outline-none focus:border-[#d8829d]"
          />
        </div>
      )}

      {/* Response Box */}
      <div className="rounded-2xl bg-[#130b15] border border-rose-900/30 overflow-hidden">
        <div className="px-4 py-2.5 bg-[#1b101c]/80 border-b border-rose-900/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-rose-300/70">Response</span>
            {statusCode && (
              <span
                className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                  statusCode >= 200 && statusCode < 300
                    ? "bg-[#7eb898]/20 text-[#9ad4b4] border border-[#7eb898]/30"
                    : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                }`}
              >
                {statusCode} {statusCode === 200 ? "OK" : statusCode === 201 ? "CREATED" : "ERROR"}
              </span>
            )}
            {responseTime !== null && (
              <span className="text-rose-400/50 font-mono text-[11px]">
                {responseTime} ms
              </span>
            )}
          </div>

          {response && (
            <button
              onClick={copyToClipboard}
              className="btn-bouncy-subtle flex items-center gap-1.5 text-rose-300/70 hover:text-white transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#9ad4b4]" />
                  <span className="text-[#9ad4b4] text-[11px]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Copy JSON</span>
                </>
              )}
            </button>
          )}
        </div>

        <div className="p-4 overflow-x-auto max-h-[380px] font-mono text-xs text-rose-100/90 leading-relaxed">
          {loading ? (
            <div className="flex items-center gap-2 text-rose-300/60 py-6">
              <RefreshCw className="w-4 h-4 animate-spin text-[#d8829d]" />
              <span>Fetching from Next.js Node.js Route Handler...</span>
            </div>
          ) : response ? (
            <pre className="text-[#f3c1cf]">
              {JSON.stringify(response, null, 2)}
            </pre>
          ) : (
            <div className="text-rose-300/40 py-6 italic text-center">
              Click &quot;Execute&quot; to inspect the live response from the server route.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
