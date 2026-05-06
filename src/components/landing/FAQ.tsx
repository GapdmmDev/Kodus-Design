"use client";

import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { faq } from "@/lib/content";
import { cn } from "@/lib/cn";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ── FAQItem — mede altura em px para evitar reflow do height:"auto" ────────

function FAQItem({
  item,
  isOpen,
  onToggle,
}: {
  item: { q: string; a: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Mede a altura natural do conteúdo uma vez após o mount
  useEffect(() => {
    if (bodyRef.current) setHeight(bodyRef.current.offsetHeight);
  }, []);

  return (
    <div className="border-b border-[var(--line)]">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          "group flex min-h-[56px] w-full items-center justify-between gap-4 py-5 text-left",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
        )}
      >
        <span className="display italic text-[clamp(18px,2vw,24px)] leading-snug text-[var(--fg)]">
          {item.q}
        </span>
        <span
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[var(--accent)]",
            "transition-transform duration-300",
            isOpen && "rotate-45",
          )}
          aria-hidden="true"
        >
          <Plus size={18} />
        </span>
      </button>

      {/* Anima para px, não "auto" — sem reflow de medição durante a transição */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? height : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.28, ease: EASE }}
        style={{ overflow: "hidden" }}
      >
        <div ref={bodyRef}>
          <p className="pb-6 text-[15px] leading-relaxed text-[var(--fg-dim)]">
            {item.a}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-[120px] max-[980px]:py-[80px] max-[600px]:py-16"
    >
      <Container>
        <Reveal>
          <div className="grid grid-cols-1 gap-12 min-[980px]:grid-cols-[1fr_1.4fr] min-[980px]:gap-20">
            {/* ── Left — eyebrow + heading ────────────────────────────── */}
            <div className="flex flex-col gap-5">
              <Eyebrow>{faq.eyebrow}</Eyebrow>

              <h2
                className="display leading-[1.05] tracking-[-0.02em] text-[clamp(38px,5vw,68px)]"
              >
                {faq.heading.map((seg, i) => (
                  <span key={i}>
                    {seg.accent ? (
                      <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
                        {seg.text}
                      </em>
                    ) : (
                      <span>{seg.text}</span>
                    )}
                    {seg.accent && <br />}
                  </span>
                ))}
              </h2>
            </div>

            {/* ── Right — accordion ───────────────────────────────────── */}
            <div className="border-t border-[var(--line)]">
              {faq.items.map((item, i) => (
                <FAQItem
                  key={i}
                  item={item}
                  isOpen={openIdx === i}
                  onToggle={() => setOpenIdx(openIdx === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
