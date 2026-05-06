import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { manifesto } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="pb-[120px] max-[980px]:pb-[80px] max-[600px]:pb-16"
    >
      <Container>
        <Reveal>
          {/* ── Section header ─────────────────────────────────────── */}
          <div className="mb-16 flex items-center justify-between gap-8 max-[980px]:mb-10 max-[980px]:flex-col max-[980px]:items-start">
            <h2 className="display shrink-0 leading-[.92] tracking-[-0.025em] text-[clamp(40px,6vw,96px)]">
              {manifesto.heading.map((seg, i) =>
                seg.accent ? (
                  <em key={i} style={{ fontStyle: "italic", color: "var(--accent)" }}>
                    {seg.text}
                  </em>
                ) : (
                  <span key={i}>{seg.text}</span>
                )
              )}
            </h2>

            <p className="font-mono max-w-[280px] text-[11px] uppercase tracking-[.06em] leading-relaxed text-[var(--fg-dim)] max-[980px]:max-w-none">
              {manifesto.meta}
            </p>
          </div>

          {/* ── 3-column grid ──────────────────────────────────────── */}
          <div className="grid grid-cols-1 min-[980px]:grid-cols-3">
            {manifesto.items.map((item, i) => (
              <div
                key={item.num}
                className={cn(
                  "flex flex-col gap-4 py-8",
                  // Desktop horizontal padding + right border divider
                  "min-[980px]:px-10 min-[980px]:first:pl-0 min-[980px]:last:pr-0",
                  i < manifesto.items.length - 1 && "min-[980px]:border-r min-[980px]:border-[var(--line)]",
                  // Mobile bottom border divider (only between items, not after last)
                  i < manifesto.items.length - 1 && "max-[980px]:border-b max-[980px]:border-[var(--line)]",
                  i > 0 && "max-[980px]:pt-8",
                )}
              >
                {/* Number */}
                <span className="font-mono text-[11px] uppercase tracking-[.08em] text-[var(--fg-mute)]">
                  {item.num}
                </span>

                {/* Title — italic, accent on first word */}
                <h3
                  className="display italic leading-tight"
                  style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
                >
                  {item.title.map((seg, si) =>
                    seg.accent ? (
                      <span key={si} style={{ color: "var(--accent)" }}>
                        {seg.text}
                      </span>
                    ) : (
                      <span key={si}>{seg.text}</span>
                    )
                  )}
                </h3>

                {/* Body */}
                <p className="text-[15px] leading-relaxed text-[var(--fg-dim)]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
