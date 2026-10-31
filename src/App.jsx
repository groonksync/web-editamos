import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  ArrowUpRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  Cpu,
  Send,
  MessageCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Mic,
  Film,
  Plus,
  ShieldCheck,
  Zap,
  Camera,
  Sliders,
  Type,
  Lock,
  Eye,
  Scissors,
  ThumbsUp,
  ThumbsDown,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WHATSAPP_NUMBER = '59169109766';

/* ============================================================================
   DATOS DE MARCAS, FOTOGRAFÍA COMERCIAL Y DETRÁS DE CÁMARAS ("ASÍ TRABAJAMOS")
   ============================================================================ */
const BRAND_LOGOS = [
  { name: 'Century 21 Home', src: '/logos/century21-home.png', scale: 'scale-[1.08]' },
  { name: 'RE/MAX', src: '/logos/remax.png', scale: 'scale-[1.18]' },
  { name: 'Century 21', src: '/logos/c21.png', scale: 'scale-[1.12]' },
  { name: 'HouStyle Inmobiliaria', src: '/logos/houstyle.png', scale: 'scale-[1.08]' },
  { name: 'Urbanización Rosario', src: '/logos/urbanizacion-rosario.png', scale: 'scale-[1.12]' },
  { name: 'Sport Fit', src: '/logos/sportfit.png', scale: 'scale-100' },
  { name: 'KORUM FIT', src: '/logos/korum-fit.png', scale: 'scale-[1.06]' },
  { name: 'Sync Creative', src: '/logos/logo-degradado.png', scale: 'scale-100' }
];

const COMMERCIAL_PHOTOS = [
  {
    id: 'foto-1',
    type: 'photo',
    title: 'Fotografía gastronómica',
    subtitle: 'Corte de carne a la parrilla',
    src: 'https://estudiovector.com/img/p/corte-de-carne.webp',
    wide: false
  },
  {
    id: 'foto-2',
    type: 'photo',
    title: 'Fotografía gastronómica',
    subtitle: 'Slice Pizza: porción con queso derretido',
    src: 'https://estudiovector.com/img/p/slice-pizza.webp',
    wide: false
  },
  {
    id: 'foto-3',
    type: 'photo',
    title: 'Fotografía de platos',
    subtitle: 'Gratinado al horno',
    src: 'https://estudiovector.com/img/p/gratinado.webp',
    wide: true
  },
  {
    id: 'foto-4',
    type: 'photo',
    title: 'Fotografía de bebidas',
    subtitle: 'Cóctel azul con luz de ambiente',
    src: 'https://estudiovector.com/img/p/coctel-azul.webp',
    wide: false
  },
  {
    id: 'foto-5',
    type: 'photo',
    title: 'Fotografía gastronómica',
    subtitle: 'Hamburguesa doble',
    src: 'https://estudiovector.com/img/p/hamburguesa.webp',
    wide: false
  },
  {
    id: 'foto-6',
    type: 'photo',
    title: 'Fotografía de platos',
    subtitle: 'Pasta con salsa de la casa',
    src: 'https://estudiovector.com/img/p/pasta.webp',
    wide: false
  },
  {
    id: 'foto-7',
    type: 'photo',
    title: 'Fotografía gastronómica',
    subtitle: 'Canastas de plátano rellenas',
    src: 'https://estudiovector.com/img/p/canastas-de-platano.webp',
    wide: true
  },
  {
    id: 'foto-8',
    type: 'photo',
    title: 'Fotografía de postres',
    subtitle: 'Postre y bebida de la casa',
    src: 'https://estudiovector.com/img/p/postre-y-bebida.webp',
    wide: false
  },
  {
    id: 'foto-9',
    type: 'photo',
    title: 'Fotografía de platos',
    subtitle: 'Plato en sartén de hierro',
    src: 'https://estudiovector.com/img/p/sarten-de-hierro.webp',
    wide: false
  },
  {
    id: 'foto-10',
    type: 'photo',
    title: 'Fotografía de desayunos',
    subtitle: 'Desayuno típico comercial',
    src: 'https://estudiovector.com/img/p/desayuno-tipico.webp',
    wide: false
  }
];

const BTS_ITEMS = [
  {
    id: 'backstage-3',
    type: 'video',
    title: 'Marca personal',
    subtitle: 'Sesión de video para marca personal',
    videoSrc: 'https://estudiovector.com/video/p/backstage-3.mp4',
    fullVideoSrc: 'https://estudiovector.com/video/backstage-3.mp4',
    poster: 'https://estudiovector.com/img/p/backstage-3.webp'
  },
  {
    id: 'bts-flash-comida',
    type: 'photo',
    title: 'Fotografía gastronómica',
    subtitle: 'Flash y cámara en sesión de producto',
    src: 'https://estudiovector.com/img/p/bts-flash-comida.webp'
  },
  {
    id: 'bts-set-entrevista',
    type: 'photo',
    title: 'Set de entrevista',
    subtitle: 'Luces y cámara listas para grabar',
    src: 'https://estudiovector.com/img/p/bts-set-entrevista.webp'
  },
  {
    id: 'backstage-1',
    type: 'video',
    title: 'Grabación en locación',
    subtitle: 'Producción de contenido para marca',
    videoSrc: 'https://estudiovector.com/video/p/backstage-1.mp4',
    fullVideoSrc: 'https://estudiovector.com/video/backstage-1.mp4',
    poster: 'https://estudiovector.com/img/p/backstage-1.webp'
  },
  {
    id: 'bts-set-mesa',
    type: 'photo',
    title: 'Set de grabación',
    subtitle: 'Sesión de marca personal con iluminación de estudio',
    src: 'https://estudiovector.com/img/p/bts-set-mesa.webp'
  },
  {
    id: 'bts-monitor-set',
    type: 'photo',
    title: 'Set de grabación',
    subtitle: 'Monitor de cámara en sesión de entrevista',
    src: 'https://estudiovector.com/img/p/bts-monitor-set.webp'
  },
  {
    id: 'backstage-2',
    type: 'video',
    title: 'Grabación en locación',
    subtitle: 'Producción de video comercial',
    videoSrc: 'https://estudiovector.com/video/p/backstage-2.mp4',
    fullVideoSrc: 'https://estudiovector.com/video/backstage-2.mp4',
    poster: 'https://estudiovector.com/img/p/backstage-2.webp'
  },
  {
    id: 'bts-set-luces',
    type: 'photo',
    title: 'Estudio',
    subtitle: 'Iluminación para sesión de video',
    src: 'https://estudiovector.com/img/p/bts-set-luces.webp'
  },
  {
    id: 'bts-oficina-verde',
    type: 'photo',
    title: 'Grabación en oficina',
    subtitle: 'Producción de video corporativo',
    src: 'https://estudiovector.com/img/p/bts-oficina-verde.webp'
  },
  {
    id: 'bts-camara-detras',
    type: 'photo',
    title: 'Detrás de cámaras',
    subtitle: 'Grabación de contenido en tienda',
    src: 'https://estudiovector.com/img/p/bts-camara-detras.webp'
  },
  {
    id: 'bts-entrevista-estudio',
    type: 'video',
    title: 'Entrevista en estudio',
    subtitle: 'Grabación con iluminación de estudio y monitor',
    videoSrc: 'https://estudiovector.com/video/p/bts-entrevista-estudio.mp4',
    fullVideoSrc: 'https://estudiovector.com/video/bts-entrevista-estudio.mp4',
    poster: 'https://estudiovector.com/img/p/bts-entrevista-estudio.webp'
  },
  {
    id: 'bts-podcast',
    type: 'video',
    title: 'Grabación de podcast',
    subtitle: 'Detrás de cámaras de un episodio',
    videoSrc: 'https://estudiovector.com/video/p/bts-podcast.mp4',
    fullVideoSrc: 'https://estudiovector.com/video/bts-podcast.mp4',
    poster: 'https://estudiovector.com/img/p/bts-podcast.webp'
  },
  {
    id: 'bts-entrevista-oficina',
    type: 'video',
    title: 'Entrevista corporativa',
    subtitle: 'Grabación en la oficina del cliente',
    videoSrc: 'https://estudiovector.com/video/p/bts-entrevista-oficina.mp4',
    fullVideoSrc: 'https://estudiovector.com/video/bts-entrevista-oficina.mp4',
    poster: 'https://estudiovector.com/img/p/bts-entrevista-oficina.webp'
  },
  {
    id: 'bts-set-producto',
    type: 'video',
    title: 'Set de producto',
    subtitle: 'Montaje de luces para video de producto',
    videoSrc: 'https://estudiovector.com/video/p/bts-set-producto.mp4',
    fullVideoSrc: 'https://estudiovector.com/video/bts-set-producto.mp4',
    poster: 'https://estudiovector.com/img/p/bts-set-producto.webp'
  },
  {
    id: 'bts-entrevista-set',
    type: 'photo',
    title: 'Set de entrevista',
    subtitle: 'Cámara, softbox y monitor listos para grabar',
    src: 'https://estudiovector.com/img/p/bts-entrevista-set.webp'
  },
  {
    id: 'bts-podcast-mesa',
    type: 'photo',
    title: 'Podcast',
    subtitle: 'Grabación de episodio con dos invitados',
    src: 'https://estudiovector.com/img/p/bts-podcast-mesa.webp'
  },
  {
    id: 'bts-podcast-camara',
    type: 'photo',
    title: 'Podcast',
    subtitle: 'Cámara y luz principal en el set del podcast',
    src: 'https://estudiovector.com/img/p/bts-podcast-camara.webp'
  },
  {
    id: 'bts-estudio-luces',
    type: 'photo',
    title: 'Estudio',
    subtitle: 'Iluminación de color para video de marca',
    src: 'https://estudiovector.com/img/p/bts-estudio-luces.webp'
  },
  {
    id: 'bts-producto-set',
    type: 'photo',
    title: 'Set de producto',
    subtitle: 'Mesa, luces y fondo para grabación de producto',
    src: 'https://estudiovector.com/img/p/bts-producto-set.webp'
  },
  {
    id: 'bts-detailing',
    type: 'photo',
    title: 'Grabación automotriz',
    subtitle: 'Sesión de video en taller de detailing',
    src: 'https://estudiovector.com/img/p/bts-detailing.webp'
  }
];

/* ============================================================================
   CARRUSEL INFINITO INTERACTIVO (OPTIMIZADO PARA SMARTPHONE Y ESCRITORIO)
   ============================================================================ */
const InfiniteMediaCarousel = ({
  items,
  onSelectItem,
  cardHeightClass = 'h-[300px] sm:h-[360px] md:h-[430px] lg:h-[460px]'
}) => {
  const scrollRef = useRef(null);
  const [unmutedKey, setUnmutedKey] = useState(null);

  // En móvil y escritorio duplicamos lo justo para bucle continuo sin sobrecargar decodificadores móviles
  const baseList = items.length < 8 ? [...items, ...items] : items;
  const loopList = [...baseList, ...baseList];

  useEffect(() => {
    const box = scrollRef.current;
    if (!box) return;

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let pos = box.scrollLeft || 0;
    let paused = false;
    let hover = false;
    let drag = null;
    let dragged = false;
    let resumeTimer = null;
    let half = 0;
    let onscreen = true;
    let rafId = null;

    const measure = () => {
      if (box) {
        half = box.scrollWidth / 2;
      }
    };

    const wrap = () => {
      if (half > 0) {
        if (box.scrollLeft >= half) {
          box.scrollLeft -= half;
        } else if (box.scrollLeft <= 0) {
          box.scrollLeft += half;
        }
      }
    };

    const stop = () => {
      paused = true;
      if (resumeTimer) clearTimeout(resumeTimer);
    };

    const go = (delay = 1400) => {
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        if (hover || drag) return;
        pos = box.scrollLeft;
        paused = false;
      }, delay);
    };

    const onTouchStart = () => stop();
    const onTouchEnd = () => go(2200);

    const onPointerEnter = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      hover = true;
      stop();
    };

    const onPointerLeave = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      hover = false;
      if (drag) {
        drag = null;
        box.classList.remove('cursor-grabbing');
        setTimeout(() => {
          dragged = false;
        }, 50);
      }
      go(400);
    };

    const onPointerDown = (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      if (e.target.closest('button')) return;
      drag = { x: e.clientX, left: box.scrollLeft };
      dragged = false;
      stop();
    };

    const onPointerMove = (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (!dragged && Math.abs(dx) > 6) {
        dragged = true;
        box.classList.add('cursor-grabbing');
      }
      if (dragged) {
        box.scrollLeft = drag.left - dx;
        wrap();
        if (box.scrollLeft !== drag.left - dx) {
          drag.left = box.scrollLeft + dx;
        }
      }
    };

    const onWindowPointerUp = () => {
      if (drag) {
        drag = null;
        box.classList.remove('cursor-grabbing');
        setTimeout(() => {
          dragged = false;
        }, 50);
        if (!hover) go(1200);
      }
    };

    const onClickCapture = (e) => {
      if (dragged) {
        e.stopPropagation();
        e.preventDefault();
      }
    };

    const onScroll = () => {
      if (paused) {
        wrap();
      }
    };

    box.addEventListener('touchstart', onTouchStart, { passive: true });
    box.addEventListener('touchend', onTouchEnd, { passive: true });
    box.addEventListener('touchcancel', onTouchEnd, { passive: true });
    box.addEventListener('pointerenter', onPointerEnter);
    box.addEventListener('pointerleave', onPointerLeave);
    box.addEventListener('pointerdown', onPointerDown);
    box.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onWindowPointerUp);
    box.addEventListener('click', onClickCapture, true);
    box.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);

    measure();
    const mTimer1 = setTimeout(measure, 400);
    const mTimer2 = setTimeout(measure, 1200);

    let io = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        onscreen = entries[0]?.isIntersecting ?? true;
        if (onscreen) pos = box.scrollLeft;
      });
      io.observe(box);
    }

    const isMobile = window.matchMedia && window.matchMedia('(max-width: 767px)').matches;
    const SPEED = isMobile ? 56 : 78;
    let last = 0;

    const step = (now) => {
      const dt = last ? Math.min(50, now - last) : 16;
      last = now;
      if (!paused && onscreen && half > 0) {
        pos += (SPEED * dt) / 1000;
        if (pos >= half) pos -= half;
        box.scrollLeft = pos;
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (resumeTimer) clearTimeout(resumeTimer);
      clearTimeout(mTimer1);
      clearTimeout(mTimer2);
      if (io) io.disconnect();
      box.removeEventListener('touchstart', onTouchStart);
      box.removeEventListener('touchend', onTouchEnd);
      box.removeEventListener('touchcancel', onTouchEnd);
      box.removeEventListener('pointerenter', onPointerEnter);
      box.removeEventListener('pointerleave', onPointerLeave);
      box.removeEventListener('pointerdown', onPointerDown);
      box.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onWindowPointerUp);
      box.removeEventListener('click', onClickCapture, true);
      box.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
    };
  }, [items]);

  const scrollByStep = (dir) => {
    const box = scrollRef.current;
    if (!box) return;
    const card = box.querySelector('.sync-reel-card');
    const stepWidth = card ? card.getBoundingClientRect().width + 16 : 280;
    box.scrollBy({ left: dir * stepWidth, behavior: 'smooth' });
  };

  return (
    <div className="relative group/carousel">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar sync-edge-mask py-4 md:py-6 px-3 sm:px-6 md:px-10 cursor-grab select-none"
      >
        <div className="flex w-max items-center">
          {loopList.map((item, idx) => {
            const instanceKey = `${item.id}-${idx}`;
            const isVideo = item.type === 'video';
            const isUnmuted = unmutedKey === instanceKey;
            const aspectClass = isVideo ? 'aspect-[9/16]' : item.wide ? 'aspect-[4/3]' : 'aspect-[3/4]';

            return (
              <figure
                key={instanceKey}
                onClick={() => onSelectItem && onSelectItem(item)}
                className={`sync-reel-card relative flex-none ${cardHeightClass} ${aspectClass} mr-3 md:mr-4 rounded-[20px] md:rounded-[22px] overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-[0_20px_44px_-20px_rgba(0,0,0,0.85)] cursor-pointer isolate`}
              >
                {isVideo ? (
                  <video
                    src={item.videoSrc}
                    poster={item.poster || undefined}
                    autoPlay
                    muted={!isUnmuted}
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover block pointer-events-none"
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={`${item.title}: ${item.subtitle}`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover block pointer-events-none"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 pointer-events-none" />

                {item.category && (
                  <span className="absolute left-2.5 top-2.5 md:left-3 md:top-3 z-10 px-2 py-0.5 md:px-2.5 md:py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-200 max-w-[72%] truncate">
                    {item.category}
                  </span>
                )}

                {isVideo ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUnmutedKey(isUnmuted ? null : instanceKey);
                    }}
                    title={isUnmuted ? 'Silenciar audio' : 'Activar audio'}
                    className="absolute right-2.5 top-2.5 md:right-3 md:top-3 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-white hover:text-zinc-950 text-white border border-white/25 backdrop-blur-md flex items-center justify-center transition-all duration-300"
                  >
                    {isUnmuted ? <Volume2 size={15} /> : <VolumeX size={15} />}
                  </button>
                ) : (
                  <span className="absolute right-2.5 top-2.5 md:right-3 md:top-3 z-10 w-8 h-8 rounded-full bg-black/45 border border-white/20 text-white/80 backdrop-blur-md flex items-center justify-center">
                    <Camera size={14} />
                  </span>
                )}

                <figcaption className="absolute left-3 right-3 bottom-3 md:left-3.5 md:right-3.5 md:bottom-3.5 z-10 text-left text-white pointer-events-none">
                  <b className="block text-[13px] md:text-[15px] font-extrabold uppercase tracking-tight leading-tight drop-shadow">
                    {item.title}
                  </b>
                  <span className="block text-[10.5px] md:text-[11px] font-medium text-white/75 leading-snug mt-0.5 line-clamp-2">
                    {item.subtitle}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollByStep(-1)}
        aria-label="Anterior"
        className="hidden md:grid place-items-center absolute left-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-zinc-950/75 hover:bg-white text-white hover:text-zinc-950 border border-white/25 backdrop-blur-md shadow-xl transition-all duration-200 hover:scale-105"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        onClick={() => scrollByStep(1)}
        aria-label="Siguiente"
        className="hidden md:grid place-items-center absolute right-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-zinc-950/75 hover:bg-white text-white hover:text-zinc-950 border border-white/25 backdrop-blur-md shadow-xl transition-all duration-200 hover:scale-105"
      >
        <ChevronRight size={22} />
      </button>
    </div>
  );
};

/* ============================================================================
   SECCIÓN: EDICIÓN DE VIDEO QUE DESTACA (CREATORFLOW INSPIRED)
   ============================================================================ */
const VideoEditsThatStandOutSection = () => {
  const marqueeItems = [
    '10 años en la industria',
    'Entrega rápida en 48h',
    '+500 videos entregados',
    '2x más retención de audiencia',
    'Calificación 4.9 estrellas',
    '100% DaVinci Resolve Studio',
    'Calidad 4K y Colorimetría Pro',
    'Edición orientada a ventas',
    'Cero pausas muertas',
    'Formatos Reels, TikTok y YouTube'
  ];

  return (
    <section
      id="edicion-destacada"
      className="relative pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 overflow-hidden bg-[#fafafa] border-b border-zinc-200/80"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.045) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.045) 1px, transparent 1px)
        `,
        backgroundSize: '28px 28px'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-14 md:mb-18">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* COLUMNA IZQUIERDA: Textos de Alto Impacto y CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Pill superior: Trusted By 100+ Creators */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white border border-zinc-200 shadow-2xs mb-6 sm:mb-8">
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Creador 1"
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border-2 border-white ring-1 ring-zinc-200/60"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Creador 2"
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border-2 border-white ring-1 ring-zinc-200/60 -ml-2"
                />
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                  alt="Creador 3"
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border-2 border-white ring-1 ring-zinc-200/60 -ml-2"
                />
              </div>
              <span className="text-xs sm:text-[13px] font-semibold text-zinc-800 pr-1 tracking-tight">
                Con la confianza de +100 creadores
              </span>
            </div>

            {/* Título Principal Idéntico a CreatorFlow */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black tracking-tight text-zinc-950 leading-[1.06] mb-5 sm:mb-6">
              <span>Edición de Video</span>
              <span className="inline-flex items-center justify-center w-10 h-10 sm:w-13 sm:h-13 md:w-15 md:h-15 rounded-2xl bg-[#ff4e00] text-white shadow-lg shadow-orange-500/30 align-middle ml-2 sm:ml-3 shrink-0">
                <Sparkles className="w-5 h-5 sm:w-7 sm:h-7" />
              </span>
              <br />
              <span>Que </span>
              <span className="text-[#ff4e00]">¡Destacan!</span>
            </h2>

            {/* Subtítulo enfocado en retención y ventas */}
            <p className="text-base sm:text-lg md:text-xl text-zinc-600 font-normal leading-relaxed max-w-lg mb-8">
              Ganchos más rápidos. Edición más inteligente. Multiplica tu audiencia y clientes con videos que detienen
              el scroll.
            </p>

            {/* Botón CTA Book a Call */}
            <div>
              <a
                href="#contacto"
                className="inline-flex items-center gap-3.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-zinc-950 text-white font-bold text-sm sm:text-base hover:bg-zinc-800 transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] group"
              >
                <span>Agendar una Llamada</span>
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-zinc-950 flex items-center justify-center group-hover:translate-x-1 transition-transform shrink-0">
                  <ArrowRight size={15} />
                </span>
              </a>
              <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-medium">Sin presiones, solo posibilidades.</p>
            </div>
          </div>

          {/* COLUMNA DERECHA: Dos Tarjetas de Comentarios Flotantes */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center pt-4 lg:pt-0 space-y-4 sm:space-y-6">
            {/* Tarjeta 1: @tomas (inclinada hacia la derecha) */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full max-w-[340px] sm:max-w-[360px] bg-white rounded-2xl p-4 sm:p-5 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.08)] border border-zinc-200/90 rotate-[3deg] hover:rotate-0 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-2.5">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="@tomas"
                  className="w-10 h-10 rounded-full object-cover border border-zinc-200 shrink-0"
                />
                <div>
                  <div className="text-sm font-bold text-zinc-900 leading-tight">@tomas</div>
                </div>
              </div>
              <p className="text-sm text-zinc-800 font-medium leading-relaxed mb-4">
                La mejor edición en 48 horas.
              </p>
              <div className="flex items-center gap-4 text-zinc-400 text-xs font-medium">
                <button type="button" aria-label="Me gusta" className="hover:text-zinc-900 transition-colors flex items-center gap-1">
                  <ThumbsUp size={15} />
                </button>
                <button type="button" aria-label="No me gusta" className="hover:text-zinc-900 transition-colors flex items-center gap-1">
                  <ThumbsDown size={15} />
                </button>
                <div className="flex items-center gap-1.5 ml-auto text-zinc-700 hover:text-zinc-950 font-semibold cursor-pointer">
                  <span className="w-5 h-5 rounded-full bg-[#ff4e00] text-white flex items-center justify-center shrink-0">
                    <Sparkles size={10} />
                  </span>
                  <span className="text-xs">Responder</span>
                </div>
              </div>
            </motion.div>

            {/* Tarjeta 2: @mark_locus (inclinada hacia la izquierda) */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              className="w-full max-w-[340px] sm:max-w-[360px] bg-white rounded-2xl p-4 sm:p-5 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.08)] border border-zinc-200/90 -rotate-[3deg] hover:rotate-0 hover:scale-[1.02] transition-all duration-300 sm:mr-4"
            >
              <div className="flex items-center gap-3 mb-2.5">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="@mark_locus"
                  className="w-10 h-10 rounded-full object-cover border border-zinc-200 shrink-0"
                />
                <div>
                  <div className="text-sm font-bold text-zinc-900 leading-tight">@mark_locus</div>
                </div>
              </div>
              <p className="text-sm text-zinc-800 font-medium leading-relaxed mb-4">
                ¡Esta edición aumentó mi tasa de retención un 35%!
              </p>
              <div className="flex items-center gap-4 text-zinc-400 text-xs font-medium">
                <button type="button" aria-label="Me gusta" className="hover:text-zinc-900 transition-colors flex items-center gap-1">
                  <ThumbsUp size={15} />
                </button>
                <button type="button" aria-label="No me gusta" className="hover:text-zinc-900 transition-colors flex items-center gap-1">
                  <ThumbsDown size={15} />
                </button>
                <div className="flex items-center gap-1.5 ml-auto text-zinc-700 hover:text-zinc-950 font-semibold cursor-pointer">
                  <span className="w-5 h-5 rounded-full bg-[#ff4e00] text-white flex items-center justify-center shrink-0">
                    <Sparkles size={10} />
                  </span>
                  <span className="text-xs">Responder</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* TAPE / MARQUEE INFERIOR CON DESPLAZAMIENTO HACIA LA IZQUIERDA */}
      <div className="relative w-full overflow-hidden py-3 border-t border-zinc-200/60 bg-white/70 backdrop-blur-xs select-none">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          className="flex items-center gap-3 w-max"
        >
          {[...marqueeItems, ...marqueeItems].map((badge, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200/90 shadow-2xs text-xs sm:text-[13px] font-semibold text-zinc-800 shrink-0 hover:border-zinc-300 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-zinc-950 shrink-0" viewBox="0 0 24 24">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
              <span>{badge}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const App = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [selectedDurationIndex, setSelectedDurationIndex] = useState(1);
  const [lightboxItem, setLightboxItem] = useState(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxItem(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Enviando...');
    try {
      const response = await fetch('https://formspree.io/f/xnjgdbdd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus('¡Mensaje enviado con éxito!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Error al enviar. Inténtalo de nuevo.');
      }
    } catch (error) {
      setStatus('Error de red.');
    }
  };

  // --- CONFIGURACIÓN DE VIDEOS ---
  // Mantenemos intacto el arreglo videoIds para compatibilidad con actualizar_videos.py
  const [videoIds] = useState([
    '19tLxlkE8-hy H2-2UULa87X2Niu2X2-vA', // Cuadro 1
    '1-hA022vE8-hyH2-2UULa87X2Niu2X2-vA', // Cuadro 2
    '19tLxlkE8-hyH2-2UULa87X2Niu2X2-vA', // Cuadro 3
    '19tLxlkE8-hyH2-2UULa87X2Niu2X2-vA', // Cuadro 4
    '19tLxlkE8-hyH2-2UULa87X2Niu2X2-vA' // Cuadro 5
  ]);

  const projects = [
    {
      id: 'cuadro-1',
      type: 'video',
      title: 'SPORT FIT',
      category: 'Fitness & Suplementos',
      subtitle: 'Edición comercial rítmica de alto impacto',
      videoSrc: '/cuadro-1.mp4',
      fullVideoSrc: '/cuadro-1.mp4'
    },
    {
      id: 'cuadro-2',
      type: 'video',
      title: 'ZAMBRANOS',
      category: 'Comercial & Marca',
      subtitle: 'Storytelling visual y retención para redes',
      videoSrc: '/cuadro-2.mp4',
      fullVideoSrc: '/cuadro-2.mp4'
    },
    {
      id: 'cuadro-3',
      type: 'video',
      title: 'CHINO BARBER',
      category: 'Estilo & Lifestyle',
      subtitle: 'Cortes dinámicos, speed ramps y diseño sonoro',
      videoSrc: '/cuadro-3.mp4',
      fullVideoSrc: '/cuadro-3.mp4'
    },
    {
      id: 'cuadro-4',
      type: 'video',
      title: 'NOVAFIT',
      category: 'Entrenamiento & Energía',
      subtitle: 'Colorización cinematográfica y ritmo publicitario',
      videoSrc: '/cuadro-4.mp4',
      fullVideoSrc: '/cuadro-4.mp4'
    },
    {
      id: 'cuadro-5',
      type: 'video',
      title: 'YOJA HAIR LOUNGE',
      category: 'Belleza & Estética',
      subtitle: 'Acabado visual limpio y estética de marca',
      videoSrc: '/cuadro-5.mp4',
      fullVideoSrc: '/cuadro-5.mp4'
    }
  ];

  const durationPlans = [
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

  const activeDuration = durationPlans[selectedDurationIndex];

  const getWhatsAppPlanUrl = (planName, durationLabel, priceBs) => {
    const text = `Hola Sync Pro, quiero contratar el plan de *${planName}* (${durationLabel} - Bs. ${priceBs}). Tengo mis tomas listas para empezar.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const tools = [
    {
      name: 'WorkFlow Sync DRX',
      target: 'DaVinci Resolve Studio (Edit & Fusion)',
      description:
        'Automatiza tareas repetitivas, organiza bins inteligentes y acelera el renderizado de composiciones Fusion en segundos.',
      badge: 'Best Seller',
      icon: <Layers className="text-zinc-900" size={20} />,
      specs: ['Auto-Render Queue', 'Smart MediaPool Bins', 'Fusion Macros 3D', 'Frame-Accurate Sync']
    },
    {
      name: 'ColorMaster Node',
      target: 'DaVinci Resolve Studio (Color Page)',
      description:
        'Árboles de nodos pre-configurados con gestión de color ACES, aislamiento de tonos de piel y archivos .CUBE de cine.',
      badge: 'Nuevo',
      icon: <Cpu className="text-zinc-900" size={20} />,
      specs: ['One-Click ACES Pipeline', 'Skin Tone Isolation', 'Halation & Bloom Realista', 'Archivos .CUBE Incluidos']
    }
  ];

  const navLinks = [
    { label: 'Videos', href: '#inicio-videos' },
    { label: 'Marcas', href: '#marcas' },
    { label: 'Fotografía', href: '#fotografia' },
    { label: 'Así Trabajamos', href: '#asi-trabajamos' },
    { label: 'Destacan', href: '#edicion-destacada' },
    { label: 'Planes', href: '#planes-edicion' },
    { label: 'Contacto', href: '#contacto' }
  ];

  return (
    <div className="min-h-screen bg-[#ffffff] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white overflow-x-clip">
      {/* Navegación con barra rápida táctil en Smartphone y barra clásica en Escritorio */}
      <header className="sticky top-0 w-full z-50 bg-zinc-950/95 backdrop-blur-xl border-b border-white/[0.08] text-white">
        <div className="px-4 sm:px-6 md:px-8 py-3 md:py-3.5 flex justify-between items-center">
          <a href="#" className="text-base sm:text-lg font-extrabold tracking-tight flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span>SYNC PRO</span>
          </a>

          <nav className="hidden lg:flex gap-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
            {navLinks.slice(0, 6).map((item) => (
              <a key={item.href} href={item.href} className="hover:text-white transition-colors">
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              'Hola Sync Pro, vi su portafolio web y quiero cotizar un proyecto.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-zinc-950 px-3.5 sm:px-4 py-2 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center gap-1.5"
          >
            <MessageCircle size={13} /> Escríbenos
          </a>
        </div>

        {/* Barra de acceso rápido deslizable solo para Smartphone / Tablet (< 1024px) */}
        <nav
          aria-label="Secciones móviles"
          className="lg:hidden flex items-center gap-1.5 overflow-x-auto no-scrollbar px-4 pb-2.5 border-t border-white/[0.05] pt-2"
        >
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex-none px-3 py-1 rounded-full bg-white/[0.06] active:bg-white active:text-zinc-950 border border-white/10 text-[10px] font-semibold uppercase tracking-wider text-zinc-300 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      {/* =====================================================================
          1. ESCENARIO DE INICIO EN NEGRO & GRIS CARBÓN (OPTIMIZADO PARA MÓVIL Y PC)
          ===================================================================== */}
      <section
        id="inicio-videos"
        className="sync-stage relative text-white pt-6 pb-7 md:pt-11 md:pb-11 border-b border-zinc-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
          <div>
            <span className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] sm:tracking-[0.28em] text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
              DaVinci Resolve Studio · Motion 3D · IA
            </span>
            <h1 className="mt-1.5 sm:mt-2 text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.94] text-white">
              Edición <span className="text-zinc-400">que vende.</span>
            </h1>
          </div>

          <div className="grid grid-cols-2 sm:flex gap-2.5 w-full sm:w-auto">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'Hola Sync Pro, quiero que trabajemos juntos. ¿Me pueden dar información?'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-zinc-950 px-4 sm:px-6 py-3 rounded-xl font-bold text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all shadow-lg"
            >
              <MessageCircle size={15} /> Trabajemos
            </a>
            <a
              href="#planes-edicion"
              className="bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/15 px-4 sm:px-6 py-3 rounded-xl font-bold text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all backdrop-blur-md"
            >
              Ver Planes <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        <div className="mt-3 md:mt-4">
          <InfiniteMediaCarousel items={projects} onSelectItem={(item) => setLightboxItem(item)} />
        </div>

        <p className="mt-1 px-4 text-center text-[10.5px] sm:text-[11px] font-medium tracking-wide text-zinc-400">
          <span className="hidden md:inline">Pasa el cursor para detener y ampliar · Arrastra o usa las flechas · </span>
          <span className="md:hidden">Desliza con el dedo · </span>
          Toca un video para verlo en grande y con sonido
        </p>
      </section>

      {/* =====================================================================
          2. TRABAJAMOS CON MARCAS
          ===================================================================== */}
      <section id="marcas" className="py-10 md:py-14 bg-zinc-50/70 border-b border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-5 md:mb-7 text-center">
          <span className="text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-[0.26em] text-zinc-400 block mb-1">
            Marcas que confían en nosotros
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-zinc-900">
            Trabajamos con marcas
          </h2>
        </div>

        <div className="sync-brand-mq sync-edge-mask overflow-hidden py-2 md:py-3.5">
          <div className="sync-brand-track">
            {[...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, idx) => (
              <span
                key={`${brand.name}-${idx}`}
                className="flex-none flex items-center justify-center w-[160px] h-[86px] sm:w-[190px] sm:h-[98px] md:w-[220px] md:h-[110px] mr-3 md:mr-5 rounded-2xl bg-white border border-zinc-200/90 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 p-3 sm:p-4 overflow-hidden"
              >
                <img
                  src={brand.src}
                  alt={brand.name}
                  loading="lazy"
                  className={`max-h-[56px] sm:max-h-[66px] md:max-h-[78px] w-auto max-w-[130px] sm:max-w-[155px] md:max-w-[185px] object-contain block transition-transform duration-300 ${
                    brand.scale || ''
                  }`}
                />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. APARTADO DE FOTOS: FOTOGRAFÍA QUE VENDE (DE EXTREMO A EXTREMO
             IZQUIERDA Y DERECHA SIN REPETIR FOTOS EN MÓVIL)
          ===================================================================== */}
      <section id="fotografia" className="py-12 md:py-20 border-b border-zinc-200/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-8 gap-3 md:gap-4">
          <div>
            <span className="text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-[0.26em] text-zinc-400 block mb-1">
              Producción Visual & Comercial
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-zinc-900 leading-none">
              Fotografía que vende
            </h2>
          </div>
          <p className="text-zinc-500 text-xs md:text-sm max-w-sm font-normal leading-relaxed">
            Producto, gastronomía, inmobiliaria y marca. Toca cualquier fotografía para verla en grande.
          </p>
        </div>

        {/* Grilla ancha Full-Bleed de extremo a extremo (izquierda a derecha) */}
        <div className="w-full px-2.5 sm:px-4 md:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-3.5 grid-flow-dense">
            {COMMERCIAL_PHOTOS.map((shot) => (
              <figure
                key={shot.id}
                onClick={() => setLightboxItem(shot)}
                className={`group relative m-0 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-200/80 shadow-sm cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl hover:z-10 ${
                  shot.wide ? 'col-span-2 aspect-[16/10] sm:aspect-[3/2]' : 'aspect-[3/4]'
                }`}
              >
                <img
                  src={shot.src}
                  alt={`${shot.title}: ${shot.subtitle}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover block transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
                <figcaption className="absolute left-0 right-0 bottom-0 p-3 sm:p-3.5 text-white pointer-events-none">
                  <span className="block text-[8.5px] sm:text-[9px] font-semibold uppercase tracking-[0.16em] text-zinc-300 mb-0.5">
                    {shot.title}
                  </span>
                  <b className="block text-xs sm:text-sm font-bold tracking-tight leading-snug">{shot.subtitle}</b>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-7 md:mt-9 flex justify-center px-4">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              'Hola Sync Pro, vi su portafolio de video y fotografía y quiero algo así para mi marca.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto justify-center bg-zinc-950 text-white px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2.5 hover:bg-zinc-800 transition-all shadow-md"
          >
            <MessageCircle size={15} /> Quiero algo así para mi marca
          </a>
        </div>
      </section>

      {/* =====================================================================
          4. ASÍ TRABAJAMOS (Carrusel infinito Detrás de Cámaras: Videos + Fotos)
          ===================================================================== */}
      <section id="asi-trabajamos" className="py-12 md:py-20 bg-zinc-950 text-white border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-3 md:mb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-3 md:gap-4">
          <div>
            <span className="text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-[0.26em] text-zinc-400 block mb-1">
              Backstage & Producción
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-white leading-none">
              Así trabajamos
            </h2>
          </div>
          <p className="text-zinc-400 text-xs md:text-sm max-w-md font-normal leading-relaxed">
            Detrás de cámaras: equipo, luces y sets de grabación de nuestras producciones.
          </p>
        </div>

        <InfiniteMediaCarousel
          items={BTS_ITEMS}
          onSelectItem={(item) => setLightboxItem(item)}
          cardHeightClass="h-[280px] sm:h-[340px] md:h-[400px] lg:h-[430px]"
        />
      </section>

      {/* =====================================================================
          5. POR QUÉ TUS VIDEOS GENERAN CLIENTES (100% DAVINCI RESOLVE STUDIO)
          ===================================================================== */}
      <VideoEditsThatStandOutSection />

      {/* =====================================================================
          6. PLANES DE EDICIÓN DE VIDEO POR DURACIÓN
          ===================================================================== */}
      <section
        id="planes-edicion"
        className="py-14 md:py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-b border-zinc-200/70"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-7 md:mb-10 gap-3 md:gap-6">
          <div>
            <span className="text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-[0.26em] text-zinc-400 block mb-1.5">
              Inversión Transparente por Duración
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-zinc-900 leading-none">
              Planes de edición
            </h2>
          </div>
          <p className="text-zinc-500 text-xs md:text-sm max-w-md font-normal leading-relaxed">
            Elige la duración de tu video y compara al instante qué incluye cada nivel de producción en DaVinci Resolve
            Studio.
          </p>
        </div>

        {/* Selector de Duración optimizado para Smartphone (2x2 limpio) y Escritorio (4 en línea) */}
        <div className="bg-zinc-100/90 p-1.5 rounded-2xl grid grid-cols-2 lg:grid-cols-4 gap-1.5 mb-6 md:mb-8 border border-zinc-200/80">
          {durationPlans.map((plan, index) => {
            const isSelected = selectedDurationIndex === index;
            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedDurationIndex(index)}
                className={`relative p-3 sm:py-3.5 sm:px-4 rounded-xl text-left transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-zinc-950 text-white shadow-md'
                    : 'bg-transparent text-zinc-600 hover:bg-white/80 hover:text-zinc-900'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="flex items-center gap-1 text-[11px] sm:text-xs font-bold tracking-tight whitespace-nowrap">
                    <Clock size={12} className={isSelected ? 'text-white shrink-0' : 'text-zinc-400 shrink-0'} />
                    {plan.label}
                  </span>
                  {plan.popular && (
                    <span
                      className={`text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full shrink-0 ${
                        isSelected ? 'bg-white text-zinc-950' : 'bg-zinc-900 text-white'
                      }`}
                    >
                      Popular
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

              {/* Precio Dinámico */}
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
                {[
                  'El cliente envía sus tomas de video y el guion listo',
                  'Selección, recorte y unión limpia en DaVinci Resolve Studio',
                  'Música de fondo acorde al ritmo del video + efectos de sonido básicos',
                  'Títulos limpios o subtítulos dinámicos para retención',
                  'Ajuste básico de exposición y balance de color',
                  'Incluye hasta 2 revisiones (ajustes sobre el mismo guion)'
                ].map((item, i) => (
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

              {/* Precio Dinámico */}
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
                <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-white text-zinc-950">
                  Incluye Motion 3D + IA
                </span>
              </div>

              {/* Lista de entregables */}
              <div className="space-y-2.5 sm:space-y-3 mb-7 sm:mb-8">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-1.5">
                  Todo lo de Básica más
                </div>
                {[
                  'El cliente envía sus tomas y el guion (o estructuramos el ritmo visual)',
                  'Edición dinámica con curvas de velocidad, archivos de color (.cube) y sonido Fairlight',
                  'Motion Graphics en DaVinci Resolve Fusion: señaladores y textos flotantes 3D',
                  'Incluye el marcado / trazado animado de 1 terreno o lote',
                  'Incluye hasta 2 videos generados con Inteligencia Artificial (IA)',
                  'Incluye 1 audio o locución comercial generada con IA',
                  'Incluye hasta 2 revisiones sin costo adicional'
                ].map((item, i) => (
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

      {/* =====================================================================
          7. PROCESO EN 3 PASOS
          ===================================================================== */}
      <section className="py-14 md:py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-b border-zinc-200/70">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-7 md:mb-10 gap-3 md:gap-4">
          <div>
            <span className="text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-[0.26em] text-zinc-400 block mb-1">
              Flujo de Trabajo Directo
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-zinc-900 leading-none">
              Cómo trabajamos tu video
            </h2>
          </div>
          <p className="text-zinc-500 text-xs md:text-sm max-w-sm font-normal leading-relaxed">
            Tres pasos claros para entregar tu video listo para publicar o pautar en Meta Ads y TikTok.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {[
            {
              step: '01',
              title: 'Envía tus Tomas y Guion',
              desc: 'Nos compartes tus grabaciones por WhatsApp o Google Drive junto con la idea. Si aún no tienes guion, estructuramos el gancho contigo.',
              badge: 'Recepción rápida'
            },
            {
              step: '02',
              title: 'Edición, Fusion 3D, Color e IA',
              desc: 'Montaje íntegro en DaVinci Resolve Studio: curvas de velocidad, trazado 3D de terrenos, archivos de color (.cube) y locución/tomas con IA.',
              badge: 'DaVinci Resolve Studio'
            },
            {
              step: '03',
              title: 'Revisión y Entrega Master',
              desc: 'Validas el resultado (incluye 2 revisiones sin costo) y recibes el master en máxima calidad listo para redes sociales.',
              badge: 'Entrega 1080p / 4K'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-zinc-200/90 p-5 sm:p-6 md:p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <span className="w-8 h-8 rounded-lg bg-zinc-950 text-white text-xs font-mono font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-[10px] font-medium text-zinc-600">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-zinc-900 mb-2">{item.title}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed font-normal">{item.desc}</p>
              </div>

              <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-zinc-100 flex items-center justify-between">
                <div className="h-[1.5px] flex-1 bg-zinc-100 rounded-full overflow-hidden mr-3">
                  <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: idx * 0.4 }}
                    className="h-full w-1/2 bg-zinc-900 rounded-full"
                  />
                </div>
                <ArrowRight size={13} className="text-zinc-400" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          8. CONTACTO DIRECTO
          ===================================================================== */}
      <section id="contacto" className="py-14 md:py-20 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
        <div className="rounded-2xl sm:rounded-3xl bg-[#0b0b0e] text-white border border-zinc-800 p-6 sm:p-8 md:p-12 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.28)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <span className="text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-[0.26em] text-zinc-400 block mb-2">
                Contacto Directo
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white leading-tight mb-3.5 sm:mb-4">
                Iniciemos tu próxima producción
              </h2>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-5 sm:mb-6 font-normal">
                Escríbenos directamente por WhatsApp para cotizar tu video en minutos o envíanos los detalles de tu
                proyecto en el formulario.
              </p>

              <div className="space-y-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    'Hola Sync Pro, quiero cotizar la edición de un video.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto justify-center inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-white text-zinc-950 text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all"
                >
                  <MessageCircle size={16} /> WhatsApp: +591 69109766
                </a>
                <div className="flex items-center gap-2.5 text-xs text-zinc-300 pt-1">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shrink-0" />
                  <span>Disponibilidad inmediata para proyectos comerciales</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-zinc-400">
                  <ShieldCheck size={15} className="text-zinc-300 shrink-0" />
                  <span>Postproducción 100% en DaVinci Resolve Studio Oficial</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Nombre completo"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/30 transition-colors font-medium"
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/30 transition-colors font-medium"
              />
              <textarea
                rows="4"
                placeholder="Cuéntanos sobre tu proyecto o el tipo de video que buscas..."
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/30 transition-colors font-medium resize-none"
              />
              <button
                type="submit"
                className="w-full py-3.5 bg-white text-zinc-950 hover:bg-zinc-200 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                Enviar Mensaje <Send size={14} />
              </button>
              {status && <p className="text-[11px] font-medium text-center text-zinc-400 mt-2">{status}</p>}
            </form>
          </div>
        </div>
      </section>

      {/* =====================================================================
          9. STUDIO SYNC PRO (HERRAMIENTAS PARA DAVINCI RESOLVE STUDIO)
          ===================================================================== */}
      <section id="herramientas" className="py-14 md:py-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-zinc-200/70">
        <div className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-4">
          <div>
            <span className="text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-[0.26em] text-zinc-400 block mb-1">
              Sync Pro Labs
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-zinc-900">
              Studio Sync Pro
            </h2>
          </div>
          <p className="text-zinc-500 text-xs max-w-md font-normal">
            Herramientas, macros y árboles de nodos desarrollados internamente para DaVinci Resolve Studio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="rounded-2xl bg-zinc-50/80 border border-zinc-200/90 p-5 sm:p-7 flex flex-col justify-between hover:bg-white hover:shadow-md transition-all"
            >
              <div>
                <div className="flex justify-between items-start mb-4 sm:mb-5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center shadow-sm">
                    {tool.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-zinc-900 text-white text-[9px] font-semibold uppercase tracking-wider">
                    {tool.badge}
                  </span>
                </div>

                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                  {tool.target}
                </span>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 mb-2">{tool.name}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed mb-5 font-normal">{tool.description}</p>

                <div className="grid grid-cols-2 gap-2 mb-6">
                  {tool.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] font-medium text-zinc-700">
                      <span className="w-1 h-1 bg-zinc-900 rounded-full shrink-0" />
                      <span className="truncate">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hola Sync Pro, me interesa adquirir la herramienta ${tool.name} para ${tool.target}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-white hover:bg-zinc-950 text-zinc-900 hover:text-white border border-zinc-200/90 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                Consultar Licencia <Zap size={13} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          VISOR MODAL CENTRADO (LIGHTBOX PARA VIDEOS CON SONIDO Y FOTOGRAFÍAS)
          ===================================================================== */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxItem(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl grid place-items-center p-4 md:p-6"
          >
            <button
              type="button"
              onClick={() => setLightboxItem(null)}
              aria-label="Cerrar visor"
              className="fixed right-4 top-4 md:right-6 md:top-6 z-[110] w-11 h-11 rounded-full bg-white/10 hover:bg-white text-white hover:text-zinc-950 border border-white/25 flex items-center justify-center transition-all"
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.92, y: 14 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 14 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative flex flex-col items-center ${
                lightboxItem.wide ? 'max-w-[min(94vw,1080px)]' : 'max-w-[min(92vw,440px)]'
              }`}
            >
              {lightboxItem.type === 'video' ? (
                <video
                  src={lightboxItem.fullVideoSrc || lightboxItem.videoSrc}
                  poster={lightboxItem.poster || undefined}
                  controls
                  autoPlay
                  playsInline
                  loop
                  className="max-h-[78vh] max-w-full w-auto rounded-2xl bg-black border border-white/15 shadow-2xl"
                />
              ) : (
                <img
                  src={lightboxItem.src}
                  alt={lightboxItem.subtitle || lightboxItem.title}
                  className="max-h-[78vh] max-w-full w-auto rounded-2xl bg-black border border-white/15 shadow-2xl"
                />
              )}

              <div className="mt-3 text-center text-white px-2">
                <b className="block text-sm font-bold uppercase tracking-tight">{lightboxItem.title}</b>
                {lightboxItem.subtitle && (
                  <span className="block text-xs text-zinc-400 font-normal mt-0.5">{lightboxItem.subtitle}</span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón Flotante de WhatsApp con soporte de Safe-Area en iPhone y Android */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          'Hola Sync Pro, vi su portafolio web y quiero cotizar un video.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 sm:right-5 z-50 bg-zinc-950 text-white px-4 py-3.5 rounded-full shadow-2xl border border-white/15 hover:scale-105 transition-all flex items-center gap-2"
      >
        <MessageCircle size={18} className="text-emerald-400" />
        <span className="text-[11px] font-bold uppercase tracking-wider pr-0.5">WhatsApp</span>
      </a>

      {/* Footer */}
      <footer className="py-12 pb-24 sm:pb-12 border-t border-zinc-200/80 text-center bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <div className="text-xs font-extrabold tracking-tight text-zinc-900">SYNC PRO // 2026</div>
          <p className="text-zinc-400 text-[11px] font-medium">
            Post-Producción Digital · 100% DaVinci Resolve Studio Oficial
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
          >
            WhatsApp: +591 69109766
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
