"use client";
import { useState, useRef, useEffect, useCallback } from "react";

function maskPhone(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
import { ArrowUpRight } from "lucide-react";
import { StepSchema1 } from "@/lib/briefing-schema";
import { cn } from "@/lib/cn";
import type { Step1Data } from "@/lib/briefing-schema";

interface Props {
  defaultValues: Partial<Step1Data>;
  onNext: (data: Step1Data) => void;
}

function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-mono text-[11px] uppercase tracking-[.08em] text-[var(--fg-mute)]">
        {label}
        {required && (
          <span className="ml-1 text-[var(--accent)]" aria-hidden="true">•</span>
        )}
      </span>
      {children}
      {hint && !error && (
        <span className="font-mono text-[11px] text-[var(--fg-mute)]">{hint}</span>
      )}
      {error && (
        <span className="font-mono text-[11px] text-[#ef4444]" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

function Input({
  hasError,
  ...props
}: React.ComponentProps<"input"> & { hasError?: boolean }) {
  return (
    <input
      className={cn(
        "w-full border-0 border-b bg-transparent py-3 text-[16px] text-[var(--fg)] outline-none",
        "placeholder:text-[var(--fg-mute)]",
        "transition-colors duration-150",
        hasError
          ? "border-[#ef4444]"
          : "border-[var(--line-strong)] focus:border-[var(--accent)]",
      )}
      {...props}
    />
  );
}

export function Step1Identidade({ defaultValues, onNext }: Props) {
  const [nome, setNome] = useState(defaultValues.nome ?? "");
  const [email, setEmail] = useState(defaultValues.email ?? "");
  const [whatsapp, setWhatsapp] = useState(defaultValues.whatsapp ?? "");
  const [empresa, setEmpresa] = useState(defaultValues.empresa ?? "");
  const [errors, setErrors] = useState<Partial<Record<keyof Step1Data, string>>>({});
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstRef.current?.focus();
  }, []);

  const validate = useCallback(() => {
    const result = StepSchema1.safeParse({ nome, email, whatsapp: whatsapp.replace(/\D/g, ""), empresa });
    if (result.success) {
      setErrors({});
      onNext(result.data);
    } else {
      const errs: Partial<Record<keyof Step1Data, string>> = {};
      result.error.issues.forEach((e) => {
        const key = e.path[0] as keyof Step1Data;
        if (!errs[key]) errs[key] = e.message;
      });
      setErrors(errs);
    }
  }, [nome, email, whatsapp, empresa, onNext]);

  return (
    <div>
      <h1 className="display leading-[1.0] tracking-[-0.025em] text-[clamp(44px,7vw,80px)]">
        Conta pra gente{" "}
        <em style={{ fontStyle: "italic", color: "var(--accent)" }}>quem é você.</em>
      </h1>
      <p className="mt-4 text-[17px] leading-relaxed text-[var(--fg-dim)]">
        Só o básico. A conversa de verdade vem depois.
      </p>

      <form
        className="mt-12 flex flex-col gap-8"
        onSubmit={(e) => { e.preventDefault(); validate(); }}
        noValidate
      >
        {/* Nome + Email — 2-col on desktop */}
        <div className="grid grid-cols-1 gap-8 min-[600px]:grid-cols-2">
          <Field label="Nome" required error={errors.nome}>
            <Input
              ref={firstRef}
              type="text"
              placeholder="Seu nome"
              value={nome}
              hasError={!!errors.nome}
              autoComplete="name"
              onChange={(e) => { setNome(e.target.value); setErrors((p) => ({ ...p, nome: undefined })); }}
            />
          </Field>

          <Field label="Email" required error={errors.email}>
            <Input
              type="email"
              placeholder="seu@email.com"
              value={email}
              hasError={!!errors.email}
              autoComplete="email"
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
            />
          </Field>
        </div>

        {/* WhatsApp + Empresa */}
        <div className="grid grid-cols-1 gap-8 min-[600px]:grid-cols-2">
          <Field label="WhatsApp" required error={errors.whatsapp}>
            <Input
              type="text"
              placeholder="(11) 99999-9999"
              value={whatsapp}
              hasError={!!errors.whatsapp}
              autoComplete="tel"
              inputMode="tel"
              onChange={(e) => {
                setWhatsapp(maskPhone(e.target.value));
                setErrors((p) => ({ ...p, whatsapp: undefined }));
              }}
            />
          </Field>

          <Field label="Empresa" error={errors.empresa}>
            <Input
              type="text"
              placeholder="Opcional"
              value={empresa}
              hasError={!!errors.empresa}
              autoComplete="organization"
              onChange={(e) => { setEmpresa(e.target.value); setErrors((p) => ({ ...p, empresa: undefined })); }}
            />
          </Field>
        </div>

        <div className="mt-4">
          <button
            type="submit"
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
      </form>
    </div>
  );
}
