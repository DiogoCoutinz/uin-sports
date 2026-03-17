import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Sobre', href: '/sobre' },
  { label: 'Loja', href: '/loja' },
  { label: 'Contactos', href: '/contactos' },
];

export default function Header() {
  const { totalItems, setIsOpen } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-white/[0.04]">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/favicon.png" alt="UIN Sports" className="w-8 h-8 rounded-full" />
          <span className="font-display text-secondary-foreground text-xl tracking-wide">UIN SPORTS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                location.pathname === link.href ? 'text-primary' : 'text-secondary-foreground/50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/loja">
            <span className="hidden sm:inline-flex bg-accent text-accent-foreground px-5 py-2 text-xs font-semibold tracking-widest hover:bg-accent/90 transition-colors">
              LOJA
            </span>
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2 text-secondary-foreground/50 hover:text-primary transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-secondary-foreground/50"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-secondary border-t border-white/[0.04] overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-secondary-foreground/50 hover:text-primary py-2 tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/loja" onClick={() => setMobileOpen(false)}>
                <span className="inline-block w-full text-center bg-accent text-accent-foreground py-3 text-xs font-semibold tracking-widest">
                  LOJA ONLINE
                </span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
