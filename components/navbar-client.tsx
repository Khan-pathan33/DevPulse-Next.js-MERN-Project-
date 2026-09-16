"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { AuthNavControls } from "./auth-nav-controls";
import { SessionUser } from "@/lib/auth";
import { logoutAction } from "@/lib/actions/auth-actions";
import {
  Layers,
  Sparkles,
  LayoutDashboard,
  PlusCircle,
  Menu,
  X,
  Terminal,
  ShieldCheck,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";

interface NavbarClientProps {
  user: SessionUser | null;
}

const NAV_LINKS = [
  { name: "Explore", href: "/projects", icon: Layers },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "API Docs", href: "/api-docs", icon: Terminal },
];

export function NavbarClient({ user }: NavbarClientProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = user?.role === "admin";

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
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(`${link.href}/`));
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

          {isAdmin && (
            <Link
              href="/admin"
              className={`btn-bouncy-subtle flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                pathname?.startsWith("/admin")
                  ? "bg-[#e2a76f]/20 text-[#e2a76f] border border-[#e2a76f]/40 shadow-sm"
                  : "text-[#e2a76f]/80 hover:text-[#e2a76f] hover:bg-[#e2a76f]/10"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin</span>
            </Link>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <AuthNavControls user={user} />
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
          {user && (
            <div className="p-3 mb-2 rounded-xl bg-[#201322] border border-rose-400/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#c06c84] to-[#e2a76f] flex items-center justify-center text-xs font-black text-white">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{user.name}</div>
                  <div className="text-[10px] text-rose-300/60 font-mono">{user.email}</div>
                </div>
              </div>
              <span
                className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase border ${
                  isAdmin
                    ? "bg-[#e2a76f]/15 text-[#e2a76f] border-[#e2a76f]/30"
                    : "bg-[#7eb898]/15 text-[#9ad4b4] border-[#7eb898]/30"
                }`}
              >
                {isAdmin ? "Admin" : "Dev"}
              </span>
            </div>
          )}

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

          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-[#e2a76f] bg-[#e2a76f]/15 border border-[#e2a76f]/30"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Control Center</span>
            </Link>
          )}

          <div className="pt-2 space-y-2">
            {user ? (
              <>
                <Link
                  href="/dashboard/new"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-bouncy flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#c06c84] to-[#d8829d]"
                >
                  <PlusCircle className="w-4 h-4" />
                  Submit Project
                </Link>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/40 border border-rose-900/40"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-bouncy flex items-center justify-center gap-1.5 w-full px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#c06c84] to-[#d8829d] shadow-sm shadow-rose-900/30"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
