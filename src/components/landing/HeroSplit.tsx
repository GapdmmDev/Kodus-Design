import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { hero } from "@/lib/content";
import { cn } from "@/lib/cn";
import type { TitleSegment } from "@/lib/content";

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

function LiveDot() {
  return (
    <span
      className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400"
      style={{ animation: "pulse 2s ease-in-out infinite" }}
      aria-hidden="true"
    />
  );
}

function BrowserMock() {
  return (
    <div
      className="overflow-hidden rounded-[14px] border border-[var(--line-strong)]"
      style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,.5)" }}
      aria-hidden="true"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-[var(--line)] bg-[var(--bg-2)] px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <div className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex h-6 flex-1 items-center rounded bg-[var(--bg)] px-3">
          <span className="truncate font-mono text-[10px] text-[var(--fg-mute)]">
            {hero.browserMock.url}
          </span>
        </div>
      </div>

      {/* Body */}
      <div
        className="relative aspect-[16/10] overflow-hidden"
        style={{
          background:
            "repeating-linear-gradient(45deg, var(--card) 0px, var(--card) 10px, var(--card-2) 10px, var(--card-2) 20px)",
        }}
      >
        {/* Fade overlay so content reads clearly */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--card)]/80 via-transparent to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-center p-8 max-[600px]:p-5">
          <p
            className="display italic leading-tight text-[var(--fg)]"
            style={{ fontSize: "clamp(18px, 3vw, 30px)" }}
          >
            {hero.browserMock.heading}
          </p>
          <div className="mt-5">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)]",
                "px-4 py-2 font-mono text-[10px] uppercase tracking-[.06em] text-white",
              )}
            >
              {hero.browserMock.cta}
              <ArrowUpRight size={10} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

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
            // Desktop: left / center / right
            "min-[980px]:justify-between",
            // Mobile: vertical stack
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
          {/* Left — copy */}
          <div>
            <h1
              className={cn(
                "display leading-[.92] tracking-[-0.025em]",
                // Mobile clamp → desktop clamp
                "text-[clamp(40px,9vw,64px)] min-[980px]:text-[clamp(56px,7vw,108px)]",
              )}
            >
              {hero.title.map((line, li) => (
                <span key={li} className="block">
                  {renderSegments(line)}
                </span>
              ))}
            </h1>

            <p className="mt-6 max-w-[400px] text-[16px] leading-relaxed text-[var(--fg-dim)] min-[980px]:text-[17px]">
              {hero.sub}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3 max-[480px]:flex-col">
              <Link
                href={primaryCta.href}
                className={cn(
                  "group inline-flex items-center justify-center gap-2 rounded-full",
                  "bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white",
                  "transition-all duration-200 hover:-translate-y-px hover:shadow-[0_12px_30px_-8px_var(--accent)]",
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
                  "transition-all duration-200 hover:bg-[var(--bg-2)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg-mute)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
                  "max-[480px]:w-full",
                )}
              >
                {ghostCta.label}
              </Link>
            </div>

            {/* Trust bar */}
            <div className="mt-8">
              <TrustBar />
            </div>
          </div>

          {/* Right — browser mock */}
          <div className="w-full">
            <BrowserMock />
          </div>
        </div>
      </Container>
    </section>
  );
}
