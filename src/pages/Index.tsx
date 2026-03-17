import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Trophy, Users, Star } from 'lucide-react';
import { products, clubs } from '@/data/mockData';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/layout/CartSidebar';

export default function Index() {
  const featuredProducts = products.slice(0, 4);
  const featuredClubs = clubs.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartSidebar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-secondary">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary/20" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary text-sm font-semibold tracking-[0.3em] mb-4">EQUIPAMENTOS DESPORTIVOS DE EXCELÊNCIA</p>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-8xl text-secondary-foreground leading-[0.9] mb-6">
              PARA CADA<br />
              MARCA, HÁ<br />
              <span className="text-primary">UM HERÓI</span>
            </h1>
            <p className="text-secondary-foreground/60 max-w-md mx-auto text-lg mb-8">
              Fabricamos e distribuímos equipamentos desportivos sublimados da mais alta qualidade para clubes em Portugal, África e PALOP.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/loja">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-accent text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 mx-auto sm:mx-0"
                >
                  Explorar Loja <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/sobre">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-secondary-foreground/20 text-secondary-foreground px-8 py-4 rounded-lg font-semibold text-lg mx-auto sm:mx-0"
                >
                  Sobre Nós
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-6 h-10 border-2 border-secondary-foreground/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-6">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '200+', label: 'Clubes Parceiros' },
            { value: '10K+', label: 'Equipamentos/Ano' },
            { value: '9', label: 'Países' },
            { value: '12', label: 'Anos de Experiência' },
          ].map((s, i) => (
            <div key={i}>
              <p className="font-display text-2xl sm:text-3xl text-primary-foreground">{s.value}</p>
              <p className="text-primary-foreground/70 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Clubs */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-semibold tracking-[0.2em] mb-2">OS NOSSOS PARCEIROS</p>
            <h2 className="font-display text-3xl sm:text-4xl">CLUBES EM DESTAQUE</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {featuredClubs.map((club, i) => (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-2 p-6 rounded-xl bg-muted/50 hover:bg-primary/10 transition-colors min-w-[140px]"
              >
                <span className="text-4xl">{club.logo}</span>
                <span className="text-sm font-semibold text-center">{club.name}</span>
                <span className="text-xs text-muted-foreground">{club.location}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-primary text-sm font-semibold tracking-[0.2em] mb-2">LOJA ONLINE</p>
              <h2 className="font-display text-3xl sm:text-4xl">PRODUTOS EM DESTAQUE</h2>
            </div>
            <Link to="/loja" className="hidden sm:flex items-center gap-1 text-primary font-semibold text-sm hover:gap-2 transition-all">
              Ver Todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/produto/${product.id}`} className="group block">
                  <div className="relative overflow-hidden rounded-xl bg-muted aspect-[4/5]">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-secondary-foreground text-sm font-semibold">Ver Detalhes →</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-primary font-semibold">{product.clubName}</p>
                    <p className="font-semibold mt-1">{product.name}</p>
                    <p className="text-lg font-display text-primary mt-1">{product.price.toFixed(2)}€</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="sm:hidden text-center mt-8">
            <Link to="/loja" className="inline-flex items-center gap-1 text-primary font-semibold">
              Ver Todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why UIN */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-semibold tracking-[0.2em] mb-2">PORQUÊ A UIN SPORTS</p>
            <h2 className="font-display text-3xl sm:text-4xl text-secondary-foreground">OS NOSSOS VALORES</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: Shield, title: 'Integridade', desc: 'Na forma como agimos' },
              { icon: Zap, title: 'Inovação', desc: 'Na forma como pensamos' },
              { icon: Users, title: 'Win-Win', desc: 'Na forma como negociamos' },
              { icon: Trophy, title: 'Paixão', desc: 'Na forma como trabalhamos' },
              { icon: Star, title: 'Confiança', desc: 'Na forma como nos relacionamos' },
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-xl bg-secondary-foreground/5 hover:bg-primary/10 transition-colors"
              >
                <v.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-display text-sm text-secondary-foreground mb-1">{v.title}</h3>
                <p className="text-xs text-secondary-foreground/60">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-primary-foreground mb-4">PRONTO PARA EQUIPAR O SEU CLUBE?</h2>
          <p className="text-primary-foreground/70 max-w-md mx-auto mb-8">
            Peça já o seu orçamento personalizado. Fabricamos equipamentos sublimados para todas as modalidades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contactos">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                Pedir Orçamento
              </Button>
            </Link>
            <Link to="/loja">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Ver Catálogo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
