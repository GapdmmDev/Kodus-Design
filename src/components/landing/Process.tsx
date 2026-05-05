import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { process, processSection } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Process() {
  return (
    <section
      id="processo"
      className="border-b border-[var(--line)] bg-[var(--bg-2)]"
    >
      <Container>
        <Reveal>
          <div className="py-[80px] min-[980px]:py-[120px]">
            {/* ── Top heading: "Processo direto." ─────────────────────── */}
            <h2
              aria-label={`${processSection.headingTop.map((s) => s.text).join("")} ${processSection.headingBottom}`}
              className="display mb-12 leading-[.92] tracking-[-0.025em] text-[clamp(36px,5vw,80px)] max-[980px]:mb-8"
            >
              {processSection.headingTop.map((seg, i) =>
                seg.accent ? (
                  <em key={i} style={{ fontStyle: "italic", color: "var(--accent)" }}>
                    {seg.text}
                  </em>
                ) : (
                  <span key={i}>{seg.text}</span>
                )
              )}
            </h2>

            {/* ── 4-step grid — 1px gap simulates borders ─────────────── */}
            <div
              className={cn(
                "grid gap-px",
                "min-[980px]:grid-cols-4",
                "max-[980px]:grid-cols-2",
                "max-[600px]:grid-cols-1",
              )}
              style={{ background: "var(--line)" }}
            >
              {process.map((step) => (
                <div
                  key={step.num}
                  className="flex flex-col justify-between gap-6 bg-[var(--bg-2)] p-8 max-[600px]:p-6"
                >
                  <div className="flex flex-col gap-4">
                    <span
                      className="display italic leading-none"
                      style={{ fontSize: "clamp(56px, 6vw, 80px)", color: "var(--accent)" }}
                      aria-hidden="true"
                    >
                      {step.num}
                    </span>

                    <div className="flex flex-col gap-2">
                      <h3 className="text-[18px] font-medium leading-snug text-[var(--fg)]">
                        {step.title}
                      </h3>
                      <p className="text-[14px] leading-relaxed text-[var(--fg-dim)]">
                        {step.body}
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-[11px] uppercase tracking-[.08em] text-[var(--fg-mute)]">
                    {step.tag}
                  </span>
                </div>
              ))}
            </div>

            {/* ── Bottom heading: "Sem floreio." right-aligned ────────── */}
            <p
              className="display mt-8 text-right italic leading-[.92] tracking-[-0.025em] text-[clamp(36px,5vw,80px)] text-[var(--fg)]"
              aria-hidden="true"
            >
              {processSection.headingBottom}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
