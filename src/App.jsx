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
   LOGO OFICIAL VECTORIAL TRIDIMENSIONAL DE DAVINCI RESOLVE STUDIO
   ============================================================================ */
const DaVinciStudioLogo = ({ className = "w-20 h-20" }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="dv-red-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff4d6d" />
        <stop offset="100%" stopColor="#e11d48" />
      </linearGradient>
      <linearGradient id="dv-yellow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fde047" />
        <stop offset="100%" stopColor="#eab308" />
      </linearGradient>
      <linearGradient id="dv-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
      <filter id="dv-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <radialGradient id="dv-center-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#09090b" stopOpacity="0.95" />
      </radialGradient>
    </defs>

    {/* Sombra base suave */}
    <circle cx="60" cy="63" r="48" fill="rgba(0,0,0,0.08)" filter="url(#dv-glow)" />

    {/* Pétalo Superior/Derecho (Rojo / Magenta) */}
    <path
      d="M60 60 L60 14 C78 14 96 26 104 43 C108 52 107 63 99 71 L60 60 Z"
      fill="url(#dv-red-grad)"
      className="drop-shadow-md"
    />

    {/* Pétalo Inferior/Derecho (Amarillo / Ámbar) */}
    <path
      d="M60 60 L99 71 C92 86 78 98 62 103 C48 107 35 104 25 96 L60 60 Z"
      fill="url(#dv-yellow-grad)"
      className="drop-shadow-md"
    />

    {/* Pétalo Izquierdo/Superior (Azul / Cian) */}
    <path
      d="M60 60 L25 96 C14 84 12 65 17 49 C23 32 39 18 60 14 L60 60 Z"
      fill="url(#dv-blue-grad)"
      className="drop-shadow-md"
    />

    {/* Centro de apertura óptica con aro de cromo */}
    <circle cx="60" cy="60" r="15" fill="#18181b" stroke="#ffffff" strokeWidth="2.5" />
    <circle cx="60" cy="60" r="8.5" fill="url(#dv-center-glow)" />
    <circle cx="58" cy="58" r="2.5" fill="#ffffff" opacity="0.9" />
  </svg>
);

/* ============================================================================
   PROPUESTA 1: DAVINCI KINETIC HUB EN FONDO BLANCO (INGESTA ARCHIVOS PESADOS)
   ============================================================================ */
const DaVinciKineticHubProposal = () => {
  return (
    <div className="bg-white border border-zinc-200/90 rounded-3xl p-5 sm:p-8 md:p-10 shadow-sm relative overflow-hidden">
      {/* Encabezado Conciso y Profesional */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-6 md:mb-8 pb-5 border-b border-zinc-100">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-900 border border-zinc-200/80 text-[10px] font-bold tracking-widest uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            Propuesta 01 · Lienzo de Ingesta Pesada
          </span>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-zinc-900">
            Soporte nativo de archivos pesados sin compresión
          </h3>
        </div>
        <p className="text-zinc-500 text-xs md:text-sm max-w-md font-normal leading-relaxed">
          Procesamos directamente material en bruto <strong className="text-zinc-800">Blackmagic RAW 6K</strong> y{' '}
          <strong className="text-zinc-800">Apple ProRes 422 HQ</strong> a 10 bits. Sin pérdida de calidad ni degradación de color.
        </p>
      </div>

      {/* Lienzo Central con Logo DaVinci y Archivos que Emergen */}
      <div className="relative min-h-[460px] sm:min-h-[520px] rounded-2xl bg-zinc-50/70 border border-zinc-200/80 p-4 sm:p-6 overflow-hidden flex flex-col items-center justify-center isolate">
        {/* Retícula matemática técnica de fondo */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            backgroundImage: 'radial-gradient(#d4d4d8 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ondas concéntricas de pulso desde el logo central */}
        <motion.div
          animate={{ scale: [1, 1.45, 1], opacity: [0.35, 0.05, 0.35] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-64 h-64 rounded-full border border-rose-500/25 pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.6, 1], opacity: [0.25, 0, 0.25] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute w-80 h-80 rounded-full border border-sky-500/20 pointer-events-none"
        />

        {/* Núcleo Central: Logo DaVinci Resolve Studio */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 flex flex-col items-center cursor-default group"
        >
          <div className="relative p-3.5 rounded-3xl bg-white shadow-xl shadow-zinc-300/50 border border-zinc-200/90 group-hover:scale-105 transition-transform duration-300">
            <DaVinciStudioLogo className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 drop-shadow-lg" />
          </div>
          <span className="mt-3 px-3 py-1 rounded-full bg-zinc-950 text-white text-[9.5px] sm:text-[10px] font-mono font-bold tracking-wider shadow-md">
            DAVINCI RESOLVE STUDIO
          </span>
          <span className="text-[9px] text-zinc-400 font-mono mt-1">MOTOR DE PROCESAMIENTO 32-BIT</span>
        </motion.div>

        {/* LÍNEAS VECTORIALES CONECTORAS (Desktop / Tablet) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none hidden sm:block z-0 opacity-40">
          <line x1="50%" y1="50%" x2="22%" y2="22%" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="50%" y1="50%" x2="78%" y2="22%" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="50%" y1="50%" x2="80%" y2="52%" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="50%" y1="50%" x2="78%" y2="82%" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="50%" y1="50%" x2="22%" y2="82%" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="50%" y1="50%" x2="18%" y2="52%" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>

        {/* ELEMENTOS Y ARCHIVOS FLOTANTES EN ORBITA (Desktop / Tablet: Absolutos) */}
        <div className="hidden sm:block absolute inset-0 pointer-events-none z-10">
          {/* 1. Badge Blackmagic RAW 6K */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-6 left-6 pointer-events-auto bg-white/95 backdrop-blur-md border border-zinc-200/90 rounded-2xl p-3 shadow-lg shadow-zinc-200/50 max-w-[210px] hover:scale-105 transition-transform"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-mono text-[9px] font-bold">
                RAW
              </span>
              <div>
                <div className="text-[11px] font-bold text-zinc-900 leading-tight">Blackmagic RAW</div>
                <div className="text-[9px] font-mono text-zinc-400">6144 × 3456 · 6K</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[8.5px] font-mono text-zinc-500">
              <span className="px-1.5 py-0.5 rounded bg-zinc-100">12-Bit</span>
              <span className="px-1.5 py-0.5 rounded bg-zinc-100">3.8 GB/min</span>
              <span className="text-emerald-600 font-bold">Sin Pérdida</span>
            </div>
          </motion.div>

          {/* 2. Badge Apple ProRes 422 HQ */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            className="absolute top-6 right-6 pointer-events-auto bg-white/95 backdrop-blur-md border border-zinc-200/90 rounded-2xl p-3 shadow-lg shadow-zinc-200/50 max-w-[210px] hover:scale-105 transition-transform"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-mono text-[9px] font-bold">
                PRO
              </span>
              <div>
                <div className="text-[11px] font-bold text-zinc-900 leading-tight">Apple ProRes 422 HQ</div>
                <div className="text-[9px] font-mono text-zinc-400">Broadcast Master 4K</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[8.5px] font-mono text-zinc-500">
              <span className="px-1.5 py-0.5 rounded bg-zinc-100">10-Bit 4:2:2</span>
              <span className="px-1.5 py-0.5 rounded bg-zinc-100">1.2 Gbps</span>
              <span className="text-amber-600 font-bold">Sin Ruido</span>
            </div>
          </motion.div>

          {/* 3. Tarjeta Nodos de Fusion Studio */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            className="absolute top-1/2 -translate-y-1/2 right-4 pointer-events-auto bg-white/95 backdrop-blur-md border border-zinc-200/90 rounded-2xl p-3 shadow-lg shadow-zinc-200/50 max-w-[220px] hover:scale-105 transition-transform"
          >
            <div className="text-[9px] font-mono uppercase tracking-wider text-sky-600 font-bold mb-1">
              FUSION · COMPOSICIÓN NODAL
            </div>
            <div className="flex items-center gap-1 text-[8px] font-mono bg-zinc-100/90 p-1.5 rounded-lg mb-1.5">
              <span className="px-1.5 py-0.5 bg-white rounded shadow-2xs text-zinc-800">MediaIn</span>
              <span className="text-zinc-400">→</span>
              <span className="px-1.5 py-0.5 bg-sky-100 text-sky-800 rounded font-bold">Grade</span>
              <span className="text-zinc-400">→</span>
              <span className="px-1.5 py-0.5 bg-white rounded shadow-2xs text-zinc-800">Out</span>
            </div>
            <div className="text-[9.5px] text-zinc-500">Tracking 3D y máscaras vectoriales</div>
          </motion.div>

          {/* 4. Rueda Cromática DaVinci Color Science */}
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
            className="absolute bottom-6 right-6 pointer-events-auto bg-white/95 backdrop-blur-md border border-zinc-200/90 rounded-2xl p-3 shadow-lg shadow-zinc-200/50 max-w-[210px] hover:scale-105 transition-transform"
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full border border-zinc-300 shadow-inner shrink-0"
                style={{
                  background:
                    'conic-gradient(from 0deg, #ff0055, #ffaa00, #55ff00, #00ffff, #0066ff, #aa00ff, #ff0055)'
                }}
              />
              <div>
                <div className="text-[11px] font-bold text-zinc-900 leading-tight">Ciencia del Color YRGB</div>
                <div className="text-[8.5px] font-mono text-zinc-400">32-Bit Float · Rec.709</div>
              </div>
            </div>
            <div className="mt-1.5 text-[9px] text-zinc-500">Pieles naturales y rango dinámico cinematográfico</div>
          </motion.div>

          {/* 5. Tarjeta Fairlight Audio Master */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            className="absolute bottom-6 left-6 pointer-events-auto bg-white/95 backdrop-blur-md border border-zinc-200/90 rounded-2xl p-3 shadow-lg shadow-zinc-200/50 max-w-[210px] hover:scale-105 transition-transform"
          >
            <div className="text-[9px] font-mono uppercase tracking-wider text-emerald-600 font-bold mb-1">
              FAIRLIGHT · 96kHz / 24-BIT
            </div>
            <div className="flex items-end gap-1 h-5 mb-1.5 px-1">
              {[40, 80, 55, 95, 70, 45, 90, 60, 85, 30, 75, 100, 65, 80].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-emerald-500 rounded-full"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="text-[9px] font-mono text-zinc-500 flex justify-between">
              <span>Loudness: -14 LUFS</span>
              <span className="text-emerald-600 font-bold">Broadcast</span>
            </div>
          </motion.div>

          {/* 6. Curva Spline y Text+ */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-1/2 -translate-y-1/2 left-4 pointer-events-auto bg-white/95 backdrop-blur-md border border-zinc-200/90 rounded-2xl p-3 shadow-lg shadow-zinc-200/50 max-w-[210px] hover:scale-105 transition-transform"
          >
            <div className="text-[9px] font-mono uppercase tracking-wider text-rose-600 font-bold mb-1">
              SPLINE · MOTION GRAPHICS
            </div>
            <svg viewBox="0 0 100 24" className="w-full h-5 mb-1 stroke-rose-500 fill-none">
              <path d="M 0 20 C 35 20, 45 4, 100 4" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div className="text-[9.5px] text-zinc-500">Inercia física fluida a 60 fps</div>
          </motion.div>
        </div>

        {/* VERSIÓN MÓVIL (Cuadrícula limpia debajo del logo para evitar desborde en 375px) */}
        <div className="sm:hidden grid grid-cols-2 gap-2 mt-6 w-full z-10">
          <div className="bg-white/95 border border-zinc-200 rounded-xl p-2.5 shadow-xs">
            <span className="text-[8px] font-mono text-rose-600 font-bold block">6K RAW</span>
            <div className="text-[10px] font-bold text-zinc-900 leading-tight">Blackmagic RAW</div>
            <div className="text-[8px] font-mono text-zinc-400">12-Bit sin compresión</div>
          </div>
          <div className="bg-white/95 border border-zinc-200 rounded-xl p-2.5 shadow-xs">
            <span className="text-[8px] font-mono text-amber-600 font-bold block">10-BIT</span>
            <div className="text-[10px] font-bold text-zinc-900 leading-tight">ProRes 422 HQ</div>
            <div className="text-[8px] font-mono text-zinc-400">Broadcast Master</div>
          </div>
          <div className="bg-white/95 border border-zinc-200 rounded-xl p-2.5 shadow-xs">
            <span className="text-[8px] font-mono text-sky-600 font-bold block">NODOS 3D</span>
            <div className="text-[10px] font-bold text-zinc-900 leading-tight">Fusion Studio</div>
            <div className="text-[8px] font-mono text-zinc-400">Tracking y VFX</div>
          </div>
          <div className="bg-white/95 border border-zinc-200 rounded-xl p-2.5 shadow-xs">
            <span className="text-[8px] font-mono text-emerald-600 font-bold block">AUDIO 96kHz</span>
            <div className="text-[10px] font-bold text-zinc-900 leading-tight">Fairlight Master</div>
            <div className="text-[8px] font-mono text-zinc-400">-14 LUFS normalizado</div>
          </div>
        </div>
      </div>

      {/* Pie de Módulo Informativo */}
      <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] text-zinc-500 font-mono">
        <span className="inline-flex items-center gap-1.5 text-zinc-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          Aceleración por GPU Metal / CUDA nativa
        </span>
        <span className="text-zinc-400">Blackmagic RAW SDK Oficial · Sin proxies destructivos</span>
      </div>
    </div>
  );
};

/* ============================================================================
   PROPUESTA 2: LÍNEA DE TIEMPO FLOTANTE & PIPELINE DE MONTAJE RÍTMICO
   ============================================================================ */
const DaVinciFloatingTimelineProposal = () => {
  return (
    <div className="bg-white border border-zinc-200/90 rounded-3xl p-5 sm:p-8 md:p-10 shadow-sm relative overflow-hidden">
      {/* Encabezado Conciso */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-6 md:mb-8 pb-5 border-b border-zinc-100">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-900 border border-zinc-200/80 text-[10px] font-bold tracking-widest uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            Propuesta 02 · Pipeline y Línea de Tiempo Flotante
          </span>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-zinc-900">
            Línea de tiempo flotante con sincronización quirúrgica
          </h3>
        </div>
        <p className="text-zinc-500 text-xs md:text-sm max-w-md font-normal leading-relaxed">
          Cada corte se sincroniza al milisegundo con la pista musical y el diseño sonoro. Eliminamos pausas muertas y
          garantizamos dinamismo visual ininterrumpido.
        </p>
      </div>

      {/* Chips Flotantes que Ingresan a la Línea de Tiempo */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-[10px] font-mono text-zinc-700 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          LUT Film Rec.709 .cube
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-[10px] font-mono text-zinc-700 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
          Subtítulos Dinámicos 60fps
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-[10px] font-mono text-zinc-700 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Cortes al Beat (0.35s)
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-[10px] font-mono text-zinc-700 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          Zoom Inercial 1.15x
        </span>
      </div>

      {/* Ventana de Línea de Tiempo Flotante Estilizada DaVinci Resolve */}
      <div className="rounded-2xl bg-[#111115] border border-zinc-800 text-white shadow-2xl overflow-hidden select-none">
        {/* Barra superior nativa DaVinci Studio */}
        <div className="bg-[#18181f] px-4 py-2.5 border-b border-white/[0.08] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <span className="text-white/20 text-xs mx-1">|</span>
            <div className="flex items-center gap-2">
              <DaVinciStudioLogo className="w-4 h-4" />
              <span className="text-[11px] font-semibold text-zinc-200 font-mono">
                DaVinci Resolve Studio 19 — SYNC_PRO_MASTER_4K
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono">
            <span className="hidden sm:inline-block text-[9px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              SNAPPING: ACTIVO
            </span>
            <span className="text-[11px] font-bold text-red-500 bg-black/60 px-2.5 py-0.5 rounded border border-white/10">
              01:00:14:18
            </span>
          </div>
        </div>

        {/* Pistas Multi-Nivel con Cabezal de Reproducción Animado */}
        <div className="p-3 sm:p-4 overflow-x-auto no-scrollbar">
          <div className="min-w-[620px] relative">
            {/* Cabezal de Reproducción Rojo Móvil */}
            <motion.div
              animate={{ left: ['4%', '96%', '4%'] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute top-0 bottom-0 w-[1.5px] bg-red-500 z-30 pointer-events-none shadow-[0_0_10px_#ef4444]"
            >
              <div className="w-2.5 h-2.5 bg-red-500 -ml-[4.5px] rotate-45" />
            </motion.div>

            {/* Pista V3 (Motion Graphics / Text+) */}
            <div className="flex items-center gap-2 mb-1.5 text-[9px] font-mono">
              <span className="w-12 px-1.5 py-1 rounded bg-zinc-800 text-zinc-300 text-center font-bold">V3</span>
              <div className="flex-1 grid grid-cols-12 gap-1 h-7">
                <div className="col-span-3 bg-sky-950/70 border border-sky-500/60 rounded px-2 flex items-center justify-between text-sky-200">
                  <span className="truncate">HOOK_TITLE.text+</span>
                  <span className="text-[7.5px] text-sky-400">60fps</span>
                </div>
                <div className="col-span-2 col-start-5 bg-sky-950/70 border border-sky-500/60 rounded px-2 flex items-center justify-between text-sky-200">
                  <span className="truncate">SUB_POP</span>
                </div>
                <div className="col-span-4 col-start-8 bg-sky-950/70 border border-sky-500/60 rounded px-2 flex items-center justify-between text-sky-200">
                  <span className="truncate">CALLOUT_3D.fusion</span>
                </div>
              </div>
            </div>

            {/* Pista V2 (B-Roll 4K Inserts) */}
            <div className="flex items-center gap-2 mb-1.5 text-[9px] font-mono">
              <span className="w-12 px-1.5 py-1 rounded bg-zinc-800 text-zinc-300 text-center font-bold">V2</span>
              <div className="flex-1 grid grid-cols-12 gap-1 h-7">
                <div className="col-span-4 col-start-3 bg-purple-950/70 border border-purple-500/60 rounded px-2 flex items-center text-purple-200 truncate">
                  DETALLE_PRODUCTO_4K.braw
                </div>
                <div className="col-span-3 col-start-9 bg-purple-950/70 border border-purple-500/60 rounded px-2 flex items-center text-purple-200 truncate">
                  DRONE_AERIAL.mov
                </div>
              </div>
            </div>

            {/* Pista V1 (A-Roll Principal Orador) */}
            <div className="flex items-center gap-2 mb-2 text-[9px] font-mono">
              <span className="w-12 px-1.5 py-1 rounded bg-zinc-800 text-zinc-300 text-center font-bold">V1</span>
              <div className="flex-1 grid grid-cols-12 gap-1 h-8">
                <div className="col-span-4 bg-teal-950/80 border border-teal-500/70 rounded px-2 flex items-center justify-between text-teal-200 font-bold">
                  <span>GANCHO_01 [0-3s]</span>
                  <span className="text-[7.5px] px-1 rounded bg-teal-500/20 text-teal-300">RAW</span>
                </div>
                <div className="col-span-5 bg-teal-950/80 border border-teal-500/70 rounded px-2 flex items-center justify-between text-teal-200 font-bold">
                  <span>ARGUMENTO_02</span>
                  <span className="text-[7.5px] px-1 rounded bg-teal-500/20 text-teal-300">4K</span>
                </div>
                <div className="col-span-3 bg-teal-950/80 border border-teal-500/70 rounded px-2 flex items-center justify-between text-teal-200 font-bold">
                  <span>CTA_FINAL</span>
                  <span className="text-[7.5px] px-1 rounded bg-teal-500/20 text-teal-300">VENTA</span>
                </div>
              </div>
            </div>

            {/* Separador de Audio Fairlight */}
            <div className="border-t border-white/[0.08] my-2" />

            {/* Pista A1 (Voz Master Broadcast) */}
            <div className="flex items-center gap-2 mb-1.5 text-[9px] font-mono">
              <span className="w-12 px-1.5 py-1 rounded bg-zinc-800 text-emerald-400 text-center font-bold">A1</span>
              <div className="flex-1 bg-emerald-950/40 border border-emerald-500/40 rounded h-6 px-2 flex items-center justify-between text-emerald-300">
                <span className="truncate">VOZ_ORADOR_BROADCAST_EQ</span>
                <span className="text-[8px] font-bold">-14 LUFS</span>
              </div>
            </div>

            {/* Pista A2 (SFX / Risers e Impactos) */}
            <div className="flex items-center gap-2 mb-1.5 text-[9px] font-mono">
              <span className="w-12 px-1.5 py-1 rounded bg-zinc-800 text-amber-400 text-center font-bold">A2</span>
              <div className="flex-1 grid grid-cols-12 gap-1 h-6">
                <div className="col-span-2 col-start-1 bg-amber-950/50 border border-amber-500/40 rounded px-1.5 flex items-center text-amber-300 text-[8px]">
                  WHOOSH
                </div>
                <div className="col-span-2 col-start-4 bg-amber-950/50 border border-amber-500/40 rounded px-1.5 flex items-center text-amber-300 text-[8px]">
                  RISER_SUB
                </div>
                <div className="col-span-2 col-start-8 bg-amber-950/50 border border-amber-500/40 rounded px-1.5 flex items-center text-amber-300 text-[8px]">
                  IMPACT_BASS
                </div>
              </div>
            </div>

            {/* Pista A3 (Música y Cortes Rítmicos) */}
            <div className="flex items-center gap-2 text-[9px] font-mono">
              <span className="w-12 px-1.5 py-1 rounded bg-zinc-800 text-purple-400 text-center font-bold">A3</span>
              <div className="flex-1 bg-purple-950/40 border border-purple-500/40 rounded h-6 px-2 flex items-center justify-between text-purple-300">
                <span className="truncate">BEAT_TRACK_DYNAMIC_FLOW (Cortes al compás)</span>
                <span className="text-[8px]">128 BPM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Barra inferior de transporte */}
        <div className="bg-[#141418] px-4 py-2 border-t border-white/[0.06] flex items-center justify-between text-[9px] font-mono text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="text-zinc-200">FPS: 59.94</span>
            <span>FORMATO: 4K DCI</span>
            <span className="text-emerald-400">CERO SILENCIOS MUERTOS</span>
          </div>
          <span className="hidden sm:inline text-zinc-500">Montaje en Edit Page Oficial</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   PROPUESTA 3: BENTO GRID MODULAR DAVINCI STUDIO (4 FASES INTEGRADAS)
   ============================================================================ */
const DaVinciBentoWorkflowProposal = () => {
  return (
    <div className="bg-white border border-zinc-200/90 rounded-3xl p-5 sm:p-8 md:p-10 shadow-sm relative overflow-hidden">
      {/* Encabezado Conciso */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-6 md:mb-8 pb-5 border-b border-zinc-100">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-900 border border-zinc-200/80 text-[10px] font-bold tracking-widest uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Propuesta 03 · Bento Grid Modular (4 Fases)
          </span>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-zinc-900">
            Ecosistema de postproducción modular en 4 fases
          </h3>
        </div>
        <p className="text-zinc-500 text-xs md:text-sm max-w-md font-normal leading-relaxed">
          Una cadena técnica integral en DaVinci Resolve Studio: ingesta nodal, corrección de color de cine, cinemática de
          curvas fluidas y arquitectura comercial de retención.
        </p>
      </div>

      {/* Grid Bento de 4 Tarjetas Independientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Tarjeta 1: Ingesta Nodal en Fusion Studio */}
        <div className="rounded-2xl bg-zinc-50/80 border border-zinc-200/80 p-5 flex flex-col justify-between hover:border-zinc-300 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9.5px] font-mono font-bold tracking-wider text-sky-600 uppercase">
                FASE 01 · COMPOSICIÓN NODAL
              </span>
              <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 text-[8.5px] font-mono font-bold">
                FUSION 3D
              </span>
            </div>
            <h4 className="text-base font-bold text-zinc-900 mb-1">Árbol de Nodos y Tracking Tridimensional</h4>
            <p className="text-xs text-zinc-500 leading-relaxed mb-4">
              Gráficos, subtítulos y tracking de cámara anclados al espacio 3D real de la escena sin capas destructivas.
            </p>
          </div>

          <div className="bg-white border border-zinc-200 rounded-xl p-3.5 shadow-2xs">
            <div className="flex items-center justify-between gap-1 text-[9px] font-mono">
              <div className="p-2 rounded-lg bg-zinc-100 border border-zinc-200 text-center">
                <span className="block font-bold text-zinc-800">MediaIn1</span>
                <span className="text-[7.5px] text-zinc-400">6K RAW</span>
              </div>
              <span className="text-zinc-400 font-bold">→</span>
              <div className="p-2 rounded-lg bg-sky-50 border border-sky-200 text-center">
                <span className="block font-bold text-sky-800">Tracker3D</span>
                <span className="text-[7.5px] text-sky-500">Puntos Clave</span>
              </div>
              <span className="text-zinc-400 font-bold">→</span>
              <div className="p-2 rounded-lg bg-purple-50 border border-purple-200 text-center">
                <span className="block font-bold text-purple-800">Text+</span>
                <span className="text-[7.5px] text-purple-500">60 FPS</span>
              </div>
              <span className="text-zinc-400 font-bold">→</span>
              <div className="p-2 rounded-lg bg-zinc-950 text-white text-center">
                <span className="block font-bold">MediaOut</span>
                <span className="text-[7.5px] text-emerald-400">4K DCI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjeta 2: Color Grading de Cine (Split-Slider) */}
        <div className="rounded-2xl bg-zinc-50/80 border border-zinc-200/80 p-5 flex flex-col justify-between hover:border-zinc-300 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9.5px] font-mono font-bold tracking-wider text-amber-600 uppercase">
                FASE 02 · COLORIMETRÍA DE CINE
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[8.5px] font-mono font-bold">
                10-BIT YRGB
              </span>
            </div>
            <h4 className="text-base font-bold text-zinc-900 mb-1">Graduación Log Flat vs Rec.709 Film LUT</h4>
            <p className="text-xs text-zinc-500 leading-relaxed mb-4">
              Calibración tonal de pieles y contraste cinemático para que tu video resalte sobre pantallas OLED y smartphones.
            </p>
          </div>

          <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-zinc-200 bg-black isolate">
            <img
              src="/inmobiliaria-drone.jpg"
              alt="Graduación de color terminada"
              className="absolute inset-0 w-full h-full object-cover saturate-[1.3] contrast-[1.1]"
            />
            <motion.div
              animate={{ clipPath: ['inset(0 80% 0 0)', 'inset(0 20% 0 0)', 'inset(0 80% 0 0)'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 z-10"
            >
              <img
                src="/inmobiliaria-drone.jpg"
                alt="Perfil Log Flat desaturado"
                className="w-full h-full object-cover saturate-[0.2] contrast-[0.75] brightness-[1.08]"
              />
            </motion.div>
            <motion.div
              animate={{ left: ['20%', '80%', '20%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 bottom-0 w-[1.5px] bg-white z-20 pointer-events-none shadow-md"
            >
              <div className="absolute top-1/2 -translate-y-1/2 -left-2.5 w-5 h-5 rounded-full bg-zinc-950 border border-white/60 flex items-center justify-center text-[7px] text-white font-mono">
                ↔
              </div>
            </motion.div>
            <span className="absolute left-2 top-2 z-20 px-2 py-0.5 rounded bg-black/75 text-zinc-300 font-mono text-[8px]">
              LOG RAW
            </span>
            <span className="absolute right-2 top-2 z-20 px-2 py-0.5 rounded bg-amber-500 text-zinc-950 font-mono font-bold text-[8px]">
              LUT REC.709
            </span>
          </div>
        </div>

        {/* Tarjeta 3: Editor de Curvas Spline a 60fps */}
        <div className="rounded-2xl bg-zinc-50/80 border border-zinc-200/80 p-5 flex flex-col justify-between hover:border-zinc-300 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9.5px] font-mono font-bold tracking-wider text-rose-600 uppercase">
                FASE 03 · CINEMÁTICA FLUIDA
              </span>
              <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[8.5px] font-mono font-bold">
                CURVAS BÉZIER
              </span>
            </div>
            <h4 className="text-base font-bold text-zinc-900 mb-1">Aceleración Física en Curvas Spline</h4>
            <p className="text-xs text-zinc-500 leading-relaxed mb-4">
              Transiciones, zooms y textos animados con inercia física real; nunca transiciones robóticas ni plantillas genéricas.
            </p>
          </div>

          <div className="bg-white border border-zinc-200 rounded-xl p-3.5 shadow-2xs">
            <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 mb-2">
              <span className="text-rose-600 font-bold">EaseOutQuart (Inercia Natural)</span>
              <span>60 FPS</span>
            </div>
            <svg viewBox="0 0 200 48" className="w-full h-12 stroke-rose-500 fill-none">
              <path d="M 0 44 C 60 44, 90 8, 200 8" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="90" cy="8" r="3.5" fill="#f43f5e" />
              <line x1="90" y1="8" x2="140" y2="8" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="140" cy="8" r="2.5" fill="#94a3b8" />
            </svg>
            <div className="flex justify-between text-[8px] font-mono text-zinc-400 mt-1">
              <span>0.0s (Arranque dinámico)</span>
              <span>0.4s (Corte limpio)</span>
            </div>
          </div>
        </div>

        {/* Tarjeta 4: Métricas Comerciales de Retención de Audiencia */}
        <div className="rounded-2xl bg-zinc-50/80 border border-zinc-200/80 p-5 flex flex-col justify-between hover:border-zinc-300 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9.5px] font-mono font-bold tracking-wider text-emerald-600 uppercase">
                FASE 04 · IMPACTO COMERCIAL
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[8.5px] font-mono font-bold">
                RETENCIÓN ALTA
              </span>
            </div>
            <h4 className="text-base font-bold text-zinc-900 mb-1">Estructura Gancho + Conversión de Ventas</h4>
            <p className="text-xs text-zinc-500 leading-relaxed mb-4">
              Cada segundo está calculado para detener el scroll del espectador, mantener su interés y dirigirlo a tu llamada a la acción.
            </p>
          </div>

          <div className="bg-white border border-zinc-200 rounded-xl p-3.5 shadow-2xs">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">+85%</span>
              <span className="text-[9px] font-mono text-emerald-600 font-bold">Retención en primeros 3s</span>
            </div>
            <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden mb-2">
              <div className="bg-emerald-500 h-full rounded-full w-[85%]" />
            </div>
            <div className="flex items-center justify-between text-[8.5px] font-mono text-zinc-500">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Gancho de alto impacto
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                Llamado a la acción
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [selectedDurationIndex, setSelectedDurationIndex] = useState(1);
  const [activeProposalTab, setActiveProposalTab] = useState('all');
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
    { label: 'DaVinci Resolve', href: '#ingenieria-visual' },
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

        <div className="sync-brand-mq sync-edge-mask overflow-hidden py-1.5 md:py-2">
          <div className="sync-brand-track">
            {[...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, idx) => (
              <span
                key={`${brand.name}-${idx}`}
                className="flex-none flex items-center justify-center w-[135px] h-[76px] sm:w-[155px] sm:h-[86px] md:w-[190px] md:h-[100px] mr-2.5 md:mr-4 rounded-2xl bg-white border border-zinc-200/80 shadow-sm hover:-translate-y-1 transition-all duration-300 px-3.5"
              >
                <img
                  src={brand.src}
                  alt={brand.name}
                  loading="lazy"
                  className="max-h-[46px] sm:max-h-[54px] md:max-h-[68px] w-auto max-w-[105px] sm:max-w-[122px] md:max-w-[148px] object-contain block"
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
      <section
        id="ingenieria-visual"
        className="py-14 md:py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-b border-zinc-200/70"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-8 gap-4 md:gap-6">
          <div>
            <span className="text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-[0.26em] text-zinc-400 block mb-1.5">
              Ingeniería Visual · 100% DaVinci Resolve Studio
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-zinc-900 leading-tight">
              Por qué tus videos generan clientes
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950 text-white text-[10px] sm:text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              DaVinci Resolve Studio Oficial (Edit · Fusion · Color · Fairlight)
            </span>
          </div>
        </div>

        {/* SELECTOR RÁPIDO DE PROPUESTAS VISUALES */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 p-2 sm:p-2.5 rounded-2xl bg-zinc-100/90 border border-zinc-200/80">
          <div className="flex items-center gap-2 pl-2">
            <Sparkles size={15} className="text-zinc-900 shrink-0" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-900">
              Modo de visualización de propuestas:
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            <button
              type="button"
              onClick={() => setActiveProposalTab('all')}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all ${
                activeProposalTab === 'all'
                  ? 'bg-zinc-950 text-white shadow-sm'
                  : 'bg-transparent text-zinc-600 hover:text-zinc-950 hover:bg-white/70'
              }`}
            >
              Ver las 3 Propuestas Juntas
            </button>
            <button
              type="button"
              onClick={() => setActiveProposalTab('kinetic')}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all ${
                activeProposalTab === 'kinetic'
                  ? 'bg-zinc-950 text-white shadow-sm'
                  : 'bg-transparent text-zinc-600 hover:text-zinc-950 hover:bg-white/70'
              }`}
            >
              1. Ingesta Archivos Pesados
            </button>
            <button
              type="button"
              onClick={() => setActiveProposalTab('timeline')}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all ${
                activeProposalTab === 'timeline'
                  ? 'bg-zinc-950 text-white shadow-sm'
                  : 'bg-transparent text-zinc-600 hover:text-zinc-950 hover:bg-white/70'
              }`}
            >
              2. Línea de Tiempo Flotante
            </button>
            <button
              type="button"
              onClick={() => setActiveProposalTab('bento')}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all ${
                activeProposalTab === 'bento'
                  ? 'bg-zinc-950 text-white shadow-sm'
                  : 'bg-transparent text-zinc-600 hover:text-zinc-950 hover:bg-white/70'
              }`}
            >
              3. Bento Grid Workflow
            </button>
          </div>
        </div>

        {/* RENDERIZADO DE LAS PROPUESTAS */}
        <div className="space-y-8">
          {(activeProposalTab === 'all' || activeProposalTab === 'kinetic') && (
            <DaVinciKineticHubProposal />
          )}

          {(activeProposalTab === 'all' || activeProposalTab === 'timeline') && (
            <DaVinciFloatingTimelineProposal />
          )}

          {(activeProposalTab === 'all' || activeProposalTab === 'bento') && (
            <DaVinciBentoWorkflowProposal />
          )}
        </div>
      </section>

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
