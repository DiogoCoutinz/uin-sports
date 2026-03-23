import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ShoppingCart, Menu } from 'lucide-react';
import { products } from '@/data/mockData';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/layout/CartSidebar';
import { useCart } from '@/contexts/CartContext';
import ScrollReveal from '@/components/ScrollReveal';
import { useRef, useState } from 'react';

const ease = [0.16, 1, 0.3, 1] as const;

/* ── Product card ── */
function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease }}
    >
      <Link to={`/produto/${product.id}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl bg-white/[0.03]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-[3/4] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100">
            <span className="bg-white text-secondary px-5 py-2.5 text-[11px] font-semibold tracking-[0.08em] rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
              Ver produto
            </span>
          </div>
        </div>
        <div className="pt-4">
          <p className="text-[10px] tracking-[0.2em] text-white/20 uppercase font-medium">
            {product.clubName}
          </p>
          <h3 className="text-white/70 text-[15px] mt-1 leading-snug group-hover:text-white transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-white/35 text-sm mt-2 tabular-nums">
            {product.price.toFixed(2)} €
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Main page ── */
export default function Index() {
  const featured = products.slice(0, 4);
  const { totalItems, setIsOpen } = useCart();
  const [mobileNav, setMobileNav] = useState(false);

  /* Showroom parallax */
  const showroomRef = useRef<HTMLElement>(null);
  const { scrollYProgress: showroomP } = useScroll({ target: showroomRef, offset: ['start end', 'end start'] });
  const showroomImgY = useTransform(showroomP, [0, 1], [-30, 30]);

  return (
    <div className="bg-secondary text-white">
      <CartSidebar />

      {/* ═══════════════════════════════════════════════
          FIXED NAV — always on top
      ═══════════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/image_copy-removebg-preview.png" alt="UIN Sports" className="h-10" />
            <span className="font-display text-white text-sm tracking-[0.06em]">SPORTS</span>
          </Link>
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-8">
              {[{ label: 'Sobre', href: '/sobre' }, { label: 'Loja', href: '/loja' }, { label: 'Contactos', href: '/contactos' }].map(l => (
                <Link key={l.href} to={l.href} className="text-[13px] text-white/40 hover:text-white transition-colors duration-300 tracking-wide">{l.label}</Link>
              ))}
            </nav>
            <button onClick={() => setIsOpen(true)} className="relative p-2 text-white/40 hover:text-white transition-colors">
              <ShoppingCart className="w-[18px] h-[18px]" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-white text-secondary text-[9px] font-bold rounded-full flex items-center justify-center">{totalItems}</span>
              )}
            </button>
            <button onClick={() => setMobileNav(!mobileNav)} className="md:hidden p-2 text-white/40"><Menu className="w-5 h-5" /></button>
          </div>
        </div>
        {mobileNav && (
          <div className="md:hidden border-t border-white/[0.06] bg-secondary/95 backdrop-blur-xl">
            <nav className="max-w-[1400px] mx-auto px-6 py-5 flex flex-col gap-4">
              {[{ label: 'Sobre', href: '/sobre' }, { label: 'Loja', href: '/loja' }, { label: 'Contactos', href: '/contactos' }].map(l => (
                <Link key={l.href} to={l.href} onClick={() => setMobileNav(false)} className="text-sm text-white/50 hover:text-white transition-colors">{l.label}</Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ═══════════════════════════════════════════════
          SCROLL REVEAL — cinematic dolly-in (IS the hero)
      ═══════════════════════════════════════════════ */}
      <ScrollReveal />

      {/* ═══════════════════════════════════════════════
          CAPABILITIES — flat-lay image + text side by side
      ═══════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease }}
              className="relative"
            >
              <img
                src="/1773934771998-mc9pymd9il8.jpg"
                alt="Processo de design — camisolas sublimadas e paletas de cor"
                className="w-full rounded-2xl"
              />
              <div className="absolute -inset-4 bg-white/[0.02] rounded-3xl -z-10 blur-2xl" />
            </motion.div>

            {/* Text + features */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-[2px] bg-white/15" />
                <p className="text-white/20 text-[11px] font-medium tracking-[0.3em] uppercase">O que fazemos</p>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl leading-[1.05] tracking-tight mb-10">
                Do conceito à entrega,
                <br />
                <span className="text-white/40">tratamos de tudo.</span>
              </h2>

              <div className="space-y-8">
                {[
                  {
                    num: '01',
                    title: 'Sublimação personalizada',
                    desc: 'Cada equipamento é desenhado de raiz. Cores, padrões e identidade do clube — sem limites criativos.',
                  },
                  {
                    num: '02',
                    title: 'Todas as modalidades',
                    desc: 'Futebol, futsal, basquetebol, andebol e mais. Camisolas, calções, fatos de treino e acessórios.',
                  },
                  {
                    num: '03',
                    title: 'Presença internacional',
                    desc: 'Distribuição exclusiva para Portugal e todos os PALOP. De Lisboa a Luanda, Coimbra a Cabo Verde.',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.12, duration: 0.6, ease }}
                    className="flex gap-5"
                  >
                    <span className="font-display text-lg text-white/8 leading-none mt-0.5 flex-shrink-0">
                      {item.num}
                    </span>
                    <div>
                      <h3 className="font-display text-[15px] text-white/80 mb-1.5">{item.title}</h3>
                      <p className="text-[14px] text-white/25 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PRODUCTS — featured grid
      ═══════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-14">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-[2px] bg-white/15" />
                <p className="text-white/20 text-[11px] font-medium tracking-[0.3em] uppercase">Loja</p>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl tracking-tight">Em destaque</h2>
            </motion.div>
            <Link to="/loja" className="hidden sm:inline-flex items-center gap-2 text-[13px] text-white/25 hover:text-white transition-colors duration-300">
              Ver tudo <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="sm:hidden text-center mt-12">
            <Link to="/loja" className="text-white/35 text-sm inline-flex items-center gap-2 hover:text-white transition-colors">
              Ver todos os produtos <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SHOWROOM — full-width parallax image
      ═══════════════════════════════════════════════ */}
      <section ref={showroomRef} className="relative h-[55vh] lg:h-[70vh] overflow-hidden">
        <motion.div style={{ y: showroomImgY }} className="absolute inset-0 -top-12 -bottom-12">
          <img src="/image.png" alt="Showroom UIN Sports — Rio de Mouro" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 via-secondary/40 to-secondary/60" />
        </motion.div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="max-w-md"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-[2px] bg-white/20" />
                <p className="text-white/25 text-[11px] font-medium tracking-[0.3em] uppercase">O nosso espaço</p>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl text-white leading-tight mb-4">
                Venha conhecer
                <br />
                o showroom.
              </h2>
              <p className="text-white/30 text-[15px] leading-relaxed mb-6">
                Equipamento, material de treino e tudo o que precisa — tudo num só espaço em Rio de Mouro.
              </p>
              <Link to="/contactos">
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/80 px-5 py-2.5 text-[12px] font-medium tracking-wide rounded-full hover:bg-white/20 transition-colors duration-300 border border-white/10">
                  Como chegar <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          NIGHT GAME — atmospheric
      ═══════════════════════════════════════════════ */}
      <section className="relative h-[40vh] lg:h-[50vh] overflow-hidden">
        <img src="/about-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/30 to-secondary/50" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="text-white/20 text-[11px] font-medium tracking-[0.3em] uppercase mb-5">Desde 2013</p>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.05] tracking-tight max-w-3xl mx-auto">
              Onde há competição,
              <br />
              <span className="text-white/40">há UIN Sports.</span>
            </h2>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          VALUES — redesigned with more visual presence
      ═══════════════════════════════════════════════ */}
      <section className="py-28 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[2px] bg-white/15" />
              <p className="text-white/20 text-[11px] font-medium tracking-[0.3em] uppercase">Os nossos valores</p>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl tracking-tight">
              O que nos define.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { title: 'Integridade', desc: 'Transparência e honestidade em cada interacção com clientes e parceiros.', highlight: true },
              { title: 'Inovação', desc: 'Investimos nas melhores tecnologias de sublimação e processos de fabrico.', highlight: false },
              { title: 'Win-Win', desc: 'Relações duradouras onde cada parte sai sempre a ganhar.', highlight: false },
              { title: 'Paixão', desc: 'Pelo desporto, pela qualidade e por quem veste os nossos equipamentos.', highlight: true },
              { title: 'Confiança', desc: 'Construída ao longo de 12 anos, projecto a projecto, entrega a entrega.', highlight: false },
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease }}
                className={`rounded-2xl p-7 lg:p-8 border transition-colors duration-500 ${
                  v.highlight
                    ? 'bg-white/[0.04] border-white/[0.08]'
                    : 'bg-transparent border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.02]'
                }`}
              >
                <span className="font-display text-3xl text-white/[0.05] leading-none block mb-4">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-base text-white/80 mb-2">{v.title}</h3>
                <p className="text-[13px] text-white/25 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA — bold
      ═══════════════════════════════════════════════ */}
      <section className="py-32 lg:py-40 border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
            >
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.05] tracking-tight mb-5">
                Pronto para equipar
                <br />
                <span className="text-white/40">o teu clube?</span>
              </h2>
              <p className="text-white/25 max-w-md mb-10 leading-relaxed text-[15px]">
                Orçamento personalizado, sem compromisso. Do design à entrega, tratamos de tudo.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/contactos">
                  <span className="group inline-flex items-center gap-2.5 bg-white text-secondary px-8 py-4 text-[12px] font-semibold tracking-[0.06em] rounded-full hover:bg-white/90 transition-colors duration-300">
                    Pedir orçamento
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </Link>
                <Link to="/loja">
                  <span className="inline-flex items-center border border-white/12 text-white/40 px-8 py-4 text-[12px] font-semibold tracking-[0.06em] rounded-full hover:border-white/25 hover:text-white transition-all duration-300">
                    Ver catálogo
                  </span>
                </Link>
              </div>
            </motion.div>

            {/* Jersey image on right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="hidden lg:flex justify-end"
            >
              <img
                src="/kick.png"
                alt="Jogador UIN Sports"
                className="w-[400px] rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
