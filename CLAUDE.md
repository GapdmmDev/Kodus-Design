# CLAUDE.md — Kodus Landing

> Lido automaticamente pelo Claude Code em toda sessão neste repositório. Mantém padrões consistentes.

## Sobre o projeto

Landing page institucional da **Kodus** — estúdio digital paulistano que entrega landing pages, sites institucionais, e-commerces, portfólios e sistemas sob demanda.

**Objetivo principal**: aumentar conversão (mais leads/contatos via form e e-mail).

## Stack

- **Next.js 15** (App Router, Turbopack)
- **TypeScript** (strict)
- **Tailwind CSS v4** (tokens via `@theme` em `globals.css`)
- **next-themes** (dark/light, default dark)
- **Framer Motion** (reveal on scroll, marquee não usado)
- **Radix Accordion** (FAQ)
- **lucide-react** (ícones)
- **next/font/google**: Instrument_Serif (display), Geist (sans), Geist_Mono (mono)
- **pnpm** como package manager

## Convenções de código

- **Componentes**: PascalCase, um componente por arquivo, nome do arquivo = nome do componente.
- **Server Components por padrão**; usar `"use client"` apenas quando precisa de hooks/interatividade.
- **Imports absolutos** via alias `@/*`.
- **Sem `index.ts` barrels** — importar do arquivo direto.
- **Estilo**: Tailwind first. CSS custom só em `globals.css`. Não usar inline styles exceto pra dinâmicos.
- **`cn()` helper** sempre que tiver classes condicionais.
- **Copy**: vem de `lib/content.ts`, nunca hardcoded em componentes (facilita revisão e i18n futuro).
- **Acessibilidade**: `aria-*` em controles interativos, `alt` em imagens, contraste AA mínimo, focus-visible visível.

## Tom de voz (copy)

- **Provocativo, direto, afirmativo.**
- Português brasileiro coloquial mas profissional.
- Frases curtas. Oposição binária funciona ("vendem, não enfeitam").
- Evita superlativo vazio ("o melhor", "incrível"). Prefere número concreto ("+312%", "21 dias").
- **Não** usar emoji.
- Mono uppercase para metadados (status, data, lugar).
- Nunca inventar copy: se faltar, perguntar ao dev humano.

## Design

- Estética: **editorial brutalist-tech**. Tipografia gigante (Instrument Serif itálico para destaque), grid sutil de fundo, laranja `#ff5b1f` como acento elétrico, mono Geist para textura "atelier".
- Cores e tokens: ver `README.md` seção *Design Tokens*.
- Hero padrão: variante **Split** (texto + browser mock).
- Spacing: múltiplos de 4. Section padding vertical 120px desktop / 80px tablet / 64px mobile.
- Sem AI slop: sem gradient overlays gratuitos, sem emoji, sem stock photo de homem com gravata, sem ícone de check verde em tudo.

## Mobile

- **Mobile-first ao implementar**. Specs detalhadas em `README.md` seção *Mobile / Tablet Specs*.
- Breakpoints: <600px mobile, 600–980 tablet, ≥980 desktop, ≥1280 desktop large.
- Touch targets ≥44×44.
- Respeitar `prefers-reduced-motion`.
- Safe areas iOS via `env(safe-area-inset-*)`.

## Performance

- LCP <1.5s em 4G mobile.
- Imagens: `next/image` com `sizes` declarado e `priority` no hero.
- Fontes: `display: 'swap'`, sem mais de 3 famílias.
- Não importar libs inteiras (`import { X } from 'lucide-react'`, nunca `import * as L`).
- Lighthouse ≥95 em todas as categorias na home.

## Workflow esperado

- **Branch por feature**: `redesign/<seção>` ou `feat/<feature>`.
- **Commits**: Conventional Commits (`feat:`, `fix:`, `chore:`, `style:`, `refactor:`).
- **Um commit por seção** quando estiver implementando seguindo `PROMPTS.md`.
- **PR template**: descrever o que mudou, screenshot antes/depois, checklist de breakpoints.
- **Antes de cada commit**: `pnpm lint && pnpm build` precisa passar.

## O que NÃO fazer

- **Não copiar HTML/JSX do `Kodus.html` ou `Formulario.html` direto** — são referências visuais, não código de produção.
- Não usar `tweaks-panel.jsx` em produção.
- Não usar `data-theme="..."` — usar a classe `.dark` do `next-themes`.
- Não inventar variantes de hero novas — usar Split (default).
- Não adicionar marquee, eyebrow do hero ou bloco de preços (foram removidos do design final).
- Não usar `scrollIntoView` em prod (causa jumps em containers fixos).
- Não criar componentes "genéricos" antes de existirem 2+ usos. YAGNI.

## Arquivos de referência neste handoff

- `README.md` — spec completa do design (ler primeiro)
- `SETUP.md` — comandos exatos de bootstrap
- `PROMPTS.md` — prompts seção-por-seção pra usar comigo (Claude Code)
- `globals.css` — tokens prontos pra colar
- `Kodus.html` + `app.jsx` — referência visual (NÃO copiar direto)
- `Formulario.html` — referência visual da página `/formulario` (briefing em 3 etapas)

## Quando em dúvida

Pergunte ao dev humano. Não chute copy, não chute valores, não invente seções novas. Melhor pausar do que entregar errado.
