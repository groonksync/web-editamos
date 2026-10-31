import React, { useState, useEffect, useRef } from 'react';
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
  Clock,
  Download
} from 'lucide-react';

/* Componente para reproducir directamente cada video sin botón Play en el medio */
const DirectProjectCard = ({ proj, index }) => {
  const cardRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;
        if (entry.isIntersecting) {
          videoRef.current.play().catch(() => {});
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div 
      ref={cardRef}
      whileHover={{ 
        y: -15,
        scale: 1.03,
        zIndex: 50
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative min-w-[225px] md:min-w-[324px] aspect-[9/16] rounded-xl md:rounded-2xl overflow-hidden group snap-center border-2 border-zinc-200 shadow-2xl transform-gpu cursor-pointer bg-zinc-100"
      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
    >
      {/* Video que se reproduce directamente sin botón Play en el centro */}
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
        <video
          ref={videoRef}
          src={`/cuadro-${index + 1}.mp4`}
          poster={proj.img}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        
        {/* Sutil capa para contraste del texto inferior */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700 z-10" />
      </div>

      {/* Overlay Gradient for Text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 md:p-12 flex flex-col justify-end z-20 pointer-events-none">
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-xl md:text-3xl font-black italic tracking-tighter leading-none mb-1 uppercase text-white drop-shadow-2xl">{proj.title}</h3>
          <div className="flex items-center gap-3 opacity-90 group-hover:opacity-100 transition-all duration-500">
            <p className="text-[10px] md:text-[12px] font-black text-zinc-300 tracking-[0.2em] uppercase">{proj.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Borde sutil en hover */}
      <div className="absolute inset-0 border-[3px] border-zinc-400/0 group-hover:border-zinc-400/40 rounded-xl md:rounded-2xl transition-all duration-500 pointer-events-none z-30" />
    </motion.div>
  );
};

const App = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .no-scrollbar::-webkit-scrollbar {
        height: 4px;
      }
      .no-scrollbar::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.05);
        border-radius: 20px;
        margin-inline: 40px;
      }
      .no-scrollbar::-webkit-scrollbar-thumb {
        background: #a1a1aa;
        border-radius: 20px;
      }
      .no-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: #a1a1aa rgba(0, 0, 0, 0.05);
      }
      /* Parche para el texto vertical de PayPal */
      [id^="paypal-container-"] .paypal-hosted-button-label,
      [id^="paypal-container-"] .paypal-hosted-button-product-name,
      [id^="paypal-container-"] .paypal-hosted-button-price {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Integración de PayPal Business
  useEffect(() => {
    const containerId = "paypal-container-MQ99WW5GG2UN2";
    const hostedButtonId = "MQ99WW5GG2UN2";
    const clientId = "BAAsXBDCHVxt-9cTz_3HQXjl5xfqGd32GXkCiEcl-yZzUjmPBGzvwFo-awTgexUIeKj0LK_zU0VxehbdVk";

    const existingScript = document.querySelector(`script[src*="${clientId}"]`);
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&components=hosted-buttons&disable-funding=venmo&currency=USD`;
    script.async = true;
    
    script.onload = () => {
      if (window.paypal) {
        window.paypal.HostedButtons({
          hostedButtonId: hostedButtonId,
        }).render(`#${containerId}`);
      }
    };

    document.body.appendChild(script);
  }, []);

  const [lang, setLang] = useState('es'); 
  const [activeService, setActiveService] = useState(0);
  const [activeDuration, setActiveDuration] = useState(1);
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
      nav: ["Proyectos", "Herramientas", "Planes", "Contacto"],
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
      editing_plans_p: "Selecciona la duración de tu video y compara nuestras opciones de edición inmobiliaria y comercial.",
      editing_plans_data: [
        {
          duration: "Hasta 30 seg",
          tag: "Micro-Reel",
          basic: {
            name: "Edición Básica",
            subtitle: "Ágil, directo y comercial para venta rápida",
            price: "Bs. 120",
            features: [
              "Marcado de terreno: Línea perimetral sobre la toma de dron",
              "Voz con IA: Locutor profesional leyendo tu guion",
              "Contenido con IA: Hasta 5 imágenes + 1 video animado corto",
              "Textos clave: Precio, tamaño en m², zona y contacto",
              "1 cambio o ajuste incluido"
            ]
          },
          advanced: {
            name: "Edición Avanzada",
            badge: "Alto Impacto / Recomendado",
            subtitle: "Alta gama para preventas, urbanizaciones y proyección a futuro",
            price: "Bs. 220",
            features: [
              "Marcado de precisión: Trazado del terreno con seguimiento del dron",
              "Señaladores flotantes en el mapa para ubicar accesos clave",
              "Títulos con relieve y estilo 3D (fáciles de leer en celulares)",
              "Voz de locutor con IA con entonación comercial prémium",
              "Contenido con IA: Hasta 3 videos animados + imágenes conceptuales",
              "Color de cine: Áreas verdes vivas y cielo azul nítido",
              "Hasta 2 cambios o ajustes incluidos"
            ]
          }
        },
        {
          duration: "31 a 60 seg",
          tag: "Estándar",
          basic: {
            name: "Edición Básica",
            subtitle: "Ágil, directo y comercial para venta rápida",
            price: "Bs. 180",
            features: [
              "Marcado de terreno con seguimiento de la toma",
              "Voz con IA completa para explicar la oportunidad",
              "Contenido con IA: Hasta 5 imágenes + 1 video animado corto",
              "Textos informativos: Servicios básicos, accesos y cuotas",
              "1 cambio o ajuste incluido"
            ]
          },
          advanced: {
            name: "Edición Avanzada",
            badge: "Alto Impacto / Recomendado",
            subtitle: "Alta gama para preventas, urbanizaciones y proyección a futuro",
            price: "Bs. 320",
            features: [
              "Marcado de precisión y seguimiento dinámico en movimiento",
              "Señaladores flotantes de puntos estratégicos de la zona",
              "Títulos con relieve y estilo 3D con efectos de impacto",
              "Voz de locutor con IA comercial y persuasiva",
              "Contenido con IA: Hasta 3 videos animados + imágenes del proyecto a futuro",
              "Color de cine y sonido profesional",
              "Hasta 2 cambios o ajustes incluidos"
            ]
          }
        },
        {
          duration: "61 a 90 seg",
          tag: "Recorrido",
          basic: {
            name: "Edición Básica",
            subtitle: "Ágil, directo y comercial para venta rápida",
            price: "Bs. 250",
            features: [
              "Marcado de terreno + tomas del entorno cercano",
              "Voz con IA adaptada a guiones más largos",
              "Contenido con IA: Hasta 5 imágenes + 1 video animado corto",
              "Textos detallados de ventajas y vías de transporte",
              "1 cambio o ajuste incluido"
            ]
          },
          advanced: {
            name: "Edición Avanzada",
            badge: "Alto Impacto / Recomendado",
            subtitle: "Alta gama para preventas, urbanizaciones y proyección a futuro",
            price: "Bs. 430",
            features: [
              "Marcado de precisión completo del lote y avenidas",
              "Señaladores flotantes urbanos (escuelas, comercios, transporte)",
              "Títulos con relieve y estilo 3D para cuotas y plusvalía",
              "Voz de locutor con IA publicitaria de alto nivel",
              "Contenido con IA: Hasta 3 videos animados + imágenes conceptuales",
              "Acabado cinematográfico de lujo en tomas de dron y tierra",
              "Hasta 2 cambios o ajustes incluidos"
            ]
          }
        },
        {
          duration: "91 a 120 seg",
          tag: "Master Plan",
          basic: {
            name: "Edición Básica",
            subtitle: "Ágil, directo y comercial para venta rápida",
            price: "Bs. 320",
            features: [
              "Recorrido completo del lote y accesos principales",
              "Voz con IA para proyectos con información amplia",
              "Contenido con IA: Hasta 5 imágenes + 1 video animado corto",
              "Pantalla final de contacto con todos los datos de tu empresa",
              "1 cambio o ajuste incluido"
            ]
          },
          advanced: {
            name: "Edición Avanzada",
            badge: "Alto Impacto / Recomendado",
            subtitle: "Alta gama para preventas, urbanizaciones y proyección a futuro",
            price: "Bs. 550",
            features: [
              "Presentación integral de proyecto o urbanización (Master Plan)",
              "Marcado de precisión y señaladores de todo el entorno",
              "Títulos con relieve y estilo 3D de alta gama",
              "Voz de locutor con IA prémium para narración comercial",
              "Contenido con IA: Hasta 3 videos animados + imágenes de áreas sociales y casas",
              "Color y sonido de máxima fidelidad",
              "Hasta 2 cambios o ajustes incluidos"
            ]
          }
        }
      ],
      editing_extras: [
        { price: "+Bs. 50", label: "Video IA extra" },
        { price: "+Bs. 80", label: "Terreno adicional" },
        { price: "+Bs. 30 / 60", label: "Ajuste extra" },
        { price: "+Bs. 60 / 100", label: "Cada +30 seg extras" }
      ],
      select_basic_btn: "Seleccionar Básica",
      select_advanced_btn: "Seleccionar Avanzada",
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
        { title: "YOJA HAIR LOUNGE", subtitle: "Belleza", color: "from-zinc-400/20", img: "/video05.jpeg" }
      ],
      services_data: [
        { title: "Post-Producción", desc: "Edición rítmica en Premiere Pro y VFX avanzados en After Effects.", tag: "AE + PR", color: "from-zinc-400 to-orange-700", icon: Play },
        { title: "Identidad Visual", desc: "Sistemas visuales corporativos que proyectan autoridad y confianza absoluta.", tag: "Corporativa", color: "from-zinc-500 to-zinc-800", icon: Fingerprint },
        { title: "Producción y Eventos", desc: "Captura cinematográfica y cobertura de eventos de alto nivel con calidad 4K HDR.", tag: "Eventos", color: "from-zinc-300 to-zinc-500", icon: Camera },
        { title: "Grabación y Modelos", desc: "Dirección de talento y producción de contenido cinematográfico con modelos y actores en cualquier formato.", tag: "Grabación y Modelos", color: "from-zinc-400 to-zinc-700", icon: Layout }
      ]
    },
    en: {
      nav: ["Projects", "Tools", "Plans", "Contact"],
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
      editing_plans_p: "Select your video duration and compare our real estate and commercial editing options.",
      editing_plans_data: [
        {
          duration: "Up to 30 sec",
          tag: "Micro-Reel",
          basic: {
            name: "Basic Editing",
            subtitle: "Agile, direct and commercial for fast sales",
            price: "Bs. 120",
            features: [
              "Land marking: Perimeter line over drone shot",
              "AI Voice: Professional voiceover reading your script",
              "AI Content: Up to 5 images + 1 short animated video",
              "Key texts: Price, size in m², area and contact",
              "1 revision or adjustment included"
            ]
          },
          advanced: {
            name: "Advanced Editing",
            badge: "High Impact / Recommended",
            subtitle: "High-end for pre-sales, developments and future projection",
            price: "Bs. 220",
            features: [
              "Precision marking: Land tracing with drone tracking",
              "Floating map callouts to locate key access points",
              "Embossed & 3D-style titles (easy to read on mobile)",
              "AI Voiceover with premium commercial tone",
              "AI Content: Up to 3 animated videos + conceptual images",
              "Cinema color: Vivid green areas and crisp blue sky",
              "Up to 2 revisions or adjustments included"
            ]
          }
        },
        {
          duration: "31 to 60 sec",
          tag: "Standard",
          basic: {
            name: "Basic Editing",
            subtitle: "Agile, direct and commercial for fast sales",
            price: "Bs. 180",
            features: [
              "Land marking with shot tracking",
              "Full AI Voice to explain the opportunity",
              "AI Content: Up to 5 images + 1 short animated video",
              "Informative texts: Basic utilities, access and installments",
              "1 revision or adjustment included"
            ]
          },
          advanced: {
            name: "Advanced Editing",
            badge: "High Impact / Recommended",
            subtitle: "High-end for pre-sales, developments and future projection",
            price: "Bs. 320",
            features: [
              "Precision marking and dynamic motion tracking",
              "Floating callouts for strategic area points",
              "Embossed & 3D-style titles with impact effects",
              "Commercial and persuasive AI Voiceover",
              "AI Content: Up to 3 animated videos + future project images",
              "Cinema color and professional sound design",
              "Up to 2 revisions or adjustments included"
            ]
          }
        },
        {
          duration: "61 to 90 sec",
          tag: "Tour",
          basic: {
            name: "Basic Editing",
            subtitle: "Agile, direct and commercial for fast sales",
            price: "Bs. 250",
            features: [
              "Land marking + surrounding area shots",
              "AI Voice adapted for longer scripts",
              "AI Content: Up to 5 images + 1 short animated video",
              "Detailed texts of advantages and transport routes",
              "1 revision or adjustment included"
            ]
          },
          advanced: {
            name: "Advanced Editing",
            badge: "High Impact / Recommended",
            subtitle: "High-end for pre-sales, developments and future projection",
            price: "Bs. 430",
            features: [
              "Complete precision marking of lot and avenues",
              "Urban floating callouts (schools, shops, transit)",
              "Embossed & 3D-style titles for installments and value",
              "High-level advertising AI Voiceover",
              "AI Content: Up to 3 animated videos + conceptual images",
              "Luxury cinematic finish on drone and ground shots",
              "Up to 2 revisions or adjustments included"
            ]
          }
        },
        {
          duration: "91 to 120 sec",
          tag: "Master Plan",
          basic: {
            name: "Basic Editing",
            subtitle: "Agile, direct and commercial for fast sales",
            price: "Bs. 320",
            features: [
              "Complete tour of lot and main access roads",
              "AI Voice for projects with extensive information",
              "AI Content: Up to 5 images + 1 short animated video",
              "Final contact screen with all your company details",
              "1 revision or adjustment included"
            ]
          },
          advanced: {
            name: "Advanced Editing",
            badge: "High Impact / Recommended",
            subtitle: "High-end for pre-sales, developments and future projection",
            price: "Bs. 550",
            features: [
              "Comprehensive project or development presentation (Master Plan)",
              "Precision marking and callouts of the entire environment",
              "High-end embossed & 3D-style titles",
              "Premium AI Voiceover for commercial narration",
              "AI Content: Up to 3 animated videos + social area & home images",
              "Maximum fidelity color and sound",
              "Up to 2 revisions or adjustments included"
            ]
          }
        }
      ],
      editing_extras: [
        { price: "+Bs. 50", label: "Extra AI Video" },
        { price: "+Bs. 80", label: "Additional Land Lot" },
        { price: "+Bs. 30 / 60", label: "Extra Revision" },
        { price: "+Bs. 60 / 100", label: "Each +30 sec extra" }
      ],
      select_basic_btn: "Select Basic",
      select_advanced_btn: "Select Advanced",
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
        { name: "Events Pro Plan", price: "$360", priceBs: "Bs. 2,500", items: ["Social & Ceremonial", "Video Cine + Recap", "Narrative Script", "Coverage (Up to 6h)", "Pro Camera + Audio", "Highlights Editing"] }
      ],
      projects_data: [
        { title: "SPORT FIT", subtitle: "Fitness", color: "from-blue-500/20", img: "/video01.jpeg" },
        { title: "ZAMBRANOS", subtitle: "Auto Service", color: "from-cyan-500/20", img: "/video02.jpeg" },
        { title: "CHINO BARBER", subtitle: "Barber Shop", color: "from-blue-600/20", img: "/video03.jpeg" },
        { title: "NOVAFIT", subtitle: "Fitness", color: "from-purple-500/20", img: "/video04.jpeg" },
        { title: "YOJA HAIR LOUNGE", subtitle: "Beauty", color: "from-zinc-400/20", img: "/video05.jpeg" }
      ],
      services_data: [
        { title: "Post-Production", desc: "Rhythmic editing in Premiere Pro and advanced VFX in After Effects.", tag: "AE + PR", color: "from-zinc-400 to-orange-700", icon: Play },
        { title: "Visual Identity", desc: "Corporate visual systems that project authority and trust.", tag: "Corporate", color: "from-zinc-500 to-zinc-800", icon: Fingerprint },
        { title: "Production & Events", desc: "Cinematic capture of events, products, and corporate content.", tag: "Events", color: "from-zinc-300 to-zinc-500", icon: Camera },
        { title: "Shooting & Models", desc: "Talent direction and cinematic content production with models and actors in any format.", tag: "Shooting & Models", color: "from-zinc-400 to-zinc-700", icon: Layout }
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
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-400/30 overflow-x-hidden relative">
      <div className="relative z-10">
        <nav className="fixed top-0 w-full z-[100] px-4 md:px-10 py-4 md:py-6 flex justify-between items-center backdrop-blur-xl bg-white/80 border-b border-zinc-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-zinc-900 rounded-lg md:rounded-xl flex items-center justify-center font-black text-white italic shadow-[0_0_20px_rgba(0,0,0,0.15)]">S</div>
            <span className="text-lg md:text-xl font-black tracking-tighter uppercase italic text-zinc-900">Sync Pro</span>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden lg:flex gap-10 text-[11px] font-bold text-zinc-500 tracking-[0.2em] uppercase">
              {t.nav.map((item, i) => <a key={i} href={`#${item.toLowerCase()}`} className="hover:text-zinc-900 transition-colors">{item}</a>)}
            </div>
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-lg bg-zinc-100 border border-zinc-200 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-800"><Globe className="w-3 h-3 text-zinc-600" /> {lang.toUpperCase()}</button>
            <button className="hidden sm:block bg-zinc-900 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-widest">{t.cta_nav}</button>
          </div>
        </nav>

        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-6 text-center py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-100/80 to-transparent pointer-events-none" />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-5xl mx-auto">
            <span className="inline-block border border-zinc-300 px-4 md:px-5 py-1.5 rounded-full text-[8px] md:text-[9px] tracking-[0.3em] md:tracking-[0.4em] uppercase text-zinc-600 mb-6 md:mb-8 bg-zinc-100 font-bold">{t.hero_tag}</span>
            <h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[145px] font-black mb-6 md:mb-8 leading-[0.9] tracking-tighter italic uppercase px-2 text-zinc-900">
              {t.hero_h1_1} <br />
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-400 pr-4 md:pr-12">
                {t.hero_h1_2}
              </span>
            </h1>
            <p className="text-zinc-600 text-base md:text-xl max-w-2xl mx-auto mb-10 md:mb-12 font-light px-4">{t.hero_p}</p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center px-6">
              <button className="bg-zinc-900 text-white font-black px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl flex items-center justify-center gap-3 uppercase tracking-tighter shadow-lg text-sm md:text-base w-full sm:w-auto">{t.hero_btn_main} <ArrowRight className="w-5 h-5" /></button>
              <button className="border border-zinc-300 bg-zinc-100 px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-[10px] md:text-xs text-zinc-900 w-full sm:w-auto"><Play className="w-4 h-4 fill-current" /> {t.hero_btn_sec}</button>
            </div>
          </motion.div>
        </section>

      {/* Galería Proyectos (5 videos únicos, reproducción directa sin botón Play en el centro) */}
      <section id="proyectos" className="py-16 md:py-24 px-4 md:px-6 max-w-[1600px] mx-auto overflow-hidden">
        <div className="mb-10 md:mb-16 px-2">
          <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase mb-4 text-zinc-900">Nuestros <span className="text-zinc-400">PROYECTOS</span></h2>
          <p className="text-zinc-500 text-base md:text-lg max-w-xl">{t.projects_p}</p>
        </div>
        <div className="flex overflow-x-auto gap-3 md:gap-5 pb-20 pt-10 no-scrollbar snap-x px-4 md:px-10">
          {t.projects_data.map((proj, i) => (
            <DirectProjectCard key={i} proj={proj} index={i} />
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
                <button key={idx} onClick={() => setActiveService(idx)} className={`flex items-center gap-4 md:gap-6 p-6 md:p-8 rounded-[24px] md:rounded-[32px] border transition-all text-left ${activeService === idx ? 'bg-white/5 border-white/20 ring-1 ring-zinc-400/20' : 'opacity-30'}`}>
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
      <section id="planes-edicion" className="py-20 md:py-32 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-6 text-zinc-900 leading-tight">Planes de <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-400 px-2">EDICIÓN DE VIDEO</span></h2>
          <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto">{t.editing_plans_p}</p>
        </div>

        {/* Selector de Duración Limpio */}
        <div className="max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-[28px] p-1.5 grid grid-cols-2 md:grid-cols-4 gap-1.5 shadow-xl">
            {t.editing_plans_data.map((item, idx) => {
              const isActive = activeDuration === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveDuration(idx)}
                  className={`relative py-3.5 px-4 rounded-[22px] transition-all duration-300 flex flex-col items-center justify-center text-center ${
                    isActive
                      ? 'bg-zinc-800/90 border border-white/15 text-white'
                      : 'text-gray-500 hover:text-gray-300 border border-transparent'
                  }`}
                >
                  <span className="text-xs md:text-sm font-black italic uppercase tracking-tight leading-none mb-1">
                    {item.duration}
                  </span>
                  <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${isActive ? 'text-zinc-400' : 'text-gray-600'}`}>
                    {item.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Tarjetas Comparativas Lado a Lado con el Cuadro y Animación Original de Sync Pro */}
        {(() => {
          const currentTier = t.editing_plans_data[activeDuration] || t.editing_plans_data[0];
          const cards = [
            { key: 'basic', data: currentTier.basic, isAdvanced: false },
            { key: 'advanced', data: currentTier.advanced, isAdvanced: true }
          ];

          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {cards.map(({ key, data, isAdvanced }) => (
                <div 
                  key={key} 
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    e.currentTarget.style.setProperty("--x", `${x}px`);
                    e.currentTarget.style.setProperty("--y", `${y}px`);
                  }}
                  className="relative rounded-[40px] overflow-hidden p-[1px] group transition-all duration-500 hover:scale-[1.02] hover:z-50 shadow-2xl bg-zinc-200"
                  style={{ "--x": "0px", "--y": "0px" }}
                >
                  {/* Snake Border - Active only on Hover */}
                  <div 
                    className="absolute inset-[-1000%] animate-[spin_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_85%,#a1a1aa_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ animationDuration: '4s' }}
                  />

                  {/* Card Container with Persistent Subtle Border */}
                  <div className="relative bg-[#0a0a0a] rounded-[39px] h-full flex flex-col overflow-hidden border border-white/10">
                    {/* 💡 Spotlight Tracking Effect - Soft & Wide */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                         style={{ background: "radial-gradient(675px circle at var(--x) var(--y), rgba(161,161,170,0.07), transparent 40%)" }} />
                    
                    <div className="p-8 md:p-10 relative z-10 flex flex-col h-full">
                      {/* Cabecera de la Tarjeta */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                          {currentTier.duration} · {currentTier.tag}
                        </span>
                        {isAdvanced && data.badge && (
                          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-zinc-300">
                            {data.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight text-white mb-2">
                        {data.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-8">
                        {data.subtitle}
                      </p>

                      {/* Precio con transición limpia */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${key}-${activeDuration}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col flex-grow"
                        >
                          <div className="mb-8 pb-8 border-b border-white/10 flex items-baseline gap-3">
                            <span className="text-4xl md:text-5xl font-black text-white tracking-tight">
                              {data.price}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                              / video ({currentTier.duration})
                            </span>
                          </div>

                          <ul className="space-y-3.5 flex-grow">
                            {data.features.map((f, idx) => (
                              <li key={idx} className="text-xs md:text-[13px] text-gray-300 flex items-start gap-3 leading-relaxed">
                                <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isAdvanced ? 'text-zinc-300' : 'text-zinc-500'}`} />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      </AnimatePresence>

                      <a
                        href={`https://wa.me/59169109766?text=${encodeURIComponent(`Hola Sync Pro, me interesa contratar la ${data.name} de ${currentTier.duration} (${data.price}).`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-5 bg-white/5 group-hover:bg-zinc-500 group-hover:text-white text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 rounded-2xl mt-10 text-center block"
                      >
                        {isAdvanced ? t.select_advanced_btn : t.select_basic_btn}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}

        {/* Barra Inferior de Adicionales */}
        <div className="mt-8 bg-[#0a0a0a] border border-zinc-800 rounded-[28px] p-5 md:p-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
            {t.editing_extras.map((extra, idx) => (
              <div key={idx} className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/5">
                <span className="text-xs font-black text-white tracking-tight">{extra.price}</span>
                <span className="text-[11px] text-gray-400 font-medium">{extra.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planes de Creación de Contenido */}
      {false && (
      <section id="planes" className="py-20 md:py-32 px-4 md:px-6 max-w-[1600px] mx-auto">
        <div className="mb-16 md:mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-6 text-zinc-900 leading-tight">Planes de <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-500 px-2">CREACIÓN DE CONTENIDO</span></h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">{t.plans_p}</p>
        </div>
      </section>
      )}

      {/* 🛠️ Sección de Herramientas Premium (Extensión) */}
      <section id="herramientas" className="py-20 px-4 max-w-6xl mx-auto border-t border-zinc-200">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Columna Texto */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="w-full lg:w-1/2"
          >
            <span className="px-4 py-1.5 rounded-full bg-zinc-100 border border-zinc-300 text-[10px] font-black tracking-widest text-zinc-600 uppercase mb-6 inline-block">
              Sync Pro Labs / After Effects
            </span>
            <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase mb-6 text-zinc-900 leading-[0.9]">
              Studio Sync <br /> <span className="text-zinc-400">PRO</span>
            </h2>
            <p className="text-zinc-600 text-lg mb-8 font-light leading-relaxed">
              La extensión definitiva para After Effects que optimiza tu flujo de trabajo en segundos.
            </p>
            
            <div className="bg-[#0a0a0a] text-white p-6 md:p-10 rounded-[2.5rem] border border-zinc-800 w-full shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Fingerprint className="w-20 h-20 text-white" />
              </div>

              {/* Encabezado de Compra */}
              <div className="space-y-8 relative z-10">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-4 text-zinc-500">
                    <span className="h-[1px] w-8 bg-zinc-800"></span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Software Original</span>
                    <span className="h-[1px] w-8 bg-zinc-800"></span>
                  </div>
                  <div className="text-6xl font-black text-white">$9.99</div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-3 items-center opacity-70">
                       <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="PayPal" />
                       <div className="h-3 w-[1px] bg-zinc-700"></div>
                       <div className="flex gap-1.5">
                          <div className="w-6 h-4 bg-zinc-800 rounded-sm border border-white/5 flex items-center justify-center text-[6px] font-bold">VISA</div>
                          <div className="w-6 h-4 bg-zinc-800 rounded-sm border border-white/5 flex items-center justify-center text-[6px] font-bold">MC</div>
                       </div>
                    </div>
                    <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-2">PayPal & Tarjetas de Crédito/Débito</p>
                  </div>
                </div>

                {/* Botón de Acción Principal (Ahora lleva al pago) */}
                <button 
                  onClick={() => document.getElementById('paypal-section').scrollIntoView({ behavior: 'smooth' })}
                  className="w-full flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest text-black bg-white hover:bg-zinc-200 transition-all py-6 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                >
                  <Zap className="w-5 h-5 fill-current" /> Obtener Licencia de por Vida
                </button>

                <div id="paypal-section" className="pt-10 border-t border-white/5 flex flex-col items-center">
                  <p className="text-[10px] text-zinc-400 font-black tracking-[0.2em] mb-8 uppercase text-center">Completa tu pago seguro abajo:</p>
                  
                  {/* Contenedor PayPal */}
                  <div className="w-full flex justify-center overflow-hidden min-h-[100px]">
                    <div className="min-w-[450px] flex justify-center scale-[0.7] md:scale-100 origin-center">
                      <div id="paypal-container-MQ99WW5GG2UN2" className="w-full" />
                    </div>
                  </div>
                  
                  <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/5 w-full text-center">
                     <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-4">¿Ya tienes tu licencia?</p>
                     <a 
                      href="/Studio_Sync_Pro.zxp" 
                      download
                      className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                     >
                      <Download className="w-4 h-4" /> Descargar Instalador
                     </a>
                     <p className="text-[8px] text-zinc-600 mt-3 uppercase font-bold tracking-widest">Requiere activación tras la instalación</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Columna Visual */}
          <div className="hidden lg:block w-1/2 relative aspect-square bg-zinc-200 rounded-[40px] border border-zinc-300 p-1 shadow-2xl">
             <div className="w-full h-full bg-[#0a0a0a] rounded-[39px] flex items-center justify-center">
                <Layout className="w-32 h-32 text-zinc-800" />
             </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-20 md:py-32 px-4 md:px-6 max-w-4xl mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black italic text-center uppercase tracking-tighter leading-none text-zinc-900">
            ¿LISTO PARA EL <br /> SIGUIENTE <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-400">NIVEL</span>
            <span className="text-zinc-400">?</span>
          </h2>
        </div>
        
        <div className="bg-[#0a0a0a] text-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-zinc-800 text-center max-w-2xl mx-auto shadow-2xl">
          {formStatus === 'success' ? (
            <div className="py-16 md:py-20"><CheckCircle2 className="w-16 h-16 md:w-20 md:h-20 text-zinc-400 mx-auto mb-6" /><h3 className="text-2xl md:text-3xl font-black italic uppercase">Synced / Listo</h3></div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-5 md:space-y-6 text-left">
              <input type="text" name="nombre" required placeholder="Nombre" className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-4 md:py-5 text-sm text-white focus:border-zinc-400 outline-none transition-all" />
              <input type="email" name="email" required placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-4 md:py-5 text-sm text-white focus:border-zinc-400 outline-none transition-all" />
              <textarea name="vision" required placeholder="Tu visión..." rows="4" className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-4 md:py-5 text-sm text-white focus:border-zinc-400 outline-none transition-all"></textarea>
              <button type="submit" disabled={formStatus === 'loading'} className="w-full py-5 md:py-6 bg-zinc-500 hover:bg-zinc-400 text-white rounded-xl md:rounded-2xl font-black text-base md:text-lg uppercase transition-all shadow-[0_0_20px_rgba(113,113,122,0.3)]">{formStatus === 'loading' ? '...' : 'INICIAR PROYECTO'}</button>
            </form>
          )}
        </div>
      </section>


      <footer className="py-16 md:py-20 border-t border-zinc-200 text-center text-[8px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.5em] text-zinc-400 uppercase px-6">
        © 2026 Sync Pro Studio // Bolivia // Global Reach
      </footer>
      {/* 📱 Botón Flotante de WhatsApp Minimalista */}
      <motion.a
        href="https://wa.me/59169109766?text=Hola%20Sync%20Pro,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20edici%C3%B3n."
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#0a0a0a] border border-zinc-700 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-zinc-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <svg 
          viewBox="0 0 24 24" 
          className="w-7 h-7 md:w-8 md:h-8 fill-zinc-300 group-hover:fill-white transition-colors duration-300 relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="absolute right-20 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block border border-white/10 backdrop-blur-md">
          Hablemos
        </span>
      </motion.a>
      </div>
    </div>
  );
};

export default App;
