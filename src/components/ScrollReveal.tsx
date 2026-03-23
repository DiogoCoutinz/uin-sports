import { useEffect, useRef, useCallback } from 'react';

/**
 * Scroll-driven cinematic landing — 4 frames crossfade as user scrolls.
 * THIS IS THE HERO. Nav sits on top (fixed, handled by parent).
 * Vanilla JS scroll tracking + direct DOM manipulation for max performance.
 */

const frames = [
  '/scroll-frame-1.jpg',
  '/scroll-frame-2.jpg',
  '/scroll-frame-3.jpg',
  '/1773934634864-shhr8snalp.jpg',
];

/* ── Helpers ── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function remap(v: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return lerp(outMin, outMax, Math.max(0, Math.min(1, (v - inMin) / (inMax - inMin))));
}

export default function ScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameEls = useRef<(HTMLDivElement | null)[]>([]);
  const textEls = useRef<(HTMLDivElement | null)[]>([]);
  const ctaEl = useRef<HTMLDivElement>(null);
  const statsEl = useRef<HTMLDivElement>(null);
  const barEl = useRef<HTMLDivElement>(null);
  const hintEl = useRef<HTMLDivElement>(null);

  const update = useCallback(() => {
    const c = containerRef.current;
    if (!c) return;
    const total = c.offsetHeight - window.innerHeight;
    const p = Math.max(0, Math.min(1, -c.getBoundingClientRect().top / total));

    /* ── Frames ── */
    const fr = [
      { in: [0, 0], out: [0.18, 0.25] },
      { in: [0.18, 0.25], out: [0.45, 0.52] },
      { in: [0.45, 0.52], out: [0.72, 0.78] },
      { in: [0.72, 0.78], out: [1, 1] },
    ];
    frameEls.current.forEach((el, i) => {
      if (!el) return;
      const r = fr[i];
      let o: number;
      if (i === 0) o = remap(p, r.out[0], r.out[1], 1, 0);
      else if (i === frames.length - 1) o = remap(p, r.in[0], r.in[1], 0, 1);
      else o = Math.min(remap(p, r.in[0], r.in[1], 0, 1), remap(p, r.out[0], r.out[1], 1, 0));
      const s = lerp(1.0, 1.1, remap(p, r.in[0], r.out[1], 0, 1));
      el.style.opacity = String(o);
      el.style.transform = `scale(${s})`;
    });

    /* ── Texts ── */
    const tr = [
      { in: [0.02, 0.06], out: [0.15, 0.21] },
      { in: [0.27, 0.32], out: [0.42, 0.48] },
      { in: [0.54, 0.59], out: [0.69, 0.74] },
    ];
    textEls.current.forEach((el, i) => {
      if (!el) return;
      const r = tr[i];
      const fi = remap(p, r.in[0], r.in[1], 0, 1);
      const fo = remap(p, r.out[0], r.out[1], 1, 0);
      const o = Math.min(fi, fo);
      el.style.opacity = String(o);
      el.style.transform = `translateY(${lerp(50, 0, fi) + lerp(0, -40, 1 - fo)}px)`;
    });

    /* ── CTA on final frame ── */
    if (ctaEl.current) {
      const o = remap(p, 0.84, 0.92, 0, 1);
      ctaEl.current.style.opacity = String(o);
      ctaEl.current.style.transform = `translateY(${lerp(30, 0, o)}px)`;
    }

    /* ── Stats bar ── */
    if (statsEl.current) {
      const o = remap(p, 0.88, 0.95, 0, 1);
      statsEl.current.style.opacity = String(o);
    }

    /* ── Progress ── */
    if (barEl.current) barEl.current.style.width = `${p * 100}%`;
    if (hintEl.current) hintEl.current.style.opacity = String(remap(p, 0, 0.04, 0.7, 0));
  }, []);

  useEffect(() => {
    let raf = 0;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(() => { update(); ticking = false; });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [update]);

  return (
    <div ref={containerRef} style={{ height: '300vh' }}>
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
        {/* ── Image frames ── */}
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
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        ))}

        {/* ── Vignettes (stacked for stronger darkening) ── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.4) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 100%)',
        }} />

        {/* ── Text 1: Hero headline ── */}
        <div
          ref={el => { textEls.current[0] = el; }}
          style={{
            position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: '0 2rem', opacity: 0, willChange: 'opacity, transform',
          }}
        >
          <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
            <p
              className="font-display"
              style={{
                color: 'rgba(255,255,255,0.5)', fontSize: '11px',
                letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.5rem',
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                textShadow: '0 1px 10px rgba(0,0,0,0.8)',
              }}
            >
              <span style={{ width: '2rem', height: '2px', background: 'rgba(255,255,255,0.3)', display: 'inline-block' }} />
              Equipamentos sublimados
            </p>
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                lineHeight: 1, letterSpacing: '-0.02em', color: '#fff',
                textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 4px 60px rgba(0,0,0,0.6)',
              }}
            >
              Para cada marca,<br />
              <span style={{ color: 'rgba(255,255,255,0.65)' }}>há um herói.</span>
            </h1>
          </div>
        </div>

        {/* ── Text 2: Centered statement ── */}
        <div
          ref={el => { textEls.current[1] = el; }}
          style={{
            position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', padding: '0 2rem', opacity: 0,
            willChange: 'opacity, transform',
          }}
        >
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)',
              lineHeight: 1.1, letterSpacing: '-0.01em', color: '#fff',
              textShadow: '0 2px 16px rgba(0,0,0,0.9), 0 4px 50px rgba(0,0,0,0.6)',
            }}
          >
            Design exclusivo para clubes<br />
            em Portugal, África e PALOP.
          </h2>
        </div>

        {/* ── Text 3: Centered statement ── */}
        <div
          ref={el => { textEls.current[2] = el; }}
          style={{
            position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', padding: '0 2rem', opacity: 0,
            willChange: 'opacity, transform',
          }}
        >
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)',
              lineHeight: 1.1, letterSpacing: '-0.01em', color: '#fff',
              textShadow: '0 2px 16px rgba(0,0,0,0.9), 0 4px 50px rgba(0,0,0,0.6)',
            }}
          >
            Do conceito à entrega,<br />
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>tratamos de tudo.</span>
          </h2>
        </div>

        {/* ── CTA on final frame ── */}
        <div
          ref={ctaEl}
          style={{
            position: 'absolute', inset: 0, zIndex: 2,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', gap: '1.5rem', opacity: 0,
            willChange: 'opacity, transform',
          }}
        >
          <div style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(16px)', borderRadius: '1.5rem', padding: '2.5rem 3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <img src="/image_copy-removebg-preview.png" alt="UIN Sports" style={{ height: '5rem', marginBottom: '0.5rem' }} />
          <p
            className="font-display"
            style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', letterSpacing: '0.25em', textTransform: 'uppercase' }}
          >
            Equipamentos sublimados
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', pointerEvents: 'auto' }}>
            <a
              href="/loja"
              className="font-display"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: '#fff', color: '#0f1729', padding: '0.85rem 1.75rem',
                fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em',
                borderRadius: '9999px', textDecoration: 'none',
                transition: 'background 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.9)')}
              onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
            >
              Explorar loja
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <a
              href="/contactos"
              className="font-display"
              style={{
                display: 'inline-flex', alignItems: 'center',
                border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)',
                padding: '0.85rem 1.75rem', fontSize: '12px', fontWeight: 600,
                letterSpacing: '0.06em', borderRadius: '9999px', textDecoration: 'none',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
            >
              Pedir orçamento
            </a>
          </div>
          </div>
        </div>

        {/* ── Stats bar (bottom, final frame) ── */}
        <div
          ref={statsEl}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)',
            opacity: 0,
          }}
        >
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center' }}>
            {[
              { n: '200+', l: 'Clubes parceiros' },
              { n: '10K+', l: 'Equipamentos' },
              { n: '12', l: 'Anos' },
              { n: '9', l: 'Países' },
            ].map(s => (
              <div key={s.l}>
                <p className="font-display" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', color: 'rgba(255,255,255,0.6)', lineHeight: 1 }}>{s.n}</p>
                <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '0.4rem' }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Progress bar ── */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'rgba(255,255,255,0.06)', zIndex: 4 }}>
          <div ref={barEl} style={{ height: '100%', width: '0%', background: 'rgba(255,255,255,0.35)', willChange: 'width' }} />
        </div>

        {/* ── Scroll hint ── */}
        <div
          ref={hintEl}
          style={{
            position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
            zIndex: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          }}
        >
          <p className="font-display" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
            Scroll
          </p>
          <div style={{ width: '1px', height: '1.5rem', background: 'linear-gradient(to bottom, rgba(255,255,255,0.45), transparent)', animation: 'scrollPulse 1.8s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
