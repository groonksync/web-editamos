import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Camera,
  Play,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Reveal from './components/Reveal';
import BeforeAfterLab from './components/BeforeAfterLab';
import CaseStudiesSection from './components/CaseStudiesSection';
import TimelineEngineeringSection from './components/TimelineEngineeringSection';
import AuthoritySection from './components/AuthoritySection';
import PricingAndBriefSection from './components/PricingAndBriefSection';

const WHATSAPP_NUMBER = '59169109766';

/* ============================================================================
   RENDIMIENTO ADAPTATIVO (teléfonos y PCs de gama baja, internet lento)
   ----------------------------------------------------------------------------
   - Los videos solo se descargan y reproducen cuando están cerca de la pantalla.
   - Cada tarjeta muestra primero su carátula liviana y el video aparece encima.
   - Si el visitante usa "Ahorro de datos" o una red 2G, no se autorreproduce nada:
     se muestra la carátula con botón de play y el video carga solo al tocarlo.
   ============================================================================ */
const ASSET_V = '2';
const asset = (path) => (path && path.startsWith('/') ? `${path}?v=${ASSET_V}` : path);

const getPerfProfile = () => {
  if (typeof navigator === 'undefined') return { still: false, lite: false, slow: false };
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const type = (conn && conn.effectiveType) || '';
  const saveData = Boolean(conn && conn.saveData);
  const verySlow = type === 'slow-2g' || type === '2g';
  const slowNet = type === '3g';
  const weakDevice =
    Boolean(navigator.deviceMemory && navigator.deviceMemory <= 2) ||
    Boolean(navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

  return {
    still: saveData || verySlow,
    lite: saveData || verySlow || slowNet || weakDevice,
    slow: saveData || verySlow || slowNet
  };
};

const PERF = getPerfProfile();

/* Video perezoso: solo existe en el DOM mientras está cerca de la zona visible.
   Al salir de pantalla se libera el decodificador (clave en equipos con poca memoria). */
const LazyVideo = ({ src, poster, muted = true, enabled = true, priority = false, label, onForceMute }) => {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const active = enabled && near && !PERF.still;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      setNear(true);
      return undefined;
    }
    const root = el.closest('[data-sync-scroller]');
    const io = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), {
      root: root || null,
      rootMargin: PERF.lite ? '0px 100px' : '0px 280px'
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active) setReady(false);
  }, [active]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
    if (!muted) {
      const p = v.play();
      if (p && p.catch) {
        p.catch(() => {
          v.muted = true;
          if (onForceMute) onForceMute();
          v.play().catch(() => {});
        });
      }
    }
  }, [muted, active]);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      {poster && (
        <img
          src={asset(poster)}
          alt=""
          aria-hidden="true"
          draggable="false"
          decoding="async"
          loading={priority ? 'eager' : 'lazy'}
          fetchpriority={priority ? 'high' : undefined}
          className="absolute inset-0 w-full h-full object-cover block pointer-events-none"
        />
      )}
      {active && (
        <video
          ref={videoRef}
          src={asset(src)}
          aria-label={label}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          data-ready={ready}
          onLoadedData={() => setReady(true)}
          onPlaying={() => setReady(true)}
          className="sync-media-fade absolute inset-0 w-full h-full object-cover block pointer-events-none"
        />
      )}
      {PERF.still && (
        <span className="sync-play-badge absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/55 border border-white/30 backdrop-blur-md flex items-center justify-center text-white pointer-events-none">
          <Play size={18} className="ml-0.5 fill-white" />
        </span>
      )}
    </div>
  );
};

/* ============================================================================
   MARCAS DEL ESTUDIO (ARCHIVOS LOCALES)
   ============================================================================ */
const BRAND_LOGOS = [
  { name: 'Century 21 Home', src: '/logos/century21-home.png', scale: 'scale-[1.03]' },
  { name: 'RE/MAX', src: '/logos/remax.png', scale: 'scale-[1.08]' },
  { name: 'Century 21', src: '/logos/c21.png', scale: 'scale-[1.05]' },
  { name: 'HouStyle Inmobiliaria', src: '/logos/houstyle.png', scale: 'scale-[1.02]' },
  { name: 'Urbanización Rosario', src: '/logos/urbanizacion-rosario.png', scale: 'scale-[1.05]' },
  { name: 'Sport Fit', src: '/logos/sportfit.png', scale: 'scale-100' },
  { name: 'NOVAFIT', src: '/logos/novafit.png', scale: 'scale-[1.02]' },
  { name: 'KORUM FIT', src: '/logos/korum-fit.png', scale: 'scale-[1.02]' },
  { name: 'Sync Creative', src: '/logos/logo-degradado.png', scale: 'scale-100' }
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
  const sectionRef = useRef(null);
  const [unmutedKey, setUnmutedKey] = useState(null);
  const [sectionNear, setSectionNear] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      setSectionNear(true);
      return undefined;
    }
    const io = new IntersectionObserver(([entry]) => setSectionNear(entry.isIntersecting), {
      rootMargin: '260px 0px'
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const baseList = items.length < 8 ? [...items, ...items] : items;
  const loopList = [...baseList, ...baseList];

  useEffect(() => {
    const box = scrollRef.current;
    if (!box) return undefined;

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;

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
    <div ref={sectionRef} className="relative group/carousel">
      <div
        ref={scrollRef}
        data-sync-scroller
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
                className={`sync-reel-card relative flex-none ${cardHeightClass} ${aspectClass} mr-3 md:mr-4 rounded-[20px] md:rounded-[22px] overflow-hidden bg-[#0a0a0c] border border-white/10 shadow-[0_20px_44px_-20px_rgba(0,0,0,0.85)] cursor-pointer isolate`}
              >
                {isVideo ? (
                  <LazyVideo
                    src={item.videoSrc}
                    poster={item.poster}
                    label={`${item.title}: ${item.subtitle}`}
                    muted={!isUnmuted}
                    enabled={sectionNear}
                    priority={idx < 3 && Boolean(item.priority)}
                    onForceMute={() => setUnmutedKey(null)}
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

                <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/90 pointer-events-none" />

                {item.category && (
                  <span className="absolute left-2.5 top-2.5 md:left-3 md:top-3 z-10 px-2 py-0.5 md:px-2.5 md:py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 font-mono text-[8px] md:text-[8.5px] font-medium uppercase tracking-[0.14em] text-zinc-200 max-w-[72%] truncate">
                    {item.category}
                  </span>
                )}

                {isVideo ? (
                  !PERF.still && (
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
                  )
                ) : (
                  <span className="absolute right-2.5 top-2.5 md:right-3 md:top-3 z-10 w-8 h-8 rounded-full bg-black/45 border border-white/20 text-white/80 backdrop-blur-md flex items-center justify-center">
                    <Camera size={14} />
                  </span>
                )}

                <figcaption className="absolute left-3 right-3 bottom-3 md:left-3.5 md:right-3.5 md:bottom-3.5 z-10 text-left text-white pointer-events-none">
                  <b className="block text-[13px] md:text-[15px] font-extrabold uppercase tracking-tight leading-tight drop-shadow">
                    {item.title}
                  </b>
                  <span className="sync-reel-sub block text-[10.5px] md:text-[11px] font-medium text-white/75 leading-snug mt-0.5 line-clamp-2">
                    {item.subtitle}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      {/* Botones laterales de navegación */}
      <button
        type="button"
        onClick={() => scrollByStep(-1)}
        aria-label="Anterior video"
        className="grid place-items-center absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-zinc-950/85 hover:bg-white text-white hover:text-zinc-950 border border-white/25 hover:border-white shadow-[0_15px_35px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-all duration-300 hover:scale-110 active:scale-95 group/arrow"
      >
        <ChevronLeft size={24} className="group-hover/arrow:-translate-x-0.5 transition-transform" />
      </button>
      <button
        type="button"
        onClick={() => scrollByStep(1)}
        aria-label="Siguiente video"
        className="grid place-items-center absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-zinc-950/85 hover:bg-white text-white hover:text-zinc-950 border border-white/25 hover:border-white shadow-[0_15px_35px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-all duration-300 hover:scale-110 active:scale-95 group/arrow"
      >
        <ChevronRight size={24} className="group-hover/arrow:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
};

const App = () => {
  const [lightboxItem, setLightboxItem] = useState(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxItem(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      const t = setTimeout(() => {
        const target = document.getElementById(hash.slice(1));
        if (target) target.scrollIntoView({ behavior: 'auto', block: 'start' });
      }, 160);
      return () => clearTimeout(t);
    }
    return undefined;
  }, []);

  // --- CONFIGURACIÓN DE VIDEOS ---
  // Mantenemos intacto el arreglo videoIds para compatibilidad con actualizar_videos.py
  const [videoIds] = useState([
    '19tLxlkE8-hyH2-2UULa87X2Niu2X2-vA', // Cuadro 12 (Departamento de Lujo)
    '19tLxlkE8-hyH2-2UULa87X2Niu2X2-vA', // Cuadro 7 (Terreno 13.000 m²)
    '19tLxlkE8-hy H2-2UULa87X2Niu2X2-vA', // Cuadro 1 (Sport Fit)
    '19tLxlkE8-hyH2-2UULa87X2Niu2X2-vA', // Cuadro 9 (Propiedad Comercial 3D)
    '19tLxlkE8-hyH2-2UULa87X2Niu2X2-vA', // Cuadro 6 (Promo Comercial)
    '19tLxlkE8-hyH2-2UULa87X2Niu2X2-vA', // Cuadro 11 (Casa en Venta)
    '19tLxlkE8-hyH2-2UULa87X2Niu2X2-vA', // Cuadro 10 (Santa Cruz Inmobiliaria)
    '19tLxlkE8-hyH2-2UULa87X2Niu2X2-vA', // Cuadro 3 (Chino Barber)
    '19tLxlkE8-hyH2-2UULa87X2Niu2X2-vA', // Cuadro 8 (Loteo Campestre)
    '19tLxlkE8-hyH2-2UULa87X2Niu2X2-vA', // Cuadro 13 (Buzón de Quejas Viral)
    '19tLxlkE8-hyH2-2UULa87X2Niu2X2-vA', // Cuadro 4 (Novafit)
    '1-hA022vE8-hyH2-2UULa87X2Niu2X2-vA', // Cuadro 2 (Zambranos)
    '19tLxlkE8-hyH2-2UULa87X2Niu2X2-vA'  // Cuadro 5 (Yoja Hair Lounge)
  ]);

  const projects = [
    {
      id: 'cuadro-12',
      type: 'video',
      title: 'DEPARTAMENTO DE LUJO',
      category: 'Condominios & Torres',
      subtitle: 'Exclusividad 240 m², garajes y vista panorámica',
      poster: '/cuadro-12-poster-sm.jpg',
      posterFull: '/cuadro-12-poster.jpg',
      priority: true,
      videoSrc: '/cuadro-12-lite.mp4',
      fullVideoSrc: '/cuadro-12.mp4'
    },
    {
      id: 'cuadro-7',
      type: 'video',
      title: 'TERRENO 13.000 M²',
      category: 'Inmobiliaria & Loteos',
      subtitle: 'Tracking 3D, delimitación de perímetro y visualización con dron',
      poster: '/cuadro-7-poster-sm.jpg',
      posterFull: '/cuadro-7-poster.jpg',
      priority: true,
      videoSrc: '/cuadro-7-lite.mp4',
      fullVideoSrc: '/cuadro-7.mp4'
    },
    {
      id: 'cuadro-1',
      type: 'video',
      title: 'SPORT FIT',
      category: 'Fitness & Suplementos',
      subtitle: 'Edición comercial rítmica de alto impacto',
      poster: '/cuadro-1-poster-sm.jpg',
      posterFull: '/cuadro-1-poster.jpg',
      priority: true,
      videoSrc: '/cuadro-1-lite.mp4',
      fullVideoSrc: '/cuadro-1.mp4'
    },
    {
      id: 'cuadro-9',
      type: 'video',
      title: 'PROPIEDAD COMERCIAL',
      category: 'Inversiones Inmobiliarias',
      subtitle: 'Motion graphics 3D, visualización de avenidas y plusvalía',
      poster: '/cuadro-9-poster-sm.jpg',
      posterFull: '/cuadro-9-poster.jpg',
      videoSrc: '/cuadro-9-lite.mp4',
      fullVideoSrc: '/cuadro-9.mp4'
    },
    {
      id: 'cuadro-6',
      type: 'video',
      title: 'PROMO COMERCIAL',
      category: 'Comercio & Retail',
      subtitle: 'Gancho directo, ritmo acelerado y llamado a la acción',
      poster: '/cuadro-6-poster-sm.jpg',
      posterFull: '/cuadro-6-poster.jpg',
      videoSrc: '/cuadro-6-lite.mp4',
      fullVideoSrc: '/cuadro-6.mp4'
    },
    {
      id: 'cuadro-11',
      type: 'video',
      title: 'CASA EN VENTA',
      category: 'Inmobiliaria & Casas',
      subtitle: 'Recorrido dinámico de propiedad con agente en cámara',
      poster: '/cuadro-11-poster-sm.jpg',
      posterFull: '/cuadro-11-poster.jpg',
      videoSrc: '/cuadro-11-lite.mp4',
      fullVideoSrc: '/cuadro-11.mp4'
    },
    {
      id: 'cuadro-10',
      type: 'video',
      title: 'SANTA CRUZ INMOBILIARIA',
      category: 'Storytelling & Contenido',
      subtitle: 'Narrativa con orador, subtítulos dinámicos e identidad cruceña',
      poster: '/cuadro-10-poster-sm.jpg',
      posterFull: '/cuadro-10-poster.jpg',
      videoSrc: '/cuadro-10-lite.mp4',
      fullVideoSrc: '/cuadro-10.mp4'
    },
    {
      id: 'cuadro-3',
      type: 'video',
      title: 'CHINO BARBER',
      category: 'Estilo & Lifestyle',
      subtitle: 'Cortes dinámicos, speed ramps y diseño sonoro',
      poster: '/cuadro-3-poster-sm.jpg',
      posterFull: '/cuadro-3-poster.jpg',
      videoSrc: '/cuadro-3-lite.mp4',
      fullVideoSrc: '/cuadro-3.mp4'
    },
    {
      id: 'cuadro-8',
      type: 'video',
      title: 'LOTEO CAMPESTRE',
      category: 'Desarrollo Inmobiliario',
      subtitle: 'Toma aérea cinematográfica, tipografía y escala de terreno',
      poster: '/cuadro-8-poster-sm.jpg',
      posterFull: '/cuadro-8-poster.jpg',
      videoSrc: '/cuadro-8-lite.mp4',
      fullVideoSrc: '/cuadro-8.mp4'
    },
    {
      id: 'cuadro-13',
      type: 'video',
      title: 'BUZÓN DE QUEJAS',
      category: 'Storytelling & Humor Viral',
      subtitle: 'Edición ágil de alta retención, efectos sonoros y dinamismo',
      poster: '/cuadro-13-poster-sm.jpg',
      posterFull: '/cuadro-13-poster.jpg',
      videoSrc: '/cuadro-13-lite.mp4',
      fullVideoSrc: '/cuadro-13.mp4'
    },
    {
      id: 'cuadro-4',
      type: 'video',
      title: 'NOVAFIT',
      category: 'Entrenamiento & Energía',
      subtitle: 'Colorización cinematográfica y ritmo publicitario',
      poster: '/cuadro-4-poster-sm.jpg',
      posterFull: '/cuadro-4-poster.jpg',
      videoSrc: '/cuadro-4-lite.mp4',
      fullVideoSrc: '/cuadro-4.mp4'
    },
    {
      id: 'cuadro-2',
      type: 'video',
      title: 'ZAMBRANOS',
      category: 'Comercial & Marca',
      subtitle: 'Storytelling visual y retención para redes',
      poster: '/cuadro-2-poster-sm.jpg',
      posterFull: '/cuadro-2-poster.jpg',
      videoSrc: '/cuadro-2-lite.mp4',
      fullVideoSrc: '/cuadro-2.mp4'
    },
    {
      id: 'cuadro-5',
      type: 'video',
      title: 'YOJA HAIR LOUNGE',
      category: 'Belleza & Estética',
      subtitle: 'Acabado visual limpio y estética de marca',
      poster: '/cuadro-5-poster-sm.jpg',
      posterFull: '/cuadro-5-poster.jpg',
      videoSrc: '/cuadro-5-lite.mp4',
      fullVideoSrc: '/cuadro-5.mp4'
    }
  ];

  const openProjectById = (projectId) => {
    const found = projects.find((p) => p.id === projectId);
    if (found) setLightboxItem(found);
  };

  const navLinks = [
    { label: 'Videos', href: '#inicio-videos' },
    { label: 'Marcas', href: '#marcas' },
    { label: 'Antes / Después', href: '#antes-despues' },
    { label: 'Casos', href: '#casos-estudio' },
    { label: 'Proceso', href: '#ingenieria' },
    { label: 'Planes', href: '#planes-edicion' },
    { label: 'Cotizar', href: '#contacto' }
  ];

  return (
    <div className="min-h-screen bg-[#ffffff] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white overflow-x-clip">
      {/* Navegación boutique sticky */}
      <header className="sticky top-0 w-full z-50 bg-[#050507]/95 backdrop-blur-xl border-b border-white/[0.08] text-white">
        <div className="px-4 sm:px-6 md:px-8 py-3 md:py-3.5 flex justify-between items-center">
          <a href="#" className="text-base sm:text-lg font-extrabold tracking-tight flex items-center gap-2.5">
            <div className="w-2 h-2 bg-[#d4b475] rounded-full animate-pulse" />
            <span>SYNC PRO</span>
            <span className="hidden sm:inline-block font-mono text-[9.5px] uppercase tracking-[0.18em] text-zinc-500 border-l border-white/15 pl-2.5">
              POST-HOUSE
            </span>
          </a>

          <nav className="hidden lg:flex gap-6 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
            {navLinks.slice(0, 6).map((item) => (
              <a key={item.href} href={item.href} className="hover:text-white transition-colors">
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contacto"
            className="bg-white text-zinc-950 px-3.5 sm:px-4 py-2 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center gap-1.5"
          >
            <span>Cotizar</span>
            <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Barra rápida táctil para Smartphone / Tablet (< 1024px) */}
        <nav
          aria-label="Secciones móviles"
          className="lg:hidden flex items-center gap-1.5 overflow-x-auto no-scrollbar px-4 pb-2.5 border-t border-white/[0.05] pt-2"
        >
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex-none px-3 py-1 rounded-full bg-white/[0.06] active:bg-white active:text-zinc-950 border border-white/10 font-mono text-[9.5px] font-medium uppercase tracking-wider text-zinc-300 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      {/* =====================================================================
          1. ESCENARIO DE INICIO EN NEGRO & GRIS CARBÓN (ANCHO TOTAL)
          ===================================================================== */}
      <section
        id="inicio-videos"
        className="sync-stage relative text-white pt-6 pb-7 md:pt-11 md:pb-11 border-b border-zinc-900 overflow-x-clip"
      >
        <div className="w-full max-w-full px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-5 lg:gap-8 pb-2">
            {/* LADO IZQUIERDO: Badge limpio y Título en una sola línea responsiva sin overflow */}
            <div className="flex-1 min-w-0 pr-0 lg:pr-6">
              <div
                className="sync-rise inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 font-mono text-[9px] sm:text-[10.5px] font-medium uppercase tracking-[0.16em] sm:tracking-[0.2em] text-zinc-300 backdrop-blur-md mb-2.5 sm:mb-3 max-w-full"
                style={{ animationDelay: '0s' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4b475] shrink-0" />
                <span>DaVinci Resolve Studio</span>
                <span className="text-zinc-600">·</span>
                <span>Motion 3D</span>
                <span className="text-zinc-600">·</span>
                <span>IA</span>
              </div>

              <h1
                className="sync-rise text-[clamp(1.62rem,7.6vw,4.5rem)] font-black uppercase tracking-tight leading-none text-white whitespace-nowrap"
                style={{ animationDelay: '0.04s' }}
              >
                Edición{' '}
                <span className="bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-500 bg-clip-text text-transparent">
                  que vende.
                </span>
              </h1>
              <p
                className="sync-rise mt-2.5 text-xs sm:text-sm md:text-base text-zinc-400 font-normal leading-relaxed max-w-xl lg:max-w-2xl"
                style={{ animationDelay: '0.08s' }}
              >
                Postproducción cinematográfica de alto calibre para inmobiliarias, marcas comerciales y creadores.
                Retención magnética, tracking 3D real y estándar publicitario.
              </p>
            </div>

            {/* LADO DERECHO: Botones de Acción anclados a la derecha */}
            <div
              className="sync-rise flex flex-row items-center gap-2.5 sm:gap-3 shrink-0 lg:mb-1 w-full sm:w-auto justify-end"
              style={{ animationDelay: '0.12s' }}
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  'Hola Sync Pro, vi su portafolio boutique y quiero cotizar una producción.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial bg-white text-zinc-950 px-5 sm:px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all shadow-[0_10px_25px_-5px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-95 whitespace-nowrap"
              >
                <MessageCircle size={16} /> Trabajemos
              </a>
              <a
                href="#planes-edicion"
                className="flex-1 sm:flex-initial bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/15 px-5 sm:px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all backdrop-blur-md hover:scale-[1.02] active:scale-95 whitespace-nowrap"
              >
                Ver Planes <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-3 md:mt-4">
          <InfiniteMediaCarousel items={projects} onSelectItem={(item) => setLightboxItem(item)} />
        </div>

        <p className="mt-1 px-4 text-center font-mono text-[10px] sm:text-[10.5px] font-medium tracking-wide text-zinc-400">
          <span className="hidden md:inline">CURSOR PARA PAUSAR · ARRASTRA O USA FLECHAS · </span>
          <span className="md:hidden">DESLIZA CON EL DEDO · </span>
          TOCA CUALQUIER PIEZA PARA VER MASTER HD CON AUDIO
        </p>
      </section>

      {/* =====================================================================
          2. MARCAS QUE CONFÍAN EN EL ESTUDIO
          ===================================================================== */}
      <section id="marcas" className="py-10 md:py-14 bg-zinc-50/80 border-b border-zinc-200/70">
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 mb-5 md:mb-7 text-center">
          <span className="font-mono text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-[0.26em] text-zinc-400 block mb-1">
            Empresas & Marcas Comerciales
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-zinc-900">
            Trabajamos con marcas líderes
          </h2>
        </Reveal>

        <div className="sync-brand-mq sync-edge-mask overflow-hidden py-2 md:py-3">
          <div className="sync-brand-track">
            {[...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, idx) => (
              <span
                key={`${brand.name}-${idx}`}
                className="flex-none flex items-center justify-center w-[155px] h-[82px] sm:w-[180px] sm:h-[92px] md:w-[205px] md:h-[102px] mr-3 md:mr-4 rounded-2xl bg-white border border-zinc-200/90 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 p-3 sm:p-3.5 overflow-hidden"
              >
                <img
                  src={brand.src}
                  alt={brand.name}
                  loading="lazy"
                  className={`max-h-[48px] sm:max-h-[58px] md:max-h-[68px] w-auto max-w-[120px] sm:max-w-[145px] md:max-w-[170px] object-contain block transition-transform duration-300 ${
                    brand.scale || ''
                  }`}
                />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. COMPARADOR INTERACTIVO ANTES VS. DESPUÉS (D-LOG VS MASTER 3D)
          ===================================================================== */}
      <BeforeAfterLab asset={asset} onPreviewRealVideo={openProjectById} />

      {/* =====================================================================
          4. CASOS DE ESTUDIO REALES (BENTO GRID ASIMÉTRICO)
          ===================================================================== */}
      <CaseStudiesSection asset={asset} onSelectProjectId={openProjectById} />

      {/* =====================================================================
          5. INSIDE THE TIMELINE & ARCHIVO DE STILLS REALES
          ===================================================================== */}
      <TimelineEngineeringSection
        asset={asset}
        whatsappNumber={WHATSAPP_NUMBER}
        onSelectLightbox={(item) => setLightboxItem(item)}
      />

      {/* =====================================================================
          6. AUTORIDAD POR RUBRO & DIFERENCIALES TÉCNICOS
          ===================================================================== */}
      <AuthoritySection />

      {/* =====================================================================
          7. PLANES HIGH-TICKET, FLUJO, TECNOLOGÍA PROPIA & BRIEF DE POSTULACIÓN
          ===================================================================== */}
      <PricingAndBriefSection whatsappNumber={WHATSAPP_NUMBER} />

      {/* =====================================================================
          VISOR MODAL CENTRADO (LIGHTBOX PARA VIDEOS CON AUDIO Y STILLS)
          ===================================================================== */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxItem(null)}
            className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-xl grid place-items-center p-4 md:p-6"
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
              <div className="mb-2.5 flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.2em] text-[#d4b475]">
                <span>{lightboxItem.type === 'video' ? 'MASTER PLAYBACK · AUDIO ON' : 'STILL FRAME 1:1'}</span>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-400">DAVINCI RESOLVE STUDIO</span>
              </div>

              {lightboxItem.type === 'video' ? (
                <video
                  key={lightboxItem.id}
                  src={asset(
                    PERF.slow
                      ? lightboxItem.videoSrc
                      : lightboxItem.fullVideoSrc || lightboxItem.videoSrc
                  )}
                  poster={asset(lightboxItem.posterFull || lightboxItem.poster) || undefined}
                  controls
                  autoPlay
                  playsInline
                  loop
                  preload="auto"
                  className="max-h-[76vh] max-w-full w-auto rounded-2xl bg-black border border-white/15 shadow-2xl"
                />
              ) : (
                <img
                  src={asset(lightboxItem.src)}
                  alt={lightboxItem.subtitle || lightboxItem.title}
                  className="max-h-[76vh] max-w-full w-auto rounded-2xl bg-black border border-white/15 shadow-2xl"
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

      {/* Botón Flotante de WhatsApp */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          'Hola Sync Pro, vi su portafolio web y quiero postular un proyecto.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 sm:right-5 z-50 bg-zinc-950 text-white px-4 py-3.5 rounded-full shadow-2xl border border-[#d4b475]/35 hover:scale-105 transition-all flex items-center gap-2"
      >
        <MessageCircle size={18} className="text-emerald-400" />
        <span className="text-[11px] font-bold uppercase tracking-wider pr-0.5">WhatsApp</span>
      </a>

      {/* Footer */}
      <footer className="py-12 pb-24 sm:pb-12 border-t border-zinc-200/80 text-center bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <div className="text-xs font-extrabold tracking-tight text-zinc-900 font-mono">
            SYNC PRO // POST-HOUSE 2026
          </div>
          <p className="text-zinc-500 text-[11px] font-medium">
            Dirección de Postproducción Digital · 100% DaVinci Resolve Studio Oficial
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] font-semibold text-zinc-700 hover:text-zinc-950 transition-colors"
          >
            WhatsApp: +591 69109766
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
