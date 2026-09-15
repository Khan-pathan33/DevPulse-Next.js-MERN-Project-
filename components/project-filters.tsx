"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Search, X } from "lucide-react";

const STACKS = ["All", "MERN", "Next.js", "AI", "FullStack"];

export function ProjectFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentStack = searchParams.get("stack") || "All";
  const currentSearch = searchParams.get("search") || "";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "All") {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleStackChange = (stack: string) => {
    startTransition(() => {
      const queryString = createQueryString("stack", stack);
      router.push(`${pathname}?${queryString}`, { scroll: false });
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    startTransition(() => {
      const queryString = createQueryString("search", val);
      router.push(`${pathname}?${queryString}`, { scroll: false });
    });
  };

  const clearSearch = () => {
    startTransition(() => {
      const queryString = createQueryString("search", "");
      router.push(`${pathname}?${queryString}`, { scroll: false });
    });
  };

  return (
    <div className="space-y-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Tech Stack Pills with Bouncy Effect */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {STACKS.map((stack) => {
            const isActive = currentStack.toLowerCase() === stack.toLowerCase();
            return (
              <button
                key={stack}
                onClick={() => handleStackChange(stack)}
                className={`btn-bouncy-subtle px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#c06c84] text-white shadow-md shadow-rose-900/40 border border-rose-300/40"
                    : "bg-[#241723]/60 text-rose-100/70 hover:text-white hover:bg-[#2f1f2e] border border-rose-400/15"
                }`}
              >
                {stack === "MERN" && "🍃 "}
                {stack === "Next.js" && "▲ "}
                {stack === "AI" && "✨ "}
                {stack}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative flex-1 md:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300/60" />
          <input
            type="text"
            value={currentSearch}
            onChange={handleSearchChange}
            placeholder="Search projects or tags..."
            className="w-full pl-9 pr-9 py-2 rounded-xl bg-[#1b131d]/90 border border-rose-400/20 text-sm text-rose-100 placeholder-rose-300/40 focus:outline-none focus:border-[#d8829d] focus:ring-1 focus:ring-[#d8829d] transition-all duration-200"
          />
          {currentSearch && (
            <button
              onClick={clearSearch}
              className="btn-bouncy-subtle absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-md text-rose-300/60 hover:text-white hover:bg-rose-500/20"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {isPending && (
        <div className="h-0.5 w-full bg-rose-950/60 overflow-hidden rounded-full">
          <div className="h-full bg-gradient-to-r from-[#c06c84] via-[#d8829d] to-[#e2a76f] animate-pulse w-1/3"></div>
        </div>
      )}
    </div>
  );
}
