"use client";

import React from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle({ showLabels = false }: { showLabels?: boolean }) {
  const { theme, setTheme } = useTheme();

  if (showLabels) {
    return (
      <div className="grid grid-cols-3 gap-2 w-full">
        <button
          onClick={() => setTheme("light")}
          className={`flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border transition-all ${
            theme === "light"
              ? "bg-[var(--btn-shop)] text-[var(--btn-shop-text)] border-[var(--btn-shop)] shadow-sm font-bold"
              : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:text-[var(--text-primary)]"
          }`}
        >
          <Sun className="w-4 h-4" />
          <span className="text-xs font-moresugar">Light</span>
        </button>

        <button
          onClick={() => setTheme("dark")}
          className={`flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border transition-all ${
            theme === "dark"
              ? "bg-[var(--btn-shop)] text-[var(--btn-shop-text)] border-[var(--btn-shop)] shadow-sm font-bold"
              : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:text-[var(--text-primary)]"
          }`}
        >
          <Moon className="w-4 h-4" />
          <span className="text-xs font-moresugar">Dark</span>
        </button>

        <button
          onClick={() => setTheme("system")}
          className={`flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border transition-all ${
            theme === "system"
              ? "bg-[var(--btn-shop)] text-[var(--btn-shop-text)] border-[var(--btn-shop)] shadow-sm font-bold"
              : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:text-[var(--text-primary)]"
          }`}
        >
          <Monitor className="w-4 h-4" />
          <span className="text-xs font-moresugar">System</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 bg-[var(--bg-secondary)] p-1 rounded-full border border-[var(--border-color)]">
      <button
        onClick={() => setTheme("light")}
        className={`p-1.5 rounded-full transition-all ${
          theme === "light"
            ? "bg-[var(--bg-primary)] text-[var(--text-brand)] shadow-xs"
            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        }`}
        title="Light Mode"
        aria-label="Light Mode"
      >
        <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`p-1.5 rounded-full transition-all ${
          theme === "dark"
            ? "bg-[var(--bg-primary)] text-[var(--text-brand)] shadow-xs"
            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        }`}
        title="Dark Mode"
        aria-label="Dark Mode"
      >
        <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </button>

      <button
        onClick={() => setTheme("system")}
        className={`p-1.5 rounded-full transition-all ${
          theme === "system"
            ? "bg-[var(--bg-primary)] text-[var(--text-brand)] shadow-xs"
            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        }`}
        title="System Default"
        aria-label="System Default"
      >
        <Monitor className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </button>
    </div>
  );
}
