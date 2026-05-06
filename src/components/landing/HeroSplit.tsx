"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Container } from "@/components/ui/container";
import { LiveDot } from "@/components/ui/live-dot";
import { Reveal } from "@/components/ui/reveal";

const BrowserMockDashboard = dynamic(
  () => import("@/components/landing/BrowserMockDashboard").then((m) => m.BrowserMockDashboard),
  { ssr: false }
);
import { hero } from "@/lib/content";
import { cn } from "@/lib/cn";
import type { TitleSegment } from "@/lib/content";

// ── Animation variants ─────────────────────────────────────────────────────

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

// ── Helpers ────────────────────────────────────────────────────────────────

function renderSegments(segments: TitleSegment[]) {
  return segments.map((seg, i) => {
    if (seg.accent) {
      return (
        <em key={i} style={{ fontStyle: "italic", color: "var(--accent)" }}>
          {seg.text}
        </em>
      );
    }
    if (seg.stroke) {
      return (
        <em
          key={i}
          style={{
            fontStyle: "italic",
            color: "transparent",
            WebkitTextStroke: "1.5px var(--fg)",
          }}
        >
          {seg.text}
        </em>
      );
    }
    return <span key={i}>{seg.text}</span>;
  });
}

// ── Sub-components ─────────────────────────────────────────────────────────

function TrustBar() {
  const avatarGradients = [
    "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
    "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex -space-x-2" aria-hidden="true">
        {avatarGradients.map((bg, i) => (
          <div
            key={i}
            className="h-8 w-8 rounded-full border-2 border-[var(--bg)]"
            style={{ background: bg }}
          />
        ))}
      </div>
      <span className="text-[13px] text-[var(--fg-dim)]">{hero.trust}</span>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export function HeroSplit() {
  const [primaryCta, ghostCta] = hero.ctas;

  return (
    <section
      className="relative overflow-hidden pb-[100px] pt-[80px] max-[980px]:pb-16 max-[980px]:pt-16 max-[600px]:pb-14 max-[600px]:pt-14"
      id="hero"
    >
      {/* Grid background decoration */}
      <div className="grid-bg" aria-hidden="true" />

      <Container>
        {/* ── Hero meta ──────────────────────────────────────────────── */}
        <div
          className={cn(
            "mb-10 flex items-center",
            "font-mono text-[11px] uppercase tracking-[.08em] text-[var(--fg-mute)]",
            "min-[980px]:justify-between",
            "max-[980px]:flex-col max-[980px]:items-start max-[980px]:gap-2",
          )}
        >
          {hero.meta.map((item, i) => (
            <span
              key={i}
              className={cn(
                "flex items-center gap-2",
                i === 1 && "max-[480px]:hidden",
              )}
            >
              {item.live && <LiveDot />}
              {item.text}
            </span>
          ))}
        </div>

        {/* ── Main grid ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 items-center gap-12 min-[980px]:grid-cols-[1fr_1.1fr] min-[980px]:gap-[80px]">
          {/* Left — copy (stagger container) */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.h1
              variants={item}
              className={cn(
                "display leading-[.92] tracking-[-0.025em]",
                "text-[clamp(44px,calc((100vw_-_40px)_/_5.5),100px)] min-[980px]:text-[clamp(56px,7vw,108px)]",
              )}
            >
              {hero.title.map((line, li) => (
                <span key={li} className="block whitespace-nowrap">
                  {renderSegments(line)}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-[400px] text-[16px] leading-relaxed text-[var(--fg-dim)] min-[980px]:text-[17px]"
            >
              {hero.sub}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap gap-3 max-[480px]:flex-col"
            >
              <Link
                href={primaryCta.href}
                className={cn(
                  "group inline-flex items-center justify-center gap-2 rounded-full",
                  "bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white",
                  "transition-[transform,box-shadow] duration-200 hover:-translate-y-px hover:shadow-[0_12px_30px_-8px_var(--accent)]",
                  "active:scale-[0.97]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
                  "max-[480px]:w-full",
                )}
              >
                {primaryCta.label}
                <ArrowUpRight
                  size={14}
                  className="shrink-0 transition-transform duration-150 group-hover:translate-x-px group-hover:-translate-y-px"
                  aria-hidden="true"
                />
              </Link>

              <Link
                href={ghostCta.href}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-full",
                  "border border-[var(--line-strong)] bg-transparent px-6 py-3 text-sm font-medium text-[var(--fg)]",
                  "transition-colors duration-200 hover:bg-[var(--bg-2)]",
                  "active:scale-[0.97]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg-mute)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
                  "max-[480px]:w-full",
                )}
              >
                {ghostCta.label}
              </Link>
            </motion.div>

          </motion.div>

          {/* Right — browser mock (desktop only) */}
          <Reveal className="hidden w-full min-[980px]:block">
            <BrowserMockDashboard />
          </Reveal>
        </div>

        {/* Trust bar — below the grid, aligns left col with right on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-6"
        >
          <TrustBar />
        </motion.div>
      </Container>
    </section>
  );
}
