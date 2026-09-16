import { Metadata } from "next";
import { RegisterForm } from "@/components/register-form";
import { Sparkles, UserPlus } from "lucide-react";

export const metadata: Metadata = {
  title: "Create Developer Account - DevPulse Platform",
  description: "Register a new developer account on DevPulse to submit and showcase your MERN & Next.js architectures.",
};

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-[#f3c1cf] border border-rose-400/30">
          <Sparkles className="w-3.5 h-3.5 text-[#d8829d]" /> Join DevPulse Community
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Create Account
        </h1>
        <p className="text-xs sm:text-sm text-rose-200/70">
          Join hundreds of full-stack engineers deploying production templates.
        </p>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-rose-400/30 shadow-2xl relative overflow-hidden">
        <RegisterForm />
      </div>
    </div>
  );
}
