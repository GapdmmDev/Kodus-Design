"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

let _observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  if (!_observer) {
    _observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            _observer?.unobserve(entry.target);
          }
        }
      },
      // threshold 0.05: qualquer 5% visível já dispara — mais robusto em mobile
      { threshold: 0.05 }
    );
  }
  return _observer;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Progressive enhancement: só esconde quando JS está rodando
    el.classList.add("reveal-js");

    const observer = getObserver();
    observer.observe(el);

    return () => {
      observer.unobserve(el);
      el.classList.remove("reveal-js", "in");
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
