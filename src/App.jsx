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
  TrendingUp,
  Sliders,
  Crosshair,
  ShieldCheck,
  Zap,
  Camera,
  X
} from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

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

  // Multiplicamos la lista para que siempre cubra más de 2 pantallas y haga bucle infinito perfecto
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

    const SPEED = 78; // píxeles por segundo
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
            const aspectClass = isVideo ? 'aspect-[9/16]' : 'aspect-[3/4]';

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

                {/* Gradiente cinematográfico de lectura */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 pointer-events-none" />

                {/* Etiqueta superior izquierda (categoría si existe) */}
                {item.category && (
                  <span className="absolute left-3 top-3 z-10 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/15 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-200">
                    {item.category}
                  </span>
                )}

                {/* Botón esquina superior derecha: Audio directo en videos o indicador de ampliación en fotos */}
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

                {/* Pie de tarjeta idéntico a Estudio Vector con tipografía Sync Pro */}
                <figcaption className="absolute left-3.5 right-3.5 bottom-3.5 z-10 text-left text-white pointer-events-none">
                  <b className="block text-sm md:text-[15px] font-black italic uppercase tracking-tight leading-tight drop-shadow">
                    {item.title}
                  </b>
                  <span className="block text-[11px] font-semibold text-white/75 leading-snug mt-0.5 line-clamp-2">
                    {item.subtitle}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      {/* Flechas laterales de navegación */}
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
   MOTION GRAPHICS COMPLEMENTARIOS EN VIVO (ESTÉTICA MONOCROMÁTICA SYNC PRO)
   ============================================================================ */

// 1. Motion Graphic: Timeline NLE de Alta Retención & Diseño Sonoro
const MotionTimelineGraphic = () => {
  const waveHeights = [35, 70, 45, 95, 60, 85, 40, 100, 65, 90, 50, 80, 95, 55, 75, 45, 88, 62];
  return (
    <div className="relative h-44 w-full rounded-[24px] bg-zinc-950 border border-white/10 p-4 overflow-hidden flex flex-col justify-between select-none">
      <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-[0.25em] text-zinc-500 border-b border-white/5 pb-2">
        <span className="flex items-center gap-1.5 text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          TIMELINE // 00:00:03:18
        </span>
        <span className="px-2 py-0.5 rounded bg-white/10 text-white">94% RETENCIÓN</span>
      </div>

      {/* Pistas NLE */}
      <div className="relative space-y-2 my-auto py-1">
        {/* Pista V2: Motion Graphics & Hooks */}
        <div className="flex items-center gap-2">
          <span className="text-[8px] font-black text-zinc-600 w-5">V2</span>
          <div className="flex-1 h-5 rounded-md bg-white/[0.03] border border-white/5 flex items-center gap-1.5 px-1.5 overflow-hidden">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              className="h-3 w-1/4 rounded bg-white/80 text-[7px] font-black text-zinc-950 flex items-center justify-center tracking-tighter uppercase"
            >
              HOOK 0-3S
            </motion.div>
            <div className="h-3 w-1/3 rounded bg-zinc-700/70 border border-white/20 text-[7px] font-black text-white flex items-center justify-center tracking-tighter uppercase">
              TEXTO 3D
            </div>
            <div className="h-3 w-1/4 rounded bg-white/30 text-[7px] font-black text-white flex items-center justify-center tracking-tighter uppercase">
              SFX HIT
            </div>
          </div>
        </div>

        {/* Pista V1: Cortes Dinámicos & Speed Ramps */}
        <div className="flex items-center gap-2">
          <span className="text-[8px] font-black text-zinc-600 w-5">V1</span>
          <div className="flex-1 h-5 rounded-md bg-white/[0.03] border border-white/5 flex items-center gap-1 px-1 overflow-hidden">
            <div className="h-3.5 w-[28%] rounded-sm bg-zinc-800 border-l-2 border-white" />
            <div className="h-3.5 w-[22%] rounded-sm bg-zinc-700 border-l-2 border-zinc-300" />
            <div className="h-3.5 w-[30%] rounded-sm bg-zinc-800 border-l-2 border-white" />
            <div className="h-3.5 flex-1 rounded-sm bg-zinc-700 border-l-2 border-zinc-400" />
          </div>
        </div>

        {/* Pista A1: Onda de Audio Masterizada */}
        <div className="flex items-center gap-2 pt-0.5">
          <span className="text-[8px] font-black text-zinc-600 w-5">A1</span>
          <div className="flex-1 h-6 rounded-md bg-white/[0.02] border border-white/5 flex items-center justify-between px-2 gap-1">
            {waveHeights.map((h, i) => (
              <motion.span
                key={i}
                animate={{ height: [`${Math.max(20, h * 0.45)}%`, `${h}%`, `${Math.max(20, h * 0.45)}%`] }}
                transition={{ duration: 1.1 + (i % 4) * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 rounded-full bg-zinc-400"
              />
            ))}
          </div>
        </div>

        {/* Cabezal de reproducción (Playhead) animado */}
        <motion.div
          animate={{ left: ['12%', '92%', '12%'] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 bottom-0 w-[1.5px] bg-white shadow-[0_0_12px_#ffffff] z-10 pointer-events-none"
        >
          <div className="w-2.5 h-2.5 -ml-[4px] -mt-1 rotate-45 bg-white" />
        </motion.div>
      </div>

      <div className="flex items-center justify-between text-[8px] font-bold uppercase tracking-widest text-zinc-500">
        <span>CORTES CADA 1.8 SEG</span>
        <span>SPEED RAMP + SFX</span>
      </div>
    </div>
  );
};

// 2. Motion Graphic: Trazado 3D de Terrenos & Callouts Flotantes
const MotionTrackingGraphic = () => {
  return (
    <div className="relative h-44 w-full rounded-[24px] bg-zinc-950 border border-white/10 p-4 overflow-hidden flex flex-col justify-between select-none">
      {/* Cuadrícula de perspectiva sutil */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '22px 22px'
        }}
      />

      <div className="relative z-10 flex items-center justify-between text-[9px] font-black uppercase tracking-[0.25em] text-zinc-500">
        <span className="text-zinc-300">3D CAMERA TRACKER</span>
        <span className="px-2 py-0.5 rounded bg-white/10 text-white">LOTE / INMUEBLE</span>
      </div>

      {/* SVG Polígono de Terreno Animado + Nodos de Tracking */}
      <div className="relative z-10 my-auto flex items-center justify-center h-24">
        <svg viewBox="0 0 260 90" className="w-full h-full overflow-visible">
          {/* Sombra rellena del terreno */}
          <motion.polygon
            points="45,68 92,22 205,28 225,74"
            fill="rgba(255,255,255,0.07)"
            animate={{ opacity: [0.05, 0.16, 0.05] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          {/* Borde trazado en vivo */}
          <motion.polygon
            points="45,68 92,22 205,28 225,74"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="6 4"
            animate={{ strokeDashoffset: [0, -40] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          {/* Esquinas de tracking */}
          {[
            [45, 68],
            [92, 22],
            [205, 28],
            [225, 74]
          ].map(([cx, cy], idx) => (
            <g key={idx}>
              <circle cx={cx} cy={cy} r="4" fill="#ffffff" />
              <circle cx={cx} cy={cy} r="8" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            </g>
          ))}
          {/* Línea de Callout Flotante */}
          <line x1="145" y1="48" x2="168" y2="14" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="145" cy="48" r="3.5" fill="#ffffff" />
        </svg>

        {/* Etiqueta Flotante 3D */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1 right-4 px-2.5 py-1 rounded-lg bg-white text-zinc-950 text-[8px] font-black uppercase tracking-wider shadow-[0_10px_25px_rgba(255,255,255,0.25)]"
        >
          SEÑALADOR 3D · 500M²
        </motion.div>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[8px] font-bold uppercase tracking-widest text-zinc-500">
        <span>DELIMITACIÓN EXACTA</span>
        <span>TEXTOS ANCLADOS AL PISO</span>
      </div>
    </div>
  );
};

// 3. Motion Graphic: Nodos DaVinci Resolve + Motor de IA Generativa
const MotionColorAiGraphic = () => {
  return (
    <div className="relative h-44 w-full rounded-[24px] bg-zinc-950 border border-white/10 p-4 overflow-hidden flex flex-col justify-between select-none">
      <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-[0.25em] text-zinc-500 border-b border-white/5 pb-2">
        <span className="text-zinc-300">NODE GRAPH // COLOR + IA</span>
        <span className="px-2 py-0.5 rounded bg-white/10 text-white">32-BIT FLOAT</span>
      </div>

      {/* Árbol de Nodos Animado */}
      <div className="relative my-auto flex items-center justify-between px-2 py-2">
        {/* Línea conectora base */}
        <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-[1.5px] bg-white/15" />
        {/* Pulso viajando por los nodos */}
        <motion.div
          animate={{ left: ['10%', '85%'] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 -translate-y-1/2 w-8 h-[2px] bg-white shadow-[0_0_10px_#fff]"
        />

        {/* Nodo 01: RAW LOG */}
        <div className="relative z-10 flex flex-col items-center gap-1.5">
          <div className="w-12 h-10 rounded-xl bg-zinc-900 border border-white/20 flex items-center justify-center text-[8px] font-black text-zinc-400 uppercase">
            RAW / LOG
          </div>
          <span className="text-[7px] font-bold text-zinc-500 uppercase tracking-widest">ENTRADA</span>
        </div>

        {/* Nodo 02: IA & B-ROLL */}
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="relative z-10 flex flex-col items-center gap-1.5"
        >
          <div className="w-14 h-11 rounded-xl bg-zinc-800 border border-white/50 shadow-[0_0_20px_rgba(255,255,255,0.12)] flex flex-col items-center justify-center text-[8px] font-black text-white uppercase">
            <Sparkles size={11} className="mb-0.5" />
            IA GEN
          </div>
          <span className="text-[7px] font-bold text-zinc-300 uppercase tracking-widest">VOZ + TOMAS IA</span>
        </motion.div>

        {/* Nodo 03: MASTER LOOK */}
        <div className="relative z-10 flex flex-col items-center gap-1.5">
          <div className="w-12 h-10 rounded-xl bg-white text-zinc-950 font-black text-[8px] flex items-center justify-center uppercase shadow-[0_0_20px_rgba(255,255,255,0.25)]">
            MASTER
          </div>
          <span className="text-[7px] font-bold text-white uppercase tracking-widest">CINE LOOK</span>
        </div>
      </div>

      {/* Barras de Color Wheels / Scopes */}
      <div className="flex items-center justify-between text-[8px] font-bold uppercase tracking-widest text-zinc-500">
        <span>DAVINCI RESOLVE STUDIO</span>
        <span>LOCUCIÓN & B-ROLL IA</span>
      </div>
    </div>
  );
};

/* ============================================================================
   COMPONENTE DE TARJETA CON LUZ EN EL BORDE (SNAKE BORDER) Y FOCO INTERACTIVO
   ============================================================================ */
const InteractiveCard = ({ children, className = '', isDark = true }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -5 }}
      className={`group relative rounded-[40px] p-[1.5px] overflow-hidden transition-all duration-500 shadow-lg hover:shadow-2xl ${className}`}
    >
      {/* Luz que recorre el borde (Snake Border) */}
      <div className="absolute inset-[-1000%] animate-[spin_8s_linear_infinite] opacity-15 group-hover:opacity-45 transition-opacity duration-700 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,#a1a1aa_100%)]" />

      {/* Contenedor Interior */}
      <div
        className={`relative h-full w-full rounded-[38.5px] z-10 overflow-hidden ${
          isDark ? 'bg-[#0a0a0a] text-white' : 'bg-white text-zinc-900 border border-zinc-100'
        }`}
      >
        {/* Efecto Spotlight Interno */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[38.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            background: useTransform(
              [smoothX, smoothY],
              ([x, y]) =>
                `radial-gradient(350px circle at ${x}px ${y}px, ${
                  isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
                }, transparent 80%)`
            )
          }}
        />
        <div className="relative z-20 h-full">{children}</div>
      </div>
    </motion.div>
  );
};

/* ============================================================================
   APLICACIÓN PRINCIPAL SYNC PRO
   ============================================================================ */
const App = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [selectedDurationIndex, setSelectedDurationIndex] = useState(0);
  const [lightboxItem, setLightboxItem] = useState(null);

  // Cerrar el visor con Escape
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

  // Tus 5 videos originales que salen directamente en el carrusel del inicio
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

  // --- PLANES REALES DE EDICIÓN DE VIDEO POR DURACIÓN ---
  const durationPlans = [
    {
      id: 'hasta-30',
      label: 'Hasta 30 seg',
      tag: 'Ideal para Reels / TikToks cortos e impacto rápido',
      basicPrice: 120,
      advancedPrice: 220
    },
    {
      id: '31-a-60',
      label: '31 a 60 seg',
      tag: 'El formato más pedido para anuncios y ventas',
      basicPrice: 180,
      advancedPrice: 320,
      popular: true
    },
    {
      id: '61-a-90',
      label: '61 a 90 seg',
      tag: 'Ideal para explicaciones completas y demostraciones',
      basicPrice: 250,
      advancedPrice: 430
    },
    {
      id: '91-a-120',
      label: '91 a 120 seg',
      tag: 'Producción extensa para proyectos e inmobiliaria',
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
      name: 'WorkFlow Sync',
      target: 'Premiere Pro & After Effects',
      description:
        'Optimización extrema del flujo de trabajo. Automatiza tareas repetitivas y sincroniza proyectos pesados en segundos.',
      badge: 'Best Seller',
      icon: <Layers className="text-white" size={24} />,
      specs: ['Auto-Render Queue', 'Smart Bin Organizer', 'Dynamic Link Boost', 'Frame-Accurate Sync']
    },
    {
      name: 'ColorMaster Node',
      target: 'DaVinci Resolve',
      description:
        'Estructuras de nodos pre-configuradas con gestión de color ACES e inteligencia artificial para balance de pieles.',
      badge: 'Nuevo',
      icon: <Cpu className="text-white" size={24} />,
      specs: ['One-Click ACES Pipeline', 'Skin Tone Isolation', 'Halation & Bloom Realista', 'LUTs de Cine Incluidos']
    }
  ];

  return (
    <div className="min-h-screen bg-[#ffffff] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white overflow-x-clip">
      {/* Navegación */}
      <nav className="sticky top-0 w-full z-50 bg-zinc-950/90 backdrop-blur-xl border-b border-white/10 px-6 md:px-8 py-4 flex justify-between items-center text-white">
        <a href="#" className="text-xl font-black tracking-tighter flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
          <span>SYNC PRO</span>
        </a>
        <div className="hidden lg:flex gap-7 text-[10px] font-black uppercase tracking-[0.22em] text-zinc-400">
          <a href="#inicio-videos" className="hover:text-white transition-colors">
            Nuestro Trabajo
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
            Ingeniería Visual
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
          className="bg-white text-zinc-950 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-lg flex items-center gap-2"
        >
          <MessageCircle size={14} /> Escríbenos
        </a>
      </nav>

      {/* =====================================================================
          1. ESCENARIO DE INICIO EN NEGRO & GRIS CARBÓN CON CARRUSEL EN MOVIMIENTO
             (Inspirado en Estudio Vector: tus videos se mueven solos y al acercar
             el cursor se detienen y se hacen grandes)
          ===================================================================== */}
      <section id="inicio-videos" className="sync-stage relative text-white pt-10 pb-10 md:pt-14 md:pb-12 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              Sync Pro · Digital Post-Production Studio
            </span>
            <h1 className="mt-3 text-3xl sm:text-5xl md:text-6xl font-black italic uppercase tracking-tighter leading-[0.96] text-white">
              Edición de video, motion graphics e IA{' '}
              <span className="text-zinc-400">para marcas que quieren vender más.</span>
            </h1>
            <p className="mt-4 text-zinc-400 text-sm md:text-base font-medium max-w-2xl leading-relaxed">
              Transformamos tus grabaciones en piezas magnéticas con ritmo psicológico, señaladores 3D, trazado de
              terrenos y acabado cinematográfico en DaVinci Resolve.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  'Hola Sync Pro, quiero que trabajemos juntos. ¿Me pueden dar información?'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-zinc-950 px-7 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2.5 hover:bg-zinc-200 transition-all shadow-[0_14px_34px_-12px_rgba(255,255,255,0.35)]"
              >
                <MessageCircle size={16} /> Trabajemos juntos
              </a>
              <a
                href="#planes-edicion"
                className="bg-white/10 hover:bg-white/15 text-white border border-white/20 px-7 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all backdrop-blur-md"
              >
                Ver Planes por Duración <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Carrusel infinito de tus 5 videos que se mueve solo y se pausa + agranda al acercar el cursor */}
        <div className="mt-6">
          <InfiniteMediaCarousel items={projects} onSelectItem={(item) => setLightboxItem(item)} />
        </div>

        <p className="mt-2 px-6 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
          <span className="hidden md:inline">Pasa el cursor para detener y ampliar · Arrastra o usa las flechas · </span>
          <span className="md:hidden">Desliza con el dedo · </span>
          Toca un video para verlo en grande y con sonido
        </p>
      </section>

      {/* =====================================================================
          2. TRABAJAMOS CON MARCAS (Cintillo infinito con las marcas de referencia)
          ===================================================================== */}
      <section id="marcas" className="py-14 md:py-16 bg-zinc-50/70 border-b border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.35em] text-zinc-400 block mb-2">
            Marcas que confían en nosotros
          </span>
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-zinc-900">
            Trabajamos con marcas.
          </h2>
        </div>

        <div className="sync-brand-mq sync-edge-mask overflow-hidden py-3">
          <div className="sync-brand-track">
            {[...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, idx) => (
              <span
                key={`${brand.name}-${idx}`}
                className="flex-none flex items-center justify-center w-[150px] h-[84px] md:w-[190px] md:h-[104px] mr-3 md:mr-4 rounded-2xl bg-white border border-zinc-200/90 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 px-4"
              >
                <img
                  src={brand.src}
                  alt={brand.name}
                  loading="lazy"
                  className="max-h-[54px] md:max-h-[70px] w-auto max-w-[120px] md:max-w-[150px] object-contain block"
                />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. APARTADO DE FOTOS: FOTOGRAFÍA QUE VENDE
          ===================================================================== */}
      <section id="fotografia" className="py-20 px-6 md:px-8 max-w-7xl mx-auto border-b border-zinc-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 block mb-3">
              01 // PRODUCCIÓN VISUAL & COMERCIAL
            </span>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">
              Fotografía que vende.
            </h2>
          </div>
          <p className="text-zinc-500 text-xs md:text-sm max-w-sm font-medium leading-relaxed">
            Producto, gastronomía, inmobiliaria y marca. Toca cualquier fotografía para inspeccionarla en pantalla
            completa.
          </p>
        </div>

        {/* Grilla densa estilo Estudio Vector (4 columnas en escritorio con tarjetas wide de 2 columnas) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 grid-flow-dense">
          {COMMERCIAL_PHOTOS.map((shot) => (
            <figure
              key={shot.id}
              onClick={() => setLightboxItem(shot)}
              className={`group relative m-0 rounded-[22px] overflow-hidden bg-zinc-900 border border-zinc-200/80 shadow-md cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-2xl hover:z-10 ${
                shot.wide ? 'col-span-2 aspect-[16/9] md:aspect-[3/2]' : 'aspect-[3/4]'
              }`}
            >
              <img
                src={shot.src}
                alt={`${shot.title}: ${shot.subtitle}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover block transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />
              <figcaption className="absolute left-0 right-0 bottom-0 p-4 md:p-5 text-white pointer-events-none">
                <span className="block text-[9px] font-black uppercase tracking-[0.22em] text-zinc-300 mb-0.5">
                  {shot.title}
                </span>
                <b className="block text-xs md:text-sm font-black italic uppercase tracking-tight leading-snug">
                  {shot.subtitle}
                </b>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              'Hola Sync Pro, vi su portafolio de video y fotografía y quiero algo así para mi marca.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zinc-950 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-zinc-800 transition-all shadow-xl"
          >
            <MessageCircle size={16} /> Quiero algo así para mi marca
          </a>
        </div>
      </section>

      {/* =====================================================================
          4. ASÍ TRABAJAMOS (Carrusel infinito Detrás de Cámaras: Videos + Fotos)
          ===================================================================== */}
      <section id="asi-trabajamos" className="py-20 bg-zinc-950 text-white border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 md:px-8 mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 block mb-3">
              02 // BACKSTAGE & PRODUCCIÓN EN CAMPO
            </span>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white leading-none">
              Así trabajamos.
            </h2>
          </div>
          <p className="text-zinc-400 text-xs md:text-sm max-w-md font-medium leading-relaxed">
            Detrás de cámaras: equipo, luces, cámaras, dirección y sets de grabación de nuestras producciones. Acerca el
            cursor para detener y ampliar cualquier toma.
          </p>
        </div>

        <InfiniteMediaCarousel
          items={BTS_ITEMS}
          onSelectItem={(item) => setLightboxItem(item)}
          cardHeightClass="h-[320px] md:h-[400px] lg:h-[430px]"
        />
      </section>

      {/* =====================================================================
          5. INGENIERÍA VISUAL + MOTION GRAPHICS EN VIVO
          ===================================================================== */}
      <section id="ingenieria-visual" className="py-20 px-6 md:px-8 max-w-7xl mx-auto border-b border-zinc-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 block mb-3">
              03 // INGENIERÍA VISUAL & PSICOLOGÍA DE CONVERSIÓN
            </span>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">
              Por qué tus videos <br /> generan clientes.
            </h2>
          </div>
          <p className="text-zinc-500 text-xs md:text-sm max-w-md font-medium leading-relaxed">
            Un buen video comercial no es cuestión de suerte. Combinamos estructura psicológica de ventas, Motion
            Graphics en 3D e Inteligencia Artificial para que cada segundo justifique tu inversión.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <InteractiveCard isDark={true} className="p-8 md:p-9">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-[9px] font-black uppercase tracking-widest text-zinc-300">
                    01 // RETENCIÓN & RITMO
                  </span>
                  <TrendingUp size={18} className="text-zinc-400" />
                </div>

                <MotionTimelineGraphic />

                <h3 className="text-2xl font-black italic uppercase tracking-tight text-white mt-7 mb-3">
                  Psicología de Retención en los Primeros 3 Segundos
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed font-medium">
                  En Reels y TikTok el usuario decide en 1.8 segundos si desliza o se queda. Eliminamos tiempos muertos,
                  aplicamos cortes dinámicos, micro-zooms y diseño sonoro (SFX) sincronizado para mantener la atención
                  hasta el llamado a la acción.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-300">
                <span>HOOK VISUAL + SONIDO</span>
                <span className="text-white">+RETENCIÓN REAL</span>
              </div>
            </div>
          </InteractiveCard>

          <InteractiveCard isDark={true} className="p-8 md:p-9">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-[9px] font-black uppercase tracking-widest text-zinc-300">
                    02 // MOTION GRAPHICS & TRAZADO
                  </span>
                  <Crosshair size={18} className="text-zinc-400" />
                </div>

                <MotionTrackingGraphic />

                <h3 className="text-2xl font-black italic uppercase tracking-tight text-white mt-7 mb-3">
                  Señaladores 3D, Callouts y Delimitación de Terrenos
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed font-medium">
                  Especialistas en bienes raíces, lotes y negocios físicos: integramos textos flotantes rastreados al
                  movimiento de cámara y trazado exacto de terrenos para que el comprador entienda ubicaciones, metrajes
                  y beneficios al instante.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-300">
                <span>TRACKING DE CÁMARA 3D</span>
                <span className="text-white">ALTO VALOR PERCIBIDO</span>
              </div>
            </div>
          </InteractiveCard>

          <InteractiveCard isDark={true} className="p-8 md:p-9">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-[9px] font-black uppercase tracking-widest text-zinc-300">
                    03 // DAVINCI RESOLVE + IA
                  </span>
                  <Sliders size={18} className="text-zinc-400" />
                </div>

                <MotionColorAiGraphic />

                <h3 className="text-2xl font-black italic uppercase tracking-tight text-white mt-7 mb-3">
                  Colorización Cinematográfica & Generación con IA
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed font-medium">
                  ¿Te faltan tomas o no pudiste grabar voz? Complementamos tu material con videos generados por
                  Inteligencia Artificial, locución comercial hiperrealista y corrección de color profesional en DaVinci
                  Resolve.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-300">
                <span>ACABADO DE ESTUDIO</span>
                <span className="text-white">SIN LÍMITES DE RODAJE</span>
              </div>
            </div>
          </InteractiveCard>
        </div>
      </section>

      {/* =====================================================================
          6. PLANES DE EDICIÓN DE VIDEO POR DURACIÓN
          ===================================================================== */}
      <section id="planes-edicion" className="py-20 px-6 md:px-8 max-w-7xl mx-auto border-b border-zinc-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 block mb-3">
              04 // INVERSIÓN TRANSPARENTE POR DURACIÓN
            </span>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">
              Planes de Edición.
            </h2>
          </div>
          <p className="text-zinc-500 text-xs max-w-sm font-medium leading-relaxed">
            Selecciona la duración de tu video y compara al instante qué incluye nuestra Edición Básica frente a la
            Edición Avanzada con IA y Motion Graphics.
          </p>
        </div>

        {/* Selector de Duración */}
        <div className="bg-zinc-100 p-2 rounded-[28px] grid grid-cols-2 lg:grid-cols-4 gap-2 mb-10 border border-zinc-200/80">
          {durationPlans.map((plan, index) => {
            const isSelected = selectedDurationIndex === index;
            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedDurationIndex(index)}
                className={`relative py-4 px-5 rounded-[22px] text-left transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#0a0a0a] text-white shadow-xl scale-[1.01]'
                    : 'bg-transparent text-zinc-600 hover:bg-white/70 hover:text-zinc-900'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="flex items-center gap-2 text-xs font-black uppercase tracking-wider">
                    <Clock size={14} className={isSelected ? 'text-white' : 'text-zinc-400'} />
                    {plan.label}
                  </span>
                  {plan.popular && (
                    <span
                      className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                        isSelected ? 'bg-white text-zinc-950' : 'bg-zinc-900 text-white'
                      }`}
                    >
                      Más Pedido
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-medium leading-snug ${isSelected ? 'text-zinc-400' : 'text-zinc-400'}`}>
                  {plan.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Comparativa de Planes: Básica vs Avanzada */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* EDICIÓN BÁSICA */}
          <InteractiveCard isDark={true} className="p-8 md:p-11">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex justify-between items-start gap-4 mb-6">
                  <div>
                    <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-[9px] font-black uppercase tracking-widest text-zinc-300 inline-block mb-3">
                      NIVEL 01 · FLUJO ESENCIAL
                    </span>
                    <h3 className="text-3xl font-black italic uppercase tracking-tight text-white">Edición Básica</h3>
                    <p className="text-zinc-400 text-xs mt-1 font-medium">
                      Ideal para contenido ágil, claro y bien musicalizado con tus tomas y guion listos.
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Film className="text-white" size={22} />
                  </div>
                </div>

                {/* Precio Dinámico */}
                <div className="my-8 p-6 rounded-3xl bg-white/[0.03] border border-white/10 flex items-baseline justify-between flex-wrap gap-4">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-500 block mb-1">
                      DURACIÓN: {activeDuration.label.toUpperCase()}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Bs.</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={`basic-${activeDuration.id}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                          className="text-5xl md:text-6xl font-black italic tracking-tighter text-white"
                        >
                          {activeDuration.basicPrice}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl bg-white/10 text-zinc-300">
                    Por video terminado
                  </span>
                </div>

                {/* Lista de entregables */}
                <div className="space-y-3.5 mb-8">
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500 mb-2">
                    ¿QUÉ INCLUYE ESTE PLAN?
                  </div>
                  {[
                    'El cliente envía sus tomas de video y el guion listo',
                    'Selección, recorte y unión profesional de las mejores tomas',
                    'Música de fondo acorde al ritmo del video + efectos de sonido básicos',
                    'Títulos limpios o subtítulos dinámicos para retención',
                    'Ajuste básico de imagen y color para un acabado limpio',
                    'Incluye hasta 2 revisiones (ajustes sobre el mismo guion)'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs text-zinc-300 font-medium leading-relaxed">
                      <CheckCircle2 size={15} className="text-zinc-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={getWhatsAppPlanUrl('Edición Básica', activeDuration.label, activeDuration.basicPrice)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-white/10 hover:bg-white text-white hover:text-zinc-950 border border-white/15 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle size={15} /> Solicitar Edición Básica ({activeDuration.label})
              </a>
            </div>
          </InteractiveCard>

          {/* EDICIÓN AVANZADA */}
          <InteractiveCard isDark={true} className="p-8 md:p-11">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex justify-between items-start gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3.5 py-1.5 rounded-full bg-white text-zinc-950 text-[9px] font-black uppercase tracking-widest inline-block">
                        NIVEL 02 · ALTO IMPACTO + IA
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/10 text-white text-[9px] font-black uppercase tracking-widest">
                        RECOMENDADO
                      </span>
                    </div>
                    <h3 className="text-3xl font-black italic uppercase tracking-tight text-white">Edición Avanzada</h3>
                    <p className="text-zinc-400 text-xs mt-1 font-medium">
                      Producción comercial completa con Motion Graphics, trazado de terrenos e Inteligencia Artificial.
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white text-zinc-950 flex items-center justify-center shrink-0 shadow-lg">
                    <Sparkles size={22} />
                  </div>
                </div>

                {/* Precio Dinámico */}
                <div className="my-8 p-6 rounded-3xl bg-white/[0.07] border border-white/20 flex items-baseline justify-between flex-wrap gap-4">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-400 block mb-1">
                      DURACIÓN: {activeDuration.label.toUpperCase()}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-black uppercase tracking-widest text-zinc-300">Bs.</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={`adv-${activeDuration.id}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                          className="text-5xl md:text-6xl font-black italic tracking-tighter text-white"
                        >
                          {activeDuration.advancedPrice}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl bg-white text-zinc-950">
                    Incluye IA + Motion
                  </span>
                </div>

                {/* Lista de entregables */}
                <div className="space-y-3.5 mb-8">
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 mb-2">
                    TODO LO DE BÁSICA MÁS:
                  </div>
                  {[
                    'El cliente envía sus tomas y el guion (o estructuramos el ritmo visual)',
                    'Edición dinámica con mayor ritmo, efectos visuales y sonido trabajado',
                    'Animaciones gráficas, señaladores y textos flotantes integrados al video',
                    'Incluye el marcado / trazado animado de 1 terreno o lote',
                    'Incluye hasta 2 videos generados con Inteligencia Artificial (IA)',
                    'Incluye 1 audio o locución comercial generada con IA',
                    'Incluye hasta 2 revisiones sin costo adicional'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs text-zinc-200 font-medium leading-relaxed">
                      <CheckCircle2 size={15} className="text-white shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={getWhatsAppPlanUrl('Edición Avanzada', activeDuration.label, activeDuration.advancedPrice)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-white hover:bg-zinc-200 text-zinc-950 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-xl"
              >
                <MessageCircle size={15} /> Solicitar Edición Avanzada ({activeDuration.label})
              </a>
            </div>
          </InteractiveCard>
        </div>

        {/* Barra Inferior de Adicionales / Extras */}
        <InteractiveCard isDark={true} className="p-7 md:p-9">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-sm">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 block mb-1.5">
                COMPLEMENTOS A MEDIDA
              </span>
              <h4 className="text-xl font-black italic uppercase tracking-tight text-white flex items-center gap-2">
                <Plus size={18} className="text-zinc-400" /> Adicionales y Extras
              </h4>
              <p className="text-zinc-400 text-xs mt-1 font-medium leading-relaxed">
                Personaliza tu producción si tu proyecto requiere más tomas con IA, más terrenos o mayor duración.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 flex-1">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="flex items-center justify-between text-zinc-400 mb-1.5">
                  <Sparkles size={14} />
                  <span className="text-[9px] font-black uppercase tracking-widest">EXTRA IA</span>
                </div>
                <div className="text-lg font-black italic text-white">+Bs. 50</div>
                <div className="text-[11px] text-zinc-400 font-medium mt-0.5">Video extra generado con IA (c/u)</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="flex items-center justify-between text-zinc-400 mb-1.5">
                  <MapPin size={14} />
                  <span className="text-[9px] font-black uppercase tracking-widest">INMOBILIARIA</span>
                </div>
                <div className="text-lg font-black italic text-white">+Bs. 80</div>
                <div className="text-[11px] text-zinc-400 font-medium mt-0.5">Marcado de terreno adicional (c/u)</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="flex items-center justify-between text-zinc-400 mb-1.5">
                  <Mic size={14} />
                  <span className="text-[9px] font-black uppercase tracking-widest">REVISIONES</span>
                </div>
                <div className="text-lg font-black italic text-white">+Bs. 30 / 60</div>
                <div className="text-[11px] text-zinc-400 font-medium mt-0.5">Ajuste extra (3ra revisión en adelante)</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="flex items-center justify-between text-zinc-400 mb-1.5">
                  <Clock size={14} />
                  <span className="text-[9px] font-black uppercase tracking-widest">+120 SEG</span>
                </div>
                <div className="text-lg font-black italic text-white">+Bs. 60 / 100</div>
                <div className="text-[11px] text-zinc-400 font-medium mt-0.5">Cada +30 seg extras (Básica / Avanzada)</div>
              </div>
            </div>
          </div>
        </InteractiveCard>
      </section>

      {/* =====================================================================
          7. PROCESO DE TRABAJO EN 3 PASOS (CERO FRICCIÓN PARA EL CLIENTE)
          ===================================================================== */}
      <section className="py-16 px-6 md:px-8 max-w-7xl mx-auto border-b border-zinc-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 block mb-3">
              05 // FLUJO DE TRABAJO RÁPIDO
            </span>
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">
              Cómo trabajamos tu video.
            </h2>
          </div>
          <p className="text-zinc-500 text-xs max-w-sm font-medium leading-relaxed">
            Un proceso directo en 3 pasos para que tengas tu video editado, corregido y listo para publicar o pautar en
            tiempo récord.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {[
            {
              step: 'PASO 01',
              title: 'Envía tus Tomas y Guion',
              desc: 'Nos compartes tus grabaciones por WhatsApp o Google Drive junto con la idea o guion. Si aún no tienes guion, te ayudamos a estructurar el gancho.',
              badge: 'Recepción inmediata'
            },
            {
              step: 'PASO 02',
              title: 'Edición, Motion Graphics e IA',
              desc: 'Realizamos el montaje rítmico, diseño sonoro, trazado 3D de terrenos, integración de tomas/locución con IA y colorización en DaVinci Resolve.',
              badge: 'Postproducción integral'
            },
            {
              step: 'PASO 03',
              title: 'Revisión y Entrega Lista para Publicar',
              desc: 'Recibes el video para validar detalles (incluye 2 revisiones sin costo) y te entregamos el master en máxima calidad para Reels, TikTok o YouTube.',
              badge: 'Master 1080p / 4K'
            }
          ].map((item, idx) => (
            <InteractiveCard key={idx} isDark={true} className="p-8">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">{item.step}</span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-[9px] font-black uppercase tracking-widest text-white">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tight text-white mb-3">{item.title}</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed font-medium">{item.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden mr-4">
                    <motion.div
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'linear', delay: idx * 0.4 }}
                      className="h-full w-1/2 bg-white rounded-full"
                    />
                  </div>
                  <ArrowRight size={14} className="text-zinc-400" />
                </div>
              </div>
            </InteractiveCard>
          ))}
        </div>
      </section>

      {/* =====================================================================
          8. SECCIÓN DE CONTACTO DIRECTO
          ===================================================================== */}
      <section id="contacto" className="py-20 px-6 md:px-8 max-w-5xl mx-auto">
        <InteractiveCard isDark={true} className="p-10 md:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 block mb-4">
                06 // CONTACTO DIRECTO
              </span>
              <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white leading-none mb-6">
                Iniciemos una <br /> producción.
              </h2>
              <p className="text-zinc-400 text-xs leading-relaxed mb-8 font-medium">
                ¿Tienes un proyecto en mente o necesitas optimizar tu flujo de post-producción? Escríbenos por WhatsApp
                o déjanos un mensaje y te responderemos en menos de 24 horas.
              </p>

              <div className="space-y-4">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    'Hola Sync Pro, quiero cotizar la edición de un video.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white text-zinc-950 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all"
                >
                  <MessageCircle size={16} /> WhatsApp Directo: +591 69109766
                </a>
                <div className="flex items-center gap-3 text-xs font-bold text-zinc-300 pt-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                  Disponibilidad inmediata para proyectos freelance
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-zinc-400">
                  <ShieldCheck size={16} className="text-zinc-300" />
                  Entrega puntual garantizada + 2 revisiones incluidas
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="NOMBRE COMPLETO"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors font-bold tracking-wider"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="CORREO ELECTRÓNICO"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors font-bold tracking-wider"
                />
              </div>
              <div>
                <textarea
                  rows="4"
                  placeholder="CUÉNTANOS SOBRE TU PROYECTO..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors font-bold tracking-wider resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-white text-zinc-950 hover:bg-zinc-200 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 shadow-xl"
              >
                Enviar Mensaje <Send size={14} />
              </button>
              {status && (
                <p className="text-[10px] font-black uppercase tracking-widest text-center text-zinc-400 mt-4">
                  {status}
                </p>
              )}
            </form>
          </div>
        </InteractiveCard>
      </section>

      {/* =====================================================================
          9. SECCIÓN DE EXTENSIONES Y PLUGINS (STUDIO SYNC PRO)
          ===================================================================== */}
      <section id="herramientas" className="py-20 px-6 md:px-8 max-w-7xl mx-auto border-t border-zinc-100">
        <div className="mb-14">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 block mb-3">
            Sync Pro Labs
          </span>
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-zinc-900">
            Studio Sync Pro.
          </h2>
          <p className="text-zinc-500 text-xs mt-3 max-w-lg font-medium">
            Herramientas de software diseñadas internamente para romper los límites de velocidad y calidad en Premiere
            Pro, After Effects y DaVinci Resolve.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {tools.map((tool, index) => (
            <InteractiveCard key={index} isDark={true} className="p-10 md:p-12">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      {tool.icon}
                    </div>
                    <span className="px-4 py-1.5 rounded-full bg-white text-zinc-950 text-[9px] font-black uppercase tracking-widest">
                      {tool.badge}
                    </span>
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 block mb-2">
                    {tool.target}
                  </span>
                  <h3 className="text-3xl font-black italic uppercase tracking-tight text-white mb-4">{tool.name}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-8 font-medium">{tool.description}</p>

                  <div className="grid grid-cols-2 gap-3 mb-10">
                    {tool.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] font-bold text-zinc-300">
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
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
                  className="w-full py-4 bg-white/5 hover:bg-white text-white hover:text-zinc-950 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group"
                >
                  Adquirir Licencia <Zap size={14} className="group-hover:fill-current" />
                </a>
              </div>
            </InteractiveCard>
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
              initial={{ scale: 0.9, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 16 }}
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
                  className="max-h-[80vh] max-w-full w-auto rounded-[24px] bg-black border border-white/15 shadow-[0_40px_90px_-20px_rgba(0,0,0,0.95)]"
                />
              ) : (
                <img
                  src={lightboxItem.src}
                  alt={lightboxItem.subtitle || lightboxItem.title}
                  className="max-h-[80vh] max-w-full w-auto rounded-[24px] bg-black border border-white/15 shadow-[0_40px_90px_-20px_rgba(0,0,0,0.95)]"
                />
              )}

              <div className="mt-3 text-center text-white">
                <b className="block text-base font-black italic uppercase tracking-tight">{lightboxItem.title}</b>
                {lightboxItem.subtitle && (
                  <span className="block text-xs text-zinc-400 font-medium mt-0.5">{lightboxItem.subtitle}</span>
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
        className="fixed bottom-6 right-6 z-50 bg-[#0a0a0a] text-white p-4 rounded-full shadow-2xl border border-white/15 hover:scale-105 transition-all flex items-center gap-2.5 group"
      >
        <MessageCircle size={20} className="text-emerald-400" />
        <span className="text-[10px] font-black uppercase tracking-widest pr-1 hidden sm:inline">
          Cotizar por WhatsApp
        </span>
      </a>

      {/* Footer */}
      <footer className="py-16 border-t border-zinc-200 text-center bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm font-black tracking-tighter">SYNC PRO // 2026</div>
          <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.3em]">
            Post-Producción Digital & Desarrollo de Herramientas
          </p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 transition-colors"
            >
              WhatsApp: +591 69109766
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
