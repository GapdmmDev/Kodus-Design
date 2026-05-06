"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/lib/content";
import { cn } from "@/lib/cn";

const CARD_TOP = 80;
const MAX_SCALE_LOSS = 0.06;

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Stacking scale + opacity
  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    function updateCardScale() {
      cards.forEach((card, i) => {
        if (i >= cards.length - 1) {
          card.style.transform = "translateY(0)";
          return;
        }
        const nextCard = cards[i + 1];
        const distanceRemaining = Math.max(
          0,
          nextCard.getBoundingClientRect().top - CARD_TOP,
        );
        const progress = Math.max(
          0,
          Math.min(1, 1 - distanceRemaining / card.offsetHeight),
        );
        const stackDepth = cards.length - 1 - i;
        card.style.transform = `translateY(${8 * stackDepth * progress}px)`;
        card.style.opacity = "1";
      });
    }

    window.addEventListener("scroll", updateCardScale, { passive: true });
    updateCardScale();
    return () => window.removeEventListener("scroll", updateCardScale);
  }, []);

  // Section fade-in
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="servicos"
      className="services-section py-[120px] max-[980px]:py-[80px] max-[600px]:py-16"
    >
      <Container>
        {/* ── Section header ─────────────────────────────────────── */}
        <Reveal className="mb-16 flex items-center justify-between gap-8 max-[980px]:mb-10 max-[980px]:flex-col max-[980px]:items-start">
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
                  ),
                )}
              </span>
            ))}
          </h2>

          <p className="font-mono max-w-[280px] text-[11px] uppercase tracking-[.06em] leading-relaxed text-[var(--fg-dim)] max-[980px]:max-w-none max-[600px]:hidden">
            {services.meta}
          </p>
        </Reveal>

        {/* ── Service list ───────────────────────────────────────── */}
        <div className="border-t border-[var(--line)]">
          {services.items.map((item, i) => (
            <div
              key={item.idx}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="service-card"
              style={{ zIndex: i + 1 }}
            >
              <Reveal delay={i * 80}>
              <Link
                href="/formulario"
                aria-label={`${item.name}${item.em} — começar projeto`}
                className={cn(
                  "svc-row group relative flex items-center py-9 max-[980px]:py-7 max-[600px]:py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
                  i === services.items.length - 1 && "border-b border-[var(--line)]",
                )}
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
                    "min-[980px]:grid min-[980px]:grid-cols-[80px_1fr] min-[980px]:items-center",
                    "grid grid-cols-[48px_1fr] items-center",
                    "max-[980px]:gap-4",
                  )}
                >
                  {/* Index */}
                  <span className="service-idx font-mono text-[13px]">
                    {item.idx}
                  </span>

                  {/* Name */}
                  <span
                    className={cn(
                      "display leading-none tracking-[-0.02em]",
                      "text-[clamp(28px,8vw,42px)] min-[980px]:text-[clamp(36px,5vw,68px)]",
                      "min-[980px]:whitespace-nowrap",
                    )}
                  >
                    {item.name}{" "}
                    <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
                      {item.em}
                    </em>
                  </span>
                </div>

                {/* Arrow */}
                <ArrowUpRight
                  size={28}
                  aria-hidden="true"
                  className="svc-arrow relative shrink-0 text-[var(--accent)]"
                />
              </Link>
              </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
