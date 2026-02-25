import logoTop from "../assets/belli_logo_white_transparent.png";
import logoScrolled from "../assets/belli_logo_blue_cropped_transparent.png";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Menu, X } from "lucide-react";

/* ─── animation ──────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

/* ─── primitives ─────────────────────────────────────────────────── */

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-64px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-64px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 1.0, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  if (accent) {
    return (
      <motion.div variants={fadeUp} className="inline-block relative mb-6">
        <div aria-hidden className="absolute inset-0 -mx-3 -my-1.5 bg-[#ede8e0]/70" />
        <p className="relative text-[0.62rem] font-semibold tracking-[0.28em] uppercase text-stone-500">
          {children}
        </p>
      </motion.div>
    );
  }
  return (
    <motion.p
      variants={fadeUp}
      className="text-[0.62rem] font-semibold tracking-[0.28em] uppercase text-stone-400 mb-6"
    >
      {children}
    </motion.p>
  );
}

const DIVIDER = "border-t border-stone-200";

/* ─── data ───────────────────────────────────────────────────────── */

const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Metodología", href: "#metodologia" },
  { label: "Cómo trabajamos", href: "#como-trabajamos" },
  { label: "Resultados", href: "#resultados" },
  { label: "Liderazgo", href: "#sobre-mi" },
  { label: "Contacto", href: "#contacto" },
];

const services = [
  {
    n: "01",
    title: "Estrategia de Crecimiento Empresarial",
    description: "Diseñamos y estructuramos estrategias de crecimiento sostenible y ejecutable.",
    bullets: [
      "Expansión de canales y mercados",
      "Nuevos modelos de ingreso",
      "Arquitectura comercial",
      "Alianzas estratégicas",
    ],
  },
  {
    n: "02",
    title: "Optimización de Ecommerce",
    description: "Transformamos canales digitales en motores de rentabilidad medible.",
    bullets: [
      "Estrategia omnicanal y D2C",
      "Optimización de conversión",
      "Gestión de performance digital",
      "Estrategia de surtido y márgenes",
    ],
  },
  {
    n: "03",
    title: "Business Development Estructurado",
    description: "Convertimos visión comercial en planes accionables con métricas claras.",
    bullets: [
      "Planeamiento estratégico",
      "OKRs, KPIs y gobernanza",
      "Estructuración organizacional",
      "Desarrollo de nuevos mercados",
    ],
  },
  {
    n: "04",
    title: "Acompañamiento Estratégico",
    description: "Estamos en la ejecución, no solo en la recomendación.",
    bullets: [
      "Gerencia estratégica fraccionada",
      "Gestión integral de proyectos",
      "Implementación tecnológica",
      "Seguimiento estructurado de hitos",
    ],
  },
];

const methodologySteps = [
  {
    n: "01",
    title: "Diagnóstico Estratégico",
    description: "Evaluamos estructura, capacidades y oportunidades reales de crecimiento.",
  },
  {
    n: "02",
    title: "Diseño de Roadmap Ejecutable",
    description: "Definimos prioridades, plan de acción y métricas claras de éxito.",
  },
  {
    n: "03",
    title: "Implementación Acompañada",
    description: "Convertimos estrategia en proyectos accionables con responsables y plazos definidos.",
  },
  {
    n: "04",
    title: "Medición y Optimización Continua",
    description: "Monitoreamos resultados, medimos impacto y ajustamos con disciplina.",
  },
];

const metrics = [
  { value: "+40%", label: "Más ingresos digitales", context: "Proyectos ecommerce" },
  { value: "3×", label: "Más rápido al mercado", context: "Transformación digital" },
  { value: "−30%", label: "Reducción de costos operativos", context: "Optimización de procesos" },
  { value: "17+", label: "Años ejecutando en empresas reales", context: "Tech · Retail · FMCG" },
];


const CALENDAR_URL = "https://calendar.app.google/XVQkhQErAWRvoX479";

/* ─── page ───────────────────────────────────────────────────────── */

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const heroRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    const onClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClickOutside); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  function goto(href: string) {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Campos requeridos", description: "Completa nombre, email y mensaje.", variant: "destructive" });
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 1300));
    setSending(false);
    setForm({ name: "", email: "", company: "", message: "" });
    toast({ title: "Mensaje enviado", description: "Nos pondremos en contacto muy pronto." });
  }

  return (
    <div className="min-h-screen bg-white text-stone-900 overflow-x-hidden selection:bg-stone-900 selection:text-white pt-16 lg:pt-20">

      {/* ── NAVBAR ──────────────────────────────────────────────────── */}
      <header ref={headerRef} className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "bg-white border-b-2 border-[#118DEF]" : "bg-[#118DEF] border-b border-[#0f7fd4]/50"}`}>
        <div className="max-w-7xl mx-auto w-full px-8 lg:px-14 flex items-center justify-between h-16 lg:h-20">
          <button
            onClick={() => goto("#hero")}
            className="select-none bg-transparent border-0 outline-none p-0 cursor-pointer"
            data-testid="link-logo"
          >
            <img
              src={scrolled ? logoScrolled : logoTop}
              alt="BELLI"
              className="h-7 lg:h-8 w-auto block"
            />
          </button>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => goto(link.href)}
                className={`relative text-[0.78rem] font-medium tracking-wide group transition-colors duration-300 ${scrolled ? "text-stone-600" : "text-white/80"}`}
                data-testid={`link-nav-${link.href}`}
              >
                <span className={`transition-colors duration-200 ${scrolled ? "group-hover:text-stone-900" : "group-hover:text-white"}`}>{link.label}</span>
                <span className={`absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300 ease-out ${scrolled ? "bg-[#118DEF]" : "bg-white"}`} />
              </button>
            ))}
          </nav>

          <div className="hidden lg:block">
            <CtaLink />
          </div>

          <button
            className={`lg:hidden p-1 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded ${scrolled ? "text-stone-700" : "text-white"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              id="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease }}
              className="lg:hidden overflow-hidden bg-white shadow-lg border-t border-stone-100"
            >
              <div className="px-8 pt-5 pb-8 flex flex-col">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => goto(link.href)}
                    className="text-[0.95rem] text-stone-600 font-normal text-left tracking-wide py-3.5 border-b border-stone-100 hover:text-stone-900 transition-colors duration-150 focus-visible:outline-none focus-visible:text-stone-900"
                    data-testid={`link-mobile-${link.href}`}
                  >
                    {link.label}
                  </button>
                ))}
                <div className="mt-6 pt-6 border-t border-stone-200">
                  <CtaLink full />
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* ── MOBILE OVERLAY ──────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-stone-900/50 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <main id="main-content">

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section id="hero" ref={heroRef} className="min-h-[75vh] flex items-center relative overflow-hidden bg-white">
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            style={{ y: heroY }}
            className="absolute -top-64 -right-64 w-[700px] h-[700px] rounded-full bg-stone-50/30"
          />
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 68% 38%, rgba(17,141,239,0.08) 0%, transparent 62%)" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-8 lg:px-14 w-full relative z-10 py-12 lg:py-10">
          <Reveal>
            <Eyebrow>Consultoría estratégica en Latinoamérica</Eyebrow>

            <motion.h1
              variants={fadeUp}
              className="font-serif font-bold text-stone-900 leading-[0.95] tracking-[-0.03em] max-w-4xl"
              style={{ fontSize: "clamp(2.4rem, 6vw, 5.6rem)" }}
            >
              <span className="sr-only">Consultoría estratégica especializada en crecimiento y ecommerce para empresas medianas en Latinoamérica — </span>
              <span className="block">Estrategia que se{" "}
                <em style={{ color: "#b5afa8", fontStyle: "italic" }}>ejecuta.</em>
              </span>
              <span className="block">Crecimiento que se{" "}
                <em style={{ color: "#b5afa8", fontStyle: "italic" }}>estructura.</em>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-8 text-stone-400 max-w-sm leading-[1.8] font-normal text-[0.9rem]"
            >
              Ayudamos a empresas en expansión a estructurar su crecimiento, optimizar su ecommerce
              y profesionalizar su estrategia comercial con un enfoque ejecutable y medible.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-14">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <CtaLink data-testid="button-hero-primary" />
                <button
                  onClick={() => goto("#metodologia")}
                  className="group relative text-[0.72rem] font-medium tracking-[0.18em] uppercase text-stone-400 hover:text-stone-700 transition-colors duration-200"
                  data-testid="button-hero-secondary"
                >
                  Ver Metodología
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#118DEF] group-hover:w-full transition-all duration-300 ease-out" />
                </button>
              </div>
              <p className="mt-5 text-[0.68rem] text-stone-300 tracking-wide">
                Sesión estratégica de 30 minutos. Sin costo.
              </p>
            </motion.div>
          </Reveal>

        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          aria-hidden
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
            className="w-px h-11 bg-gradient-to-b from-stone-300/60 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── PAIN POINTS ─────────────────────────────────────────────── */}
      <section className={`bg-[#faf9f7] py-12 lg:py-16 ${DIVIDER}`}>
        <div className="max-w-5xl mx-auto px-8 lg:px-14">
          <FadeUp>
            <Eyebrow>El problema</Eyebrow>
            <h2
              className="font-serif font-bold text-stone-900 tracking-tight leading-[1.05] mb-10"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              Empresas en crecimiento… pero sin estructura
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-[0.88rem] text-stone-500 leading-[1.8]">
              <p>
                Muchas empresas en crecimiento en Latinoamérica logran avanzar, pero sin los sistemas ni la estructura que ese crecimiento exige. Las decisiones se toman de forma reactiva, los equipos operan sin foco estratégico y los recursos se dispersan sin prioridad clara.
              </p>
              <p>
                El canal digital crece en volumen pero no en rentabilidad. Sin una consultoría ecommerce con enfoque estructurado, la optimización de conversión no ocurre, los márgenes se erosionan y los canales funcionan como silos sin integración comercial real.
              </p>
              <p>
                La presión operativa desplaza a la estrategia ejecutable. No hay tiempo para diseñar, medir ni ajustar. Las oportunidades de negocio se pierden no por falta de ambición, sino por falta de estructura y acompañamiento real en la ejecución.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────────── */}
      <section id="servicios" className={`scroll-mt-16 bg-white py-12 lg:py-16 ${DIVIDER}`}>
        <div className="max-w-7xl mx-auto px-8 lg:px-14">

          <Reveal>
            <Eyebrow accent>Nuestras Prácticas Estratégicas</Eyebrow>
            <motion.h2
              variants={fadeUp}
              className="font-serif font-bold text-stone-900 tracking-tight leading-[0.95] mb-6"
              style={{ fontSize: "clamp(3.5rem, 7vw, 6.5rem)" }}
            >
              Consultoría estratégica<br />
              <em style={{ color: "#b5afa8", fontStyle: "italic" }}>ejecutable.</em>
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-3 h-0.5 w-12 bg-[#118DEF] rounded-full" />
            <motion.p variants={fadeUp} className="mt-4 text-stone-400 text-[0.88rem] leading-[1.75] font-normal max-w-sm">
              Cuatro prácticas diseñadas para estructurar crecimiento con disciplina y resultados medibles.
            </motion.p>
          </Reveal>

          <div className="mt-8 border-t border-stone-200/60 grid grid-cols-1 lg:grid-cols-2">
            {services.map((s, i) => {
              const borderClass = [
                i === 0 ? "border-b border-stone-200/60 lg:border-r" : "",
                i === 1 ? "border-b border-stone-200/60" : "",
                i === 2 ? "border-b border-stone-200/60 lg:border-b-0 lg:border-r" : "",
              ].join(" ");
              const padClass = i % 2 === 0
                ? "pt-7 pb-7 lg:pt-9 lg:pb-9 lg:pr-10"
                : "pt-7 pb-7 lg:pt-9 lg:pb-9 lg:pl-10";
              return (
                <FadeUp key={s.n} delay={i * 0.09} className={`${borderClass} ${padClass}`} data-testid={`card-service-${i}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="relative inline-block">
                      <div aria-hidden className="absolute -inset-y-1.5 -inset-x-2.5 bg-[#ede8e0]/65" />
                      <span className="relative font-serif text-[0.68rem] font-bold tracking-[0.22em] text-stone-500">
                        {s.n}
                      </span>
                    </div>
                  </div>
                  <p className="text-[0.6rem] font-bold tracking-[0.32em] uppercase text-stone-400 mb-3">
                    {s.title}
                  </p>
                  <h3 className="font-serif text-[1.15rem] lg:text-[1.25rem] font-bold text-stone-900 leading-snug mb-5">
                    {s.description}
                  </h3>
                  <ul className="space-y-2.5 border-t border-stone-100 pt-4">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <span className="mt-[3px] w-1.5 h-1.5 rounded-full bg-[#118DEF] flex-shrink-0" />
                        <span className="text-[0.82rem] text-stone-500 font-normal leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COLLABORATION MODELS ─────────────────────────────────────── */}
      <section id="modelos" className={`scroll-mt-16 bg-white py-12 lg:py-16 ${DIVIDER}`}>
        <div className="max-w-7xl mx-auto px-8 lg:px-14">

          <Reveal>
            <Eyebrow accent>Modelos de Colaboración</Eyebrow>
            <motion.h2
              variants={fadeUp}
              className="font-serif font-bold text-stone-900 tracking-tight leading-[0.95] mb-6"
              style={{ fontSize: "clamp(3.5rem, 7vw, 6.5rem)" }}
            >
              Liderazgo Estratégico<br />
              <em style={{ color: "#b5afa8", fontStyle: "italic" }}>Integrado.</em>
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-3 h-0.5 w-12 bg-[#118DEF] rounded-full" />

            <motion.div variants={fadeUp} className="mt-8 space-y-5 text-[0.9rem] text-stone-400 leading-[1.75] font-normal max-w-2xl">
              <p>
                Algunas organizaciones necesitan claridad estratégica. Otras requieren ejecución disciplinada. Y algunas necesitan ambas cosas, integradas en su operación.
              </p>
              <p>
                En BELLI operamos bajo un modelo de liderazgo estratégico integrado (fractional), incorporando perfiles senior en business development, gestión estratégica, crecimiento digital y ejecución operativa.
              </p>
              <p>
                Esto permite acceder a liderazgo ejecutivo de alto nivel sin sobredimensionar estructura ni asumir costos permanentes de un equipo C-Level completo.
              </p>
            </motion.div>
          </Reveal>

          <div className="mt-12 border-t border-stone-200/60 grid grid-cols-1 lg:grid-cols-3">
            {[
              {
                title: "Dirección Estratégica",
                text: "Definición de rumbo, estructura organizacional y toma de decisiones con visión ejecutiva.",
              },
              {
                title: "Liderazgo de Crecimiento",
                text: "Expansión comercial, ecommerce y desarrollo de nuevas líneas de negocio.",
              },
              {
                title: "Ejecución Operativa",
                text: "Implementación, seguimiento de KPIs y disciplina de ejecución en proyectos estratégicos.",
              },
            ].map((col, i) => (
              <FadeUp
                key={col.title}
                delay={i * 0.1}
                className={[
                  "pt-8 pb-8",
                  i < 2 ? "border-b lg:border-b-0 lg:border-r border-stone-100" : "",
                  i > 0 ? "lg:pl-10" : "",
                  i < 2 ? "lg:pr-10" : "",
                ].join(" ")}
                data-testid={`col-model-${i}`}
              >
                <h3 className="font-serif text-[1.05rem] lg:text-[1.15rem] font-bold text-stone-900 leading-snug mb-3">
                  {col.title}
                </h3>
                <p className="text-[0.84rem] text-stone-400 leading-[1.75] font-normal">
                  {col.text}
                </p>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.35} className="mt-10 border-l-2 border-[#118DEF] pl-6 max-w-2xl">
            <p className="text-[0.92rem] text-stone-800 italic leading-[1.75]">
              Acceso a liderazgo senior, estructura sin fricción y crecimiento con control.
            </p>
          </FadeUp>

          <FadeUp delay={0.45} className="mt-14 flex flex-col items-center text-center">
            <div className="h-0.5 w-12 bg-[#118DEF] rounded-full mb-10" />
            <p className="text-[0.6rem] font-semibold tracking-[0.28em] uppercase text-stone-400 mb-4">
              Evaluación estratégica personalizada
            </p>
            <p className="text-[0.95rem] font-medium text-stone-800 mb-8 max-w-md leading-[1.75]">
              ¿Su organización necesita liderazgo ejecutivo sin sobredimensionar estructura?
            </p>
            <a
              href={`${CALENDAR_URL}?utm_source=belli&utm_medium=website&utm_campaign=fractional_leadership&utm_content=modelo_integrado_cta`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-stone-900 text-white text-[0.75rem] font-semibold tracking-[0.2em] uppercase px-8 py-4 rounded-md hover:opacity-90 transition-opacity duration-200"
              data-testid="button-modelos-cta"
            >
              Solicitar evaluación ejecutiva
              <ArrowRight size={13} />
            </a>
            <p className="mt-4 text-[0.7rem] text-stone-400 tracking-wide">
              Sesión privada de 30 minutos.
            </p>
          </FadeUp>

        </div>
      </section>

      {/* ── METHODOLOGY ──────────────────────────────────────────────── */}
      <section id="metodologia" className={`scroll-mt-16 bg-[#faf9f7] py-12 lg:py-16 relative overflow-hidden ${DIVIDER}`}>
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 18% 75%, rgba(17,141,239,0.07) 0%, transparent 55%)" }} />
        <div className="max-w-7xl mx-auto px-8 lg:px-14 relative">

          <Reveal>
            <Eyebrow accent>Enfoque Estructurado</Eyebrow>
            <motion.h2
              variants={fadeUp}
              className="font-serif font-bold text-stone-900 tracking-tight leading-[0.95] mb-6"
              style={{ fontSize: "clamp(3.5rem, 7vw, 6.5rem)" }}
            >
              Metodología de<br />
              <em style={{ color: "#b5afa8", fontStyle: "italic" }}>crecimiento estructurado.</em>
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-3 h-0.5 w-12 bg-[#118DEF] rounded-full" />
            <motion.p variants={fadeUp} className="mt-4 text-stone-400 max-w-sm text-[0.9rem] leading-[1.75] font-normal">
              Cuatro pasos que convierten diagnóstico en ejecución real y resultados medibles.
            </motion.p>
          </Reveal>

          <div className="mt-8 border-t border-stone-200/60 grid grid-cols-1 lg:grid-cols-4">
            {methodologySteps.map((step, i) => (
              <FadeUp
                key={step.n}
                delay={i * 0.1}
                className={[
                  "pt-6 pb-6",
                  i < 3 ? "border-b lg:border-b-0 lg:border-r border-stone-100" : "",
                  i > 0 ? "lg:pl-8" : "",
                  i < 3 ? "lg:pr-8" : "",
                ].join(" ")}
                data-testid={`card-methodology-${i}`}
              >
                <div className="relative inline-block mb-4">
                  <div aria-hidden className="absolute -inset-y-1.5 -inset-x-2.5 bg-[#ede8e0]/65" />
                  <span className="relative font-serif text-[0.7rem] font-bold tracking-[0.22em] text-[#118DEF]">
                    {step.n}
                  </span>
                </div>
                <h3 className="font-serif text-[1.1rem] lg:text-[1.2rem] font-bold text-stone-900 leading-snug mb-2 flex items-center gap-2">
                  {step.title}
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#118DEF] flex-shrink-0" />
                </h3>
                <p className="text-[0.84rem] text-stone-400 leading-[1.75] font-normal">
                  {step.description}
                </p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ─────────────────────────────────────────────── */}
      <section id="como-trabajamos" className={`scroll-mt-16 bg-white py-12 lg:py-16 ${DIVIDER}`}>
        <div className="max-w-7xl mx-auto px-8 lg:px-14">

          <Reveal>
            <Eyebrow>Modelos de trabajo</Eyebrow>
            <motion.h2
              variants={fadeUp}
              className="font-serif font-bold text-stone-900 tracking-tight leading-[0.95] max-w-2xl"
              style={{ fontSize: "clamp(3.5rem, 7vw, 6.5rem)" }}
            >
              Cómo trabajamos
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-3 h-0.5 w-12 bg-[#118DEF] rounded-full" />
            <motion.p variants={fadeUp} className="mt-7 text-stone-400 max-w-xs text-[0.9rem] leading-[1.75] font-normal">
              Sin retainers indefinidos.<br />Sin promesas vacías.
            </motion.p>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* A: Project */}
            <FadeUp delay={0.05}>
              <div
                className={`p-8 border border-stone-150 bg-white ${DIVIDER}`}
                data-testid="card-work-project"
              >
                <p className="text-[0.58rem] tracking-[0.26em] uppercase text-stone-300 font-semibold mb-5">
                  Modalidad A
                </p>
                <h3 className="font-serif text-[1.8rem] lg:text-[2.2rem] font-bold text-stone-900 leading-[1.05] mb-6">
                  Consultoría<br />por proyecto
                </h3>
                <p className="text-[0.88rem] text-stone-400 leading-[1.75] font-normal mb-10 max-w-xs">
                  Alcance acotado, entregables concretos, precio pactado desde el inicio. Sin letra pequeña.
                </p>
                <div className="space-y-5 border-t border-stone-100 pt-8">
                  {[
                    ["Diagnóstico en 48 h", "Entendemos tu negocio rápido"],
                    ["Fechas inamovibles", "No estimadas, pactadas"],
                    ["Precio fijo", "Sin sorpresas ni horas extra"],
                    ["Capacidad senior", "Sin el costo fijo de una contratación"],
                  ].map(([title, desc]) => (
                    <div key={title} className="flex items-baseline gap-4">
                      <span className="text-[0.78rem] font-semibold text-stone-700 min-w-[9rem]">{title}</span>
                      <span className="text-[0.78rem] text-stone-400 font-normal">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* B: Recurring */}
            <FadeUp delay={0.15}>
              <div
                className="p-8 bg-stone-950"
                data-testid="card-work-recurring"
              >
                <p className="text-[0.58rem] tracking-[0.26em] uppercase text-stone-600 font-semibold mb-5">
                  Modalidad B
                </p>
                <h3 className="font-serif text-[1.8rem] lg:text-[2.2rem] font-bold text-white leading-[1.05] mb-6">
                  Asesoría<br />recurrente
                </h3>
                <p className="text-[0.88rem] text-stone-500 leading-[1.75] font-normal mb-10 max-w-xs">
                  Tu aliado estratégico todos los meses. Sin contratar un director de área a tiempo completo.
                </p>
                <div className="space-y-5 border-t border-stone-800 pt-8">
                  {[
                    ["Agenda semanal", "Reunión estratégica fija, sin cancelaciones"],
                    ["Acceso directo", "Respuesta en horas, no en días"],
                    ["KPIs activos", "Monitoreados con ajustes en tiempo real"],
                    ["Nivel C-level", "A una fracción del costo de contratarlo"],
                  ].map(([title, desc]) => (
                    <div key={title} className="flex items-baseline gap-4">
                      <span className="text-[0.78rem] font-semibold text-stone-300 min-w-[9rem]">{title}</span>
                      <span className="text-[0.78rem] text-stone-500 font-normal">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.3} className="mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-stone-100">
              <p className="text-[0.82rem] text-stone-400 leading-[1.8] font-normal max-w-md">
                Ambos modelos te dan capacidad senior sin carga laboral. El conocimiento queda en tu empresa.
              </p>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.75rem] font-semibold tracking-[0.18em] uppercase text-stone-700 hover:text-stone-900 transition-colors duration-200 flex-shrink-0"
                data-testid="button-work-cta"
              >
                Conversemos →
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── RESULTS ─────────────────────────────────────────────────── */}
      <section id="resultados" className={`scroll-mt-16 bg-[#faf9f7] py-12 lg:py-16 ${DIVIDER}`}>
        <div className="max-w-7xl mx-auto px-8 lg:px-14">

          <Reveal>
            <Eyebrow accent>Impacto medible</Eyebrow>
            <motion.h2
              variants={fadeUp}
              className="font-serif font-bold text-stone-900 tracking-tight leading-[0.95] mb-6"
              style={{ fontSize: "clamp(3.5rem, 7vw, 6.5rem)" }}
            >
              Resultados
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-3 h-0.5 w-12 bg-[#118DEF] rounded-full" />
          </Reveal>

          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4">
            {metrics.map((m, i) => (
              <FadeUp
                key={m.value}
                delay={i * 0.1}
                className={`py-8 ${i > 0 ? "lg:border-l lg:border-stone-100 lg:pl-12" : ""} ${i === 2 ? "border-l border-stone-100 pl-6 lg:pl-12" : ""} ${i < 2 ? "pr-6 lg:pr-12" : "pr-0"}`}
                data-testid={`tile-metric-${i}`}
              >
                <div className="border-l-2 border-[#118DEF] pl-4">
                  <p
                    className="font-serif font-bold text-stone-950 leading-none mb-5"
                    style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)" }}
                  >
                    {m.value}
                  </p>
                  <p className="text-[0.82rem] font-medium text-stone-700 leading-snug mb-1.5">{m.label}</p>
                  <p className="text-[0.68rem] text-stone-400 tracking-wide uppercase">{m.context}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.4} className="mt-8">
            <p className="text-[0.68rem] text-stone-300 tracking-wide border-t border-stone-100 pt-8" data-testid="text-disclaimer">
              * Ejemplos referenciales basados en proyectos realizados. Los resultados varían según contexto y sector.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────────────── */}
      <section id="sobre-mi" className={`scroll-mt-16 bg-white py-12 lg:py-16 ${DIVIDER}`}>
        <div className="max-w-5xl mx-auto px-8 lg:px-14">
          <Reveal>
            <Eyebrow accent>La Firma</Eyebrow>
            <motion.h2
              variants={fadeUp}
              className="font-serif font-bold text-stone-900 tracking-tight leading-[0.95] mb-6"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
            >
              Liderazgo con experiencia<br />
              <em style={{ color: "#b5afa8", fontStyle: "italic" }}>real en estrategia y ejecución.</em>
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-3 h-0.5 w-12 bg-[#118DEF] rounded-full" />

            <motion.div variants={fadeUp} className="mt-8 space-y-6 text-[0.9rem] text-stone-400 leading-[1.75] font-normal max-w-2xl">
              <p>
                BELLI es una firma estratégica boutique especializada en estructurar crecimiento y ejecutar transformación para empresas medianas en Latinoamérica. No trabajamos con recomendaciones genéricas — trabajamos con disciplina de ejecución real.
              </p>
              <p>
                Nuestro liderazgo combina más de 17 años de experiencia corporativa y más de una década liderando ecommerce, business development y estrategia comercial en sectores de alta competencia. Formación internacional con MBA en ESCP Business School (Londres y París) y perspectiva global aplicada al contexto latinoamericano.
              </p>
              <p>
                Trabajamos con CEOs y gerentes que buscan estructura, foco estratégico y resultados sostenibles — no consultorías que desaparecen después del diagnóstico.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 border-l-2 border-[#118DEF] pl-6 max-w-2xl">
              <p className="text-[0.92rem] text-stone-800 italic leading-[1.75]">
                "Estrategia sin ejecución es intención. Ejecución sin estructura es desgaste."
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-12">
              <CtaLink />
              <p className="mt-4 text-[0.7rem] text-stone-300 tracking-wide">
                Sesión estratégica de 30 minutos. Sin costo.
              </p>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ── MID CTA ─────────────────────────────────────────────────── */}
      <section className="bg-stone-950 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-8 lg:px-14">
          <FadeUp>
            <p className="text-[0.6rem] font-semibold tracking-[0.3em] uppercase text-stone-600 mb-5">
              Siguiente paso
            </p>
            <h2
              className="font-serif font-bold text-white leading-[1.0] tracking-[-0.025em] max-w-4xl"
              style={{ fontSize: "clamp(2.8rem, 6vw, 6rem)" }}
            >
              ¿Listo para estructurar el siguiente nivel de crecimiento?
            </h2>
            <p className="mt-8 text-stone-500 text-[0.9rem] leading-[1.8] font-normal max-w-xs">
              Agende una sesión estratégica y evaluemos su estructura, foco y oportunidades.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-6">
              <motion.a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2.5 bg-white text-stone-900 text-[0.74rem] font-semibold tracking-[0.18em] uppercase px-8 py-4 rounded-md cursor-pointer group self-start"
                data-testid="button-midcta-primary"
              >
                Agendar sesión estratégica
                <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </motion.a>
            </div>
            <p className="mt-6 text-[0.67rem] text-stone-700 tracking-wide">
              Sesión estratégica de 30 minutos. Sin costo.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────── */}
      <section id="contacto" className={`scroll-mt-16 bg-[#faf9f7] py-12 lg:py-16 ${DIVIDER}`}>
        <div className="max-w-7xl mx-auto px-8 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">

            <Reveal>
              <Eyebrow accent>Contacto</Eyebrow>
              <motion.h2
                variants={fadeUp}
                className="font-serif font-bold text-stone-900 tracking-tight leading-[0.95] mb-6"
                style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
              >
                Empecemos<br />a trabajar.
              </motion.h2>
              <motion.div variants={fadeUp} className="mt-3 h-0.5 w-12 bg-[#118DEF] rounded-full" />
              <motion.p variants={fadeUp} className="mt-7 text-stone-400 text-[0.9rem] leading-[1.75] font-normal max-w-xs">
                Si tu empresa necesita moverse más rápido, hablemos. En 30 minutos sabrás si podemos ayudarte.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 space-y-5 border-t border-stone-200/60 pt-8">
                <div>
                  <p className="text-[0.58rem] font-semibold tracking-[0.26em] uppercase text-stone-400 mb-2">Email</p>
                  <a
                    href="mailto:hola@belli.com.pe"
                    className="text-[0.95rem] font-normal text-stone-700 hover:text-stone-900 transition-colors duration-200"
                    data-testid="text-contact-email"
                  >
                    hola@belli.com.pe
                  </a>
                </div>
                <div>
                  <p className="text-[0.58rem] font-semibold tracking-[0.26em] uppercase text-stone-400 mb-2">WhatsApp</p>
                  <a
                    href="https://wa.me/51966421147"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.95rem] font-normal text-stone-700 hover:text-stone-900 transition-colors duration-200"
                    data-testid="text-contact-whatsapp"
                  >
                    +51 966 421 147
                  </a>
                </div>
              </motion.div>
            </Reveal>

            <FadeUp delay={0.1}>
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-contact">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField label="Nombre" required>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Tu nombre"
                      className="w-full bg-white border-b border-stone-200 pb-3 pt-1 text-[0.88rem] text-stone-900 placeholder:text-stone-300 outline-none focus:border-[#118DEF] transition-colors duration-200"
                      data-testid="input-contact-name"
                    />
                  </FormField>
                  <FormField label="Email" required>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="tu@empresa.com"
                      className="w-full bg-white border-b border-stone-200 pb-3 pt-1 text-[0.88rem] text-stone-900 placeholder:text-stone-300 outline-none focus:border-[#118DEF] transition-colors duration-200"
                      data-testid="input-contact-email"
                    />
                  </FormField>
                </div>

                <FormField label="Empresa">
                  <input
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Nombre de tu empresa"
                    className="w-full bg-white border-b border-stone-200 pb-3 pt-1 text-[0.88rem] text-stone-900 placeholder:text-stone-300 outline-none focus:border-[#118DEF] transition-colors duration-200"
                    data-testid="input-contact-company"
                  />
                </FormField>

                <FormField label="Mensaje" required>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Cuéntanos sobre tu proyecto o desafío…"
                    rows={5}
                    className="w-full bg-white border-b border-stone-200 pb-3 pt-1 text-[0.88rem] text-stone-900 placeholder:text-stone-300 outline-none focus:border-[#118DEF] transition-colors duration-200 resize-none"
                    data-testid="textarea-contact-message"
                  />
                </FormField>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={{ scale: 1.015, boxShadow: "0 8px 28px rgba(0,0,0,0.18)" }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.2, ease }}
                    className="bg-stone-900 text-white text-[0.75rem] font-semibold tracking-[0.2em] uppercase px-8 py-4 rounded-md flex items-center gap-3 disabled:opacity-50 group"
                    data-testid="button-contact-submit"
                  >
                    {sending ? "Enviando…" : "Enviar mensaje"}
                    {!sending && <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />}
                  </motion.button>
                  <motion.a
                    href="https://wa.me/51966421147"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.2, ease }}
                    className="border border-stone-300 text-stone-700 hover:border-stone-900 hover:text-stone-900 text-[0.75rem] font-semibold tracking-[0.2em] uppercase px-8 py-4 rounded-md flex items-center justify-center gap-3 transition-colors duration-200 group"
                    data-testid="button-contact-whatsapp"
                  >
                    Escribir por WhatsApp
                    <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </motion.a>
                </div>
                <p className="text-[0.68rem] text-stone-400 tracking-wide mt-4">
                  Respondemos en un plazo máximo de 24 horas hábiles.
                </p>
              </form>
            </FadeUp>
          </div>
        </div>
      </section>

      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer className="bg-stone-950 py-14 lg:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-8 lg:px-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 pb-10 border-b border-stone-800">
            <p className="font-serif text-lg font-bold tracking-[0.18em] text-white" data-testid="text-footer-logo">
              BELLI
            </p>
            <nav className="flex flex-wrap gap-x-9 gap-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => goto(link.href)}
                  className="text-[0.7rem] tracking-[0.18em] uppercase text-stone-600 hover:text-stone-300 transition-colors duration-200"
                  data-testid={`link-footer-${link.href}`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            <p className="text-[0.68rem] text-stone-700">© 2026 BELLI — Business Enhancer. Todos los derechos reservados.</p>
            <p className="text-[0.68rem] text-stone-800 tracking-wide">Consultoría · Estrategia · Ejecución Digital</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── sub-components ─────────────────────────────────────────────── */

function CtaLink({ full, "data-testid": testId }: { full?: boolean; "data-testid"?: string }) {
  return (
    <motion.a
      href={CALENDAR_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={testId ?? "button-cta"}
      whileHover={{ scale: 1.02, boxShadow: "0 8px 28px rgba(0,0,0,0.2)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-flex items-center gap-2.5 bg-stone-900 text-white text-[0.74rem] font-semibold tracking-[0.18em] uppercase px-7 py-3.5 rounded-md cursor-pointer group ${full ? "w-full justify-center" : ""}`}
    >
      Agendar sesión estratégica
      <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
    </motion.a>
  );
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-[0.6rem] font-semibold tracking-[0.22em] uppercase text-stone-400">
        {label}{required && <span className="text-stone-300 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
