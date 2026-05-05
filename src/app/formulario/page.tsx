import Link from "next/link";
import { FormShell } from "@/components/formulario/FormShell";
import { LogoMark } from "@/components/ui/logo";
import { footer } from "@/lib/content";

function SlimNav() {
  return (
    <header
      className="sticky top-0 z-50 h-16 border-b border-[var(--line)]"
      style={{
        background: "color-mix(in oklch, var(--bg) 90%, transparent)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      <div className="mx-auto flex h-full max-w-[760px] items-center justify-between px-6">
        <Link href="/" aria-label="Kodus — voltar para home">
          <LogoMark size="sm" />
        </Link>

        <div className="hidden items-center gap-4 font-mono text-[11px] uppercase tracking-[.08em] text-[var(--fg-mute)] min-[480px]:flex">
          <span className="flex items-center gap-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full bg-emerald-400"
              style={{ animation: "pulse 2s ease-in-out infinite" }}
              aria-hidden="true"
            />
            Atendimento ativo
          </span>
          <span aria-hidden="true">·</span>
          <span>São Paulo · BR</span>
        </div>
      </div>
    </header>
  );
}

function SlimFooter() {
  return (
    <footer className="border-t border-[var(--line)] py-8">
      <div className="mx-auto flex max-w-[760px] flex-wrap items-center justify-between gap-3 px-6 font-mono text-[11px] uppercase tracking-[.08em] text-[var(--fg-mute)]">
        <span>{footer.copyright}</span>
        <span>{footer.location}</span>
      </div>
    </footer>
  );
}

export default function FormularioPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)]">
      <SlimNav />
      <FormShell />
      <SlimFooter />
    </div>
  );
}
