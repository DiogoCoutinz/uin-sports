import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-xl border-b border-white/[0.04]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/image copy.png" alt="UIN Sports" className="h-7" />
          <span className="font-display text-secondary-foreground text-sm tracking-[0.06em]">
            SPORTS
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-[13px] font-medium tracking-wide transition-colors duration-200 ${
                location.pathname === link.href
                  ? 'text-white'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2.5 text-white/40 hover:text-white transition-colors"
          >
            <ShoppingCart className="w-[18px] h-[18px]" />
            {totalItems > 0 && (
              <span className="absolute -top-0 -right-0 w-[17px] h-[17px] bg-white text-secondary text-[9px] font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 text-white/40 hover:text-white transition-colors"
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
            <nav className="max-w-[1320px] mx-auto px-6 py-5 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
