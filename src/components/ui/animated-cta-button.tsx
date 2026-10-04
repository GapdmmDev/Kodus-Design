"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

const MotionLink = motion.create(Link);

const ease = [0.25, 0.1, 0.25, 1] as const;
const duration = 0.28;

// Math: padding=28, arrow=16, gap=4 → right=20, label-shift=-12
// At rest:  arrow at right:20 + x:26 → right edge 6px outside button → clipped ✓
// On hover: arrow at right:20 + x:0  → inside button, 4px from label right edge ✓

interface Props {
  href: string;
  label: string;
  className?: string;
}

export function AnimatedCtaButton({ href, label, className }: Props) {
  return (
    <MotionLink
      href={href}
      initial="rest"
      whileHover="hover"
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full",
        "border bg-[var(--accent)] px-7 py-3.5 text-sm font-medium text-white",
        "[border-color:var(--accent)] hover:[border-color:#000] transition-[border-color] duration-[280ms]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
        className
      )}
    >
      {/* Black fill slides up from bottom */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 bg-black"
        variants={{ rest: { y: "100%" }, hover: { y: 0 } }}
        transition={{ duration, ease }}
      />

      {/* Label in normal flow — determines button width */}
      <motion.span
        className="relative z-10"
        variants={{ rest: { x: 0 }, hover: { x: -12 } }}
        transition={{ duration, ease }}
      >
        {label}
      </motion.span>

      {/* Arrow absolutely positioned — starts outside right edge (clipped), slides in */}
      <motion.span
        aria-hidden="true"
        className="absolute z-10 flex items-center"
        style={{ right: 20 }}
        variants={{ rest: { x: 26, opacity: 0 }, hover: { x: 0, opacity: 1 } }}
        transition={{ duration, ease }}
      >
        <ArrowRight size={16} className="shrink-0" />
      </motion.span>
    </MotionLink>
  );
}
