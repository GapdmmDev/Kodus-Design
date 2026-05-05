import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export function Sucesso() {
  return (
    <div className="flex flex-col items-center py-12 text-center">
      {/* Icon */}
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full"
        style={{ background: "var(--accent-soft)" }}
        aria-hidden="true"
      >
        <Check size={32} className="text-[var(--accent)]" strokeWidth={2.5} />
      </div>

      {/* Heading */}
      <h1 className="display mt-8 leading-[1.0] tracking-[-0.025em] text-[clamp(44px,7vw,80px)]">
        Recebemos.{" "}
        <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Valeu.</em>
      </h1>

      {/* Subcopy */}
      <p className="mt-5 max-w-[400px] text-[17px] leading-relaxed text-[var(--fg-dim)]">
        A gente responde em até 24h úteis com próximos passos.
      </p>

      {/* Meta mono */}
      <div className="mt-8 flex flex-wrap justify-center gap-4 font-mono text-[11px] uppercase tracking-[.08em] text-[var(--fg-mute)]">
        <span>Resposta &lt;24h</span>
        <span aria-hidden="true">·</span>
        <span>Call 30min</span>
        <span aria-hidden="true">·</span>
        <span>Sem compromisso</span>
      </div>

      {/* Back link */}
      <Link
        href="/"
        className={cn(
          "mt-10 inline-flex items-center justify-center rounded-full",
          "border border-[var(--line-strong)] bg-transparent px-7 py-3.5 text-sm font-medium text-[var(--fg)]",
          "transition-colors duration-200 hover:bg-[var(--bg-2)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg-mute)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
        )}
      >
        Voltar pro site
      </Link>
    </div>
  );
}
