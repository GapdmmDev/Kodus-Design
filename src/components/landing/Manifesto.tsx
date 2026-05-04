import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { manifesto } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="py-[120px] max-[980px]:py-[80px] max-[600px]:py-16"
    >
      <Container>
        <Reveal>
          {/* ── Section header ─────────────────────────────────────── */}
          <div className="mb-16 flex items-center justify-between gap-8 max-[980px]:mb-10 max-[980px]:flex-col max-[980px]:items-start">
            <h2
              className="display shrink-0 leading-[.92] tracking-[-0.025em] text-[clamp(40px,6vw,96px)]"
            >
              {manifesto.heading}
            </h2>
            <p className="font-mono max-w-[280px] text-[13px] leading-relaxed text-[var(--fg-dim)] max-[980px]:max-w-none">
              {manifesto.meta}
            </p>
          </div>

          {/* ── 3-column grid ──────────────────────────────────────── */}
          <div
            className={cn(
              // Desktop: 3 equal columns separated by border-right
              "grid min-[980px]:grid-cols-3",
              // Mobile: 1 column
              "grid-cols-1",
            )}
          >
            {manifesto.items.map((item, i) => (
              <div
                key={item.num}
                className={cn(
                  "flex flex-col gap-4 py-8 px-0",
                  // Desktop: right border as divider (not on last)
                  "min-[980px]:px-10 min-[980px]:first:pl-0 min-[980px]:last:pr-0",
                  i < manifesto.items.length - 1 && [
                    "min-[980px]:border-r min-[980px]:border-[var(--line)]",
                    // Mobile: bottom border as divider
                    "border-b border-[var(--line)] max-[980px]:pb-8",
                  ],
                  // First card: no left padding on desktop
                  i > 0 && "max-[980px]:pt-8",
                )}
              >
                {/* Number */}
                <span className="font-mono text-[11px] uppercase tracking-[.08em] text-[var(--fg-mute)]">
                  {item.num}
                </span>

                {/* Title */}
                <h3
                  className="display italic leading-tight"
                  style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
                >
                  {item.title}
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
