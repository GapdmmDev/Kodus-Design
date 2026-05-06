"use client";

import { motion } from "framer-motion";

export function LiveDot() {
  return (
    <motion.span
      className="relative inline-flex h-4 w-4 shrink-0 items-center justify-center"
      animate={{ opacity: [1, 0.25, 1] }}
      transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
      aria-hidden="true"
    >
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#28c840] opacity-25" />
      <span className="h-2 w-2 rounded-full bg-[#28c840]" />
    </motion.span>
  );
}
