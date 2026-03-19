import { motion } from 'framer-motion';
import { Shield, Zap, Trophy, Users, Star } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/layout/CartSidebar';

const ease = [0.16, 1, 0.3, 1] as const;

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartSidebar />

      <div className="pt-16">
        {/* Hero with background image */}
        <div className="relative bg-secondary overflow-hidden">
          <img
            src="/about-bg.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-secondary" />

          <div className="relative z-10 max-w-[1320px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <p className="text-white/20 text-[11px] font-medium tracking-[0.3em] uppercase mb-4">
                Desde 2013
              </p>
              <h1 className="font-display text-4xl sm:text-5xl text-white leading-tight max-w-lg">
                Como tudo começou.
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Story */}
        <section className="py-20 lg:py-28">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <motion.div
                className="lg:col-span-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease }}
              >
                <h2 className="font-display text-2xl sm:text-3xl leading-tight mb-6">
                  Para cada marca,
                  <br />
                  há um herói.
                </h2>
              </motion.div>

              <motion.div
                className="lg:col-span-6 lg:col-start-7"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease }}
              >
                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  <p>
                    A UIN Sports nasceu em 2013, impulsionada pelo espírito empreendedor dos seus fundadores. Somos uma empresa jovem, irreverente e inovadora, que quer marcar a diferença no sector — apostando na comercialização e distribuição de artigos desportivos da mais alta qualidade, aos melhores preços do mercado.
                  </p>
                  <p>
                    Dispomos das mais recentes tecnologias para a fabricação de equipamentos desportivos para todas as modalidades, com destaque para o fabrico de equipamentos sublimados — onde cada peça é única e personalizada.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="mt-16 lg:mt-20 pl-0 lg:pl-[calc(41.666%+2.5rem)]">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="border-l-2 border-border pl-6"
              >
                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  <p>
                    A nossa equipa combina profissionais com anos de experiência no sector desportivo com talentos de outras áreas, trazendo criatividade e uma visão diferente ao que fazemos.
                  </p>
                  <p>
                    Atuamos a nível nacional e internacional, distribuindo em exclusivo para Portugal, África e todos os países dos PALOP — de Lisboa a Luanda, de Coimbra a Cabo Verde.
                  </p>
                  <p>
                    O nosso objectivo é simples: garantir que equipamentos inovadores e de elevada qualidade chegam a cada clube nas melhores condições possíveis.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Showroom */}
        <section className="relative h-[45vh] lg:h-[55vh] overflow-hidden">
          <img
            src="/image.png"
            alt="Showroom UIN Sports"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/70 via-secondary/30 to-secondary/50" />
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
              >
                <p className="text-white/25 text-[11px] font-medium tracking-[0.3em] uppercase mb-3">Showroom</p>
                <h2 className="font-display text-3xl text-white leading-tight mb-3">
                  Venha conhecer o nosso espaço.
                </h2>
                <p className="text-white/35 text-sm max-w-sm">
                  Av. Irene Lisboa, 19, Pavilhão D-2 · Rio de Mouro, Portugal
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 lg:py-28 bg-secondary">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <p className="text-white/20 text-[11px] font-medium tracking-[0.3em] uppercase mb-12">
              O que nos define
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-6">
              {[
                { icon: Shield, title: 'Integridade', desc: 'Na forma como agimos com cada cliente e parceiro.' },
                { icon: Zap, title: 'Inovação', desc: 'Nas tecnologias e processos que aplicamos todos os dias.' },
                { icon: Users, title: 'Win-Win', desc: 'Em cada negociação, todas as partes saem a ganhar.' },
                { icon: Trophy, title: 'Paixão', desc: 'Pelo desporto e por quem o pratica, sem excepção.' },
                { icon: Star, title: 'Confiança', desc: 'Construída projecto a projecto, entrega a entrega.' },
              ].map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="border-t border-white/[0.06] pt-5"
                >
                  <v.icon className="w-4 h-4 text-white/25 mb-4" />
                  <h3 className="font-display text-[15px] text-white/70 mb-1.5">{v.title}</h3>
                  <p className="text-[13px] text-white/20 leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 lg:py-28">
          <div className="max-w-2xl mx-auto px-6 lg:px-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <p className="text-muted-foreground text-[11px] font-medium tracking-[0.3em] uppercase mb-6">
                A nossa missão
              </p>
              <h2 className="font-display text-2xl sm:text-3xl leading-tight mb-8">
                Tornar a UIN Sports um nome de referência no mercado de equipamentos desportivos.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Em conjunto com todos os fornecedores, clientes e colaboradores, trabalhamos para que cada clube, independentemente da sua dimensão, tenha acesso a equipamentos à altura da sua ambição.
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
