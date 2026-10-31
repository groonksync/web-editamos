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
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WHATSAPP_NUMBER = '59169109766';

/* ============================================================================
   DATOS DE MARCAS, FOTOGRAFÍA COMERCIAL Y DETRÁS DE CÁMARAS ("ASÍ TRABAJAMOS")
   ============================================================================ */
const BRAND_LOGOS = [
  { name: 'Bodega Benjamín', src: 'https://estudiovector.com/img/clientes/bodega-benjamin.png' },
  { name: 'Centuria Soluciones Contables', src: 'https://estudiovector.com/img/clientes/centuria.png' },
  { name: 'Compasa', src: 'https://estudiovector.com/img/clientes/compasa.png' },
  { name: 'Cros2Go', src: 'https://estudiovector.com/img/clientes/cros2go.png' },
  { name: 'DIAGRO', src: 'https://estudiovector.com/img/clientes/diagro.png' },
  { name: 'Dr. Manuel Orellana', src: 'https://estudiovector.com/img/clientes/dr-manuel-orellana.png' },
  { name: 'Du-bai Restaurant & Bar', src: 'https://estudiovector.com/img/clientes/du-bai.png' },
  { name: 'Fumyim', src: 'https://estudiovector.com/img/clientes/fumyim.png' },
  { name: 'Il Romano', src: 'https://estudiovector.com/img/clientes/il-romano.png' },
  { name: 'Importaciones HyP', src: 'https://estudiovector.com/img/clientes/importaciones-hyp.png' },
  { name: 'Kiv Detailing', src: 'https://estudiovector.com/img/clientes/kiv-detailing.png' },
  { name: 'La Colada', src: 'https://estudiovector.com/img/clientes/la-colada.png' },
  { name: 'MegaTools', src: 'https://estudiovector.com/img/clientes/megatools.png' },
  { name: 'Ornamentos Comerciales', src: 'https://estudiovector.com/img/clientes/ornamentos-comerciales.png' },
  { name: 'Piña Loca', src: 'https://estudiovector.com/img/clientes/pina-loca.png' },
  { name: 'Plaza Bless Coffee', src: 'https://estudiovector.com/img/clientes/plaza-bless-coffee.png' },
  { name: 'Polarizados La Guardia', src: 'https://estudiovector.com/img/clientes/polarizados-la-guardia.png' },
  { name: 'Pollos El Pechugón', src: 'https://estudiovector.com/img/clientes/pollos-el-pechugon.png' },
  { name: 'Pollos Furia', src: 'https://estudiovector.com/img/clientes/pollos-furia.png' },
  { name: 'Punto Ferretero', src: 'https://estudiovector.com/img/clientes/punto-ferretero.png' },
  { name: 'RS', src: 'https://estudiovector.com/img/clientes/rs.png' },
  { name: 'Slide Pizza', src: 'https://estudiovector.com/img/clientes/slide-pizza.png' },
  { name: 'TDK', src: 'https://estudiovector.com/img/clientes/tdk.png' },
  { name: "Toby's Pet Shop", src: 'https://estudiovector.com/img/clientes/toby-s-pet-shop.png' },
  { name: 'Unicalza', src: 'https://estudiovector.com/img/clientes/unicalza.png' },
  { name: 'Vivian Rivera Psicología', src: 'https://estudiovector.com/img/clientes/vivian-rivera.png' },
  { name: 'Workafe', src: 'https://estudiovector.com/img/clientes/workafe.png' }
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
   CARRUSEL INFINITO INTERACTIVO (SE MUEVE SOLO, SE DETIENE Y AGRANDA EN HOVER)
   ============================================================================ */
const InfiniteMediaCarousel = ({ items, onSelectItem, cardHeightClass = 'h-[340px] md:h-[430px] lg:h-[460px]' }) => {
  const scrollRef = useRef(null);
  const [unmutedKey, setUnmutedKey] = useState(null);

  const baseList = items.length < 10 ? [...items, ...items, ...items] : items;
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

    const go = (delay = 1200) => {
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        if (hover || drag) return;
        pos = box.scrollLeft;
        paused = false;
      }, delay);
    };

    const onTouchStart = () => stop();
    const onTouchEnd = () => go(2000);

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

    const SPEED = 78;
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
        className="flex overflow-x-auto no-scrollbar sync-edge-mask py-6 px-4 md:px-10 cursor-grab select-none"
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
                className={`sync-reel-card relative flex-none ${cardHeightClass} ${aspectClass} mr-3.5 md:mr-4 rounded-[22px] overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.85)] cursor-pointer isolate`}
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
                  <span className="absolute left-3 top-3 z-10 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/15 text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-200">
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
                    className="absolute right-3 top-3 z-20 w-9 h-9 rounded-full bg-black/55 hover:bg-white hover:text-zinc-950 text-white border border-white/25 backdrop-blur-md flex items-center justify-center transition-all duration-300"
                  >
                    {isUnmuted ? <Volume2 size={15} /> : <VolumeX size={15} />}
                  </button>
                ) : (
                  <span className="absolute right-3 top-3 z-10 w-8 h-8 rounded-full bg-black/45 border border-white/20 text-white/80 backdrop-blur-md flex items-center justify-center">
                    <Camera size={14} />
                  </span>
                )}

                <figcaption className="absolute left-3.5 right-3.5 bottom-3.5 z-10 text-left text-white pointer-events-none">
                  <b className="block text-sm md:text-[15px] font-extrabold uppercase tracking-tight leading-tight drop-shadow">
                    {item.title}
                  </b>
                  <span className="block text-[11px] font-medium text-white/75 leading-snug mt-0.5 line-clamp-2">
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
    ECOSISTEMA 100% DAVINCI RESOLVE STUDIO (RÉPLICA DE TIMELINE REAL +
   APLICACIÓN DE ARCHIVO DE COLOR + CURVAS SPLINE + ANIMACIÓN DE TEXTO +
   TRAZADO INMOBILIARIO 3D)
   ============================================================================ */

// 1. Réplica Fiel de la Línea de Tiempo de DaVinci Resolve Studio 19 (Edit Page)
const DaVinciResolveAuthenticTimeline = () => {
  const waveformSamples = [
    30, 62, 85, 45, 92, 70, 55, 88, 40, 75, 95, 60, 48, 82, 68, 90, 38, 72, 84, 52, 78, 94, 58, 66, 42, 86, 74, 50, 88,
    64, 92, 46, 76, 60, 80, 54
  ];

  return (
    <div className="rounded-2xl bg-[#18181c] border border-zinc-800 overflow-hidden text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.45)] select-none">
      {/* Barra superior estilo ventana nativa de DaVinci Resolve Studio */}
      <div className="bg-[#111114] px-4 py-2.5 border-b border-white/[0.07] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-white/20 text-xs mx-1">|</span>
          {/* Icono oficial de 3 ruedas DaVinci Resolve */}
          <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
            <circle cx="12" cy="7.5" r="3.2" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
            <circle cx="8" cy="15" r="3.2" fill="none" stroke="#34d399" strokeWidth="1.5" />
            <circle cx="16" cy="15" r="3.2" fill="none" stroke="#f87171" strokeWidth="1.5" />
          </svg>
          <span className="text-[11px] font-semibold tracking-tight text-zinc-200">
            DaVinci Resolve Studio 19 — Proyecto: SYNC_PRO_MASTER_4K
          </span>
        </div>

        {/* Timecode Display estilo DaVinci Resolve */}
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-[9px] font-mono text-emerald-300">
            100% DAVINCI RESOLVE STUDIO
          </span>
          <span className="font-mono text-xs font-bold tracking-wider text-[#ef4444] bg-[#0b0b0d] px-2.5 py-1 rounded border border-white/[0.07]">
            01:00:08:14
          </span>
        </div>
      </div>

      {/* Barra de herramientas secundaria (Snapping, Blade, Flags, Zoom) */}
      <div className="bg-[#1c1c21] px-4 py-1.5 border-b border-black/60 flex items-center justify-between text-[10px] text-zinc-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-white font-medium">
            <MousePointerIcon /> Selección
          </span>
          <span className="flex items-center gap-1 text-zinc-400">
            <Scissors size={11} /> Corte (B)
          </span>
          <span className="text-zinc-600">|</span>
          <span className="font-mono text-[9px] text-amber-400/90">Imán Activo (N)</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 font-mono text-[9px] text-zinc-400">
          <span>24.000 fps</span>
          <span>·</span>
          <span>3840 × 2160 Ultra HD</span>
          <span>·</span>
          <span className="text-sky-300">DaVinci YRGB Color Managed</span>
        </div>
      </div>

      {/* Área Principal del Timeline: Cabeceras de Pista a la izquierda + Pistas a la derecha */}
      <div className="grid grid-cols-12 bg-[#141417]">
        {/* Columna Izquierda: Track Headers auténticos de DaVinci Resolve */}
        <div className="col-span-3 sm:col-span-2 bg-[#1c1c21] border-r border-black/80 flex flex-col text-[10px] font-mono">
          {/* Espacio esquina de regla */}
          <div className="h-6 border-b border-black/70 px-2 flex items-center text-[8px] text-zinc-500">
            TIMECODE
          </div>

          {/* Track Header V3 */}
          <div className="h-10 border-b border-black/60 px-2 flex items-center justify-between bg-[#202026]">
            <div className="flex items-center gap-1">
              <span className="px-1 py-0.2 rounded bg-zinc-700 text-zinc-200 font-bold text-[9px]">V3</span>
              <span className="hidden md:inline text-[9px] text-zinc-400 truncate">Text+</span>
            </div>
            <div className="flex items-center gap-1 text-zinc-500">
              <Lock size={9} />
              <Eye size={9} className="text-zinc-300" />
            </div>
          </div>

          {/* Track Header V2 */}
          <div className="h-10 border-b border-black/60 px-2 flex items-center justify-between bg-[#202026]">
            <div className="flex items-center gap-1">
              <span className="px-1 py-0.2 rounded bg-zinc-700 text-zinc-200 font-bold text-[9px]">V2</span>
              <span className="hidden md:inline text-[9px] text-zinc-400 truncate">Fusion</span>
            </div>
            <div className="flex items-center gap-1 text-zinc-500">
              <Lock size={9} />
              <Eye size={9} className="text-zinc-300" />
            </div>
          </div>

          {/* Track Header V1 (Activo con borde naranja/rojo de DaVinci) */}
          <div className="h-12 border-b border-black/80 px-2 flex items-center justify-between bg-[#25252c]">
            <div className="flex items-center gap-1">
              <span className="px-1 py-0.2 rounded bg-[#d97706]/20 border border-[#f59e0b] text-white font-bold text-[9px]">
                V1
              </span>
              <span className="hidden md:inline text-[9px] text-zinc-200 truncate">Master</span>
            </div>
            <div className="flex items-center gap-1 text-zinc-400">
              <Lock size={9} />
              <Eye size={9} className="text-white" />
            </div>
          </div>

          {/* Track Header A1 (Fairlight Audio) */}
          <div className="h-12 px-2 flex items-center justify-between bg-[#1b2420]">
            <div className="flex items-center gap-1">
              <span className="px-1 py-0.2 rounded bg-emerald-800/60 border border-emerald-500/40 text-emerald-200 font-bold text-[9px]">
                A1
              </span>
              <span className="hidden md:inline text-[9px] text-emerald-300/80 truncate">2.0</span>
            </div>
            <div className="flex items-center gap-1 text-[8px] font-bold">
              <span className="w-3.5 h-3.5 rounded bg-zinc-800 text-zinc-400 grid place-items-center">M</span>
              <span className="w-3.5 h-3.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/40 grid place-items-center">
                S
              </span>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Pistas y Clips con Colores Auténticos de DaVinci Resolve */}
        <div className="col-span-9 sm:col-span-10 relative overflow-hidden">
          {/* Regla de Tiempo con marcas finas de 1px */}
          <div className="h-6 bg-[#18181d] border-b border-black/80 flex items-end justify-between px-3 pb-1 text-[8px] font-mono text-zinc-500">
            <span>01:00:00:00</span>
            <span>01:00:04:00</span>
            <span>01:00:08:00</span>
            <span>01:00:12:00</span>
            <span className="hidden sm:inline">01:00:16:00</span>
            <span>01:00:20:00</span>
          </div>

          {/* Pista V3: Clips de Títulos Text+ (Color Durazno/Tan y Violeta típicos de DaVinci) */}
          <div className="h-10 border-b border-white/[0.04] px-2 flex items-center gap-2 bg-[#141418]">
            <div className="w-[26%] h-7 rounded-[3px] bg-[#b46947] border border-[#e0916d]/60 overflow-hidden flex flex-col justify-between">
              <div className="bg-black/35 px-1.5 py-0.5 text-[8px] font-mono text-white truncate flex items-center justify-between">
                <span>Text+ HOOK_INICIAL</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <div className="px-1.5 pb-0.5 flex items-center justify-between text-[7px] font-mono text-white/80">
                <span>Keyframe In</span>
                <span>♦──♦</span>
              </div>
            </div>

            <div className="w-[42%] h-7 rounded-[3px] bg-[#7c5295] border border-[#a779c4]/60 overflow-hidden flex flex-col justify-between ml-[6%]">
              <div className="bg-black/35 px-1.5 py-0.5 text-[8px] font-mono text-white truncate flex items-center justify-between">
                <span>Text+ SEÑALADOR_PRECIO_3D</span>
                <span className="px-1 rounded bg-white/20 text-[7px]">FUSION</span>
              </div>
              <div className="px-1.5 pb-0.5 flex items-center justify-between text-[7px] font-mono text-white/80">
                <span>Spline Curve</span>
                <span>♦────♦</span>
              </div>
            </div>

            <div className="flex-1 h-7 rounded-[3px] bg-[#b46947] border border-[#e0916d]/60 overflow-hidden flex flex-col justify-between">
              <div className="bg-black/35 px-1.5 py-0.5 text-[8px] font-mono text-white truncate">
                Text+ CTA_WHATSAPP
              </div>
            </div>
          </div>

          {/* Pista V2: Clips Fusion / Trazado 3D & LUT Adjustment (Color Teal/Turquesa de DaVinci) */}
          <div className="h-10 border-b border-white/[0.04] px-2 flex items-center gap-1.5 bg-[#15151a]">
            <div className="w-[48%] h-7 rounded-[3px] bg-[#2c7a7b] border border-[#4fd1c5]/50 overflow-hidden flex flex-col justify-between ml-[12%]">
              <div className="bg-black/35 px-1.5 py-0.5 text-[8px] font-mono text-white truncate flex items-center justify-between">
                <span>FUSION_TRAZADO_TERRENO_3D.comp</span>
                <span className="text-[7px] text-teal-200">3D TRACK</span>
              </div>
              <div className="px-1.5 pb-0.5 text-[7px] font-mono text-teal-100/80 truncate">
                PlanarTracker1 → Polygon1 → Render3D
              </div>
            </div>

            <div className="w-[34%] h-7 rounded-[3px] bg-[#319795] border border-[#81e6d9]/50 overflow-hidden flex flex-col justify-between">
              <div className="bg-black/35 px-1.5 py-0.5 text-[8px] font-mono text-white truncate flex items-center justify-between">
                <span>ARCHIVO_COLOR_CINEMA.cube</span>
                <span className="text-[7px] text-amber-200">LUT 3D</span>
              </div>
              <div className="px-1.5 pb-0.5 text-[7px] font-mono text-teal-100/80 truncate">
                ACEScct → Rec.709 Master
              </div>
            </div>
          </div>

          {/* Pista V1: Clips de Cámara Principal (Color Azul Acero clásico de DaVinci Resolve) */}
          <div className="h-12 border-b border-white/[0.05] px-2 flex items-center gap-1 bg-[#121216]">
            {[
              { name: 'A001_DRONE_LOTE.braw', w: '32%' },
              { name: 'A002_DETALLE_COMERCIAL.mov', w: '26%' },
              { name: 'A003_IA_BROLL_GEN.mp4', w: '22%' },
              { name: 'A004_CIERRE_MARCA.braw', w: '20%' }
            ].map((clip, i) => (
              <div
                key={i}
                style={{ width: clip.w }}
                className="h-9 rounded-[3px] bg-[#2b6cb0] border border-[#63b3ed]/60 overflow-hidden flex flex-col justify-between"
              >
                <div className="bg-black/40 px-1.5 py-0.5 text-[8px] font-mono text-white truncate flex items-center justify-between">
                  <span className="truncate">{clip.name}</span>
                  {/* Insignia arcoíris de corrección de color activa en DaVinci */}
                  <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-rose-400 via-emerald-300 to-sky-400 shrink-0 ml-1" />
                </div>
                <div className="px-1.5 pb-1 flex items-center justify-between text-[7px] font-mono text-sky-100/80">
                  <span>Speed: 100%</span>
                  <span>24 fps</span>
                </div>
              </div>
            ))}
          </div>

          {/* Pista A1: Audio Fairlight (Color Verde Bosque clásico de DaVinci Resolve + línea de ganancia blanca 1px) */}
          <div className="h-12 px-2 flex items-center bg-[#101614] relative">
            <div className="w-full h-9 rounded-[3px] bg-[#276749] border border-[#48bb78]/50 overflow-hidden relative flex flex-col justify-between">
              <div className="bg-black/35 px-1.5 py-0.5 text-[8px] font-mono text-emerald-100 flex items-center justify-between z-10">
                <span>VOZ_IA_MASTER + SFX_WOOSH_HITS.wav</span>
                <span>-14.0 LUFS</span>
              </div>
              {/* Línea blanca de ganancia de 1px */}
              <div className="absolute left-0 right-0 top-[58%] h-[1px] bg-white/75 z-10" />
              {/* Onda de audio */}
              <div className="flex items-end justify-between px-2 pb-0.5 h-5 gap-[2px]">
                {waveformSamples.map((h, i) => (
                  <motion.span
                    key={i}
                    animate={{ height: [`${Math.max(22, h * 0.5)}%`, `${h}%`, `${Math.max(22, h * 0.5)}%`] }}
                    transition={{ duration: 1.1 + (i % 5) * 0.14, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex-1 bg-[#9ae6b4]/85 rounded-t-[1px]"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Cabezal de Reproducción Naranja/Rojo idéntico a DaVinci Resolve */}
          <motion.div
            animate={{ left: ['8%', '92%', '8%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 bottom-0 w-[1px] bg-[#ef4444] shadow-[0_0_10px_#ef4444] z-30 pointer-events-none"
          >
            {/* Capuchón pentagonal rojo en la regla de tiempo */}
            <svg viewBox="0 0 12 14" className="w-3 h-3.5 -ml-[5.5px] text-[#ef4444] fill-current">
              <polygon points="0,0 12,0 12,8 6,14 0,8" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Barra Inferior de Módulos de DaVinci Resolve (Media · Cut · Edit · Fusion · Color · Fairlight · Deliver) */}
      <div className="bg-[#111114] border-t border-black px-3 py-2 flex items-center justify-center gap-2 sm:gap-5 text-[9px] font-mono text-zinc-500 overflow-x-auto no-scrollbar">
        <span>Media</span>
        <span>Cut</span>
        <span className="px-2.5 py-0.5 rounded bg-[#27272f] text-white border border-white/15 font-semibold">
          Edit
        </span>
        <span className="px-2.5 py-0.5 rounded bg-[#27272f]/70 text-zinc-200 border border-white/10">Fusion</span>
        <span className="px-2.5 py-0.5 rounded bg-[#27272f]/70 text-zinc-200 border border-white/10">Color</span>
        <span className="px-2.5 py-0.5 rounded bg-[#27272f]/70 text-zinc-200 border border-white/10">Fairlight</span>
        <span>Deliver</span>
      </div>
    </div>
  );
};

const MousePointerIcon = () => (
  <svg viewBox="0 0 16 16" className="w-3 h-3 fill-current">
    <path d="M3 2l10 6.5-4.5 1.2L6.2 14 3 2z" />
  </svg>
);

// 2. Motion Graphic: Aplicación en Tiempo Real de Archivo de Color (LUT .CUBE / Color Wipe en DaVinci Resolve)
const DaVinciColorGradeWipe = () => {
  return (
    <div className="rounded-2xl bg-[#141418] border border-zinc-800 p-4 md:p-5 text-white flex flex-col justify-between shadow-sm select-none">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400 block">
            MÓDULO COLOR // DAVINCI RESOLVE
          </span>
          <h4 className="text-sm md:text-base font-bold tracking-tight text-white">
            Aplicación de Archivo de Color (.CUBE / ACES)
          </h4>
        </div>
        <span className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-[9px] font-mono text-zinc-300">
          32-BIT FLOAT
        </span>
      </div>

      {/* Monitor comparativo Antes (LOG Gris) vs Después (Archivo de Color Aplicado) */}
      <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-black isolate">
        {/* Capa Inferior: Imagen con Archivo de Color Cinematográfico Aplicado */}
        <img
          src="/inmobiliaria-drone.jpg"
          alt="Video con archivo de color aplicado en DaVinci Resolve"
          className="absolute inset-0 w-full h-full object-cover saturate-[1.35] contrast-[1.12] brightness-[1.02]"
        />

        {/* Capa Superior Recortada Animada: Imagen en LOG / Sin Color (Desaturada y Plana) */}
        <motion.div
          animate={{ clipPath: ['inset(0 82% 0 0)', 'inset(0 18% 0 0)', 'inset(0 82% 0 0)'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 z-10"
        >
          <img
            src="/inmobiliaria-drone.jpg"
            alt="Video en perfil LOG sin colorizar"
            className="w-full h-full object-cover saturate-[0.22] contrast-[0.78] brightness-[1.08]"
          />
          <div className="absolute inset-0 bg-zinc-500/15 mix-blend-screen" />
        </motion.div>

        {/* Línea divisoria del barrido (Wipe Line de 1px) */}
        <motion.div
          animate={{ left: ['18%', '82%', '18%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 bottom-0 w-[1px] bg-white shadow-[0_0_12px_#ffffff] z-20 pointer-events-none"
        >
          <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-7 h-7 rounded-full bg-zinc-950/90 border border-white/40 flex items-center justify-center text-[9px] font-mono text-white shadow-lg">
            ↔
          </div>
        </motion.div>

        {/* Etiquetas en esquina */}
        <span className="absolute left-2.5 top-2.5 z-20 px-2 py-0.5 rounded bg-black/65 backdrop-blur-md border border-white/15 text-[9px] font-mono text-zinc-300">
          RAW / LOG (SIN COLOR)
        </span>
        <span className="absolute right-2.5 top-2.5 z-20 px-2.5 py-0.5 rounded bg-amber-500/90 text-zinc-950 font-mono font-bold text-[9px] shadow">
          LUT: SyncPro_Cinema.cube
        </span>

        {/* Árbol de Nodos superpuesto en la base */}
        <div className="absolute inset-x-2.5 bottom-2.5 z-20 bg-zinc-950/80 backdrop-blur-md border border-white/15 rounded-lg px-3 py-1.5 flex items-center justify-between text-[9px] font-mono">
          <div className="flex items-center gap-1.5 text-zinc-300">
            <span className="px-1.5 py-0.2 rounded bg-white/10">01 CST</span>
            <span>→</span>
            <span className="px-1.5 py-0.2 rounded bg-white/10">02 BALANCE</span>
            <span>→</span>
            <span className="px-1.5 py-0.2 rounded bg-amber-400/20 border border-amber-400/40 text-amber-300">
              03 ARCHIVO .CUBE
            </span>
          </div>
          <span className="text-emerald-400 hidden sm:inline">REC.709</span>
        </div>
      </div>

      <p className="mt-3 text-[11px] text-zinc-400 leading-relaxed font-normal">
        Transformamos grabaciones planas o apagadas aplicando archivos de color (`.cube`) y corrección por nodos para que
        tu producto o propiedad luzca de cine.
      </p>
    </div>
  );
};

// 3. Motion Graphic: Movimiento de Curvas Spline + Animación de Texto en DaVinci Resolve
const DaVinciCurvesAndTextMotion = () => {
  return (
    <div className="rounded-2xl bg-[#141418] border border-zinc-800 p-4 md:p-5 text-white flex flex-col justify-between shadow-sm select-none">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-sky-400 block">
            SPLINE CURVES & TEXT+ // DAVINCI RESOLVE
          </span>
          <h4 className="text-sm md:text-base font-bold tracking-tight text-white">
            Movimiento de Curvas & Animación de Textos
          </h4>
        </div>
        <span className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-[9px] font-mono text-zinc-300">
          60 FPS
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-auto">
        {/* Panel Izquierdo: Movimiento de Curva en vivo (Custom Curves / Spline Editor de 1px) */}
        <div className="rounded-xl bg-[#0c0c0f] border border-white/[0.08] p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 mb-2">
            <span className="flex items-center gap-1.5 text-zinc-200">
              <Sliders size={11} className="text-sky-400" /> Curva Dinámica
            </span>
            <span className="text-[8px] text-sky-300">Y · R · G · B</span>
          </div>

          <div className="relative h-28 w-full rounded-lg bg-[#08080a] border border-white/[0.06] overflow-hidden">
            <svg viewBox="0 0 200 110" className="w-full h-full">
              {/* Cuadrícula fina de 1px */}
              <line
                x1="0"
                y1="27.5"
                x2="200"
                y2="27.5"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.75"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1="0"
                y1="55"
                x2="200"
                y2="55"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.75"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1="0"
                y1="82.5"
                x2="200"
                y2="82.5"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.75"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1="50"
                y1="0"
                x2="50"
                y2="110"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.75"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1="100"
                y1="0"
                x2="100"
                y2="110"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.75"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1="150"
                y1="0"
                x2="150"
                y2="110"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.75"
                vectorEffect="non-scaling-stroke"
              />

              {/* Diagonal base de referencia (1px) */}
              <line
                x1="12"
                y1="98"
                x2="188"
                y2="12"
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="0.75"
                strokeDasharray="3 3"
                vectorEffect="non-scaling-stroke"
              />

              {/* Curva S animada en vivo con trazo quirúrgico de 1.25px */}
              <motion.path
                animate={{
                  d: [
                    'M 12 98 C 60 96, 75 72, 100 55 C 125 38, 140 14, 188 12',
                    'M 12 98 C 55 104, 82 22, 105 46 C 132 70, 148 10, 188 12',
                    'M 12 98 C 60 96, 75 72, 100 55 C 125 38, 140 14, 188 12'
                  ]
                }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.25"
                vectorEffect="non-scaling-stroke"
              />

              {/* Punto de control animado sobre la curva */}
              <motion.circle
                cx="72"
                animate={{ cy: [78, 52, 78] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                r="3.2"
                fill="#ffffff"
                stroke="#38bdf8"
                strokeWidth="1.2"
              />
              <motion.circle
                cx="132"
                animate={{ cy: [32, 48, 32] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                r="3.2"
                fill="#ffffff"
                stroke="#38bdf8"
                strokeWidth="1.2"
              />
            </svg>
          </div>

          <span className="text-[9px] font-mono text-zinc-400 mt-2 block">
            Aceleración suave (Speed Ramp) y contraste S-Curve
          </span>
        </div>

        {/* Panel Derecho: Animación de Texto en Vivo (DaVinci Text+ Kinetic Typography) */}
        <div className="rounded-xl bg-[#0c0c0f] border border-white/[0.08] p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 mb-2">
            <span className="flex items-center gap-1.5 text-zinc-200">
              <Type size={11} className="text-emerald-400" /> Animación Text+
            </span>
            <span className="text-[8px] text-emerald-300">KEYFRAMES</span>
          </div>

          {/* Visor de Texto Dinámico */}
          <div className="relative h-28 w-full rounded-lg bg-[#08080a] border border-white/[0.06] p-3 flex flex-col items-center justify-center overflow-hidden">
            {/* Marco guía de título seguro (Safe Title 1px) */}
            <div className="absolute inset-2 border border-dashed border-white/10 rounded pointer-events-none" />

            <motion.div
              animate={{ y: [6, 0, 0, -6], opacity: [0, 1, 1, 0], scale: [0.94, 1, 1, 0.96] }}
              transition={{ duration: 3.4, repeat: Infinity, times: [0, 0.2, 0.82, 1] }}
              className="text-center z-10"
            >
              <span className="inline-block px-2 py-0.5 rounded bg-emerald-500 text-zinc-950 text-[8px] font-extrabold uppercase tracking-widest mb-1">
                OFERTA EXCLUSIVA
              </span>
              <div className="text-sm font-black uppercase tracking-tight text-white leading-none">
                VENTA DIRECTA
              </div>
              <div className="text-[10px] font-mono text-zinc-400 mt-1">Subtítulos y títulos con retención</div>
            </motion.div>

            {/* Barra de Keyframes inferior */}
            <div className="absolute inset-x-3 bottom-2 flex items-center justify-between text-[8px] font-mono text-zinc-500">
              <span>♦ IN</span>
              <div className="flex-1 mx-2 h-[1px] bg-white/15 relative">
                <motion.div
                  animate={{ left: ['0%', '100%', '0%'] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-1 w-2 h-2 rotate-45 bg-emerald-400"
                />
              </div>
              <span>OUT ♦</span>
            </div>
          </div>

          <span className="text-[9px] font-mono text-zinc-400 mt-2 block">
            Títulos animados, subtítulos dinámicos y callouts
          </span>
        </div>
      </div>

      <p className="mt-3 text-[11px] text-zinc-400 leading-relaxed font-normal">
        Cada entrada de texto, zoom y transición se anima con curvas personalizadas en DaVinci Resolve para lograr un
        movimiento fluido y profesional.
      </p>
    </div>
  );
};

// 4. Showcase Inmobiliario sobre Fotografía Aérea Real con Tracking 3D de 1px en DaVinci Resolve Fusion
const RealEstateMotionShowcase = () => {
  const lotVertices = [
    [245, 232],
    [492, 208],
    [725, 258],
    [545, 452],
    [465, 455]
  ];

  return (
    <div className="rounded-2xl bg-[#141418] border border-zinc-800 p-4 md:p-5 text-white flex flex-col justify-between shadow-sm select-none">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 block">
            FUSION 3D TRACKER // INMOBILIARIA & LOTES
          </span>
          <h4 className="text-sm md:text-base font-bold tracking-tight text-white">
            Delimitación de Terrenos y Señaladores Flotantes 3D
          </h4>
        </div>
        <span className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-[9px] font-mono text-zinc-300">
          SOLVE: 0.14 PX
        </span>
      </div>

      <div className="relative rounded-xl overflow-hidden bg-zinc-950 border border-white/10 aspect-[16/10] group isolate">
        <img
          src="/inmobiliaria-drone.jpg"
          alt="Trazado inmobiliario 3D con Motion Graphics en DaVinci Resolve"
          className="absolute inset-0 w-full h-full object-cover block brightness-[0.92] contrast-[1.04] transition-transform duration-1000 group-hover:scale-[1.02]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/35 pointer-events-none" />

        {/* Superposición SVG con trazos quirúrgicos de 1px */}
        <svg viewBox="0 0 1000 562" className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          <defs>
            <linearGradient id="lotFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          <motion.polygon
            points="245,232 492,208 725,258 545,452 465,455"
            fill="url(#lotFillGrad)"
            animate={{ opacity: [0.45, 0.85, 0.45] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          <polygon
            points="245,232 492,208 725,258 545,452 465,455"
            fill="none"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />

          <motion.polygon
            points="245,232 492,208 725,258 545,452 465,455"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.25"
            strokeDasharray="14 8"
            vectorEffect="non-scaling-stroke"
            animate={{ strokeDashoffset: [0, -88] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          {lotVertices.map(([cx, cy], idx) => (
            <g key={idx}>
              <circle
                cx={cx}
                cy={cy}
                r="7"
                fill="none"
                stroke="rgba(255,255,255,0.75)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <circle cx={cx} cy={cy} r="2.2" fill="#ffffff" />
            </g>
          ))}

          <line
            x1="478"
            y1="322"
            x2="478"
            y2="168"
            stroke="#ffffff"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="478" cy="322" r="3.5" fill="#10b981" />
        </svg>

        {/* Callout Flotante Principal */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[32%] sm:left-[36%] top-[14%] z-20 bg-zinc-950/85 backdrop-blur-md text-white border border-white/25 rounded-xl px-3 py-1.5 shadow-2xl pointer-events-none"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-300">LOTE ESQUINERO #14</span>
          </div>
          <div className="text-xs sm:text-sm font-bold tracking-tight text-white">680.00 m² · Disponible</div>
          <div className="text-[9px] text-zinc-400">Frente: 22.5 m × Fondo: 30.2 m</div>
        </motion.div>
      </div>

      <p className="mt-3 text-[11px] text-zinc-400 leading-relaxed font-normal">
        Trazado inmobiliario anclado al movimiento real del dron en DaVinci Resolve Fusion para destacar terrenos,
        dimensiones, avenidas y plusvalía.
      </p>
    </div>
  );
};

/* ============================================================================
   APLICACIÓN PRINCIPAL SYNC PRO
   ============================================================================ */
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

  return (
    <div className="min-h-screen bg-[#ffffff] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white overflow-x-clip">
      {/* Navegación limpia con borde de 1px */}
      <nav className="sticky top-0 w-full z-50 bg-zinc-950/90 backdrop-blur-xl border-b border-white/[0.08] px-6 md:px-8 py-3.5 flex justify-between items-center text-white">
        <a href="#" className="text-lg font-extrabold tracking-tight flex items-center gap-2.5">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span>SYNC PRO</span>
        </a>
        <div className="hidden lg:flex gap-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
          <a href="#inicio-videos" className="hover:text-white transition-colors">
            Videos
          </a>
          <a href="#marcas" className="hover:text-white transition-colors">
            Marcas
          </a>
          <a href="#fotografia" className="hover:text-white transition-colors">
            Fotografía
          </a>
          <a href="#asi-trabajamos" className="hover:text-white transition-colors">
            Así Trabajamos
          </a>
          <a href="#ingenieria-visual" className="hover:text-white transition-colors">
            DaVinci Resolve
          </a>
          <a href="#planes-edicion" className="hover:text-white transition-colors">
            Planes
          </a>
        </div>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            'Hola Sync Pro, vi su portafolio web y quiero cotizar un proyecto.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-zinc-950 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center gap-2"
        >
          <MessageCircle size={14} /> Escríbenos
        </a>
      </nav>

      {/* =====================================================================
          1. ESCENARIO DE INICIO EN NEGRO & GRIS CARBÓN (RESUMIDO A 3 PALABRAS
             DIRECTAS + CARRUSEL DE TUS VIDEOS EN MOVIMIENTO)
          ===================================================================== */}
      <section
        id="inicio-videos"
        className="sync-stage relative text-white pt-8 pb-9 md:pt-11 md:pb-11 border-b border-zinc-900"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              DaVinci Resolve Studio · Motion Graphics 3D · IA
            </span>
            <h1 className="mt-2 text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.94] text-white">
              Edición <span className="text-zinc-400">que vende.</span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'Hola Sync Pro, quiero que trabajemos juntos. ¿Me pueden dar información?'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-zinc-950 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-zinc-200 transition-all shadow-lg"
            >
              <MessageCircle size={15} /> Trabajemos juntos
            </a>
            <a
              href="#planes-edicion"
              className="bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/15 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all backdrop-blur-md"
            >
              Ver Planes <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        <div className="mt-4">
          <InfiniteMediaCarousel items={projects} onSelectItem={(item) => setLightboxItem(item)} />
        </div>

        <p className="mt-1 px-6 text-center text-[11px] font-medium tracking-wide text-zinc-400">
          <span className="hidden md:inline">Pasa el cursor para detener y ampliar · Arrastra o usa las flechas · </span>
          <span className="md:hidden">Desliza con el dedo · </span>
          Toca un video para verlo en grande y con sonido
        </p>
      </section>

      {/* =====================================================================
          2. TRABAJAMOS CON MARCAS
          ===================================================================== */}
      <section id="marcas" className="py-12 md:py-14 bg-zinc-50/70 border-b border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-6 mb-7 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-400 block mb-1.5">
            Marcas que confían en nosotros
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-zinc-900">
            Trabajamos con marcas
          </h2>
        </div>

        <div className="sync-brand-mq sync-edge-mask overflow-hidden py-2">
          <div className="sync-brand-track">
            {[...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, idx) => (
              <span
                key={`${brand.name}-${idx}`}
                className="flex-none flex items-center justify-center w-[150px] h-[84px] md:w-[190px] md:h-[100px] mr-3 md:mr-4 rounded-2xl bg-white border border-zinc-200/80 shadow-sm hover:-translate-y-1 transition-all duration-300 px-4"
              >
                <img
                  src={brand.src}
                  alt={brand.name}
                  loading="lazy"
                  className="max-h-[52px] md:max-h-[68px] w-auto max-w-[120px] md:max-w-[148px] object-contain block"
                />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. APARTADO DE FOTOS: FOTOGRAFÍA QUE VENDE (DE EXTREMO A EXTREMO
             IZQUIERDA Y DERECHA + GRILLA COMPLETA)
          ===================================================================== */}
      <section id="fotografia" className="py-16 md:py-20 border-b border-zinc-200/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-400 block mb-1.5">
              Producción Visual & Comercial
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-zinc-900 leading-none">
              Fotografía que vende
            </h2>
          </div>
          <p className="text-zinc-500 text-xs md:text-sm max-w-sm font-normal leading-relaxed">
            Producto, gastronomía, inmobiliaria y marca. Las fotografías continúan hacia ambos costados; pasa el cursor o
            toca cualquiera para verla en grande.
          </p>
        </div>

        {/* Cinta continua de extremo a extremo (izquierda a derecha de toda la pantalla) */}
        <InfiniteMediaCarousel
          items={COMMERCIAL_PHOTOS}
          onSelectItem={(item) => setLightboxItem(item)}
          cardHeightClass="h-[300px] md:h-[380px] lg:h-[410px]"
        />

        {/* Grilla ancha de extremo a extremo (Full-Bleed de izquierda a derecha) */}
        <div className="w-full px-2 sm:px-4 md:px-6 mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 md:gap-3.5 grid-flow-dense">
            {COMMERCIAL_PHOTOS.map((shot) => (
              <figure
                key={shot.id}
                onClick={() => setLightboxItem(shot)}
                className={`group relative m-0 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-200/80 shadow-sm cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl hover:z-10 ${
                  shot.wide ? 'col-span-2 aspect-[16/9] sm:aspect-[3/2]' : 'aspect-[3/4]'
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
                <figcaption className="absolute left-0 right-0 bottom-0 p-3.5 text-white pointer-events-none">
                  <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-300 mb-0.5">
                    {shot.title}
                  </span>
                  <b className="block text-xs md:text-sm font-bold tracking-tight leading-snug">{shot.subtitle}</b>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-9 flex justify-center px-6">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              'Hola Sync Pro, vi su portafolio de video y fotografía y quiero algo así para mi marca.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zinc-950 text-white px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2.5 hover:bg-zinc-800 transition-all shadow-md"
          >
            <MessageCircle size={15} /> Quiero algo así para mi marca
          </a>
        </div>
      </section>

      {/* =====================================================================
          4. ASÍ TRABAJAMOS (Carrusel infinito Detrás de Cámaras: Videos + Fotos)
          ===================================================================== */}
      <section id="asi-trabajamos" className="py-16 md:py-20 bg-zinc-950 text-white border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 md:px-8 mb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-400 block mb-1.5">
              Backstage & Producción
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-white leading-none">
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
          cardHeightClass="h-[320px] md:h-[400px] lg:h-[430px]"
        />
      </section>

      {/* =====================================================================
          5. POR QUÉ TUS VIDEOS GENERAN CLIENTES (100% DAVINCI RESOLVE STUDIO:
             LÍNEA DE TIEMPO FIEL + APLICACIÓN DE ARCHIVO DE COLOR + CURVAS Y
             ANIMACIÓN DE TEXTO + TRAZADO INMOBILIARIO 3D)
          ===================================================================== */}
      <section
        id="ingenieria-visual"
        className="py-20 px-6 md:px-8 max-w-7xl mx-auto border-b border-zinc-200/70"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-400 block mb-2">
              Ingeniería Visual · 100% DaVinci Resolve Studio
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-zinc-900 leading-tight">
              Por qué tus videos generan clientes
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950 text-white text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              DaVinci Resolve Studio Oficial (Edit · Fusion · Color · Fairlight)
            </span>
          </div>
        </div>

        {/* 1. Línea de Tiempo Auténtica de DaVinci Resolve Studio (Ancho Completo Superior) */}
        <div className="mb-6">
          <DaVinciResolveAuthenticTimeline />
        </div>

        {/* 2. Tres Módulos Visuales en Vivo: Archivo de Color (.CUBE), Movimiento de Curvas + Animación de Texto, y Trazado Inmobiliario 3D */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DaVinciColorGradeWipe />
          <DaVinciCurvesAndTextMotion />
          <RealEstateMotionShowcase />
        </div>
      </section>

      {/* =====================================================================
          6. PLANES DE EDICIÓN DE VIDEO POR DURACIÓN
          ===================================================================== */}
      <section id="planes-edicion" className="py-20 px-6 md:px-8 max-w-7xl mx-auto border-b border-zinc-200/70">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-400 block mb-2">
              Inversión Transparente por Duración
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-zinc-900 leading-none">
              Planes de edición
            </h2>
          </div>
          <p className="text-zinc-500 text-xs md:text-sm max-w-md font-normal leading-relaxed">
            Elige la duración de tu video y compara al instante qué incluye cada nivel de producción en DaVinci Resolve
            Studio.
          </p>
        </div>

        {/* Selector de Duración Limpio */}
        <div className="bg-zinc-100/90 p-1.5 rounded-2xl grid grid-cols-2 lg:grid-cols-4 gap-1.5 mb-8 border border-zinc-200/80">
          {durationPlans.map((plan, index) => {
            const isSelected = selectedDurationIndex === index;
            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedDurationIndex(index)}
                className={`relative py-3.5 px-4 rounded-xl text-left transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-zinc-950 text-white shadow-md'
                    : 'bg-transparent text-zinc-600 hover:bg-white/80 hover:text-zinc-900'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="flex items-center gap-1.5 text-xs font-bold tracking-tight">
                    <Clock size={13} className={isSelected ? 'text-white' : 'text-zinc-400'} />
                    {plan.label}
                  </span>
                  {plan.popular && (
                    <span
                      className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-white text-zinc-950' : 'bg-zinc-900 text-white'
                      }`}
                    >
                      Popular
                    </span>
                  )}
                </div>
                <span className={`text-[11px] font-normal leading-snug ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                  {plan.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tarjetas Comparativas: Edición Básica vs Edición Avanzada */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* EDICIÓN BÁSICA */}
          <div className="rounded-3xl bg-white border border-zinc-200/90 p-7 md:p-9 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.07)] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start gap-4 pb-6 border-b border-zinc-100">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-[10px] font-semibold uppercase tracking-wider text-zinc-600 mb-2.5">
                    Nivel 01 · Flujo Esencial
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900">Edición Básica</h3>
                  <p className="text-zinc-500 text-xs md:text-sm mt-1 font-normal">
                    Ideal para contenido ágil, claro y bien musicalizado con tus tomas y guion listos.
                  </p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0 text-zinc-800">
                  <Film size={20} />
                </div>
              </div>

              {/* Precio Dinámico */}
              <div className="my-6 p-5 rounded-2xl bg-zinc-50 border border-zinc-200/70 flex items-baseline justify-between flex-wrap gap-4">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-0.5">
                    Duración seleccionada: {activeDuration.label}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-bold text-zinc-500">Bs.</span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`basic-${activeDuration.id}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900"
                      >
                        {activeDuration.basicPrice}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-lg bg-white border border-zinc-200 text-zinc-600">
                  Por video terminado
                </span>
              </div>

              {/* Lista de entregables */}
              <div className="space-y-3 mb-8">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-2">
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
                  <div key={i} className="flex items-start gap-2.5 text-xs md:text-[13px] text-zinc-600 font-normal leading-relaxed">
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
              className="w-full py-3.5 px-6 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle size={15} /> Solicitar Edición Básica ({activeDuration.label})
            </a>
          </div>

          {/* EDICIÓN AVANZADA */}
          <div className="rounded-3xl bg-[#0b0b0e] text-white border border-zinc-800 p-7 md:p-9 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.3)] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start gap-4 pb-6 border-b border-white/[0.08]">
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="px-3 py-1 rounded-full bg-white text-zinc-950 text-[10px] font-bold uppercase tracking-wider">
                      Nivel 02 · Alto Impacto + IA
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-semibold uppercase tracking-wider">
                      Recomendado
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">Edición Avanzada</h3>
                  <p className="text-zinc-400 text-xs md:text-sm mt-1 font-normal">
                    Producción comercial con DaVinci Resolve Fusion 3D, archivos de color e Inteligencia Artificial.
                  </p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0 text-white">
                  <Sparkles size={20} />
                </div>
              </div>

              {/* Precio Dinámico */}
              <div className="my-6 p-5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-baseline justify-between flex-wrap gap-4">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-0.5">
                    Duración seleccionada: {activeDuration.label}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-bold text-zinc-300">Bs.</span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`adv-${activeDuration.id}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="text-4xl md:text-5xl font-extrabold tracking-tight text-white"
                      >
                        {activeDuration.advancedPrice}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg bg-white text-zinc-950">
                  Incluye Motion 3D + IA
                </span>
              </div>

              {/* Lista de entregables */}
              <div className="space-y-3 mb-8">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-2">
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
                  <div key={i} className="flex items-start gap-2.5 text-xs md:text-[13px] text-zinc-200 font-normal leading-relaxed">
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
              className="w-full py-3.5 px-6 bg-white hover:bg-zinc-200 text-zinc-950 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageCircle size={15} /> Solicitar Edición Avanzada ({activeDuration.label})
            </a>
          </div>
        </div>

        {/* Barra de Adicionales y Extras */}
        <div className="rounded-2xl bg-zinc-50 border border-zinc-200/80 p-6 md:p-7">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-xs">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-400 block mb-1">
                Complementos opcionales
              </span>
              <h4 className="text-lg font-bold tracking-tight text-zinc-900 flex items-center gap-2">
                <Plus size={16} className="text-zinc-500" /> Adicionales a medida
              </h4>
              <p className="text-zinc-500 text-xs mt-1 font-normal leading-relaxed">
                Añade extras solo cuando tu producción requiera más tomas con IA o terrenos adicionales.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 flex-1">
              <div className="p-4 rounded-xl bg-white border border-zinc-200/80 shadow-sm">
                <div className="flex items-center justify-between text-zinc-400 mb-1">
                  <Sparkles size={14} />
                  <span className="text-[9px] font-mono uppercase tracking-wider">EXTRA IA</span>
                </div>
                <div className="text-lg font-extrabold text-zinc-900">+Bs. 50</div>
                <div className="text-[11px] text-zinc-500 mt-0.5">Video extra generado con IA (c/u)</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-zinc-200/80 shadow-sm">
                <div className="flex items-center justify-between text-zinc-400 mb-1">
                  <MapPin size={14} />
                  <span className="text-[9px] font-mono uppercase tracking-wider">INMOBILIARIA</span>
                </div>
                <div className="text-lg font-extrabold text-zinc-900">+Bs. 80</div>
                <div className="text-[11px] text-zinc-500 mt-0.5">Marcado de terreno adicional (c/u)</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-zinc-200/80 shadow-sm">
                <div className="flex items-center justify-between text-zinc-400 mb-1">
                  <Mic size={14} />
                  <span className="text-[9px] font-mono uppercase tracking-wider">REVISIONES</span>
                </div>
                <div className="text-lg font-extrabold text-zinc-900">+Bs. 30 / 60</div>
                <div className="text-[11px] text-zinc-500 mt-0.5">Ajuste extra (3ra revisión en adelante)</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-zinc-200/80 shadow-sm">
                <div className="flex items-center justify-between text-zinc-400 mb-1">
                  <Clock size={14} />
                  <span className="text-[9px] font-mono uppercase tracking-wider">+120 SEG</span>
                </div>
                <div className="text-lg font-extrabold text-zinc-900">+Bs. 60 / 100</div>
                <div className="text-[11px] text-zinc-500 mt-0.5">Cada +30 seg extras (Básica / Avanzada)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. PROCESO EN 3 PASOS
          ===================================================================== */}
      <section className="py-16 md:py-20 px-6 md:px-8 max-w-7xl mx-auto border-b border-zinc-200/70">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-400 block mb-1.5">
              Flujo de Trabajo Directo
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-zinc-900 leading-none">
              Cómo trabajamos tu video
            </h2>
          </div>
          <p className="text-zinc-500 text-xs md:text-sm max-w-sm font-normal leading-relaxed">
            Tres pasos claros para entregar tu video listo para publicar o pautar en Meta Ads y TikTok.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
              className="rounded-2xl bg-white border border-zinc-200/90 p-6 md:p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="w-8 h-8 rounded-lg bg-zinc-950 text-white text-xs font-mono font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-[10px] font-medium text-zinc-600">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold tracking-tight text-zinc-900 mb-2">{item.title}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed font-normal">{item.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
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
      <section id="contacto" className="py-16 md:py-20 px-6 md:px-8 max-w-5xl mx-auto">
        <div className="rounded-3xl bg-[#0b0b0e] text-white border border-zinc-800 p-8 md:p-12 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.28)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-400 block mb-2">
                Contacto Directo
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white leading-tight mb-4">
                Iniciemos tu próxima producción
              </h2>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-6 font-normal">
                Escríbenos directamente por WhatsApp para cotizar tu video en minutos o envíanos los detalles de tu
                proyecto en el formulario.
              </p>

              <div className="space-y-3.5">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    'Hola Sync Pro, quiero cotizar la edición de un video.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white text-zinc-950 text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all"
                >
                  <MessageCircle size={16} /> WhatsApp: +591 69109766
                </a>
                <div className="flex items-center gap-2.5 text-xs text-zinc-300 pt-1">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span>Disponibilidad inmediata para proyectos comerciales</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-zinc-400">
                  <ShieldCheck size={15} className="text-zinc-300" />
                  <span>Postproducción 100% en DaVinci Resolve Studio Oficial</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
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
      <section id="herramientas" className="py-16 px-6 md:px-8 max-w-7xl mx-auto border-t border-zinc-200/70">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-400 block mb-1.5">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="rounded-2xl bg-zinc-50/80 border border-zinc-200/90 p-7 flex flex-col justify-between hover:bg-white hover:shadow-md transition-all"
            >
              <div>
                <div className="flex justify-between items-start mb-5">
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
                <h3 className="text-xl font-bold tracking-tight text-zinc-900 mb-2">{tool.name}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed mb-5 font-normal">{tool.description}</p>

                <div className="grid grid-cols-2 gap-2 mb-6">
                  {tool.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] font-medium text-zinc-700">
                      <span className="w-1 h-1 bg-zinc-900 rounded-full" />
                      {spec}
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
                  className="max-h-[80vh] max-w-full w-auto rounded-2xl bg-black border border-white/15 shadow-2xl"
                />
              ) : (
                <img
                  src={lightboxItem.src}
                  alt={lightboxItem.subtitle || lightboxItem.title}
                  className="max-h-[80vh] max-w-full w-auto rounded-2xl bg-black border border-white/15 shadow-2xl"
                />
              )}

              <div className="mt-3 text-center text-white">
                <b className="block text-sm font-bold uppercase tracking-tight">{lightboxItem.title}</b>
                {lightboxItem.subtitle && (
                  <span className="block text-xs text-zinc-400 font-normal mt-0.5">{lightboxItem.subtitle}</span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón Flotante de WhatsApp */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          'Hola Sync Pro, vi su portafolio web y quiero cotizar un video.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-5 right-5 z-50 bg-zinc-950 text-white px-4 py-3.5 rounded-full shadow-xl border border-white/15 hover:scale-105 transition-all flex items-center gap-2"
      >
        <MessageCircle size={18} className="text-emerald-400" />
        <span className="text-[11px] font-bold uppercase tracking-wider pr-1 hidden sm:inline">WhatsApp</span>
      </a>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-200/80 text-center bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
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
