import { Metadata } from "next";
import { LoginForm } from "@/components/login-form";
import { Sparkles, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign In - DevPulse Platform",
  description: "Sign in to manage full-stack Next.js and MERN repositories with role-based access control.",
};

interface LoginPageProps {
  searchParams: Promise<{
    redirect?: string;
    error?: string;
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedParams = await searchParams;
  const redirectUrl = resolvedParams.redirect || "/dashboard";
  const error = resolvedParams.error;

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-[#f3c1cf] border border-rose-400/30">
          <Sparkles className="w-3.5 h-3.5 text-[#d8829d]" /> Secure RBAC Session
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Welcome to DevPulse
        </h1>
        <p className="text-xs sm:text-sm text-rose-200/70">
          Sign in to access your developer dashboard or admin control center.
        </p>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-rose-400/30 shadow-2xl relative overflow-hidden">
        <LoginForm redirectUrl={redirectUrl} errorMessage={error} />
      </div>
    </div>
  );
}
