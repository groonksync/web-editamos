import React, { useState } from 'react';
import { Sliders, Layers, Volume2, Sparkles, Maximize2, MessageCircle } from 'lucide-react';
import Reveal from './Reveal';

const PIPELINE_MODULES = [
  {
    id: 'fusion',
    code: 'FUSION // 01',
    name: 'Planar Tracking 3D',
    metric: 'ANCLAJE SUB-PÍXEL',
    icon: Layers,
    summary:
      'Traqueamos avenidas, lotes y fachadas directamente al movimiento del dron o cámara para que los textos, cotas y perímetros pertenezcan físicamente a la escena.',
    still: '/stills/still-346m2.jpg',
    projectRef: 'Propiedad Comercial · 346,98 m²',
    details: ['Camera & Planar Tracker', 'Rotoscopía detrás del sujeto', 'Sombras y profundidad Z']
  },
  {
    id: 'color',
    code: 'COLOR // 02',
    name: 'Gestión ACEScct & LUT',
    metric: '10-BIT PIPELINE',
    icon: Sliders,
    summary:
      'Árboles de nodos estructurados por capas para normalizar perfiles Log de dron y cámara, equilibrar tonos de piel y construir un look cinematográfico exclusivo por marca.',
    still: '/stills/still-santacruz.jpg',
    projectRef: 'Santa Cruz Inmobiliaria · Grading',
    details: ['Matching multicámara', 'Aislamiento selectivo de color', 'Halation y contraste fílmico']
  },
  {
    id: 'fairlight',
    code: 'FAIRLIGHT // 03',
    name: 'Masterización Sonora',
    metric: '-14 LUFS BROADCAST',
    icon: Volume2,
    summary:
      'El 50% de la retención ocurre en los oídos: limpiamos viento/ruido en locación, nivelamos voz con compresión broadcast y sincronizamos risers y sub-drops al fotograma exacto.',
    still: '/stills/still-sportfit.jpg',
    projectRef: 'Sport Fit · Ritmo & SFX',
    details: ['De-noise & De-reverb de voz', 'Ducking musical automatizado', 'Foley y whooshes frame-exact']
  },
  {
    id: 'ia',
    code: 'IA + RITMO // 04',
    name: 'Speed Ramps & IA Visual',
    metric: 'OPTICAL FLOW PRO',
    icon: Sparkles,
    summary:
      'Combinamos curvas de velocidad fluidas con generación visual y locución comercial asistida por IA cuando el guion exige mostrar tomas que aún no existen físicamente.',
    still: '/stills/still-casa.jpg',
    projectRef: 'Casa en Venta · Hook & Rotoscopía',
    details: ['Speed ramps sin cortes bruscos', 'Insertos conceptuales IA', 'Subtítulos kinetic de retención']
  }
];

const REAL_STILLS = [
  {
    id: 'st-346',
    type: 'photo',
    src: '/stills/still-346m2.jpg',
    title: 'Propiedad Comercial 346,98 m²',
    subtitle: 'Delimitación 3D sobre terreno en esquina Av. Santos Dumont'
  },
  {
    id: 'st-av',
    type: 'photo',
    src: '/stills/still-avenida-3d.jpg',
    title: 'Mapa Vial Animado 3D',
    subtitle: 'Trazado luminoso de 5to y 7mo anillo en perspectiva aérea'
  },
  {
    id: 'st-13k',
    type: 'photo',
    src: '/stills/still-13000m2.jpg',
    title: 'Terreno 13.000 m²',
    subtitle: 'Contorno glow anclado y lectura de superficie en movimiento'
  },
  {
    id: 'st-240',
    type: 'photo',
    src: '/stills/still-depto-240.jpg',
    title: 'Departamento de Lujo 240 m²',
    subtitle: 'Rotoscopía + cuadros flotantes PiP de piscina e interiores'
  },
  {
    id: 'st-scz',
    type: 'photo',
    src: '/stills/still-santacruz.jpg',
    title: 'Storytelling Cruceño',
    subtitle: 'Composición multicapa de monumentos y texto detrás del orador'
  },
  {
    id: 'st-360',
    type: 'photo',
    src: '/stills/still-loteo-360.jpg',
    title: 'Loteo Campestre 360 m²',
    subtitle: 'Titulación 3D con perspectiva de ruta aérea'
  },
  {
    id: 'st-barber',
    type: 'photo',
    src: '/video03.jpeg',
    title: 'Chino Barber · Lifestyle',
    subtitle: 'Rotoscopía de sujeto sobre tipografía cinematográfica'
  },
  {
    id: 'st-gym',
    type: 'photo',
    src: '/stills/still-sportfit.jpg',
    title: 'Sport Fit · Ritmo Comercial',
    subtitle: 'Subtítulo en plano trasero sincronizado al movimiento'
  }
];

const TimelineEngineeringSection = ({ asset, whatsappNumber, onSelectLightbox }) => {
  const [selectedId, setSelectedId] = useState('fusion');
  const active = PIPELINE_MODULES.find((m) => m.id === selectedId) || PIPELINE_MODULES[0];

  return (
    <section
      id="ingenieria"
      className="sync-dark-panel py-14 md:py-22 text-white border-b border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <Reveal className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#d4b475] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4b475]" />
              <span>Inside the Timeline · DaVinci Resolve Studio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-white leading-none">
              Así construimos cada cuadro
            </h2>
          </div>
          <p className="text-zinc-400 text-xs md:text-sm max-w-md font-normal leading-relaxed">
            Cuatro disciplinas ejecutadas en un flujo unificado de postproducción. Sin atajos automáticos ni acabados genéricos.
          </p>
        </Reveal>

        {/* Inspector interactivo del pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-7 mb-12 md:mb-16">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {PIPELINE_MODULES.map((mod) => {
              const Icon = mod.icon;
              const isSelected = mod.id === selectedId;
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => setSelectedId(mod.id)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white/[0.08] border-[#d4b475]/55 shadow-[0_18px_40px_-18px_rgba(212,180,117,0.22)]'
                      : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="w-9 h-9 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-center text-[#d4b475]">
                        <Icon size={17} />
                      </span>
                      <span className="font-mono text-[9.5px] uppercase tracking-wider text-zinc-400">
                        {mod.code}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-white mb-2">
                      {mod.name}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-normal mb-4">{mod.summary}</p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.07] flex items-center justify-between font-mono text-[10px]">
                    <span className={isSelected ? 'text-[#d4b475]' : 'text-zinc-500'}>{mod.metric}</span>
                    <span className="text-zinc-400">{isSelected ? 'ACTIVO' : 'VER →'}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Tarjeta visual en vivo del módulo seleccionado */}
          <div className="lg:col-span-5 rounded-3xl bg-black/70 border border-white/15 p-4 sm:p-5 flex flex-col justify-between">
            <div
              onClick={() =>
                onSelectLightbox({
                  type: 'photo',
                  src: active.still,
                  title: active.name,
                  subtitle: active.projectRef
                })
              }
              className="group relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:h-[330px] rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 cursor-pointer"
            >
              <img
                src={asset(active.still)}
                alt={active.projectRef}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
              <span className="absolute left-3 top-3 px-2.5 py-1 rounded-md bg-black/75 border border-white/15 font-mono text-[9.5px] uppercase tracking-wider text-[#d4b475]">
                {active.metric}
              </span>
              <span className="absolute right-3 top-3 w-8 h-8 rounded-full bg-black/65 border border-white/20 text-white flex items-center justify-center group-hover:bg-white group-hover:text-zinc-950 transition-colors">
                <Maximize2 size={13} />
              </span>
              <div className="absolute left-3.5 right-3.5 bottom-3.5">
                <span className="font-mono text-[9.5px] uppercase tracking-wider text-zinc-400 block">
                  Fotograma real de producción
                </span>
                <b className="text-sm sm:text-base font-bold text-white tracking-tight">{active.projectRef}</b>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
              <div className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-zinc-500">
                Especificaciones aplicadas en escena
              </div>
              <div className="flex flex-wrap gap-1.5">
                {active.details.map((d) => (
                  <span
                    key={d}
                    className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 font-mono text-[10px] text-zinc-200"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Galería curada de Fotogramas & Composiciones Reales de Sync Pro */}
        <Reveal className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
            <div>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-zinc-400 block mb-1">
                Archivo Técnico · Stills de Composiciones Propias
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-white">
                Frames & Tracking Real
              </h3>
            </div>
            <span className="font-mono text-[10px] text-zinc-400">
              Toca cualquier fotograma para inspeccionar el detalle 1:1
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3">
            {REAL_STILLS.map((shot) => (
              <figure
                key={shot.id}
                onClick={() => onSelectLightbox(shot)}
                className="group relative m-0 aspect-[9/16] rounded-xl overflow-hidden bg-zinc-900 border border-white/10 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-[#d4b475]/50 hover:shadow-xl"
              >
                <img
                  src={asset(shot.src)}
                  alt={shot.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <figcaption className="absolute left-2 right-2 bottom-2 text-left pointer-events-none">
                  <b className="block text-[10px] font-bold uppercase tracking-tight text-white leading-tight line-clamp-1">
                    {shot.title}
                  </b>
                  <span className="block text-[9px] text-zinc-400 leading-tight line-clamp-1 mt-0.5">
                    {shot.subtitle}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                'Hola Sync Pro, vi su desglose de ingeniería en DaVinci Resolve y quiero cotizar una producción con ustedes.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-lg"
            >
              <MessageCircle size={15} /> Quiero este nivel en mi marca
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default TimelineEngineeringSection;
