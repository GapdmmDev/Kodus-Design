import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Services() {
  return (
    <section
      id="servicos"
      className="py-[120px] max-[980px]:py-[80px] max-[600px]:py-16"
    >
      <Container>
        <Reveal>
          {/* ── Section header ─────────────────────────────────────── */}
          <div className="mb-16 flex items-center justify-between gap-8 max-[980px]:mb-10 max-[980px]:flex-col max-[980px]:items-start">
            <h2
              className="display shrink-0 leading-[.92] tracking-[-0.025em] text-[clamp(40px,6vw,96px)]"
            >
              {services.heading.map((line, li) => (
                <span key={li} className="block whitespace-nowrap">
                  {line.map((seg, si) =>
                    seg.accent ? (
                      <em
                        key={si}
                        style={{ fontStyle: "italic", color: "var(--accent)" }}
                      >
                        {seg.text}
                      </em>
                    ) : (
                      <span key={si}>{seg.text}</span>
                    )
                  )}
                </span>
              ))}
            </h2>

            <p className="font-mono max-w-[280px] text-[13px] leading-relaxed text-[var(--fg-dim)] max-[980px]:max-w-none">
              {services.meta}
            </p>
          </div>

          {/* ── Service list ───────────────────────────────────────── */}
          <div className="border-t border-[var(--line)]">
            {services.items.map((item) => (
              <a
                key={item.idx}
                href="#contato"
                aria-label={`${item.name}${item.em} — ir para contato`}
                className="group relative flex items-center border-b border-[var(--line)] py-9 max-[980px]:py-7 max-[600px]:py-6"
              >
                {/* Hover gradient background */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, var(--accent-soft), transparent)",
                  }}
                  aria-hidden="true"
                />

                {/* Row content */}
                <div
                  className={cn(
                    "relative flex flex-1 items-baseline gap-8",
                    // Desktop 2-col grid: 80px idx + remaining name
                    "min-[980px]:grid min-[980px]:grid-cols-[80px_1fr] min-[980px]:items-center",
                    // Mobile 2-col grid: 48px idx + name
                    "grid grid-cols-[48px_1fr] items-center",
                    "max-[980px]:gap-4",
                  )}
                >
                  {/* Index */}
                  <span className="font-mono text-[13px] text-[var(--fg-mute)]">
                    {item.idx}
                  </span>

                  {/* Name */}
                  <span
                    className={cn(
                      "display leading-none tracking-[-0.02em]",
                      "text-[clamp(28px,8vw,42px)] min-[980px]:text-[clamp(36px,5vw,68px)]",
                      // No wrapping on desktop
                      "min-[980px]:whitespace-nowrap",
                    )}
                  >
                    {item.name}{" "}
                    <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
                      {item.em}
                    </em>
                  </span>
                </div>

                {/* Arrow — orange, slides in from right on desktop */}
                <ArrowUpRight
                  size={28}
                  aria-hidden="true"
                  className={cn(
                    "relative shrink-0 text-[var(--accent)]",
                    "transition-all duration-300 ease-out",
                    // Desktop: off-screen right → slides to position on hover
                    "min-[980px]:translate-x-8 min-[980px]:opacity-0",
                    "min-[980px]:group-hover:translate-x-0 min-[980px]:group-hover:opacity-100",
                    // Mobile: always visible at half opacity
                    "max-[980px]:opacity-50",
                  )}
                />
              </a>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
