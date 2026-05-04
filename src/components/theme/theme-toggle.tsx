"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <button
      suppressHydrationWarning
      aria-label="Alternar tema"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full",
        "border border-[var(--line)] text-[var(--fg-dim)]",
        "transition-colors duration-200 hover:border-[var(--line-strong)] hover:text-[var(--fg)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
        className
      )}
    >
      {mounted && (resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />)}
    </button>
  );
}
