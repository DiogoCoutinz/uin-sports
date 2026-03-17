import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ShoppingCart } from 'lucide-react';
import { products, clubs } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/layout/CartSidebar';

const sports = [...new Set(products.map(p => p.sport))];
const categories = [...new Set(products.map(p => p.category))];

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium tracking-wide transition-all border ${
        active
          ? 'bg-primary text-primary-foreground border-primary'
          : 'bg-transparent text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
      }`}
    >
      {label}
    </button>
  );
}

export default function Shop() {
  const { totalItems, setIsOpen } = useCart();
  const [search, setSearch] = useState('');
  const [sportFilter, setSportFilter] = useState('all');
  const [clubFilter, setClubFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const hasFilters = search || sportFilter !== 'all' || clubFilter !== 'all' || categoryFilter !== 'all';

  const clearAll = () => {
    setSearch('');
    setSportFilter('all');
    setClubFilter('all');
    setCategoryFilter('all');
  };

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (sportFilter !== 'all' && p.sport !== sportFilter) return false;
      if (clubFilter !== 'all' && p.clubId !== clubFilter) return false;
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!p.name.toLowerCase().includes(q) && !p.clubName.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [sportFilter, clubFilter, categoryFilter, search]);

  return (
    <div className="min-h-screen bg-background">
      <CartSidebar />

      <div>
        {/* Header + Search + Hero */}
        <div className="relative z-10">
          <div className="bg-secondary relative">
            {/* Floating nav */}
            <div className="relative z-20 container mx-auto px-4 h-16 flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2.5">
                <img src="/favicon.png" alt="UIN Sports" className="w-8 h-8 rounded-full" />
                <span className="font-display text-secondary-foreground text-xl tracking-wide">UIN SPORTS</span>
              </Link>
              <div className="flex items-center gap-6">
                <nav className="hidden sm:flex items-center gap-6">
                  <Link to="/sobre" className="text-sm font-medium text-secondary-foreground/40 hover:text-primary transition-colors tracking-wide">Sobre</Link>
                  <Link to="/loja" className="text-sm font-medium text-primary transition-colors tracking-wide">Loja</Link>
                  <Link to="/contactos" className="text-sm font-medium text-secondary-foreground/40 hover:text-primary transition-colors tracking-wide">Contactos</Link>
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

            <div className="relative z-20 container mx-auto px-4 pt-6 pb-16 sm:pb-20">
              <div className="max-w-lg">
                <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl text-secondary-foreground leading-[0.9] mb-3">LOJA</h1>
                <p className="text-secondary-foreground/35 text-sm mb-8">Equipamentos sublimados para todas as modalidades.</p>
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-foreground/30" />
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Pesquisar produto, clube..."
                    className="w-full bg-secondary-foreground/[0.06] border border-secondary-foreground/10 text-secondary-foreground placeholder:text-secondary-foreground/25 pl-10 pr-10 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  />
                  {search && (
                    <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-foreground/30 hover:text-secondary-foreground/60">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Player — positioned so legs break out of the navy into white */}
          <div className="hidden md:block absolute right-[5%] lg:right-[8%] bottom-0 translate-y-[20%] w-[340px] lg:w-[420px] pointer-events-none z-10">
            <img
              src="/soccer.png"
              alt=""
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Angled cut */}
        <div className="bg-secondary -mt-px">
          <div className="bg-background h-12 sm:h-16" style={{ clipPath: 'polygon(0 60%, 100% 0, 100% 100%, 0 100%)' }} />
        </div>

        {/* Filters */}
        <div className="border-b border-border">
          <div className="container mx-auto px-4 py-5">
            <div className="flex flex-wrap gap-6">
              {/* Sport */}
              <div>
                <p className="text-[11px] text-muted-foreground tracking-widest uppercase mb-2">Modalidade</p>
                <div className="flex flex-wrap gap-1.5">
                  <FilterChip label="Todas" active={sportFilter === 'all'} onClick={() => setSportFilter('all')} />
                  {sports.map(s => (
                    <FilterChip key={s} label={s} active={sportFilter === s} onClick={() => setSportFilter(sportFilter === s ? 'all' : s)} />
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <p className="text-[11px] text-muted-foreground tracking-widest uppercase mb-2">Categoria</p>
                <div className="flex flex-wrap gap-1.5">
                  <FilterChip label="Todas" active={categoryFilter === 'all'} onClick={() => setCategoryFilter('all')} />
                  {categories.map(c => (
                    <FilterChip key={c} label={c} active={categoryFilter === c} onClick={() => setCategoryFilter(categoryFilter === c ? 'all' : c)} />
                  ))}
                </div>
              </div>

            </div>

            {/* Active filter summary */}
            {hasFilters && (
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/50">
                <span className="text-xs text-muted-foreground">{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</span>
                <button onClick={clearAll} className="text-xs text-primary font-medium hover:underline">
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-10">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <p className="text-muted-foreground">Nenhum produto encontrado.</p>
                <button onClick={clearAll} className="text-primary text-sm font-medium mt-2 hover:underline">
                  Limpar filtros
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              >
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link to={`/produto/${product.id}`} className="group block">
                      <div className="relative overflow-hidden bg-muted aspect-[3/4]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="mt-3">
                        <p className="text-xs text-primary font-medium tracking-wider uppercase">{product.clubName}</p>
                        <p className="font-medium mt-1">{product.name}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="font-display text-xl text-primary">{product.price.toFixed(2)}€</p>
                          <p className="text-[11px] text-muted-foreground tracking-wide">{product.sizes.join(' · ')}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  );
}
