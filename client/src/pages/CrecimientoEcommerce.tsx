import logoTop from "../assets/belli_logo_white_transparent.png";
import logoScrolled from "../assets/belli_logo_blue_cropped_transparent.png";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link } from "wouter";

/* ─── constants ──────────────────────────────────────────────────── */

const CALENDAR_URL = "https://calendar.app.google/XVQkhQErAWRvoX479";
const DIVIDER = "border-t border-stone-200";
const ease = [0.22, 1, 0.36, 1] as const;

/* ─── animation ──────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

/* ─── primitives ─────────────────────────────────────────────────── */

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-64px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} className={className}>
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
        <p className="relative text-[0.62rem] font-semibold tracking-[0.28em] uppercase text-stone-500">{children}</p>
      </motion.div>
    );
  }
  return (
    <motion.p variants={fadeUp} className="text-[0.62rem] font-semibold tracking-[0.28em] uppercase text-stone-400 mb-6">
      {children}
    </motion.p>
  );
}

function CtaLink({ full }: { full?: boolean }) {
  return (
    <motion.a
      href={CALENDAR_URL}
      target="_blank"
      rel="noopener noreferrer"
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

/* ─── nav links ──────────────────────────────────────────────────── */

const navLinks = [
  { label: "Problema", href: "#problema" },
  { label: "Servicios", href: "#servicios" },
  { label: "Resultados", href: "#resultados" },
  { label: "Metodología", href: "#metodologia" },
  { label: "Contacto", href: "#contacto" },
];

/* ─── page data ──────────────────────────────────────────────────── */

const services = [
  {
    n: "01",
    title: "Estrategia de Crecimiento Empresarial",
    description: "Diseñamos el modelo de crecimiento correcto para su etapa y mercado.",
    bullets: ["Diagnóstico de oportunidades", "Expansión de canales", "Arquitectura comercial", "Nuevos modelos de ingreso"],
  },
  {
    n: "02",
    title: "Optimización Ecommerce B2C",
    description: "Convertimos tráfico en ventas con optimización de conversión sistemática.",
    bullets: ["Auditoría de funnel", "Optimización de conversión", "Estrategia omnicanal D2C", "Gestión de márgenes y surtido"],
  },
  {
    n: "03",
    title: "Business Development",
    description: "Estructuramos desarrollo comercial con foco, métricas y ejecución disciplinada.",
    bullets: ["Planeamiento estratégico", "OKRs y KPIs ejecutables", "Desarrollo de nuevos mercados", "Alianzas estratégicas"],
  },
  {
    n: "04",
    title: "Implementación Acompañada",
    description: "No solo recomendamos — estamos en la ejecución junto al equipo.",
    bullets: ["Gerencia estratégica fraccionada", "Gestión de proyectos", "Implementación tecnológica", "Seguimiento de hitos"],
  },
];

const methodologySteps = [
  { n: "01", title: "Diagnóstico Estratégico", description: "Evaluamos estructura, canales, márgenes y oportunidades reales de crecimiento." },
  { n: "02", title: "Diseño de Roadmap Ejecutable", description: "Definimos prioridades claras, plan de acción y métricas de éxito por etapa." },
  { n: "03", title: "Implementación Acompañada", description: "Ejecutamos junto al equipo con responsables, plazos y disciplina de seguimiento." },
  { n: "04", title: "Medición y Optimización Continua", description: "Medimos impacto, ajustamos con datos y aseguramos crecimiento sostenible." },
];

const results = [
  { metric: "+40%", label: "Incremento en ingresos digitales", detail: "Proyectos ecommerce B2C" },
  { metric: "−25%", label: "Reducción del costo de adquisición (CAC)", detail: "Optimización de funnel" },
  { metric: "3×", label: "Más rápido al mercado", detail: "Transformación digital" },
  { metric: "+60%", label: "Mejora en rentabilidad por canal", detail: "Estrategia de márgenes y surtido" },
];

/* ─── page ───────────────────────────────────────────────────────── */

export default function CrecimientoEcommerce() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Consultoría de Crecimiento y Ecommerce B2C | Belli LATAM";

    const META_DESC = "Belli es una consultoría estratégica especializada en crecimiento empresarial y ecommerce B2C para empresas medianas en Latinoamérica. Estrategia ejecutable y resultados medibles. Agenda tu sesión estratégica.";
    let metaTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = metaTag?.getAttribute("content") ?? "";
    if (metaTag) {
      metaTag.setAttribute("content", META_DESC);
    } else {
      metaTag = document.createElement("meta");
      metaTag.name = "description";
      metaTag.content = META_DESC;
      document.head.appendChild(metaTag);
    }

    return () => {
      document.title = prevTitle;
      if (metaTag) metaTag.setAttribute("content", prevDesc);
    };
  }, []);

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

  return (
    <div className="min-h-screen bg-white text-stone-900 overflow-x-hidden selection:bg-stone-900 selection:text-white pt-16 lg:pt-20">

      {/* ── NAVBAR ──────────────────────────────────────────────────── */}
      <header ref={headerRef} className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "bg-white border-b-2 border-[#118DEF]" : "bg-[#118DEF] border-b border-[#0f7fd4]/50"}`}>
        <div className="max-w-7xl mx-auto w-full px-8 lg:px-14 flex items-center justify-between h-16 lg:h-20">

          <Link href="/" aria-label="Ir a inicio — Belli">
            <img
              src={scrolled ? logoScrolled : logoTop}
              alt="Belli — Consultoría estratégica en Latinoamérica"
              className={`w-auto block ${scrolled ? "h-9 lg:h-10" : "h-7 lg:h-8"}`}
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-10" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => goto(link.href)}
                aria-label={`Ir a ${link.label}`}
                className={`relative text-[0.78rem] font-medium tracking-wide group transition-colors duration-300 ${scrolled ? "text-stone-600" : "text-white/80"}`}
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
            aria-controls="mobile-nav-lp"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              id="mobile-nav-lp"
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

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section id="hero" className="min-h-[72vh] flex items-center relative overflow-hidden bg-white">
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 68% 38%, rgba(17,141,239,0.07) 0%, transparent 60%)" }} />
          </div>

          <div className="max-w-7xl mx-auto px-8 lg:px-14 w-full relative z-10 py-16 lg:py-14">
            <Reveal>
              <motion.p variants={fadeUp} className="text-[0.62rem] font-semibold tracking-[0.28em] uppercase text-stone-400 mb-6">
                Consultoría estratégica en Latinoamérica
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="font-serif font-bold text-stone-900 tracking-[-0.03em] max-w-5xl"
                style={{ fontSize: "clamp(2rem, 4.5vw, 4.2rem)", lineHeight: 1.05 }}
              >
                Consultoría estratégica de crecimiento empresarial con especialización en{" "}
                <em style={{ color: "#b5afa8", fontStyle: "italic" }}>ecommerce B2C</em>{" "}
                para empresas medianas en Latinoamérica
              </motion.h1>

              <motion.div variants={fadeUp} className="mt-3 h-0.5 w-12 bg-[#118DEF] rounded-full" />

              <motion.p variants={fadeUp} className="mt-8 text-stone-400 max-w-xl leading-[1.8] font-normal text-[0.95rem]">
                Ayudamos a empresas medianas en Latinoamérica a estructurar su crecimiento, escalar sus canales de ecommerce B2C y profesionalizar su estrategia comercial con una metodología ejecutable y orientada a resultados medibles.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <CtaLink />
                <button
                  onClick={() => goto("#metodologia")}
                  className="group relative text-[0.72rem] font-medium tracking-[0.18em] uppercase text-stone-400 hover:text-stone-700 transition-colors duration-200"
                >
                  Ver metodología
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#118DEF] group-hover:w-full transition-all duration-300 ease-out" />
                </button>
              </motion.div>

              <motion.p variants={fadeUp} className="mt-5 text-[0.68rem] text-stone-300 tracking-wide">
                Sesión estratégica de 30 minutos. Sin costo.
              </motion.p>
            </Reveal>
          </div>
        </section>

        {/* ── PROBLEMA ──────────────────────────────────────────────── */}
        <section id="problema" className={`scroll-mt-20 bg-[#faf9f7] py-14 lg:py-20 ${DIVIDER}`}>
          <div className="max-w-5xl mx-auto px-8 lg:px-14">
            <FadeUp>
              <p className="text-[0.62rem] font-semibold tracking-[0.28em] uppercase text-stone-400 mb-6">El desafío</p>
              <h2
                className="font-serif font-bold text-stone-900 tracking-tight leading-[1.05] mb-10"
                style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
              >
                El ecommerce no escala solo.<br />
                El crecimiento necesita estructura.
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-[0.9rem] text-stone-500 leading-[1.85]">
                <p>
                  Muchas empresas medianas en Latinoamérica logran crecimiento empresarial en ventas, pero sin los sistemas ni la estrategia ejecutable que ese crecimiento exige. Los canales digitales crecen en volumen, pero no en rentabilidad. La consultoría ecommerce sin foco en conversión no genera impacto real.
                </p>
                <p>
                  El ecommerce B2C escala cuando existe una arquitectura comercial clara: producto correcto, canal correcto, precio correcto y optimización de conversión sistemática. Sin esto, el crecimiento se erosiona con costos de adquisición altos, márgenes bajos y clientes que no regresan.
                </p>
                <p>
                  La presión operativa impide diseñar, medir y ajustar. Los equipos trabajan de forma reactiva, los recursos se dispersan y las oportunidades se pierden. No por falta de ambición, sino por falta de estructura estratégica y acompañamiento real en la ejecución.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── SERVICIOS ─────────────────────────────────────────────── */}
        <section id="servicios" className={`scroll-mt-20 bg-white py-14 lg:py-20 ${DIVIDER}`}>
          <div className="max-w-7xl mx-auto px-8 lg:px-14">
            <Reveal>
              <Eyebrow accent>Nuestras Prácticas</Eyebrow>
              <motion.h2
                variants={fadeUp}
                className="font-serif font-bold text-stone-900 tracking-tight leading-[0.95] mb-6"
                style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
              >
                Crecimiento estructurado<br />
                <em style={{ color: "#b5afa8", fontStyle: "italic" }}>para empresas medianas.</em>
              </motion.h2>
              <motion.div variants={fadeUp} className="mt-3 h-0.5 w-12 bg-[#118DEF] rounded-full" />
              <motion.p variants={fadeUp} className="mt-5 text-stone-400 text-[0.9rem] leading-[1.75] font-normal max-w-md">
                Cuatro prácticas diseñadas para estructurar crecimiento empresarial y optimizar ecommerce con disciplina y resultados medibles.
              </motion.p>
            </Reveal>

            <div className="mt-10 border-t border-stone-200/60 grid grid-cols-1 lg:grid-cols-2">
              {services.map((s, i) => {
                const borderClass = [
                  i === 0 ? "border-b border-stone-200/60 lg:border-r" : "",
                  i === 1 ? "border-b border-stone-200/60" : "",
                  i === 2 ? "border-b border-stone-200/60 lg:border-b-0 lg:border-r" : "",
                ].join(" ");
                const padClass = i % 2 === 0 ? "pt-8 pb-8 lg:pt-10 lg:pb-10 lg:pr-10" : "pt-8 pb-8 lg:pt-10 lg:pb-10 lg:pl-10";
                return (
                  <FadeUp key={s.n} delay={i * 0.09} className={`${borderClass} ${padClass}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="relative inline-block">
                        <div aria-hidden className="absolute -inset-y-1.5 -inset-x-2.5 bg-[#ede8e0]/65" />
                        <span className="relative font-serif text-[0.68rem] font-bold tracking-[0.22em] text-stone-500">{s.n}</span>
                      </div>
                    </div>
                    <h3 className="font-serif text-[1.15rem] lg:text-[1.25rem] font-bold text-stone-900 leading-snug mb-3">
                      {s.title}
                    </h3>
                    <p className="text-[0.86rem] text-stone-400 leading-[1.7] mb-5">{s.description}</p>
                    <ul className="space-y-2.5 border-t border-stone-100 pt-4">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3">
                          <span className="mt-[4px] w-1.5 h-1.5 rounded-full bg-[#118DEF] flex-shrink-0" />
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

        {/* ── RESULTADOS ────────────────────────────────────────────── */}
        <section id="resultados" className={`scroll-mt-20 bg-[#faf9f7] py-14 lg:py-20 ${DIVIDER}`}>
          <div className="max-w-7xl mx-auto px-8 lg:px-14">
            <Reveal>
              <Eyebrow accent>Impacto real</Eyebrow>
              <motion.h2
                variants={fadeUp}
                className="font-serif font-bold text-stone-900 tracking-tight leading-[0.95] mb-6"
                style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
              >
                Impacto esperado<br />
                <em style={{ color: "#b5afa8", fontStyle: "italic" }}>en empresas medianas.</em>
              </motion.h2>
              <motion.div variants={fadeUp} className="mt-3 h-0.5 w-12 bg-[#118DEF] rounded-full" />
              <motion.p variants={fadeUp} className="mt-5 text-stone-400 text-[0.9rem] leading-[1.75] max-w-md">
                Indicadores representativos de proyectos de crecimiento empresarial y optimización de ecommerce B2C.
              </motion.p>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-stone-200/60">
              {results.map((r, i) => (
                <FadeUp
                  key={r.metric}
                  delay={i * 0.1}
                  className={[
                    "pt-8 pb-8 border-l-2 border-[#118DEF] pl-6",
                    i < 3 ? "lg:border-r lg:border-r-stone-200/60 lg:pr-8" : "",
                    i > 0 ? "lg:pl-8" : "",
                    i < 2 ? "border-b border-stone-200/60 sm:border-b-0" : "",
                  ].join(" ")}
                >
                  <p className="font-serif text-[2.8rem] font-bold text-stone-900 leading-none tracking-[-0.04em]">{r.metric}</p>
                  <p className="mt-3 text-[0.84rem] text-stone-600 font-medium leading-snug">{r.label}</p>
                  <p className="mt-1.5 text-[0.72rem] text-stone-400 tracking-wide">{r.detail}</p>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.2} className="mt-12 bg-white border border-stone-200 p-8 max-w-3xl">
              <p className="text-[0.72rem] font-semibold tracking-[0.22em] uppercase text-stone-400 mb-5">Áreas de impacto</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
                {[
                  "Optimización de conversión en canales digitales",
                  "Reducción del costo de adquisición de clientes (CAC)",
                  "Mejora en rentabilidad y márgenes por canal",
                  "Escalabilidad comercial con estructura sostenible",
                  "Aceleración del time-to-market en nuevos proyectos",
                  "Profesionalización de la estrategia de ecommerce B2C",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-[#118DEF] flex-shrink-0" />
                    <span className="text-[0.84rem] text-stone-500 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </section>

        {/* ── METODOLOGÍA ───────────────────────────────────────────── */}
        <section id="metodologia" className={`scroll-mt-20 bg-white py-14 lg:py-20 relative overflow-hidden ${DIVIDER}`}>
          <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 18% 75%, rgba(17,141,239,0.06) 0%, transparent 55%)" }} />
          <div className="max-w-7xl mx-auto px-8 lg:px-14 relative">
            <Reveal>
              <Eyebrow accent>Enfoque Estructurado</Eyebrow>
              <motion.h2
                variants={fadeUp}
                className="font-serif font-bold text-stone-900 tracking-tight leading-[0.95] mb-6"
                style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
              >
                Metodología de<br />
                <em style={{ color: "#b5afa8", fontStyle: "italic" }}>crecimiento ejecutable.</em>
              </motion.h2>
              <motion.div variants={fadeUp} className="mt-3 h-0.5 w-12 bg-[#118DEF] rounded-full" />
              <motion.p variants={fadeUp} className="mt-5 text-stone-400 max-w-sm text-[0.9rem] leading-[1.75]">
                Cuatro pasos que convierten el diagnóstico en ejecución real y resultados medibles para empresas medianas.
              </motion.p>
            </Reveal>

            <ol className="mt-10 border-t border-stone-200/60 grid grid-cols-1 lg:grid-cols-4 list-none">
              {methodologySteps.map((step, i) => (
                <FadeUp
                  key={step.n}
                  delay={i * 0.1}
                  className={[
                    "pt-7 pb-7",
                    i < 3 ? "border-b lg:border-b-0 lg:border-r border-stone-100" : "",
                    i > 0 ? "lg:pl-8" : "",
                    i < 3 ? "lg:pr-8" : "",
                  ].join(" ")}
                >
                  <li>
                    <div className="relative inline-block mb-4">
                      <div aria-hidden className="absolute -inset-y-1.5 -inset-x-2.5 bg-[#ede8e0]/65" />
                      <span className="relative font-serif text-[0.7rem] font-bold tracking-[0.22em] text-[#118DEF]">{step.n}</span>
                    </div>
                    <h3 className="font-serif text-[1.1rem] lg:text-[1.2rem] font-bold text-stone-900 leading-snug mb-2 flex items-center gap-2">
                      {step.title}
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#118DEF] flex-shrink-0" />
                    </h3>
                    <p className="text-[0.84rem] text-stone-400 leading-[1.75]">{step.description}</p>
                  </li>
                </FadeUp>
              ))}
            </ol>
          </div>
        </section>

        {/* ── AUTORIDAD ─────────────────────────────────────────────── */}
        <section className={`bg-[#faf9f7] py-14 lg:py-20 ${DIVIDER}`}>
          <div className="max-w-5xl mx-auto px-8 lg:px-14">
            <Reveal>
              <Eyebrow accent>La Firma</Eyebrow>
              <motion.h2
                variants={fadeUp}
                className="font-serif font-bold text-stone-900 tracking-tight leading-[0.95] mb-6"
                style={{ fontSize: "clamp(2.8rem, 5vw, 5rem)" }}
              >
                Liderazgo con experiencia<br />
                <em style={{ color: "#b5afa8", fontStyle: "italic" }}>real en ecommerce y crecimiento.</em>
              </motion.h2>
              <motion.div variants={fadeUp} className="mt-3 h-0.5 w-12 bg-[#118DEF] rounded-full" />

              <motion.div variants={fadeUp} className="mt-8 space-y-6 text-[0.9rem] text-stone-400 leading-[1.8] max-w-2xl">
                <p>
                  Belli es una firma de consultoría estratégica boutique especializada en crecimiento empresarial y ecommerce para empresas medianas en Latinoamérica. Más de <strong className="text-stone-600 font-semibold">17 años de experiencia corporativa</strong> y más de <strong className="text-stone-600 font-semibold">10 años liderando ecommerce y business development</strong> en sectores de alta competencia.
                </p>
                <p>
                  Formación internacional con <strong className="text-stone-600 font-semibold">MBA en ESCP Business School (Londres y París)</strong>, con perspectiva global aplicada al contexto latinoamericano. No trabajamos con frameworks genéricos — trabajamos con diagnóstico real, estrategia ejecutable y acompañamiento en la implementación.
                </p>
                <p>
                  Trabajamos con CEOs y gerentes de empresas medianas que buscan estructura, foco estratégico y resultados sostenibles — no consultorías que desaparecen después del diagnóstico.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-10 border-l-2 border-[#118DEF] pl-6 max-w-2xl">
                <p className="text-[0.92rem] text-stone-800 italic leading-[1.75]">
                  "Estrategia sin ejecución es intención. Ejecución sin estructura es desgaste."
                </p>
              </motion.div>
            </Reveal>
          </div>
        </section>

        {/* ── FINAL CTA / CONTACTO ──────────────────────────────────── */}
        <section id="contacto" className="scroll-mt-20 bg-stone-950 py-16 lg:py-24">
          <div className="max-w-5xl mx-auto px-8 lg:px-14 text-center">
            <FadeUp>
              <p className="text-[0.6rem] font-semibold tracking-[0.3em] uppercase text-stone-500 mb-6">Siguiente paso</p>
              <h2
                className="font-serif font-bold text-white leading-[1.05] tracking-[-0.025em] max-w-3xl mx-auto"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
              >
                Agenda tu sesión estratégica
              </h2>
              <p className="mt-6 text-stone-400 text-[0.92rem] leading-[1.8] max-w-lg mx-auto">
                Evaluamos tu estructura de crecimiento, canales de ecommerce y oportunidades estratégicas en 30 minutos. Sin costo, sin compromiso.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-flex items-center gap-2.5 bg-white text-stone-900 text-[0.74rem] font-semibold tracking-[0.18em] uppercase px-8 py-4 rounded-md cursor-pointer group"
                >
                  Agendar sesión estratégica
                  <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </motion.a>
              </div>
              <p className="mt-5 text-[0.67rem] text-stone-600 tracking-wide">Sesión de 30 minutos · Sin costo · Sin compromiso</p>
            </FadeUp>
          </div>
        </section>

      </main>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="bg-stone-950 py-10 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-8 lg:px-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-serif text-lg font-bold tracking-[0.18em] text-white">BELLI</p>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => goto(link.href)}
                className="text-[0.7rem] tracking-[0.18em] uppercase text-stone-600 hover:text-stone-300 transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
            <Link href="/" className="text-[0.7rem] tracking-[0.18em] uppercase text-stone-600 hover:text-stone-300 transition-colors duration-200">
              Inicio
            </Link>
          </div>
          <p className="text-[0.67rem] text-stone-700">© 2026 Belli. Todos los derechos reservados.</p>
        </div>
      </footer>

    </div>
  );
}
