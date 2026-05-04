import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { process } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Process() {
  return (
    <section
      id="processo"
      className="border-y border-[var(--line)] bg-[var(--bg-2)]"
    >
      <Container>
        <Reveal>
          {/* ── Section header ─────────────────────────────────────── */}
          <div className="border-b border-[var(--line)] py-12 max-[980px]:py-8">
            <h2 className="display leading-[.92] tracking-[-0.025em] text-[clamp(36px,5vw,80px)]">
              Processo{" "}
              <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
                direto.
              </em>{" "}
              Sem floreio.
            </h2>
          </div>

          {/* ── 4-step grid — 1px gap simulates borders ─────────────── */}
          <div
            className={cn(
              "grid gap-px",
              // Desktop: 4 columns
              "min-[980px]:grid-cols-4",
              // Tablet: 2 columns
              "max-[980px]:grid-cols-2",
              // Mobile: 1 column
              "max-[600px]:grid-cols-1",
            )}
            style={{ background: "var(--line)" }}
          >
            {process.map((step) => (
              <div
                key={step.num}
                className="flex flex-col justify-between gap-6 bg-[var(--bg-2)] p-8 max-[600px]:p-6"
              >
                {/* Top — number + title + body */}
                <div className="flex flex-col gap-4">
                  {/* Step number */}
                  <span
                    className="display italic leading-none"
                    style={{
                      fontSize: "clamp(56px, 6vw, 80px)",
                      color: "var(--accent)",
                    }}
                    aria-hidden="true"
                  >
                    {step.num}
                  </span>

                  <div className="flex flex-col gap-2">
                    {/* Title */}
                    <h4 className="text-[18px] font-medium leading-snug text-[var(--fg)]">
                      {step.title}
                    </h4>

                    {/* Body */}
                    <p className="text-[14px] leading-relaxed text-[var(--fg-dim)]">
                      {step.body}
                    </p>
                  </div>
                </div>

                {/* Bottom — time tag */}
                <span className="font-mono text-[11px] uppercase tracking-[.08em] text-[var(--fg-mute)]">
                  {step.tag}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
