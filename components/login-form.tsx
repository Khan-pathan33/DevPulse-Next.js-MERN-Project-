"use client";

import { useActionState, useTransition } from "react";
import Link from "next/link";
import { loginAction, quickDemoLoginAction } from "@/lib/actions/auth-actions";
import {
  LogIn,
  ShieldCheck,
  User,
  Sparkles,
  ArrowRight,
  AlertCircle,
  KeyRound,
  Mail,
  Zap,
} from "lucide-react";

interface LoginFormProps {
  redirectUrl?: string;
  errorMessage?: string;
}

export function LoginForm({ redirectUrl = "/dashboard", errorMessage }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const [isDemoPending, startDemoTransition] = useTransition();

  const handleDemoClick = (role: "admin" | "user") => {
    startDemoTransition(async () => {
      await quickDemoLoginAction(role);
    });
  };

  return (
    <div className="space-y-6">
      {/* Banner for redirect warnings */}
      {errorMessage === "admin_credentials_required" && (
        <div className="p-3.5 rounded-2xl bg-[#e2a76f]/15 border border-[#e2a76f]/40 text-xs text-[#f3c99f] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#e2a76f] shrink-0" />
          <span>Administrator access is strictly protected. Please enter the ADMIN_EMAIL and ADMIN_PASSWORD configured in .env.local.</span>
        </div>
      )}

      {errorMessage === "admin_required" && (
        <div className="p-3.5 rounded-2xl bg-[#e2a76f]/15 border border-[#e2a76f]/40 text-xs text-[#f3c99f] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#e2a76f] shrink-0" />
          <span>Administrative privileges required. Please log in with an Admin account.</span>
        </div>
      )}

      {errorMessage === "auth_required" && (
        <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-400/30 text-xs text-rose-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>Please sign in to access this protected area.</span>
        </div>
      )}

      {/* Form Error Message */}
      {state?.message && !state.success && (
        <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-400/40 text-xs text-rose-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      {/* Instant Demo One-Click Login Cards */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-rose-300/70">
          <Zap className="w-3.5 h-3.5 text-[#d8829d]" />
          <span>Demo Access & Roles:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Protected Staff Admin Info Card (Bypass Disabled for Security) */}
          <div className="p-3.5 rounded-2xl glass-panel border border-[#e2a76f]/30 bg-[#e2a76f]/5 text-left flex flex-col justify-between select-none">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#e2a76f]/20 text-[#f3c99f] border border-[#e2a76f]/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#e2a76f]" /> Staff Admin
              </span>
              <span className="text-[9px] font-mono text-[#f3c99f]/70 bg-black/40 px-1.5 py-0.5 rounded border border-[#e2a76f]/20">
                .env.local
              </span>
            </div>
            <div className="text-xs font-semibold text-white">
              Protected by Server .env
            </div>
            <div className="text-[10px] text-rose-300/60 mt-0.5">
              Sign in with credentials below
            </div>
          </div>

          {/* Regular Developer Demo Button */}
          <button
            type="button"
            disabled={isDemoPending}
            onClick={() => handleDemoClick("user")}
            className="btn-bouncy p-3.5 rounded-2xl glass-panel border border-[#7eb898]/30 hover:border-[#7eb898]/60 text-left transition-all cursor-pointer group shadow-sm disabled:opacity-50"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#7eb898]/15 text-[#9ad4b4] border border-[#7eb898]/30 flex items-center gap-1">
                <User className="w-3 h-3 text-[#7eb898]" /> Developer
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-rose-300/50 group-hover:text-[#9ad4b4] group-hover:translate-x-0.5 transition-all" />
            </div>
            <div className="text-xs font-bold text-white group-hover:text-[#9ad4b4] transition-colors">
              Alex Rivera
            </div>
            <div className="text-[10px] text-rose-300/60 font-mono">user@devpulse.io</div>
          </button>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="border-t border-rose-900/30 w-full" />
        <span className="bg-[#1b121c] px-3 text-[11px] font-mono text-rose-300/50 uppercase">
          Or Enter Credentials
        </span>
      </div>

      {/* Manual Login Form */}
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="redirect" value={redirectUrl} />

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-rose-200/80 mb-1.5 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#d8829d]" />
            <span>Email Address:</span>
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="name@company.com"
            className="w-full px-4 py-2.5 rounded-xl bg-[#1b131d]/90 border border-rose-400/20 text-sm text-rose-100 placeholder-rose-300/40 focus:outline-none focus:border-[#d8829d] transition-all"
          />
          {state?.errors?.email && (
            <p className="text-xs text-rose-400 mt-1">{state.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-rose-200/80 mb-1.5 flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5 text-[#d8829d]" />
            <span>Password:</span>
          </label>
          <input
            type="password"
            name="password"
            required
            placeholder="••••••••"
            className="w-full px-4 py-2.5 rounded-xl bg-[#1b131d]/90 border border-rose-400/20 text-sm text-rose-100 placeholder-rose-300/40 focus:outline-none focus:border-[#d8829d] transition-all"
          />
          {state?.errors?.password && (
            <p className="text-xs text-rose-400 mt-1">{state.errors.password}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending || isDemoPending}
          className="btn-bouncy w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#c06c84] via-[#d8829d] to-[#c06c84] hover:from-[#d8829d] hover:to-[#c06c84] shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 transition-all"
        >
          {isPending || isDemoPending ? (
            <span>Authenticating Session...</span>
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              <span>Sign In to DevPulse</span>
            </>
          )}
        </button>
      </form>

      {/* Register Link */}
      <div className="text-center pt-2 border-t border-rose-950/40 text-xs text-rose-200/70">
        Don&apos;t have an account yet?{" "}
        <Link href="/register" className="font-bold text-[#d8829d] hover:text-[#f3c1cf] transition-colors">
          Create Developer Account
        </Link>
      </div>
    </div>
  );
}
