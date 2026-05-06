"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { work, workSection } from "@/lib/content";
import type { WorkCase } from "@/lib/content";

const thumbVariants = {
  rest: { scale: 1, filter: "blur(0px)" },
  hover: { scale: 1.2, filter: "blur(5px)" },
};

const arrowVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1 },
};

const transition = {
  duration: 0.35,
  ease: [0.25, 0.46, 0.45, 0.94] as number[],
};

// ── WorkCard ───────────────────────────────────────────────────────────────

function WorkCard({ item }: { item: WorkCase }) {
  return (
    <article className="flex flex-col gap-3">
      <motion.div
        className="group relative aspect-[16/10] cursor-pointer overflow-hidden rounded-[16px] border border-[var(--line-strong)]"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        {/* Zoom + blur */}
        <motion.div
          className="absolute inset-0"
          variants={thumbVariants}
          transition={transition}
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(min-width: 980px) 50vw, 100vw"
          />
        </motion.div>

        {/* Case label — top left */}
        <div className="absolute inset-x-4 top-4">
          <span className="rounded-[6px] bg-black/50 px-2 py-1 font-mono text-[10px] uppercase tracking-[.06em] text-white backdrop-blur-sm">
            {item.caseLabel}
          </span>
        </div>

        {/* Arrow — center */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          variants={arrowVariants}
          transition={{ duration: 0.3 }}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/40 backdrop-blur-md">
            <ArrowUpRight size={30} className="text-white" aria-hidden="true" />
          </span>
        </motion.div>
      </motion.div>

      {/* Meta */}
      <div className="flex items-baseline justify-between gap-3 px-0.5">
        <p className="font-sans text-[17px] leading-tight text-[var(--fg)]">
          {item.name}
        </p>
        <span className="shrink-0 font-mono text-[11px] uppercase tracking-[.06em] text-[var(--fg-mute)]">
          {item.tag}
        </span>
      </div>
    </article>
  );
}

// ── Section ────────────────────────────────────────────────────────────────

export function Work() {
  return (
    <section
      id="trabalhos"
      className="py-[120px] max-[980px]:py-[80px] max-[600px]:py-16"
    >
      <Container>
        <Reveal>
          <div className="mb-12 max-[980px]:mb-8">
            <h2 className="display leading-[.92] tracking-[-0.025em] text-[clamp(40px,6vw,96px)]">
              {workSection.heading}
            </h2>
          </div>

          {/* Equal 2-column grid */}
          <div className="grid grid-cols-1 gap-6 min-[980px]:grid-cols-2">
            {work.map((item) => (
              <WorkCard key={item.slug} item={item} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
