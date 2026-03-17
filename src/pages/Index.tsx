import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { products, clubs } from '@/data/mockData';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/layout/CartSidebar';
import { useCart } from '@/contexts/CartContext';
import { useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   Dual-direction club marquee — two rows
   moving in opposite directions for energy
───────────────────────────────────────────── */
function ClubMarquee() {
  const names = clubs.map(c => c.name);
  const doubled = [...names, ...names];

  return (
    <div className="py-4 bg-secondary overflow-hidden select-none">
      {/* Forward row */}
      <div className="flex gap-12 whitespace-nowrap animate-marquee w-max mb-3">
        {doubled.map((name, i) => (
          <span key={`fwd-${i}`} className="flex items-center gap-12">
            <span className="font-display text-[2rem] text-white/[0.06] uppercase tracking-wider">
              {name}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
          </span>
        ))}
      </div>
      {/* Reverse row */}
      <div className="flex gap-12 whitespace-nowrap animate-marquee-reverse w-max">
        {doubled.map((name, i) => (
          <span key={`rev-${i}`} className="flex items-center gap-12">
            <span className="font-display text-[2rem] text-white/[0.06] uppercase tracking-wider">
              {name}
            </span>
            <span className="w-1.5 h-1.5 bg-primary/30 rotate-45" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Product card — tall aspect, layered reveal
───────────────────────────────────────────── */
function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  return (
    <Link
      to={`/produto/${product.id}`}
      className="group block relative flex-shrink-0 w-[280px] sm:w-[300px] lg:w-[320px]"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, type: 'spring', stiffness: 80, damping: 20 }}
        className="relative overflow-hidden aspect-[3/4.2]"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.06]"
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {/* hover accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        {/* content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-primary/70 text-[10px] font-semibold tracking-[0.3em] uppercase mb-1.5">
            {product.clubName}
          </p>
          <p className="text-white font-medium text-sm leading-snug">{product.name}</p>
          <p className="text-white font-display text-2xl mt-1.5 tracking-wide">
            {product.price.toFixed(2)}<span className="text-lg ml-0.5">€</span>
          </p>
        </div>
        {/* index number */}
        <div className="absolute top-4 right-4 font-display text-white/[0.07] text-6xl leading-none select-none">
          {String(index + 1).padStart(2, '0')}
        </div>
      </motion.div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   Scroll progress indicator — thin line
───────────────────────────────────────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-50 origin-left"
    />
  );
}

/* ─────────────────────────────────────────────
   Main page
───────────────────────────────────────────── */
export default function Index() {
  const featuredProducts = products.filter(p => p.id !== 'p4').slice(0, 6);
  const { totalItems, setIsOpen } = useCart();

  // Hero parallax
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroTextY = useTransform(heroProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);
  const heroVideoScale = useTransform(heroProgress, [0, 1], [1, 1.15]);

  // About section parallax
  const aboutRef = useRef<HTMLElement>(null);
  const { scrollYProgress: aboutProgress } = useScroll({ target: aboutRef, offset: ['start end', 'end start'] });
  const aboutImgY = useTransform(aboutProgress, [0, 1], [60, -60]);
  const aboutImgScale = useTransform(aboutProgress, [0, 0.5, 1], [1.1, 1, 1.05]);

  // Horizontal scroll for products
  const productsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = productsRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scrollProducts = (direction: 'left' | 'right') => {
    const el = productsRef.current;
    if (!el) return;
    const amount = direction === 'left' ? -340 : 340;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <div className="min-h-[100dvh] bg-secondary overflow-x-hidden">
      <ScrollProgress />
      <CartSidebar />

      {/* ══════════════════════════════════════════
          HERO — Full-screen video + floating kick.png
      ══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[92dvh] flex flex-col justify-end overflow-hidden">
        {/* Video background — cropped top 10% to hide artifacts */}
        <motion.div style={{ scale: heroVideoScale }} className="absolute inset-0 -top-[10%] h-[110%]">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-[center_60%]"
          >
            <source src="/kling.mp4" type="video/mp4" />
          </video>
          {/* layered overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-secondary/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 via-transparent to-transparent" />
        </motion.div>

        {/* Noise texture */}
        <div className="fixed inset-0 opacity-[0.025] pointer-events-none z-[60]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.85%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")' }} />

        {/* ── Floating nav ── */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <img src="/favicon.png" alt="UIN Sports" className="w-9 h-9 rounded-full transition-transform duration-300 group-hover:scale-110" />
              <span className="font-display text-white text-xl tracking-[0.15em]">UIN SPORTS</span>
            </Link>

            <div className="flex items-center gap-8">
              <nav className="hidden sm:flex items-center gap-8">
                {[
                  { label: 'Sobre', href: '/sobre' },
                  { label: 'Loja', href: '/loja' },
                  { label: 'Contactos', href: '/contactos' },
                ].map(link => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-[13px] font-medium text-white/40 hover:text-primary transition-colors duration-300 tracking-wider uppercase"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2.5 text-white/40 hover:text-primary transition-colors duration-300 active:scale-95"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroTextY }}
          className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 pb-16 sm:pb-20 pt-32"
        >
          {/* Accent tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 60 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-[2px] bg-primary" />
            <p className="text-primary text-[11px] font-semibold tracking-[0.4em] uppercase">
              Equipamentos desportivos
            </p>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 40, damping: 15 }}
            className="font-display text-[clamp(3.2rem,12vw,11rem)] leading-[0.87] tracking-[-0.02em] text-white mb-10 max-w-[900px]"
          >
            PARA CADA
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/60">
              MARCA,
            </span>{' '}
            HA
            <br />
            UM HEROI.
          </motion.h1>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 50 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link to="/loja">
              <span className="group inline-flex items-center gap-3 bg-primary text-white px-8 py-4 font-semibold text-[13px] tracking-[0.2em] hover:bg-primary/85 transition-all duration-300 active:scale-[0.98]">
                EXPLORAR LOJA
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
            <Link to="/contactos">
              <span className="inline-flex items-center gap-3 border border-white/15 text-white/80 px-8 py-4 font-semibold text-[13px] tracking-[0.2em] hover:border-white/30 hover:text-white transition-all duration-300 active:scale-[0.98]">
                PEDIR ORCAMENTO
              </span>
            </Link>
          </motion.div>

        </motion.div>
      </section>

      {/* Stats bar — outside hero so it scrolls normally */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="bg-secondary"
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-5 sm:py-6">
          <div className="flex justify-center gap-10 sm:gap-14 lg:gap-20">
            {[
              { value: '200+', label: 'Clubes' },
              { value: '10K+', label: 'Equipamentos' },
              { value: '12', label: 'Anos' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-display text-2xl sm:text-4xl lg:text-5xl text-white leading-none tracking-wide">{s.value}</p>
                <p className="text-[9px] sm:text-[10px] text-white/25 tracking-[0.3em] uppercase mt-1 sm:mt-1.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════
          CLUB MARQUEE — Dual direction
      ══════════════════════════════════════════ */}
      <ClubMarquee />

      {/* ══════════════════════════════════════════
          ABOUT — Asymmetric split with kick.png
      ══════════════════════════════════════════ */}
      <section ref={aboutRef} className="relative py-14 lg:py-20 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
            {/* Image column — takes 7 cols */}
            <motion.div
              className="lg:col-span-7 relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 40, damping: 18 }}
            >
              <div className="relative overflow-hidden aspect-[4/3] lg:aspect-[16/11]">
                <motion.img
                  style={{ y: aboutImgY, scale: aboutImgScale }}
                  src="/kick.png"
                  alt="Football action"
                  className="w-full h-full object-cover"
                />
                {/* overlay tint */}
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/40 via-transparent to-secondary/20" />
              </div>
              {/* Floating accent block */}
              <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 w-24 h-24 lg:w-32 lg:h-32 border-2 border-primary/20" />
              {/* Year badge */}
              <div className="absolute top-6 left-6 bg-primary/90 backdrop-blur-sm px-4 py-2">
                <p className="font-display text-white text-lg tracking-wider">DESDE 2013</p>
              </div>
            </motion.div>

            {/* Text column — takes 5 cols */}
            <motion.div
              className="lg:col-span-5 lg:pl-6"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 40, damping: 18, delay: 0.15 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-[2px] bg-primary" />
                <p className="text-primary text-[11px] font-semibold tracking-[0.35em] uppercase">Quem somos</p>
              </div>

              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.88] text-white mb-8">
                NASCEMOS
                <br />
                <span className="text-primary">PARA EQUIPAR</span>
                <br />
                HEROIS
              </h2>

              <p className="text-white/60 leading-relaxed text-lg mb-5 max-w-[55ch]">
                Fabricamos e distribuimos equipamentos desportivos sublimados da mais alta qualidade para clubes em Portugal, Africa e PALOP.
              </p>
              <p className="text-white/30 leading-relaxed mb-10 max-w-[55ch]">
                Uma equipa com anos de experiencia no sector, apostada na inovacao e na excelencia. Dispomos das mais recentes tecnologias para a fabricacao de equipamentos para todas as modalidades.
              </p>

              <Link
                to="/sobre"
                className="group inline-flex items-center gap-3 text-primary font-semibold text-sm tracking-wider hover:gap-4 transition-all duration-300"
              >
                <span>Conhecer a historia</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURED PRODUCTS — Horizontal scroll
      ══════════════════════════════════════════ */}
      <section className="py-14 lg:py-20 relative">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary via-[hsl(222,47%,9%)] to-secondary" />

        <div className="relative z-10">
          {/* Header */}
          <div className="max-w-[1400px] mx-auto px-6 sm:px-8 flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-[2px] bg-primary" />
                <p className="text-primary text-[11px] font-semibold tracking-[0.35em] uppercase">Loja</p>
              </div>
              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight">EM DESTAQUE</h2>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              {/* Scroll arrows */}
              <button
                onClick={() => scrollProducts('left')}
                className={`w-10 h-10 border border-white/10 flex items-center justify-center transition-all duration-300 hover:border-primary hover:text-primary active:scale-95 ${
                  canScrollLeft ? 'text-white/50' : 'text-white/10 pointer-events-none'
                }`}
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
              <button
                onClick={() => scrollProducts('right')}
                className={`w-10 h-10 border border-white/10 flex items-center justify-center transition-all duration-300 hover:border-primary hover:text-primary active:scale-95 ${
                  canScrollRight ? 'text-white/50' : 'text-white/10 pointer-events-none'
                }`}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/loja"
                className="ml-4 inline-flex items-center gap-2 text-[13px] font-semibold text-primary tracking-wider hover:gap-3 transition-all duration-300"
              >
                Ver tudo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Horizontal scroll container */}
          <div
            ref={productsRef}
            onScroll={checkScroll}
            className="flex gap-4 overflow-x-auto scrollbar-hide px-6 sm:px-8 pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Left spacer for alignment */}
            <div className="flex-shrink-0 w-[max(0px,calc((100vw-1400px)/2))]" />
            {featuredProducts.map((product, i) => (
              <div key={product.id} className="snap-start">
                <ProductCard product={product} index={i} />
              </div>
            ))}
            {/* Right spacer */}
            <div className="flex-shrink-0 w-6 sm:w-8" />
          </div>

          {/* Mobile: "Ver tudo" link */}
          <div className="sm:hidden text-center mt-8 px-6">
            <Link
              to="/loja"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm tracking-wider"
            >
              Ver tudo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VALUES — Bold numbered statements
      ══════════════════════════════════════════ */}
      <section className="pt-8 lg:pt-10 pb-14 lg:pb-20 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
          <div className="flex items-center gap-3 mb-14">
            <div className="w-6 h-[2px] bg-primary" />
            <p className="text-primary text-[11px] font-semibold tracking-[0.35em] uppercase">O que nos define</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/[0.04]">
            {[
              { title: 'Integridade', desc: 'Na forma como agimos' },
              { title: 'Inovacao', desc: 'Na forma como pensamos' },
              { title: 'Win-Win', desc: 'Na forma como negociamos' },
              { title: 'Paixao', desc: 'Na forma como trabalhamos' },
              { title: 'Confianca', desc: 'Na forma como nos relacionamos' },
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 60, damping: 18 }}
                className="bg-secondary p-6 lg:p-8 group hover:bg-white/[0.02] transition-colors duration-500"
              >
                <span className="font-display text-5xl lg:text-6xl text-white/[0.05] leading-none block mb-4 group-hover:text-primary/15 transition-colors duration-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-2xl text-white leading-none mb-2 tracking-wide">{v.title}</h3>
                <p className="text-[13px] text-white/25 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA — Cinematic gradient with video still
      ══════════════════════════════════════════ */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Background video (muted, subtle) */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-20"
          >
            <source src="/kling.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-secondary via-primary/20 to-secondary" />
        </div>

        {/* Decorative lines */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[40%] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[40%] h-[1px] bg-gradient-to-l from-transparent via-primary/20 to-transparent" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 40, damping: 15 }}
          >
            <h2 className="font-display text-6xl sm:text-8xl lg:text-9xl text-white leading-[0.88] tracking-tight mb-6">
              EQUIPA O TEU
              <br />
              <span className="text-primary">CLUBE</span>
            </h2>
            <p className="text-white/35 max-w-lg mx-auto mb-12 text-lg leading-relaxed">
              Orcamento personalizado para equipamentos sublimados de todas as modalidades.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contactos">
                <span className="group inline-flex items-center gap-3 bg-primary text-white px-10 py-4 font-semibold text-[13px] tracking-[0.2em] hover:bg-primary/85 transition-all duration-300 active:scale-[0.98]">
                  PEDIR ORCAMENTO
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
              <Link to="/loja">
                <span className="inline-block border border-white/15 text-white/70 px-10 py-4 font-semibold text-[13px] tracking-[0.2em] hover:border-white/30 hover:text-white transition-all duration-300 active:scale-[0.98]">
                  VER CATALOGO
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
