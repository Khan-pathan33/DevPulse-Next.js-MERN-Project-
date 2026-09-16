"use client";

import Link from "next/link";
import { useState } from "react";
import { SessionUser } from "@/lib/auth";
import { logoutAction } from "@/lib/actions/auth-actions";
import {
  ShieldAlert,
  LogOut,
  User,
  LayoutDashboard,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  LogIn,
  UserPlus,
} from "lucide-react";

interface AuthNavControlsProps {
  user: SessionUser | null;
}

export function AuthNavControls({ user }: AuthNavControlsProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="btn-bouncy-subtle flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-rose-200 hover:text-white hover:bg-rose-500/15 border border-rose-400/20 transition-all"
        >
          <LogIn className="w-3.5 h-3.5 text-[#d8829d]" />
          <span>Sign In</span>
        </Link>

        <Link
          href="/register"
          className="btn-bouncy flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#c06c84] to-[#d8829d] hover:from-[#d8829d] hover:to-[#c06c84] shadow-sm shadow-rose-900/30"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Register</span>
        </Link>
      </div>
    );
  }

  const isAdmin = user.role === "admin";

  return (
    <div className="relative">
      {/* Trigger Button */}
      <div className="flex items-center gap-2">
        {isAdmin && (
          <Link
            href="/admin"
            className="btn-bouncy hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#f3c99f] bg-[#e2a76f]/15 hover:bg-[#e2a76f]/25 border border-[#e2a76f]/40 shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#e2a76f]" />
            <span>Admin</span>
          </Link>
        )}

        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="btn-bouncy-subtle flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-[#201322]/80 hover:bg-[#2b192e] border border-rose-400/25 transition-all cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg overflow-hidden bg-gradient-to-tr from-[#c06c84] to-[#e2a76f] flex items-center justify-center text-xs font-black text-white shadow-sm">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div className="hidden sm:flex flex-col text-left leading-tight">
            <span className="text-xs font-bold text-white truncate max-w-[100px]">
              {user.name}
            </span>
            <span
              className={`text-[9px] font-mono font-semibold uppercase ${
                isAdmin ? "text-[#e2a76f]" : "text-[#9ad4b4]"
              }`}
            >
              {user.role}
            </span>
          </div>

          <ChevronDown className={`w-3.5 h-3.5 text-rose-300/60 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setDropdownOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-panel border border-rose-400/30 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
            {/* User Header */}
            <div className="px-3 py-2 border-b border-rose-900/30 mb-1">
              <div className="text-xs font-bold text-white truncate">{user.name}</div>
              <div className="text-[11px] text-rose-300/60 font-mono truncate">{user.email}</div>
              <span
                className={`inline-block mt-1 text-[9px] font-bold px-2 py-0.5 rounded-md uppercase border ${
                  isAdmin
                    ? "bg-[#e2a76f]/15 text-[#e2a76f] border-[#e2a76f]/30"
                    : "bg-[#7eb898]/15 text-[#9ad4b4] border-[#7eb898]/30"
                }`}
              >
                {isAdmin ? "🛡 Staff Admin" : "Developer"}
              </span>
            </div>

            {/* Menu Links */}
            <div className="space-y-0.5">
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#e2a76f] hover:bg-[#e2a76f]/15 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Control Center</span>
                </Link>
              )}

              <Link
                href="/dashboard"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-100 hover:bg-rose-500/15 transition-colors"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#d8829d]" />
                <span>My Dashboard</span>
              </Link>

              <Link
                href="/dashboard/new"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-100 hover:bg-rose-500/15 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#7eb898]" />
                <span>Submit New Project</span>
              </Link>

              <form action={logoutAction}>
                <button
                  type="submit"
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:text-white hover:bg-rose-900/30 transition-colors cursor-pointer text-left"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                  <span>Sign Out</span>
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
