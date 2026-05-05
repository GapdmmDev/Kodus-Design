"use client";
import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { faq } from "@/lib/content";
import { cn } from "@/lib/cn";

export function FAQ() {
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
                    {/* Line break after "todo cliente" → puts "pergunta antes." on its own line */}
                    {seg.accent && <br />}
                  </span>
                ))}
              </h2>
            </div>

            {/* ── Right — accordion ───────────────────────────────────── */}
            <Accordion.Root
              type="single"
              collapsible
              className="border-t border-[var(--line)]"
            >
              {faq.items.map((item, i) => (
                <Accordion.Item
                  key={i}
                  value={`item-${i}`}
                  className="border-b border-[var(--line)]"
                >
                  {/* Trigger */}
                  <Accordion.Trigger
                    className={cn(
                      "group flex min-h-[56px] w-full items-center justify-between gap-4 py-5 text-left",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
                    )}
                  >
                    <span
                      className="display italic text-[clamp(18px,2vw,24px)] leading-snug text-[var(--fg)]"
                    >
                      {item.q}
                    </span>

                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[var(--accent)] transition-transform duration-300 group-data-[state=open]:rotate-45"
                      aria-hidden="true"
                    >
                      <Plus size={18} />
                    </span>
                  </Accordion.Trigger>

                  {/* Content */}
                  <Accordion.Content
                    className="overflow-hidden data-[state=closed]:animate-[accordion-up_0.3s_ease-out] data-[state=open]:animate-[accordion-down_0.3s_ease-out]"
                  >
                    <p className="pb-6 text-[15px] leading-relaxed text-[var(--fg-dim)]">
                      {item.a}
                    </p>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
