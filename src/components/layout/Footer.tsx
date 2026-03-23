import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img src="/image_copy-removebg-preview.png" alt="UIN Sports" className="h-9" />
              <span className="font-display text-sm tracking-[0.06em]">SPORTS</span>
            </Link>
            <p className="text-white/25 text-sm leading-relaxed max-w-xs">
              Equipamentos desportivos sublimados de alta qualidade para clubes em Portugal, África e PALOP.
            </p>
          </div>

          {/* Nav */}
          <div className="md:col-span-2">
            <p className="text-[11px] text-white/15 tracking-[0.2em] uppercase mb-4 font-medium">
              Navegar
            </p>
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'Loja', href: '/loja' },
                { label: 'Sobre', href: '/sobre' },
                { label: 'Contactos', href: '/contactos' },
              ].map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="text-sm text-white/35 hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <p className="text-[11px] text-white/15 tracking-[0.2em] uppercase mb-4 font-medium">
              Contacto
            </p>
            <div className="space-y-2 text-sm text-white/35">
              <p>uin.sports@gmail.com</p>
              <p>(+351) 215 968 873</p>
              <p>(+351) 910 248 051</p>
            </div>
          </div>

          {/* Address */}
          <div className="md:col-span-3">
            <p className="text-[11px] text-white/15 tracking-[0.2em] uppercase mb-4 font-medium">
              Morada
            </p>
            <div className="text-sm text-white/35 leading-relaxed">
              <p>Av. Irene Lisboa, 19</p>
              <p>Pavilhão D - 2</p>
              <p>2635-001 Rio de Mouro</p>
              <p>Portugal</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.04]">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
          <p className="text-[11px] text-white/15">
            © 2026 UIN Sports. Todos os direitos reservados.
          </p>
          <Link
            to="/admin"
            className="text-[10px] text-white/8 hover:text-white/20 transition-colors"
          >
            Gestão
          </Link>
        </div>
      </div>
    </footer>
  );
}
