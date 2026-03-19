import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';
import { products } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/layout/CartSidebar';

const ease = [0.16, 1, 0.3, 1] as const;

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Produto não encontrado.</p>
          <Link to="/loja" className="text-sm font-medium hover:underline">Voltar à loja</Link>
        </div>
      </div>
    );
  }

  const handleAdd = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = products.filter((p) => p.clubId === product.clubId && p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartSidebar />

      <div className="pt-16">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-10">
          <Link to="/loja" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10">
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar à loja
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease }}
              className="overflow-hidden rounded-2xl bg-muted"
            >
              <img src={product.image} alt={product.name} className="w-full aspect-[4/5] object-cover" />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="flex flex-col justify-center"
            >
              <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase font-medium mb-2">
                {product.clubName}
              </p>
              <h1 className="font-display text-2xl sm:text-3xl mb-2">{product.name}</h1>
              <p className="text-sm text-muted-foreground mb-5">{product.category} · {product.sport}</p>
              <p className="text-2xl font-display mb-6 tabular-nums">{product.price.toFixed(2)} €</p>
              <p className="text-muted-foreground text-[15px] leading-relaxed mb-8">{product.description}</p>

              {/* Size */}
              <div className="mb-8">
                <p className="text-sm font-medium mb-3">Tamanho</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] h-11 px-3 rounded-full border text-sm font-medium transition-all duration-200 ${
                        selectedSize === size
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border hover:border-foreground/30'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                size="lg"
                onClick={handleAdd}
                disabled={!selectedSize}
                className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90 font-medium h-12 px-10 rounded-full"
              >
                {added ? (
                  <><Check className="w-4 h-4 mr-2" /> Adicionado</>
                ) : (
                  <><ShoppingCart className="w-4 h-4 mr-2" /> Adicionar ao carrinho</>
                )}
              </Button>

              <p className="text-xs text-muted-foreground/60 mt-4">
                Disponível para encomenda
              </p>
            </motion.div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-28">
              <h2 className="font-display text-xl mb-8">Mais de {product.clubName}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((p) => (
                  <Link key={p.id} to={`/produto/${p.id}`} className="group block">
                    <div className="overflow-hidden rounded-xl bg-muted">
                      <img src={p.image} alt={p.name} className="w-full aspect-[4/5] object-cover group-hover:scale-[1.04] transition-transform duration-700" />
                    </div>
                    <div className="mt-4">
                      <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-medium">{p.clubName}</p>
                      <p className="font-medium text-sm mt-1">{p.name}</p>
                      <p className="text-sm text-muted-foreground mt-1 tabular-nums">{p.price.toFixed(2)} €</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
