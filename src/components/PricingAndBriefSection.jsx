import React, { useState } from 'react';
import {
  CheckCircle2,
  Sparkles,
  Layers,
  Cpu,
  MessageCircle,
  Send,
  ShieldCheck,
  Clock,
  Film,
  MapPin,
  Mic,
  Plus,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from './Reveal';

const DURATION_PLANS = [
  {
    id: 'hasta-30',
    label: 'Hasta 30 seg',
    tag: 'Reels / TikToks de impacto rápido',
    basicPrice: 120,
    advancedPrice: 220
  },
  {
    id: '31-a-60',
    label: '31 a 60 seg',
    tag: 'Formato ideal para anuncios y ventas',
    basicPrice: 180,
    advancedPrice: 320,
    popular: true
  },
  {
    id: '61-a-90',
    label: '61 a 90 seg',
    tag: 'Explicaciones completas y demostraciones',
    basicPrice: 250,
    advancedPrice: 430
  },
  {
    id: '91-a-120',
    label: '91 a 120 seg',
    tag: 'Producción extensa e inmobiliaria',
    basicPrice: 320,
    advancedPrice: 550
  }
];

const BASIC_ITEMS = [
  'El cliente envía sus tomas de video y el guion listo',
  'Selección, recorte y unión limpia en DaVinci Resolve Studio',
  'Música de fondo acorde al ritmo del video + efectos de sonido básicos',
  'Títulos limpios o subtítulos dinámicos para retención',
  'Ajuste básico de exposición y balance de color',
  'Incluye hasta 2 revisiones (ajustes sobre el mismo guion)'
];

const ADVANCED_ITEMS = [
  'El cliente envía sus tomas y el guion (o estructuramos el ritmo visual)',
  'Edición dinámica con curvas de velocidad, archivos de color (.cube) y sonido Fairlight',
  'Motion Graphics en DaVinci Resolve Fusion: señaladores y textos flotantes 3D',
  'Incluye el marcado / trazado animado de 1 terreno o lote',
  'Incluye hasta 2 videos generados con Inteligencia Artificial (IA)',
  'Incluye 1 audio o locución comercial generada con IA',
  'Incluye hasta 2 revisiones sin costo adicional'
];

const PROJECT_CATEGORIES = [
  'Inmobiliaria / Loteo 3D',
  'Marca Comercial / Retail',
  'Creador / Marca Personal',
  'Campaña Meta Ads'
];

const MODALITIES = [
  'Edición Básica (por duración)',
  'Edición Avanzada · 3D + IA (Recomendado)',
  'Varios videos / Paquete mensual'
];

const WORKFLOW_PROCESS = [
  {
    step: '01',
    title: 'Recepción de Tomas y Guion',
    desc: 'Envías tus archivos de video por Drive o WhatsApp junto a tu idea o guion. Revisamos cada toma antes de empezar.',
    badge: 'Envío directo'
  },
  {
    step: '02',
    title: 'Edición, Color y Motion 3D',
    desc: 'Editamos tu pieza en DaVinci Resolve Studio: cortes precisos, audio limpio, color profesional y efectos 3D o IA si elegiste Avanzada.',
    badge: 'DaVinci Studio'
  },
  {
    step: '03',
    title: 'Revisión y Entrega Lista',
    desc: 'Te mostramos la primera versión, pulimos hasta 2 rondas de ajustes incluidos y te entregamos el video listo para publicar.',
    badge: 'Listo para redes'
  }
];

const PROPRIETARY_TOOLS = [
  {
    name: 'WorkFlow Sync DRX',
    target: 'DaVinci Resolve Studio (Edit & Fusion)',
    desc: 'Automatiza tareas repetitivas, organiza bins inteligentes y acelera el renderizado de composiciones Fusion en segundos.',
    badge: 'Best Seller',
    icon: Layers,
    specs: ['Auto-Render Queue', 'Smart MediaPool Bins', 'Fusion Macros 3D', 'Frame-Accurate Sync']
  },
  {
    name: 'ColorMaster Node',
    target: 'DaVinci Resolve Studio (Color Page)',
    desc: 'Árboles de nodos pre-configurados con gestión de color ACES, aislamiento de tonos de piel y archivos .CUBE de cine.',
    badge: 'Nuevo',
    icon: Cpu,
    specs: ['One-Click ACES Pipeline', 'Skin Tone Isolation', 'Halation & Bloom Realista', 'Archivos .CUBE Incluidos']
  }
];

const PricingAndBriefSection = ({ whatsappNumber }) => {
  const [selectedDurationIndex, setSelectedDurationIndex] = useState(1); // 31 a 60 seg default
  const [selectedCategory, setSelectedCategory] = useState(PROJECT_CATEGORIES[0]);
  const [selectedModality, setSelectedModality] = useState(MODALITIES[1]);
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
  const [status, setStatus] = useState('');

  const activeDuration = DURATION_PLANS[selectedDurationIndex];

  const getWhatsAppPlanUrl = (planName, durationLabel, priceBs) => {
    const text = `Hola Sync Pro, quiero contratar el plan de *${planName}* (${durationLabel} - Bs. ${priceBs}). Tengo mis tomas listas para empezar.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleBriefWhatsApp = () => {
    const details = [
      `Hola Sync Pro, quiero cotizar mi proyecto:`,
      `• Tipo: ${selectedCategory}`,
      `• Plan de interés: ${selectedModality}`,
      `• Duración estimada: ${activeDuration.label}`,
      formData.name ? `• Nombre/Marca: ${formData.name}` : null,
      formData.message ? `• Detalles: ${formData.message}` : null
    ]
      .filter(Boolean)
      .join('\n');
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(details)}`, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Enviando consulta...');
    try {
      const payload = {
        name: formData.name,
        email: formData.contact,
        category: selectedCategory,
        modality: selectedModality,
        duration: activeDuration.label,
        message: `[Rubro: ${selectedCategory} | Plan: ${selectedModality} | Duración: ${activeDuration.label}] ${formData.message}`
      };
      const response = await fetch('https://formspree.io/f/xnjgdbdd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setStatus('¡Mensaje enviado! Te respondemos enseguida.');
        setFormData({ name: '', contact: '', message: '' });
      } else {
        setStatus('No se pudo enviar por formulario. Usa el botón de WhatsApp.');
      }
    } catch {
      setStatus('Error de conexión. Escríbenos directo por WhatsApp.');
    }
  };

  return (
    <>
      {/* 1. PLANES DE EDICIÓN DE VIDEO POR DURACIÓN CON PRECIOS REALES EN Bs. */}
      <section
        id="planes-edicion"
        className="py-14 md:py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-b border-zinc-200/70"
      >
        <Reveal className="flex flex-col md:flex-row justify-between items-start md:items-end mb-7 md:mb-10 gap-3 md:gap-6">
          <div>
            <span className="font-mono text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-[0.26em] text-zinc-400 block mb-1.5">
              Inversión Transparente por Duración
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-zinc-900 leading-none">
              Planes de edición
            </h2>
          </div>
          <p className="text-zinc-500 text-xs md:text-sm max-w-md font-normal leading-relaxed">
            Elige la duración de tu video y mira al instante el precio exacto y qué incluye cada nivel de producción en DaVinci Resolve Studio.
          </p>
        </Reveal>

        {/* Selector de Duración optimizado para Smartphone (2x2) y Escritorio (4 en línea) */}
        <div className="bg-zinc-100/90 p-1.5 rounded-2xl grid grid-cols-2 lg:grid-cols-4 gap-1.5 mb-6 md:mb-8 border border-zinc-200/80">
          {DURATION_PLANS.map((plan, index) => {
            const isSelected = selectedDurationIndex === index;
            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedDurationIndex(index)}
                className={`relative p-3 sm:p-4 rounded-xl text-left transition-all flex flex-col justify-between min-h-[76px] sm:min-h-[84px] ${
                  isSelected
                    ? 'bg-zinc-950 text-white shadow-md'
                    : 'bg-white/75 hover:bg-white text-zinc-700 border border-zinc-200/60'
                }`}
              >
                <div className="flex items-center justify-between gap-1.5 mb-1">
                  <span className="text-xs sm:text-sm font-extrabold tracking-tight">{plan.label}</span>
                  {plan.popular && (
                    <span
                      className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap ${
                        isSelected ? 'bg-[#d4b475] text-zinc-950' : 'bg-zinc-900 text-white'
                      }`}
                    >
                      Más elegido
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] sm:text-[11px] font-normal leading-snug line-clamp-2 ${
                    isSelected ? 'text-zinc-300' : 'text-zinc-500'
                  }`}
                >
                  {plan.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tarjetas Comparativas: Edición Básica vs Edición Avanzada */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 mb-6 md:mb-8">
          {/* EDICIÓN BÁSICA */}
          <div className="rounded-2xl sm:rounded-3xl bg-white border border-zinc-200/90 p-5 sm:p-7 md:p-9 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.07)] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start gap-3 pb-5 sm:pb-6 border-b border-zinc-100">
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-wider text-zinc-600 mb-2">
                    Nivel 01 · Flujo Esencial
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900">
                    Edición Básica
                  </h3>
                  <p className="text-zinc-500 text-xs md:text-sm mt-1 font-normal">
                    Ideal para contenido ágil, claro y bien musicalizado con tus tomas y guion listos.
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0 text-zinc-800">
                  <Film size={19} />
                </div>
              </div>

              {/* Precio Dinámico en Bs. */}
              <div className="my-5 sm:my-6 p-4 sm:p-5 rounded-2xl bg-zinc-50 border border-zinc-200/70 flex items-baseline justify-between flex-wrap gap-3">
                <div>
                  <span className="text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-0.5">
                    Duración: {activeDuration.label}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs sm:text-sm font-bold text-zinc-500">Bs.</span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`basic-${activeDuration.id}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900"
                      >
                        {activeDuration.basicPrice}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
                <span className="text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-white border border-zinc-200 text-zinc-600">
                  Por video terminado
                </span>
              </div>

              {/* Lista de entregables */}
              <div className="space-y-2.5 sm:space-y-3 mb-7 sm:mb-8">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-1.5">
                  Qué incluye este plan
                </div>
                {BASIC_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 text-xs md:text-[13px] text-zinc-600 font-normal leading-relaxed"
                  >
                    <CheckCircle2 size={15} className="text-zinc-900 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={getWhatsAppPlanUrl('Edición Básica', activeDuration.label, activeDuration.basicPrice)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 sm:px-6 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle size={15} /> Solicitar Básica ({activeDuration.label})
            </a>
          </div>

          {/* EDICIÓN AVANZADA */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#0b0b0e] text-white border border-zinc-800 p-5 sm:p-7 md:p-9 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.3)] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start gap-3 pb-5 sm:pb-6 border-b border-white/[0.08]">
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded-full bg-white text-zinc-950 text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider">
                      Nivel 02 · Alto Impacto + IA
                    </span>
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-wider">
                      Recomendado
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                    Edición Avanzada
                  </h3>
                  <p className="text-zinc-400 text-xs md:text-sm mt-1 font-normal">
                    Producción comercial con DaVinci Resolve Fusion 3D, archivos de color e Inteligencia Artificial.
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0 text-white">
                  <Sparkles size={19} />
                </div>
              </div>

              {/* Precio Dinámico en Bs. */}
              <div className="my-5 sm:my-6 p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-baseline justify-between flex-wrap gap-3">
                <div>
                  <span className="text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-0.5">
                    Duración: {activeDuration.label}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs sm:text-sm font-bold text-zinc-300">Bs.</span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`adv-${activeDuration.id}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white"
                      >
                        {activeDuration.advancedPrice}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
                <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[#d4b475] text-zinc-950">
                  Incluye Motion 3D + IA
                </span>
              </div>

              {/* Lista de entregables */}
              <div className="space-y-2.5 sm:space-y-3 mb-7 sm:mb-8">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-1.5">
                  Todo lo de Básica más
                </div>
                {ADVANCED_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 text-xs md:text-[13px] text-zinc-200 font-normal leading-relaxed"
                  >
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={getWhatsAppPlanUrl('Edición Avanzada', activeDuration.label, activeDuration.advancedPrice)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 sm:px-6 bg-white hover:bg-zinc-200 text-zinc-950 rounded-xl font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageCircle size={15} /> Solicitar Avanzada ({activeDuration.label})
            </a>
          </div>
        </div>

        {/* Barra de Adicionales y Extras (2x2 compacto en Smartphone, 4 en línea en Escritorio) */}
        <div className="rounded-2xl bg-zinc-50 border border-zinc-200/80 p-4 sm:p-6 md:p-7">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
            <div className="max-w-xs">
              <span className="text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-400 block mb-0.5">
                Complementos opcionales
              </span>
              <h4 className="text-base sm:text-lg font-bold tracking-tight text-zinc-900 flex items-center gap-2">
                <Plus size={16} className="text-zinc-500" /> Adicionales a medida
              </h4>
              <p className="text-zinc-500 text-xs mt-1 font-normal leading-relaxed">
                Añade extras solo cuando tu producción requiera más tomas con IA o terrenos adicionales.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 flex-1">
              <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-zinc-200/80 shadow-sm">
                <div className="flex items-center justify-between text-zinc-400 mb-1">
                  <Sparkles size={13} />
                  <span className="text-[8.5px] sm:text-[9px] font-mono uppercase tracking-wider">EXTRA IA</span>
                </div>
                <div className="text-base sm:text-lg font-extrabold text-zinc-900">+Bs. 50</div>
                <div className="text-[10.5px] sm:text-[11px] text-zinc-500 mt-0.5 leading-snug">
                  Video extra con IA (c/u)
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-zinc-200/80 shadow-sm">
                <div className="flex items-center justify-between text-zinc-400 mb-1">
                  <MapPin size={13} />
                  <span className="text-[8.5px] sm:text-[9px] font-mono uppercase tracking-wider">TERRENO</span>
                </div>
                <div className="text-base sm:text-lg font-extrabold text-zinc-900">+Bs. 80</div>
                <div className="text-[10.5px] sm:text-[11px] text-zinc-500 mt-0.5 leading-snug">
                  Terreno adicional (c/u)
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-zinc-200/80 shadow-sm">
                <div className="flex items-center justify-between text-zinc-400 mb-1">
                  <Mic size={13} />
                  <span className="text-[8.5px] sm:text-[9px] font-mono uppercase tracking-wider">REVISIÓN</span>
                </div>
                <div className="text-base sm:text-lg font-extrabold text-zinc-900">+Bs. 30 / 60</div>
                <div className="text-[10.5px] sm:text-[11px] text-zinc-500 mt-0.5 leading-snug">
                  Ajuste extra (3ra rev+)
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-zinc-200/80 shadow-sm">
                <div className="flex items-center justify-between text-zinc-400 mb-1">
                  <Clock size={13} />
                  <span className="text-[8.5px] sm:text-[9px] font-mono uppercase tracking-wider">+120 SEG</span>
                </div>
                <div className="text-base sm:text-lg font-extrabold text-zinc-900">+Bs. 60 / 100</div>
                <div className="text-[10.5px] sm:text-[11px] text-zinc-500 mt-0.5 leading-snug">
                  Cada +30 seg extras
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROCESO EN 3 PASOS + TECNOLOGÍA DEL ESTUDIO */}
      <section className="py-14 md:py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-b border-zinc-200/70">
        <Reveal className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 gap-3">
          <div>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-400 block mb-1.5">
              Cómo Trabajamos
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-zinc-950 leading-none">
              Flujo de Trabajo Directo
            </h2>
          </div>
          <p className="text-zinc-500 text-xs md:text-sm max-w-sm font-normal leading-relaxed">
            Desde que nos envías tus videos hasta que recibes el archivo final listo para subir a redes o pauta.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-10">
          {WORKFLOW_PROCESS.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl bg-zinc-50 p-5 sm:p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-lg bg-zinc-950 text-[#d4b475] text-xs font-mono font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white font-mono text-[9.5px] font-medium text-zinc-600">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-zinc-950 mb-2">{item.title}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed font-normal">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tecnología del Estudio */}
        <div id="herramientas" className="rounded-3xl bg-zinc-100/70 p-5 sm:p-7">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
            <div>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-zinc-500 block mb-1">
                Sync Pro Labs
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-zinc-950">
                Herramientas y Color Propios
              </h3>
            </div>
            <p className="text-xs text-zinc-500 max-w-md">
              Desarrollamos macros y árboles de color propios para DaVinci Resolve Studio que aplicamos en cada proyecto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROPRIETARY_TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.name}
                  className="rounded-2xl bg-white p-5 flex flex-col justify-between shadow-2xs"
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
                      <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 font-mono text-[9px] text-zinc-700 shrink-0 whitespace-nowrap">
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

          <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-500">
            <span>Tecnología incluida en nuestras producciones en DaVinci Resolve Studio.</span>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                'Hola Sync Pro, soy editor y me interesa consultar por WorkFlow Sync DRX / ColorMaster Node.'
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

      {/* 3. BRIEF DIRECTO DE CONTACTO */}
      <section id="contacto" className="py-14 md:py-20 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
        <div className="sync-dark-panel rounded-3xl text-white p-6 sm:p-8 md:p-11 shadow-[0_28px_70px_-24px_rgba(0,0,0,0.4)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#d4b475] mb-3">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shrink-0" />
                <span>Agenda Activa · Respuesta Rápida</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white leading-tight mb-3.5">
                Hablemos de tu video
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                Elige tu tipo de proyecto y duración arriba o cuéntanos aquí abajo qué necesitas editar para enviarte tu video lo antes posible.
              </p>

              <div className="space-y-3 mb-6">
                <button
                  type="button"
                  onClick={handleBriefWhatsApp}
                  className="w-full justify-center inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-white text-zinc-950 text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-lg"
                >
                  <MessageCircle size={16} /> Cotizar directo por WhatsApp
                </button>
                <div className="flex items-center gap-2.5 font-mono text-[10.5px] text-zinc-400">
                  <ShieldCheck size={14} className="text-[#d4b475] shrink-0" />
                  <span>DaVinci Resolve Studio · Hasta 2 revisiones incluidas</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-4">
              {/* Paso A: Rubro */}
              <div>
                <label className="block font-mono text-[9.5px] uppercase tracking-[0.18em] text-zinc-400 mb-2">
                  01 · Rubro de tu video
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {PROJECT_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                        selectedCategory === cat
                          ? 'bg-white text-zinc-950'
                          : 'bg-white/[0.06] text-zinc-300 hover:bg-white/[0.12]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Paso B: Plan */}
              <div>
                <label className="block font-mono text-[9.5px] uppercase tracking-[0.18em] text-zinc-400 mb-2">
                  02 · Plan que necesitas ({activeDuration.label})
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {MODALITIES.map((mod) => (
                    <button
                      key={mod}
                      type="button"
                      onClick={() => setSelectedModality(mod)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                        selectedModality === mod
                          ? 'bg-[#d4b475] text-zinc-950'
                          : 'bg-white/[0.06] text-zinc-300 hover:bg-white/[0.12]'
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
                  className="w-full bg-white/[0.06] rounded-xl px-4 py-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:bg-white/[0.1] transition-colors font-medium"
                />
                <input
                  type="text"
                  placeholder="Correo o WhatsApp"
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full bg-white/[0.06] rounded-xl px-4 py-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:bg-white/[0.1] transition-colors font-medium"
                />
              </div>

              <textarea
                rows="3"
                placeholder="Cuéntanos qué quieres editar, cuántos videos son o envíanos algún link de referencia..."
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/[0.06] rounded-xl px-4 py-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:bg-white/[0.1] transition-colors font-medium resize-none"
              />

              <button
                type="submit"
                className="w-full py-3.5 bg-white text-zinc-950 hover:bg-zinc-200 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Sparkles size={14} /> Enviar mensaje <Send size={13} />
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
