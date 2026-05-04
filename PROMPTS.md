# PROMPTS — Kodus Landing (Claude Code, seção por seção)

> Cole esses prompts no terminal, **um por vez**. Espere terminar, revise visual, faça commit, e só então passe pro próximo. Não cole tudo de uma vez.

---

## 0. Onboarding (primeiro prompt da sessão)

```
Leia README.md, CLAUDE.md, SETUP.md e globals.css inteiros antes de
escrever qualquer linha. Confirme que entendeu:
1. Stack que vamos usar
2. Tom de voz da copy
3. Tokens de design
4. Convenções de código

Resuma em 5 bullets o que entendeu. Não escreva código ainda.
```

---

## 1. Bootstrap

```
Siga SETUP.md passo a passo:
1. Bootstrap do projeto Next.js 15 + TS + Tailwind v4
2. Instale as dependências adicionais
3. Crie a estrutura de pastas em src/
4. Configure as fontes em app/layout.tsx
5. Cole globals.css na pasta app/
6. Crie ThemeProvider e envolva o layout
7. Crie helper cn() em lib/

Rode npm dev. Confira que abre sem erro. Faça commit:
"chore: bootstrap nextjs + tailwind v4 + tokens"
```

**Critério de aceitação**: `npm dev` abre sem erro, fontes carregam, theme switcher (mesmo que ainda não haja UI) muda variáveis CSS.

---

## 2. Componentes UI primitivos

```
Crie em src/components/ui/:

1. container.tsx — wrapper max-w-[1440px] px-8 max-md:px-5
2. eyebrow.tsx   — span com classe .eyebrow do globals.css
3. button.tsx    — exports BtnPrimary e BtnGhost (specs em README.md)
4. reveal.tsx    — wrapper client com IntersectionObserver
                   que adiciona classe .in quando entra na viewport

Use forwardRef + ComponentProps<"...">. Componentes com tipos
explícitos. Faça commit: "feat(ui): primitives".
```

**Critério**: imports funcionam, sem warnings de TypeScript.

---

## 3. Theme toggle

```
Crie src/components/theme/theme-toggle.tsx — botão que troca entre
light/dark via useTheme() do next-themes. Ícone sun/moon do
lucide-react. Tamanho 40x40, border-radius 999px, hover sutil.

Use suppressHydrationWarning onde necessário.

Faça commit: "feat(theme): toggle button".
```

---

## 4. Conteúdo estático

```
Crie src/lib/content.ts — exporta dados tipados de cada seção:
- nav (logo, links, cta)
- hero (eyebrow, title parts, sub, ctas, trust copy)
- services (5 items com idx, name, em)
- manifesto (3 items)
- process (4 steps)
- work (5 cases)
- testimonial (quote, author, 3 stats)
- faq (6 items)
- cta (eyebrow, title parts, copy, ctas, info)
- footer (brand, tagline, columns)

Copy exata vem do README.md seção "Screens / Views". Tipa cada export
com interface explícita. Faça commit: "feat(content): static copy".
```

**Critério**: nenhum componente vai ter copy hardcoded depois — tudo importa de `lib/content.ts`.

---

## 5. Nav (sticky)

```
Implemente src/components/landing/Nav.tsx seguindo:
- Specs em README.md > seção 1 (Nav) e Mobile Specs > Nav (mobile)
- Visual no Kodus.html (referência, não copiar)

Requisitos:
- Sticky top, backdrop-blur, border-bottom
- Logo com ponto laranja girado 45° + texto Instrument Serif
- Links visíveis ≥980px, drawer mobile <980px
- CTA com seta diagonal, hover muda pra laranja
- Drawer: overlay full-screen, links 32px, botão X
- Respeita safe-area-inset-top (notch iOS)
- Hit targets ≥44x44

Use componentes UI já criados. Importe content de lib/content.ts.
Faça commit: "feat(landing): nav".
```

**Critério**:
- [ ] Funciona em 320px, 768px, 1280px
- [ ] Drawer abre/fecha com animação suave
- [ ] Links âncora rolam para a seção certa
- [ ] Sem layout shift quando carrega

---

## 6. Hero — Split (default)

```
Implemente src/components/landing/HeroSplit.tsx seguindo
README.md > seção 4 (Hero — Split) e Mobile Specs.

Layout:
- Grid 1fr / 1.1fr ≥980px; 1 coluna abaixo
- Hero meta no topo (3 spans, mono uppercase)
- Eyebrow REMOVIDA (não incluir "Estúdio digital · 2026")
- H1 grande com em itálico laranja
- Sub 17px, CTAs (primary + ghost)
- Trust bar (avatares + "+40 marcas...")
- Browser mock à direita: window chrome, URL fake, body com
  mock-h "Velocidade é uma escolha." e CTA "Iniciar"

Mobile: empilhar texto + browser, CTAs em coluna em <480px.

Browser mock pode ser SVG ou divs estilizadas.

Faça commit: "feat(landing): hero split".
```

**Critério**: pixel-perfect com Kodus.html, responsivo em 3 breakpoints.

---

## 7. Services

```
Implemente src/components/landing/Services.tsx.

- Section header (h2 em 2 linhas: "Serviços concretos." /
  "Resultado mensurável."). Cada linha em <span> com whitespace-nowrap
- Lista de 5 serviços, cada linha:
  - Grid 80px 1fr ≥980px
  - idx mono / nome em Instrument Serif clamp(36px,5vw,68px) +
    em itálico laranja com texto "/conversão", "/marca", etc
  - Hover: bg gradient horizontal (transparent → accent-soft →
    transparent), seta diagonal aparece da direita
  - Link <a> para #contato (todo o row é clicável)
- Mobile: idx menor, name solta whitespace-nowrap, seta visível
  estática

Faça commit: "feat(landing): services".
```

**Critério**: hover suave, animação da seta funciona, mobile tem affordance visual sem hover.

---

## 8. Manifesto

```
Implemente src/components/landing/Manifesto.tsx.

- Section header: h2 "Como a gente pensa." (1 linha) + meta à direita
- Grid 3 colunas com border-right divisor entre colunas
- Cada card: número mono "01 —" / título Instrument Serif itálico
  36px / parágrafo 15px

Mobile: 1 coluna, divisórias horizontais (border-bottom).

Faça commit: "feat(landing): manifesto".
```

---

## 9. Process

```
Implemente src/components/landing/Process.tsx.

- Section header: "Processo direto. Sem floreio."
- Background bg-2, border top + bottom
- Grid 4 colunas com 1px gap (simula border)
- Cada step: número Instrument Serif itálico 80px LARANJA /
  h4 18px medium / parágrafo / tag mono no rodapé

Tablet (600-980): 2 colunas. Mobile: 1 coluna.

Faça commit: "feat(landing): process".
```

---

## 10. Work

```
Implemente src/components/landing/Work.tsx.

- Section header: "Trabalhos recentes."
- Grid 1.4fr / 1fr ≥980px
- Card grande na coluna 1 ocupando 2 rows
- 4 cards menores ao redor
- Cada thumb: gradient bg + textura listrada repeating-linear-gradient
- Tags top-left (placeholder) e top-right (live verde, opcional)
- mock-h em Instrument Serif itálico
- mock-cta laranja no rodapé do thumb
- Meta abaixo: nome em Instrument Serif itálico + tag mono

Mobile: 1 coluna, card grande perde grid-row 1/3, vira normal.

Faça commit: "feat(landing): work".
```

---

## 11. Testimonial

```
Implemente src/components/landing/Testimonial.tsx.

- Section sem header padrão (eyebrow inline na esquerda)
- Grid 1.6fr / 1fr ≥980px
- Esquerda: eyebrow + quote gigante Instrument Serif (aspas
  decorativas em fg-mute, "22 dias" em itálico laranja) + author
  com avatar + nome + role mono
- Direita: 3 stats com border-left 2px laranja

Mobile: 1 coluna, stats empilhados.

Faça commit: "feat(landing): testimonial".
```

---

## 12. FAQ

```
Implemente src/components/landing/FAQ.tsx usando @radix-ui/react-accordion.

- Grid 1fr / 1.4fr
- Esquerda: eyebrow + h2 "O que **todo cliente** pergunta antes."
- Direita: lista de 6 items
  - Pergunta em Instrument Serif itálico 24px
  - Ícone "+" laranja que rotaciona 45° quando aberto
  - Apenas um aberto por vez (Accordion type="single")
- Animações suaves (max-height + opacity)
- Touch target ≥44x44 no botão

Faça commit: "feat(landing): faq".
```

---

## 13. CTA Final

```
Implemente src/components/landing/CTA.tsx.

- Padding 140px vertical (96px mobile)
- Radial gradient accent-soft 1200x1200 atrás (decorativo)
- text-align center
- Eyebrow "Próxima vaga · Junho 2026"
- H2 enorme "Pronto pra vender de verdade?"
- Parágrafo + 2 botões (mailto primário + ghost agendar call)
- Linha mono inferior com 3 prazos

Mobile: botões em coluna abaixo de 480px.

Faça commit: "feat(landing): cta-final".
```

---

## 14. Footer

```
Implemente src/components/landing/Footer.tsx.

- Border-top, padding 60px 0 32px
- Top grid 2fr 1fr 1fr 1fr:
  - Brand "Kodus" em Instrument Serif itálico 64px (com . laranja)
  - Tagline 14px max-w-[320px]
  - 3 colunas: Serviços / Estúdio / Contato
- Bottom: border-top, mono uppercase: copyright + localização

Tablet: 2 colunas. Mobile: 1 coluna.

Faça commit: "feat(landing): footer".
```

---

## 15. Compor a home

```
Edite src/app/page.tsx — importa todas as seções e compõe na ordem:

<Nav />
<HeroSplit />
<Services />
<Manifesto />
<Process />
<Work />
<Testimonial />
<FAQ />
<CTA />
<Footer />

Envolva cada seção com <Reveal> exceto Nav e HeroSplit (already visible
above the fold).

Faça commit: "feat(landing): compose home".
```

---

## 16. SEO + Metadata

```
Configure metadata robusta em app/layout.tsx (já temos base em SETUP.md).

Adicione:
- app/opengraph-image.tsx (gerador OG image dinâmico do Next)
- app/icon.tsx (favicon dinâmico)
- app/robots.ts
- app/sitemap.ts
- alternates.canonical

Use cores do brand. Texto "Kodus / Sites que vendem" no OG.

Faça commit: "feat(seo): metadata + og + sitemap".
```

---

## 17. Acessibilidade & Performance

```
Audit final:
1. Rode Lighthouse mobile e desktop. Reporte scores.
2. Confira contrastes (axe DevTools). Liste falhas.
3. Confira focus visible em todos os interativos.
4. Confira que prefers-reduced-motion desativa reveal/transitions.
5. Confira que Tab funciona pra navegar tudo.

Conserte o que estiver abaixo de 95 em qualquer categoria.
Faça commit: "perf: a11y + lighthouse fixes".
```

**Critério**: Lighthouse ≥95 em todas as categorias, axe sem violações sérias.

---

## 18. Página de formulário em etapas (/formulario)

> Existe um arquivo de referência visual: `Formulario.html` (HTML estático com a estética final). Use como referência **visual e de estrutura**, mas **não copie o markup** — implemente em React limpo.

```
Implemente a página /formulario seguindo Formulario.html como
referência visual e este briefing:

ROTA E ARQUIVOS
- src/app/formulario/page.tsx (Server Component, metadata própria)
- src/app/formulario/layout.tsx (sem Nav/Footer da home — layout enxuto)
- src/components/formulario/FormShell.tsx (Client, gerencia state)
- src/components/formulario/Step1Identidade.tsx
- src/components/formulario/Step2Projeto.tsx
- src/components/formulario/Step3Investimento.tsx
- src/components/formulario/Sucesso.tsx
- src/components/formulario/ProgressBar.tsx
- src/lib/briefing-schema.ts (validação Zod)

ESTRUTURA
- Nav slim: logo (link pra "/") à esquerda + meta mono à direita
  ("Atendimento ativo" com pulse verde, "São Paulo · BR")
- Barra de progresso sticky abaixo do nav: meta uppercase mono
  + contador "01 / 03" + barra 2px laranja com transition
- Footer slim só com copyright + localização

ETAPAS
1. **Quem é você** — Nome*, email*, WhatsApp (opcional, hint
   "pra confirmar agenda"), Empresa
2. **Sobre o projeto** — radio cards: Landing page · Site
   institucional · E-commerce · Sistema custom · Outro
3. **Investimento e prazo** — radio cards 3 colunas:
   Orçamento (Até R$15k / R$15-40k / R$40-100k / Acima 100k /
   Ainda não sei) e Prazo (Urgente / 1-2 meses / 3+ meses /
   Flexível)

VALIDAÇÃO
- Zod schema por etapa (StepSchema1, StepSchema2, StepSchema3)
- Bloqueia avanço se etapa atual inválida
- Erros inline em mono vermelho abaixo do campo
- Errors limpam ao digitar/selecionar
- Email regex simples; WhatsApp aceita só dígitos ≥10

TELA DE SUCESSO
- Check em círculo laranja-soft
- "Recebemos. *Valeu.*" (em italic laranja em "Valeu.")
- Subcopy: "A gente responde em até 24h úteis com próximos passos"
- Meta mono uppercase: Resposta <24h · Call 30min · Sem compromisso
- Botão ghost "Voltar pro site" → /

INTERAÇÃO
- Animação fade+slideY entre etapas com Framer Motion
  (AnimatePresence, mode="wait")
- Respeitar prefers-reduced-motion
- Enter avança quando etapa válida (não em textarea)
- Foco automático no primeiro input ao trocar de etapa
- Scroll to top suave ao trocar
- Estado NÃO persistido (decisão deliberada — leve, ~1min)

ESTILO
- Inputs underline-only (border-bottom 1px), foco vira laranja
- Labels mono uppercase 11px
- Required indicator: ponto laranja "*"
- Radio cards: bg --card, hover translateY(-1px),
  selecionado bg --accent-soft + border --accent + dot laranja
- Heading: Instrument Serif clamp(44px, 7vw, 80px), em itálico laranja
- Sub: 17px fg-dim
- Min-height 88px nos cards pra evitar overlap

API
- POST /api/contact recebendo o payload validado
- Por enquanto: console.log + retorna 200 (provider depois)
- Schema export: type Briefing = z.infer<typeof BriefingSchema>

LINKAGEM
- Todos os CTAs do site (Hero, Services rows, Nav cta, CTA final,
  Footer) devem apontar pra /formulario via <Link href="/formulario">
- Footer da home pode manter mailto:ola@kodus.studio como secundário

Faça commit: "feat(formulario): página de briefing em 3 etapas".
```

**Critério de aceitação:**
- [ ] Visualmente idêntico ao `Formulario.html` em mobile e desktop
- [ ] Zod valida cada etapa, erros aparecem inline e somem ao corrigir
- [ ] Animação suave entre etapas (sem flash, sem layout shift)
- [ ] Enter avança quando válido
- [ ] Logo volta pra "/"; tela de sucesso volta pra "/"
- [ ] `/api/contact` registra payload válido (provider real depois)
- [ ] Lighthouse mobile ≥95 nesta página

---

## 19. Form provider real (depois)

> Quando você decidir o provider (Resend, Formspree, ou webhook próprio), me peça:
> *"Implemente o provider [X] no /api/contact existente — mantenha o schema Zod e adicione rate limit por IP."*

---

## Dicas pra usar bem

- **`/clear` entre seções grandes** pra economizar contexto.
- **Cole screenshots** do Kodus.html quando achar que o Claude está desviando do visual.
- **Peça revisão visual** entre seções: *"Compare lado a lado com Kodus.html e me liste 3 diferenças visuais"*.
- **Não pule etapas**: cada commit pequeno facilita reverter se algo quebrar.
- **Faça git push** depois de cada 2–3 commits — não acumule.
