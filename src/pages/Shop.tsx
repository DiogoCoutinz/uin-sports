import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products, clubs } from '@/data/mockData';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/layout/CartSidebar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Shop() {
  const [sportFilter, setSportFilter] = useState('all');
  const [clubFilter, setClubFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const sports = [...new Set(products.map(p => p.sport))];
  const categories = [...new Set(products.map(p => p.category))];

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (sportFilter !== 'all' && p.sport !== sportFilter) return false;
      if (clubFilter !== 'all' && p.clubId !== clubFilter) return false;
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      return true;
    });
  }, [sportFilter, clubFilter, categoryFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartSidebar />

      <div className="pt-16">
        {/* Page Header */}
        <div className="bg-secondary py-16">
          <div className="container mx-auto px-4">
            <p className="text-primary text-sm font-semibold tracking-[0.2em] mb-2">CATÁLOGO</p>
            <h1 className="font-display text-4xl sm:text-5xl text-secondary-foreground">LOJA ONLINE</h1>
          </div>
        </div>

        {/* Filters */}
        <div className="container mx-auto px-4 py-6 flex flex-wrap gap-4">
          <Select value={sportFilter} onValueChange={setSportFilter}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="Modalidade" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {sports.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={clubFilter} onValueChange={setClubFilter}>
            <SelectTrigger className="w-[200px]"><SelectValue placeholder="Clube" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {clubs.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="Categoria" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-4 pb-20">
          <p className="text-sm text-muted-foreground mb-6">{filtered.length} produto(s) encontrado(s)</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/produto/${product.id}`} className="group block">
                  <div className="relative overflow-hidden rounded-xl bg-muted aspect-[4/5]">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-primary font-semibold">{product.clubName}</p>
                    <p className="font-semibold mt-1">{product.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-lg font-display text-primary">{product.price.toFixed(2)}€</p>
                      <p className="text-xs text-muted-foreground">{product.sizes.join(' · ')}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
