import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Contactos */}
          <div>
            <h4 className="font-display text-sm mb-4 tracking-wider">CONTACTOS</h4>
            <div className="space-y-2 text-sm text-secondary-foreground/60">
              <p>Rua da Indústria, 123</p>
              <p>4050-250 Porto, Portugal</p>
              <p className="pt-2">+351 220 123 456</p>
              <p>+351 912 345 678</p>
              <p className="pt-2">geral@uinsports.pt</p>
            </div>
          </div>

          {/* Ajuda */}
          <div>
            <h4 className="font-display text-sm mb-4 tracking-wider">AJUDA E CONDIÇÕES</h4>
            <div className="space-y-2 text-sm text-secondary-foreground/60">
              <p className="hover:text-primary cursor-pointer transition-colors">Termos e Condições</p>
              <p className="hover:text-primary cursor-pointer transition-colors">Política de Privacidade</p>
              <p className="hover:text-primary cursor-pointer transition-colors">Política de Devoluções</p>
              <p className="hover:text-primary cursor-pointer transition-colors">FAQ</p>
              <p className="hover:text-primary cursor-pointer transition-colors">Livro de Reclamações</p>
            </div>
          </div>

          {/* UIN Sports */}
          <div>
            <h4 className="font-display text-sm mb-4 tracking-wider">UIN SPORTS</h4>
            <div className="space-y-2 text-sm text-secondary-foreground/60">
              <Link to="/sobre" className="block hover:text-primary transition-colors">Sobre Nós</Link>
              <Link to="/loja" className="block hover:text-primary transition-colors">Loja Online</Link>
              <Link to="/contactos" className="block hover:text-primary transition-colors">Contactos</Link>
              <p className="hover:text-primary cursor-pointer transition-colors">Revenda</p>
              <p className="hover:text-primary cursor-pointer transition-colors">Notícias</p>
            </div>
          </div>

          {/* Social */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-primary-foreground font-display text-xs">U</span>
              </div>
              <span className="font-display text-sm tracking-wider">UIN SPORTS</span>
            </div>
            <p className="text-sm text-secondary-foreground/60 mb-4">Somos Sociais</p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                <div key={i} className="w-9 h-9 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                  <Icon className="w-4 h-4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-secondary-foreground/40">
            © 2025 UIN Sports. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-3 text-xs text-secondary-foreground/40">
            <span className="px-2 py-1 border border-secondary-foreground/20 rounded">VISA</span>
            <span className="px-2 py-1 border border-secondary-foreground/20 rounded">MC</span>
            <span className="px-2 py-1 border border-secondary-foreground/20 rounded">MBWAY</span>
            <span className="px-2 py-1 border border-secondary-foreground/20 rounded">PAYPAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
