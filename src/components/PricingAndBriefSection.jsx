import React, { useState } from 'react';
import {
  CheckCircle2,
  Sparkles,
  Layers,
  Cpu,
  MessageCircle,
  Send,
  ShieldCheck,
  ArrowUpRight,
  Zap,
  Clock
} from 'lucide-react';
import Reveal from './Reveal';

const RETAINER_VOLUMES = [
  { id: '4-mes', label: '4 Piezas / mes', note: 'Presencia semanal constante · 1 video/semana' },
  { id: '8-mes', label: '8 Piezas / mes', note: 'Ritmo de escala comercial · 2 videos/semana', popular: true },
  { id: '12-mes', label: '12 Piezas / mes', note: 'Dominio total de pauta y contenido orgánico' }
];

const SERVICE_TIERS = [
  {
    id: 'signature',
    level: 'NIVEL 01 · POR PROYECTO',
    name: 'Producción Signature',
    badge: null,
    tag: 'Pieza insignia para lanzamiento o propiedad',
    cta: 'Cotizar Pieza Signature',
    briefMode: 'Producción Signature (Pieza individual)',
    dark: false,
    items: [
      'Dirección de ritmo y estructura del gancho visual (0–3s)',
      'Montaje integral y speed ramps en DaVinci Resolve Studio',
      'Colorización avanzada ACEScct / .CUBE cinematográfico',
      'Motion Graphics 3D en Fusion + señalización o rotoscopía',
      'Masterización Fairlight (-14 LUFS) + diseño SFX multicapa',
      '2 rondas de refinamiento incluidas · Entrega master 1080p / 4K'
    ]
  },
  {
    id: 'retainer',
    level: 'NIVEL 02 · DEPARTAMENTO EXTERNO',
    name: 'Partner Mensual',
    badge: 'Recomendado',
    tag: 'Continuidad editorial, velocidad 48h y LUT propio',
    cta: 'Aplicar a Partner Mensual',
    briefMode: 'Partner Mensual / Retainer',
    dark: true,
    items: [
      'Flujo mensual reservado según el volumen elegido (4, 8 o 12 piezas)',
      'Banco de Color (.cube) y tipografía 3D estandarizada para tu marca',
      'Trazado animado 3D para terrenos/lotes o gráficos de producto incluidos',
      'Generación estratégica de tomas e insertos con Inteligencia Artificial',
      'Entrega prioritaria en 24–48 horas hábiles por pieza aprobada',
      'Canal directo prioritario con equipo de edición · Cupo mensual limitado'
    ]
  },
  {
    id: 'scale',
    level: 'NIVEL 03 · INMOBILIARIA & CAMPAÑAS VIP',
    name: 'Escala & Campañas Élite',
    badge: 'A medida',
    tag: 'Lanzamientos, VSLs y pauta multi-formato',
    cta: 'Solicitar Propuesta a Medida',
    briefMode: 'Escala / Campaña Élite a medida',
    dark: false,
    items: [
      'Paquete completo para campañas de lanzamiento inmobiliario o comercial',
      'Adaptación nativa multi-formato: 9:16 (Reels/TikTok), 16:9 (YouTube/Web) y 1:1',
      'Camera Tracking 3D complejo de múltiples lotes, avenidas y fachadas',
      'Asesoría de guion orientado a conversión y variaciones de gancho A/B para Ads',
      'Banco sonoro comercial licenciado + locución IA profesional personalizada',
      'Planificación mensual cerrada bajo propuesta ejecutiva dedicada'
    ]
  }
];

const PROJECT_CATEGORIES = [
  'Inmobiliaria / Loteo 3D',
  'Marca Comercial / Retail',
  'Creador / Marca Personal',
  'Campaña Meta Ads / VSL'
];

const MODALITIES = [
  'Producción Signature (Pieza individual)',
  'Partner Mensual / Retainer',
  'Escala / Campaña Élite a medida'
];

const WORKFLOW_PROCESS = [
  {
    step: '01',
    title: 'Recepción y Diagnóstico',
    desc: 'Envías tus tomas brutas por Drive o WhatsApp. Auditamos el guion y definimos el gancho visual de los primeros 3 segundos.',
    badge: 'Kickoff Directo'
  },
  {
    step: '02',
    title: 'DaVinci Studio, Fusion 3D e IA',
    desc: 'Construimos el montaje en DaVinci Resolve Studio: etalonaje ACEScct, tracking 3D en Fusion, Fairlight -14 LUFS e insertos IA.',
    badge: 'Postproducción Boutique'
  },
  {
    step: '03',
    title: 'Revisión Precisa y Master Final',
    desc: 'Revisas la primera versión en enlace privado, aplicamos tus ajustes finos (2 rondas incluidas) y recibes el master listo para pauta.',
    badge: 'Master 1080p / 4K'
  }
];

const PROPRIETARY_TOOLS = [
  {
    name: 'WorkFlow Sync DRX',
    target: 'DaVinci Resolve Studio · Edit & Fusion',
    desc: 'Macros 3D y arquitectura de bins automatizados que reducen los tiempos muertos técnicos para entregar acabados de agencia en 48h.',
    badge: 'Infraestructura Interna',
    icon: Layers,
    specs: ['Auto-Render Queue', 'Fusion Macros 3D', 'Smart Media Bins', 'Frame-Accurate Sync']
  },
  {
    name: 'ColorMaster Node',
    target: 'DaVinci Resolve Studio · Color Page',
    desc: 'Árboles de nodos ACES propietarios con protección de tonos de piel y textura orgánica de cine adaptados a cada cámara del cliente.',
    badge: 'ACEScct Pipeline',
    icon: Cpu,
    specs: ['One-Click ACES Pipeline', 'Skin Tone Protection', 'Halation & Film Grain', 'Perfiles .CUBE Propios']
  }
];

const PricingAndBriefSection = ({ whatsappNumber }) => {
  const [volumeIdx, setVolumeIdx] = useState(1); // 8 piezas / mes default
  const [selectedCategory, setSelectedCategory] = useState(PROJECT_CATEGORIES[0]);
  const [selectedModality, setSelectedModality] = useState(MODALITIES[1]);
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
  const [status, setStatus] = useState('');

  const activeVolume = RETAINER_VOLUMES[volumeIdx];

  const handleSelectTier = (tier) => {
    setSelectedModality(tier.briefMode);
    const el = document.getElementById('contacto');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const buildWhatsAppDirectUrl = (tierName, extraNote = '') => {
    const text = `Hola Sync Pro, quiero aplicar a *${tierName}*${
      extraNote ? ` (${extraNote})` : ''
    }. Rubro: ${selectedCategory}.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleBriefWhatsApp = () => {
    const details = [
      `Hola Sync Pro, quiero postular mi proyecto:`,
      `• Rubro: ${selectedCategory}`,
      `• Modalidad: ${selectedModality}`,
      selectedModality.includes('Partner') ? `• Volumen estimado: ${activeVolume.label}` : null,
      formData.name ? `• Nombre/Marca: ${formData.name}` : null,
      formData.message ? `• Detalles: ${formData.message}` : null
    ]
      .filter(Boolean)
      .join('\n');
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(details)}`, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Enviando solicitud...');
    try {
      const payload = {
        name: formData.name,
        email: formData.contact,
        category: selectedCategory,
        modality: selectedModality,
        retainerVolume: selectedModality.includes('Partner') ? activeVolume.label : 'No aplica',
        message: `[Rubro: ${selectedCategory} | Modalidad: ${selectedModality}] ${formData.message}`
      };
      const response = await fetch('https://formspree.io/f/xnjgdbdd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setStatus('¡Postulación recibida! Te respondemos en menos de 2 horas hábiles.');
        setFormData({ name: '', contact: '', message: '' });
      } else {
        setStatus('No se pudo enviar por formulario. Usa el botón directo de WhatsApp.');
      }
    } catch {
      setStatus('Error de conexión. Escríbenos directo por WhatsApp.');
    }
  };

  return (
    <>
      {/* 1. PLANES ESTRATÉGICOS DE ALTO VALOR */}
      <section id="planes-edicion" className="py-14 md:py-22 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-b border-zinc-200/70">
        <Reveal className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
              <span>Modelos de Contratación & Retainers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-zinc-950 leading-none">
              Planes de Producción
            </h2>
          </div>
          <p className="text-zinc-500 text-xs md:text-sm max-w-md font-normal leading-relaxed">
            No cotizamos por segundos recortados. Trabajamos por alcance estratégico, nivel de postproducción y continuidad de marca.
          </p>
        </Reveal>

        {/* Selector de volumen mensual para el Partner Mensual */}
        <div className="mb-7 md:mb-9 rounded-2xl bg-zinc-100/90 border border-zinc-200/80 p-2 sm:p-2.5 flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
          <div className="px-2.5 py-1 flex items-center gap-2">
            <Clock size={14} className="text-zinc-700 shrink-0" />
            <span className="font-mono text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-wider text-zinc-700">
              Volumen Partner Mensual:
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 flex-1">
            {RETAINER_VOLUMES.map((vol, idx) => {
              const isSelected = volumeIdx === idx;
              return (
                <button
                  key={vol.id}
                  type="button"
                  onClick={() => setVolumeIdx(idx)}
                  className={`px-3.5 py-2.5 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-zinc-950 text-white shadow-sm'
                      : 'bg-white/75 hover:bg-white text-zinc-700 border border-zinc-200/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold tracking-tight">{vol.label}</span>
                    {vol.popular && (
                      <span
                        className={`font-mono text-[8.5px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-[#d4b475] text-zinc-950 font-bold' : 'bg-zinc-900 text-white'
                        }`}
                      >
                        Óptimo
                      </span>
                    )}
                  </div>
                  <span className={`block text-[10.5px] mt-0.5 ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                    {vol.note}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Trío de Anclaje */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {SERVICE_TIERS.map((tier) => {
            const isRetainer = tier.id === 'retainer';
            return (
              <div
                key={tier.id}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all ${
                  tier.dark
                    ? 'bg-[#070709] text-white border border-[#d4b475]/40 shadow-[0_28px_70px_-24px_rgba(0,0,0,0.45)]'
                    : 'bg-white text-zinc-900 border border-zinc-200/90 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.06)]'
                }`}
              >
                <div>
                  <div className={`pb-5 border-b ${tier.dark ? 'border-white/10' : 'border-zinc-100'}`}>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span
                        className={`font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.15em] ${
                          tier.dark ? 'text-[#d4b475]' : 'text-zinc-500'
                        }`}
                      >
                        {tier.level}
                      </span>
                      {tier.badge && (
                        <span
                          className={`shrink-0 whitespace-nowrap font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            tier.dark ? 'bg-[#d4b475] text-zinc-950' : 'bg-zinc-100 text-zinc-800 border border-zinc-200'
                          }`}
                        >
                          {tier.badge}
                        </span>
                      )}
                    </div>

                    <h3 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${tier.dark ? 'text-white' : 'text-zinc-950'}`}>
                      {tier.name}
                    </h3>
                    <p className={`text-xs mt-1.5 leading-relaxed ${tier.dark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      {tier.tag}
                    </p>
                  </div>

                  {/* Alcance destacado sin precios de "oferta barata" */}
                  <div
                    className={`my-5 p-4 rounded-2xl border ${
                      tier.dark ? 'bg-white/[0.04] border-white/10' : 'bg-zinc-50 border-zinc-200/70'
                    }`}
                  >
                    <span className={`font-mono text-[9.5px] uppercase tracking-wider block mb-1 ${tier.dark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      {isRetainer ? 'Capacidad reservada seleccionada' : 'Esquema de inversión'}
                    </span>
                    <div className={`text-lg sm:text-xl font-extrabold tracking-tight ${tier.dark ? 'text-white' : 'text-zinc-950'}`}>
                      {isRetainer
                        ? `${activeVolume.label} · Retainer`
                        : tier.id === 'signature'
                        ? 'Por pieza o lanzamiento clave'
                        : 'Propuesta ejecutiva a medida'}
                    </div>
                    <span className={`block font-mono text-[10px] mt-1 ${tier.dark ? 'text-[#d4b475]' : 'text-zinc-500'}`}>
                      {isRetainer
                        ? 'Prioridad de timeline 24–48h · Cupo mensual'
                        : tier.id === 'signature'
                        ? 'Cotización según metraje y VFX 3D'
                        : 'Agenda dedicada & formatos múltiples'}
                    </span>
                  </div>

                  <div className="space-y-2.5 mb-7">
                    {tier.items.map((item, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-2.5 text-xs leading-relaxed ${
                          tier.dark ? 'text-zinc-200' : 'text-zinc-600'
                        }`}
                      >
                        <CheckCircle2
                          size={14}
                          className={`shrink-0 mt-0.5 ${tier.dark ? 'text-[#d4b475]' : 'text-zinc-950'}`}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => handleSelectTier(tier)}
                    className={`w-full py-3.5 px-5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      tier.dark
                        ? 'bg-white hover:bg-zinc-200 text-zinc-950 shadow-lg'
                        : 'bg-zinc-950 hover:bg-zinc-800 text-white shadow-sm'
                    }`}
                  >
                    {tier.cta} <ArrowUpRight size={14} />
                  </button>
                  <a
                    href={buildWhatsAppDirectUrl(
                      tier.name,
                      isRetainer ? activeVolume.label : undefined
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-2.5 px-4 rounded-xl font-mono text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors ${
                      tier.dark
                        ? 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                        : 'text-zinc-500 hover:text-zinc-950 hover:bg-zinc-50'
                    }`}
                  >
                    <MessageCircle size={12} /> Consultar directo por WhatsApp
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. PROCESO EN 3 PASOS + TECNOLOGÍA PROPIETARIA SYNC PRO */}
      <section className="py-14 md:py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-b border-zinc-200/70">
        <Reveal className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 gap-3">
          <div>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-400 block mb-1.5">
              Metodología de Estudio
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-zinc-950 leading-none">
              Flujo de Trabajo Directo
            </h2>
          </div>
          <p className="text-zinc-500 text-xs md:text-sm max-w-sm font-normal leading-relaxed">
            Proceso sin fricción respaldado por nuestra propia librería interna en DaVinci Resolve Studio.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-10">
          {WORKFLOW_PROCESS.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl bg-white border border-zinc-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-lg bg-zinc-950 text-[#d4b475] text-xs font-mono font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 font-mono text-[9.5px] font-medium text-zinc-600">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-zinc-950 mb-2">{item.title}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed font-normal">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tecnología Propietaria (ex-#herramientas reposicionada para respaldar autoridad) */}
        <div id="herramientas" className="rounded-3xl bg-zinc-50 border border-zinc-200/90 p-5 sm:p-7">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5 pb-4 border-b border-zinc-200/80">
            <div>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-zinc-500 block mb-1">
                Ventaja Competitiva Sync Pro Labs
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-zinc-950">
                Tecnología Propietaria del Estudio
              </h3>
            </div>
            <p className="text-xs text-zinc-500 max-w-md">
              Desarrollamos nuestros propios árboles ACES y macros 3D para lograr calidad cinematográfica consistente en plazos cortos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROPRIETARY_TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.name}
                  className="rounded-2xl bg-white border border-zinc-200/80 p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-zinc-950 text-white flex items-center justify-center shrink-0">
                          <Icon size={17} />
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-extrabold text-zinc-950 leading-tight">{tool.name}</h4>
                          <span className="font-mono text-[9.5px] text-zinc-400">{tool.target}</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 font-mono text-[9px] text-zinc-700">
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed mb-4">{tool.desc}</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {tool.specs.map((spec) => (
                        <div key={spec} className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-700">
                          <span className="w-1 h-1 rounded-full bg-zinc-900 shrink-0" />
                          <span className="truncate">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-200/70 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-500">
            <span>Infraestructura exclusiva aplicada en todos nuestros contratos comerciales y retainers.</span>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                'Hola Sync Pro, soy editor y me interesa consultar por las licencias WorkFlow Sync DRX / ColorMaster Node.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-800 hover:text-zinc-950 inline-flex items-center gap-1"
            >
              <Zap size={11} /> ¿Eres editor? Consultar licencias DRX →
            </a>
          </div>
        </div>
      </section>

      {/* 3. BRIEF GUIADO DE POSTULACIÓN ("CUPOS LIMITADOS") */}
      <section id="contacto" className="py-14 md:py-20 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
        <div className="sync-dark-panel rounded-3xl text-white border border-white/10 p-6 sm:p-8 md:p-11 shadow-[0_28px_70px_-24px_rgba(0,0,0,0.4)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#d4b475] mb-3">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shrink-0" />
                <span>Agenda Activa · Cupos Limitados</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white leading-tight mb-3.5">
                Postula tu proyecto al estudio
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                Trabajamos con un máximo estricto de marcas y desarrolladoras al mes para asegurar colorimetría, tracking 3D y entrega en 48h sin bajar el nivel.
              </p>

              <div className="space-y-3 mb-6">
                <button
                  type="button"
                  onClick={handleBriefWhatsApp}
                  className="w-full justify-center inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-white text-zinc-950 text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-lg"
                >
                  <MessageCircle size={16} /> Enviar selección por WhatsApp
                </button>
                <div className="flex items-center gap-2.5 font-mono text-[10.5px] text-zinc-400">
                  <ShieldCheck size={14} className="text-[#d4b475] shrink-0" />
                  <span>DaVinci Resolve Studio · Fairlight -14 LUFS</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-4">
              {/* Paso A: Rubro */}
              <div>
                <label className="block font-mono text-[9.5px] uppercase tracking-[0.18em] text-zinc-400 mb-2">
                  01 · Tipo de proyecto
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {PROJECT_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all border ${
                        selectedCategory === cat
                          ? 'bg-white text-zinc-950 border-white'
                          : 'bg-white/[0.04] text-zinc-300 border-white/10 hover:bg-white/[0.09]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Paso B: Modalidad */}
              <div>
                <label className="block font-mono text-[9.5px] uppercase tracking-[0.18em] text-zinc-400 mb-2">
                  02 · Nivel de contratación deseado
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {MODALITIES.map((mod) => (
                    <button
                      key={mod}
                      type="button"
                      onClick={() => setSelectedModality(mod)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all border ${
                        selectedModality === mod
                          ? 'bg-[#d4b475] text-zinc-950 border-[#d4b475]'
                          : 'bg-white/[0.04] text-zinc-300 border-white/10 hover:bg-white/[0.09]'
                      }`}
                    >
                      {mod}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <input
                  type="text"
                  placeholder="Tu nombre o empresa"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#d4b475]/60 transition-colors font-medium"
                />
                <input
                  type="text"
                  placeholder="Correo o WhatsApp de contacto"
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#d4b475]/60 transition-colors font-medium"
                />
              </div>

              <textarea
                rows="3"
                placeholder="Cuéntanos qué quieres producir, si tienes tomas listas o enlaces de referencia..."
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#d4b475]/60 transition-colors font-medium resize-none"
              />

              <button
                type="submit"
                className="w-full py-3.5 bg-white text-zinc-950 hover:bg-zinc-200 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Sparkles size={14} /> Aplicar para trabajar juntos <Send size={13} />
              </button>

              {status && (
                <p className="text-[11px] font-medium text-center text-[#d4b475] mt-1">{status}</p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingAndBriefSection;
