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
        <div className="bg-secondary py-20">
          <div className="container mx-auto px-4">
            <p className="text-primary text-sm font-semibold tracking-[0.2em] mb-2">SOBRE NÓS</p>
            <h1 className="font-display text-4xl sm:text-6xl text-secondary-foreground leading-tight">
              COMO TUDO<br /><span className="text-primary">COMEÇOU</span>
            </h1>
          </div>
        </div>

        {/* Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-2xl sm:text-3xl mb-6">
                  PARA CADA MARCA<br />HÁ UM <span className="text-primary">HERÓI</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    A UIN SPORTS nasceu em 2013, através do espírito jovem e empreendedor dos seus fundadores. É uma empresa jovem de cariz irreverente e inovador, que pretende marcar a diferença no sector apostando na comercialização e distribuição de artigos desportivos da mais alta qualidade e aos melhores preços do mercado.
                  </p>
                  <p>
                    Dispomos das mais recentes tecnologias para a fabricação de equipamentos desportivos para todas as modalidades, onde destacamos o fabrico de equipamentos sublimados.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="bg-muted/50 rounded-2xl p-8 h-full flex flex-col justify-center">
                  <h3 className="font-display text-xl mb-4">LOJA ONLINE</h3>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
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
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-primary text-sm font-semibold tracking-[0.2em] mb-2">OS NOSSOS VALORES</p>
              <h2 className="font-display text-3xl sm:text-4xl text-secondary-foreground">O QUE NOS DEFINE</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { icon: Shield, title: 'INTEGRIDADE', desc: 'Na forma como agimos' },
                { icon: Zap, title: 'INOVAÇÃO', desc: 'Na forma como pensamos' },
                { icon: Users, title: 'POLÍTICA WIN-WIN', desc: 'Na forma como negociamos' },
                { icon: Trophy, title: 'PAIXÃO', desc: 'Na forma como trabalhamos' },
                { icon: Star, title: 'CONFIANÇA', desc: 'Na forma como nos relacionamos' },
              ].map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-8 rounded-xl bg-secondary-foreground/5 hover:bg-primary/10 transition-colors"
                >
                  <v.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-display text-sm text-secondary-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-secondary-foreground/60">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="font-display text-3xl sm:text-4xl text-primary-foreground mb-6">A NOSSA MISSÃO</h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Em conjunto com todos os Fornecedores, Clientes e Colaboradores, pretendemos que a UIN SPORTS se torne um nome de referência e confiança no mercado de equipamentos desportivos.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
