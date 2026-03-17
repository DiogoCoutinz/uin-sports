import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/layout/CartSidebar';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const { totalItems, setIsOpen } = useCart();

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
      <CartSidebar />

      {/* Hero banner with inline nav */}
      <section className="relative bg-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")' }} />

        {/* Nav */}
        <div className="relative z-20">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/favicon.png" alt="UIN Sports" className="w-8 h-8 rounded-full" />
              <span className="font-display text-secondary-foreground text-xl tracking-wide">UIN SPORTS</span>
            </Link>

            <div className="flex items-center gap-6">
              <nav className="hidden sm:flex items-center gap-6">
                <Link to="/sobre" className="text-sm font-medium text-secondary-foreground/40 hover:text-primary transition-colors tracking-wide">Sobre</Link>
                <Link to="/loja" className="text-sm font-medium text-secondary-foreground/40 hover:text-primary transition-colors tracking-wide">Loja</Link>
                <Link to="/contactos" className="text-sm font-medium text-primary transition-colors tracking-wide">Contactos</Link>
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

        {/* Title */}
        <div className="relative z-10 container mx-auto px-4 pb-16 pt-12">
          <p className="text-primary text-sm font-semibold tracking-[0.2em] mb-2">FALE CONNOSCO</p>
          <h1 className="font-display text-4xl sm:text-5xl text-secondary-foreground">CONTACTOS</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Info */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-2xl mb-8">COMO NOS ENCONTRAR</h2>
              <div className="space-y-6">
                {[
                  { icon: MapPin, title: 'Morada', lines: ['UIN SPORTS, Lda', 'Av. Irene Lisboa, 19, Pavilhao D - 2', '2635-001 Rio de Mouro', 'Portugal'] },
                  { icon: Phone, title: 'Telefone', lines: ['(+351) 215 968 873', '(Chamada para rede fixa nacional)', '(+351) 910 248 051'] },
                  { icon: Mail, title: 'Email', lines: ['uin.sports@gmail.com'] },
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

      <Footer />
    </div>
  );
}
