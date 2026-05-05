"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { StepSchema2 } from "@/lib/briefing-schema";
import { cn } from "@/lib/cn";
import type { Step2Data } from "@/lib/briefing-schema";

interface Props {
  defaultValue?: string;
  onNext: (data: Step2Data) => void;
  onBack: () => void;
}

const OPTIONS = [
  { value: "landing", label: "Landing page", sub: "Uma página, um objetivo" },
  { value: "institucional", label: "Site institucional", sub: "Presença digital completa" },
  { value: "ecommerce", label: "E-commerce", sub: "Loja com checkout otimizado" },
  { value: "sistema", label: "Sistema custom", sub: "Produto digital sob medida" },
  { value: "outro", label: "Outro", sub: "Me conta o que você tem em mente" },
] as const;

type Tipo = Step2Data["tipo"];

export function Step2Projeto({ defaultValue, onNext, onBack }: Props) {
  const [selected, setSelected] = useState<Tipo | "">(
    (defaultValue as Tipo) ?? ""
  );
  const [error, setError] = useState("");
  const firstRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    firstRef.current?.focus();
  }, []);

  const validate = () => {
    const result = StepSchema2.safeParse({ tipo: selected });
    if (result.success) {
      setError("");
      onNext(result.data);
    } else {
      setError(result.error.issues[0]?.message ?? "Selecione uma opção");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { e.preventDefault(); validate(); }
  };

  return (
    <div onKeyDown={handleKeyDown}>
      <h1 className="display leading-[1.0] tracking-[-0.025em] text-[clamp(44px,7vw,80px)]">
        O que você quer{" "}
        <em style={{ fontStyle: "italic", color: "var(--accent)" }}>construir?</em>
      </h1>
      <p className="mt-4 text-[17px] leading-relaxed text-[var(--fg-dim)]">
        Escolha o que melhor descreve o projeto.
      </p>

      <div
        className="mt-10 grid grid-cols-1 gap-3 min-[600px]:grid-cols-2"
        role="radiogroup"
        aria-label="Tipo de projeto"
        aria-required="true"
      >
        {OPTIONS.map((opt, i) => (
          <button
            key={opt.value}
            ref={i === 0 ? firstRef : undefined}
            type="button"
            role="radio"
            aria-checked={selected === opt.value}
            onClick={() => { setSelected(opt.value); setError(""); }}
            className={cn(
              "flex min-h-[88px] flex-col items-start justify-center gap-1.5 rounded-[12px] border px-5 py-4 text-left",
              "transition-[transform,border-color,background-color] duration-150",
              "hover:-translate-y-px",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
              selected === opt.value
                ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                : "border-[var(--line)] bg-[var(--card)] hover:border-[var(--line-strong)]",
            )}
          >
            <div className="flex w-full items-center justify-between gap-2">
              <span className="text-[15px] font-medium text-[var(--fg)]">
                {opt.label}
              </span>
              {selected === opt.value && (
                <span
                  className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]"
                  aria-hidden="true"
                />
              )}
            </div>
            <span className="text-[13px] text-[var(--fg-dim)]">{opt.sub}</span>
          </button>
        ))}
      </div>

      {error && (
        <p className="mt-3 font-mono text-[11px] text-[#ef4444]" role="alert">
          {error}
        </p>
      )}

      <div className="mt-8 flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full",
            "border border-[var(--line-strong)] text-[var(--fg-dim)]",
            "transition-colors duration-150 hover:border-[var(--fg-mute)] hover:text-[var(--fg)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg-mute)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
          )}
          aria-label="Voltar para etapa anterior"
        >
          <ArrowLeft size={16} aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={validate}
          className={cn(
            "group inline-flex items-center gap-2 rounded-full",
            "bg-[var(--accent)] px-7 py-3.5 text-sm font-medium text-white",
            "transition-[transform,box-shadow] duration-200 hover:-translate-y-px hover:shadow-[0_12px_30px_-8px_var(--accent)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
          )}
        >
          Próximo
          <ArrowUpRight
            size={14}
            className="shrink-0 transition-transform duration-150 group-hover:translate-x-px group-hover:-translate-y-px"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}
