"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { StepSchema3 } from "@/lib/briefing-schema";
import { cn } from "@/lib/cn";
import type { Step3Data } from "@/lib/briefing-schema";

interface Props {
  defaultValues: { orcamento?: string; prazo?: string };
  onNext: (data: Step3Data) => void;
  onBack: () => void;
}

const ORCAMENTOS = [
  { value: "ate5k", label: "Até R$ 5k" },
  { value: "5a10k", label: "R$ 5k – 10k" },
  { value: "10a20k", label: "R$ 10k – 20k" },
  { value: "acima20k", label: "Acima de R$ 20k" },
  { value: "naoseiorcamento", label: "Ainda não sei" },
] as const;

const PRAZOS = [
  { value: "urgente", label: "Urgente", sub: "7 dias" },
  { value: "1a2meses", label: "1–2 meses", sub: "Com calma, mas logo" },
  { value: "3maismeses", label: "3+ meses", sub: "Tem tempo pra planejar" },
  { value: "flexivel", label: "Flexível", sub: "Sem data definida" },
] as const;

type Orc = Step3Data["orcamento"];

type Prazo = Step3Data["prazo"];

function RadioGrid<T extends string>({
  options,
  selected,
  onSelect,
  cols = 3,
  firstRef,
}: {
  options: readonly { value: T; label: string; sub?: string }[];
  selected: T | "";
  onSelect: (v: T) => void;
  cols?: number;
  firstRef?: React.RefObject<HTMLButtonElement | null>;
}) {
  const gridCols =
    cols === 3 ? "grid-cols-1 min-[480px]:grid-cols-2 min-[760px]:grid-cols-3" : "grid-cols-1 min-[480px]:grid-cols-2";

  return (
    <div className={`grid gap-3 ${gridCols}`} role="radiogroup">
      {options.map((opt, i) => (
        <button
          key={opt.value}
          ref={i === 0 && firstRef ? (firstRef as React.RefObject<HTMLButtonElement>) : undefined}
          type="button"
          role="radio"
          aria-checked={selected === opt.value}
          onClick={() => onSelect(opt.value)}
          className={cn(
            "flex min-h-[88px] flex-col items-start justify-center gap-1 rounded-[12px] border px-5 py-4 text-left",
            "transition-[transform,border-color,background-color] duration-150 hover:-translate-y-px",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
            selected === opt.value
              ? "border-[var(--accent)] bg-[var(--accent-soft)]"
              : "border-[var(--line)] bg-[var(--card)] hover:border-[var(--line-strong)]",
          )}
        >
          <div className="flex w-full items-center justify-between gap-2">
            <span className="text-[15px] font-medium text-[var(--fg)]">{opt.label}</span>
            {selected === opt.value && (
              <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            )}
          </div>
          {opt.sub && (
            <span className="text-[13px] text-[var(--fg-dim)]">{opt.sub}</span>
          )}
        </button>
      ))}
    </div>
  );
}

export function Step3Investimento({ defaultValues, onNext, onBack }: Props) {
  const [orcamento, setOrcamento] = useState<Orc | "">((defaultValues.orcamento as Orc) ?? "");
  const [prazo, setPrazo] = useState<Prazo | "">((defaultValues.prazo as Prazo) ?? "");
  const [errors, setErrors] = useState<{ orcamento?: string; prazo?: string }>({});
  const firstRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    firstRef.current?.focus();
  }, []);

  const validate = () => {
    const result = StepSchema3.safeParse({ orcamento, prazo });
    if (result.success) {
      setErrors({});
      onNext(result.data);
    } else {
      const errs: { orcamento?: string; prazo?: string } = {};
      result.error.issues.forEach((e) => {
        const key = e.path[0] as keyof typeof errs;
        if (!errs[key]) errs[key] = e.message;
      });
      setErrors(errs);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { e.preventDefault(); validate(); }
  };

  return (
    <div onKeyDown={handleKeyDown}>
      <h1 className="display leading-[1.0] tracking-[-0.025em] text-[clamp(44px,7vw,80px)]">
        Investimento e{" "}
        <em style={{ fontStyle: "italic", color: "var(--accent)" }}>prazo.</em>
      </h1>
      <p className="mt-4 text-[17px] leading-relaxed text-[var(--fg-dim)]">
        Sem compromisso. Ajuda a gente a montar a proposta certa.
      </p>

      {/* Orçamento */}
      <div className="mt-10 flex flex-col gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[.08em] text-[var(--fg-mute)]">
          Orçamento estimado
          <span className="ml-1 text-[var(--accent)]" aria-hidden="true">•</span>
        </span>
        <RadioGrid
          options={ORCAMENTOS}
          selected={orcamento}
          onSelect={(v) => { setOrcamento(v); setErrors((p) => ({ ...p, orcamento: undefined })); }}
          cols={3}
          firstRef={firstRef}
        />
        {errors.orcamento && (
          <p className="font-mono text-[11px] text-[#ef4444]" role="alert">{errors.orcamento}</p>
        )}
      </div>

      {/* Prazo */}
      <div className="mt-10 flex flex-col gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[.08em] text-[var(--fg-mute)]">
          Prazo estimado
          <span className="ml-1 text-[var(--accent)]" aria-hidden="true">•</span>
        </span>
        <RadioGrid
          options={PRAZOS}
          selected={prazo}
          onSelect={(v) => { setPrazo(v); setErrors((p) => ({ ...p, prazo: undefined })); }}
          cols={3}
        />
        {errors.prazo && (
          <p className="font-mono text-[11px] text-[#ef4444]" role="alert">{errors.prazo}</p>
        )}
      </div>

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
          Enviar briefing
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
