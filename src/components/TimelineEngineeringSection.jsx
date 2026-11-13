import React, { useState } from 'react';
import { Sliders, Layers, Volume2, Sparkles, CheckCircle2, Maximize2 } from 'lucide-react';
import Reveal from './Reveal';

const PIPELINE_MODULES = [
  {
    id: 'fusion',
    step: '01',
    name: 'Tracking 3D & Señalética',
    shortBenefit: 'Delimitamos lotes, calles y detalles sobre el movimiento del dron.',
    icon: Layers,
    headline: 'Que el comprador entienda dimensiones, accesos y ubicaciones al instante',
    summary:
      'En lugar de textos planos que tapan la imagen, anclamos perímetros, medidas, nombres de avenidas e íconos directamente al terreno o fachada con cámara en movimiento.',
    benefits: [
      'Delimitación luminosa de terrenos, lotes o propiedades comerciales',
      'Carteles con superficie en m², precios y referencias clave pegados al plano real',
      'Trazado animado de rutas y avenidas principales desde toma aérea',
      'Separación de persona en primer plano para textos con profundidad'
    ],
    idealFor: 'Inmobiliarias, loteos, condominios y constructoras',
    deliveryTag: 'Motion Graphics en Fusion Studio',
    still: '/stills/still-346m2.jpg',
    projectRef: 'Propiedad Comercial · 346,98 m²'
  },
  {
    id: 'color',
    step: '02',
    name: 'Color Cinematográfico',
    shortBenefit: 'Corregimos luz, tonos de piel y acabado de película comercial.',
    icon: Sliders,
    headline: 'Tu video pasa de lucir como grabación casera a pieza publicitaria de alto nivel',
    summary:
      'Balanceamos luces quemadas, sombras y diferencias entre cámaras o celulares para entregar una paleta fiel, natural y atractiva que eleva el valor percibido de tu oferta.',
    benefits: [
      'Corrección de cielos lavados y recuperación de detalles en exteriores',
      'Tonos de piel naturales para agentes, entrenadores o presentadores',
      'Unificación visual cuando combinas grabaciones de dron, cámara y celular',
      'Look cromático consistente pensado para pantallas móviles y pauta digital'
    ],
    idealFor: 'Marcas de lujo, arquitectura, belleza y salud',
    deliveryTag: 'Colorimetría ACEScct en DaVinci Resolve',
    still: '/stills/still-santacruz.jpg',
    projectRef: 'Santa Cruz Inmobiliaria · Grading Pro'
  },
  {
    id: 'fairlight',
    step: '03',
    name: 'Audio Limpio y con Fuerza',
    shortBenefit: 'Voz clara sin ruido de calle ni viento, con música que acompaña sin tapar.',
    icon: Volume2,
    headline: 'Más de la mitad de la retención en redes ocurre porque el video se escucha bien',
    summary:
      'Limpiamos ecos, ruido de gimnasio, aire o tráfico, nivelamos tu voz con compresión profesional y añadimos efectos sonoros precisos en cada transición clave.',
    benefits: [
      'Limpieza de ruido ambiental, viento en exteriores y eco de interiores',
      'Voz principal al frente con volumen parejo y presencia profesional',
      'Ajuste automático de música para nunca opacar lo que estás explicando',
      'Efectos sonoros sutiles que refuerzan ganchos y textos importantes'
    ],
    idealFor: 'Presentadores, tiendas físicas, fitness y marca personal',
    deliveryTag: 'Mezcla Fairlight -14 LUFS para Reels/TikTok',
    still: '/stills/still-sportfit.jpg',
    projectRef: 'Sport Fit · Ritmo & Diseño Sonoro'
  },
  {
    id: 'ia',
    step: '04',
    name: 'Ritmo Ágil e IA Visual',
    shortBenefit: 'Cortes fluidos, ganchos en los primeros 3 segundos y escenas creadas con IA.',
    icon: Sparkles,
    headline: 'Cero segundos aburridos y soluciones visuales cuando faltan tomas reales',
    summary:
      'Estructuramos el video para atrapar atención desde el inicio, aceleramos transiciones con curvas suaves e integramos escenas o locuciones con Inteligencia Artificial cuando el proyecto lo necesita.',
    benefits: [
      'Gancho visual diseñado en los primeros 2 a 3 segundos para evitar que pasen el video',
      'Speed ramps y transiciones limpias que mantienen dinamismo sin marear',
      'Generación de videos e insertos de apoyo con IA para ilustrar ideas',
      'Subtítulos dinámicos pensados para personas que ven videos sin volumen'
    ],
    idealFor: 'Campañas de venta rápida, lanzamientos y anuncios pagos',
    deliveryTag: 'Optical Flow Pro + Escenas IA',
    still: '/stills/still-casa.jpg',
    projectRef: 'Casa en Venta · Hook & Subtítulos'
  }
];

const TimelineEngineeringSection = ({ asset, onSelectLightbox }) => {
  const [selectedId, setSelectedId] = useState('fusion');
  const active = PIPELINE_MODULES.find((m) => m.id === selectedId) || PIPELINE_MODULES[0];

  return (
    <section
      id="ingenieria"
      className="sync-dark-panel py-14 md:py-22 text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <Reveal className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#d4b475] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4b475]" />
              <span>Proceso de Postproducción</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-white leading-none">
              Así construimos cada cuadro
            </h2>
          </div>
          <p className="text-zinc-400 text-xs md:text-sm max-w-md font-normal leading-relaxed">
            Cuatro pilares de edición en DaVinci Resolve Studio pensados para que tu video retenga atención y venda mejor.
          </p>
        </Reveal>

        {/* Selector limpio en 4 pilares sin trazos pesados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {PIPELINE_MODULES.map((mod) => {
            const Icon = mod.icon;
            const isSelected = mod.id === selectedId;
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => setSelectedId(mod.id)}
                className={`text-left p-4 sm:p-5 rounded-2xl transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white text-zinc-950 shadow-[0_20px_45px_-20px_rgba(255,255,255,0.25)]'
                    : 'bg-white/[0.04] text-white hover:bg-white/[0.08]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-zinc-950 text-[#d4b475]' : 'bg-white/[0.08] text-[#d4b475]'
                      }`}
                    >
                      <Icon size={16} />
                    </span>
                    <span
                      className={`font-mono text-[10px] font-bold tracking-wider ${
                        isSelected ? 'text-zinc-500' : 'text-zinc-500'
                      }`}
                    >
                      PASO {mod.step}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold tracking-tight mb-1.5">{mod.name}</h3>
                  <p className={`text-xs leading-relaxed ${isSelected ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    {mod.shortBenefit}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Panel detallado limpio con más contenido útil para el cliente */}
        <div className="rounded-3xl bg-[#101015] p-5 sm:p-8 lg:p-9 shadow-[0_28px_70px_-28px_rgba(0,0,0,0.8)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-9 items-center">
            {/* Contenido completo y directo */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-[#d4b475] mb-2">
                  {active.step} · {active.deliveryTag}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-snug mb-2.5">
                  {active.headline}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">{active.summary}</p>
              </div>

              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-3">
                  Qué aplicamos en tu producción
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {active.benefits.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] text-xs text-zinc-200 leading-relaxed"
                    >
                      <CheckCircle2 size={15} className="text-[#d4b475] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <div className="px-3.5 py-2 rounded-xl bg-white/[0.04] text-[11px] text-zinc-300">
                  <span className="text-zinc-500 mr-1.5 font-mono text-[10px] uppercase">Ideal para:</span>
                  <strong className="font-semibold text-white">{active.idealFor}</strong>
                </div>
              </div>
            </div>

            {/* Vista visual limpia sin bordes */}
            <div className="lg:col-span-5">
              <div
                onClick={() =>
                  onSelectLightbox({
                    type: 'photo',
                    src: active.still,
                    title: active.name,
                    subtitle: active.projectRef
                  })
                }
                className="group relative h-[280px] sm:h-[340px] lg:h-[370px] rounded-2xl overflow-hidden bg-zinc-950 cursor-pointer shadow-2xl"
              >
                <img
                  src={asset(active.still)}
                  alt={active.projectRef}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <span className="absolute right-3 top-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-white group-hover:text-zinc-950 transition-colors">
                  <Maximize2 size={13} />
                </span>
                <div className="absolute left-4 right-4 bottom-4">
                  <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#d4b475] block mb-0.5">
                    Ejemplo real en Sync Pro
                  </span>
                  <b className="text-sm sm:text-base font-bold text-white tracking-tight block">{active.projectRef}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineEngineeringSection;
