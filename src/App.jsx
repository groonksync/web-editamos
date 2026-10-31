import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Play,
  Check,
  X,
  ChevronDown,
  ArrowRight,
  ArrowUp,
  Star,
  Menu,
  Sparkles,
  Upload,
  Video,
  Send,
  Heart,
  Users,
  Eye,
  Phone,
  Mail,
  MessageCircle,
  Sliders,
  Layers,
  Clock,
  ShieldCheck,
  FolderUp
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  1. TARJETA DE VIDEO DE PORTAFOLIO (Idéntica a `fd` de 85thAgency)         */
/* -------------------------------------------------------------------------- */
const PortfolioVideoCard = ({ item, index, onOpenModal }) => {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const isHorizontal = item.aspect === '16/9';

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
      className={`space-y-3 transition-all duration-500 hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div
        onClick={() => onOpenModal(item)}
        className={`relative bg-gradient-to-br from-[#029854]/10 to-[#029854]/5 rounded-2xl overflow-hidden ${
          isHorizontal ? 'aspect-video' : 'aspect-[9/16]'
        } shadow-lg border border-black/10 hover:shadow-2xl hover:border-[#029854]/40 transition-all duration-300 group cursor-pointer`}
      >
        <video
          ref={videoRef}
          src={item.video}
          poster={item.poster}
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover pointer-events-none"
        />

        {/* Etiqueta superior opcional */}
        {item.badge && (
          <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full bg-[#111111]/85 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide border border-white/15">
            {item.badge}
          </div>
        )}

        {/* Overlay de Trazado Inmobiliario si aplica */}
        {item.hasLandOverlay && (
          <svg
            viewBox="0 0 200 300"
            className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-85"
          >
            <polygon
              points="35,185 95,145 168,170 135,235"
              fill="rgba(2, 152, 84, 0.18)"
              stroke="#029854"
              strokeWidth="2"
              strokeDasharray="5 3"
            />
            <circle cx="95" cy="145" r="3.5" fill="#ffffff" />
            <circle cx="168" cy="170" r="3.5" fill="#ffffff" />
            <line x1="95" y1="145" x2="95" y2="112" stroke="#ffffff" strokeWidth="1.5" />
            <rect x="52" y="92" width="86" height="20" rx="6" fill="#111111" stroke="#029854" strokeWidth="1" />
            <text x="95" y="105" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
              TERRENO DELIMITADO
            </text>
          </svg>
        )}

        {/* Botón Play Central Verde 85thAgency */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto bg-black/10 group-hover:bg-black/20 transition-colors">
          <div className="w-16 h-16 bg-[#029854]/90 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-all duration-300 shadow-lg">
            <svg className="w-8 h-8 text-white fill-white ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="text-center space-y-0.5">
        <p className="text-sm font-semibold text-[#111111]">{item.title}</p>
        <p className="text-xs text-[#666666]">{item.subtitle}</p>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  2. BADGE "STEP 1..4" (Idéntico a `iX` de 85thAgency)                      */
/* -------------------------------------------------------------------------- */
const StepBadge = ({ currentStep }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="inline-flex items-center gap-0 rounded-2xl overflow-hidden shadow-lg"
    style={{ backgroundColor: '#111111', border: '2px solid #807f7c' }}
  >
    <div className="px-6 py-3 flex items-center justify-center" style={{ backgroundColor: '#111111' }}>
      <span className="text-2xl md:text-3xl font-bold" style={{ color: '#807f7c' }}>
        Paso
      </span>
    </div>
    <div
      className="px-5 py-3 flex items-center justify-center font-bold text-2xl md:text-3xl text-white rounded-xl m-1"
      style={{ backgroundColor: '#029854' }}
    >
      {currentStep}
    </div>
  </motion.div>
);

/* -------------------------------------------------------------------------- */
/*  3. PASO 2: ANIMACIÓN DE SUBIDA DE ARCHIVOS (`nX` de 85thAgency)           */
/* -------------------------------------------------------------------------- */
const AnimatedUploadBox = () => {
  return (
    <div className="relative w-full aspect-[16/10] max-w-2xl mx-auto rounded-3xl overflow-visible flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-full rounded-3xl flex items-center justify-center overflow-hidden"
        style={{
          border: '3px dashed rgba(2, 152, 84, 0.35)',
          backgroundColor: 'rgba(255, 252, 245, 0.7)'
        }}
      >
        <div className="text-center space-y-3 z-10 px-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#029854]/10 flex items-center justify-center text-[#029854]">
              <FolderUp className="w-7 h-7" />
            </div>
            <Upload className="w-10 h-10 opacity-30 text-[#029854]" />
          </div>
          <p className="text-sm md:text-base font-semibold text-[#111111]/70">
            Suelta aquí tus tomas crudas (Drive o WhatsApp)
          </p>
          <p className="text-xs text-[#666666]">
            Tomas de dron, celular, cámara o locución
          </p>
        </div>

        {/* Tarjetas apiladas animadas */}
        <motion.div
          animate={{
            x: [0, 110, 110, 0],
            y: [0, -35, -35, 0],
            scale: [1, 1.06, 0.9, 1]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-6 md:left-10 bottom-6 md:bottom-8 z-20"
        >
          <div
            className="w-16 h-24 md:w-20 md:h-28 rounded-xl shadow-lg flex items-center justify-center"
            style={{
              backgroundColor: '#029854',
              border: '2px solid rgba(255,255,255,0.6)',
              transform: 'rotate(-8deg) translate(0px, 8px)'
            }}
          >
            <Video className="w-7 h-7 text-white" />
          </div>
          <div
            className="absolute inset-0 w-16 h-24 md:w-20 md:h-28 rounded-xl shadow-lg flex items-center justify-center"
            style={{
              backgroundColor: '#03a960',
              border: '2px solid rgba(255,255,255,0.7)',
              transform: 'rotate(-2deg) translate(6px, 4px)'
            }}
          >
            <Video className="w-7 h-7 text-white" />
          </div>
          <div
            className="absolute inset-0 w-16 h-24 md:w-20 md:h-28 rounded-xl shadow-xl flex items-center justify-center"
            style={{
              backgroundColor: '#04bd6b',
              border: '2px solid white',
              transform: 'rotate(6deg) translate(12px, 0px)'
            }}
          >
            <Play className="w-7 h-7 text-white fill-white" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  4. PASO 3: CHAT EN VIVO ANIMADO (`sX` de 85thAgency)                      */
/* -------------------------------------------------------------------------- */
const AnimatedChatCard = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [visibleMessages, setVisibleMessages] = useState([]);

  useEffect(() => {
    if (!isInView) return;
    const timers = [400, 1400, 2400].map((delay, idx) =>
      setTimeout(() => {
        setVisibleMessages((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
      }, delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  const messages = [
    {
      from: 'team',
      text: '¡Hola! Ya subimos tu video editado con trazado de terreno, señaladores 3D, IA y color en DaVinci.',
      sender: 'Equipo Sync Pro'
    },
    {
      from: 'client',
      text: '¡Quedó brutal! El marcado del lote y la voz se ven súper profesionales.',
      sender: 'Tú (Cliente)'
    },
    {
      from: 'team',
      text: '¡Genial! Ya te enviamos el archivo final en máxima calidad listo para publicar hoy mismo.',
      sender: 'Equipo Sync Pro'
    }
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-3xl p-6 lg:p-8 shadow-xl border-2"
      style={{ borderColor: 'rgba(2, 152, 84, 0.15)' }}
    >
      <div className="space-y-4">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: msg.from === 'team' ? -30 : 30, y: 10 }}
            animate={visibleMessages.includes(idx) ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`flex gap-3 ${msg.from === 'client' ? 'flex-row-reverse' : ''}`}
          >
            {msg.from === 'team' ? (
              <div className="w-10 h-10 rounded-full bg-[#111111] text-white font-black italic flex items-center justify-center flex-shrink-0 shadow-md">
                S
              </div>
            ) : (
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#e5e7eb' }}
              >
                <span className="text-lg">👤</span>
              </div>
            )}
            <div className={`flex-1 ${msg.from === 'client' ? 'text-right' : ''}`}>
              <motion.div
                className={`rounded-2xl p-4 ${
                  msg.from === 'team' ? 'rounded-tl-sm' : 'rounded-tr-sm inline-block'
                }`}
                style={{
                  backgroundColor: msg.from === 'team' ? '#f5f5f5' : '#029854'
                }}
                initial={{ scale: 0.8 }}
                animate={visibleMessages.includes(idx) ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                <p
                  className={`text-sm lg:text-base font-medium ${
                    msg.from === 'client' ? 'text-white' : 'text-[#111111]'
                  }`}
                >
                  {msg.text}
                </p>
              </motion.div>
              <span className="text-xs mt-1 block text-[#999999]">{msg.sender}</span>
            </div>
          </motion.div>
        ))}

        {isInView && visibleMessages.length < 3 && (
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-[#111111] text-white font-black italic flex items-center justify-center flex-shrink-0">
              S
            </div>
            <div className="rounded-2xl rounded-tl-sm p-4 bg-[#f5f5f5]">
              <div className="flex gap-1">
                {[0, 1, 2].map((dot) => (
                  <motion.div
                    key={dot}
                    className="w-2 h-2 rounded-full bg-[#999999]"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.1 }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/*  5. PASO 4: CONTADORES ANIMADOS + REDES (`tX` & `Xy` de 85thAgency)        */
/* -------------------------------------------------------------------------- */
const AnimatedMetricBox = ({ icon: Icon, label, endValue, isInView }) => {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let step = 0;
    const totalSteps = 50;
    const increment = endValue / totalSteps;
    const interval = setInterval(() => {
      step++;
      setVal(Math.floor(increment * step));
      if (step >= totalSteps) {
        setVal(endValue);
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [isInView, endValue]);

  const formatNum = (num) => {
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K+`;
    return `${num}+`;
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg border border-black/5 flex flex-col items-center justify-center min-w-[95px] sm:min-w-[115px]">
      <div className="w-9 h-9 rounded-full bg-[#029854]/10 text-[#029854] flex items-center justify-center mb-2">
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-lg sm:text-xl font-extrabold text-[#111111]">{formatNum(val)}</span>
      <span className="text-xs text-[#666666] font-medium">{label}</span>
    </div>
  );
};

const AnimatedDeliveryBox = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const floatingBadges = [
    { label: 'Instagram Reels', pos: { top: '8%', left: '8%' }, delay: 0.2 },
    { label: 'TikTok 9:16', pos: { top: '12%', right: '8%' }, delay: 0.4 },
    { label: 'YouTube 16:9', pos: { bottom: '32%', left: '6%' }, delay: 0.6 },
    { label: 'Master Plan HD', pos: { bottom: '34%', right: '8%' }, delay: 0.8 }
  ];

  return (
    <div ref={ref} className="relative w-full aspect-square max-w-md mx-auto">
      <div
        className="absolute inset-0 rounded-3xl overflow-hidden border-2 border-[#029854]/20 shadow-xl flex flex-col items-center justify-center gap-6 p-6"
        style={{ backgroundColor: '#FFFCF5' }}
      >
        {/* Badges flotantes */}
        {floatingBadges.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    scale: 1,
                    y: [0, -8, 0],
                    rotate: [-3, 3, -3]
                  }
                : {}
            }
            transition={{
              delay: b.delay,
              duration: 0.5,
              y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
            }}
            style={b.pos}
            className="absolute px-3 py-1.5 rounded-full bg-[#111111] text-white text-xs font-bold shadow-md border border-[#029854]/40 z-20"
          >
            {b.label}
          </motion.div>
        ))}

        {/* Ícono central */}
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-24 h-24 rounded-3xl bg-[#029854] text-white flex items-center justify-center shadow-2xl shadow-[#029854]/30 z-10"
        >
          <Sparkles className="w-12 h-12" />
        </motion.div>

        {/* Contadores */}
        <div className="flex gap-3 justify-center items-center flex-wrap z-10 mt-2">
          <AnimatedMetricBox icon={Heart} label="Interacciones" endValue={45000} isInView={isInView} />
          <AnimatedMetricBox icon={Users} label="Alcance" endValue={120000} isInView={isInView} />
          <AnimatedMetricBox icon={Eye} label="Reproducciones" endValue={250000} isInView={isInView} />
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  6. TARJETA DE TESTIMONIO MARQUEE (Idéntica a `yX` & `iR` de 85thAgency)   */
/* -------------------------------------------------------------------------- */
const TestimonialCard = ({ testimonial, isHovered, onHover, onLeave }) => (
  <div
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
    onTouchStart={onHover}
    onTouchEnd={onLeave}
    className={`flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 border-2 relative overflow-hidden cursor-pointer transition-all duration-150 ease-out ${
      isHovered
        ? 'bg-[#029854] text-white border-[#029854] shadow-2xl shadow-[#029854]/30 scale-[1.02] -translate-y-1'
        : 'bg-white border-black/10 shadow-lg hover:border-[#029854]/30 scale-100 translate-y-0'
    }`}
  >
    <div
      className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl transition-opacity duration-150 ${
        isHovered ? 'bg-white/20 opacity-100' : 'bg-[#029854]/10 opacity-0'
      }`}
    />
    <div className="relative z-10">
      <div className="flex gap-0.5 md:gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 md:w-5 md:h-5 transition-colors duration-150 ${
              isHovered ? 'fill-white text-white' : 'fill-[#029854] text-[#029854]'
            }`}
          />
        ))}
      </div>
      <div className="mb-3 sm:mb-4">
        <span
          className={`inline-block text-xs sm:text-sm font-semibold rounded-full px-3 py-1.5 transition-colors duration-150 ${
            isHovered ? 'bg-white/20 text-white' : 'bg-[#029854]/10 text-[#029854]'
          }`}
        >
          {testimonial.highlight}
        </span>
      </div>
      <blockquote
        className={`text-sm md:text-base font-medium leading-relaxed mb-4 sm:mb-6 md:mb-8 transition-colors duration-150 ${
          isHovered ? 'text-white' : 'text-[#111111]/90'
        }`}
      >
        “{testimonial.quote}”
      </blockquote>
      <div
        className={`flex items-center gap-3 pt-3 sm:pt-4 border-t transition-colors duration-150 ${
          isHovered ? 'border-white/20' : 'border-black/10'
        }`}
      >
        <div
          className={`w-11 h-11 md:w-12 md:h-12 rounded-full overflow-hidden flex items-center justify-center text-base font-bold transition-all duration-150 ${
            isHovered
              ? 'bg-white/20 text-white'
              : 'bg-gradient-to-br from-[#029854]/30 to-[#029854]/10 text-[#029854]'
          }`}
        >
          {testimonial.initial}
        </div>
        <div>
          <p
            className={`font-bold text-sm sm:text-base transition-colors duration-150 ${
              isHovered ? 'text-white' : 'text-[#111111]'
            }`}
          >
            {testimonial.name}
          </p>
          <p
            className={`text-xs md:text-sm transition-colors duration-150 ${
              isHovered ? 'text-white/80' : 'text-[#666666]'
            }`}
          >
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  COMPONENTE PRINCIPAL APP (Diseño idéntico a 85thAgency.com en Español)    */
/* -------------------------------------------------------------------------- */
const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePortfolioTab, setActivePortfolioTab] = useState('all');
  const [showAllPortfolio, setShowAllPortfolio] = useState(false);
  const [selectedVideoModal, setSelectedVideoModal] = useState(null);
  const [activeDuration, setActiveDuration] = useState(1); // 0: 30s, 1: 31-60s, 2: 61-90s, 3: 91-120s
  const [customPlanType, setCustomPlanType] = useState('advanced');
  const [extraAiVideo, setExtraAiVideo] = useState(true);
  const [extraTerrain, setExtraTerrain] = useState(false);
  const [compareSlider, setCompareSlider] = useState(50);
  const [openFaq, setOpenFaq] = useState(0);
  const [hoveredTestimonial, setHoveredTestimonial] = useState(null);
  const [marqueeDir, setMarqueeDir] = useState(null);
  const [levelUpTriggered, setLevelUpTriggered] = useState(false);
  const [levelUpSolved, setLevelUpSolved] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
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

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzunzhVeJQtXsSpOV7G1jgQt2UwAnD7SUf-mWr2grocF7tJ_Hrtf26b86g8CxQZb67nUQ/exec";

  // Parallax del Hero (idéntico a 85thAgency)
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const leftBlobX = useTransform(scrollYProgress, [0, 0.5], ['0%', '30%']);
  const rightBlobX = useTransform(scrollYProgress, [0, 0.5], ['0%', '-30%']);
  const blobsY = useTransform(scrollYProgress, [0, 0.5], ['0%', '60%']);
  const blobsOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.8, 0.6]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 85);
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Datos de Portafolio (integrando los proyectos reales de Sync Pro)
  const portfolioItems = [
    {
      title: 'Videos de Terrenos e Inmobiliaria',
      subtitle: 'Trazado de Lotes + Señaladores 3D + IA (9:16)',
      category: 'inmobiliaria',
      video: '/cuadro-2.mp4',
      poster: '/video02.jpeg',
      aspect: '9/16',
      hasLandOverlay: true,
      badge: 'Inmobiliaria · Trazado + IA'
    },
    {
      title: 'Reels Comerciales para Marcas y Negocios',
      subtitle: 'Chino Barber · Edición Dinámica & SFX (9:16)',
      category: 'comercial',
      video: '/cuadro-3.mp4',
      poster: '/video03.jpeg',
      aspect: '9/16',
      badge: 'Comercial · Alta Retención'
    },
    {
      title: 'Videos para Creadores, Gyms y Fitness',
      subtitle: 'Sport Fit · Ritmo, Cortes Rápidos y Color (9:16)',
      category: 'fitness',
      video: '/cuadro-1.mp4',
      poster: '/video01.jpeg',
      aspect: '9/16',
      badge: 'Fitness · Dinámico'
    },
    {
      title: 'NovaFit · Entrenamiento & Marca Personal',
      subtitle: 'Subtítulos Dinámicos + Efectos Visuales (9:16)',
      category: 'fitness',
      video: '/cuadro-4.mp4',
      poster: '/video04.jpeg',
      aspect: '9/16',
      badge: 'Reels 9:16'
    },
    {
      title: 'Yoja Hair Lounge · Estética & Belleza',
      subtitle: 'Colorización DaVinci Resolve + Ritmo Comercial (9:16)',
      category: 'comercial',
      video: '/cuadro-5.mp4',
      poster: '/video05.jpeg',
      aspect: '9/16',
      badge: 'Color DaVinci'
    },
    {
      title: 'Zambranos · Auto Servicio & Promoción',
      subtitle: 'Edición Comercial para Ventas en Redes (9:16)',
      category: 'comercial',
      video: '/cuadro-2.mp4',
      poster: '/video02.jpeg',
      aspect: '9/16',
      badge: 'Ventas & Ads'
    },
    {
      title: 'Master Plan Inmobiliario · Vista Panorámica (16:9)',
      subtitle: 'Delimitación de Terrenos + Señaladores Flotantes + Voz Locutor',
      category: 'horizontal',
      video: '/cuadro-2.mp4',
      poster: '/video02.jpeg',
      aspect: '16/9',
      hasLandOverlay: true,
      badge: 'Horizontal 16:9 · Master Plan'
    },
    {
      title: 'Presentación Comercial & YouTube (16:9)',
      subtitle: 'Edición de 1 a 10 min con Contenido IA y Colorización Pro',
      category: 'horizontal',
      video: '/cuadro-5.mp4',
      poster: '/video05.jpeg',
      aspect: '16/9',
      badge: 'Horizontal 16:9 · YouTube'
    }
  ];

  const filteredPortfolio =
    activePortfolioTab === 'all'
      ? showAllPortfolio
        ? portfolioItems
        : portfolioItems.slice(0, 3)
      : portfolioItems.filter((item) => item.category === activePortfolioTab);

  // Planes por Duración de Sync Pro (Precios exactos en Bs. acordados con el usuario)
  const editingPlansByDuration = [
    {
      duration: 'Hasta 30 seg',
      tag: 'Micro-Reel / TikTok',
      basic: {
        name: 'Edición Básica',
        subtitle: 'Ágil, directo y comercial para venta rápida',
        price: 'Bs. 150',
        delivery: 'Entrega en 24 a 48 horas',
        items: [
          'Marcado simple del terreno (líneas limpias)',
          'Títulos limpios de ubicación y precio',
          'Voz con IA (narración clara y comercial)',
          'Hasta 5 imágenes generadas con IA',
          '1 video generado con IA (familia o entorno)',
          'Música de fondo + efectos de sonido',
          '1 cambio incluido'
        ]
      },
      advanced: {
        name: 'Edición Avanzada',
        subtitle: 'Máximo impacto visual, relieve y acabado DaVinci',
        price: 'Bs. 250',
        delivery: 'Prioridad de entrega y acabado Pro',
        items: [
          'Trazado de precisión y relieves del terreno',
          'Señaladores flotantes y textos 3D en escena',
          'Voz de locutor profesional',
          'Creación de imágenes con IA para el proyecto',
          'Hasta 3 videos generados con IA integrados',
          'Colorización profesional en DaVinci Resolve',
          'Hasta 2 cambios incluidos'
        ]
      }
    },
    {
      duration: '31 a 60 seg',
      tag: 'Estándar Más Pedido',
      basic: {
        name: 'Edición Básica',
        subtitle: 'Ideal para Reels, TikToks y Shorts completos',
        price: 'Bs. 190',
        delivery: 'Entrega en 24 a 48 horas',
        items: [
          'Marcado simple del terreno (líneas limpias)',
          'Títulos limpios de ubicación y precio',
          'Voz con IA (narración clara y comercial)',
          'Hasta 5 imágenes generadas con IA',
          '1 video generado con IA (familia o entorno)',
          'Música de fondo + efectos de sonido',
          '1 cambio incluido'
        ]
      },
      advanced: {
        name: 'Edición Avanzada',
        subtitle: 'El favorito para inmobiliarias, marcas y creadores',
        price: 'Bs. 290',
        delivery: 'Prioridad de entrega y acabado Pro',
        items: [
          'Trazado de precisión y relieves del terreno',
          'Señaladores flotantes y textos 3D en escena',
          'Voz de locutor profesional',
          'Creación de imágenes con IA para el proyecto',
          'Hasta 3 videos generados con IA integrados',
          'Colorización profesional en DaVinci Resolve',
          'Hasta 2 cambios incluidos'
        ]
      }
    },
    {
      duration: '61 a 90 seg',
      tag: 'Recorrido Completo',
      basic: {
        name: 'Edición Básica',
        subtitle: 'Para mostrar más tomas, accesos y beneficios',
        price: 'Bs. 250',
        delivery: 'Entrega en 24 a 48 horas',
        items: [
          'Marcado simple del terreno (líneas limpias)',
          'Títulos limpios de ubicación y precio',
          'Voz con IA (narración clara y comercial)',
          'Hasta 5 imágenes generadas con IA',
          '1 video generado con IA (familia o entorno)',
          'Música de fondo + efectos de sonido',
          '1 cambio incluido'
        ]
      },
      advanced: {
        name: 'Edición Avanzada',
        subtitle: 'Producción visual completa con señaladores e IA',
        price: 'Bs. 390',
        delivery: 'Prioridad de entrega y acabado Pro',
        items: [
          'Trazado de precisión y relieves del terreno',
          'Señaladores flotantes y textos 3D en escena',
          'Voz de locutor profesional',
          'Creación de imágenes con IA para el proyecto',
          'Hasta 3 videos generados con IA integrados',
          'Colorización profesional en DaVinci Resolve',
          'Hasta 2 cambios incluidos'
        ]
      }
    },
    {
      duration: '91 a 120 seg',
      tag: 'Presentación / Master Plan',
      basic: {
        name: 'Edición Básica',
        subtitle: 'Presentación extensa vertical u horizontal',
        price: 'Bs. 320',
        delivery: 'Entrega en 24 a 48 horas',
        items: [
          'Marcado simple del terreno (líneas limpias)',
          'Títulos limpios de ubicación y precio',
          'Voz con IA (narración clara y comercial)',
          'Hasta 5 imágenes generadas con IA',
          '1 video generado con IA (familia o entorno)',
          'Música de fondo + efectos de sonido',
          '1 cambio incluido'
        ]
      },
      advanced: {
        name: 'Edición Avanzada',
        subtitle: 'Presentación de alto valor para urbanizaciones y marcas',
        price: 'Bs. 490',
        delivery: 'Prioridad de entrega y acabado Pro',
        items: [
          'Trazado de precisión y relieves del terreno',
          'Señaladores flotantes y textos 3D en escena',
          'Voz de locutor profesional',
          'Creación de imágenes con IA para el proyecto',
          'Hasta 3 videos generados con IA integrados',
          'Colorización profesional en DaVinci Resolve',
          'Hasta 2 cambios incluidos'
        ]
      }
    }
  ];

  // Casos de Éxito (Estructura asimétrica idéntica a `lX` de 85thAgency)
  const caseStudies = [
    {
      client: 'Urbanizaciones & Lotes en Venta',
      tags: ['Inmobiliaria', 'Trazado + IA', 'DaVinci Resolve'],
      image: '/video02.jpeg',
      headline: 'Cómo Transformamos Tomas Crudas de Dron en Videos de Terrenos con Señaladores 3D que Cierran Ventas',
      label: 'Cotizar un Video Inmobiliario Similar'
    },
    {
      client: 'Sport Fit · Chino Barber · NovaFit',
      tags: ['Reels 9:16', 'Alta Retención'],
      image: '/video01.jpeg',
      headline: 'Edición Dinámica de Reels y TikToks con Efectos de Sonido, Ritmo y Color para Marcas Locales',
      label: 'Ver Detalles del Servicio'
    },
    {
      client: 'Zambranos · Yoja Hair Lounge',
      tags: ['Comercial & Redes', 'Contenido IA'],
      image: '/video05.jpeg',
      headline: 'Videos Comerciales de 30 a 120 Segundos con Locución, Imágenes/Videos IA y Entrega en 24–48h',
      label: 'Solicitar Propuesta por WhatsApp'
    }
  ];

  // Testimonios para el Marquee infinito (`S5` de 85thAgency adaptado a Sync Pro)
  const testimonials = [
    {
      quote:
        'Increíblemente rápidos y detallistas. Les enviamos las tomas de dron del terreno un viernes y nos entregaron el video con el lote trazado, señaladores flotantes y voz lista para pautar. ¡Vendimos mucho más rápido!',
      name: 'Carlos Méndez',
      role: 'Asesor & Desarrollador Inmobiliario',
      initial: 'CM',
      highlight: 'Trazado de terrenos impecable y rápido'
    },
    {
      quote:
        'Trabajar con Sync Pro para las redes de nuestro gimnasio cambió por completo la imagen de la marca. Los cortes, la música, los efectos de sonido y el color en DaVinci hacen que cada Reel destaque.',
      name: 'Equipo Sport Fit',
      role: 'Centro de Entrenamiento & Fitness',
      initial: 'SF',
      highlight: 'Nuestros Reels ahora retienen a la audiencia'
    },
    {
      quote:
        'Antes perdía días tratando de editar mis propios videos. Ahora solo grabo las tomas con mi celular o dron, las subo al Drive y ellos se encargan de los títulos 3D, las imágenes con IA y la locución.',
      name: 'Rodrigo Vargas',
      role: 'Creador de Contenido & Comercializador',
      initial: 'RV',
      highlight: 'Me ahorran horas de trabajo cada semana'
    },
    {
      quote:
        'La diferencia entre una toma cruda apagada y el resultado final que entregan con colorización profesional y videos generados con IA es brutal. 100% recomendados.',
      name: 'Chino Barber Studio',
      role: 'Marca Comercial',
      initial: 'CB',
      highlight: 'Calidad visual de otro nivel'
    },
    {
      quote:
        'El trato directo por WhatsApp es súper ágil. Entendieron a la primera lo que necesitábamos mostrar en el proyecto inmobiliario y cumplieron los tiempos al pie de la letra.',
      name: 'Valeria Suárez',
      role: 'Gerente de Ventas Inmobiliarias',
      initial: 'VS',
      highlight: 'Comunicación rápida y cero complicaciones'
    }
  ];

  // Preguntas Frecuentes (`#faq` de 85thAgency adaptado a Sync Pro)
  const faqs = [
    {
      q: '¿En cuánto tiempo entregan los videos editados?',
      a: 'Entregamos la mayoría de los videos en un plazo de 24 a 48 horas según la duración y el plan elegido (Básica o Avanzada). Si tienes un lanzamiento urgente, escríbenos por WhatsApp para darle prioridad en la fila.'
    },
    {
      q: '¿Qué formatos y duraciones de video editan?',
      a: 'Editamos tanto videos verticales (9:16) para TikTok, Instagram Reels y YouTube Shorts, como videos horizontales (16:9) para YouTube, presentaciones inmobiliarias y anuncios. Nuestros planes cubren desde 30 segundos hasta 120 segundos, y puedes adicionar bloques extra de +30 segundos (+Bs. 60 en Básica / +Bs. 100 en Avanzada) para videos de 3, 5 o 10 minutos.'
    },
    {
      q: '¿Cuál es la diferencia principal entre Edición Básica y Edición Avanzada?',
      a: 'La Edición Básica incluye marcado simple del terreno, títulos limpios, voz con IA, hasta 5 imágenes con IA, 1 video con IA y 1 revisión. La Edición Avanzada eleva tu video al máximo nivel con trazado de precisión y relieves, señaladores flotantes y textos 3D, voz de locutor profesional, hasta 3 videos generados con IA, colorización en DaVinci Resolve y hasta 2 revisiones.'
    },
    {
      q: '¿Puedo agregar más videos con IA o marcar terrenos adicionales?',
      a: '¡Sí! Puedes personalizar tu pedido fácilmente: cada video extra generado con IA tiene un valor adicional de +Bs. 50, y cada terreno adicional marcado dentro del mismo video suma +Bs. 80.'
    },
    {
      q: '¿Cuántos cambios o revisiones incluye cada plan?',
      a: 'El plan de Edición Básica incluye 1 ronda de cambios y el plan de Edición Avanzada incluye hasta 2 rondas de cambios sin costo. Si necesitas un ajuste adicional fuera del plan, tiene un valor de +Bs. 30 (Básica) o +Bs. 60 (Avanzada).'
    },
    {
      q: '¿Cómo empezamos a trabajar hoy mismo?',
      a: 'Muy simple: elige la duración de tu video en la sección de Planes, personaliza si deseas algún extra y haz clic en el botón para enviarnos tu pedido directo a nuestro WhatsApp (+591 69109766). Compartes tus tomas por Google Drive o WhatsApp y comenzamos a editar.'
    }
  ];

  const problemPills = [
    'Editar me toma días',
    'Mis tomas se ven apagadas',
    'No sé hacer trazados 3D',
    'Baja retención en Reels',
    'Sin tiempo para editar'
  ];

  const solutionPills = [
    'Listo en 24–48 horas',
    'Color DaVinci Resolve',
    'Trazado y Señaladores 3D',
    'Contenido con IA incluido',
    'Tú grabas, nosotros editamos'
  ];

  const handleTriggerLevelUp = () => {
    setLevelUpTriggered(true);
    setTimeout(() => {
      setLevelUpSolved(true);
    }, 400);
    setTimeout(() => {
      setLevelUpTriggered(false);
      scrollToSection('book-call');
    }, 2200);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');
    const formData = new FormData(e.target);
    try {
      await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: formData, mode: 'no-cors' });
      setFormStatus('success');
      e.target.reset();
    } catch {
      setFormStatus('idle');
    }
  };

  const currentTier = editingPlansByDuration[activeDuration] || editingPlansByDuration[1];
  const selectedCustomPlan = customPlanType === 'advanced' ? currentTier.advanced : currentTier.basic;
  const baseCustomPrice = parseInt(selectedCustomPlan.price.replace(/[^0-9]/g, ''), 10) || 0;
  const totalCustomPrice = baseCustomPrice + (extraAiVideo ? 50 : 0) + (extraTerrain ? 80 : 0);

  const navItems = [
    { label: 'Portafolio', id: 'portfolio' },
    { label: 'Solución', id: 'solution' },
    { label: 'Proceso', id: 'process' },
    { label: 'Casos de Éxito', id: 'work' },
    { label: 'Planes', id: 'pricing' },
    { label: 'Preguntas', id: 'faq' }
  ];

  return (
    <div className="min-h-screen bg-[#FFFCF5] text-[#111111] selection:bg-[#029854]/20 selection:text-[#029854] overflow-x-hidden">
      {/* ==================================================================== */}
      {/* 1. NAVBAR FLOTANTE EN CÁPSULA (Idéntica a `We` de 85thAgency)        */}
      {/* ==================================================================== */}
      <motion.nav
        aria-label="Navegación principal"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 py-3 md:py-5 px-4 md:px-6"
      >
        <div className="max-w-[1200px] mx-auto bg-[#FFFCF5]/85 backdrop-blur-lg border border-black/10 rounded-full shadow-lg px-4 md:px-8 py-3 md:py-3.5 flex items-center justify-between">
          {/* Logo Sync Pro al estilo 85thAgency */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-[#111111] flex items-center justify-center font-black text-white italic shadow-md group-hover:bg-[#029854] transition-colors">
              S
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-extrabold tracking-tight text-[#111111] leading-none">
                Sync<span className="text-[#029854]">Pro</span>
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-widest text-[#666666]">
                Post-Production
              </span>
            </div>
          </a>

          {/* Links Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm md:text-base text-[#111111]/80 hover:text-[#029854] transition-colors duration-300 font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Botón CTA Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/59169109766?text=Hola%20Sync%20Pro,%20quiero%20cotizar%20la%20edici%C3%B3n%20de%20un%20video."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#029854] text-white hover:bg-[#029854]/90 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 px-5 md:px-6 py-2.5 text-xs md:text-sm font-semibold flex items-center gap-2"
            >
              Cotizar por WhatsApp
            </a>
          </div>

          {/* Botón Menú Móvil */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menú"
              className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-[#111111]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Drawer Móvil */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="lg:hidden max-w-[1200px] mx-auto mt-2 bg-[#FFFCF5] border border-black/10 rounded-3xl shadow-2xl p-6 flex flex-col gap-4"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left py-2 text-base font-semibold text-[#111111]/85 hover:text-[#029854] border-b border-black/5"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="https://wa.me/59169109766?text=Hola%20Sync%20Pro,%20quiero%20cotizar%20la%20edici%C3%B3n%20de%20un%20video."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-[#029854] text-white rounded-full py-3.5 font-bold text-sm shadow-md mt-2"
              >
                Hablar por WhatsApp (69109766)
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ==================================================================== */}
      {/* 2. HERO SECTION CON PARALLAX VERDE Y SHOWREEL (`UX` de 85thAgency)   */}
      {/* ==================================================================== */}
      <section
        id="top"
        ref={heroRef}
        className="pt-28 md:pt-36 pb-12 md:pb-20 px-4 md:px-6 relative overflow-hidden bg-[#FFFCF5]"
      >
        {/* Gradientes Radiales Verdes con Parallax idénticos a 85thAgency */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ y: blobsY, opacity: blobsOpacity, willChange: 'transform, opacity' }}
          transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
          className="md:hidden pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_center,rgba(2,152,84,0.45),transparent_70%)]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ x: leftBlobX, y: blobsY, opacity: blobsOpacity, willChange: 'transform, opacity' }}
          transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
          className="hidden md:block pointer-events-none absolute inset-y-0 -left-1/3 w-2/3 bg-[radial-gradient(circle_at_center,rgba(2,152,84,0.55),transparent_60%)]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ x: rightBlobX, y: blobsY, opacity: blobsOpacity, willChange: 'transform, opacity' }}
          transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
          className="hidden md:block pointer-events-none absolute inset-y-0 -right-1/3 w-2/3 bg-[radial-gradient(circle_at_center,rgba(2,152,84,0.55),transparent_60%)]"
        />

        <div className="max-w-[1120px] mx-auto relative z-10">
          <div className="hero-stagger text-center space-y-3 md:space-y-5 mb-8 md:mb-12">
            {/* 1. Section Badge */}
            <div className="inline-block">
              <span className="section-badge">Edición de video profesional hecha para ti</span>
            </div>

            {/* 2. Social Proof Avatares + 5 Estrellas */}
            <div className="flex items-center justify-center gap-2 md:gap-3 py-1.5 flex-wrap">
              <div className="flex items-center -space-x-2 md:-space-x-3">
                {['/video01.jpeg', '/video02.jpeg', '/video03.jpeg', '/video05.jpeg'].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Cliente Sync Pro"
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#FFFCF5] object-cover shadow-sm"
                  />
                ))}
              </div>
              <div className="flex items-center gap-0.5 md:gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-[#029854] text-[#029854]" />
                ))}
              </div>
              <span className="text-xs md:text-sm font-medium text-[#111111]/70">
                Elegido por Inmobiliarias, Creadores y Marcas
              </span>
            </div>

            {/* 3. Título Principal H1 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight max-w-4xl mx-auto px-2 tracking-tight text-[#111111]">
              Edición de video profesional para inmobiliarias, creadores y marcas.{' '}
              <span className="text-[#029854]">Sin complicaciones.</span>
            </h1>

            {/* 4. Subtítulo con enlaces destacados */}
            <p className="text-sm sm:text-base md:text-lg text-[#111111]/70 leading-relaxed max-w-2xl mx-auto px-2">
              Transformamos tus tomas crudas en videos listos para publicar y vender — desde{' '}
              <button
                onClick={() => scrollToSection('portfolio')}
                className="text-[#029854] font-bold hover:underline"
              >
                Reels y TikToks de alta retención
              </button>{' '}
              hasta{' '}
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-[#029854] font-bold hover:underline"
              >
                videos inmobiliarios con trazado 3D, IA y DaVinci Resolve
              </button>{' '}
              — sin que pierdas horas frente a la computadora.
            </p>

            {/* 5. Botones Principales */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center items-center px-2">
              <button
                onClick={() => scrollToSection('pricing')}
                className="w-full sm:w-auto bg-[#029854] text-white hover:bg-[#029854]/90 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 px-7 md:px-9 py-4 text-sm md:text-base font-semibold"
              >
                Ver Planes y Cotizar
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="w-full sm:w-auto border-2 border-[#111111]/20 hover:border-[#029854] hover:text-[#029854] hover:bg-[#029854]/5 rounded-full px-7 md:px-9 py-4 text-sm md:text-base font-semibold transition-all duration-300"
              >
                Ver nuestros videos
              </button>
            </div>

            {/* 6. Puntos de Confianza con Círculos Verdes */}
            <div className="flex items-center justify-center gap-4 md:gap-6 pt-3 flex-wrap px-2">
              {['Trazado Preciso + IA', 'Entrega rápida 24–48h', 'Color en DaVinci Resolve'].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#029854] flex items-center justify-center flex-shrink-0 shadow-md shadow-[#029854]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFFCF5]" />
                  </span>
                  <span className="text-xs md:text-sm font-medium text-[#111111]/75">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Reproductor Principal 16:9 en el Hero (Idéntico al contenedor Wistia de 85thAgency) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative max-w-5xl mx-auto"
          >
            <div className="relative rounded-3xl shadow-2xl overflow-hidden border-4 border-[#029854]/25 hover:border-[#029854]/50 transition-all duration-500 aspect-video bg-[#111111] group">
              <video
                src="/cuadro-2.mp4"
                poster="/video02.jpeg"
                autoPlay
                muted
                loop
                playsInline
                controls
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111]/80 backdrop-blur-md text-white text-xs font-semibold border border-white/15">
                <span className="w-2 h-2 rounded-full bg-[#029854] animate-pulse" />
                Showreel Sync Pro · Edición Dinámica, Terrenos & IA
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. PORTAFOLIO DE VIDEOS (`#portfolio` de 85thAgency)                 */}
      {/* ==================================================================== */}
      <section id="portfolio" className="py-12 md:py-24 px-4 md:px-6" style={{ backgroundColor: '#FFFCF5' }}>
        <div className="max-w-[1120px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3 md:space-y-4 mb-8 md:mb-12"
          >
            <span className="section-badge">Portafolio</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 px-2 text-[#111111]">
              Mira el Tipo de Videos que Creamos
            </h2>

            {/* Filtros interactivos estilo enlaces 85thAgency */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {[
                { id: 'all', label: 'Destacados' },
                { id: 'inmobiliaria', label: 'Inmobiliaria & Terrenos' },
                { id: 'comercial', label: 'Comercial & Negocios' },
                { id: 'fitness', label: 'Fitness & Creadores' },
                { id: 'horizontal', label: 'Videos Horizontales (16:9)' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActivePortfolioTab(tab.id);
                    if (tab.id !== 'all') setShowAllPortfolio(true);
                  }}
                  className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                    activePortfolioTab === tab.id
                      ? 'bg-[#029854] text-white shadow-md shadow-[#029854]/20'
                      : 'bg-black/5 text-[#111111]/70 hover:text-[#029854] hover:bg-[#029854]/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Grid de Videos (3 columnas para 9:16 o 2 columnas para 16:9) */}
          <div
            className={`grid gap-6 md:gap-8 ${
              activePortfolioTab === 'horizontal'
                ? 'grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
            }`}
          >
            {filteredPortfolio.map((item, idx) => (
              <PortfolioVideoCard
                key={`${item.title}-${idx}`}
                item={item}
                index={idx}
                onOpenModal={(videoItem) => setSelectedVideoModal(videoItem)}
              />
            ))}
          </div>

          {/* Enlace y botón "Ver más" idéntico a `WQ` de 85thAgency */}
          <div className="text-center mt-8 md:mt-12 space-y-5">
            {activePortfolioTab === 'all' && (
              <div>
                <button
                  onClick={() => setShowAllPortfolio(!showAllPortfolio)}
                  className="rounded-full px-8 py-4 text-sm md:text-base font-semibold bg-[#111111] text-[#FFFCF5] hover:bg-[#111111]/90 transition-all duration-300 inline-flex items-center gap-2 group shadow-lg"
                >
                  {showAllPortfolio ? 'Ver Menos Videos' : 'Ver Todos los Videos (9:16 y 16:9)'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
            <div>
              <a
                href="https://wa.me/59169109766?text=Hola%20Sync%20Pro,%20vi%20su%20portafolio%20y%20quiero%20cotizar%20un%20video."
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#029854] hover:underline text-xs md:text-sm font-medium transition-all duration-300 hover:text-[#029854]/80 px-2 inline-block"
              >
                ¿Quieres ver ejemplos específicos para tu rubro? Escríbenos por WhatsApp y te asesoramos.
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. TU PROBLEMA VS. NUESTRA SOLUCIÓN (Idéntico a 85thAgency)          */}
      {/* ==================================================================== */}
      <section id="solution" className="py-12 md:py-24 px-4 md:px-6" style={{ backgroundColor: '#FFFCF5' }}>
        <div className="max-w-6xl mx-auto px-2 md:px-6">
          <div className="text-center mb-8 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-badge mb-4 md:mb-6">Nuestra Solución</span>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 px-2"
                style={{ color: '#111111' }}
              >
                Por Qué Editar Tus Propios Videos Te Frena
              </h2>
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto px-2"
                style={{ color: '#666666' }}
              >
                Una comparativa directa entre los dolores de cabeza al editar por tu cuenta y cómo lo resolvemos en Sync Pro.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-start"
          >
            {/* Columna Izquierda: Tu Problema (Blanca con bordes rojos suaves) */}
            <motion.div
              className="space-y-4 md:space-y-6 bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg border-2 border-red-100"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4 md:mb-8">
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                >
                  <X className="w-5 h-5 md:w-6 md:h-6 text-[#ef4444]" />
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#111111]">
                  Tu Problema
                </h3>
              </div>

              <div className="space-y-3 md:space-y-5">
                {[
                  'Editar un video de 1 minuto me toma horas o días.',
                  'Mis tomas de dron o celular no llaman la atención.',
                  'No tengo tiempo para editar; solo quiero grabar y vender.',
                  'Hacer el marcado de terrenos, textos 3D y subtítulos es complicado.',
                  'Mis videos no tienen la calidad visual ni el color de las grandes marcas.'
                ].map((problem, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl bg-red-50/50 border border-red-100/50"
                  >
                    <div
                      className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center mt-0.5"
                      style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)' }}
                    >
                      <X className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#ef4444]" strokeWidth={2.5} />
                    </div>
                    <p className="text-sm md:text-base lg:text-lg font-medium text-[#111111]">
                      {problem}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Columna Derecha: Nuestra Solución (Negra #111111 con borde verde #029854) */}
            <motion.div
              className="space-y-4 md:space-y-6 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg border-2"
              style={{ backgroundColor: '#111111', borderColor: '#029854' }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4 md:mb-8">
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(2, 152, 84, 0.2)' }}
                >
                  <Check className="w-5 h-5 md:w-6 md:h-6 text-[#029854]" strokeWidth={3} />
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                  Nuestra Solución
                </h3>
              </div>

              <div className="space-y-3 md:space-y-5">
                {[
                  'Edición lista para publicar, entregada en 24 a 48 horas.',
                  'Trazado preciso de terrenos, señaladores flotantes y textos 3D.',
                  'Tú solo grabas las tomas; nosotros nos encargamos de todo el resto.',
                  'Imágenes y videos generados con IA + locución profesional incluidos.',
                  'Colorización en DaVinci Resolve para formatos 9:16 y 16:9.'
                ].map((sol, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl border"
                    style={{
                      backgroundColor: 'rgba(2, 152, 84, 0.1)',
                      borderColor: 'rgba(2, 152, 84, 0.2)'
                    }}
                  >
                    <div
                      className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center mt-0.5"
                      style={{ backgroundColor: '#029854' }}
                    >
                      <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" strokeWidth={2.5} />
                    </div>
                    <p className="text-sm md:text-base lg:text-lg font-medium text-white">{sol}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 5. PROCESO EN 4 PASOS ANIMADOS (`#process` y `rX` de 85thAgency)     */}
      {/* ==================================================================== */}
      <section id="process" className="py-12 md:py-24 px-4 md:px-6" style={{ backgroundColor: '#FFFCF5' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-badge mb-4 md:mb-6">Proceso</span>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 px-2"
                style={{ color: '#111111' }}
              >
                Cómo Convertimos Tus Tomas Crudas en Videos que Venden
              </h2>
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto px-2"
                style={{ color: '#666666' }}
              >
                Desde el primer mensaje hasta la entrega final, nos encargamos de toda la postproducción para que tú solo te enfoques en tu negocio.
              </p>
            </motion.div>
          </div>

          <div className="space-y-16 lg:space-y-24">
            {/* PASO 1 */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
              className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center"
            >
              <div className="flex-1 space-y-6">
                <StepBadge currentStep={1} />
                <h3 className="text-3xl lg:text-4xl font-bold text-[#111111]">
                  Elige tu Plan y Duración
                </h3>
                <p className="text-lg lg:text-xl leading-relaxed text-[#666666]">
                  Definimos por WhatsApp el estilo de tu video (Edición Básica o Edición Avanzada), la duración (30s a 120s o más) y los puntos clave que quieres destacar de tu terreno, marca o canal.
                </p>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-1 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #029854 0%, rgba(2, 152, 84, 0.2) 100%)',
                    maxWidth: '200px'
                  }}
                />
              </div>

              <div className="flex-1 w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}
                  whileHover={{ scale: 1.04, rotate: 3 }}
                  className="w-full aspect-square max-w-md mx-auto rounded-3xl flex items-center justify-center relative overflow-hidden shadow-2xl"
                  style={{ backgroundColor: '#111111' }}
                >
                  <div
                    className="absolute inset-0 opacity-25"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(2, 152, 84, 0.5), transparent 70%)'
                    }}
                  />
                  <motion.video
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    src="/cuadro-1.mp4"
                    poster="/video01.jpeg"
                    muted
                    loop
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover rounded-3xl opacity-90"
                  />
                  {/* Ventana Picture-in-Picture idéntica al Paso 1 de 85thAgency */}
                  <div
                    className="absolute bottom-4 right-4 w-32 lg:w-40 rounded-xl overflow-hidden shadow-2xl border-2 border-white/70"
                    style={{ aspectRatio: '16/9' }}
                  >
                    <video
                      src="/cuadro-3.mp4"
                      poster="/video03.jpeg"
                      muted
                      loop
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* PASO 2 */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
              className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-12 items-center"
            >
              <div className="flex-1 space-y-6">
                <StepBadge currentStep={2} />
                <h3 className="text-3xl lg:text-4xl font-bold text-[#111111]">
                  Envía tus Tomas y Guion
                </h3>
                <p className="text-lg lg:text-xl leading-relaxed text-[#666666]">
                  Graba con tu dron, celular o cámara profesional. Solo sube tus clips a nuestra carpeta compartida de Google Drive o envíalos por WhatsApp junto con los datos del proyecto.
                </p>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-1 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #029854 0%, rgba(2, 152, 84, 0.2) 100%)',
                    maxWidth: '200px'
                  }}
                />
              </div>

              <div className="flex-1 w-full">
                <AnimatedUploadBox />
              </div>
            </motion.div>

            {/* PASO 3 */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
              className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center"
            >
              <div className="flex-1 space-y-6">
                <StepBadge currentStep={3} />
                <h3 className="text-3xl lg:text-4xl font-bold text-[#111111]">
                  Editamos, Trazamos y Pulimos con IA
                </h3>
                <p className="text-lg lg:text-xl leading-relaxed text-[#666666]">
                  Realizamos el marcado del terreno, agregamos señaladores flotantes, textos 3D, imágenes/videos generados con IA, locución, música y colorización en DaVinci Resolve.
                </p>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-1 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #029854 0%, rgba(2, 152, 84, 0.2) 100%)',
                    maxWidth: '200px'
                  }}
                />
              </div>

              <div className="flex-1 w-full">
                <AnimatedChatCard />
              </div>
            </motion.div>

            {/* PASO 4 */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
              className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-12 items-center"
            >
              <div className="flex-1 space-y-6">
                <StepBadge currentStep={4} />
                <h3 className="text-3xl lg:text-4xl font-bold text-[#111111]">
                  Recibe y Publica con Confianza
                </h3>
                <p className="text-lg lg:text-xl leading-relaxed text-[#666666]">
                  Tu video terminado se entrega a tiempo, optimizado en máxima calidad para TikTok, Instagram Reels, YouTube o anuncios publicitarios, listo para captar clientes.
                </p>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-1 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #029854 0%, rgba(2, 152, 84, 0.2) 100%)',
                    maxWidth: '200px'
                  }}
                />
              </div>

              <div className="flex-1 w-full">
                <AnimatedDeliveryBox />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 6. CASOS DE ÉXITO DESTACADOS + ANTES/DESPUÉS (`#work` de 85thAgency) */}
      {/* ==================================================================== */}
      <section id="work" className="py-12 md:py-24 px-4 md:px-6" style={{ backgroundColor: '#FFFCF5' }}>
        <div className="max-w-[1120px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3 md:space-y-4 mb-8 md:mb-12"
          >
            <span className="section-badge">Casos de Éxito y Acabado Visual</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 px-2 text-[#111111]">
              Así Luce una Edición que Destaca
            </h2>
          </motion.div>

          {/* Grid Asimétrico idéntico a `lX` de 85thAgency */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-14">
            {/* Tarjeta Grande Izquierda: Con Comparador Interactivo Antes/Después */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group text-left block"
            >
              <div className="relative overflow-hidden rounded-3xl mb-5 aspect-[4/3] select-none shadow-xl border-2 border-[#029854]/20">
                {/* DESPUÉS: Color DaVinci + Trazado */}
                <img
                  src="/video02.jpeg"
                  alt="Después - Edición Avanzada Sync Pro"
                  className="absolute inset-0 w-full h-full object-cover saturate-125 contrast-110"
                />
                <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full pointer-events-none">
                  <polygon
                    points="80,210 175,145 315,170 250,255"
                    fill="rgba(2, 152, 84, 0.22)"
                    stroke="#029854"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                  />
                  <line x1="175" y1="145" x2="175" y2="98" stroke="#ffffff" strokeWidth="2" />
                  <rect x="115" y="72" width="120" height="26" rx="8" fill="#111111" stroke="#029854" strokeWidth="1.5" />
                  <text x="175" y="89" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                    LOTE 500 m² · TRAZADO
                  </text>
                </svg>

                {/* ANTES: Toma Cruda sin editar */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - compareSlider}% 0 0)` }}
                >
                  <img
                    src="/video02.jpeg"
                    alt="Antes - Toma Cruda"
                    className="absolute inset-0 w-full h-full object-cover grayscale-[70%] contrast-75 brightness-90"
                  />
                </div>

                {/* Línea divisoria del Slider */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)] pointer-events-none"
                  style={{ left: `${compareSlider}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#029854] border-2 border-white flex items-center justify-center shadow-lg text-white">
                    <Sliders className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 text-white text-[11px] font-semibold">
                  Antes: Toma Cruda
                </div>
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#029854] text-white text-[11px] font-semibold">
                  Después: Sync Pro + DaVinci
                </div>

                <input
                  type="range"
                  min="5"
                  max="95"
                  value={compareSlider}
                  onChange={(e) => setCompareSlider(Number(e.target.value))}
                  aria-label="Comparar antes y después"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {caseStudies[0].tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] md:text-xs font-medium px-2.5 py-1 rounded-md bg-black/5 text-[#111111]/75"
                  >
                    {tag}
                  </span>
                ))}
                <span className="text-[11px] md:text-xs font-semibold px-2.5 py-1 rounded-md bg-[#029854]/10 text-[#029854]">
                  ↔ Desliza la imagen para comparar
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-4 text-[#111111]">
                {caseStudies[0].headline}
              </h3>

              <button
                onClick={() => scrollToSection('pricing')}
                className="text-sm md:text-base font-semibold underline underline-offset-4 hover:text-[#029854] transition-colors"
              >
                {caseStudies[0].label}
              </button>
            </motion.div>

            {/* Columna Derecha: 2 Tarjetas Horizontales Apiladas */}
            <div className="flex flex-col gap-8 justify-center">
              {caseStudies.slice(1).map((study, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onClick={() => scrollToSection('pricing')}
                  className="group grid grid-cols-1 sm:grid-cols-2 gap-5 text-left items-start cursor-pointer"
                >
                  <div className="overflow-hidden rounded-2xl shadow-md border border-black/5">
                    <img
                      src={study.image}
                      alt={study.client}
                      loading="lazy"
                      className="w-full h-auto aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {study.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] md:text-xs font-medium px-2.5 py-1 rounded-md bg-black/5 text-[#111111]/75"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold leading-snug mb-3 text-[#111111]">
                      {study.headline}
                    </h3>
                    <span className="text-sm font-semibold underline underline-offset-4 group-hover:text-[#029854] transition-colors">
                      {study.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 7. PLANES DE EDICIÓN + PERSONALIZADOR (`#pricing` de 85thAgency)     */}
      {/* ==================================================================== */}
      <section id="pricing" className="py-12 md:py-24 px-4 md:px-6" style={{ backgroundColor: '#FFFCF5' }}>
        <div className="max-w-[1120px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3 md:space-y-4 mb-8 md:mb-12"
          >
            <span className="section-badge">Nuestros Planes</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-2 text-[#111111]">
              Listos para Escalar la Calidad de tus Videos
            </h2>
            <p className="text-sm md:text-base text-[#111111]/70 max-w-2xl mx-auto px-2">
              Selecciona la duración de tu video y elige entre Edición Básica, Edición Avanzada o arma tu pedido a medida con extras de IA y terrenos.
            </p>

            {/* Selector de Duración por Cápsulas (30s / 60s / 90s / 120s) */}
            <div className="pt-4 flex justify-center">
              <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 rounded-full bg-white border border-black/10 shadow-md">
                {editingPlansByDuration.map((tier, idx) => {
                  const active = activeDuration === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveDuration(idx)}
                      className={`px-4 md:px-6 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
                        active
                          ? 'bg-[#029854] text-white shadow-md shadow-[#029854]/25 scale-[1.02]'
                          : 'text-[#111111]/70 hover:text-[#111111] hover:bg-black/5'
                      }`}
                    >
                      <span>{tier.duration}</span>
                      <span
                        className={`hidden sm:inline-block ml-1.5 text-[10px] font-medium ${
                          active ? 'text-white/85' : 'text-[#666666]'
                        }`}
                      >
                        · {tier.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* 3 Tarjetas de Planes idénticas a `#pricing` de 85thAgency */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-8 items-stretch">
            {/* TARJETA 1: EDICIÓN BÁSICA (Blanca) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-md border border-black/10 hover:shadow-xl hover:border-[#029854]/30 hover:-translate-y-2 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4 md:space-y-6">
                <div>
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#029854] bg-[#029854]/10 px-3 py-1 rounded-full mb-2">
                    {currentTier.duration}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-[#111111] mb-1">
                    {currentTier.basic.name}
                  </h3>
                  <p className="text-xs md:text-sm text-[#666666]">{currentTier.basic.subtitle}</p>
                </div>

                <div className="mb-4 md:mb-6">
                  <div className="text-3xl md:text-4xl font-extrabold text-[#029854] mb-1">
                    {currentTier.basic.price}
                  </div>
                  <p className="text-xs md:text-sm text-[#666666]">{currentTier.basic.delivery}</p>
                </div>

                <ul className="space-y-2.5 md:space-y-3">
                  {currentTier.basic.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#029854]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#029854]" />
                      </span>
                      <span className="text-xs md:text-sm text-[#111111]/85 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`https://wa.me/59169109766?text=${encodeURIComponent(
                  `Hola Sync Pro, quiero contratar el plan de ${currentTier.basic.name} (${currentTier.duration} - ${currentTier.basic.price}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-3.5 rounded-full bg-[#029854] text-white hover:bg-[#029854]/90 transition-all duration-300 text-xs md:text-sm font-bold text-center shadow-md block"
              >
                Elegir Edición Básica
              </a>
            </motion.div>

            {/* TARJETA 2 (CENTRAL DESTACADA VERDE): EDICIÓN AVANZADA (Idéntica a "Growth - Creators' choice" de 85thAgency) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-[#029854] text-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-[#029854] relative transform md:scale-105 md:-translate-y-4 hover:-translate-y-6 hover:scale-[1.07] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#111111] text-[#FFFCF5] px-4 py-1 rounded-full text-[11px] md:text-xs font-bold shadow-lg whitespace-nowrap">
                Elección Más Pedida
              </div>

              <div className="space-y-4 md:space-y-6">
                <div>
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-white bg-white/20 px-3 py-1 rounded-full mb-2">
                    {currentTier.duration} · Full Pro
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold mb-1">{currentTier.advanced.name}</h3>
                  <p className="text-xs md:text-sm text-white/85">{currentTier.advanced.subtitle}</p>
                </div>

                <div className="mb-4 md:mb-6">
                  <div className="text-3xl md:text-4xl font-extrabold mb-1">
                    {currentTier.advanced.price}
                  </div>
                  <p className="text-xs md:text-sm text-white/85">{currentTier.advanced.delivery}</p>
                </div>

                <ul className="space-y-2.5 md:space-y-3">
                  {currentTier.advanced.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                      </span>
                      <span className="text-xs md:text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`https://wa.me/59169109766?text=${encodeURIComponent(
                  `Hola Sync Pro, quiero contratar el plan de ${currentTier.advanced.name} (${currentTier.duration} - ${currentTier.advanced.price}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-3.5 bg-[#FFFCF5] text-[#111111] hover:bg-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 text-xs md:text-sm text-center block"
              >
                Elegir Edición Avanzada
              </a>
            </motion.div>

            {/* TARJETA 3: PERSONALIZA TU PEDIDO / EXTRAS A MEDIDA (Blanca) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-md border border-black/10 hover:shadow-xl hover:border-[#029854]/30 hover:-translate-y-2 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4 md:space-y-5">
                <div>
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#111111] bg-black/5 px-3 py-1 rounded-full mb-2">
                    Calculadora en Vivo
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-[#111111] mb-1">
                    Personaliza tu Pedido
                  </h3>
                  <p className="text-xs md:text-sm text-[#666666]">
                    Suma videos con IA o terrenos extra a tu medida
                  </p>
                </div>

                {/* Total calculado en vivo */}
                <div className="p-4 rounded-2xl bg-[#FFFCF5] border border-black/10">
                  <div className="text-xs font-semibold text-[#666666] mb-0.5">
                    Total Estimado ({currentTier.duration}):
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold text-[#029854]">
                    Bs. {totalCustomPrice}
                  </div>
                </div>

                {/* Selector Base */}
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-black/5">
                  <button
                    type="button"
                    onClick={() => setCustomPlanType('basic')}
                    className={`py-2 rounded-lg text-xs font-bold transition-all ${
                      customPlanType === 'basic'
                        ? 'bg-white text-[#111111] shadow-sm'
                        : 'text-[#666666]'
                    }`}
                  >
                    Base Básica
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomPlanType('advanced')}
                    className={`py-2 rounded-lg text-xs font-bold transition-all ${
                      customPlanType === 'advanced'
                        ? 'bg-[#029854] text-white shadow-sm'
                        : 'text-[#666666]'
                    }`}
                  >
                    Base Avanzada
                  </button>
                </div>

                {/* Checkboxes de Adicionales */}
                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => setExtraAiVideo(!extraAiVideo)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                      extraAiVideo
                        ? 'bg-[#029854]/10 border-[#029854] text-[#111111]'
                        : 'bg-white border-black/10 text-[#666666]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center ${
                          extraAiVideo ? 'bg-[#029854] text-white' : 'border border-black/20'
                        }`}
                      >
                        {extraAiVideo && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-xs font-semibold">+1 Video extra con IA</span>
                    </div>
                    <span className="text-xs font-bold text-[#029854]">+Bs. 50</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExtraTerrain(!extraTerrain)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                      extraTerrain
                        ? 'bg-[#029854]/10 border-[#029854] text-[#111111]'
                        : 'bg-white border-black/10 text-[#666666]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center ${
                          extraTerrain ? 'bg-[#029854] text-white' : 'border border-black/20'
                        }`}
                      >
                        {extraTerrain && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-xs font-semibold">+1 Terreno adicional</span>
                    </div>
                    <span className="text-xs font-bold text-[#029854]">+Bs. 80</span>
                  </button>
                </div>

                {/* Resumen de adicionales fijos */}
                <div className="text-[11px] text-[#666666] space-y-1 pt-1 border-t border-black/5">
                  <div>• Ajuste extra: +Bs. 30 (Básica) / +Bs. 60 (Avanzada)</div>
                  <div>• Cada +30 seg extra: +Bs. 60 (Básica) / +Bs. 100 (Avanzada)</div>
                </div>
              </div>

              <a
                href={`https://wa.me/59169109766?text=${encodeURIComponent(
                  `Hola Sync Pro, armé mi pedido personalizado:\n• Plan Base: ${selectedCustomPlan.name}\n• Duración: ${currentTier.duration} (${selectedCustomPlan.price})\n${
                    extraAiVideo ? '• Extra: +1 Video con IA (+Bs. 50)\n' : ''
                  }${
                    extraTerrain ? '• Extra: +1 Terreno adicional (+Bs. 80)\n' : ''
                  }• Total Estimado: Bs. ${totalCustomPrice}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-3.5 rounded-full bg-[#111111] text-white hover:bg-[#029854] transition-all duration-300 text-xs md:text-sm font-bold text-center shadow-md block"
              >
                Enviar Pedido a WhatsApp
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 8. CARRUSEL INFINITO DE RESEÑAS (`iR` de 85thAgency)                 */}
      {/* ==================================================================== */}
      <section className="py-12 md:py-24 px-4 md:px-6" style={{ backgroundColor: '#FFFCF5' }}>
        <div className="max-w-[1120px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3 md:space-y-4 mb-8 md:mb-12"
          >
            <span className="section-badge">Reseñas</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-2 text-[#111111]">
              Lo Que Dicen Nuestros Clientes
            </h2>
          </motion.div>

          <div className="relative overflow-x-clip overflow-y-visible py-4 sm:py-6">
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#FFFCF5] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#FFFCF5] to-transparent z-10 pointer-events-none" />

            <div
              aria-hidden="true"
              onMouseEnter={() => setMarqueeDir('left')}
              onMouseLeave={() => setMarqueeDir(null)}
              className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-20"
            />
            <div
              aria-hidden="true"
              onMouseEnter={() => setMarqueeDir('right')}
              onMouseLeave={() => setMarqueeDir(null)}
              className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-20"
            />

            <div
              className="flex gap-4 sm:gap-6 md:gap-8 py-4 animate-marquee"
              style={{
                animationPlayState: hoveredTestimonial !== null && !marqueeDir ? 'paused' : 'running',
                animationDuration: marqueeDir ? '15s' : '35s',
                animationDirection: marqueeDir === 'left' ? 'reverse' : 'normal',
                width: 'max-content'
              }}
            >
              {[...testimonials, ...testimonials].map((t, idx) => (
                <TestimonialCard
                  key={`${t.name}-${idx}`}
                  testimonial={t}
                  isHovered={hoveredTestimonial === idx}
                  onHover={() => setHoveredTestimonial(idx)}
                  onLeave={() => setHoveredTestimonial(null)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 9. PREGUNTAS FRECUENTES EN ACORDEÓN (`#faq` de 85thAgency)           */}
      {/* ==================================================================== */}
      <section id="faq" className="py-12 md:py-24 px-4 md:px-6" style={{ backgroundColor: '#FFFCF5' }}>
        <div className="max-w-[1120px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3 md:space-y-4 mb-8 md:mb-16"
          >
            <span className="section-badge">Preguntas Frecuentes</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-2 text-[#111111]">
              ¿Tienes Preguntas? Tenemos Respuestas
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-3 md:space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white rounded-lg md:rounded-xl border border-black/10 overflow-hidden hover:border-[#029854]/40 transition-colors duration-300 shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-4 md:px-8 py-4 md:py-6 flex items-center justify-between text-left hover:bg-black/[0.02] transition-colors"
                  >
                    <span className="font-semibold text-sm md:text-base lg:text-lg pr-4 md:pr-8 text-[#111111]">
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-[#029854] flex-shrink-0" />
                    </motion.div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 md:px-8 pb-4 md:pb-6 text-sm md:text-base text-[#111111]/70 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 10. BANNER INTERACTIVO "¿LISTO PARA SUBIR DE NIVEL?" (`ZQ` 85th)     */}
      {/* ==================================================================== */}
      <section className="relative py-16 lg:py-20 px-4 md:px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-[2.5rem] p-10 md:p-14 lg:p-16 overflow-hidden shadow-2xl"
            style={{ backgroundColor: '#111111' }}
          >
            {/* Píldoras Flotantes (Rojas -> Verdes al hacer clic) idénticas a `ZQ` */}
            <AnimatePresence mode="wait">
              {(levelUpSolved ? solutionPills : problemPills).map((label, idx) => (
                <motion.div
                  key={`${levelUpSolved ? 'sol' : 'prob'}-${idx}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -10, 0],
                    rotate: [0, idx % 2 === 0 ? 5 : -5, 0]
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.1,
                    y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                    rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                  }}
                  className="hidden sm:block absolute text-xs lg:text-sm font-medium px-3.5 py-1.5 rounded-full whitespace-nowrap"
                  style={{
                    backgroundColor: levelUpSolved
                      ? 'rgba(2, 152, 84, 0.18)'
                      : 'rgba(239, 68, 68, 0.15)',
                    color: levelUpSolved ? '#029854' : '#ef4444',
                    border: levelUpSolved
                      ? '1px solid rgba(2, 152, 84, 0.35)'
                      : '1px solid rgba(239, 68, 68, 0.3)',
                    left: idx === 0 ? '4%' : idx === 1 ? '6%' : idx === 2 ? '74%' : idx === 3 ? '70%' : '62%',
                    top: idx === 0 ? '14%' : idx === 1 ? '76%' : idx === 2 ? '18%' : idx === 3 ? '76%' : '8%'
                  }}
                >
                  {label}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Destello central al activar */}
            <AnimatePresence>
              {levelUpTriggered && (
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: [0, 2, 3], opacity: [1, 0.5, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <Sparkles className="w-32 h-32 text-[#029854]" />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative z-10 text-center space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                ¿Listo para Subir de Nivel tus Videos?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto">
                Ya sea la edición de un terreno, un Reel comercial o contenido continuo para tus redes y YouTube, estamos listos cuando tú lo estés.
              </p>
              <motion.button
                onClick={handleTriggerLevelUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 text-base sm:text-lg font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl"
                style={{ backgroundColor: '#029854', color: '#FFFFFF' }}
              >
                ¡Resolver Mis Videos Ahora!
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 11. SECCIÓN DE CONTACTO / WHATSAPP DIRECTO (`#book-call` de 85th)    */}
      {/* ==================================================================== */}
      <section id="book-call" className="py-12 md:py-24 px-4 md:px-6" style={{ backgroundColor: '#FFFCF5' }}>
        <div className="max-w-[1120px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3 md:space-y-4 mb-8 md:mb-12"
          >
            <span className="section-badge">Hablemos</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 px-2 text-[#111111]">
              Inicia tu Proyecto Hoy Mismo
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-[#111111]/70 max-w-2xl mx-auto px-2">
              Escríbenos directamente a nuestro WhatsApp o déjanos los datos de tu proyecto para comenzar con la edición de tu video.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-black/10 overflow-hidden grid md:grid-cols-12"
          >
            {/* Columna Izquierda: Contacto Directo WhatsApp */}
            <div className="md:col-span-5 bg-[#111111] text-white p-8 md:p-10 flex flex-col justify-between">
              <div className="space-y-6">
                <span className="inline-block px-3 py-1 rounded-full bg-[#029854]/20 text-[#029854] text-xs font-bold uppercase tracking-wider">
                  Respuesta Inmediata
                </span>
                <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                  Atención Directa por WhatsApp
                </h3>
                <p className="text-sm text-white/75 leading-relaxed">
                  Envíanos un mensaje con la duración aproximada de tu video y el tipo de proyecto (Inmobiliaria, Comercial o Redes).
                </p>

                <div className="space-y-4 pt-2">
                  <a
                    href="https://wa.me/59169109766?text=Hola%20Sync%20Pro,%20quiero%20cotizar%20un%20proyecto%20de%20edici%C3%B3n%20de%20video."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-white/90 hover:text-[#029854] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#029854]/20 flex items-center justify-center text-[#029854]">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-white/50">WhatsApp Directo</div>
                      <div className="font-bold text-base">+591 69109766</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 text-sm text-white/90">
                    <div className="w-10 h-10 rounded-full bg-[#029854]/20 flex items-center justify-center text-[#029854]">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-white/50">Tiempo de Entrega</div>
                      <div className="font-bold text-base">24 a 48 Horas</div>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/59169109766?text=Hola%20Sync%20Pro,%20quiero%20iniciar%20un%20proyecto%20de%20video."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full py-4 rounded-full bg-[#029854] hover:bg-[#029854]/90 text-white font-bold text-sm text-center shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Abrir Chat en WhatsApp
              </a>
            </div>

            {/* Columna Derecha: Formulario Rápido */}
            <div className="md:col-span-7 p-8 md:p-10">
              <h3 className="text-xl md:text-2xl font-bold text-[#111111] mb-2">
                O envíanos tu solicitud aquí
              </h3>
              <p className="text-xs md:text-sm text-[#666666] mb-6">
                Completa tus datos y te contactaremos de inmediato.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    name="Nombre"
                    required
                    placeholder="Tu Nombre"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#FFFCF5] border border-black/15 text-sm text-[#111111] focus:outline-none focus:border-[#029854]"
                  />
                  <input
                    name="Telefono"
                    required
                    placeholder="Tu WhatsApp / Teléfono"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#FFFCF5] border border-black/15 text-sm text-[#111111] focus:outline-none focus:border-[#029854]"
                  />
                </div>
                <input
                  name="Email"
                  type="email"
                  placeholder="Tu Correo Electrónico (opcional)"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#FFFCF5] border border-black/15 text-sm text-[#111111] focus:outline-none focus:border-[#029854]"
                />
                <textarea
                  name="Mensaje"
                  rows="3"
                  required
                  placeholder="Cuéntanos sobre tu video (Ej: Terreno de 60 seg en Edición Avanzada, Reel comercial, etc.)"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#FFFCF5] border border-black/15 text-sm text-[#111111] focus:outline-none focus:border-[#029854]"
                />
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full py-4 rounded-full bg-[#111111] hover:bg-[#029854] text-white font-bold text-sm transition-all shadow-md"
                >
                  {formStatus === 'loading'
                    ? 'Enviando solicitud...'
                    : formStatus === 'success'
                    ? '¡Solicitud Enviada con Éxito!'
                    : 'Enviar Solicitud de Edición'}
                </button>
              </form>
            </div>
          </motion.div>

          <p className="text-center text-xs md:text-sm text-[#111111]/60 mt-6 px-2">
            Sin compromisos ni demoras. Respuesta directa para cotizar tu video.
          </p>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 12. FOOTER REDONDEADO OSCURO (`Qe` de 85thAgency)                    */}
      {/* ==================================================================== */}
      <footer aria-label="Pie de página" className="bg-[#FFFCF5] px-4 pt-8 md:px-6 md:pt-12">
        <div className="mx-auto max-w-[1120px] rounded-t-2xl md:rounded-t-3xl bg-[#111111] px-6 py-10 text-white md:px-10 md:py-14 lg:px-16">
          <div className="grid gap-x-12 gap-y-10 pb-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.8fr] lg:gap-x-16 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#029854] flex items-center justify-center font-black text-white italic">
                  S
                </div>
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Sync<span className="text-[#029854]">Pro</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed text-white/70">
                Edición de video de alta retención, trazado inmobiliario, contenido con IA y colorización en DaVinci Resolve.
                <br />
                Cero complicaciones.
              </p>
              <div className="mt-6 flex flex-col items-start gap-2.5 text-sm text-white/75">
                <a
                  href="https://wa.me/59169109766"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#029854] transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0 text-[#029854]" />
                  +591 69109766 (WhatsApp Oficial)
                </a>
              </div>
            </div>

            <nav aria-label="Servicios">
              <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-white/90">
                Especialidades
              </h2>
              <ul className="space-y-3 text-sm text-white/70">
                <li>Edición de Videos Inmobiliarios & Terrenos</li>
                <li>Reels, TikToks y YouTube Shorts (9:16)</li>
                <li>Videos Horizontales & Master Plans (16:9)</li>
                <li>Señaladores Flotantes, Textos 3D e IA</li>
                <li>Colorización en DaVinci Resolve</li>
              </ul>
            </nav>

            <nav aria-label="Navegación rápida">
              <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-white/90">
                Sync Pro
              </h2>
              <ul className="space-y-3 text-sm text-white/70">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="hover:text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/59169109766?text=Hola%20Sync%20Pro,%20quiero%20cotizar%20un%20video."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#029854] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#029854]/90 transition-all"
              >
                Cotizar por WhatsApp
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </nav>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <p>© 2026 Sync Pro · Estudio de Post-Producción Digital. Todos los derechos reservados.</p>
            <p>Santa Cruz, Bolivia</p>
          </div>
        </div>
      </footer>

      {/* ==================================================================== */}
      {/* MODAL DE REPRODUCCIÓN DE VIDEO (Al hacer clic en un proyecto)        */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {selectedVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideoModal(null)}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full ${
                selectedVideoModal.aspect === '16/9' ? 'max-w-4xl aspect-video' : 'max-w-sm aspect-[9/16]'
              } bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20`}
            >
              <button
                onClick={() => setSelectedVideoModal(null)}
                aria-label="Cerrar video"
                className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-[#029854] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <video
                src={selectedVideoModal.video}
                poster={selectedVideoModal.poster}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* BOTONES FLOTANTES: SUBIR ARRIBA (`gt` de 85th) + WHATSAPP OFICIAL    */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Volver arriba"
            className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-[#111111] text-white shadow-lg hover:bg-[#029854] transition-colors flex items-center justify-center"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href="https://wa.me/59169109766?text=Hola%20Sync%20Pro,%20quiero%20cotizar%20un%20video."
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-3.5 bg-[#029854] text-white rounded-full shadow-2xl shadow-[#029854]/40 font-bold text-xs md:text-sm"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span>WhatsApp</span>
      </motion.a>
    </div>
  );
};

export default App;
