import { motion } from 'framer-motion';
import { Shield, Zap, Trophy, Users, Star } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/layout/CartSidebar';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartSidebar />

      <div className="pt-16">
        {/* Hero */}
        <div className="bg-secondary py-24">
          <div className="container mx-auto px-4">
            <p className="text-primary text-sm font-semibold tracking-[0.25em] mb-4">SOBRE NÓS</p>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-secondary-foreground leading-[0.9]">
              COMO TUDO<br /><span className="text-primary">COMEÇOU</span>
            </h1>
          </div>
        </div>

        {/* Story */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <motion.div
                className="lg:col-span-5"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-4xl sm:text-5xl leading-[0.9] mb-6">
                  PARA CADA MARCA<br />HÁ UM <span className="text-primary">HERÓI</span>
                </h2>
              </motion.div>

              <motion.div
                className="lg:col-span-6 lg:col-start-7"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  <p>
                    A UIN SPORTS nasceu em 2013, através do espírito jovem e empreendedor dos seus fundadores. É uma empresa jovem de cariz irreverente e inovador, que pretende marcar a diferença no sector apostando na comercialização e distribuição de artigos desportivos da mais alta qualidade e aos melhores preços do mercado.
                  </p>
                  <p>
                    Dispomos das mais recentes tecnologias para a fabricação de equipamentos desportivos para todas as modalidades, onde destacamos o fabrico de equipamentos sublimados.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="mt-20 pl-0 lg:pl-[calc(41.666%+2.5rem)]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border-l-2 border-primary/25 pl-6"
              >
                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  <p>
                    A sua equipa de trabalho é constituída por profissionais com anos de experiência no sector do desporto, para garantir uma política de rigor e excelência, mas também por profissionais de outras áreas, que nos tragam outra visão e criatividade.
                  </p>
                  <p>
                    A área de atuação é Nacional e Internacional, pois distribuímos em exclusivo para Portugal, África e todos os Países dos PALOP.
                  </p>
                  <p>
                    O principal objetivo da empresa é a satisfação do cliente mais exigente, garantindo que equipamentos inovadores e de elevada qualidade cheguem aos nossos clientes nas melhores condições de mercado.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <p className="text-primary text-sm font-semibold tracking-[0.25em] mb-10">O QUE NOS DEFINE</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-6">
              {[
                { icon: Shield, title: 'Integridade', desc: 'Na forma como agimos' },
                { icon: Zap, title: 'Inovação', desc: 'Na forma como pensamos' },
                { icon: Users, title: 'Win-Win', desc: 'Na forma como negociamos' },
                { icon: Trophy, title: 'Paixão', desc: 'Na forma como trabalhamos' },
                { icon: Star, title: 'Confiança', desc: 'Na forma como nos relacionamos' },
              ].map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="pl-4 border-l-2 border-primary/25"
                >
                  <v.icon className="w-5 h-5 text-primary mb-3" />
                  <h3 className="font-display text-2xl text-secondary-foreground leading-none mb-2">{v.title}</h3>
                  <p className="text-sm text-secondary-foreground/35">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-24 bg-primary">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="font-display text-5xl sm:text-6xl text-primary-foreground leading-[0.9] mb-8">A NOSSA MISSÃO</h2>
            <p className="text-primary-foreground/60 text-lg leading-relaxed">
              Em conjunto com todos os Fornecedores, Clientes e Colaboradores, pretendemos que a UIN SPORTS se torne um nome de referência e confiança no mercado de equipamentos desportivos.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
