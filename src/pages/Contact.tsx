import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/layout/CartSidebar';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('Mensagem enviada com sucesso!');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartSidebar />

      <div className="pt-16">
        <div className="bg-secondary py-16">
          <div className="container mx-auto px-4">
            <p className="text-primary text-sm font-semibold tracking-[0.2em] mb-2">FALE CONNOSCO</p>
            <h1 className="font-display text-4xl sm:text-5xl text-secondary-foreground">CONTACTOS</h1>
          </div>
        </div>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Info */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="font-display text-2xl mb-8">COMO NOS ENCONTRAR</h2>
                <div className="space-y-6">
                  {[
                    { icon: MapPin, title: 'Morada', lines: ['Rua da Indústria, 123', '4050-250 Porto, Portugal'] },
                    { icon: Phone, title: 'Telefone', lines: ['+351 220 123 456', '+351 912 345 678'] },
                    { icon: Mail, title: 'Email', lines: ['geral@uinsports.pt', 'comercial@uinsports.pt'] },
                    { icon: Clock, title: 'Horário', lines: ['Seg-Sex: 09:00 - 18:00', 'Sáb: 09:00 - 13:00'] },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{item.title}</p>
                        {item.lines.map((line, j) => (
                          <p key={j} className="text-sm text-muted-foreground">{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Form */}
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="bg-muted/50 rounded-2xl p-8">
                  <h3 className="font-display text-xl mb-6">ENVIE-NOS UMA MENSAGEM</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input placeholder="Nome" required />
                      <Input placeholder="Email" type="email" required />
                    </div>
                    <Input placeholder="Assunto" required />
                    <Input placeholder="Clube / Empresa" />
                    <Textarea placeholder="A sua mensagem..." rows={5} required />
                    <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold" disabled={loading}>
                      {loading ? 'A enviar...' : 'Enviar Mensagem'}
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
