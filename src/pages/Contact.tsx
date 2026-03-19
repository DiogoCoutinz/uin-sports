import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/layout/CartSidebar';
import { useState } from 'react';
import { toast } from 'sonner';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('Mensagem enviada com sucesso.');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartSidebar />

      <div className="pt-16">
        {/* Hero with showroom image */}
        <div className="relative bg-secondary overflow-hidden">
          <img
            src="/image.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 to-secondary" />

          <div className="relative z-10 max-w-[1320px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <p className="text-white/20 text-[11px] font-medium tracking-[0.3em] uppercase mb-4">
                Fale connosco
              </p>
              <h1 className="font-display text-3xl sm:text-4xl text-white mb-3">
                Contactos
              </h1>
              <p className="text-white/30 text-[15px] max-w-md">
                Tem um projecto em mente? Fale connosco — orçamento sem compromisso.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <section className="py-16 lg:py-24">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20">
              {/* Info — narrower */}
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
              >
                <div className="space-y-8">
                  {[
                    {
                      icon: MapPin,
                      title: 'Morada',
                      lines: ['Av. Irene Lisboa, 19', 'Pavilhão D - 2', '2635-001 Rio de Mouro'],
                    },
                    {
                      icon: Phone,
                      title: 'Telefone',
                      lines: ['(+351) 215 968 873', '(+351) 910 248 051'],
                    },
                    {
                      icon: Mail,
                      title: 'Email',
                      lines: ['uin.sports@gmail.com'],
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">{item.title}</p>
                        {item.lines.map((line, j) => (
                          <p key={j} className="text-sm text-muted-foreground">{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Form — wider */}
              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease }}
              >
                <div className="bg-muted/40 rounded-2xl p-8">
                  <h3 className="font-display text-lg mb-6">Envie-nos uma mensagem</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input placeholder="Nome" required className="rounded-lg" />
                      <Input placeholder="Email" type="email" required className="rounded-lg" />
                    </div>
                    <Input placeholder="Clube / Empresa" className="rounded-lg" />
                    <Textarea placeholder="A sua mensagem..." rows={4} required className="rounded-lg" />
                    <Button
                      type="submit"
                      className="w-full bg-foreground text-background hover:bg-foreground/90 font-medium rounded-full h-11"
                      disabled={loading}
                    >
                      {loading ? 'A enviar...' : 'Enviar mensagem'}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
