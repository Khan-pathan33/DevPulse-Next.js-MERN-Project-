"use client";

import { useState, useEffect } from "react";
import {
  Database,
  Sparkles,
  Zap,
  Activity,
  Layers,
  RefreshCw,
  Cpu,
  Radio,
  Share2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface PipelineEvent {
  id: string;
  source: string;
  action: string;
  latency: string;
  status: string;
  color: string;
}

const LIVE_EVENTS: PipelineEvent[] = [
  {
    id: "evt-1",
    source: "React 19 Client",
    action: "Optimistic State Dispatched via useActionState",
    latency: "0.4ms",
    status: "OPTIMISTIC",
    color: "#d8829d",
  },
  {
    id: "evt-2",
    source: "Server Action",
    action: "Direct MongoDB Mutation with 'use server' RPC",
    latency: "1.8ms",
    status: "COMMITTED",
    color: "#e2a76f",
  },
  {
    id: "evt-3",
    source: "MongoDB Atlas",
    action: "Mongoose Change Stream synced to Replica Set",
    latency: "2.6ms",
    status: "SYNCED",
    color: "#7eb898",
  },
  {
    id: "evt-4",
    source: "Next.js Edge ISR",
    action: "Cache Invalidation revalidatePath('/projects') broadcast",
    latency: "0.6ms",
    status: "PURGED",
    color: "#c06c84",
  },
  {
    id: "evt-5",
    source: "React Server Component",
    action: "Streaming Zero-Bundle HTML payload emitted to browser",
    latency: "1.2ms",
    status: "0 KB JS",
    color: "#f0afc3",
  },
];

export function HeroLiveVisualizer() {
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [pulseCount, setPulseCount] = useState(248);
  const [isSuperPulsing, setIsSuperPulsing] = useState(false);
  const [lastActionName, setLastActionName] = useState<string>("Autonomous Stream Active");

  // Cycle real-time event pipeline
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveEventIndex((prev) => (prev + 1) % LIVE_EVENTS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const triggerSimulation = (name: string) => {
    setIsSuperPulsing(true);
    setPulseCount((prev) => prev + 1);
    setLastActionName(name);
    setTimeout(() => setIsSuperPulsing(false), 900);
  };

  const currentEvt = LIVE_EVENTS[activeEventIndex];

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Background Ambient Multi-Orb Glows */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-[#c06c84]/25 via-[#d8829d]/20 to-[#e2a76f]/25 rounded-3xl blur-2xl pointer-events-none -z-10 animate-pulse-ring" />

      {/* Floating Satellite 1 - Top Left: MongoDB Status */}
      <div
        onClick={() => triggerSimulation("MongoDB Replica Pulse")}
        className="absolute -top-6 -left-3 z-30 animate-float-slow hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-2xl glass-panel border border-[#7eb898]/40 shadow-xl bg-[#1c121d]/90 btn-bouncy cursor-pointer select-none"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7eb898] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7eb898]"></span>
        </span>
        <span className="text-xs font-bold text-[#9ad4b4]">🍃 MongoDB 7.0 Active</span>
      </div>

      {/* Floating Satellite 2 - Top Right: React 19 Client */}
      <div
        onClick={() => triggerSimulation("React 19 Optimistic Pulse")}
        className="absolute -top-6 -right-3 z-30 animate-float-delayed hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-2xl glass-panel border border-rose-400/40 shadow-xl bg-[#1c121d]/90 btn-bouncy cursor-pointer select-none"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#d8829d]" />
        <span className="text-xs font-bold text-[#f3c1cf]">⚛ React 19 RSC Core</span>
      </div>

      {/* Floating Satellite 3 - Bottom Right: Zero Client JS */}
      <div
        onClick={() => triggerSimulation("Server Action RPC Pulse")}
        className="absolute -bottom-5 -right-2 z-30 animate-float-reverse hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-2xl glass-panel border border-[#e2a76f]/40 shadow-xl bg-[#1c121d]/90 btn-bouncy cursor-pointer select-none"
      >
        <Zap className="w-3.5 h-3.5 text-[#e2a76f]" />
        <span className="text-xs font-bold text-[#f3c99f]">⚡ 0 KB Client Bundle</span>
      </div>

      {/* Main Holographic Architecture Matrix HUD Panel */}
      <div className="glass-panel rounded-3xl border border-rose-900/40 shadow-2xl bg-[#160d18]/95 overflow-hidden transition-all duration-300">
        
        {/* HUD Top Bar */}
        <div className="px-5 py-3.5 bg-[#1e1320] border-b border-rose-900/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d8829d] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d8829d]"></span>
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black tracking-wider uppercase text-white">
                Live Full-Stack Mesh
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-rose-500/15 text-[#f3c1cf] border border-rose-400/25 hidden sm:inline">
                MERN • Next.js 16
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <Radio className="w-3.5 h-3.5 text-[#7eb898] animate-pulse" />
            <span className="text-[#9ad4b4] text-[11px] font-bold">1,480 req/s</span>
          </div>
        </div>

        {/* Dynamic Interactive SVG Canvas & Reactor Mesh */}
        <div className="relative h-[290px] sm:h-[320px] w-full flex items-center justify-center overflow-hidden bg-[#120914] select-none">
          
          {/* Concentric Holographic Radar Grid Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
            <div className="w-[120px] h-[120px] rounded-full border border-dashed border-rose-400/40" />
            <div className="w-[220px] h-[220px] rounded-full border border-rose-400/30" />
            <div className="w-[320px] h-[320px] rounded-full border border-dashed border-rose-400/20" />
          </div>

          {/* Rotating Orbital Radar Sweep Ring */}
          <div className="absolute w-[240px] h-[240px] rounded-full border-2 border-t-[#d8829d]/60 border-r-transparent border-b-[#7eb898]/40 border-l-transparent animate-spin-slow pointer-events-none" />
          <div className="absolute w-[300px] h-[300px] rounded-full border border-t-transparent border-r-[#e2a76f]/40 border-b-transparent border-l-[#c06c84]/40 animate-spin-reverse-slow pointer-events-none" />

          {/* SVG Glowing Synapse Pathway Beams */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 460 300">
            <defs>
              <linearGradient id="beam-mongo" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7eb898" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#d8829d" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="beam-react" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#d8829d" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#e2a76f" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="beam-isr" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#c06c84" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#d8829d" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="beam-action" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#e2a76f" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#d8829d" stopOpacity="0.8" />
              </linearGradient>

              {/* Radial glow filter for energy sparks */}
              <filter id="glow-spark" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connecting Circuit Lines to Core */}
            {/* Top-Left to Center */}
            <path
              id="path-mongo"
              d="M 85 65 Q 160 110 230 150"
              fill="none"
              stroke="url(#beam-mongo)"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="opacity-70"
            />
            {/* Top-Right to Center */}
            <path
              id="path-react"
              d="M 375 65 Q 300 110 230 150"
              fill="none"
              stroke="url(#beam-react)"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="opacity-70"
            />
            {/* Bottom-Left to Center */}
            <path
              id="path-isr"
              d="M 85 235 Q 160 190 230 150"
              fill="none"
              stroke="url(#beam-isr)"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="opacity-70"
            />
            {/* Bottom-Right to Center */}
            <path
              id="path-action"
              d="M 375 235 Q 300 190 230 150"
              fill="none"
              stroke="url(#beam-action)"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="opacity-70"
            />

            {/* Outer Perimeter Synapse Cross-Connections */}
            <path
              d="M 85 65 Q 230 30 375 65"
              fill="none"
              stroke="rgba(244, 194, 209, 0.2)"
              strokeWidth="1.5"
            />
            <path
              d="M 85 235 Q 230 270 375 235"
              fill="none"
              stroke="rgba(244, 194, 209, 0.2)"
              strokeWidth="1.5"
            />

            {/* Dynamic Animated Traveling Light Pulses (SVG animateMotion) */}
            <circle r="4" fill="#7eb898" filter="url(#glow-spark)">
              <animateMotion repeatCount="indefinite" dur="2.4s" path="M 85 65 Q 160 110 230 150" />
            </circle>

            <circle r="4" fill="#f0afc3" filter="url(#glow-spark)">
              <animateMotion repeatCount="indefinite" dur="2.1s" path="M 375 65 Q 300 110 230 150" />
            </circle>

            <circle r="4" fill="#c06c84" filter="url(#glow-spark)">
              <animateMotion repeatCount="indefinite" dur="2.6s" path="M 85 235 Q 160 190 230 150" />
            </circle>

            <circle r="4" fill="#e2a76f" filter="url(#glow-spark)">
              <animateMotion repeatCount="indefinite" dur="1.9s" path="M 375 235 Q 300 190 230 150" />
            </circle>
          </svg>

          {/* Central Holographic Reactor Core */}
          <div
            onClick={() => triggerSimulation("DevPulse Super Core Pulse")}
            className="absolute z-20 flex flex-col items-center justify-center cursor-pointer group btn-bouncy"
            title="Click to trigger full-stack core burst"
          >
            <div className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-transform duration-300 ${isSuperPulsing ? "scale-115" : "group-hover:scale-105"}`}>
              {/* Outer Core Aura */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#c06c84] via-[#d8829d] to-[#e2a76f] opacity-80 blur-md animate-pulse" />
              
              {/* Spinning Reactor Shell */}
              <div className="absolute inset-1 rounded-full bg-[#180d1a] border-2 border-rose-400/50 flex items-center justify-center shadow-2xl">
                {/* Core Icon */}
                <Cpu className={`w-8 h-8 text-[#f3c1cf] transition-all duration-300 ${isSuperPulsing ? "animate-spin text-white" : "group-hover:rotate-45"}`} />
              </div>

              {/* Ping Wave when Super-Pulsing */}
              {isSuperPulsing && (
                <span className="absolute inset-0 rounded-full bg-rose-400/60 animate-ping" />
              )}
            </div>

            <div className="mt-2 text-center">
              <span className="text-[11px] font-black tracking-tight text-white block">
                Next.js 16 Core
              </span>
              <span className="text-[9px] font-mono text-[#f0afc3] font-semibold">
                RSC Pipeline Engine
              </span>
            </div>
          </div>

          {/* Satellite Node 1: Top-Left (MongoDB Atlas) */}
          <div
            onClick={() => {
              setSelectedNode("mongo");
              triggerSimulation("MongoDB Change Stream Pulse");
            }}
            className="absolute top-4 left-4 sm:left-8 z-20 flex flex-col items-center cursor-pointer btn-bouncy group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#1d121e] border-2 border-[#7eb898]/60 flex items-center justify-center shadow-lg group-hover:border-[#7eb898] group-hover:scale-110 transition-all">
              <Database className="w-5 h-5 text-[#7eb898]" />
            </div>
            <span className="text-[11px] font-bold text-white mt-1.5">MongoDB 7.0</span>
            <span className="text-[9px] text-[#9ad4b4] font-mono">&lt; 1.8ms Replica</span>
          </div>

          {/* Satellite Node 2: Top-Right (React 19 Client) */}
          <div
            onClick={() => {
              setSelectedNode("react");
              triggerSimulation("React 19 Optimistic State Pulse");
            }}
            className="absolute top-4 right-4 sm:right-8 z-20 flex flex-col items-center cursor-pointer btn-bouncy group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#1d121e] border-2 border-rose-400/60 flex items-center justify-center shadow-lg group-hover:border-rose-400 group-hover:scale-110 transition-all">
              <Sparkles className="w-5 h-5 text-[#d8829d]" />
            </div>
            <span className="text-[11px] font-bold text-white mt-1.5">React 19</span>
            <span className="text-[9px] text-[#f3c1cf] font-mono">Optimistic UI</span>
          </div>

          {/* Satellite Node 3: Bottom-Left (Edge ISR) */}
          <div
            onClick={() => {
              setSelectedNode("isr");
              triggerSimulation("Edge ISR Revalidation Wave");
            }}
            className="absolute bottom-4 left-4 sm:left-8 z-20 flex flex-col items-center cursor-pointer btn-bouncy group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#1d121e] border-2 border-rose-500/60 flex items-center justify-center shadow-lg group-hover:border-rose-400 group-hover:scale-110 transition-all">
              <Layers className="w-5 h-5 text-[#c06c84]" />
            </div>
            <span className="text-[11px] font-bold text-white mt-1.5">Edge ISR</span>
            <span className="text-[9px] text-[#f0afc3] font-mono">60s Stale Sync</span>
          </div>

          {/* Satellite Node 4: Bottom-Right (Server Actions) */}
          <div
            onClick={() => {
              setSelectedNode("actions");
              triggerSimulation("Server Action RPC Dispatched");
            }}
            className="absolute bottom-4 right-4 sm:right-8 z-20 flex flex-col items-center cursor-pointer btn-bouncy group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#1d121e] border-2 border-[#e2a76f]/60 flex items-center justify-center shadow-lg group-hover:border-[#e2a76f] group-hover:scale-110 transition-all">
              <Zap className="w-5 h-5 text-[#e2a76f]" />
            </div>
            <span className="text-[11px] font-bold text-white mt-1.5">Server Actions</span>
            <span className="text-[9px] text-[#f3c99f] font-mono">&quot;use server&quot; RPC</span>
          </div>
        </div>

        {/* Real-time Dynamic Event Stream Telemetry Banner */}
        <div className="p-4 bg-[#180e1a] border-t border-rose-900/30 space-y-3">
          
          {/* Stream Header with Interactive Bouncy Simulation Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#d8829d] animate-pulse" />
              <span className="text-white font-bold tracking-tight">Active Synapse Stream</span>
              <span className="text-[10px] text-rose-300/60 font-mono">({pulseCount} events)</span>
            </div>

            {/* Interactive Tactile Trigger Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => triggerSimulation("Server Action Mutation")}
                className="btn-bouncy px-2.5 py-1 rounded-lg text-[11px] font-bold text-white bg-gradient-to-r from-[#c06c84] to-[#d8829d] hover:from-[#d8829d] hover:to-[#c06c84] flex items-center gap-1 cursor-pointer shadow-sm shadow-rose-900/40"
              >
                <Zap className="w-3 h-3" />
                <span>Trigger Pulse</span>
              </button>

              <button
                onClick={() => triggerSimulation("MongoDB Replica Sync")}
                className="btn-bouncy px-2.5 py-1 rounded-lg text-[11px] font-bold text-[#9ad4b4] bg-[#7eb898]/15 hover:bg-[#7eb898]/25 border border-[#7eb898]/30 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${isSuperPulsing ? "animate-spin" : ""}`} />
                <span>DB Sync</span>
              </button>
            </div>
          </div>

          {/* Real-time Ticker Ribbon */}
          <div className="p-2.5 rounded-xl bg-[#110713] border border-rose-900/30 flex items-center justify-between gap-3 text-[11px] font-mono transition-all">
            <div className="flex items-center gap-2 truncate">
              <span className="text-[#d8829d] font-black">&gt;</span>
              <span className="text-rose-100 font-semibold truncate">
                {currentEvt.action}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span
                className="px-2 py-0.5 rounded-md text-[10px] font-bold border"
                style={{
                  color: currentEvt.color,
                  borderColor: `${currentEvt.color}50`,
                  backgroundColor: `${currentEvt.color}15`,
                }}
              >
                {currentEvt.status}
              </span>
              <span className="text-rose-300/60 text-[10px]">{currentEvt.latency}</span>
            </div>
          </div>

          {/* Dynamic Frequency Equalizer & Telemetry Gauges */}
          <div className="flex items-center justify-between pt-1 gap-4">
            
            {/* Live Throughput Frequency Equalizer Bars */}
            <div className="flex items-center gap-1">
              {[12, 22, 14, 26, 18, 10, 24, 16, 28, 12, 20, 15].map((h, i) => (
                <div
                  key={i}
                  style={{
                    animationDelay: `${i * 0.12}s`,
                    height: `${isSuperPulsing ? h * 1.3 : h}px`,
                  }}
                  className="w-1 bg-gradient-to-t from-[#c06c84] to-[#f0afc3] rounded-full animate-eq-bar transition-all duration-300"
                />
              ))}
              <span className="text-[10px] text-rose-300/50 font-mono ml-2 hidden sm:inline">
                Live Throughput
              </span>
            </div>

            {/* Quick Micro Stat Pills */}
            <div className="flex items-center gap-2 font-mono text-[10px]">
              <div className="px-2 py-1 rounded-lg bg-[#140c15] border border-rose-950/60 text-rose-300/70">
                DB: <span className="text-[#9ad4b4] font-bold">1.8ms</span>
              </div>
              <div className="px-2 py-1 rounded-lg bg-[#140c15] border border-rose-950/60 text-rose-300/70">
                Core: <span className="text-[#f3c1cf] font-bold">0 KB JS</span>
              </div>
              <div className="px-2 py-1 rounded-lg bg-[#140c15] border border-rose-950/60 text-rose-300/70">
                Hit: <span className="text-[#e2a76f] font-bold">99.4%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
