"use client";

import { useOptimistic, useTransition } from "react";
import { upvoteProjectAction } from "@/lib/actions";
import { Star } from "lucide-react";

interface UpvoteButtonProps {
  id: string;
  initialStars: number;
  compact?: boolean;
}

export function UpvoteButton({ id, initialStars, compact = false }: UpvoteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticStars, setOptimisticStars] = useOptimistic(
    initialStars,
    (current, update: number) => current + update
  );

  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    startTransition(async () => {
      setOptimisticStars(1);
      await upvoteProjectAction(id);
    });
  };

  if (compact) {
    return (
      <button
        onClick={handleUpvote}
        disabled={isPending}
        title="Star this project"
        className="btn-bouncy flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-200 border border-rose-400/20 text-xs font-semibold cursor-pointer"
      >
        <Star className={`w-3.5 h-3.5 fill-[#e2a76f] text-[#e2a76f] ${isPending ? "animate-spin" : ""}`} />
        <span>{optimisticStars}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleUpvote}
      disabled={isPending}
      className="btn-bouncy group relative flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500/15 to-[#c06c84]/20 hover:from-rose-500/25 hover:to-[#c06c84]/30 border border-rose-400/30 text-rose-100 font-medium text-sm cursor-pointer shadow-sm"
    >
      <Star className={`w-4 h-4 fill-[#e2a76f] text-[#e2a76f] transition-transform group-hover:scale-125 ${isPending ? "animate-bounce" : ""}`} />
      <span>{optimisticStars} Stars</span>
      {isPending && <span className="text-[10px] text-rose-300/80">saving...</span>}
    </button>
  );
}
