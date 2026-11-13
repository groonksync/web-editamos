import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Reveal from './Reveal';

const SECTOR_TESTIMONIALS = [
  {
    sector: 'Desarrollo Inmobiliario & Loteos',
    brandRef: 'Rubro Bienes Raíces · Zona Norte',
    quote:
      'Delimitación aérea en 3D y planos de hectáreas listos para pauta en Meta Ads sin depender de renders lentos de arquitectura.',
    metric: 'PLANAR 3D + DRON',
    y: [0, -8, 0, 6, 0],
    rotate: [1.5, 2.3, 1.5, 0.7, 1.5],
    duration: 7.4,
    delay: 0,
    position: 'lg:self-start'
  },
  {
    sector: 'Torre de Departamentos & Lujo',
    brandRef: 'Ticket Residencial Exclusivo',
    quote:
      'Rotoscopía limpia detrás del orador, amenidades integradas en cámara y colorización fiel que proyecta el valor real del m².',
    metric: 'ACESCCT · ROTOSCOPÍA',
    y: [0, 8, 0, -9, 0],
    rotate: [-1.5, -0.6, -1.5, -2.4, -1.5],
    duration: 8.2,
    delay: 0.5,
    position: 'lg:self-end'
  },
  {
    sector: 'Marcas Fitness, Estilo & Retail',
    brandRef: 'Contenido Comercial Recurrente',
    quote:
      'Ritmo agresivo de retención, audio masterizado sin ruido de gimnasio y entrega sistemática cada semana para no frenar campañas.',
    metric: 'FAIRLIGHT -14 LUFS',
    y: [0, -7, 0, 8, 0],
    rotate: [1.2, 0.4, 1.2, 2.0, 1.2],
    duration: 7.9,
    delay: 1.0,
    position: 'lg:self-center'
  }
];

const FloatingAuthorityCard = ({ item }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '120px' });
  const reduce = useReducedMotion();
  const floating = inView && !reduce;

  return (
    <motion.div
      ref={ref}
      animate={floating ? { y: item.y, rotate: item.rotate } : { y: 0, rotate: item.rotate[0] }}
      transition={
        floating
          ? { duration: item.duration, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95], delay: item.delay }
          : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      }
      whileHover={{ scale: 1.03, rotate: 0 }}
      className={`w-full max-w-[330px] sm:max-w-[350px] bg-white rounded-2xl p-4 sm:p-5 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.08)] border border-zinc-200/90 transition-shadow duration-300 hover:shadow-[0_28px_52px_-16px_rgba(0,0,0,0.14)] cursor-default ${item.position}`}
    >
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span className="font-mono text-[9.5px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-950 text-[#d4b475]">
          {item.metric}
        </span>
        <CheckCircle2 size={14} className="text-zinc-900 shrink-0" />
      </div>
      <h4 className="text-sm font-extrabold text-zinc-950 tracking-tight leading-snug mb-1">{item.sector}</h4>
      <p className="text-xs text-zinc-600 font-normal leading-relaxed mb-2.5">{item.quote}</p>
      <div className="pt-2 border-t border-zinc-100 font-mono text-[9.5px] uppercase tracking-wider text-zinc-400">
        {item.brandRef}
      </div>
    </motion.div>
  );
};

const MARQUEE_SPECS = [
  '100% DaVinci Resolve Studio Oficial',
  'Camera & Planar Tracking 3D en Fusion',
  'Gestión Cromática ACEScct 10-Bit',
  'Masterización Sonora Fairlight -14 LUFS',
  'Flujo Optimizado para Meta Ads & Reels',
  'Entrega Rápida en 24–48h',
  'Cero Plantillas Genéricas de CapCut',
  'Ganchos Visuales en Primeros 2 Segundos'
];

const AuthoritySection = () => {
  return (
    <section
      id="edicion-destacada"
      className="relative pt-14 sm:pt-20 md:pt-24 pb-10 sm:pb-14 overflow-hidden bg-[#f7f7f8] border-b border-zinc-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-12 md:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* COLUMNA IZQUIERDA */}
          <Reveal className="lg:col-span-6 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-zinc-200 shadow-2xs mb-6">
              <ShieldCheck size={14} className="text-zinc-950" />
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-800">
                Dirección de Postproducción Boutique
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight text-zinc-950 leading-[1.05] mb-5">
              Edición pensada para{' '}
              <span className="text-zinc-500">justificar precios altos y cerrar ventas.</span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-zinc-600 font-normal leading-relaxed max-w-xl mb-7">
              Un video barato hace que tu marca o propiedad parezca económica. Un master con color cinematográfico,
              tracking 3D limpio y audio broadcast posiciona tu oferta por encima del mercado desde el segundo uno.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#planes-edicion"
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-zinc-950 text-white font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition-all shadow-lg group"
              >
                <span>Ver Planes y Precios</span>
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white border border-zinc-300 text-zinc-900 font-bold text-xs uppercase tracking-wider hover:bg-zinc-100 transition-all"
              >
                Cotizar Proyecto
              </a>
            </div>
          </Reveal>

          {/* COLUMNA DERECHA: Tres tarjetas técnicas flotantes por rubro real */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center pt-4 lg:pt-0 space-y-3.5 relative w-full">
            {SECTOR_TESTIMONIALS.map((item) => (
              <FloatingAuthorityCard key={item.sector} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* CINTILLO TÉCNICO INFERIOR (GPU compositor) */}
      <div className="relative w-full overflow-hidden py-3 border-t border-zinc-200/70 bg-white/80 select-none">
        <div className="sync-tape-track items-center">
          {[...MARQUEE_SPECS, ...MARQUEE_SPECS].map((badge, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 px-4 py-2 mr-3 rounded-full bg-white border border-zinc-200/90 shadow-2xs font-mono text-[10.5px] sm:text-[11px] font-medium text-zinc-800 shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 shrink-0" />
              <span>{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthoritySection;
