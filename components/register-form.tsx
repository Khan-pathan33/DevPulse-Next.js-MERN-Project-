"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerAction } from "@/lib/actions/auth-actions";
import {
  UserPlus,
  User,
  Mail,
  KeyRound,
  FileText,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, null);

  return (
    <div className="space-y-6">
      {state?.message && !state.success && (
        <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-400/40 text-xs text-rose-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <form action={formAction} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-rose-200/80 mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#d8829d]" />
            <span>Full Name:</span>
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="e.g. Jordan Miller"
            className="w-full px-4 py-2.5 rounded-xl bg-[#1b131d]/90 border border-rose-400/20 text-sm text-rose-100 placeholder-rose-300/40 focus:outline-none focus:border-[#d8829d] transition-all"
          />
          {state?.errors?.name && (
            <p className="text-xs text-rose-400 mt-1">{state.errors.name}</p>
          )}
        </div>

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
            placeholder="jordan@devpulse.io"
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
            <span>Password (min. 6 chars):</span>
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

        {/* Developer Bio */}
        <div>
          <label className="block text-xs font-semibold text-rose-200/80 mb-1.5 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-[#d8829d]" />
            <span>Developer Bio (Optional):</span>
          </label>
          <textarea
            name="bio"
            rows={2}
            placeholder="MERN stack enthusiast, React 19 explorer..."
            className="w-full px-4 py-2.5 rounded-xl bg-[#1b131d]/90 border border-rose-400/20 text-sm text-rose-100 placeholder-rose-300/40 focus:outline-none focus:border-[#d8829d] transition-all"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="btn-bouncy w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#c06c84] via-[#d8829d] to-[#c06c84] hover:from-[#d8829d] hover:to-[#c06c84] shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 transition-all"
        >
          {isPending ? (
            <span>Creating Account...</span>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              <span>Register Account</span>
            </>
          )}
        </button>
      </form>

      {/* Login Link */}
      <div className="text-center pt-2 border-t border-rose-950/40 text-xs text-rose-200/70">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-[#d8829d] hover:text-[#f3c1cf] transition-colors">
          Sign In
        </Link>
      </div>
    </div>
  );
}
