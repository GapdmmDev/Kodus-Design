# Setup — Kodus Landing (Next.js 15 + Tailwind v4 + TypeScript)

## 1. Bootstrap

```bash
# Cria o projeto
pnpm create next-app@latest kodus-site \
  --typescript --tailwind --app --src-dir --turbopack \
  --import-alias "@/*" --eslint

cd kodus-site
```

> **Nota**: o `create-next-app` mais recente já vem com Tailwind v4 por padrão. Confirme em `package.json` que `tailwindcss` está em `^4.x` e que existe um `@tailwindcss/postcss` no `postcss.config.mjs`. Se vier v3, atualize antes de seguir.

## 2. Dependências adicionais

```bash
pnpm add next-themes framer-motion clsx tailwind-merge lucide-react \
  @radix-ui/react-accordion class-variance-authority

pnpm add -D @types/node
```

## 3. Estrutura de pastas

Crie a árvore abaixo dentro de `src/`:

```
src/
├── app/
│   ├── layout.tsx          # root, fonts, ThemeProvider, metadata
│   ├── page.tsx            # composição da landing
│   ├── globals.css         # tokens, base, utilities
│   ├── formulario/
│   │   ├── layout.tsx      # layout enxuto (sem Nav/Footer da home)
│   │   └── page.tsx        # /formulario — briefing em 3 etapas
│   └── api/
│       └── contact/
│           └── route.ts    # endpoint do form (placeholder)
├── components/
│   ├── landing/
│   │   ├── Nav.tsx
│   │   ├── HeroSplit.tsx
│   │   ├── Services.tsx
│   │   ├── Manifesto.tsx
│   │   ├── Process.tsx
│   │   ├── Work.tsx
│   │   ├── Testimonial.tsx
│   │   ├── FAQ.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   ├── formulario/
│   │   ├── FormShell.tsx       # client, state + animação entre etapas
│   │   ├── ProgressBar.tsx
│   │   ├── Step1Identidade.tsx
│   │   ├── Step2Projeto.tsx
│   │   ├── Step3Investimento.tsx
│   │   └── Sucesso.tsx
│   ├── ui/
│   │   ├── button.tsx      # BtnPrimary, BtnGhost
│   │   ├── eyebrow.tsx
│   │   ├── container.tsx
│   │   └── reveal.tsx      # wrapper IntersectionObserver
│   └── theme/
│       └── theme-provider.tsx
├── lib/
│   ├── cn.ts               # clsx + tailwind-merge helper
│   ├── content.ts          # copy/dados estáticos da landing
│   └── briefing-schema.ts  # Zod schemas do form
└── types/
    └── index.ts
```

## 4. Fontes

Em `app/layout.tsx`:

```tsx
import { Instrument_Serif, Geist, Geist_Mono } from "next/font/google";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning
          className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

## 5. Tailwind v4 — tokens em CSS

Substitua `app/globals.css` pelo conteúdo de `globals.css` deste handoff. Ele já tem:
- `@theme` com tokens custom
- Variáveis CSS light/dark
- Resets básicos
- Utilities específicas (marquee removido, mas keyframes prontos pra reuso)

## 6. Theme Provider (next-themes)

`components/theme/theme-provider.tsx`:

```tsx
"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

export function ThemeProvider(props: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider attribute="class" defaultTheme="dark" {...props} />;
}
```

Em `app/layout.tsx`, envolva `{children}` com `<ThemeProvider>`.

## 7. Helper `cn`

`lib/cn.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

## 8. Metadata e SEO

`app/layout.tsx`:

```tsx
export const metadata = {
  metadataBase: new URL("https://kodus.studio"),
  title: { default: "Kodus — Sites que vendem", template: "%s · Kodus" },
  description: "Estúdio digital paulistano. Landing pages, sites institucionais, e-commerce e sistemas sob demanda — focados em conversão.",
  openGraph: {
    title: "Kodus — Sites que vendem",
    description: "Estúdio digital. Mais conversão. Menos atrito.",
    url: "https://kodus.studio",
    siteName: "Kodus",
    locale: "pt_BR",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};
```

Crie OG image em `app/opengraph-image.tsx` mais tarde (Next gera automaticamente).

## 9. .env.example

```bash
# Form de contato (decidir depois)
# RESEND_API_KEY=
# CONTACT_EMAIL=
# WEBHOOK_URL=

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 10. Roda

```bash
pnpm dev
# abre http://localhost:3000
```

Confira que:
- [ ] Fontes carregam (sem flash)
- [ ] Theme switcher funciona (claro/escuro persiste)
- [ ] Build passa: `pnpm build`
- [ ] Lint passa: `pnpm lint`

## 11. Próximos passos

Siga `PROMPTS.md` deste handoff — ele tem prompts seção-por-seção pro Claude Code.
