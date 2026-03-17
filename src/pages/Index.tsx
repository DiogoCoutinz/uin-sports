import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { products, clubs } from '@/data/mockData';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/layout/CartSidebar';
import { useCart } from '@/contexts/CartContext';
import { useRef } from 'react';

function ClubMarquee() {
  const names = clubs.map(c => c.name);
  const doubled = [...names, ...names];

  return (
    <div className="overflow-hidden py-5 bg-secondary border-y border-white/[0.04]">
      <div className="flex gap-10 whitespace-nowrap animate-marquee w-max">
        {doubled.map((name, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-[1.75rem] text-secondary-foreground/15 uppercase tracking-wide">
              {name}
            </span>
            <span className="text-secondary-foreground/10 text-xs">&#9670;</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: typeof products[0] }) {
  return (
    <Link to={`/produto/${product.id}`} className="group block relative overflow-hidden h-full">
      <div className="relative overflow-hidden bg-muted aspect-[3/4] h-full">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-white/50 text-xs font-medium tracking-wider uppercase mb-1">{product.clubName}</p>
          <p className="text-white font-medium">{product.name}</p>
          <p className="text-white font-display text-2xl mt-1">{product.price.toFixed(2)}€</p>
        </div>
      </div>
    </Link>
  );
}

export default function Index() {
  const featuredProducts = products.filter(p => p.id !== 'p4').slice(0, 4);
  const { totalItems, setIsOpen } = useCart();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="min-h-screen bg-background">
      <CartSidebar />

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-end bg-secondary overflow-hidden">
        {/* subtle noise */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")' }} />

        {/* ── Floating nav ── */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/favicon.png" alt="UIN Sports" className="w-8 h-8 rounded-full" />
              <span className="font-display text-secondary-foreground text-xl tracking-wide">UIN SPORTS</span>
            </Link>

            <div className="flex items-center gap-6">
              <nav className="hidden sm:flex items-center gap-6">
                <Link to="/sobre" className="text-sm font-medium text-secondary-foreground/40 hover:text-primary transition-colors tracking-wide">Sobre</Link>
                <Link to="/loja" className="text-sm font-medium text-secondary-foreground/40 hover:text-primary transition-colors tracking-wide">Loja</Link>
                <Link to="/contactos" className="text-sm font-medium text-secondary-foreground/40 hover:text-primary transition-colors tracking-wide">Contactos</Link>
              </nav>
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-secondary-foreground/40 hover:text-primary transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 container mx-auto px-4 pb-16 pt-32">
          <p className="text-primary text-sm font-semibold tracking-[0.35em] mb-8 uppercase">
            Equipamentos desportivos
          </p>
          <h1 className="font-display text-[clamp(3.5rem,11vw,13rem)] leading-[0.88] text-secondary-foreground mb-10">
            PARA CADA<br />
            MARCA, HÁ<br />
            UM HERÓI.
          </h1>
          <div className="w-12 h-px bg-primary mb-8" />
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/loja">
              <span className="inline-block bg-primary text-primary-foreground px-8 py-4 font-semibold text-sm tracking-widest hover:bg-primary/85 transition-colors">
                EXPLORAR LOJA
              </span>
            </Link>
            <Link to="/contactos">
              <span className="inline-block border border-secondary-foreground/15 text-secondary-foreground px-8 py-4 font-semibold text-sm tracking-widest hover:border-secondary-foreground/35 transition-colors">
                PEDIR ORÇAMENTO
              </span>
            </Link>
          </div>

          {/* floating stats — desktop only */}
          <div className="hidden lg:flex absolute bottom-16 right-8 gap-14">
            {[
              { value: '200+', label: 'Clubes' },
              { value: '10K+', label: 'Equipamentos' },
              { value: '12', label: 'Anos' },
            ].map((s, i) => (
              <div key={i} className="text-right">
                <p className="font-display text-4xl text-secondary-foreground leading-none">{s.value}</p>
                <p className="text-[11px] text-secondary-foreground/35 tracking-widest uppercase mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Mobile Stats ── */}
      <div className="lg:hidden bg-secondary border-b border-white/[0.04]">
        <div className="container mx-auto px-4 py-6 grid grid-cols-3 gap-4 text-center">
          {[
            { value: '200+', label: 'Clubes' },
            { value: '10K+', label: 'Equipamentos' },
            { value: '12', label: 'Anos' },
          ].map((s, i) => (
            <div key={i}>
              <p className="font-display text-3xl text-secondary-foreground leading-none">{s.value}</p>
              <p className="text-[11px] text-secondary-foreground/35 tracking-widest uppercase mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Club Marquee ── */}
      <ClubMarquee />

      {/* ── About Teaser ── */}
      <section className="relative py-32 overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src="/about-bg.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
        </div>

        {/* Diagonal accent stripe */}
        <div className="absolute -left-20 top-0 bottom-0 w-40 bg-primary/10 rotate-[8deg] blur-sm" />
        <div className="absolute -right-20 top-0 bottom-0 w-24 bg-primary/5 -rotate-[5deg] blur-sm" />

        <div className="relative z-10 container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-primary text-sm font-bold tracking-[0.3em] mb-6">DESDE 2013</p>
              <h2 className="font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.85] text-white mb-8">
                NASCEMOS<br />
                <span className="text-primary">PARA EQUIPAR</span><br />
                HEROIS
              </h2>
              <div className="w-16 h-1 bg-primary" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <p className="text-white/80 leading-relaxed text-xl mb-5">
                Fabricamos e distribuimos equipamentos desportivos sublimados da mais alta qualidade para clubes em Portugal, Africa e PALOP.
              </p>
              <p className="text-white/50 leading-relaxed text-lg mb-10">
                Uma equipa com anos de experiencia no sector, apostada na inovacao e na excelencia. Dispomos das mais recentes tecnologias para a fabricacao de equipamentos para todas as modalidades.
              </p>
              <Link to="/sobre" className="inline-flex items-center gap-3 text-primary font-bold text-base tracking-wide hover:gap-4 transition-all group">
                Conhecer a historia
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-24 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-primary text-sm font-semibold tracking-[0.25em] mb-2">LOJA</p>
              <h2 className="font-display text-5xl sm:text-6xl">EM DESTAQUE</h2>
            </div>
            <Link to="/loja" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
              Ver tudo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="sm:hidden text-center mt-8">
            <Link to="/loja" className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
              Ver tudo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <p className="text-primary text-sm font-semibold tracking-[0.25em] mb-10">O QUE NOS DEFINE</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-6">
            {[
              { title: 'Integridade', desc: 'Na forma como agimos' },
              { title: 'Inovação', desc: 'Na forma como pensamos' },
              { title: 'Win-Win', desc: 'Na forma como negociamos' },
              { title: 'Paixão', desc: 'Na forma como trabalhamos' },
              { title: 'Confiança', desc: 'Na forma como nos relacionamos' },
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="pl-4 border-l-2 border-primary/25"
              >
                <h3 className="font-display text-2xl text-secondary-foreground leading-none mb-2">{v.title}</h3>
                <p className="text-sm text-secondary-foreground/35">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA with gradient ── */}
      <section
        className="relative py-36 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, hsl(222 47% 11%) 0%, hsl(222 47% 11%) 8%, hsl(325 68% 40%) 50%, hsl(222 47% 11%) 92%, hsl(222 47% 11%) 100%)' }}
      >

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-5xl sm:text-7xl text-white leading-[0.9] mb-6">
              EQUIPA O TEU CLUBE
            </h2>
            <p className="text-white/50 max-w-lg mx-auto mb-10 text-lg">
              Orcamento personalizado para equipamentos sublimados de todas as modalidades.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contactos">
                <span className="inline-block bg-white text-primary px-8 py-4 font-semibold text-sm tracking-widest hover:bg-white/90 transition-colors">
                  PEDIR ORCAMENTO
                </span>
              </Link>
              <Link to="/loja">
                <span className="inline-block border border-white/25 text-white px-8 py-4 font-semibold text-sm tracking-widest hover:border-white/50 transition-colors">
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
