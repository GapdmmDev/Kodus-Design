"use client";

import { useEffect, useRef, createContext, useContext } from "react";
import Lenis from "lenis";
import { useMotionValue, MotionValue, useAnimationFrame } from "framer-motion";

// ── Context ───────────────────────────────────────────────────────────────

const LenisContext = createContext<{
  lenis: Lenis | null;
  scrollY: MotionValue<number>;
} | null>(null);

export function useLenis() {
  const ctx = useContext(LenisContext);
  if (!ctx) throw new Error("useLenis must be used inside <SmoothScroll>");
  return ctx;
}

// ── Provider ──────────────────────────────────────────────────────────────

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const scrollY = useMotionValue(0);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      scrollY.set(scroll);
    });

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [scrollY]);

  // Usa o loop do Framer Motion — elimina dois RAFs concorrentes
  useAnimationFrame((time) => {
    lenisRef.current?.raf(time);
  });

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current, scrollY }}>
      {children}
    </LenisContext.Provider>
  );
}
