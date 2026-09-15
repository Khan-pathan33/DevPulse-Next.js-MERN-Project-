"use client";

import { useTheme } from "./theme-provider";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle visual theme"
      className="p-2 rounded-xl text-rose-200/80 hover:text-rose-100 bg-[#241723]/60 hover:bg-[#2e1d2c] border border-rose-400/20 transition-all duration-200 cursor-pointer shadow-sm hover:border-rose-400/40"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-amber-300 animate-in fade-in duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-[#c06c84] animate-in fade-in duration-300" />
      )}
    </button>
  );
}
