"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { LogoMark } from "@/components/ui/logo";
import { nav } from "@/lib/content";
import { cn } from "@/lib/cn";

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="select-none"
      aria-label="Kodus — página inicial"
    >
      <LogoMark size="sm" />
    </Link>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <>
      {/* ── Sticky bar ─────────────────────────────────────────────────── */}
      <header
        className={cn(
          "sticky top-0 z-50 border-b border-[var(--line)]",
          "pt-[env(safe-area-inset-top)]",
        )}
        style={{
          background: "color-mix(in oklch, var(--bg) 75%, transparent)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <Container>
          <div className="flex h-14 items-center justify-between min-[980px]:h-16">
            <Logo />

            {/* Desktop nav links */}
            <nav
              aria-label="Navegação principal"
              className="hidden items-center gap-6 min-[980px]:flex"
            >
              {nav.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] text-[var(--fg-dim)] transition-colors duration-150 hover:text-[var(--fg)] focus-visible:outline-none focus-visible:underline"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right-side actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              {/* CTA — text + icon ≥480px, icon-only below */}
              <Link
                href={nav.cta.href}
                aria-label={nav.cta.label}
                className={cn(
                  "group flex h-10 min-w-10 items-center justify-center gap-1.5 rounded-full px-4",
                  "bg-[var(--fg)] text-sm font-medium text-[var(--bg)]",
                  "transition-colors duration-200 hover:bg-[var(--accent)] hover:text-white",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
                  "max-[480px]:px-2.5",
                )}
              >
                <span className="hidden min-[480px]:inline" aria-hidden="true">{nav.cta.label}</span>
                <ArrowUpRight
                  size={14}
                  className="shrink-0 transition-transform duration-150 group-hover:translate-x-px group-hover:-translate-y-px"
                  aria-hidden="true"
                />
              </Link>

              {/* Hamburger — visible below 980px */}
              <button
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full",
                  "border border-[var(--line)] text-[var(--fg-dim)]",
                  "transition-colors duration-150 hover:border-[var(--line-strong)] hover:text-[var(--fg)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
                  "min-[980px]:hidden",
                )}
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                aria-expanded={open}
                aria-controls="mobile-drawer"
                onClick={() => setOpen((v) => !v)}
              >
                {open
                  ? <X size={20} aria-hidden="true" />
                  : <Menu size={20} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* ── Mobile drawer — Framer Motion slide from top ───────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-drawer"
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className={cn(
              "fixed inset-0 z-[60] flex flex-col bg-[var(--bg)]",
              "px-8 pb-[max(32px,env(safe-area-inset-bottom))]",
              "pt-[max(24px,env(safe-area-inset-top))]",
            )}
          >
            {/* Drawer header */}
            <div className="flex h-14 items-center justify-between">
              <Logo onClick={close} />

              <button
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full",
                  "border border-[var(--line)] text-[var(--fg-dim)]",
                  "transition-colors duration-150 hover:border-[var(--line-strong)] hover:text-[var(--fg)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
                )}
                onClick={close}
                aria-label="Fechar menu"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Drawer links */}
            <nav aria-label="Menu mobile" className="mt-10 flex flex-col gap-6">
              {nav.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className={cn(
                    "display block italic leading-tight text-[32px] text-[var(--fg)]",
                    "transition-colors duration-150 hover:text-[var(--accent)]",
                    "py-1",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Drawer CTA — pinned to bottom */}
            <div className="mt-auto pt-8">
              <Link
                href={nav.cta.href}
                onClick={close}
                className={cn(
                  "group inline-flex h-12 items-center gap-2 rounded-full px-6",
                  "bg-[var(--accent)] text-sm font-medium text-white",
                  "transition-colors duration-200 hover:opacity-90",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
                )}
              >
                {nav.cta.label}
                <ArrowUpRight
                  size={14}
                  className="shrink-0 transition-transform duration-150 group-hover:translate-x-px group-hover:-translate-y-px"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
