"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { process, processSection } from "@/lib/content";
import { cn } from "@/lib/cn";

// 400vh section → 300vh de scroll enquanto travado.
// Cada card tem ~60vh de animação, 15vh de gap antes do próximo.
const RANGES: [number, number][] = [
  [0.02, 0.22],
  [0.27, 0.47],
  [0.52, 0.72],
  [0.77, 0.97],
];

// Distância inicial abaixo do grid — deve ser ≥ altura do card (~250px)
// para que o card comece completamente oculto pelo overflow:hidden do grid
const START_Y = 300;

function CardContent({ step }: { step: (typeof process)[number] }) {
  return (
    <>
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
    </>
  );
}

function AnimatedCard({
  step,
  index,
  progress,
  isLast,
}: {
  step: (typeof process)[number];
  index: number;
  progress: MotionValue<number>;
  isLast: boolean;
}) {
  const [start, end] = RANGES[index];
  // Apenas translateY — sem opacidade
  const y = useTransform(progress, [start, end], [START_Y, 0]);

  return (
    <motion.div
      style={{ y }}
      className={cn(
        "flex flex-col justify-between gap-6 bg-[var(--bg-2)] p-8",
        // Borda direita entre cards (substitui o gap trick)
        !isLast && "border-r border-[var(--line)]",
      )}
    >
      <CardContent step={step} />
    </motion.div>
  );
}

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    // 400vh = 100vh sticky + 300vh de scroll para animar os cards
    <section
      ref={sectionRef}
      id="processo"
      className="relative min-[980px]:h-[400vh]"
    >

      {/* ── DESKTOP ≥980px: sticky scroll animation ───────────────────────
          min-[980px]:h-full garante que o wrapper herde os 400vh da section,
          dando ao sticky a zona de ancoragem correta (300vh de scroll) */}
      <div className="hidden min-[980px]:block min-[980px]:h-full">
        <div className="sticky top-0 h-screen overflow-hidden border-b border-[var(--line)] bg-[var(--bg-2)]">
          {/* flex aqui referencia o h-screen diretamente — justify-center funciona */}
          <div className="flex h-full flex-col justify-center">
          <Container>
            <div className="flex flex-col gap-12 py-16">

              <h2
                aria-label={`${processSection.headingTop.map((s) => s.text).join("")} ${processSection.headingBottom}`}
                className="display leading-[.92] tracking-[-0.025em] text-[clamp(36px,5vw,80px)]"
              >
                {processSection.headingTop.map((seg, i) =>
                  seg.accent ? (
                    <em key={i} style={{ fontStyle: "italic", color: "var(--accent)" }}>
                      {seg.text}
                    </em>
                  ) : (
                    <span key={i}>{seg.text}</span>
                  ),
                )}
              </h2>

              {/* overflow-hidden clippa os cards que estão abaixo (translateY > 0)
                  background var(--bg-2) evita o rgba-overlay que criava #242424 */}
              <div
                className="grid grid-cols-4 overflow-hidden bg-[var(--bg-2)]"
              >
                {process.map((step, i) => (
                  <AnimatedCard
                    key={step.num}
                    step={step}
                    index={i}
                    progress={scrollYProgress}
                    isLast={i === process.length - 1}
                  />
                ))}
              </div>

              <p
                className="display text-right italic leading-[.92] tracking-[-0.025em] text-[clamp(36px,5vw,80px)] text-[var(--fg)]"
                aria-hidden="true"
              >
                {processSection.headingBottom}
              </p>

            </div>
          </Container>
          </div>
        </div>
      </div>

      {/* ── MOBILE/TABLET <980px: layout estático ────────────────────────── */}
      <div className="min-[980px]:hidden border-b border-[var(--line)] bg-[var(--bg-2)]">
        <Container>
          <Reveal>
            <div className="py-[80px]">
              <h2
                aria-label={`${processSection.headingTop.map((s) => s.text).join("")} ${processSection.headingBottom}`}
                className="display mb-8 leading-[.92] tracking-[-0.025em] text-[clamp(36px,5vw,80px)]"
              >
                {processSection.headingTop.map((seg, i) =>
                  seg.accent ? (
                    <em key={i} style={{ fontStyle: "italic", color: "var(--accent)" }}>
                      {seg.text}
                    </em>
                  ) : (
                    <span key={i}>{seg.text}</span>
                  ),
                )}
              </h2>

              <div
                className={cn("grid", "max-[980px]:grid-cols-2", "max-[600px]:grid-cols-1", "max-[600px]:-mx-5")}
                style={{ background: "var(--line)" }}
              >
                {process.map((step) => (
                  <div
                    key={step.num}
                    className="flex flex-col justify-between gap-6 bg-[var(--bg-2)] p-8 max-[600px]:p-6"
                  >
                    <CardContent step={step} />
                  </div>
                ))}
              </div>

              <p
                className="display mt-8 text-right italic leading-[.92] tracking-[-0.025em] text-[clamp(36px,5vw,80px)] text-[var(--fg)]"
                aria-hidden="true"
              >
                {processSection.headingBottom}
              </p>
            </div>
          </Reveal>
        </Container>
      </div>

    </section>
  );
}
