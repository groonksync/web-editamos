import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Camera, 
  Fingerprint, 
  Layout, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Zap, 
  Maximize2, 
  Layers, 
  Repeat, 
  Clock 
} from 'lucide-react';

const App = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .no-scrollbar::-webkit-scrollbar {
        height: 4px;
      }
      .no-scrollbar::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 20px;
        margin-inline: 40px;
      }
      .no-scrollbar::-webkit-scrollbar-thumb {
        background: #dc2626;
        border-radius: 20px;
        box-shadow: 0 0 10px rgba(220, 38, 38, 0.5);
      }
      .no-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: #dc2626 rgba(255, 255, 255, 0.05);
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const [lang, setLang] = useState('es'); 
  const [activeService, setActiveService] = useState(0);
  const [formStatus, setFormStatus] = useState('idle');

  // ID de Videos de Google Drive (Sincronizado con actualizar_videos.py)
  // NO MODIFICAR EL NOMBRE DE ESTA VARIABLE: videoIds
  const [videoIds, setVideoIds] = useState([
    "1ij8AwE_XWKfSL0Ssw7RFjWeBDaaAD_11", // Cuadro 1
    "1ij8AwE_XWKfSL0Ssw7RFjWeBDaaAD_11", // Cuadro 2
    "1ij8AwE_XWKfSL0Ssw7RFjWeBDaaAD_11", // Cuadro 3
    "1ij8AwE_XWKfSL0Ssw7RFjWeBDaaAD_11", // Cuadro 4
    "1ij8AwE_XWKfSL0Ssw7RFjWeBDaaAD_11"  // Cuadro 5
  ]);

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzunzhVeJQtXsSpOV7G1jgQt2UwAnD7SUf-mWr2grocF7tJ_Hrtf26b86g8CxQZb67nUQ/exec";

  const translations = {
    es: {
      nav: ["Proyectos", "Servicios", "Planes", "Contacto"],
      cta_nav: "TRABAJAR CON NOSOTROS",
      hero_tag: "Estudio de Post-Producción & Estrategia 2026",
      hero_h1_1: "SINCRONIZA",
      hero_h1_2: "TU VISIÓN",
      hero_p: "No solo editamos video. Diseñamos la frecuencia en la que tu marca resuena con el mundo. Edición avanzada en AE/PR, identidad visual y captura cinematográfica en cualquier formato.",
      hero_btn_main: "INICIAR PROYECTO",
      hero_btn_sec: "VER SHOWREEL",
      projects_h2: "NUESTROS PROYECTOS",
      projects_p: "Ediciones de alto impacto optimizadas para la retención máxima. Dominamos el formato vertical y horizontal para todas las plataformas sociales.",
      plans_h2: "PLANES DE CREACIÓN DE CONTENIDO",
      plans_p: "Suscripciones mensuales diseñadas para un crecimiento constante y presencia profesional.",
      extra_plans_h2: "PLANES EXTRA",
      editing_plans_h2: "PLANES DE EDICIÓN DE VIDEO",
      editing_plans_p: "Soluciones de edición por proyecto único, adaptadas a la duración y complejidad de tu material.",
      editing_plans_data: [
        {
          name: "LITE (30s - 2min)",
          basic: { price: "$12", features: ["Limpieza de errores", "1 pista de fondo", "Balance de blancos", "Entrega 48h"] },
          advanced: { price: "$20", features: ["Cortes Dinámicos (Jump-cuts)", "Subtítulos Pop-ups/Emoji", "Diseño sonoro + SFX", "Color Grading Pro", "Entrega 24-48h"] }
        },
        {
          name: "NARRATIVE (3 - 5min)",
          basic: { price: "$45", priceBs: "Bs. 315", features: ["Ritmo estándar", "Subtítulos estáticos", "1 pista de fondo", "Sin corrección color", "Entrega 72h"] },
          advanced: { price: "$75", priceBs: "Bs. 525", features: ["Storytelling con ritmo", "Estilo Pro con resaltado", "Mix de audio avanzado", "Color Grading consistente", "Entrega 48-72h"] }
        },
        {
          name: "CINEMATIC (8 - 15min)",
          basic: { price: "$110", priceBs: "Bs. 770", features: ["Montaje lineal limpio", "Subs (si entrega guion)", "Música básica catálogo", "Sin corrección color", "Entrega 4-5 días"] },
          advanced: { price: "$180", priceBs: "Bs. 1.260", features: ["Montaje Pro (Pacing)", "Subtítulos estilizados", "Audio inmersivo + Licencias", "Look Cinematográfico", "Entrega 3-5 días"] }
        }
      ],
      plans_data: [
        { name: "Plan Impacto", price: "$150", priceBs: "Bs. 1.400", items: ["Foco: Redes (Básico)", "4 Reels / TikToks", "Guion Estándar", "1 Jornada (4h)", "Recursos: Luces + Micro", "Edición Básica"] },
        { name: "Plan Crecimiento", price: "$210", priceBs: "Bs. 2.000", items: ["Foco: Redes (Ventas)", "8 Reels + 1 Corp.", "Viral Ingenioso", "2 Jornadas (8h)", "Luces + Mic + Modelo", "Edición Avanzada"] },
        { name: "Plan Dominio", price: "$300", priceBs: "Bs. 2.800", items: ["Foco: Redes (Elite)", "12 Reels + 2 Ads", "Estrategia Total", "Jornadas Flexibles", "Set + 2 Modelos", "Color + VFX"] }
      ],
      extra_plans_data: [
        { name: "Plan Foto Pro", price: "$220", priceBs: "Bs. 1.500", items: ["Marca y Producto", "20 Fotos Editadas", "Dirección de Arte", "1 Sesión (3-4h)", "Luces + Fondo", "Retoque Digital"] },
        { name: "Plan Eventos Pro", price: "$360", priceBs: "Bs. 2.500", items: ["Social y Ceremonial", "Video Cine + Recap", "Guion Narrativo", "Cobertura (Hasta 6h)", "Cámara Pro + Audio", "Edición Highlights"] }
      ],
      projects_data: [
        { title: "SPORT FIT", subtitle: "Fitness", color: "from-blue-500/20", img: "/video01.jpeg" },
        { title: "ZAMBRANOS", subtitle: "Auto servicio", color: "from-cyan-500/20", img: "/video02.jpeg" },
        { title: "CHINO BARBER", subtitle: "Barbería", color: "from-blue-600/20", img: "/video03.jpeg" },
        { title: "NOVAFIT", subtitle: "Fitness", color: "from-purple-500/20", img: "/video04.jpeg" },
        { title: "YOJA HAIR LOUNGE", subtitle: "Belleza", color: "from-red-500/20", img: "/video05.jpeg" }
      ],
      services_data: [
        { title: "Post-Producción", desc: "Edición rítmica en Premiere Pro y VFX avanzados en After Effects.", tag: "AE + PR", color: "from-red-500 to-orange-700", icon: Play },
        { title: "Identidad Visual", desc: "Sistemas visuales corporativos que proyectan autoridad y confianza absoluta.", tag: "Corporativa", color: "from-red-600 to-red-900", icon: Fingerprint },
        { title: "Producción y Eventos", desc: "Captura cinematográfica y cobertura de eventos de alto nivel con calidad 4K HDR.", tag: "Eventos", color: "from-red-400 to-red-600", icon: Camera },
        { title: "Grabación y Modelos", desc: "Dirección de talento y producción de contenido cinematográfico con modelos y actores en cualquier formato.", tag: "Grabación y Modelos", color: "from-red-500 to-red-800", icon: Layout }
      ]
    },
    en: {
      nav: ["Projects", "Services", "Plans", "Contact"],
      cta_nav: "WORK WITH US",
      hero_tag: "Post-Production & Strategy Studio 2026",
      hero_h1_1: "SYNC",
      hero_h1_2: "YOUR VISION",
      hero_p: "We don't just edit video. We design the frequency where your brand resonates with the world. Advanced AE/PR editing, visual identity, and cinematic capture in any format.",
      hero_btn_main: "START PROJECT",
      hero_btn_sec: "WATCH REEL",
      projects_h2: "OUR PROJECTS",
      projects_p: "High-impact edits optimized for maximum retention. We master vertical and horizontal formats for all social platforms.",
      plans_h2: "CONTENT CREATION PLANS",
      plans_p: "Monthly subscriptions designed for consistent growth and professional presence.",
      extra_plans_h2: "EXTRA PLANS",
      editing_plans_h2: "VIDEO EDITING PLANS",
      editing_plans_p: "One-time project editing solutions, tailored to the length and complexity of your footage.",
      editing_plans_data: [
        {
          name: "LITE (30s - 2min)",
          basic: { price: "$12", features: ["Error cleaning", "1 background track", "White balance", "48h Delivery"] },
          advanced: { price: "$20", features: ["Dynamic Cuts (Jump-cuts)", "Pop-ups/Emoji Subtitles", "Sound Design + SFX", "Pro Color Grading", "24-48h Delivery"] }
        },
        {
          name: "NARRATIVE (3 - 5min)",
          basic: { price: "$45", features: ["Standard pacing", "Static subtitles", "1 background track", "No color correction", "72h Delivery"] },
          advanced: { price: "$75", features: ["Rhythmic Storytelling", "Pro Highlighted Style", "Advanced Audio Mix", "Consistent Color Grading", "48-72h Delivery"] }
        },
        {
          name: "CINEMATIC (8 - 15min)",
          basic: { price: "$110", features: ["Clean linear montage", "Subs (if script provided)", "Basic catalog music", "No color correction", "4-5 days Delivery"] },
          advanced: { price: "$180", features: ["Pro Montage (Pacing)", "Stylized subtitles", "Immersive Audio + Licenses", "Cinematic Look", "3-5 days Delivery"] }
        }
      ],
      workflow_h2: "THE SYNC METHOD",
      workflow_p: "Technical mastery of After Effects and Premiere Pro. From idea to high-end final render.",
      trust_h2: "Why Sync Pro?",
      trust_items: [
        { t: "After Effects Workflow", d: "Custom motion graphics, no generic stock templates." },
        { t: "Optimized Delivery", d: "2026 codecs (AVIF/HEVC) for instant loading with zero quality loss." },
        { t: "Retention Strategy", d: "Videos psychologically designed to keep interest at its peak." }
      ],
      plans_data: [
        { name: "Impact Plan", price: "$150", priceBs: "Bs. 1,400", items: ["Focus: Social (Basic)", "4 Reels / TikToks", "Standard Scripting", "1 Session (4h)", "Lights + Mic", "Basic Editing"] },
        { name: "Growth Plan", price: "$210", priceBs: "Bs. 2,000", items: ["Focus: Social (Sales)", "8 Reels + 1 Corp.", "Viral Scripting", "2 Sessions (8h)", "Lights + Mic + Model", "Advanced Editing"] },
        { name: "Dominion Plan", price: "$300", priceBs: "Bs. 2,800", items: ["Focus: Social (Elite)", "12 Reels + 2 Ads", "Total Strategy", "Flexible Sessions", "Set + 2 Models", "Color + VFX"] }
      ],
      extra_plans_data: [
        { name: "Photo Pro Plan", price: "$220", priceBs: "Bs. 1,500", items: ["Brand & Product", "20 Edited Photos", "Art Direction", "1 Session (3-4h)", "Lights + Backdrop", "Digital Retouching"] },
        { name: "Events Pro Plan", price: "$360", priceBs: "Bs. 2,500", items: ["Social & Ceremonial", "Cine Video + Recap", "Narrative Script", "Coverage (Up to 6h)", "Pro Camera + Audio", "Highlights Editing"] }
      ],
      projects_data: [
        { title: "SPORT FIT", subtitle: "Fitness", color: "from-blue-500/20", img: "/video01.jpeg" },
        { title: "ZAMBRANOS", subtitle: "Auto Service", color: "from-cyan-500/20", img: "/video02.jpeg" },
        { title: "CHINO BARBER", subtitle: "Barber Shop", color: "from-blue-600/20", img: "/video03.jpeg" },
        { title: "NOVAFIT", subtitle: "Fitness", color: "from-purple-500/20", img: "/video04.jpeg" },
        { title: "YOJA HAIR LOUNGE", subtitle: "Beauty", color: "from-red-500/20", img: "/video05.jpeg" }
      ],
      services_data: [
        { title: "Post-Production", desc: "Rhythmic editing in Premiere Pro and advanced VFX in After Effects.", tag: "AE + PR", color: "from-red-500 to-orange-700", icon: Play },
        { title: "Visual Identity", desc: "Corporate visual systems that project authority and trust.", tag: "Corporate", color: "from-red-600 to-red-900", icon: Fingerprint },
        { title: "Production & Events", desc: "Cinematic capture of events, products, and corporate content.", tag: "Events", color: "from-red-400 to-red-600", icon: Camera },
        { title: "Shooting & Models", desc: "Talent direction and cinematic content production with models and actors in any format.", tag: "Shooting & Models", color: "from-red-500 to-red-800", icon: Layout }
      ]
    }
  };

  const t = translations[lang];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');
    const formData = new FormData(e.target);
    try {
      await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: formData, mode: 'no-cors' });
      setFormStatus('success');
      e.target.reset();
    } catch (err) {
      setFormStatus('idle');
      alert("Error");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-500/30 overflow-x-hidden relative">
      {/* 🌊 Fondo de Seda Líquida (Negro + Rojo) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{
            x: [-150, 150, -100],
            y: [-80, 80, -80],
            rotate: [-20, 10, -20],
            scale: [1, 1.3, 0.9, 1],
            borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "50% 50% 30% 70% / 50% 50% 70% 30%", "30% 70% 70% 30% / 30% 30% 70% 70%"],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[15%] -left-[10%] w-[140%] h-[140%] bg-[radial-gradient(ellipse_at_center,_rgba(220,38,38,0.08)_0%,transparent_65%)] blur-[100px]"
        />
        <motion.div 
          animate={{
            x: [150, -150, 100],
            y: [100, -100, 100],
            rotate: [20, -10, 20],
            scale: [1, 0.8, 1.2, 1],
            borderRadius: ["70% 30% 30% 70% / 70% 70% 30% 30%", "30% 70% 70% 30% / 30% 30% 70% 70%", "70% 30% 30% 70% / 70% 70% 30% 30%"],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[5%] -right-[25%] w-[110%] h-[130%] bg-[radial-gradient(ellipse_at_center,_rgba(153,27,27,0.06)_0%,transparent_65%)] blur-[120px]"
        />
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3%3Cfilter id='noiseFilter'%3%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3%3C/filter%3%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3%3C/svg%3")` }} />
      </div>

      <div className="relative z-10">
        <div className="fixed inset-0 pointer-events-none z-[60] opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

        <nav className="fixed top-0 w-full z-[100] px-4 md:px-10 py-4 md:py-6 flex justify-between items-center backdrop-blur-xl bg-black/40 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-red-600 rounded-lg md:rounded-xl flex items-center justify-center font-black text-white italic shadow-[0_0_20px_rgba(220,38,38,0.4)]">S</div>
            <span className="text-lg md:text-xl font-black tracking-tighter uppercase italic">Sync Pro</span>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden lg:flex gap-10 text-[11px] font-bold text-gray-400 tracking-[0.2em] uppercase">
              {t.nav.map((item, i) => <a key={i} href={`#${item.toLowerCase()}`} className="hover:text-red-500 transition-colors">{item}</a>)}
            </div>
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] md:text-[10px] font-bold uppercase tracking-widest"><Globe className="w-3 h-3 text-red-500" /> {lang.toUpperCase()}</button>
            <button className="hidden sm:block bg-white text-black px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-widest">{t.cta_nav}</button>
          </div>
        </nav>

        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-6 text-center py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent pointer-events-none" />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-5xl mx-auto">
            <span className="inline-block border border-red-500/30 px-4 md:px-5 py-1.5 rounded-full text-[8px] md:text-[9px] tracking-[0.3em] md:tracking-[0.4em] uppercase text-red-500 mb-6 md:mb-8 bg-red-500/5 font-bold">{t.hero_tag}</span>
            <h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[145px] font-black mb-6 md:mb-8 leading-[0.9] tracking-tighter italic uppercase px-2">
              {t.hero_h1_1} <br />
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-red-600 pr-4 md:pr-12">
                {t.hero_h1_2}
              </span>
            </h1>
            <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto mb-10 md:mb-12 font-light px-4">{t.hero_p}</p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center px-6">
              <button className="bg-red-600 text-white font-black px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl flex items-center justify-center gap-3 uppercase tracking-tighter shadow-lg text-sm md:text-base w-full sm:w-auto">{t.hero_btn_main} <ArrowRight className="w-5 h-5" /></button>
              <button className="border border-white/10 bg-white/5 backdrop-blur-md px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-[10px] md:text-xs w-full sm:w-auto"><Play className="w-4 h-4 fill-current" /> {t.hero_btn_sec}</button>
            </div>
          </motion.div>
        </section>

      {/* Galería Proyectos */}
      <section id="proyectos" className="py-16 md:py-24 px-4 md:px-6 max-w-[1600px] mx-auto overflow-hidden">
        <div className="mb-10 md:mb-16 px-2">
          <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase mb-4">Nuestros <span className="text-red-500">PROYECTOS</span></h2>
          <p className="text-gray-500 text-base md:text-lg max-w-xl">{t.projects_p}</p>
        </div>
        <div className="flex overflow-x-auto gap-4 md:gap-8 pb-20 pt-10 no-scrollbar snap-x px-4 md:px-10">
          {t.projects_data.map((proj, i) => (
            <motion.div 
              key={i} 
              whileHover={{ 
                y: -15,
                scale: 1.03,
                zIndex: 50
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative min-w-[225px] md:min-w-[324px] aspect-[9/16] rounded-xl md:rounded-2xl overflow-hidden group snap-center border-2 border-white/20 shadow-2xl transform-gpu cursor-pointer"
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
              onMouseEnter={(e) => { const v = e.currentTarget.querySelector('video'); if (v) v.play(); }}
              onMouseLeave={(e) => { const v = e.currentTarget.querySelector('video'); if (v) { v.pause(); v.currentTime = 0; } }}
            >
              {/* Contenedor de Imagen / Video con Zoom y Filtro Negro */}
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-106">
                <img src={proj.img} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <video src={`/cuadro-${i + 1}.mp4`} className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity" muted loop playsInline />
                
                {/* Black Filter Overlay - Even Lighter (20%) */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700 z-10" />
              </div>

              {/* Overlay Gradient for Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-8 md:p-12 flex flex-col justify-end z-20">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl md:text-3xl font-black italic tracking-tighter leading-none mb-1 uppercase drop-shadow-2xl">{proj.title}</h3>
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <p className="text-[10px] md:text-[12px] font-black text-red-500 tracking-[0.2em] uppercase">{proj.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Glow sutil */}
              <div className="absolute inset-0 border-[3px] border-red-500/0 group-hover:border-red-500/30 rounded-xl md:rounded-2xl transition-all duration-500 pointer-events-none z-30" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Servicios Bento */}
      {false && (
      <section id="servicios" className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          <div className="lg:col-span-7 bg-[#0a0a0a] rounded-[30px] md:rounded-[40px] p-8 md:p-12 min-h-[350px] md:min-h-[450px] flex flex-col justify-end relative overflow-hidden">
             <div className={`absolute inset-0 bg-gradient-to-br ${t.services_data[activeService].color} opacity-10`} />
             <div className="relative z-10">
                <span className="px-3 py-1 md:px-4 md:py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] md:text-[10px] font-black tracking-widest mb-4 md:mb-6 inline-block">{t.services_data[activeService].tag}</span>
                <h3 className="text-3xl md:text-5xl font-black italic tracking-tighter mb-4 md:mb-6">{t.services_data[activeService].title}</h3>
                <p className="text-base md:text-xl text-gray-500 max-w-xl">{t.services_data[activeService].desc}</p>
             </div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-3 md:gap-4">
            {t.services_data.map((s, idx) => {
              const Icon = s.icon;
              return (
                <button key={idx} onClick={() => setActiveService(idx)} className={`flex items-center gap-4 md:gap-6 p-6 md:p-8 rounded-[24px] md:rounded-[32px] border transition-all text-left ${activeService === idx ? 'bg-white/5 border-white/20 ring-1 ring-cyan-500/20' : 'opacity-30'}`}>
                   <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br ${s.color} text-black`}><Icon className="w-5 h-5" /></div>
                   <div><h4 className="text-lg md:text-xl font-black italic leading-tight">{s.title}</h4><p className="text-[9px] font-black uppercase text-gray-600">{s.tag}</p></div>
                </button>
              )
            })}
          </div>
        </div>
      </section>
      )}

      {/* Planes de Edición de Video */}
      <section id="planes-edicion" className="py-20 md:py-32 px-4 md:px-6 max-w-[1600px] mx-auto">
        <div className="mb-16 md:mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-6 text-white leading-tight">Planes de <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-red-600 px-2">EDICIÓN DE VIDEO</span></h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">{t.editing_plans_p}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {t.editing_plans_data.map((plan, i) => (
            <div 
              key={i} 
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty("--x", `${x}px`);
                e.currentTarget.style.setProperty("--y", `${y}px`);
              }}
              className="relative rounded-[40px] overflow-hidden p-[1px] group transition-all duration-500 hover:scale-[1.03] hover:z-50 shadow-2xl bg-white/5"
              style={{ "--x": "0px", "--y": "0px" }}
            >
              {/* Snake Border - Active only on Hover */}
              <div 
                className="absolute inset-[-1000%] animate-[spin_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_85%,#ef4444_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ animationDuration: '4s' }}
              />

              {/* Card Container with Persistent Subtle Border */}
              <div className="relative bg-[#0a0a0a] rounded-[39px] h-full flex flex-col overflow-hidden border border-blue-500/10">
                {/* 💡 Spotlight Tracking Effect - Soft & Wide */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                     style={{ background: "radial-gradient(675px circle at var(--x) var(--y), rgba(239,68,68,0.07), transparent 40%)" }} />
                <div className="p-8 md:p-10 relative z-10 flex flex-col h-full">
                  <h3 className="text-xl md:text-2xl font-black italic mb-8 uppercase tracking-tight text-center">{plan.name}</h3>
                  
                  {/* Básico */}
                  <div className="mb-10">
                    <div className="flex justify-between items-end mb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Bloque A: Básico</span>
                      <span className="text-3xl font-black text-white">{plan.basic.price}</span>
                    </div>
                    <ul className="space-y-2">
                      {plan.basic.features.map((f, idx) => (
                        <li key={idx} className="text-[11px] text-gray-400 flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-gray-600" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8" />

                  {/* Avanzado */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-end mb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-red-500">Bloque B: Avanzado</span>
                      <span className="text-3xl font-black text-red-600 transition-all group-hover:drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]">{plan.advanced.price}</span>
                    </div>
                    <ul className="space-y-2">
                      {plan.advanced.features.map((f, idx) => (
                        <li key={idx} className="text-[11px] text-white/80 flex items-center gap-2 font-medium">
                          <CheckCircle2 className="w-3 h-3 text-red-600" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="w-full py-5 bg-white/5 group-hover:bg-red-600 group-hover:text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 rounded-2xl mt-10">Seleccionar Plan</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Planes de Creación de Contenido */}
      {false && (
      <section id="planes" className="py-20 md:py-32 px-4 md:px-6 max-w-[1600px] mx-auto">
        <div className="mb-16 md:mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-6 text-white leading-tight">Planes de <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-red-600 px-2">CREACIÓN DE CONTENIDO</span></h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">{t.plans_p}</p>
        </div>
        
        {/* Planes Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
          {t.plans_data.map((plan, i) => (
            <div 
              key={i} 
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty("--x", `${x}px`);
                e.currentTarget.style.setProperty("--y", `${y}px`);
              }}
              className="relative rounded-[40px] overflow-hidden p-[1px] group transition-all duration-500 hover:scale-[1.03] hover:z-50 shadow-2xl bg-white/5"
              style={{ "--x": "0px", "--y": "0px" }}
            >
              {/* Snake Border - Active only on Hover */}
              <div 
                className="absolute inset-[-1000%] animate-[spin_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_85%,#ef4444_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ animationDuration: '4s' }}
              />

              <div className="relative rounded-[39px] h-full flex flex-col overflow-hidden p-8 bg-[#0a0a0a] border border-green-500/10">
                {/* 💡 Spotlight Tracking Effect - Soft & Wide */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                     style={{ background: "radial-gradient(675px circle at var(--x) var(--y), rgba(34,197,94,0.07), transparent 40%)" }} />
                <div className="relative z-10 flex flex-col h-full">
                  <h3 className="text-2xl font-black italic mb-4 uppercase leading-tight">{plan.name}</h3>
                  <div className="mb-8">
                    <div className="text-4xl font-black text-white leading-none mb-1">{plan.priceBs}</div>
                    <div className="text-2xl font-bold text-red-500/80 transition-all group-hover:text-red-400">{plan.price} <span className="text-[10px] text-gray-500 uppercase tracking-tighter">usd</span></div>
                  </div>
                  <ul className="space-y-3 mb-10 flex-grow">
                    {plan.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs text-gray-400 font-medium leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-5 bg-white/5 group-hover:bg-red-600 group-hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">Seleccionar</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sección Planes Extra */}
        <div className="mt-32">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase mb-6 leading-none text-white text-center">Planes <span className="text-red-500">EXTRA</span></h2>
            <div className="w-20 h-1 bg-white/10 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {t.extra_plans_data.map((plan, i) => (
              <div 
                key={i} 
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty("--x", `${x}px`);
                  e.currentTarget.style.setProperty("--y", `${y}px`);
                }}
                className="relative rounded-[40px] overflow-hidden p-[1px] group transition-all duration-500 hover:scale-[1.03] hover:z-50 shadow-2xl bg-white/5"
                style={{ "--x": "0px", "--y": "0px" }}
              >
                {/* Snake Border - Active only on Hover (Red) */}
                <div 
                  className="absolute inset-[-1000%] animate-[spin_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_85%,#ef4444_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ animationDuration: '4s' }}
                />

                <div className="relative rounded-[39px] h-full flex flex-col overflow-hidden p-8 bg-[#0a0a0a] border border-red-500/10">
                  {/* 💡 Spotlight Tracking Effect - Soft & Wide (Red) */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                       style={{ background: "radial-gradient(675px circle at var(--x) var(--y), rgba(239,68,68,0.07), transparent 40%)" }} />
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-2xl font-black italic mb-4 uppercase leading-tight text-white/70">{plan.name}</h3>
                    <div className="mb-8">
                      <div className="text-4xl font-black text-white/90 leading-none mb-1">{plan.priceBs}</div>
                      <div className="text-2xl font-bold text-gray-500 transition-all group-hover:text-white">{plan.price} <span className="text-[10px] text-gray-600 uppercase tracking-tighter">usd</span></div>
                    </div>
                    <ul className="space-y-3 mb-10 flex-grow">
                      {plan.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs text-gray-500 font-medium leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" /> {item}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full py-5 bg-white/5 group-hover:bg-white group-hover:text-black rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">Seleccionar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Contacto */}
      <section id="contacto" className="py-20 md:py-32 px-4 md:px-6 max-w-4xl mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black italic text-center uppercase tracking-tighter leading-none">
            ¿LISTO PARA EL <br /> SIGUIENTE <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">NIVEL</span>
            <span className="text-cyan-500">?</span>
          </h2>
        </div>
        
        <div className="bg-white/5 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 text-center max-w-2xl mx-auto">
          {formStatus === 'success' ? (
            <div className="py-16 md:py-20"><CheckCircle2 className="w-16 h-16 md:w-20 md:h-20 text-cyan-400 mx-auto mb-6" /><h3 className="text-2xl md:text-3xl font-black italic uppercase">Synced / Listo</h3></div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-5 md:space-y-6 text-left">
              <input type="text" name="nombre" required placeholder="Nombre" className="w-full bg-black/40 border border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-4 md:py-5 text-sm focus:border-red-500 outline-none transition-all" />
              <input type="email" name="email" required placeholder="Email" className="w-full bg-black/40 border border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-4 md:py-5 text-sm focus:border-red-500 outline-none transition-all" />
              <textarea name="vision" required placeholder="Tu visión..." rows="4" className="w-full bg-black/40 border border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-4 md:py-5 text-sm focus:border-red-500 outline-none transition-all"></textarea>
              <button type="submit" disabled={formStatus === 'loading'} className="w-full py-5 md:py-6 bg-red-600 text-white rounded-xl md:rounded-2xl font-black text-base md:text-lg uppercase transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)]">{formStatus === 'loading' ? '...' : 'INICIAR PROYECTO'}</button>
            </form>
          )}
        </div>
      </section>

      <footer className="py-16 md:py-20 border-t border-white/5 text-center text-[8px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.5em] text-gray-800 uppercase px-6">
        © 2026 Sync Pro Studio // Bolivia // Global Reach
      </footer>
      </div>
    </div>
  );
};

export default App;
