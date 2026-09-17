import Link from "next/link";
import { Sparkles, Terminal, Code2, Database } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto glass-footer transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#c06c84] flex items-center justify-center text-white shadow-sm shadow-rose-900/40">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">DevPulse</span>
            </div>
            <p className="text-xs text-rose-100/75 leading-relaxed">
              A comprehensive showcase in dusty pink aesthetics demonstrating all modern Next.js App Router paradigms unified with the MERN stack (MongoDB, Express, React 19, Node.js).
            </p>
            <div className="p-3 rounded-xl bg-gradient-to-r from-rose-500/10 to-[#d8829d]/10 border border-rose-400/25 text-xs space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-rose-300/70 font-semibold block">Developed By</span>
              <span className="text-sm font-bold text-white block">Pathan Nafisa Khanam</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#7eb898]">
              <span className="w-2 h-2 rounded-full bg-[#7eb898] animate-pulse"></span>
              All systems operational
            </div>
          </div>

          {/* Next.js Concepts */}
          <div>
            <h3 className="text-xs font-bold text-rose-200 tracking-wider uppercase mb-3 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-[#d8829d]" />
              Next.js Architecture
            </h3>
            <ul className="space-y-2 text-xs text-rose-100/80">
              <li>• App Router & Layouts</li>
              <li>• React Server Components (RSC)</li>
              <li>• Server Actions (`&quot;use server&quot;`)</li>
              <li>• Static Generation & ISR (`generateStaticParams`)</li>
              <li>• Streaming with React Suspense</li>
              <li>• Route Handlers (`app/api/`)</li>
            </ul>
          </div>

          {/* MERN Stack Integration */}
          <div>
            <h3 className="text-xs font-bold text-rose-200 tracking-wider uppercase mb-3 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#7eb898]" />
              MERN Stack
            </h3>
            <ul className="space-y-2 text-xs text-rose-100/80">
              <li>• <strong>M</strong>: MongoDB & Mongoose Schemas</li>
              <li>• <strong>E</strong>: Express/Node Route Handlers</li>
              <li>• <strong>R</strong>: React 19 Client & Server Components</li>
              <li>• <strong>N</strong>: Node.js Runtime Engine</li>
              <li>• Resilient fallback repository</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-rose-200 tracking-wider uppercase mb-3 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#b07d9b]" />
              Platform Routes
            </h3>
            <ul className="space-y-2 text-xs text-rose-100/80">
              <li>
                <Link href="/projects" className="hover:text-[#c06c84] transition-colors">
                  Project Catalog
                </Link>
              </li>
              <li>
                <Link href="/my-projects" className="hover:text-[#c06c84] transition-colors font-semibold text-rose-200">
                  My Projects
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#c06c84] transition-colors">
                  Creator Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/new" className="hover:text-[#c06c84] transition-colors">
                  Submit New Project
                </Link>
              </li>
              <li>
                <Link href="/api-docs" className="hover:text-[#c06c84] transition-colors">
                  Interactive API Console
                </Link>
              </li>
              <li>
                <a href="/api/projects" target="_blank" className="hover:text-[#c06c84] transition-colors">
                  Raw REST JSON Feed
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-rose-900/20 flex flex-col sm:flex-row items-center justify-between text-xs text-rose-300/70 gap-4">
          <p>© {new Date().getFullYear()} DevPulse Platform • Developed by <strong className="text-rose-100 font-bold">Pathan Nafisa Khanam</strong></p>
          <div className="flex items-center gap-1.5 font-medium text-rose-200/90">
            <span>Architected with Next.js & MERN by</span>
            <span className="text-[#f3c1cf] font-bold">Pathan Nafisa Khanam</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

