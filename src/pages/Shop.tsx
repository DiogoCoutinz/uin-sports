import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { products } from '@/data/mockData';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/layout/CartSidebar';

const sports = [...new Set(products.map((p) => p.sport))];
const categories = [...new Set(products.map((p) => p.category))];

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 text-[12px] font-medium rounded-full transition-all duration-200 ${
        active
          ? 'bg-foreground text-background'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      }`}
    >
      {label}
    </button>
  );
}

export default function Shop() {
  const [search, setSearch] = useState('');
  const [sportFilter, setSportFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const hasFilters = search || sportFilter !== 'all' || categoryFilter !== 'all';

  const clearAll = () => {
    setSearch('');
    setSportFilter('all');
    setCategoryFilter('all');
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (sportFilter !== 'all' && p.sport !== sportFilter) return false;
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!p.name.toLowerCase().includes(q) && !p.clubName.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [sportFilter, categoryFilter, search]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartSidebar />

      <div className="pt-16">
        {/* Hero with background image */}
        <div className="relative bg-secondary overflow-hidden">
          <img
            src="/about-bg.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 to-secondary" />

          <div className="relative z-10 max-w-[1320px] mx-auto px-6 lg:px-10 pt-14 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-white/20 text-[11px] font-medium tracking-[0.3em] uppercase mb-3">
                Catálogo
              </p>
              <h1 className="font-display text-4xl sm:text-5xl text-white mb-3">
                Loja
              </h1>
              <p className="text-white/30 text-[15px] mb-8 max-w-md">
                Equipamentos sublimados de alta performance. Personalizados para o teu clube.
              </p>

              <div className="relative max-w-sm">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Pesquisar produto, clube..."
                  className="w-full bg-white/[0.06] border border-white/[0.08] text-white placeholder:text-white/20 pl-10 pr-10 py-2.5 text-sm rounded-full focus:outline-none focus:border-white/20 transition-colors"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Filters */}
        <div className="border-b border-border">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-4">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] text-muted-foreground tracking-wider uppercase font-medium">Modalidade</span>
                <div className="flex gap-1">
                  <FilterPill label="Todas" active={sportFilter === 'all'} onClick={() => setSportFilter('all')} />
                  {sports.map((s) => (
                    <FilterPill key={s} label={s} active={sportFilter === s} onClick={() => setSportFilter(sportFilter === s ? 'all' : s)} />
                  ))}
                </div>
              </div>

              <div className="w-px h-5 bg-border hidden sm:block" />

              <div className="flex items-center gap-2.5">
                <span className="text-[11px] text-muted-foreground tracking-wider uppercase font-medium">Categoria</span>
                <div className="flex flex-wrap gap-1">
                  <FilterPill label="Todas" active={categoryFilter === 'all'} onClick={() => setCategoryFilter('all')} />
                  {categories.map((c) => (
                    <FilterPill key={c} label={c} active={categoryFilter === c} onClick={() => setCategoryFilter(categoryFilter === c ? 'all' : c)} />
                  ))}
                </div>
              </div>
            </div>

            {hasFilters && (
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border/50">
                <span className="text-xs text-muted-foreground">
                  {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
                </span>
                <button onClick={clearAll} className="text-xs font-medium hover:underline">Limpar filtros</button>
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-12">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-28">
                <p className="text-muted-foreground mb-2">Nenhum produto encontrado.</p>
                <button onClick={clearAll} className="text-sm font-medium hover:underline">Limpar filtros</button>
              </motion.div>
            ) : (
              <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
                {filtered.map((product, i) => (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04, duration: 0.5 }}>
                    <Link to={`/produto/${product.id}`} className="group block">
                      <div className="relative overflow-hidden rounded-xl bg-muted">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
                          <span className="bg-white text-foreground px-4 py-2 text-[11px] font-medium tracking-wide rounded-full translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                            Ver detalhes
                          </span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-medium">{product.clubName}</p>
                        <p className="font-medium text-sm mt-1">{product.name}</p>
                        <p className="text-sm text-muted-foreground mt-1.5 tabular-nums">{product.price.toFixed(2)} €</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA banner */}
        <div className="bg-secondary">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl text-white mb-1">Não encontra o que procura?</h3>
              <p className="text-white/30 text-sm">Fabricamos equipamentos personalizados para o seu clube.</p>
            </div>
            <Link to="/contactos">
              <span className="group inline-flex items-center gap-2 bg-white text-secondary px-6 py-3 text-[12px] font-semibold tracking-[0.06em] rounded-full hover:bg-white/90 transition-colors whitespace-nowrap">
                Pedir orçamento <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
