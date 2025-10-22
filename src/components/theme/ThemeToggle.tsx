"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--lc-border)] bg-[var(--lc-surface)] text-[var(--lc-foreground)] transition hover:border-emerald-400/60 hover:text-emerald-300"
      aria-label="Toggle theme"
    >
      <span className="text-lg" aria-hidden="true">
        {theme === "dark" ? "🌙" : "🌞"}
      </span>
    </button>
  );
}
