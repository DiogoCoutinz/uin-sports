import { useEffect, useRef, useCallback } from 'react';

/**
 * Scroll-driven cinematic dolly-in: 4 frames crossfade as user scrolls.
 * Uses vanilla JS scroll tracking (no framer-motion useScroll) for max reliability.
 * Direct DOM manipulation via refs — zero React re-renders during scroll.
 */

const frames = [
  '/scroll-frame-1.jpg',   // wide stadium, silhouette
  '/scroll-frame-2.jpg',   // medium shot, jersey #8
  '/scroll-frame-3.jpg',   // close-up hands SILVA 8
  '/1773934634864-shhr8snalp.jpg', // real photo
];

const texts = [
  'Cada peça começa\ncom uma visão.',
  'Design exclusivo\npara cada clube.',
  'Qualidade que\nse sente.',
];

/* ── Helpers: interpolate a value within a range ── */
function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

function rangeMap(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const t = Math.max(0, Math.min(1, (value - inMin) / (inMax - inMin)));
  return lerp(outMin, outMax, t);
}

export default function ScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameEls = useRef<(HTMLDivElement | null)[]>([]);
  const textEls = useRef<(HTMLDivElement | null)[]>([]);
  const logoEl = useRef<HTMLDivElement>(null);
  const barEl = useRef<HTMLDivElement>(null);
  const hintEl = useRef<HTMLDivElement>(null);

  const update = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const totalScroll = container.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    const p = Math.max(0, Math.min(1, scrolled / totalScroll));

    /* ── Frame opacities & scales ── */
    const frameRanges = [
      { fadeIn: [0, 0],       fadeOut: [0.20, 0.28] }, // frame 1: starts visible
      { fadeIn: [0.20, 0.28], fadeOut: [0.48, 0.55] }, // frame 2
      { fadeIn: [0.48, 0.55], fadeOut: [0.73, 0.80] }, // frame 3
      { fadeIn: [0.73, 0.80], fadeOut: [1, 1] },       // frame 4: stays visible
    ];

    frameEls.current.forEach((el, i) => {
      if (!el) return;
      const r = frameRanges[i];
      let opacity: number;
      if (i === 0) {
        opacity = rangeMap(p, r.fadeOut[0], r.fadeOut[1], 1, 0);
      } else if (i === frames.length - 1) {
        opacity = rangeMap(p, r.fadeIn[0], r.fadeIn[1], 0, 1);
      } else {
        const fadeInVal = rangeMap(p, r.fadeIn[0], r.fadeIn[1], 0, 1);
        const fadeOutVal = rangeMap(p, r.fadeOut[0], r.fadeOut[1], 1, 0);
        opacity = Math.min(fadeInVal, fadeOutVal);
      }
      const scale = lerp(1.0, 1.12, rangeMap(p, r.fadeIn[0], r.fadeOut[1], 0, 1));
      el.style.opacity = String(opacity);
      el.style.transform = `scale(${scale})`;
    });

    /* ── Text overlays ── */
    const textRanges = [
      { in: [0.04, 0.10], out: [0.18, 0.24] },
      { in: [0.30, 0.36], out: [0.44, 0.50] },
      { in: [0.57, 0.63], out: [0.70, 0.76] },
    ];

    textEls.current.forEach((el, i) => {
      if (!el) return;
      const r = textRanges[i];
      const fadeIn = rangeMap(p, r.in[0], r.in[1], 0, 1);
      const fadeOut = rangeMap(p, r.out[0], r.out[1], 1, 0);
      const opacity = Math.min(fadeIn, fadeOut);
      const y = lerp(40, 0, fadeIn) + lerp(0, -40, 1 - fadeOut);
      el.style.opacity = String(opacity);
      el.style.transform = `translateY(${y}px)`;
    });

    /* ── Logo on final frame ── */
    if (logoEl.current) {
      const logoOpacity = rangeMap(p, 0.85, 0.93, 0, 1);
      const logoY = lerp(24, 0, rangeMap(p, 0.85, 0.93, 0, 1));
      logoEl.current.style.opacity = String(logoOpacity);
      logoEl.current.style.transform = `translateY(${logoY}px)`;
    }

    /* ── Progress bar ── */
    if (barEl.current) {
      barEl.current.style.width = `${p * 100}%`;
    }

    /* ── Scroll hint ── */
    if (hintEl.current) {
      hintEl.current.style.opacity = String(rangeMap(p, 0, 0.04, 1, 0));
    }
  }, []);

  useEffect(() => {
    let raf = 0;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial state

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [update]);

  return (
    <div
      ref={containerRef}
      style={{ height: '300vh' }}
    >
      {/* Sticky viewport — fills screen, stays fixed while scrolling through 300vh */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          background: '#000',
        }}
      >
        {/* Image frames */}
        {frames.map((src, i) => (
          <div
            key={src}
            ref={el => { frameEls.current[i] = el; }}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: i === 0 ? 1 : 0,
              willChange: 'opacity, transform',
            }}
          >
            <img
              src={src}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        ))}

        {/* Vignette overlays */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 40%, rgba(0,0,0,0.25) 100%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Text overlays */}
        {texts.map((text, i) => (
          <div
            key={`t-${i}`}
            ref={el => { textEls.current[i] = el; }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '0 2rem',
              pointerEvents: 'none',
              zIndex: 2,
              opacity: 0,
              willChange: 'opacity, transform',
            }}
          >
            <h2
              className="font-display text-white leading-[1.1] tracking-tight"
              style={{
                fontSize: 'clamp(2rem, 5.5vw, 4rem)',
                textShadow: '0 2px 40px rgba(0,0,0,0.6)',
                whiteSpace: 'pre-line',
              }}
            >
              {text}
            </h2>
          </div>
        ))}

        {/* Logo on final frame */}
        <div
          ref={logoEl}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            pointerEvents: 'none',
            opacity: 0,
            willChange: 'opacity, transform',
          }}
        >
          <img src="/image copy.png" alt="UIN Sports" style={{ height: '3.5rem', marginBottom: '1rem' }} />
          <p
            className="font-display"
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '13px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
            }}
          >
            Equipamentos sublimados
          </p>
        </div>

        {/* Progress bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'rgba(255,255,255,0.08)',
            zIndex: 3,
          }}
        >
          <div
            ref={barEl}
            style={{
              height: '100%',
              width: '0%',
              background: 'rgba(255,255,255,0.4)',
              willChange: 'width',
            }}
          />
        </div>

        {/* Scroll hint */}
        <div
          ref={hintEl}
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <p
            className="font-display"
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
            }}
          >
            Scroll
          </p>
          <div
            style={{
              width: '1px',
              height: '2rem',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)',
              animation: 'scrollPulse 1.8s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* CSS animation for scroll hint */}
      <style>{`
        @keyframes scrollPulse {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
