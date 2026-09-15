"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import {
  Layers,
  Sparkles,
  LayoutDashboard,
  PlusCircle,
  Menu,
  X,
  Terminal,
} from "lucide-react";

const NAV_LINKS = [
  { name: "Explore", href: "/projects", icon: Layers },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "API Docs", href: "/api-docs", icon: Terminal },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass-nav transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo with Bouncy reaction */}
        <Link href="/" className="flex items-center gap-2.5 group btn-bouncy-subtle">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-[#c06c84] via-[#d8829d] to-[#e2a76f] p-0.5 shadow-lg shadow-rose-500/20 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
            <div className="w-full h-full bg-[#160f18] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#e898ac] group-hover:text-[#f8cad6] transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-pink-50 via-rose-100 to-rose-300 bg-clip-text text-transparent group-hover:from-white group-hover:to-rose-200 transition-colors">
              DevPulse
            </span>
            <span className="text-[10px] font-medium tracking-wider text-[#d8829d] uppercase -mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d8829d] animate-pulse"></span>
              MERN • Next.js
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`btn-bouncy-subtle flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-rose-500/15 text-rose-200 border border-rose-400/30 shadow-sm"
                    : "text-rose-100/70 hover:text-white hover:bg-rose-500/10"
                }`}
              >
                <Icon className="w-4 h-4 opacity-85" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions with Bouncy CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/dashboard/new"
            className="btn-bouncy flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#c06c84] via-[#d8829d] to-[#c06c84] hover:from-[#d8829d] hover:to-[#c06c84] shadow-md shadow-rose-900/30 hover:shadow-rose-900/50"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit Project</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-rose-200 hover:text-white hover:bg-rose-500/20"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-rose-900/30 bg-[#160f18]/95 backdrop-blur-xl px-4 pt-2 pb-6 space-y-2">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                  isActive
                    ? "bg-rose-500/20 text-rose-200 border border-rose-500/40"
                    : "text-rose-100/70 hover:bg-rose-500/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/dashboard/new"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-bouncy flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#c06c84] hover:bg-[#d8829d]"
            >
              <PlusCircle className="w-4 h-4" />
              Submit Project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
