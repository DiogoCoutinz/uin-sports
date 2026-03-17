import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Contactos */}
          <div>
            <h4 className="font-display text-lg mb-3 tracking-wide">CONTACTOS</h4>
            <div className="space-y-1.5 text-sm text-secondary-foreground/40">
              <p>Av. Irene Lisboa, 19, Pavilhao D - 2</p>
              <p>2635-001 Rio de Mouro, Portugal</p>
              <p className="pt-1">uin.sports@gmail.com</p>
              <p>(+351) 215 968 873 / 910 248 051</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-8 text-sm text-secondary-foreground/40 md:justify-center">
            <Link to="/loja" className="hover:text-primary transition-colors">Loja</Link>
            <Link to="/sobre" className="hover:text-primary transition-colors">Sobre</Link>
            <Link to="/contactos" className="hover:text-primary transition-colors">Contactos</Link>
          </div>

          {/* Social */}
          <div className="flex gap-3 md:justify-end">
            {[Facebook, Instagram].map((Icon, i) => (
              <div key={i} className="w-10 h-10 border border-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors cursor-pointer">
                <Icon className="w-5 h-5" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-secondary-foreground/[0.06]">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <p className="text-xs text-secondary-foreground/25">
            © 2026 UIN Sports. Todos os direitos reservados.
          </p>
          <Link to="/admin" className="text-[10px] text-secondary-foreground/15 hover:text-secondary-foreground/30 transition-colors">
            Gestao
          </Link>
        </div>
      </div>
    </footer>
  );
}
