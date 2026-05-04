// Kodus landing — main app
const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "displayFont": "Instrument Serif"
} /*EDITMODE-END*/;

const FONTS = {
  "Instrument Serif": "'Instrument Serif', serif",
  "Fraunces": "'Fraunces', serif",
  "Bricolage": "'Bricolage Grotesque', sans-serif",
  "Archivo": "'Archivo', sans-serif"
};

// ── small reveal hook ──────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {if (e.isIntersecting) e.target.classList.add('in');});
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ── NAV ────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#" className="logo">
          <span className="dot"></span>
          Kodus
        </a>
        <div className="nav-links">
          <a href="#servicos">Serviços</a>
          <a href="#processo">Processo</a>
          <a href="#trabalhos">Trabalhos</a>
          <a href="#faq">FAQ</a>
          <a href="Formulario.html">Contato</a>
        </div>
        <a href="Formulario.html" className="nav-cta">
          Começar projeto
          <svg className="arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </a>
      </div>
    </nav>);

}

// ── HERO 1 — editorial ─────────────────────────────────────────────────────
function HeroEditorial() {
  return (
    <section className="hero hero-1" data-screen-label="01 Hero — Editorial">
      <div className="grid-bg"></div>
      <div className="hero-meta">
        <span>Kodus / Estúdio Digital</span>
        <span className="live">Aceitando 2 projetos · Mai/Jun 2026</span>
        <span>São Paulo, BR · 2026</span>
      </div>
      <h1 className="h1-title">
        Sites que<br />
        <em>vendem.</em> <span className="stroke">não</span><br />
        que enfeitam.
      </h1>
      <div className="h1-row">
        <div>
          <p className="h1-sub">
            Landing pages, sites institucionais, e-commerces e portfólios construídos para converter — não pra ganhar prêmio em concurso de gradient.
          </p>
          <div className="h1-cta">
            <a href="Formulario.html" className="btn-primary">
              Quero um orçamento
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </a>
            <a href="#trabalhos" className="btn-ghost">Ver trabalhos</a>
          </div>
        </div>
        <div className="h1-side">
          <div className="h1-stat">
            <div className="num">+312%</div>
            <div className="lbl">conversão média / cliente</div>
          </div>
          <div className="h1-stat">
            <div className="num">21 dias</div>
            <div className="lbl">prazo médio de entrega</div>
          </div>
          <div className="h1-stat">
            <div className="num">98<span style={{ fontSize: '.4em', verticalAlign: 'super' }}>/100</span></div>
            <div className="lbl">PageSpeed médio</div>
          </div>
        </div>
      </div>
    </section>);

}

// ── HERO 2 — type-stack manifesto ──────────────────────────────────────────
function HeroStack() {
  return (
    <section className="hero hero-2" data-screen-label="01 Hero — Stack">
      <div className="grid-bg"></div>
      <div className="hero-meta">
        <span>Estúdio · Design + Código</span>
        <span className="live">Online agora</span>
        <span>v.2026</span>
      </div>
      <div className="stack">
        <div className="line">Mais <em>conversão.</em></div>
        <div className="line">Menos <span style={{ fontStyle: 'italic', color: 'var(--fg-mute)' }}>atrito.</span></div>
        <div className="line">
          O digital
          <span className="badge">
            <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="3" fill="currentColor" /></svg>
            ao vivo
          </span>
          da sua
        </div>
        <div className="line"><em>startup,</em> levado</div>
        <div className="line">a sério.</div>
      </div>
      <div className="footer-row">
        <p>Construímos a parte digital de marcas que querem ser confundidas com produto — não com agência.</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="Formulario.html" className="btn-primary">Iniciar projeto
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </a>
          <a href="#trabalhos" className="btn-ghost">Trabalhos recentes</a>
        </div>
      </div>
    </section>);

}

// ── HERO 3 — split + browser mock ──────────────────────────────────────────
function HeroSplit() {
  return (
    <section className="hero hero-3" data-screen-label="01 Hero — Split">
      <div className="grid-bg"></div>
      <div className="hero-meta">
        <span>Kodus · Studio Digital</span>
        <span className="live">2 vagas · Mai/Jun 2026</span>
        <span>São Paulo, BR</span>
      </div>
      <div className="split">
        <div>
          <h1 className="h3-title">
            Mais conversão. <em>Menos</em> atrito.
          </h1>
          <p className="h3-sub">Sites e plataformas sob demanda para startups que querem performance — não só beleza. Design afiado, código limpo, prazo cumprido.</p>
          <div className="h3-cta">
            <a href="Formulario.html" className="btn-primary">Falar com a gente
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </a>
            <a href="#trabalhos" className="btn-ghost">Ver portfólio</a>
          </div>
          <div className="h3-trust">
            <div className="avatars"><span></span><span></span><span></span></div>
            <span>+40 marcas confiaram · NPS 92</span>
          </div>
        </div>
        <div className="browser">
          <div className="browser-bar">
            <div className="d" style={{ background: '#ff5f56' }}></div>
            <div className="d" style={{ background: '#ffbd2e' }}></div>
            <div className="d" style={{ background: '#27c93f' }}></div>
            <div className="url">kodus.studio/cases/orion</div>
          </div>
          <div className="browser-body">
            <div className="blob"></div>
            <div className="nav-mini">
              <span>Orion / 2026</span>
              <span>Cases · About · Contact</span>
            </div>
            <div className="h-mock">Velocidade <span>é</span><br />uma escolha.</div>
            <div className="cta-mock">
              Iniciar
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// ── MARQUEE (removed) ──────────────────────────────────────────────────────
function Marquee() {
  return null;
}

// ── MANIFESTO ──────────────────────────────────────────────────────────────
function Manifesto() {
  const items = [
  { n: "01", t: "Minimalista, não vazio", b: "Cada elemento tem função. Quando algo não vende ou não conta a história, a gente apaga." },
  { n: "02", t: "Rápido como deve ser", b: "Lighthouse 95+, LCP abaixo de 1s. Site lento perde cliente — e dinheiro — todo dia." },
  { n: "03", t: "Profissional, sem ser chato", b: "Tom de voz da sua marca. Visual que respeita inteligência. Nada de stock photo de homem com gravata." }];

  return (
    <section className="manifesto reveal">
      <div className="sec-head">
        <h2 style={{whiteSpace:'nowrap'}}>Como a gente <em>pensa</em>.</h2>
        <div className="meta">Três princípios que aparecem em todo projeto que sai daqui — do briefing à entrega.</div>
      </div>
      <div className="manifesto-grid">
        {items.map((it) =>
        <div className="m-card" key={it.n}>
            <div className="num">{it.n} —</div>
            <h3>{it.t}</h3>
            <p>{it.b}</p>
          </div>
        )}
      </div>
    </section>);

}

// ── SERVICES ───────────────────────────────────────────────────────────────
function Services() {
  const services = [
  { idx: "01", name: "Landing pages", em: "/conversão" },
  { idx: "02", name: "Site institucional", em: "/marca" },
  { idx: "03", name: "E-commerce", em: "/vendas" },
  { idx: "04", name: "Portfólio criativo", em: "/autor" },
  { idx: "05", name: "Sistemas sob demanda", em: "/produto" }];

  return (
    <section className="services reveal" id="servicos">
      <div className="sec-head">
        <h2><span>Serviços <em>concretos.</em></span><span>Resultado <em>mensurável.</em></span></h2>
        <div className="meta">Cinco entregáveis. Escopo claro. Sem reunião pra falar de reunião.</div>
      </div>
      <div className="svc-list">
        {services.map((s) =>
        <a className="svc-row" href="Formulario.html" key={s.idx}>
            <div className="idx">{s.idx} /</div>
            <div className="name">{s.name}<em>{s.em}</em></div>
            <svg className="arrow-svg" width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path d="M5 19L19 5M19 5H8M19 5V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>
        )}
      </div>
    </section>);

}

// ── PROCESS ────────────────────────────────────────────────────────────────
function Process() {
  const steps = [
  { n: "01", t: "Briefing afiado", b: "Call de 45 minutos. A gente faz pergunta difícil, você fala da sua dor real. Saímos com escopo, prazo e proposta.", tag: "1–2 dias" },
  { n: "02", t: "Design objetivo", b: "Wireframe, sistema visual, protótipo. Nada de PDF de 80 páginas. Decidimos rápido, ajustamos rápido.", tag: "5–10 dias" },
  { n: "03", t: "Build limpo", b: "Código em React/Next, componentes reutilizáveis, performance auditada. Você acompanha em staging.", tag: "10–20 dias" },
  { n: "04", t: "Lançamento", b: "Deploy, analytics, SEO, treinamento. 30 dias de suporte incluso e relatório de métricas.", tag: "1–2 dias" }];

  return (
    <section className="process reveal" id="processo">
      <div className="sec-head">
        <h2>Processo <em>direto</em>. Sem floreio.</h2>
        <div className="meta">Quatro fases. Você sabe onde estamos, o que falta e quando entrega — sempre.</div>
      </div>
      <div className="proc-grid">
        {steps.map((s) =>
        <div className="p-step" key={s.n}>
            <div className="step-num">{s.n}</div>
            <h4>{s.t}</h4>
            <p>{s.b}</p>
            <div className="tag">{s.tag}</div>
          </div>
        )}
      </div>
    </section>);

}

// ── WORK ───────────────────────────────────────────────────────────────────
function Work() {
  return (
    <section className="work reveal" id="trabalhos">
      <div className="sec-head">
        <h2>Trabalhos <em>recentes.</em></h2>
        <div className="meta">Seleção de projetos entregues nos últimos 12 meses. Casos completos sob NDA disponíveis no contato.</div>
      </div>
      <div className="work-grid">
        <div className="w-card" style={{ gridColumn: '1 / 2', gridRow: '1 / 3' }}>
          <div className="w-thumb lg style-2">
            <span className="placeholder-tag">Case · Landing</span>
            <span className="live-tag">Live</span>
            <div className="mock-h">Capital que <span>respira.</span></div>
            <div className="mock-cta">Abrir conta →</div>
          </div>
          <div className="w-meta">
            <span className="ttl">Orion Capital</span>
            <span className="tag">Fintech · 2026</span>
          </div>
        </div>
        <div className="w-card">
          <div className="w-thumb style-3">
            <span className="placeholder-tag">Case · Institucional</span>
            <div className="mock-h" style={{ fontSize: 'clamp(20px,2.6vw,38px)' }}>Engenharia <span>aplicada.</span></div>
          </div>
          <div className="w-meta">
            <span className="ttl">Helix Studio</span>
            <span className="tag">SaaS · 2025</span>
          </div>
        </div>
        <div className="w-card">
          <div className="w-thumb style-4">
            <span className="placeholder-tag">Case · E-commerce</span>
            <span className="live-tag">Live</span>
            <div className="mock-h" style={{ fontSize: 'clamp(20px,2.6vw,38px)' }}>Café <span>de origem.</span></div>
          </div>
          <div className="w-meta">
            <span className="ttl">Verdê</span>
            <span className="tag">D2C · 2025</span>
          </div>
        </div>
        <div className="w-card">
          <div className="w-thumb style-5">
            <span className="placeholder-tag">Case · Portfólio</span>
            <div className="mock-h" style={{ fontSize: 'clamp(20px,2.6vw,38px)' }}>Carla <span>Drumond</span></div>
          </div>
          <div className="w-meta">
            <span className="ttl">Drumond Atelier</span>
            <span className="tag">Arquitetura · 2025</span>
          </div>
        </div>
        <div className="w-card">
          <div className="w-thumb style-6">
            <span className="placeholder-tag">Case · Sistema</span>
            <span className="live-tag">Beta</span>
            <div className="mock-h" style={{ fontSize: 'clamp(20px,2.6vw,38px)' }}>Operação <span>em tempo real.</span></div>
          </div>
          <div className="w-meta">
            <span className="ttl">Pulso Logística</span>
            <span className="tag">Dashboard · 2026</span>
          </div>
        </div>
      </div>
    </section>);

}

// ── TESTIMONIAL ────────────────────────────────────────────────────────────
function Testimonial() {
  return (
    <section className="testi reveal">
      <div className="testi-inner">
        <div>
          <span className="eyebrow">O que clientes dizem</span>
          <p className="testi-quote" style={{ marginTop: 32 }}>
            <span className="open">“</span>A Kodus entregou em <em>22 dias</em> o que outra agência tentou fazer em 4 meses. O site triplicou nosso CAC payback.<span className="close">”</span>
          </p>
          <div className="testi-author">
            <div className="av"></div>
            <div>
              <div className="name">Marina Toledo</div>
              <div className="role">CMO · Orion Capital</div>
            </div>
          </div>
        </div>
        <div className="testi-stats">
          <div className="testi-stat">
            <b>+312%</b>
            <span>conversão de visitas em leads</span>
          </div>
          <div className="testi-stat">
            <b>22d</b>
            <span>do briefing ao deploy</span>
          </div>
          <div className="testi-stat">
            <b>0,8s</b>
            <span>LCP em 4G médio (mobile)</span>
          </div>
        </div>
      </div>
    </section>);

}

// ── FAQ ────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(0);
  const items = [
  { q: "Quanto custa um site da Kodus?", a: "Depende do escopo. Landings começam em R$ 4.5k, institucionais em R$ 8k, e-commerce em R$ 18k. Sempre passamos proposta com escopo, prazo e valor fechado antes de começar — nada de orçamento aberto." },
  { q: "Em quanto tempo vocês entregam?", a: "Landings em 7–14 dias, institucionais em 21–28 dias, e-commerce em 30–60 dias. Sistemas sob demanda dependem do escopo. Trabalhamos com sprints semanais — você acompanha em staging." },
  { q: "Vocês cuidam do design ou só do código?", a: "Os dois. O time é multidisciplinar — design, código e copy moram na mesma sala. Você não precisa contratar três fornecedores e rezar pra eles se entenderem." },
  { q: "E depois de pronto, como fica?", a: "30 dias de suporte inclusos pós-lançamento. Depois disso, oferecemos planos de manutenção mensal a partir de R$ 800 — ou você toca sozinho com a documentação que entregamos." },
  { q: "Vocês trabalham com qualquer nicho?", a: "Trabalhamos com quem tem a casa minimamente arrumada — produto definido, posicionamento claro, orçamento alinhado. Não fazemos site pra MMN, casino e nicho cinza." },
  { q: "Como começa?", a: "Você manda mensagem com 2–3 frases sobre o projeto. Se faz sentido, marcamos call de briefing em até 48h e mandamos proposta na semana." }];

  return (
    <section className="faq reveal" id="faq">
      <div className="faq-grid">
        <div>
          <span className="eyebrow">Perguntas frequentes</span>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(48px,6vw,80px)', lineHeight: '.95', letterSpacing: '-.02em', margin: '24px 0 0', fontWeight: 400 }}>
            O que <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>todo cliente</em> pergunta antes.
          </h2>
        </div>
        <div className="faq-list">
          {items.map((it, i) =>
          <div className="faq-item" key={i} data-open={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              <div className="faq-q">
                <span>{it.q}</span>
                <span className="plus">+</span>
              </div>
              <div className="faq-a">{it.a}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ── CTA ────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="cta-final reveal" id="contato">
      <span className="eyebrow">Próxima vaga · Junho 2026</span>
      <h2>Pronto pra <em>vender</em><br />de verdade?</h2>
      <p>Conta em três etapas rápidas o que você quer construir. Respondemos em até 24h com próximos passos.</p>
      <div className="actions">
        <a href="Formulario.html" className="btn-primary">
          Começar projeto
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </a>
        <a href="mailto:ola@kodus.studio" className="btn-ghost">ola@kodus.studio</a>
      </div>
      <div className="secondary-info">
        Resposta em até <b>24h</b> · Briefing em até <b>48h</b> · Proposta em até <b>5 dias</b>
      </div>
    </section>);

}

// ── FOOTER ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer>
      <div className="ftr-top">
        <div>
          <div className="ftr-brand">Kodus<span className="accent">.</span></div>
          <div className="ftr-tagline">Estúdio digital paulistano. Construímos a parte digital de marcas que querem ser confundidas com produto.</div>
        </div>
        <div className="ftr-col">
          <h5>Serviços</h5>
          <ul>
            <li><a href="#">Landing pages</a></li>
            <li><a href="#">Sites institucionais</a></li>
            <li><a href="#">E-commerce</a></li>
            <li><a href="#">Portfólios</a></li>
            <li><a href="#">Sistemas</a></li>
          </ul>
        </div>
        <div className="ftr-col">
          <h5>Estúdio</h5>
          <ul>
            <li><a href="#">Trabalhos</a></li>
            <li><a href="#">Processo</a></li>
            <li><a href="#">Manifesto</a></li>
            <li><a href="#">Diário</a></li>
          </ul>
        </div>
        <div className="ftr-col">
          <h5>Contato</h5>
          <ul>
            <li><a href="mailto:ola@kodus.studio">ola@kodus.studio</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">Behance</a></li>
          </ul>
        </div>
      </div>
      <div className="ftr-bottom">
        <span>© 2026 Kodus Studio · CNPJ 00.000.000/0001-00</span>
        <span>São Paulo · Brasil · 23.5505°S 46.6333°W</span>
      </div>
    </footer>);

}

// ── ROOT ───────────────────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', t.theme);
    document.documentElement.style.setProperty('--display', FONTS[t.displayFont] || FONTS["Instrument Serif"]);
  }, [t.theme, t.displayFont]);

  let Hero = HeroSplit;

  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Manifesto />
      <Process />
      <Work />
      <Testimonial />
      <FAQ />
      <CTA />
      <Footer />

      <TweaksPanel title="Tweaks · Kodus">
        <TweakSection label="Tema" />
        <TweakRadio
          label="Modo"
          value={t.theme}
          options={[{ value: 'dark', label: 'Escuro' }, { value: 'light', label: 'Claro' }]}
          onChange={(v) => setTweak('theme', v)} />
        
        <TweakSection label="Tipografia" />
        <TweakSelect
          label="Display font"
          value={t.displayFont}
          options={Object.keys(FONTS)}
          onChange={(v) => setTweak('displayFont', v)} />
        
      </TweaksPanel>
    </>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);