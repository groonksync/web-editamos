import React from 'react';
import { Play, ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';

const FEATURED_CASE = {
  id: 'cuadro-7',
  code: 'CASE // 01',
  clientTag: 'Inmobiliaria & Loteos · Zona Norte',
  title: 'Terreno Industrial y Residencial 13.000 m²',
  still: '/stills/still-13000m2.jpg',
  challenge:
    'Una toma aérea convencional no permite al inversionista ubicar los linderos exactos ni percibir la escala real frente a la carretera principal.',
  architecture:
    'Camera Tracking planar en DaVinci Resolve Fusion 3D, trazado lumínico perimetral integrado en perspectiva, rótulo flotante 12,928 m² y diseño sonoro de impacto en los primeros 1.8 segundos.',
  specs: ['Fusion Planar 3D', 'Curva ACEScct', 'Hook < 1.8s', 'Fairlight -14 LUFS']
};

const SECONDARY_CASES = [
  {
    id: 'cuadro-9',
    code: 'CASE // 02',
    clientTag: 'Inversiones Comerciales · Av. Santos Dumont',
    title: 'Propiedad Comercial 346,98 m²',
    still: '/stills/still-avenida-3d.jpg',
    architecture:
      'Apertura en escala de grises selectiva (USD 500 mil), máscara luminosa trazando avenidas principales en movimiento y demarcación exacta del lote sobre toma aérea.',
    specs: ['Avenidas en Máscara 3D', 'Color Selectivo', 'Titulación 3D']
  },
  {
    id: 'cuadro-12',
    code: 'CASE // 03',
    clientTag: 'Condominios & Torres Exclusivas',
    title: 'Departamento de Lujo 240 m² + 2 Garajes',
    still: '/stills/still-depto-240.jpg',
    architecture:
      'Rotoscopía limpia del presentador para insertar tipografía arquitectónica detrás del sujeto, iluminación selectiva de fachada y recuadros dinámicos de amenidades.',
    specs: ['Rotoscopía + Profundidad', 'Realce Fachada', 'PiP Amenidades']
  }
];

const CaseStudiesSection = ({ asset, onSelectProjectId }) => {
  return (
    <section id="casos-estudio" className="py-14 md:py-22 bg-white border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <Reveal className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
              <span>Arquitectura por Proyecto</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-zinc-950 leading-none">
              Casos de Estudio Reales
            </h2>
          </div>
          <p className="text-zinc-500 text-xs md:text-sm max-w-md font-normal leading-relaxed">
            No aplicamos plantillas genéricas. Cada pieza resuelve cómo comunicar escala, ubicación y prestigio comercial con ingeniería de estudio.
          </p>
        </Reveal>

        {/* Bento Grid Asimétrico: Caso Principal (7 cols) + 2 Casos Apilados (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 items-stretch">
          <Reveal className="lg:col-span-7 flex" delay={0.04}>
            <article className="w-full rounded-3xl bg-[#070709] text-white border border-zinc-800 overflow-hidden shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)] flex">
              <div className="grid grid-cols-1 sm:grid-cols-12 w-full">
                <div
                  onClick={() => onSelectProjectId(FEATURED_CASE.id)}
                  className="sm:col-span-5 relative min-h-[290px] sm:min-h-full bg-black cursor-pointer group overflow-hidden"
                >
                  <img
                    src={asset(FEATURED_CASE.still)}
                    alt={FEATURED_CASE.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                  <span className="absolute left-3.5 top-3.5 px-2.5 py-1 rounded-md bg-black/75 border border-white/15 font-mono text-[9.5px] uppercase tracking-wider text-[#d4b475]">
                    {FEATURED_CASE.code}
                  </span>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 text-zinc-950 flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                    <Play size={18} className="ml-0.5 fill-zinc-950" />
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 font-mono text-[9.5px] uppercase tracking-wider text-zinc-300">
                    Tocar para ver en HD con audio
                  </div>
                </div>

                <div className="sm:col-span-7 p-6 sm:p-7 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#d4b475] block mb-2">
                      {FEATURED_CASE.clientTag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-snug mb-4">
                      {FEATURED_CASE.title}
                    </h3>

                    <div className="space-y-3.5 text-xs leading-relaxed">
                      <div>
                        <span className="font-mono text-[9.5px] uppercase tracking-wider text-zinc-400 block mb-0.5">
                          Desafío comercial
                        </span>
                        <p className="text-zinc-300 font-normal">{FEATURED_CASE.challenge}</p>
                      </div>
                      <div>
                        <span className="font-mono text-[9.5px] uppercase tracking-wider text-zinc-400 block mb-0.5">
                          Ingeniería Sync Pro
                        </span>
                        <p className="text-zinc-300 font-normal">{FEATURED_CASE.architecture}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {FEATURED_CASE.specs.map((spec) => (
                        <span
                          key={spec}
                          className="px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/10 font-mono text-[9.5px] text-zinc-300"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelectProjectId(FEATURED_CASE.id)}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-[#d4b475] transition-colors"
                    >
                      Inspeccionar pieza completa <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>

          <div className="lg:col-span-5 flex flex-col gap-5 md:gap-6">
            {SECONDARY_CASES.map((cs, idx) => (
              <Reveal key={cs.id} className="flex-1 flex" delay={0.1 + idx * 0.08}>
                <article
                  onClick={() => onSelectProjectId(cs.id)}
                  className="group w-full rounded-2xl sm:rounded-3xl bg-zinc-50 hover:bg-white border border-zinc-200/90 hover:border-zinc-300 p-4 sm:p-5 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex gap-4 items-center"
                >
                  <div className="relative w-24 sm:w-28 aspect-[9/16] rounded-xl overflow-hidden bg-zinc-900 shrink-0">
                    <img
                      src={asset(cs.still)}
                      alt={cs.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                      <span className="w-9 h-9 rounded-full bg-white/95 text-zinc-950 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <Play size={13} className="ml-0.5 fill-zinc-950" />
                      </span>
                    </div>
                  </div>

                  <div className="min-w-0 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-mono text-[9.5px] uppercase tracking-wider text-zinc-400">
                          {cs.code}
                        </span>
                        <ArrowUpRight size={14} className="text-zinc-400 group-hover:text-zinc-950 transition-colors shrink-0" />
                      </div>
                      <span className="font-mono text-[9.5px] uppercase tracking-wider text-zinc-600 block mb-1 truncate">
                        {cs.clientTag}
                      </span>
                      <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-zinc-950 leading-snug mb-2">
                        {cs.title}
                      </h3>
                      <p className="text-[11.5px] text-zinc-600 leading-relaxed line-clamp-3 font-normal mb-3">
                        {cs.architecture}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {cs.specs.map((spec) => (
                        <span
                          key={spec}
                          className="px-2 py-0.5 rounded bg-white border border-zinc-200 font-mono text-[9px] text-zinc-600"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
