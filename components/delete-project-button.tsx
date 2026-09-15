"use client";

import { useTransition } from "react";
import { deleteProjectAction } from "@/lib/actions";
import { Trash2 } from "lucide-react";

export function DeleteProjectButton({ id, title }: { id: string; title: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      startTransition(async () => {
        await deleteProjectAction(id);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      title="Delete project"
      className="p-1.5 rounded-lg text-rose-400/80 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer disabled:opacity-50"
    >
      <Trash2 className={`w-4 h-4 ${isPending ? "animate-pulse" : ""}`} />
    </button>
  );
}
