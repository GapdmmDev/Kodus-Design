// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

/** Segment of a display title — supports italic, accent color, and stroke. */
export interface TitleSegment {
  text: string;
  italic?: boolean;
  /** Orange accent color (var(--accent)) */
  accent?: boolean;
  /** Outline/stroke text — no fill, white border */
  stroke?: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface NavData {
  logo: string;
  links: NavLink[];
  cta: NavLink;
}

export interface HeroCTA {
  label: string;
  href: string;
  variant: "primary" | "ghost";
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroMetaItem {
  text: string;
  /** Renders a green pulsing dot before the text */
  live?: boolean;
}

export interface HeroData {
  /** 3 spans: studio / availability (live dot) / location */
  meta: HeroMetaItem[];
  /** Array of lines; each line is an array of segments */
  title: TitleSegment[][];
  sub: string;
  ctas: HeroCTA[];
  trust: string;
  stats: HeroStat[];
  browserMock: {
    url: string;
    heading: string;
    cta: string;
  };
}

export interface ServiceItem {
  idx: string;
  name: string;
  /** Italic orange category suffix rendered inside <em> */
  em: string;
  desc: string;
  price: string;
  time: string;
}

export interface ServicesData {
  /** Array of lines; each line is an array of segments */
  heading: TitleSegment[][];
  meta: string;
  items: ServiceItem[];
}

export interface ManifestoItem {
  num: string;
  title: string;
  body: string;
}

export interface ManifestoData {
  heading: string;
  meta: string;
  items: ManifestoItem[];
}

export interface ProcessStep {
  num: string;
  title: string;
  body: string;
  tag: string;
}

export interface WorkCase {
  slug: string;
  name: string;
  tag: string;
  mockHeading: string;
  featured?: boolean;
}

export interface TestimonialData {
  eyebrow: string;
  quote: TitleSegment[];
  author: {
    name: string;
    role: string;
  };
  stats: Array<{ value: string; label: string }>;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQData {
  eyebrow: string;
  heading: TitleSegment[];
  items: FAQItem[];
}

export interface CTAData {
  eyebrow: string;
  title: TitleSegment[];
  copy: string;
  ctas: Array<{ label: string; href: string; variant: "primary" | "ghost" }>;
  info: string;
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export interface FooterData {
  brand: string;
  tagline: string;
  columns: FooterColumn[];
  copyright: string;
  location: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

export const nav: NavData = {
  logo: "Kodus",
  links: [
    { label: "Serviços", href: "#servicos" },
    { label: "Processo", href: "#processo" },
    { label: "Trabalhos", href: "#trabalhos" },
    { label: "FAQ", href: "#faq" },
    { label: "Contato", href: "#contato" },
  ],
  cta: { label: "Começar projeto", href: "#contato" },
};

export const hero: HeroData = {
  meta: [
    { text: "Kodus / Estúdio Digital" },
    { text: "Aceitando 2 projetos · Mai/Jun 2026", live: true },
    { text: "São Paulo, BR" },
  ],
  title: [
    [{ text: "Sites que" }],
    [
      { text: "vendem.", italic: true, accent: true },
      { text: " não", italic: true, stroke: true },
    ],
    [{ text: "que enfeitam." }],
  ],
  sub: "Desenvolvemos sites que trabalham enquanto você dorme. Do briefing ao ar em menos de 30 dias.",
  ctas: [
    { label: "Começar projeto", href: "#contato", variant: "primary" },
    { label: "Ver trabalhos", href: "#trabalhos", variant: "ghost" },
  ],
  trust: "+40 marcas confiaram",
  stats: [
    { value: "+312%", label: "conversão média / cliente" },
    { value: "21 dias", label: "prazo médio de entrega" },
    { value: "98/100", label: "PageSpeed médio" },
  ],
  browserMock: {
    url: "kodus.studio/cases/orion",
    heading: "Velocidade é uma escolha.",
    cta: "Iniciar",
  },
};

export const services: ServicesData = {
  heading: [
    [
      { text: "Serviços " },
      { text: "concretos.", italic: true, accent: true },
    ],
    [
      { text: "Resultado " },
      { text: "mensurável.", italic: true, accent: true },
    ],
  ],
  meta: "Cada entrega inclui design, código e analytics prontos pra uso.",
  items: [
    {
      idx: "01",
      name: "Landing pages",
      em: "/conversão",
      desc: "Uma página, um objetivo, uma ação. Sem distração que escape o lead.",
      price: "A partir de R$ 4,5k",
      time: "7–14 dias",
    },
    {
      idx: "02",
      name: "Site institucional",
      em: "/marca",
      desc: "Presença digital que transmite credibilidade antes de qualquer reunião.",
      price: "A partir de R$ 8k",
      time: "21–28 dias",
    },
    {
      idx: "03",
      name: "E-commerce",
      em: "/vendas",
      desc: "Loja com checkout otimizado para converter, não para impressionar.",
      price: "A partir de R$ 18k",
      time: "30–60 dias",
    },
    {
      idx: "04",
      name: "Portfólio criativo",
      em: "/autor",
      desc: "Seus trabalhos apresentados com o cuidado que merecem.",
      price: "A partir de R$ 6k",
      time: "14–21 dias",
    },
    {
      idx: "05",
      name: "Sistemas sob demanda",
      em: "/produto",
      desc: "Do briefing ao deploy. Produto digital sob medida, sem gambiarras.",
      price: "A partir de R$ 25k",
      time: "60+ dias",
    },
  ],
};

export const manifesto: ManifestoData = {
  heading: "Como a gente pensa.",
  meta: "Os princípios que guiam cada decisão de design e código.",
  items: [
    {
      num: "01 —",
      title: "Minimalista, não vazio",
      body: "Cada elemento existe com propósito. Removemos tudo que não guia, não converte, não vende. Design por subtração.",
    },
    {
      num: "02 —",
      title: "Rápido como deve ser",
      body: "LCP abaixo de 1,5s não é bônus — é requisito. Site lento perde venda antes do visitante terminar de carregar a página.",
    },
    {
      num: "03 —",
      title: "Profissional, sem ser chato",
      body: "Seriedade e personalidade não se excluem. Fazemos sites que a pessoa se orgulha de mostrar.",
    },
  ],
};

export const process: ProcessStep[] = [
  {
    num: "01",
    title: "Briefing afiado",
    body: "Uma conversa estruturada sobre objetivo, cliente e contexto. Uma hora aqui evita semanas de revisão.",
    tag: "1–2 dias",
  },
  {
    num: "02",
    title: "Design objetivo",
    body: "Wireframe e visual centrados em hierarquia e conversão. Nada de enfeite por enfeite.",
    tag: "5–10 dias",
  },
  {
    num: "03",
    title: "Build limpo",
    body: "Next.js, TypeScript, Tailwind CSS. Código que qualquer dev entende e o Google ama.",
    tag: "10–20 dias",
  },
  {
    num: "04",
    title: "Lançamento",
    body: "Deploy, testes cross-browser e analytics configurado. Você sai com domínio apontado e métricas rodando.",
    tag: "1–2 dias",
  },
];

export const work: WorkCase[] = [
  {
    slug: "orion-capital",
    name: "Orion Capital",
    tag: "Fintech · 2026",
    mockHeading: "Dados claros. Decisão rápida.",
    featured: true,
  },
  {
    slug: "helix-studio",
    name: "Helix Studio",
    tag: "SaaS",
    mockHeading: "Da ideia ao produto.",
  },
  {
    slug: "verde",
    name: "Verdê",
    tag: "D2C",
    mockHeading: "Diretamente a quem importa.",
  },
  {
    slug: "drumond-atelier",
    name: "Drumond Atelier",
    tag: "Arquitetura",
    mockHeading: "Espaço fala por si.",
  },
  {
    slug: "pulso-logistica",
    name: "Pulso Logística",
    tag: "Dashboard",
    mockHeading: "Operação em tempo real.",
  },
];

export const testimonial: TestimonialData = {
  eyebrow: "Resultados reais",
  quote: [
    { text: "Esperava 30 dias. Ficou no ar em " },
    { text: "22 dias", italic: true, accent: true },
    {
      text: " — sem comprometer um pixel do design. Maior taxa de conversão do nosso histórico.",
    },
  ],
  author: {
    name: "Rafael Mendes",
    role: "CEO · Orion Capital",
  },
  stats: [
    { value: "+312%", label: "conversão" },
    { value: "22d", label: "entrega" },
    { value: "0,8s", label: "LCP" },
  ],
};

export const faq: FAQData = {
  eyebrow: "Dúvidas frequentes",
  heading: [
    { text: "O que " },
    { text: "todo cliente", italic: true, accent: true },
    { text: " pergunta antes." },
  ],
  items: [
    {
      q: "Quanto tempo leva para meu site ficar pronto?",
      a: "Depende do escopo. Landing page: 7–14 dias. Site institucional: 21–28 dias. O prazo exato entra no briefing, antes de você assinar qualquer coisa.",
    },
    {
      q: "Como funciona o pagamento?",
      a: "50% na assinatura do contrato, 50% na entrega final. Sem surpresa. Projetos acima de R$ 10k aceitam divisão em mais etapas.",
    },
    {
      q: "Preciso ter o conteúdo pronto antes de começar?",
      a: "Não. Estruturamos o conteúdo com você no briefing. Os textos e imagens finais chegam antes da fase de build, com tempo para ajuste.",
    },
    {
      q: "Vocês fazem manutenção depois do lançamento?",
      a: "Sim. Os primeiros 30 dias pós-lançamento têm suporte incluso para pequenos ajustes. Projetos maiores têm contrato de manutenção mensal disponível.",
    },
    {
      q: "Com que tecnologia vocês trabalham?",
      a: "Next.js, TypeScript, Tailwind CSS e Framer Motion. Stack moderna, performática e fácil de evoluir. SEO técnico e acessibilidade fazem parte do pacote.",
    },
    {
      q: "Posso pedir mudanças durante o projeto?",
      a: "Sim, com critério. Cada projeto tem rodadas de revisão definidas em contrato. Funciona — e evita o scope creep que atrasa tudo.",
    },
  ],
};

export const cta: CTAData = {
  eyebrow: "Próximo passo",
  title: [
    { text: "Pronto pra " },
    { text: "vender", italic: true, accent: true },
    { text: " de verdade?" },
  ],
  copy: "Sem reunião de apresentação. Direto ao briefing, proposta em 5 dias.",
  ctas: [
    {
      label: "Enviar briefing",
      href: "mailto:contato@kodus.studio",
      variant: "primary",
    },
    { label: "Agendar call · 30min", href: "#contato", variant: "ghost" },
  ],
  info: "Resposta em até 24h · Briefing em até 48h · Proposta em até 5 dias",
};

export const footer: FooterData = {
  brand: "Kodus",
  tagline: "Sites que vendem. Entregues sem stress.",
  columns: [
    {
      heading: "Serviços",
      links: [
        { label: "Landing pages", href: "#servicos" },
        { label: "Site institucional", href: "#servicos" },
        { label: "E-commerce", href: "#servicos" },
        { label: "Portfólio criativo", href: "#servicos" },
        { label: "Sistemas sob demanda", href: "#servicos" },
      ],
    },
    {
      heading: "Estúdio",
      links: [
        { label: "Sobre", href: "#" },
        { label: "Processo", href: "#processo" },
        { label: "Trabalhos", href: "#trabalhos" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      heading: "Contato",
      links: [
        { label: "contato@kodus.studio", href: "mailto:contato@kodus.studio" },
        { label: "São Paulo, BR", href: "#" },
      ],
    },
  ],
  copyright: "© 2026 Kodus Estúdio Digital",
  location: "São Paulo, SP · Brasil",
};
