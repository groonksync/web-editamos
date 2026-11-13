import React, { useState, useRef } from 'react';
import { SlidersHorizontal, Layers, Sparkles, Volume2, ArrowLeftRight, Play } from 'lucide-react';
import Reveal from './Reveal';

const PRODUCTION_LAYERS = [
  {
    id: 'raw',
    step: '01',
    label: 'Toma Cruda',
    code: 'D-LOG M · SIN GRADACIÓN',
    desc: 'Material directo de cámara o dron: rango dinámico plano, cielo lavado y sin referencias espaciales para el comprador.',
    nodes: '00 / Bypass',
    audio: 'Ambiente sin tratar'
  },
  {
    id: 'color',
    step: '02',
    label: 'Etalonaje Color',
    code: 'ACESCCT · FILM LOOK',
    desc: 'Balance cromático en DaVinci Resolve Studio: recuperación de altas luces, contraste fílmico y profundidad orgánica.',
    nodes: '14 Nodos ACES',
    audio: 'Voz limpia + Ducking'
  },
  {
    id: 'master',
    step: '03',
    label: 'Fusion 3D + Audio',
    code: 'PLANAR 3D · -14 LUFS',
    desc: 'Delimitación perimetral traqueada al movimiento real del dron, cotas en perspectiva y diseño sonoro Fairlight listo para pauta.',
    nodes: '42 Nodos + Fusion 3D',
    audio: 'Master -14 LUFS SFX'
  }
];

const BeforeAfterLab = ({ asset, onPreviewRealVideo }) => {
  const [mode, setMode] = useState('split'); // 'split' | 'layers'
  const [splitPos, setSplitPos] = useState(52);
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

  // Polígono calibrado sobre los bordes exactos del lote en esquina (1280x714)
  const lotPoints = '312,302 664,274 922,334 832,440 732,546 668,592 622,604 562,588 492,534 416,464 344,386';

  return (
    <section
      id="antes-despues"
      className="sync-dark-panel py-14 md:py-22 text-white border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <Reveal className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 md:mb-10 gap-5">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#d4b475] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4b475]" />
              <span>Ingeniería de Postproducción</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-none text-white">
              De toma cruda a activo comercial
            </h2>
          </div>

          {/* Selector de inspección */}
          <div className="inline-flex p-1 rounded-xl bg-white/[0.05] border border-white/10">
            <button
              type="button"
              onClick={() => setMode('split')}
              className={`px-3.5 sm:px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                mode === 'split' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal size={13} /> Comparador Split
            </button>
            <button
              type="button"
              onClick={() => setMode('layers')}
              className={`px-3.5 sm:px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                mode === 'layers' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Layers size={13} /> Capas de Nodo
            </button>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* VISOR INTERACTIVO 16:9 */}
          <div className="lg:col-span-8 flex flex-col">
            <div
              ref={stageRef}
              tabIndex={mode === 'split' ? 0 : undefined}
              role={mode === 'split' ? 'slider' : undefined}
              aria-label={mode === 'split' ? 'Comparador Antes y Después' : 'Vista de capas de producción'}
              aria-valuemin={mode === 'split' ? 0 : undefined}
              aria-valuemax={mode === 'split' ? 100 : undefined}
              aria-valuenow={mode === 'split' ? Math.round(splitPos) : undefined}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onKeyDown={handleKeyDown}
              className={`relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-black border border-white/15 shadow-[0_28px_70px_-24px_rgba(0,0,0,0.9)] select-none touch-none focus:outline-none focus:ring-2 focus:ring-[#d4b475]/60 ${
                mode === 'split' ? 'cursor-ew-resize' : 'cursor-default'
              }`}
            >
              {/* Capa base: Toma cruda D-Log */}
              <img
                src={asset('/demo-drone-raw.jpg')}
                alt="Toma aérea original sin etalonaje ni gráficos 3D"
                draggable="false"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />

              {/* Capa superior recortada por clip-path: Master Graded + Trazado 3D */}
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
                    alt="Toma masterizada con etalonaje ACEScct y trazado 3D"
                    draggable="false"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Trazado vectorial Fusion 3D alineado exactamente sobre el terreno */}
                  {showOverlay3D && (
                    <svg
                      viewBox="0 0 1280 714"
                      preserveAspectRatio="xMidYMid slice"
                      className="absolute inset-0 w-full h-full pointer-events-none"
                    >
                      <defs>
                        <linearGradient id="lotFill" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#d4b475" stopOpacity="0.22" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.09" />
                        </linearGradient>
                        <filter id="lotGlow" x="-15%" y="-15%" width="130%" height="130%">
                          <feGaussianBlur stdDeviation="4" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      {/* Área sombreada y contorno perimetral */}
                      <polygon
                        points={lotPoints}
                        fill="url(#lotFill)"
                        stroke="#ffffff"
                        strokeWidth="3.5"
                        strokeLinejoin="round"
                        filter="url(#lotGlow)"
                      />
                      <polygon
                        points={lotPoints}
                        fill="none"
                        stroke="#d4b475"
                        strokeWidth="1.5"
                        strokeDasharray="10 6"
                        strokeLinejoin="round"
                      />

                      {/* Vértices técnicos de Planar Tracker */}
                      {[
                        [312, 302],
                        [664, 274],
                        [922, 334],
                        [622, 604]
                      ].map(([cx, cy], idx) => (
                        <g key={idx}>
                          <circle cx={cx} cy={cy} r="7" fill="#050507" stroke="#d4b475" strokeWidth="2.5" />
                          <circle cx={cx} cy={cy} r="2.2" fill="#ffffff" />
                        </g>
                      ))}

                      {/* Cota frontal izquierda */}
                      <g transform="translate(362, 508) rotate(39)">
                        <rect x="-42" y="-13" width="84" height="24" rx="5" fill="rgba(5,5,7,0.82)" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
                        <text
                          x="0"
                          y="3"
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="12"
                          fontWeight="700"
                          fontFamily="JetBrains Mono, monospace"
                        >
                          41.80 M
                        </text>
                      </g>

                      {/* Cota frontal derecha */}
                      <g transform="translate(815, 488) rotate(-42)">
                        <rect x="-42" y="-13" width="84" height="24" rx="5" fill="rgba(5,5,7,0.82)" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
                        <text
                          x="0"
                          y="3"
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="12"
                          fontWeight="700"
                          fontFamily="JetBrains Mono, monospace"
                        >
                          38.60 M
                        </text>
                      </g>

                      {/* Pin flotante central anclado al terreno */}
                      <line x1="590" y1="440" x2="590" y2="335" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" />
                      <circle cx="590" cy="440" r="5" fill="#d4b475" />
                      <g transform="translate(465, 282)">
                        <rect
                          x="0"
                          y="0"
                          width="250"
                          height="52"
                          rx="10"
                          fill="rgba(5,5,7,0.88)"
                          stroke="rgba(212,180,117,0.65)"
                          strokeWidth="1.5"
                        />
                        <text
                          x="125"
                          y="21"
                          textAnchor="middle"
                          fill="#d4b475"
                          fontSize="10"
                          fontWeight="700"
                          letterSpacing="2"
                          fontFamily="JetBrains Mono, monospace"
                        >
                          TRACKING 3D · ESQUINA
                        </text>
                        <text
                          x="125"
                          y="41"
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="17"
                          fontWeight="800"
                          fontFamily="Plus Jakarta Sans, sans-serif"
                        >
                          1,615 M² DISPONIBLES
                        </text>
                      </g>
                    </svg>
                  )}
                </div>
              )}

              {/* Etiquetas flotantes Raw vs Master */}
              {mode === 'split' ? (
                <>
                  <div className="absolute left-2.5 top-2.5 sm:left-4 sm:top-4 z-10 px-2 sm:px-2.5 py-1 rounded-md bg-black/75 border border-white/15 backdrop-blur-md font-mono text-[8.5px] sm:text-[10px] uppercase tracking-wider text-zinc-300 pointer-events-none whitespace-nowrap">
                    RAW · D-LOG<span className="hidden sm:inline"> SIN EDITAR</span>
                  </div>
                  <div className="absolute right-2.5 top-2.5 sm:right-4 sm:top-4 z-10 px-2 sm:px-2.5 py-1 rounded-md bg-black/80 border border-[#d4b475]/50 backdrop-blur-md font-mono text-[8.5px] sm:text-[10px] uppercase tracking-wider text-[#d4b475] pointer-events-none whitespace-nowrap">
                    MASTER<span className="hidden sm:inline"> SYNC PRO</span> · <span className="hidden sm:inline">FUSION </span>3D
                  </div>

                  {/* Línea divisoria interactiva */}
                  <div
                    className="absolute top-0 bottom-0 z-20 w-[2px] bg-white shadow-[0_0_16px_rgba(255,255,255,0.85)] pointer-events-none"
                    style={{ left: `${splitPos}%` }}
                  >
                    <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-zinc-950 border-2 border-white text-white flex items-center justify-center shadow-2xl">
                      <ArrowLeftRight size={15} />
                    </div>
                  </div>
                </>
              ) : (
                <div className="absolute left-3 top-3 sm:left-4 sm:top-4 z-10 px-3 py-1.5 rounded-lg bg-black/80 border border-white/15 backdrop-blur-md font-mono text-[10px] uppercase tracking-wider text-[#d4b475] pointer-events-none">
                  CAPA {layerMeta.step} · {layerMeta.code}
                </div>
              )}
            </div>

            {/* Presets rápidos / Barra de control inferior */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-1">
              {mode === 'split' ? (
                <div className="flex items-center gap-2">
                  {[
                    { label: '100% Toma Cruda', pos: 94 },
                    { label: '50 / 50 Comparar', pos: 50 },
                    { label: '100% Master 3D', pos: 6 }
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setSplitPos(preset.pos)}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/15 border border-white/10 font-mono text-[10px] text-zinc-300 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="font-mono text-[10.5px] text-zinc-400">
                  INSPECCIÓN DE PIPELINE: <span className="text-white">{layerMeta.nodes}</span> ·{' '}
                  <span className="text-[#d4b475]">{layerMeta.audio}</span>
                </div>
              )}

              <button
                type="button"
                onClick={() => onPreviewRealVideo && onPreviewRealVideo('cuadro-7')}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white hover:text-[#d4b475] transition-colors"
              >
                <Play size={13} className="fill-current" /> Ver tracking 3D en video real (13.000 m²)
              </button>
            </div>
          </div>

          {/* PANEL TÉCNICO LATERAL */}
          <div className="lg:col-span-4 rounded-2xl bg-white/[0.03] border border-white/10 p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3.5 mb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                  DAVINCI RESOLVE PIPELINE
                </span>
                <span className="font-mono text-[10px] text-emerald-400">TC 01:00:08:14</span>
              </div>

              <div className="space-y-2.5">
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
                      className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                        selected
                          ? 'bg-white/[0.08] border-[#d4b475]/50 shadow-sm'
                          : 'bg-white/[0.02] border-white/[0.07] hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-extrabold uppercase tracking-tight text-white flex items-center gap-2">
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-[#d4b475]">
                            {layer.step}
                          </span>
                          {layer.label}
                        </span>
                        <span className="font-mono text-[9.5px] text-zinc-400">{layer.nodes}</span>
                      </div>
                      <p className="text-[11.5px] text-zinc-400 leading-relaxed font-normal">{layer.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-300">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <Volume2 size={13} className="text-[#d4b475]" /> Master Sonoro Fairlight
                </span>
                <span>-14 LUFS Stereo</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-300">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <Sparkles size={13} className="text-[#d4b475]" /> Gestión Cromática
                </span>
                <span>ACEScct 10-Bit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterLab;
