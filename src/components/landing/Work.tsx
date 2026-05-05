import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { work, workSection } from "@/lib/content";
import { cn } from "@/lib/cn";
import type { WorkCase } from "@/lib/content";

// ── Per-case gradient palettes ─────────────────────────────────────────────
const GRADIENTS: Record<string, string> = {
  "orion-capital":
    "linear-gradient(135deg, #0f1b3d 0%, #132250 50%, #1a3070 100%)",
  "helix-studio":
    "linear-gradient(135deg, #1a0a2e 0%, #2d1547 50%, #421d66 100%)",
  "verde":
    "linear-gradient(135deg, #0a1e12 0%, #0d2918 50%, #0f3820 100%)",
  "drumond-atelier":
    "linear-gradient(135deg, #1e1206 0%, #2b1b08 50%, #3d2a0d 100%)",
  "pulso-logistica":
    "linear-gradient(135deg, #0d0d0d 0%, #141414 50%, #1a1a1a 100%)",
};

// ── WorkCard ───────────────────────────────────────────────────────────────

function WorkCard({ item }: { item: WorkCase }) {
  return (
    <article className="flex flex-col gap-3">
      {/* Thumb */}
      <div
        className={cn(
          "group relative overflow-hidden rounded-[16px] border border-[var(--line-strong)]",
          item.featured
            ? "aspect-[4/3] min-[980px]:aspect-auto min-[980px]:h-full"
            : "aspect-[16/10]",
        )}
      >
        {/* Gradient base */}
        <div
          className="absolute inset-0"
          style={{ background: GRADIENTS[item.slug] ?? GRADIENTS["pulso-logistica"] }}
          aria-hidden="true"
        />

        {/* Stripe texture */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(45deg, rgba(255,255,255,.04) 0, rgba(255,255,255,.04) 3px, transparent 3px, transparent 14px)",
          }}
          aria-hidden="true"
        />

        {/* Tags row */}
        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
          {/* Placeholder tag */}
          <span className="rounded-[6px] bg-black/50 px-2 py-1 font-mono text-[10px] uppercase tracking-[.06em] text-[var(--fg-mute)] backdrop-blur-sm">
            Estudo de caso
          </span>

          {/* Live tag — only on featured */}
          {item.featured && (
            <span className="flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[.06em] text-[var(--fg)] backdrop-blur-sm">
              <span
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                style={{ animation: "pulse 2s ease-in-out infinite" }}
                aria-hidden="true"
              />
              ao vivo
            </span>
          )}
        </div>

        {/* Mock heading — centered */}
        <div className="absolute inset-0 flex items-center justify-center p-6 max-[600px]:p-4">
          <p
            className="display italic text-center text-[var(--fg)]"
            style={{ fontSize: "clamp(14px, 2.2vw, 24px)" }}
          >
            {item.mockHeading}
          </p>
        </div>

        {/* Mock CTA — bottom right */}
        <div className="absolute bottom-4 right-4">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-4 py-2",
              "font-mono text-[10px] uppercase tracking-[.06em] text-white",
              "transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
            )}
          >
            Ver caso
            <ArrowUpRight size={10} aria-hidden="true" />
          </span>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-baseline justify-between gap-3 px-0.5">
        <p className="display italic text-[22px] leading-tight text-[var(--fg)]">
          {item.name}
        </p>
        <span className="shrink-0 font-mono text-[11px] uppercase tracking-[.06em] text-[var(--fg-mute)]">
          {item.tag}
        </span>
      </div>
    </article>
  );
}

// ── Section ────────────────────────────────────────────────────────────────

export function Work() {
  const featured = work.find((c) => c.featured)!;
  const rest = work.filter((c) => !c.featured);

  return (
    <section
      id="trabalhos"
      className="py-[120px] max-[980px]:py-[80px] max-[600px]:py-16"
    >
      <Container>
        <Reveal>
          {/* Section header */}
          <div className="mb-12 max-[980px]:mb-8">
            <h2 className="display leading-[.92] tracking-[-0.025em] text-[clamp(40px,6vw,96px)]">
              {workSection.heading}
            </h2>
          </div>

          {/* Grid — featured card spans 2 rows on desktop */}
          <div className="grid grid-cols-1 gap-6 min-[980px]:grid-cols-[1.4fr_1fr]">
            {/* Featured card — col 1, row span 2 */}
            <div className="min-[980px]:row-span-2">
              <WorkCard item={featured} />
            </div>

            {/* Remaining 4 cards — col 2 on desktop, continue in 1 col on mobile */}
            {rest.map((item) => (
              <WorkCard key={item.slug} item={item} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
