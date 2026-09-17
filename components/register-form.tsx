"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { registerAction } from "@/lib/actions/auth-actions";
import {
  UserPlus,
  User,
  Mail,
  KeyRound,
  FileText,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  Circle,
} from "lucide-react";

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Email RFC format test
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmailValid = EMAIL_REGEX.test(email.trim());

  // Password requirements
  const hasMinLength = password.length >= 8;
  const hasCapital = /[A-Z]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);
  const isPasswordValid = hasMinLength && hasCapital && hasSpecial;

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
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-rose-200/80 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#d8829d]" />
              <span>Email Address:</span>
            </label>
            {email.length > 0 && (
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  isEmailValid
                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                    : "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                }`}
              >
                {isEmailValid ? "Valid Email" : "Invalid Format"}
              </span>
            )}
          </div>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jordan@devpulse.io"
            className="w-full px-4 py-2.5 rounded-xl bg-[#1b131d]/90 border border-rose-400/20 text-sm text-rose-100 placeholder-rose-300/40 focus:outline-none focus:border-[#d8829d] transition-all"
          />
          {state?.errors?.email && (
            <p className="text-xs text-rose-400 mt-1">{state.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-rose-200/80 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-[#d8829d]" />
              <span>Password:</span>
            </label>
            {password.length > 0 && (
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isPasswordValid
                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                    : "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                }`}
              >
                {isPasswordValid ? "Strong Password" : "Criteria Incomplete"}
              </span>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-4 pr-11 py-2.5 rounded-xl bg-[#1b131d]/90 border border-rose-400/20 text-sm text-rose-100 placeholder-rose-300/40 focus:outline-none focus:border-[#d8829d] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-300/50 hover:text-rose-200 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {state?.errors?.password && (
            <p className="text-xs text-rose-400 mt-1">{state.errors.password}</p>
          )}

          {/* Password Validation Requirements Checklist */}
          <div className="mt-2.5 p-3 rounded-xl bg-[#160f18]/80 border border-rose-900/30 space-y-1.5 text-xs">
            <div className="text-[11px] font-semibold text-rose-300/80 mb-1">
              Password Requirements:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
              <div
                className={`flex items-center gap-1.5 text-[11px] transition-colors ${
                  hasMinLength ? "text-emerald-300 font-medium" : "text-rose-300/50"
                }`}
              >
                {hasMinLength ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-rose-400/40 shrink-0" />
                )}
                <span>8+ Characters</span>
              </div>

              <div
                className={`flex items-center gap-1.5 text-[11px] transition-colors ${
                  hasCapital ? "text-emerald-300 font-medium" : "text-rose-300/50"
                }`}
              >
                {hasCapital ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-rose-400/40 shrink-0" />
                )}
                <span>1+ Capital (A-Z)</span>
              </div>

              <div
                className={`flex items-center gap-1.5 text-[11px] transition-colors ${
                  hasSpecial ? "text-emerald-300 font-medium" : "text-rose-300/50"
                }`}
              >
                {hasSpecial ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-rose-400/40 shrink-0" />
                )}
                <span>1+ Special (!@#)</span>
              </div>
            </div>
          </div>
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
        <Link
          href="/login"
          className="font-bold text-[#d8829d] hover:text-[#f3c1cf] transition-colors"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
