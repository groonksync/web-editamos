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
   SHOWCASE DE INGENIERÍA VISUAL (TRAZOS QUIRÚRGICOS DE 1PX + IMAGEN REAL +
   DAVINCI RESOLVE STUDIO & ADOBE AFTER EFFECTS OFICIAL)
   ============================================================================ */

// 1. Showcase Inmobiliario sobre Fotografía Aérea Real con Tracking 3D de 1px
const RealEstateMotionShowcase = () => {
  const lotVertices = [
    [245, 232],
    [492, 208],
    [725, 258],
    [545, 452],
    [465, 455]
  ];

  return (
    <div className="relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-200/80 shadow-[0_20px_50px_-22px_rgba(0,0,0,0.22)] aspect-[16/10] sm:aspect-[16/9] select-none group">
      {/* Imagen real de dron inmobiliario */}
      <img
        src="/inmobiliaria-drone.jpg"
        alt="Trazado inmobiliario 3D con Motion Graphics sobre toma aérea de dron"
        className="absolute inset-0 w-full h-full object-cover block brightness-[0.92] contrast-[1.03] transition-transform duration-1000 group-hover:scale-[1.02]"
      />

      {/* Viñeta técnica sutil para lectura de HUD */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/45 pointer-events-none" />

      {/* Barra HUD Superior con trazos de 1px */}
      <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950/75 backdrop-blur-md border border-white/15 text-[10px] font-medium tracking-wider text-white">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>3D CAMERA TRACKER · LOTES & INMUEBLES</span>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950/75 backdrop-blur-md border border-white/15 text-[10px] font-mono text-zinc-300">
          <span>SOLVE: 0.14 px</span>
          <span className="text-white/30">|</span>
          <span>4K 60FPS</span>
        </div>
      </div>

      {/* Superposición SVG con trazos quirúrgicos (vectorEffect="non-scaling-stroke" = 1px exacto siempre) */}
      <svg viewBox="0 0 1000 562" className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        <defs>
          <linearGradient id="lotFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* Relleno translúcido suave del terreno */}
        <motion.polygon
          points="245,232 492,208 725,258 545,452 465,455"
          fill="url(#lotFillGrad)"
          animate={{ opacity: [0.45, 0.85, 0.45] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Contorno base de 1px exacto */}
        <polygon
          points="245,232 492,208 725,258 545,452 465,455"
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />

        {/* Haz luminoso fino (1.25px) recorriendo el perímetro del terreno */}
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

        {/* Guías internas de medición (1px punteado muy sutil) */}
        <line
          x1="245"
          y1="232"
          x2="545"
          y2="452"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="0.75"
          strokeDasharray="4 4"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="492"
          y1="208"
          x2="465"
          y2="455"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="0.75"
          strokeDasharray="4 4"
          vectorEffect="non-scaling-stroke"
        />

        {/* Marcadores de vértice de precisión (Crosshairs finos de 1px) */}
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
            <line
              x1={cx - 11}
              y1={cy}
              x2={cx + 11}
              y2={cy}
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="0.75"
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1={cx}
              y1={cy - 11}
              x2={cx}
              y2={cy + 11}
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="0.75"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ))}

        {/* Línea de anclaje 3D vertical desde el centro del lote */}
        <line
          x1="478"
          y1="322"
          x2="478"
          y2="162"
          stroke="#ffffff"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx="478" cy="322" r="3.5" fill="#10b981" />
        <circle
          cx="478"
          cy="322"
          r="10"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />

        {/* Línea secundaria hacia avenida derecha */}
        <line
          x1="670"
          y1="335"
          x2="770"
          y2="290"
          stroke="rgba(255,255,255,0.8)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx="670" cy="335" r="2.5" fill="#ffffff" />
      </svg>

      {/* Callout Flotante Principal (Anclado al terreno) */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[34%] sm:left-[38%] top-[14%] sm:top-[16%] z-20 bg-zinc-950/85 backdrop-blur-md text-white border border-white/25 rounded-xl px-3.5 py-2 shadow-2xl pointer-events-none"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-300">LOTE ESQUINERO #14</span>
        </div>
        <div className="text-sm sm:text-base font-bold tracking-tight text-white mt-0.5">680.00 m² · Disponible</div>
        <div className="text-[10px] text-zinc-400 font-normal">Frente: 22.5 m × Fondo: 30.2 m</div>
      </motion.div>

      {/* Callout Secundario (Avenida / Plusvalía) */}
      <div className="hidden sm:block absolute right-[8%] top-[44%] z-20 bg-white/95 backdrop-blur-md text-zinc-900 border border-zinc-200 rounded-lg px-3 py-1.5 shadow-lg pointer-events-none">
        <span className="block text-[8px] font-mono uppercase tracking-widest text-zinc-500">ACCESO PAVIMENTADO</span>
        <span className="block text-[11px] font-bold tracking-tight text-zinc-900">Av. Principal · Zona Norte</span>
      </div>

      {/* Pie informativo de la toma inmobiliaria */}
      <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 flex flex-wrap items-center justify-between gap-2 text-[11px] text-white/90 pointer-events-none">
        <span className="font-medium">
          Trazado 3D real anclado al movimiento del dron · Ideal para inmobiliarias, urbanizaciones y quintas.
        </span>
        <span className="px-2.5 py-0.5 rounded bg-white/15 backdrop-blur-md text-[10px] font-mono">
          TRACKING 3D + CALLOUTS
        </span>
      </div>
    </div>
  );
};

// 2. Línea de Tiempo Real de DaVinci Resolve Studio (Trazos de 1px, limpia y profesional)
const DaVinciResolveStudioTimeline = () => {
  const audioBars = [28, 52, 74, 42, 88, 64, 92, 48, 76, 58, 84, 38, 68, 90, 54, 72, 44, 80, 62, 48, 70, 86, 50, 66];

  return (
    <div className="rounded-2xl bg-[#0c0c0f] border border-zinc-800/90 p-5 text-white shadow-sm select-none">
      {/* Cabecera DaVinci Resolve Studio */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/[0.07]">
        <div className="flex items-center gap-2.5">
          {/* Icono de 3 ruedas de color estilo DaVinci Resolve */}
          <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4">
              <circle cx="12" cy="7.5" r="3.2" fill="none" stroke="#60a5fa" strokeWidth="1.4" />
              <circle cx="8" cy="15" r="3.2" fill="none" stroke="#34d399" strokeWidth="1.4" />
              <circle cx="16" cy="15" r="3.2" fill="none" stroke="#f87171" strokeWidth="1.4" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-tight text-white">DaVinci Resolve Studio</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-[9px] font-mono text-emerald-300">
                LICENCIA OFICIAL
              </span>
            </div>
            <span className="block text-[10px] text-zinc-400">
              Edición de precisión, mezcla Fairlight y colorización ACES 32-bit
            </span>
          </div>
        </div>
        <span className="text-[10px] font-mono text-zinc-400 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-md">
          TC 01:00:04:12
        </span>
      </div>

      {/* Regla de Tiempo Fina (1px) */}
      <div className="relative bg-[#08080a] rounded-xl border border-white/[0.07] p-3.5 overflow-hidden">
        <div className="flex justify-between text-[8px] font-mono text-zinc-500 pb-2 mb-2.5 border-b border-white/[0.06]">
          <span>00:00</span>
          <span>00:03 (HOOK)</span>
          <span>00:08</span>
          <span>00:15</span>
          <span>00:22</span>
          <span>00:30</span>
        </div>

        {/* Pistas de Edición con bordes de 1px */}
        <div className="relative space-y-1.5">
          {/* V3: Textos Flotantes & Señaladores */}
          <div className="flex items-center gap-2.5">
            <span className="text-[9px] font-mono text-zinc-500 w-7">V3</span>
            <div className="flex-1 h-6 rounded bg-white/[0.02] border border-white/[0.05] flex items-center px-1.5 gap-2">
              <div className="h-4 w-[26%] rounded-[4px] bg-sky-500/15 border border-sky-400/35 px-2 flex items-center justify-between text-[8px] font-mono text-sky-200">
                <span>HOOK_3D.comp</span>
                <span className="w-1.5 h-1.5 rotate-45 bg-sky-300" />
              </div>
              <div className="h-4 w-[38%] rounded-[4px] bg-purple-500/15 border border-purple-400/35 px-2 flex items-center justify-between text-[8px] font-mono text-purple-200">
                <span>CALLOUT_LOTE.fusion</span>
                <span className="w-1.5 h-1.5 rotate-45 bg-purple-300" />
              </div>
              <div className="h-4 flex-1 rounded-[4px] bg-emerald-500/15 border border-emerald-400/35 px-2 flex items-center text-[8px] font-mono text-emerald-200">
                <span>CTA_WHATSAPP</span>
              </div>
            </div>
          </div>

          {/* V2: Tomas B-Roll & IA */}
          <div className="flex items-center gap-2.5">
            <span className="text-[9px] font-mono text-zinc-500 w-7">V2</span>
            <div className="flex-1 h-6 rounded bg-white/[0.02] border border-white/[0.05] flex items-center px-1.5 gap-1.5">
              <div className="h-4 w-[18%] rounded-[4px] bg-zinc-800/90 border border-white/15 px-1.5 flex items-center text-[8px] font-mono text-zinc-300">
                DRONE_A01
              </div>
              <div className="h-4 w-[24%] rounded-[4px] bg-amber-500/15 border border-amber-400/35 px-1.5 flex items-center text-[8px] font-mono text-amber-200">
                IA_BROLL_GEN
              </div>
              <div className="h-4 w-[28%] rounded-[4px] bg-zinc-800/90 border border-white/15 px-1.5 flex items-center text-[8px] font-mono text-zinc-300">
                DETALLE_LOTE
              </div>
              <div className="h-4 flex-1 rounded-[4px] bg-zinc-800/90 border border-white/15 px-1.5 flex items-center text-[8px] font-mono text-zinc-300">
                CIERRE_4K
              </div>
            </div>
          </div>

          {/* V1: Cámara Principal Colorizada */}
          <div className="flex items-center gap-2.5">
            <span className="text-[9px] font-mono text-zinc-500 w-7">V1</span>
            <div className="flex-1 h-6 rounded bg-white/[0.02] border border-white/[0.05] flex items-center px-1.5 gap-1">
              {[22, 19, 25, 16, 18].map((w, i) => (
                <div
                  key={i}
                  style={{ width: `${w}%` }}
                  className="h-4 rounded-[4px] bg-zinc-900 border border-zinc-700/80 px-1.5 flex items-center justify-between text-[7px] font-mono text-zinc-400"
                >
                  <span>CAM_{i + 1}</span>
                  <span className="w-1 h-1 rounded-full bg-emerald-400/80" />
                </div>
              ))}
            </div>
          </div>

          {/* A1: Onda de Audio Fairlight de 1px */}
          <div className="flex items-center gap-2.5">
            <span className="text-[9px] font-mono text-emerald-400/80 w-7">A1</span>
            <div className="flex-1 h-7 rounded bg-emerald-950/20 border border-emerald-500/20 flex items-center justify-between px-2 gap-[3px]">
              {audioBars.map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ height: [`${Math.max(18, h * 0.45)}%`, `${h}%`, `${Math.max(18, h * 0.45)}%`] }}
                  transition={{ duration: 1.2 + (i % 5) * 0.15, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-[1.5px] rounded-full bg-emerald-400/75"
                />
              ))}
            </div>
          </div>

          {/* Playhead Quirúrgico de 1px */}
          <motion.div
            animate={{ left: ['11%', '93%', '11%'] }}
            transition={{ duration: 8.5, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-2 bottom-0 w-[1px] bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)] z-20 pointer-events-none"
          >
            <div className="w-2 h-2 -ml-[3.5px] bg-rose-500 rotate-45" />
          </motion.div>
        </div>
      </div>

      {/* Pie Técnico de Nodos de Color */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 text-[10px] text-zinc-400">
        <div className="flex items-center gap-2 font-mono">
          <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-zinc-300">01 RAW LOG</span>
          <span>→</span>
          <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-zinc-300">02 SKIN TONE</span>
          <span>→</span>
          <span className="px-2 py-0.5 rounded bg-white/[0.08] border border-white/20 text-white">03 FILM MASTER</span>
        </div>
        <span className="text-[10px] text-zinc-400">Colorización cinematográfica + Audio -14 LUFS</span>
      </div>
    </div>
  );
};

// 3. Adobe After Effects Oficial (Curvas de Velocidad Bézier & Capas 3D con trazos de 1px)
const AfterEffectsOfficialMotion = () => {
  return (
    <div className="rounded-2xl bg-[#0c0c0f] border border-zinc-800/90 p-5 text-white shadow-sm select-none">
      {/* Cabecera After Effects Oficial */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/[0.07]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#1e1b4b] border border-indigo-400/30 flex items-center justify-center text-[11px] font-bold tracking-tight text-indigo-200">
            Ae
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-tight text-white">Adobe After Effects Oficial</span>
              <span className="px-2 py-0.5 rounded bg-indigo-500/15 border border-indigo-400/30 text-[9px] font-mono text-indigo-300">
                CREATIVE CLOUD OFICIAL
              </span>
            </div>
            <span className="block text-[10px] text-zinc-400">
              Motion Graphics, tracking 3D de terrenos, speed-ramps y composición avanzada
            </span>
          </div>
        </div>
        <span className="text-[10px] font-mono text-zinc-400 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-md">
          60 FPS · 3D COMP
        </span>
      </div>

      {/* Graph Editor (Curva Bézier con trazo de 1px) + Capas 3D */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-[#08080a] rounded-xl border border-white/[0.07] p-3.5">
        {/* Lista de Capas 3D */}
        <div className="sm:col-span-5 flex flex-col justify-between space-y-1.5 border-b sm:border-b-0 sm:border-r border-white/[0.06] pb-3 sm:pb-0 sm:pr-3">
          <div className="text-[8px] font-mono uppercase tracking-widest text-zinc-500 mb-0.5">
            CAPAS DE COMPOSICIÓN 3D
          </div>
          {[
            { id: '01', name: '3D_CAMERA_TRACK', tag: '3D', color: 'text-sky-300 border-sky-400/30 bg-sky-500/10' },
            { id: '02', name: 'TERRENO_TRAZADO', tag: 'SHP', color: 'text-emerald-300 border-emerald-400/30 bg-emerald-500/10' },
            { id: '03', name: 'CALLOUT_PRECIO', tag: 'TXT', color: 'text-purple-300 border-purple-400/30 bg-purple-500/10' },
            { id: '04', name: 'IA_VOICE_SYNC', tag: 'WAV', color: 'text-amber-300 border-amber-400/30 bg-amber-500/10' }
          ].map((layer) => (
            <div
              key={layer.id}
              className="flex items-center justify-between px-2 py-1 rounded bg-white/[0.02] border border-white/[0.05] text-[9px] font-mono"
            >
              <span className="text-zinc-300 truncate">
                <span className="text-zinc-600 mr-1.5">{layer.id}</span>
                {layer.name}
              </span>
              <span className={`px-1.5 py-0.2 rounded border text-[8px] ${layer.color}`}>{layer.tag}</span>
            </div>
          ))}
        </div>

        {/* Editor de Gráficos de Velocidad (Speed Graph Bézier 1px) */}
        <div className="sm:col-span-7 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[8px] font-mono text-zinc-500 mb-1">
            <span>SPEED GRAPH // EASY EASE</span>
            <span className="text-indigo-300">CURVA BÉZIER 1PX</span>
          </div>

          <div className="relative h-24 w-full rounded bg-white/[0.015] border border-white/[0.05] overflow-hidden">
            <svg viewBox="0 0 260 90" className="w-full h-full">
              {/* Líneas horizontales de referencia de 0.75px */}
              <line
                x1="0"
                y1="22"
                x2="260"
                y2="22"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.75"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1="0"
                y1="45"
                x2="260"
                y2="45"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.75"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1="0"
                y1="68"
                x2="260"
                y2="68"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.75"
                vectorEffect="non-scaling-stroke"
              />

              {/* Relleno sutil bajo la curva de velocidad */}
              <path
                d="M 16 74 C 85 74, 105 14, 130 14 C 155 14, 175 74, 244 74 L 244 86 L 16 86 Z"
                fill="rgba(129, 140, 248, 0.10)"
              />

              {/* Curva Bézier de velocidad con trazo fino exacto de 1.25px */}
              <path
                d="M 16 74 C 85 74, 105 14, 130 14 C 155 14, 175 74, 244 74"
                fill="none"
                stroke="#818cf8"
                strokeWidth="1.25"
                vectorEffect="non-scaling-stroke"
              />

              {/* Tiradores Bézier (Handles de 1px) */}
              <line
                x1="16"
                y1="74"
                x2="72"
                y2="74"
                stroke="#fbbf24"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <circle cx="72" cy="74" r="2.5" fill="#fbbf24" />

              <line
                x1="188"
                y1="74"
                x2="244"
                y2="74"
                stroke="#fbbf24"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <circle cx="188" cy="74" r="2.5" fill="#fbbf24" />

              {/* Keyframes (Rombo inicial, pico central, rombo final) */}
              <rect x="13" y="71" width="6" height="6" fill="#fbbf24" transform="rotate(45 16 74)" />
              <rect x="127" y="11" width="6" height="6" fill="#ffffff" transform="rotate(45 130 14)" />
              <rect x="241" y="71" width="6" height="6" fill="#fbbf24" transform="rotate(45 244 74)" />
            </svg>

            {/* Línea de escaneo en el editor de curvas */}
            <motion.div
              animate={{ left: ['6%', '94%', '6%'] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 bottom-0 w-[1px] bg-indigo-400/80 pointer-events-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 text-[10px] text-zinc-400">
        <span>Animaciones fluidas a 60fps · Señaladores flotantes y textos 3D</span>
        <span className="font-mono text-zinc-300">DYNAMIC LINK + IA</span>
      </div>
    </div>
  );
};

/* ============================================================================
   APLICACIÓN PRINCIPAL SYNC PRO
   ============================================================================ */
const App = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [selectedDurationIndex, setSelectedDurationIndex] = useState(1); // 31 a 60 seg por defecto (Más pedido)
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
      name: 'WorkFlow Sync',
      target: 'Adobe After Effects & Premiere Pro Oficial',
      description:
        'Automatiza tareas repetitivas, organiza bins inteligentes y sincroniza composiciones pesadas con precisión de cuadro.',
      badge: 'Best Seller',
      icon: <Layers className="text-zinc-900" size={20} />,
      specs: ['Auto-Render Queue', 'Smart Bin Organizer', 'Dynamic Link Boost', 'Frame-Accurate Sync']
    },
    {
      name: 'ColorMaster Node',
      target: 'DaVinci Resolve Studio',
      description:
        'Árboles de nodos pre-configurados con gestión de color ACES, aislamiento de tonos de piel y emulación cinematográfica.',
      badge: 'Nuevo',
      icon: <Cpu className="text-zinc-900" size={20} />,
      specs: ['One-Click ACES Pipeline', 'Skin Tone Isolation', 'Halation & Bloom Realista', 'LUTs de Cine Incluidos']
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
            Tecnología
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
              Edición · Motion Graphics 3D · IA
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

        {/* Carrusel infinito de tus 5 videos que se mueve solo y se pausa + agranda al acercar el cursor */}
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
          3. APARTADO DE FOTOS: FOTOGRAFÍA QUE VENDE
          ===================================================================== */}
      <section id="fotografia" className="py-16 md:py-20 px-6 md:px-8 max-w-7xl mx-auto border-b border-zinc-200/60">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-400 block mb-1.5">
              Producción Visual & Comercial
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-zinc-900 leading-none">
              Fotografía que vende
            </h2>
          </div>
          <p className="text-zinc-500 text-xs md:text-sm max-w-sm font-normal leading-relaxed">
            Producto, gastronomía, inmobiliaria y marca. Toca una foto para verla en grande.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 grid-flow-dense">
          {COMMERCIAL_PHOTOS.map((shot) => (
            <figure
              key={shot.id}
              onClick={() => setLightboxItem(shot)}
              className={`group relative m-0 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-200/80 shadow-sm cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl hover:z-10 ${
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
              <figcaption className="absolute left-0 right-0 bottom-0 p-3.5 md:p-4 text-white pointer-events-none">
                <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-300 mb-0.5">
                  {shot.title}
                </span>
                <b className="block text-xs md:text-sm font-bold tracking-tight leading-snug">{shot.subtitle}</b>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-9 flex justify-center">
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
          5. POR QUÉ TUS VIDEOS GENERAN CLIENTES (DISEÑO LIMPIO DE 1PX +
             IMAGEN INMOBILIARIA CON MOTION GRAPHICS + DAVINCI RESOLVE STUDIO
             & ADOBE AFTER EFFECTS OFICIAL)
          ===================================================================== */}
      <section
        id="ingenieria-visual"
        className="py-20 px-6 md:px-8 max-w-7xl mx-auto border-b border-zinc-200/70"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-400 block mb-2">
              Ingeniería Visual & Flujo Oficial
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-zinc-900 leading-tight">
              Por qué tus videos generan clientes
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-[11px] font-semibold text-zinc-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              DaVinci Resolve Studio
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-[11px] font-semibold text-zinc-800">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Adobe After Effects Oficial
            </span>
          </div>
        </div>

        {/* Bloque Principal: Imagen Inmobiliaria Real con Trazado Motion Graphics 1px + Software Oficial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Columna Izquierda (7 cols): Trazado Inmobiliario sobre toma aérea real */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl bg-white border border-zinc-200/90 p-5 md:p-6 shadow-[0_12px_36px_-18px_rgba(0,0,0,0.08)]">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-600 block">
                    ESPECIALIDAD INMOBILIARIA & COMERCIAL
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 mt-0.5">
                    Motion Graphics 3D y Delimitación Exacta de Terrenos
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-[10px] font-mono text-zinc-600">
                  TRACKING 3D REAL
                </span>
              </div>

              {/* Imagen de dron con Motion Graphics 1px superpuestos */}
              <RealEstateMotionShowcase />
            </div>

            <div className="mt-5 pt-4 border-t border-zinc-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <b className="block text-zinc-900 font-semibold">Trazado de Lotes 3D</b>
                <span className="text-zinc-500 text-[11px] leading-snug block mt-0.5">
                  Líneas finas ancladas al terreno real para mostrar metrajes y colindancias.
                </span>
              </div>
              <div>
                <b className="block text-zinc-900 font-semibold">Señaladores Flotantes</b>
                <span className="text-zinc-500 text-[11px] leading-snug block mt-0.5">
                  Callouts de ubicación, avenidas, precios y plusvalía integrados al vuelo.
                </span>
              </div>
              <div>
                <b className="block text-zinc-900 font-semibold">Retención en 3 Segundos</b>
                <span className="text-zinc-500 text-[11px] leading-snug block mt-0.5">
                  Ganchos visuales e Inteligencia Artificial que detienen el scroll de inmediato.
                </span>
              </div>
            </div>
          </div>

          {/* Columna Derecha (5 cols): Línea de tiempo DaVinci Resolve Studio + After Effects Oficial */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <DaVinciResolveStudioTimeline />
            <AfterEffectsOfficialMotion />
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. PLANES DE EDICIÓN DE VIDEO POR DURACIÓN (DISEÑO ULTRA LIMPIO,
             MODERNO Y PROFESIONAL DE 1PX)
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
            Elige la duración de tu video y compara al instante qué incluye cada nivel de producción.
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

        {/* Tarjetas Comparativas: Edición Básica (Blanca Editorial) vs Edición Avanzada (Obsidiana Studio) */}
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
                    Producción comercial con After Effects Oficial, trazado de terrenos 3D e Inteligencia Artificial.
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
                  'Edición dinámica con speed-ramps, efectos visuales y diseño sonoro en DaVinci Resolve Studio',
                  'Motion Graphics en Adobe After Effects Oficial: señaladores y textos flotantes 3D',
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

        {/* Barra de Adicionales y Extras con diseño limpio de 1px */}
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
          7. PROCESO EN 3 PASOS (LIMPIO Y EDITORIAL)
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
              title: 'Edición, Motion 3D e IA',
              desc: 'Montaje en DaVinci Resolve Studio, trazado 3D y gráficos en Adobe After Effects Oficial, más locución o tomas con IA.',
              badge: 'Postproducción'
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
          8. CONTACTO DIRECTO (DISEÑO LIMPIO Y PROFESIONAL)
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
                  <span>DaVinci Resolve Studio & Adobe After Effects Oficial</span>
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
          9. STUDIO SYNC PRO (HERRAMIENTAS Y PLUGINS CON TRAZOS LIMPIOS 1PX)
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
            Herramientas y estructuras desarrolladas internamente para acelerar el flujo en DaVinci Resolve Studio y
            After Effects.
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
            Post-Producción Digital · DaVinci Resolve Studio · Adobe After Effects Oficial
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
