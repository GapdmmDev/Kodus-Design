import Link from "next/link";
import { Container } from "@/components/ui/container";
import { LogoMark } from "@/components/ui/logo";
import { footer } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)]">
      <Container>
        {/* ── Top grid ─────────────────────────────────────────────────── */}
        <div
          className={[
            "grid gap-12 pt-[60px] pb-12",
            "grid-cols-1",
            "min-[600px]:grid-cols-2",
            "min-[980px]:grid-cols-[2fr_1fr_1fr_1fr]",
          ].join(" ")}
        >
          {/* Brand + tagline */}
          <div className="flex flex-col gap-4 min-[600px]:col-span-2 min-[980px]:col-span-1">
            <LogoMark size="lg" dot aria-label={footer.brand} />
            <p className="max-w-[320px] text-[14px] leading-relaxed text-[var(--fg-dim)]">
              {footer.tagline}
            </p>
          </div>

          {/* Link columns */}
          {footer.columns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <p className="font-mono text-[11px] uppercase tracking-[.08em] text-[var(--fg-mute)]">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-[var(--fg-dim)] transition-colors duration-150 hover:text-[var(--fg)] focus-visible:outline-none focus-visible:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] py-8">
          <span className="font-mono text-[11px] uppercase tracking-[.08em] text-[var(--fg-mute)]">
            {footer.copyright}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[.08em] text-[var(--fg-mute)]">
            {footer.location}
          </span>
        </div>
      </Container>
    </footer>
  );
}
