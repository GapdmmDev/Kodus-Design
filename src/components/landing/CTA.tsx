import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { LiveDot } from "@/components/ui/live-dot";
import { cta } from "@/lib/content";
import { cn } from "@/lib/cn";
import type { TitleSegment } from "@/lib/content";

function renderSegments(segments: TitleSegment[]) {
  return segments.map((seg, i) => {
    if (seg.accent) {
      return (
        <em key={i} style={{ fontStyle: "italic", color: "var(--accent)" }}>
          {seg.text}
        </em>
      );
    }
    return <span key={i}>{seg.text}</span>;
  });
}

// Highlights specific tokens in the info string with white + semibold
function InfoLine({ text }: { text: string }) {
  const highlighted = ["24h", "48h", "5 dias"];
  const parts = text.split(/(24h|48h|5 dias)/g);
  return (
    <>
      {parts.map((part, i) =>
        highlighted.includes(part) ? (
          <span key={i} className="font-semibold text-[var(--fg)]">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export function CTA() {
  const [primaryCta, ghostCta] = cta.ctas;

  return (
    <section
      id="contato"
      className="relative overflow-hidden py-[140px] max-[980px]:py-24 max-[600px]:py-24"
    >
      {/* Radial gradient decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 1200,
          height: 1200,
          background:
            "radial-gradient(circle, var(--accent-soft) 0%, transparent 65%)",
        }}
      />

      <Container>
        <Reveal>
          <div className="relative flex flex-col items-center text-center">
            {/* Eyebrow — manual render to use green dot instead of CSS ::before orange dot */}
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.08em] text-[var(--fg-mute)]">
              <LiveDot />
              {cta.eyebrow}
            </span>

            {/* H2 — forced 2-line break: "Pronto pra vender" / "de verdade?" */}
            <h2
              className="display mt-5 leading-[1.0] tracking-[-0.025em] text-[clamp(44px,7vw,96px)]"
            >
              <span className="block">{renderSegments(cta.title.slice(0, 2))}</span>
              <span className="block">{renderSegments(cta.title.slice(2))}</span>
            </h2>

            <p className="mt-6 max-w-[480px] text-[16px] leading-relaxed text-[var(--fg-dim)] min-[980px]:text-[17px]">
              {cta.copy}
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap justify-center gap-3 max-[480px]:flex-col max-[480px]:w-full max-[480px]:max-w-xs">
              <Link
                href={primaryCta.href}
                className={cn(
                  "inline-flex items-center justify-center rounded-full",
                  "bg-[var(--accent)] px-7 py-3.5 text-sm font-medium text-white",
                  "transition-colors duration-200 hover:bg-[#e04e18]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
                  "max-[480px]:w-full",
                )}
              >
                {primaryCta.label}
              </Link>

              <Link
                href={ghostCta.href}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-full",
                  "border border-[var(--line-strong)] bg-transparent px-7 py-3.5 text-sm font-medium text-[var(--fg)]",
                  "transition-colors duration-200 hover:bg-[var(--bg-2)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg-mute)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
                  "max-[480px]:w-full",
                )}
              >
                {ghostCta.label}
              </Link>
            </div>

            {/* Deadline info */}
            <p className="mt-10 font-mono text-[11px] uppercase tracking-[.08em] text-[var(--fg-mute)]">
              <InfoLine text={cta.info} />
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
