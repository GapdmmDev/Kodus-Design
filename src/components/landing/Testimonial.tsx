import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { testimonial } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Testimonial() {
  return (
    <section
      id="depoimento"
      className="py-[120px] max-[980px]:py-[80px] max-[600px]:py-16"
    >
      <Container>
        <Reveal>
          <div className="grid grid-cols-1 gap-16 min-[980px]:grid-cols-[1.6fr_1fr] min-[980px]:gap-[80px]">
            {/* ── Left — eyebrow + quote + author ────────────────────── */}
            <div className="flex flex-col gap-8">
              <Eyebrow>{testimonial.eyebrow}</Eyebrow>

              {/* Quote — opening and closing marks inline */}
              <blockquote>
                <p
                  className={cn(
                    "display leading-[1.1] tracking-[-0.02em]",
                    "text-[clamp(28px,4vw,64px)] min-[980px]:text-[clamp(36px,5.4vw,84px)]",
                    "text-[var(--fg)]",
                  )}
                >
                  <span className="text-[var(--fg-mute)]">&#8220;</span>
                  {testimonial.quote.map((seg, i) =>
                    seg.accent ? (
                      <em key={i} style={{ fontStyle: "italic", color: "var(--accent)" }}>
                        {seg.text}
                      </em>
                    ) : (
                      <span key={i}>{seg.text}</span>
                    )
                  )}
                  <span className="text-[var(--fg-mute)]">&#8221;</span>
                </p>
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="h-11 w-11 shrink-0 rounded-full border-2 border-[var(--line-strong)]"
                  style={{ background: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)" }}
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-0.5">
                  {/* Geist sans, not display */}
                  <span className="text-[17px] font-medium leading-tight text-[var(--fg)]">
                    {testimonial.author.name}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[.08em] text-[var(--fg-mute)]">
                    {testimonial.author.role}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Right — 3 stats ─────────────────────────────────────── */}
            <div className="flex flex-col justify-center gap-8 max-[980px]:flex-row max-[600px]:flex-col max-[600px]:gap-6">
              {testimonial.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="border-l-2 border-[var(--accent)] pl-6"
                >
                  <p
                    className="display italic leading-none text-[var(--fg)]"
                    style={{ fontSize: "clamp(36px, 4vw, 64px)" }}
                  >
                    {stat.value}
                  </p>
                  <span className="mt-2 block font-mono text-[11px] uppercase tracking-[.08em] text-[var(--fg-mute)]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
