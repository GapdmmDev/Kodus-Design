const LABELS: Record<1 | 2 | 3, string> = {
  1: "Quem é você",
  2: "Sobre o projeto",
  3: "Investimento e prazo",
};

export function ProgressBar({ step }: { step: 1 | 2 | 3 }) {
  const pct = (step / 3) * 100;

  return (
    <div
      className="sticky top-16 z-40 border-b border-[var(--line)]"
      style={{ background: "var(--bg)" }}
      role="progressbar"
      aria-valuenow={step}
      aria-valuemin={1}
      aria-valuemax={3}
      aria-label={`Etapa ${step} de 3: ${LABELS[step]}`}
    >
      <div className="mx-auto flex max-w-[760px] items-center justify-between px-6 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[.08em] text-[var(--fg-mute)]">
          {LABELS[step]}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[.08em] text-[var(--fg-mute)]">
          {String(step).padStart(2, "0")} / 03
        </span>
      </div>
      <div className="h-[2px] bg-[var(--line)]">
        <div
          className="h-full bg-[var(--accent)] transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
