"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate, useMotionValue, useInView } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { testimonial } from "@/lib/content";
import { cn } from "@/lib/cn";

// ── CountUpStat ────────────────────────────────────────────────────────────

function parseStatValue(raw: string) {
  const match = raw.match(/^([+\-]?)(\d+[,.]?\d*)(.*)$/);
  if (!match) return { prefix: "", num: 0, suffix: raw, decimals: 0, useComma: false };
  const prefix = match[1];
  const hasComma = match[2].includes(",");
  const numStr = match[2].replace(",", ".");
  const num = parseFloat(numStr);
  const suffix = match[3];
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { prefix, num, suffix, decimals, useComma: hasComma };
}

function CountUpStat({ value, label }: { value: string; label: string }) {
  const { prefix, num, suffix, decimals, useComma } = parseStatValue(value);
  const motionVal = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    return motionVal.on("change", (latest) => {
      if (decimals > 0) {
        const formatted = latest.toFixed(decimals);
        setDisplay(useComma ? formatted.replace(".", ",") : formatted);
      } else {
        setDisplay(Math.round(latest).toString());
      }
    });
  }, [motionVal, decimals, useComma]);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionVal, num, { duration: 1.5, ease: "easeOut" });
    return controls.stop;
  }, [isInView, motionVal, num]);

  return (
    <div ref={ref} className="border-l-2 border-[var(--accent)] pl-6">
      <p
        className="display italic leading-none text-[var(--fg)]"
        style={{ fontSize: "clamp(36px, 4vw, 64px)" }}
      >
        {prefix}{display}{suffix}
      </p>
      <span className="mt-2 block font-mono text-[11px] uppercase tracking-[.08em] text-[var(--fg-mute)]">
        {label}
      </span>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────

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
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-[var(--line-strong)]">
                  <Image
                    src="/carol-depoimento.jpg"
                    alt={testimonial.author.name}
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[17px] font-medium leading-tight text-[var(--fg)]">
                    {testimonial.author.name}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[.08em] text-[var(--fg-mute)]">
                    {testimonial.author.role}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Right — animated stats ──────────────────────────────── */}
            <div className="flex flex-col justify-center gap-8 max-[980px]:flex-row max-[600px]:flex-col max-[600px]:gap-6">
              {testimonial.stats.map((stat) => (
                <CountUpStat key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
