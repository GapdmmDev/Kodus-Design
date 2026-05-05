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

              {/* Quote */}
              <blockquote>
                {/* Decorative opening mark */}
                <span
                  className="display block leading-none text-[var(--fg-mute)]"
                  style={{ fontSize: "clamp(60px, 8vw, 120px)", lineHeight: 0.8 }}
                  aria-hidden="true"
                >
                  &#8220;
                </span>

                <p
                  className={cn(
                    "display -mt-2 leading-[1.1] tracking-[-0.02em]",
                    "text-[clamp(28px,4vw,64px)] min-[980px]:text-[clamp(36px,5.4vw,84px)]",
                    "text-[var(--fg)]",
                  )}
                >
                  {testimonial.quote.map((seg, i) =>
                    seg.accent ? (
                      <em key={i} style={{ fontStyle: "italic", color: "var(--accent)" }}>
                        {seg.text}
                      </em>
                    ) : (
                      <span key={i}>{seg.text}</span>
                    )
                  )}
                </p>
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Avatar placeholder */}
                <div
                  className="h-11 w-11 shrink-0 rounded-full border-2 border-[var(--line-strong)]"
                  style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
                  }}
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="display italic text-[18px] leading-tight text-[var(--fg)]">
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
