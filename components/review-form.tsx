"use client";

import { useActionState } from "react";
import { submitReviewAction, ActionState } from "@/lib/actions";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

const initialState: ActionState = {
  success: false,
  message: "",
};

export function ReviewForm({ projectId }: { projectId: string }) {
  const [state, formAction, isPending] = useActionState(submitReviewAction, initialState);

  return (
    <div className="pt-4 border-t border-rose-900/30 space-y-4">
      <h3 className="text-xs font-bold text-rose-200/80 uppercase tracking-wider">
        Leave a Technical Review
      </h3>

      {state.message && (
        <div
          className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
            state.success
              ? "bg-[#7eb898]/15 text-[#9ad4b4] border border-[#7eb898]/30"
              : "bg-rose-500/15 text-rose-300 border border-rose-500/40"
          }`}
        >
          {state.success ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-[#9ad4b4] shrink-0" />
          ) : (
            <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          )}
          <span>{state.message}</span>
        </div>
      )}

      <form action={formAction} className="space-y-3">
        <input type="hidden" name="projectId" value={projectId} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            name="authorName"
            required
            placeholder="Your Name"
            className="w-full px-3 py-2 rounded-xl bg-[#1b121c]/90 border border-rose-400/20 text-xs text-rose-100 placeholder-rose-300/40 focus:outline-none focus:border-[#d8829d]"
          />
          <input
            type="email"
            name="authorEmail"
            placeholder="Your Email (optional)"
            className="w-full px-3 py-2 rounded-xl bg-[#1b121c]/90 border border-rose-400/20 text-xs text-rose-100 placeholder-rose-300/40 focus:outline-none focus:border-[#d8829d]"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs text-rose-300/70">Rating:</label>
          <select
            name="rating"
            defaultValue="5"
            className="px-3 py-1.5 rounded-lg bg-[#1b121c] border border-rose-400/20 text-xs text-rose-200 focus:outline-none focus:border-[#d8829d]"
          >
            <option value="5">★★★★★ (5 Stars - Exceptional)</option>
            <option value="4">★★★★☆ (4 Stars - Solid)</option>
            <option value="3">★★★☆☆ (3 Stars - Average)</option>
          </select>
        </div>

        <textarea
          name="comment"
          required
          rows={3}
          placeholder="Share feedback on the architecture, performance, or patterns..."
          className="w-full px-3 py-2 rounded-xl bg-[#1b121c]/90 border border-rose-400/20 text-xs text-rose-100 placeholder-rose-300/40 focus:outline-none focus:border-[#d8829d]"
        />

        <button
          type="submit"
          disabled={isPending}
          className="btn-bouncy px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#c06c84] to-[#d8829d] hover:from-[#d8829d] hover:to-[#c06c84] disabled:opacity-50 flex items-center gap-2 cursor-pointer shadow-md shadow-rose-900/30"
        >
          {isPending ? (
            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
          <span>{isPending ? "Submitting..." : "Post Review via Server Action"}</span>
        </button>
      </form>
    </div>
  );
}
