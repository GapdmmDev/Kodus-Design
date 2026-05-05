"use client";
import { useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ProgressBar } from "./ProgressBar";
import { Step1Identidade } from "./Step1Identidade";
import { Step2Projeto } from "./Step2Projeto";
import { Step3Investimento } from "./Step3Investimento";
import { Sucesso } from "./Sucesso";
import type { Step1Data, Step2Data, Step3Data, Briefing } from "@/lib/briefing-schema";

type StepId = 1 | 2 | 3 | "success";

const VARIANTS = {
  enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 28 : -28 }),
  center: { opacity: 1, y: 0 },
  exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -28 : 28 }),
};

export function FormShell() {
  const [step, setStep] = useState<StepId>(1);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<Partial<Briefing>>({});
  const shouldReduce = useReducedMotion();

  const transition = shouldReduce
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.32, 0.72, 0, 1] };

  const goTo = useCallback((next: StepId, direction: number) => {
    setDir(direction);
    setStep(next);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: shouldReduce ? "instant" : "smooth" });
    }
  }, [shouldReduce]);

  const handleStep1 = useCallback((d: Step1Data) => {
    setData((p) => ({ ...p, ...d }));
    goTo(2, 1);
  }, [goTo]);

  const handleStep2 = useCallback((d: Step2Data) => {
    setData((p) => ({ ...p, ...d }));
    goTo(3, 1);
  }, [goTo]);

  const handleStep3 = useCallback(async (d: Step3Data) => {
    const full = { ...data, ...d } as Briefing;
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(full),
      });
    } catch {
      // proceed to success — provider wired later
    }
    goTo("success", 1);
  }, [data, goTo]);

  const stepNum = (step === "success" ? 3 : step) as 1 | 2 | 3;

  return (
    <>
      {step !== "success" && <ProgressBar step={stepNum} />}

      <main className="mx-auto w-full max-w-[760px] flex-1 px-6 py-16 min-[600px]:py-20">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          {step === 1 && (
            <motion.div
              key="s1"
              custom={dir}
              variants={VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              <Step1Identidade defaultValues={data} onNext={handleStep1} />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="s2"
              custom={dir}
              variants={VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              <Step2Projeto
                defaultValue={data.tipo}
                onNext={handleStep2}
                onBack={() => goTo(1, -1)}
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="s3"
              custom={dir}
              variants={VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              <Step3Investimento
                defaultValues={{ orcamento: data.orcamento, prazo: data.prazo }}
                onNext={handleStep3}
                onBack={() => goTo(2, -1)}
              />
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              custom={1}
              variants={VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              <Sucesso />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
