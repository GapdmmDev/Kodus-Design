"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { hero } from "@/lib/content";

const barData = [30, 45, 38, 55, 48, 70, 90];

export function BrowserMockDashboard() {
  const [s1, s2, s3] = hero.stats;

  const target = parseInt(s1.value.replace(/[^0-9]/g, ""), 10);
  const prefix = s1.value.match(/^[^0-9]*/)?.[0] ?? "";
  const suffix = s1.value.match(/[^0-9]*$/)?.[0] ?? "";

  const [count, setCount] = useState(0);
  const [counterDone, setCounterDone] = useState(false);

  useEffect(() => {
    const duration = 1600;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setCounterDone(true);
      }
    };

    requestAnimationFrame(tick);
  }, [target]);

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="overflow-hidden rounded-[14px] border border-[var(--line-strong)]"
      style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,.5)" }}
      aria-hidden="true"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-[var(--line)] bg-[var(--bg-2)] px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <div className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex h-6 flex-1 items-center rounded bg-[var(--bg)] px-3">
          <span className="truncate font-mono text-[10px] text-[var(--fg-mute)]">
            {hero.browserMock.url}
          </span>
        </div>
      </div>

      {/* Dashboard body */}
      <div className="bg-[var(--bg-2)] p-5 max-[600px]:p-4">
        {/* Header row */}
        <div className="mb-4">
          <span className="font-mono text-[10px] uppercase tracking-[.08em] text-[var(--fg-mute)]">
            Relatório de conversão
          </span>
        </div>

        {/* Main metric */}
        <div className="mb-3 rounded-lg border border-[var(--line)] bg-[var(--bg)] px-4 py-3">
          <p className="font-mono text-[10px] uppercase tracking-[.06em] text-[var(--fg-mute)]">
            {s1.label}
          </p>
          <p className="mt-1 font-mono text-[clamp(28px,4vw,40px)] font-medium leading-none text-[var(--accent)]">
            {prefix}{count}{suffix}
          </p>
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: counterDone ? 1 : 0, y: counterDone ? 0 : 6 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mt-1.5 font-mono text-[10px] text-[#28c840]"
          >
            ↑ vs. antes do projeto
          </motion.p>
        </div>

        {/* Bar chart */}
        <div className="mb-3 rounded-lg border border-[var(--line)] bg-[var(--bg)] px-4 pb-3 pt-3">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[.06em] text-[var(--fg-mute)]">
            Últimas 7 semanas
          </p>
          <div className="flex h-14 items-end gap-1.5">
            {barData.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-sm"
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.35, delay: i * 0.1, ease: "easeOut" }}
                style={{
                  background:
                    i === barData.length - 1
                      ? "var(--accent)"
                      : "var(--line-strong)",
                }}
              />
            ))}
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-[var(--line)] bg-[var(--bg)] px-3 py-2.5">
            <p className="font-mono text-[9px] uppercase tracking-[.06em] text-[var(--fg-mute)]">
              {s2.label}
            </p>
            <p className="mt-1 font-mono text-[18px] font-medium leading-none text-[var(--fg)]">
              {s2.value}
            </p>
          </div>
          <div className="rounded-lg border border-[var(--line)] bg-[var(--bg)] px-3 py-2.5">
            <p className="font-mono text-[9px] uppercase tracking-[.06em] text-[var(--fg-mute)]">
              {s3.label}
            </p>
            <p className="mt-1 font-mono text-[18px] font-medium leading-none text-[var(--fg)]">
              {s3.value}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
