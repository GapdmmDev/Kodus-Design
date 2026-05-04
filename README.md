# Handoff: Kodus Landing Page Redesign

## Overview
Redesign completo da landing page institucional da **Kodus** — agência/estúdio digital que cria landing pages, sites institucionais, e-commerces, portfólios e sistemas sob demanda. O objetivo principal do redesign é **aumentar conversão (mais leads/contatos)** com um visual editorial, provocativo e profissional, reforçando a percepção de estúdio premium.

## About the Design Files
Os arquivos neste bundle são **referências de design criadas em HTML/JSX** — protótipos mostrando o look intencional, copy, hierarquia e comportamento. **Não são código de produção para copiar diretamente.**

A tarefa do desenvolvedor é **recriar esses designs no ambiente alvo** (ex.: Next.js + Tailwind + shadcn/ui, Astro, ou outro stack que a Kodus já use), seguindo padrões e bibliotecas estabelecidos no codebase. Se ainda não houver codebase, recomenda-se **Next.js 15 (App Router) + Tailwind + Framer Motion + Geist + Instrument Serif via next/font**.

## Fidelity
**High-fidelity (hifi)** — Mockups com cores, tipografia, espaçamento e interações finais. O desenvolvedor deve recriar pixel-perfect usando as bibliotecas do codebase. Tokens estão listados na seção *Design Tokens*.

## Implementation Order (recomendado, seção por seção)
Implementar nesta ordem facilita revisões incrementais e commits limpos:

1. **Setup**: tokens, fonts, theme provider (light/dark), layout root.
2. **Nav** (sticky com blur)
3. **Hero — Editorial** (variante padrão; deixar as outras 2 atrás de prop opcional)
4. **Marquee** (scroll infinito CSS)
5. **Services** (lista editorial com hover)
6. **Manifesto** (3 colunas com divisórias)
7. **Process** (grade 4 etapas)
8. **Work** (grid de cases assimétrico)
9. **Testimonial** (quote + 3 stats)
10. **FAQ** (accordion)
11. **CTA Final** (com radial glow)
12. **Footer**

> **Sugestão**: peça ao Claude Code pra fazer commit ao final de cada seção (`feat(landing): hero editorial`).

## Screens / Views

### Página única (one-pager) — viewport até 1440px com max-width container
- **Padding lateral**: `32px` desktop, `20px` mobile
- **Container**: `max-width: 1440px`, centralizado

#### 1. Nav (sticky)
- **Altura**: 64px
- **Background**: `color-mix(in oklch, var(--bg) 75%, transparent)` + `backdrop-filter: blur(14px)`
- **Border-bottom**: 1px `var(--line)`
- **Logo**: ponto laranja 8×8 girado 45° + texto "Kodus" em Instrument Serif itálico 24px
- **Links** (desktop): "Serviços", "Processo", "Trabalhos", "FAQ", "Contato" — 13px, `var(--fg-dim)`, hover → `var(--fg)`
- **CTA**: pill "Começar projeto" com seta diagonal — bg `var(--fg)`, color `var(--bg)`; hover → bg `var(--accent)`, color branco
- **Mobile**: links escondidos (substituir por menu drawer ao implementar)

#### 2. Hero — Editorial (padrão)
- **Padding**: `80px 0 100px`
- **Grid bg**: linhas 80×80, mascarada por radial gradient (suave, decorativa)
- **Hero meta** (linha topo): font mono 11px uppercase letter-spacing .08em — três spans: "Kodus / Estúdio Digital" • "Aceitando 2 projetos · Mai/Jun 2026" (com dot verde pulsante) • "São Paulo, BR · 2026"
- **H1**: Instrument Serif 400, line-height .92, tracking -.025em, `clamp(64px, 11vw, 176px)`
  - Texto: `Sites que / vendem. não / que enfeitam.`
  - "vendem." → itálico cor `var(--accent)`
  - "não" → itálico stroke 1.5px (cor transparente, contorno branco)
- **Linha 2** (grid 1.4fr / 1fr, gap 80px):
  - **Esquerda**: subhead 18px `var(--fg-dim)` + 2 botões (primário laranja + ghost)
  - **Direita**: 3 stats empilhados, separados por border-top, número em Instrument Serif itálico 48px + label mono uppercase
    - +312% — conversão média / cliente
    - 21 dias — prazo médio de entrega
    - 98/100 — PageSpeed médio

#### 3. Hero — Stack (variante 2)
Cinco linhas tipográficas empilhadas, sem subhead inline. Cada linha em `clamp(72px, 13vw, 200px)`. Linha 3 contém um pill badge "ao vivo" com bolinha. Linhas: "Mais conversão." / "Menos atrito." / "O digital [badge] da sua" / "*startup,* levado" / "a sério."

#### 4. Hero — Split (variante 3)
Grid 1fr / 1.1fr. Lado esquerdo: eyebrow + h3-title `clamp(56px, 7vw, 108px)` + sub + CTAs + trust bar (3 avatars + "+40 marcas confiaram · NPS 92"). Lado direito: mock de browser (window chrome + URL fake "kodus.studio/cases/orion" + body com mock-h "Velocidade é uma escolha." e CTA "Iniciar").

#### 5. Marquee
- **Border**: 1px top + bottom `var(--line)`
- **Padding**: `24px 0`
- **Background**: `var(--bg-2)`
- **Track**: items em Instrument Serif itálico 32px, separados por estrela ✦ laranja, animação `scroll 40s linear infinite`
- Items: "Conversão", "Performance", "Design", "Código limpo", "Prazo curto", "Sem stress"

#### 6. Services
- **Section header** (`.sec-head`): h2 "Serviços concretos. / Resultado mensurável." (com palavras itálico laranja) + meta texto à direita
- **Lista**: cada linha grid `80px 1.4fr 1.6fr 200px`, gap 32px, padding `36px 0`, border-bottom
  - Idx (mono, fg-mute) / Name (Instrument Serif `clamp(36px, 5vw, 68px)`, tracking -.02em, com em itálico laranja) / Desc (15px, fg-dim, max 38ch) / Price (mono à direita com `<b>` em Instrument Serif itálico 28px)
  - **Hover**: bg gradient horizontal `transparent → accent-soft → transparent`, seta diagonal aparece da direita
- 5 serviços: Landing pages /conversão (R$ 4.5k, 7–14d), Site institucional /marca (R$ 8k, 21–28d), E-commerce /vendas (R$ 18k, 30–60d), Portfólio criativo /autor (R$ 6k, 14–21d), Sistemas sob demanda /produto (R$ 25k+, 60+d)

#### 7. Manifesto
- 3 colunas iguais separadas por border vertical 1px `var(--line)`
- Cada card: número mono "01 —" / título Instrument Serif itálico 36px / parágrafo 15px fg-dim
- Items: "Minimalista, não vazio" / "Rápido como deve ser" / "Profissional, sem ser chato"

#### 8. Process
- Background `var(--bg-2)` + border top/bottom
- 4 steps em grid `1px gap` (border simulada)
- Cada step: número Instrument Serif itálico 80px LARANJA + h4 18px medium + p 14px + tag mono no rodapé
- Steps: "Briefing afiado" (1–2d), "Design objetivo" (5–10d), "Build limpo" (10–20d), "Lançamento" (1–2d)

#### 9. Work
- Grid `1.4fr 1fr`, gap 24px
- 5 cards: 1 grande (col 1, row 1–3) + 4 menores
- Cada card: thumb (border, radius 16px, gradient bg + textura listrada 45°) com `placeholder-tag`, `live-tag` (com dot verde), mock-h em Instrument Serif itálico, mock-cta laranja
- Meta abaixo do thumb: nome em Instrument Serif itálico 22px + tag mono
- Cases (placeholders): Orion Capital · Fintech 2026 (grande), Helix Studio · SaaS, Verdê · D2C, Drumond Atelier · Arquitetura, Pulso Logística · Dashboard

#### 10. Testimonial
- Grid 1.6fr / 1fr, gap 80px
- Esquerda: eyebrow + quote gigante Instrument Serif `clamp(40px, 5.4vw, 84px)` (aspas decorativas em fg-mute, "22 dias" em itálico laranja) + author com avatar gradient + nome + role mono
- Direita: 3 stats com border-left 2px laranja: +312% conversão / 22d entrega / 0,8s LCP

#### 11. FAQ
- Grid 1fr / 1.4fr
- Esquerda: eyebrow + h2 "O que **todo cliente** pergunta antes."
- Direita: lista de 6 items, cada um com h3 em Instrument Serif itálico 24px + ícone "+" laranja que rotaciona 45° quando aberto. Apenas um aberto por vez.
- Animação: `max-height` + `opacity` 0.3s

#### 12. CTA Final
- Padding `140px 0`, text-align center
- Radial gradient `var(--accent-soft)` 1200×1200 atrás (decorativo)
- Eyebrow centralizado + h2 `clamp(64px, 11vw, 176px)` "Pronto pra **vender** de verdade?"
- p max 520px + 2 botões (mailto laranja primário + ghost "Agendar call · 30min")
- Linha mono inferior: "Resposta em até **24h** · Briefing em até **48h** · Proposta em até **5 dias**"

#### 13. Footer
- Border-top, padding `60px 0 32px`
- Top grid `2fr 1fr 1fr 1fr`:
  - Brand "Kodus" em Instrument Serif itálico 64px (com ponto laranja) + tagline 14px max 320px
  - 3 colunas: Serviços / Estúdio / Contato
- Bottom: border-top, mono uppercase: copyright + localização

## Interactions & Behavior

- **Reveal on scroll**: classe `.reveal` aplicada em sections; usar `IntersectionObserver` (threshold 0.12) para adicionar `.in` → transição 0.8s opacity + translateY(24px → 0)
- **Marquee**: animação CSS infinita 40s linear
- **Service rows**: hover muda bg (gradient laranja fraco) e revela seta da direita (translate + opacity)
- **FAQ**: clique alterna `data-open`; somente um item aberto por vez (state `open` numérico, -1 = fechado)
- **Theme toggle**: trocar `data-theme="dark"|"light"` no `<html>`
- **Pulse dot** (live indicator): `@keyframes pulse` 2s opacity 1 → .5 → 1
- **Botão primário hover**: `translateY(-1px)` + box-shadow laranja
- **CTA seta**: hover translateX(2px)
- **Smooth scroll** para `#anchors` (`scroll-behavior: smooth` no html)

## State Management
Mínimo necessário:
- `theme: 'dark' | 'light'` (persistir em localStorage; respeitar `prefers-color-scheme` no primeiro load)
- `faqOpen: number` (índice da pergunta aberta, -1 = nenhuma)
- `displayFont` (opcional — só se quiser manter tweak de fonte; pode hardcodar Instrument Serif na produção)
- `heroVariant` (opcional — só se quiser A/B test entre as 3; recomendo começar fixo no Editorial)

Não há fetch de dados nesta versão — conteúdo é estático.

## Design Tokens

### Colors (CSS vars)

**Dark (default)**
```
--bg:          #0a0a0a
--bg-2:        #111111
--fg:          #f4f1ea
--fg-dim:      #a8a39a
--fg-mute:     #6b665d
--line:        rgba(255,255,255,.08)
--line-strong: rgba(255,255,255,.16)
--accent:      #ff5b1f
--accent-soft: rgba(255,91,31,.14)
--card:        #131313
--card-2:      #181818
```

**Light**
```
--bg:          #f4f1ea
--bg-2:        #ebe7dd
--fg:          #131210
--fg-dim:      #5c5851
--fg-mute:     #8a857c
--line:        rgba(19,18,16,.10)
--line-strong: rgba(19,18,16,.22)
--accent:      #e84a0d
--accent-soft: rgba(232,74,13,.10)
--card:        #ffffff
--card-2:      #f9f6ef
```

### Typography
- **Display**: `'Instrument Serif', serif` (Google Fonts) — usar `next/font/google` ou `<link>`
- **Sans**: `'Geist', ui-sans-serif, system-ui, sans-serif` — pesos 300, 400, 500, 600, 700
- **Mono**: `'Geist Mono', ui-monospace, monospace`
- **Font-feature-settings**: `"ss01","cv11"` no body

**Escalas display recorrentes**:
- Hero H1: `clamp(64px, 11vw, 176px)`, weight 400, line-height .92, tracking -.025em
- Hero stack lines: `clamp(72px, 13vw, 200px)`
- H2 section: `clamp(48px, 7vw, 96px)`
- H3 manifesto: 36px
- FAQ q: 24px

**Mono small caps usage**:
- 11px, uppercase, letter-spacing .08em, color `var(--fg-mute)` — usado em eyebrows, labels, tags

### Spacing
Múltiplos de 4: 4, 8, 10, 12, 14, 18, 22, 24, 32, 40, 60, 80, 120, 140
- Section padding vertical padrão: `120px 0`
- CTA final: `140px 0`
- Container side: `32px` desktop, `20px` mobile

### Border-radius
- Pills/buttons: `999px`
- Cards: `16px`
- Browser mock: `14px`
- Tags pequenas: `6px`

### Shadows
- Browser mock: `0 30px 80px -20px rgba(0,0,0,.5)`
- Botão primário hover: `0 12px 30px -8px var(--accent)`

### Breakpoints
- `≥1280px` — desktop large (layout completo)
- `≥980px` — desktop / tablet landscape
- `<980px` — tablet portrait + mobile (colunas viram 1 coluna)
- `<600px` — mobile (padding lateral cai pra 20px, ajustes finos de tipografia)

---

## Mobile / Tablet Specs (detalhado)

A landing é **mobile-first quando implementada em produção** — mesmo que o protótipo HTML tenha sido desenhado em desktop primeiro. Use estas specs como guia. As escalas tipográficas com `clamp()` já fazem boa parte do trabalho automaticamente.

### Princípios mobile

1. **Single column abaixo de 980px** — todos os grids 2/3/4 colunas viram 1.
2. **Padding lateral**: 32px desktop → 24px tablet → 20px mobile.
3. **Section padding vertical**: 120px desktop → 80px tablet → 64px mobile.
4. **Hit targets**: mínimo 44×44px em toda área clicável (links de nav, FAQ, service rows, botões).
5. **Tipografia**: as `clamp()` já escalam, mas observe os limites min — não deixar h1 abaixo de 48px no menor breakpoint.
6. **Ícones e setas decorativas**: esconder em mobile se atrapalhar (ex.: seta dos service rows desativa hover, fica sempre visível em mobile menor).

### Por seção

#### Nav (mobile)
- Esconder `.nav-links` (já implementado).
- Adicionar **menu drawer**: ícone hamburger 24×24 à direita do logo (antes do CTA), abre overlay full-screen com links empilhados (Instrument Serif itálico 32px, gap 24px, padding 32px), fundo `var(--bg)`, com botão X no canto superior direito.
- CTA "Começar projeto" pode encolher para apenas a seta diagonal num círculo 40×40 abaixo de 480px.
- Altura nav: 64px desktop, 56px mobile.

#### Hero — Split (padrão mobile)
- Grid `1fr 1.1fr` → vira **1 coluna**: texto em cima, browser mock embaixo.
- `h3-title`: `clamp(40px, 9vw, 64px)` em mobile (a `clamp` já cobre isso).
- `h3-sub`: 16px (vs 17px desktop).
- `h3-cta`: botões em coluna abaixo de 480px (`flex-direction: column; align-items: stretch`).
- Browser mock: aspect-ratio mantém 16/10, escala fluida; mock-h `clamp(20px, 5.5vw, 32px)`.
- `hero-meta`: empilhar 3 spans em coluna, gap 8px, alinhar à esquerda; ou esconder o meio (live indicator) abaixo de 480px.
- `h3-trust`: `flex-wrap: wrap`, gap 12px.

#### Hero — Editorial (mobile)
- `h1-title` `clamp(48px, 12vw, 96px)` em mobile.
- "stroke" outline tipográfico continua, mas reduzir para `0.75px` abaixo de 600px pra não virar borrão.
- `h1-row`: vira 1 coluna, sidebar de stats vai abaixo do bloco principal.
- Stats: continuam empilhados; números em 36px (vs 48px desktop).

#### Hero — Stack (mobile)
- Linhas `clamp(48px, 14vw, 88px)`.
- O badge "ao vivo" inline fica do lado da palavra "digital" — em mobile, deixa ele em linha própria (`flex-wrap: wrap` na `.line`).

#### Services (mobile)
- Grid `80px 1fr` → `48px 1fr`, gap 16px, padding `28px 0`.
- `.svc-row .name` desativar `white-space: nowrap` em mobile (deixar quebrar) e usar `clamp(28px, 8vw, 42px)`.
- A seta diagonal grande (36×36) que aparece no hover **em mobile fica sempre visível**, opacidade .5, posição estática à direita (não absoluta) — usuário precisa de affordance sem hover.
- Alternativa: empilhar `idx` acima do nome em coluna única, com `idx` em mono pequeno e nome dominante.

#### Manifesto (mobile)
- 3 colunas → 1 coluna, divisórias verticais viram horizontais (`border-right: none; border-bottom: 1px solid var(--line)`).
- Padding interno: `28px 0` (vs 32px com border).
- Título h3 do card: 28px em mobile (vs 36px).

#### Process (mobile)
- 4 colunas → 2 colunas em tablet (768–980px), 1 coluna em mobile.
- `.step-num`: 64px em mobile (vs 80px).
- Min-height do step: pode soltar (`auto`).

#### Work (mobile)
- Grid 1.4fr/1fr → 1 coluna; o card "destaque" perde o `grid-column: 1 / 2; grid-row: 1 / 3` e vira card normal.
- Espaçamento entre cards: 16px (vs 24px).
- Aspect ratios mantidos.
- `mock-h` dos thumbs: usar a `clamp` mais agressiva já no protótipo (`clamp(18px, 4.5vw, 28px)`).

#### Testimonial (mobile)
- Grid 1.6fr/1fr → 1 coluna, gap 40px.
- `.testi-quote`: `clamp(28px, 7vw, 48px)`, line-height 1.15.
- `.testi-stats`: 3 stats em row scroll horizontal? **Não** — empilhar em coluna, mais legível.
- Numbers em stats: 48px em mobile (vs 64px).

#### FAQ (mobile)
- Grid 1fr/1.4fr → 1 coluna, gap 32px.
- Título h2: `clamp(36px, 8vw, 56px)`.
- `.faq-q`: 18px em mobile (vs 24px), linha bem espaçada (line-height 1.3).
- Espaçamento entre items: 20px padding vertical.
- O ícone "+" precisa de touch target 44×44 — adicione padding interno ao botão clicável.

#### CTA Final (mobile)
- Padding vertical: 96px (vs 140px).
- h2: `clamp(48px, 12vw, 96px)`.
- Botões em coluna abaixo de 480px (`flex-direction: column; gap: 12px; align-items: stretch`).
- `.secondary-info` quebra em 3 linhas naturalmente (deixar `flex-wrap` se for flex, ou `<br>` entre tags em mobile).

#### Footer (mobile)
- Grid `2fr 1fr 1fr 1fr` → `1fr 1fr` em tablet → `1fr` em mobile (todas as colunas empilhadas).
- `.ftr-brand`: 48px em mobile (vs 64px).
- `.ftr-bottom`: stack vertical, gap 8px, font 10px.

### Tipografia mobile (resumo)

| Elemento | Mobile (≤600px) | Tablet (600–980px) | Desktop (≥980px) |
|---|---|---|---|
| Hero h1 (split) | 40–64px | 64–88px | 88–108px |
| Hero h1 (editorial) | 48–96px | 96–144px | 144–176px |
| H2 section | 36–56px | 56–80px | 80–96px |
| Service name | 28–42px | 42–56px | 56–68px |
| FAQ q | 18px | 20px | 24px |
| Testi quote | 28–48px | 48–68px | 68–84px |
| Body | 15px | 15px | 16–18px |
| Mono labels | 11px | 11px | 11px |

### Touch & Gestures
- **FAQ accordion**: tap área inteira da pergunta abre/fecha.
- **Service rows**: tap navega para `#contato` (já é link `<a>`).
- **Work cards**: tap abre detalhe — em produção implementar modal ou rota `/cases/[slug]`.
- **Marquee**: removido (estava na v1, foi removido na v2).
- **Reveal on scroll**: manter, mas reduzir `translateY` inicial para 16px (vs 24px) em mobile pra não criar pulo grande.

### Performance mobile
- LCP target: <1.5s em 4G.
- Imagens (quando substituir placeholders): `next/image` com `sizes` declaradas e `priority` no hero.
- Fontes: `display: 'swap'` no `next/font`, preload do Instrument Serif (display) e Geist regular.
- Não usar `backdrop-filter` no nav abaixo de 600px se causar jank — fallback para bg sólido com 92% de opacidade.
- `prefers-reduced-motion`: respeitar — desabilitar reveal animations e transições longas.

### Safe areas (iOS notch)
- `padding-top: env(safe-area-inset-top)` na nav fixa.
- `padding-bottom: env(safe-area-inset-bottom)` no footer e em qualquer floating CTA.


## Assets
**Nenhum asset real foi usado** — todos os visuais são gerados via CSS:
- Avatares: `linear-gradient` placeholders
- Thumbs de cases: gradient + textura listrada `repeating-linear-gradient`
- Logo Kodus: tipográfico + ponto CSS

> **Recomendado pro dev**: substituir os placeholders por screenshots reais dos cases assim que estiverem disponíveis. Manter a textura listrada como fallback de loading.

## Copy / Tom de voz
- **Provocativo, direto, afirmativo** — frases curtas, oposição binária ("vendem, não enfeitam")
- Português brasileiro coloquial mas profissional
- Evita superlativo vazio ("o melhor", "incrível"); prefere número concreto ("+312%", "21 dias")
- Não usar emoji
- Mono uppercase para metadados (status, data, lugar)

## Files in this Bundle
- `Kodus.html` — entry point com CSS completo (todos os tokens + estilos)
- `app.jsx` — todos os componentes React (Nav, 3 Heros, Marquee, Services, Manifesto, Process, Work, Testimonial, FAQ, CTA, Footer)
- `tweaks-panel.jsx` — painel de tweaks usado no protótipo (NÃO PORTAR pra produção; é só ferramenta de design)

## Stack Recommendation (se for codebase novo)
```
Next.js 15 (App Router) + TypeScript
Tailwind CSS 4 com tokens em @theme
next/font: Instrument_Serif, Geist, Geist_Mono
Framer Motion (reveal animations + marquee + faq)
shadcn/ui (apenas pra primitives — Accordion, Button)
lucide-react (ícones)
```

## Suggested Prompts pro Claude Code

```
# Setup inicial
Leia design_handoff_kodus_landing/README.md inteiro. Crie projeto 
Next.js 15 + Tailwind + TypeScript. Configure tokens de cor 
(dark/light), fontes (Instrument Serif + Geist + Geist Mono), 
e layout root com ThemeProvider. Faça commit.

# Por seção
Implemente a seção <NOME> seguindo o README e usando app.jsx como 
referência visual. Use Tailwind com os tokens já definidos. 
Mantenha responsividade nos breakpoints 980px e 600px. 
Não invente copy — use exatamente a do README. Faça commit ao final.
```

---

**Última atualização**: 4 de maio de 2026
