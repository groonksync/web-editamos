import React, { useState, useRef } from 'react';
import { SlidersHorizontal, Layers, Volume2, ArrowLeftRight, Play, Sparkles } from 'lucide-react';
import Reveal from './Reveal';

const PRODUCTION_LAYERS = [
  {
    id: 'raw',
    step: '01',
    label: 'Toma Cruda',
    code: 'D-LOG · DIRECTO DE CÁMARA',
    desc: 'Video original sin corrección de color ni gráficos: imagen plana y sin referencias claras para el comprador.',
    tag: 'Archivo original'
  },
  {
    id: 'color',
    step: '02',
    label: 'Color Cinematográfico',
    code: 'ACESCCT · FILM LOOK',
    desc: 'Corrección de luz, balance orgánico y contraste comercial en DaVinci Resolve para destacar la propiedad o producto.',
    tag: 'Colorización Pro'
  },
  {
    id: 'master',
    step: '03',
    label: 'Gráficos 3D y Audio',
    code: 'FUSION 3D · AUDIO -14 LUFS',
    desc: 'Delimitación limpia anclada al movimiento real del dron, datos de superficie y audio comercial nivelado.',
    tag: 'Listo para publicar'
  }
];

const BeforeAfterLab = ({ asset, onPreviewRealVideo }) => {
  const [mode, setMode] = useState('split'); // 'split' | 'layers'
  const [splitPos, setSplitPos] = useState(42);
  const [activeLayer, setActiveLayer] = useState('master');
  const stageRef = useRef(null);
  const draggingRef = useRef(false);

  const updateFromClientX = (clientX) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplitPos(Math.max(4, Math.min(96, Math.round(pct * 10) / 10)));
  };

  const handlePointerDown = (e) => {
    if (mode !== 'split') return;
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!draggingRef.current || mode !== 'split') return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = () => {
    draggingRef.current = false;
  };

  const handleKeyDown = (e) => {
    if (mode !== 'split') return;
    if (e.key === 'ArrowLeft') setSplitPos((p) => Math.max(4, p - 4));
    if (e.key === 'ArrowRight') setSplitPos((p) => Math.min(96, p + 4));
  };

  const showGraded = mode === 'split' || activeLayer !== 'raw';
  const showOverlay3D = mode === 'split' || activeLayer === 'master';
  const layerMeta = PRODUCTION_LAYERS.find((l) => l.id === activeLayer) || PRODUCTION_LAYERS[2];

  // Relleno suave sin trazos pesados sobre el terreno en esquina (1280x714)
  const lotPoints = '312,302 664,274 922,334 832,440 732,546 668,592 622,604 562,588 492,534 416,464 344,386';

  return (
    <section
      id="antes-despues"
      className="sync-dark-panel py-14 md:py-22 text-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <Reveal className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-7 md:mb-9 gap-5">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#d4b475] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4b475]" />
              <span>Comparador en Vivo</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-none text-white">
              De toma cruda a activo comercial
            </h2>
          </div>

          {/* Selector limpio sin trazos */}
          <div className="inline-flex p-1 rounded-xl bg-white/[0.06] shrink-0">
            <button
              type="button"
              onClick={() => setMode('split')}
              className={`px-3.5 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
                mode === 'split' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal size={13} /> Comparador
            </button>
            <button
              type="button"
              onClick={() => setMode('layers')}
              className={`px-3.5 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
                mode === 'layers' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Layers size={13} /> Ver Etapas
            </button>
          </div>
        </Reveal>

        {/* MONITOR LIMPIO DE COMPARACIÓN */}
        <div
          ref={stageRef}
          role="slider"
          tabIndex={0}
          aria-label="Comparador interactivo de toma cruda versus video masterizado"
          aria-valuemin={4}
          aria-valuemax={96}
          aria-valuenow={Math.round(splitPos)}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-950 select-none touch-none shadow-[0_32px_80px_-24px_rgba(0,0,0,0.8)] ${
            mode === 'split' ? 'cursor-ew-resize' : 'cursor-default'
          }`}
        >
          {/* Capa base: Toma Cruda */}
          <img
            src={asset('/demo-drone-raw.jpg')}
            alt="Toma aérea original sin etalonaje"
            draggable="false"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />

          {/* Capa superior: Color + Highlight 3D limpio */}
          {showGraded && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={
                mode === 'split'
                  ? { clipPath: `inset(0 0 0 ${splitPos}%)` }
                  : { clipPath: 'inset(0 0 0 0%)' }
              }
            >
              <img
                src={asset('/demo-drone-graded.jpg')}
                alt="Toma masterizada con color cinematográfico"
                draggable="false"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {showOverlay3D && (
                <svg
                  viewBox="0 0 1280 714"
                  preserveAspectRatio="xMidYMid slice"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                >
                  <defs>
                    <linearGradient id="lotCleanFill" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#d4b475" stopOpacity="0.24" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
                    </linearGradient>
                  </defs>

                  {/* Área iluminada limpia sin trazos pesados ni líneas punteadas */}
                  <polygon
                    points={lotPoints}
                    fill="url(#lotCleanFill)"
                    stroke="#ffffff"
                    strokeOpacity="0.5"
                    strokeWidth="1.25"
                    strokeLinejoin="round"
                  />

                  {/* Etiqueta flotante única en zona derecha del lote (sin cruzarse con el divisor) */}
                  <g transform="translate(595, 368)">
                    <rect
                      x="0"
                      y="0"
                      width="216"
                      height="48"
                      rx="12"
                      fill="rgba(8,8,10,0.82)"
                    />
                    <text
                      x="108"
                      y="20"
                      textAnchor="middle"
                      fill="#d4b475"
                      fontSize="9.5"
                      fontWeight="700"
                      letterSpacing="1.8"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      TERRENO EN ESQUINA
                    </text>
                    <text
                      x="108"
                      y="38"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="15.5"
                      fontWeight="800"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                    >
                      1,615 m² · Trackeado 3D
                    </text>
                  </g>
                </svg>
              )}
            </div>
          )}

          {/* Etiquetas flotantes minimalistas sin bordes */}
          {mode === 'split' ? (
            <>
              <div className="absolute left-3 top-3 sm:left-4 sm:top-4 z-10 px-2.5 py-1 rounded-lg bg-black/65 backdrop-blur-md font-mono text-[8.5px] sm:text-[10px] uppercase tracking-wider text-zinc-200 pointer-events-none whitespace-nowrap">
                Toma Cruda<span className="hidden sm:inline"> · Sin Editar</span>
              </div>
              <div className="absolute right-3 top-3 sm:right-4 sm:top-4 z-10 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md font-mono text-[8.5px] sm:text-[10px] uppercase tracking-wider text-[#d4b475] pointer-events-none whitespace-nowrap">
                Master Sync Pro<span className="hidden sm:inline"> · Fusion 3D</span>
              </div>

              {/* Barra divisoria sutil */}
              <div
                className="absolute top-0 bottom-0 z-20 w-px bg-white/80 pointer-events-none"
                style={{ left: `${splitPos}%` }}
              >
                <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white text-zinc-950 flex items-center justify-center shadow-xl">
                  <ArrowLeftRight size={14} />
                </div>
              </div>
            </>
          ) : (
            <div className="absolute left-3 top-3 sm:left-4 sm:top-4 z-10 px-3 py-1.5 rounded-lg bg-black/75 backdrop-blur-md font-mono text-[10px] uppercase tracking-wider text-[#d4b475] pointer-events-none">
              Etapa {layerMeta.step} · {layerMeta.code}
            </div>
          )}
        </div>

        {/* Barra de controles rápidos + acción de video */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          {mode === 'split' ? (
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: 'Solo Toma Cruda', pos: 95 },
                { label: 'Mitad y Mitad', pos: 50 },
                { label: 'Resultado Final', pos: 5 }
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setSplitPos(preset.pos)}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/15 font-mono text-[10px] text-zinc-200 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-4 text-xs text-zinc-300">
              <span className="inline-flex items-center gap-1.5 text-[#d4b475] font-mono text-[10.5px] uppercase tracking-wider">
                <Sparkles size={13} /> {layerMeta.label}
              </span>
              <span className="inline-flex items-center gap-1.5 text-zinc-400 font-mono text-[10.5px]">
                <Volume2 size={13} /> {layerMeta.tag}
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={() => onPreviewRealVideo && onPreviewRealVideo('cuadro-7')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.07] hover:bg-white text-white hover:text-zinc-950 text-[11px] font-bold uppercase tracking-wider transition-all"
          >
            <Play size={12} className="fill-current" /> Ver tracking 3D en video real (13.000 m²)
          </button>
        </div>

        {/* 3 ETAPAS LIMPIAS SIN BORDES PESADOS */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {PRODUCTION_LAYERS.map((layer) => {
            const selected =
              (mode === 'layers' && activeLayer === layer.id) ||
              (mode === 'split' && layer.id === 'master');
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => {
                  setMode('layers');
                  setActiveLayer(layer.id);
                }}
                className={`text-left p-5 rounded-2xl transition-all duration-200 ${
                  selected
                    ? 'bg-white/[0.09] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]'
                    : 'bg-white/[0.03] hover:bg-white/[0.06]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      selected ? 'bg-[#d4b475] text-zinc-950 font-bold' : 'bg-white/[0.07] text-zinc-400'
                    }`}
                  >
                    Paso {layer.step}
                  </span>
                  <span className="font-mono text-[9.5px] text-zinc-500 uppercase tracking-wider">{layer.tag}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight mb-1">{layer.label}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-normal">{layer.desc}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterLab;
