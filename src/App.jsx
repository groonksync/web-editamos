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
      hero_p: "No solo editamos video. Diseñamos la frecuencia en la que tu marca resuena con el mundo. Edición avanzada en AE/PR, identidad visual y captura cinematográfica.",
      hero_btn_main: "INICIAR PROYECTO",
      hero_btn_sec: "VER SHOWREEL",
      projects_h2: "CURADURÍA DE PROYECTOS",
      projects_p: "Ediciones verticales de alto impacto optimizadas para la retención máxima en Reels y TikTok.",
      plans_h2: "PLANES PARA EMPRESAS",
      plans_p: "Suscripciones de contenido diseñadas para un crecimiento constante y profesional.",
      workflow_h2: "EL MÉTODO SYNC",
      workflow_p: "Dominio técnico de After Effects y Premiere Pro. De la idea al render final de alta gama.",
      trust_h2: "¿Por qué Sync Pro?",
      trust_items: [
        { t: "After Effects Workflow", d: "Motion graphics personalizados, no plantillas de stock genéricas." },
        { t: "Entrega Optimizada", d: "Codecs 2026 (AVIF/HEVC) para carga instantánea sin pérdida de calidad." },
        { t: "Estrategia de Retención", d: "Videos diseñados psicológicamente para mantener el interés al máximo." }
      ],
      plans_data: [
        { name: "Starter Content", price: "$899", items: ["4 Reels Premium", "Edición AE básica", "1 Sesión de Grabación", "Optimización SEO"] },
        { name: "Growth Engine", price: "$1,899", items: ["12 Reels Premium", "VFX Avanzados en AE", "2 Sesiones de Grabación", "Estrategia Mensual"], popular: true },
        { name: "Brand Authority", price: "$3,499", items: ["Contenido Ilimitado", "Identidad Visual Completa", "Cobertura de Eventos", "Director Creativo Dedicado"] }
      ],
      projects_data: [
        { title: "RECAP", subtitle: "HYPERLAPSE", color: "from-blue-500/20", img: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=400" },
        { title: "VILLA", subtitle: "EDIT", color: "from-cyan-500/20", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=400" },
        { title: "CLUB", subtitle: "ENERGY", color: "from-blue-600/20", img: "https://images.unsplash.com/photo-1551028150-64b9f398f678?auto=format&fit=crop&q=80&w=400" },
        { title: "SOCIAL", subtitle: "MASTERY", color: "from-purple-500/20", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400" },
        { title: "SPEED", subtitle: "RAMPING", color: "from-red-500/20", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=400" }
      ],
      services_data: [
        { title: "Post-Producción", desc: "Edición rítmica en Premiere Pro y VFX avanzados en After Effects.", tag: "AE + PR", color: "from-cyan-400 to-blue-600", icon: Play },
        { title: "Identidad Visual", desc: "ADN visual para marcas disruptivas que buscan diferenciación.", tag: "Branding", color: "from-purple-500 to-pink-600", icon: Fingerprint },
        { title: "Producción & Foto", desc: "Captura cinematográfica de eventos, productos y contenido corporativo.", tag: "Filmación", color: "from-orange-400 to-red-500", icon: Camera },
        { title: "Estrategia", desc: "Storytelling vertical diseñado para potenciar el crecimiento orgánico.", tag: "Content", color: "from-green-400 to-emerald-600", icon: Layout }
      ]
    },
    en: {
      nav: ["Projects", "Services", "Plans", "Contact"],
      cta_nav: "WORK WITH US",
      hero_tag: "Post-Production & Strategy Studio 2026",
      hero_h1_1: "SYNC",
      hero_h1_2: "YOUR VISION",
      hero_p: "We don't just edit video. We design the frequency where your brand resonates with the world. Advanced AE/PR editing, visual identity, and cinematic capture.",
      hero_btn_main: "START PROJECT",
      hero_btn_sec: "WATCH REEL",
      projects_h2: "PROJECT CURATION",
      projects_p: "High-impact vertical edits optimized for maximum retention on Reels and TikTok.",
      plans_h2: "BUSINESS PLANS",
      plans_p: "Content subscriptions designed for consistent and professional growth.",
      workflow_h2: "THE SYNC METHOD",
      workflow_p: "Technical mastery of After Effects and Premiere Pro. From idea to high-end final render.",
      trust_h2: "Why Sync Pro?",
      trust_items: [
        { t: "After Effects Workflow", d: "Custom motion graphics, no generic stock templates." },
        { t: "Optimized Delivery", d: "2026 codecs (AVIF/HEVC) for instant loading with zero quality loss." },
        { t: "Retention Strategy", d: "Videos psychologically designed to keep interest at its peak." }
      ],
      plans_data: [
        { name: "Starter Content", price: "$899", items: ["4 Premium Reels", "Basic AE Editing", "1 Recording Session", "SEO Optimization"] },
        { name: "Growth Engine", price: "$1,899", items: ["12 Premium Reels", "Advanced AE VFX", "2 Recording Sessions", "Monthly Strategy"], popular: true },
        { name: "Brand Authority", price: "$3,499", items: ["Unlimited Content", "Full Visual Identity", "Event Coverage", "Dedicated Creative Director"] }
      ],
      projects_data: [
        { title: "RECAP", subtitle: "HYPERLAPSE", color: "from-blue-500/20", img: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=400" },
        { title: "VILLA", subtitle: "EDIT", color: "from-cyan-500/20", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=400" },
        { title: "CLUB", subtitle: "ENERGY", color: "from-blue-600/20", img: "https://images.unsplash.com/photo-1551028150-64b9f398f678?auto=format&fit=crop&q=80&w=400" },
        { title: "SOCIAL", subtitle: "MASTERY", color: "from-purple-500/20", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400" },
        { title: "SPEED", subtitle: "RAMPING", color: "from-red-500/20", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=400" }
      ],
      services_data: [
        { title: "Post-Production", desc: "Rhythmic editing in Premiere Pro and advanced VFX in After Effects.", tag: "AE + PR", color: "from-cyan-400 to-blue-600", icon: Play },
        { title: "Visual Identity", desc: "Visual DNA for disruptive brands seeking differentiation.", tag: "Branding", color: "from-purple-500 to-pink-600", icon: Fingerprint },
        { title: "Production & Photo", desc: "Cinematic capture of events, products, and corporate content.", tag: "Filming", color: "from-orange-400 to-red-500", icon: Camera },
        { title: "Content Strategy", desc: "Vertical storytelling designed to power organic growth.", tag: "Content", color: "from-green-400 to-emerald-600", icon: Layout }
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
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-[60] opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      <nav className="fixed top-0 w-full z-[100] px-6 py-6 flex justify-between items-center backdrop-blur-xl bg-black/40 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center font-black text-black italic shadow-[0_0_20px_rgba(34,211,238,0.4)]">S</div>
          <span className="text-xl font-black tracking-tighter uppercase italic">Sync Pro</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-10 text-[11px] font-bold text-gray-400 tracking-[0.2em] uppercase">
            {t.nav.map((item, i) => <a key={i} href={`#${item.toLowerCase()}`} className="hover:text-cyan-400 transition-colors">{item}</a>)}
          </div>
          <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest"><Globe className="w-3 h-3 text-cyan-400" /> {lang.toUpperCase()}</button>
          <button className="hidden sm:block bg-white text-black px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest">{t.cta_nav}</button>
        </div>
      </nav>

      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-black to-black opacity-80" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="z-10 max-w-5xl">
          <span className="inline-block border border-cyan-500/30 px-5 py-1.5 rounded-full text-[9px] tracking-[0.4em] uppercase text-cyan-400 mb-8 bg-cyan-500/5 font-bold">{t.hero_tag}</span>
          <h1 className="text-6xl md:text-[110px] font-black mb-8 leading-[0.85] tracking-tighter italic uppercase">{t.hero_h1_1} <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">{t.hero_h1_2}</span></h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light">{t.hero_p}</p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button className="bg-cyan-500 text-black font-black px-10 py-5 rounded-2xl flex items-center justify-center gap-3 uppercase tracking-tighter shadow-lg">{t.hero_btn_main} <ArrowRight className="w-5 h-5" /></button>
            <button className="border border-white/10 bg-white/5 backdrop-blur-md px-10 py-5 rounded-2xl flex items-center gap-3 font-bold uppercase tracking-widest text-xs"><Play className="w-4 h-4 fill-current" /> {t.hero_btn_sec}</button>
          </div>
        </motion.div>
      </section>

      {/* Galería Proyectos */}
      <section id="proyectos" className="py-24 px-6 max-w-[1600px] mx-auto overflow-hidden">
        <div className="mb-16"><h2 className="text-5xl font-black italic tracking-tighter uppercase mb-4">{t.projects_h2}</h2><p className="text-gray-500 text-lg">{t.projects_p}</p></div>
        <div className="flex overflow-x-auto gap-6 pb-12 no-scrollbar snap-x">
          {t.projects_data.map((proj, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -15 }}
              className="relative min-w-[280px] md:min-w-[360px] aspect-[9/16] rounded-[40px] overflow-hidden group snap-center border border-white/5 shadow-2xl"
              onMouseEnter={(e) => { const v = e.currentTarget.querySelector('video'); if (v) v.play(); }}
              onMouseLeave={(e) => { const v = e.currentTarget.querySelector('video'); if (v) { v.pause(); v.currentTime = 0; } }}
            >
              <img src={proj.img} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
              <video src={`https://drive.google.com/uc?export=download&id=${videoIds[i]}`} className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity" muted loop playsInline />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-10 flex flex-col justify-end">
                <h3 className="text-4xl font-black italic tracking-tighter leading-none mb-2">{proj.title}</h3>
                <p className="text-[10px] font-black text-cyan-400 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">{proj.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Servicios Bento */}
      <section id="servicios" class="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div class="lg:col-span-7 bg-[#0a0a0a] rounded-[40px] p-12 min-h-[450px] flex flex-col justify-end relative overflow-hidden">
             <div class={`absolute inset-0 bg-gradient-to-br ${t.services_data[activeService].color} opacity-10`} />
             <div class="relative z-10">
                <span class="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black tracking-widest mb-6 inline-block">{t.services_data[activeService].tag}</span>
                <h3 class="text-5xl font-black italic tracking-tighter mb-6">{t.services_data[activeService].title}</h3>
                <p class="text-xl text-gray-500 max-w-xl">{t.services_data[activeService].desc}</p>
             </div>
          </div>
          <div class="lg:col-span-5 flex flex-col gap-4">
            {t.services_data.map((s, idx) => {
              const Icon = s.icon;
              return (
                <button key={idx} onClick={() => setActiveService(idx)} class={`flex items-center gap-6 p-8 rounded-[32px] border transition-all text-left ${activeService === idx ? 'bg-white/5 border-white/20 ring-1 ring-cyan-500/20' : 'opacity-30'}`}>
                   <div class={`p-4 rounded-2xl bg-gradient-to-br ${s.color} text-black`}><Icon className="w-5 h-5" /></div>
                   <div><h4 class="text-xl font-black italic">{s.title}</h4><p class="text-[10px] font-black uppercase text-gray-600">{s.tag}</p></div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Planes */}
      <section id="planes" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.plans_data.map((plan, i) => (
            <div key={i} className={`p-10 rounded-[40px] border transition-all ${plan.popular ? 'border-cyan-500/50 scale-105 bg-white/5 shadow-xl' : 'border-white/5 bg-[#0a0a0a]'}`}>
              {plan.popular && <div className="text-cyan-500 text-[10px] font-black uppercase mb-4">Most Popular</div>}
              <h3 className="text-2xl font-black italic mb-2 uppercase">{plan.name}</h3>
              <div className="text-5xl font-black text-cyan-500 mb-8">{plan.price}</div>
              <ul className="space-y-4 mb-10">
                {plan.items.map((item, idx) => <li key={idx} className="flex items-center gap-3 text-sm text-gray-400 font-medium"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> {item}</li>)}
              </ul>
              <button className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest ${plan.popular ? 'bg-cyan-500 text-black' : 'bg-white/5 hover:bg-white hover:text-black transition-all'}`}>Get Started</button>
            </div>
          ))}
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-32 px-6 max-w-2xl mx-auto">
        <div className="bg-white/5 p-12 rounded-[3rem] border border-white/10 text-center">
          {formStatus === 'success' ? (
            <div className="py-20"><CheckCircle2 className="w-20 h-20 text-cyan-400 mx-auto mb-6" /><h3 className="text-3xl font-black italic uppercase">Synced / Listo</h3></div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6 text-left">
              <h2 className="text-4xl font-black italic text-center uppercase tracking-tighter mb-10">Conectar</h2>
              <input type="text" name="nombre" required placeholder="Nombre" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 text-sm focus:border-cyan-500 outline-none transition-all" />
              <input type="email" name="email" required placeholder="Email" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 text-sm focus:border-cyan-500 outline-none transition-all" />
              <textarea name="vision" required placeholder="Tu visión..." rows="4" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 text-sm focus:border-cyan-500 outline-none transition-all"></textarea>
              <button type="submit" disabled={formStatus === 'loading'} className="w-full py-6 bg-cyan-500 text-black rounded-2xl font-black text-lg uppercase transition-all">{formStatus === 'loading' ? '...' : 'INICIAR PROYECTO'}</button>
            </form>
          )}
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 text-center text-[10px] font-black tracking-[0.5em] text-gray-800 uppercase">
        © 2026 Sync Pro Studio // Bolivia // Global Reach
      </footer>
    </div>
  );
};

export default App;
