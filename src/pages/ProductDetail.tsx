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

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Produto não encontrado</p>
      </div>
    );
  }

  const handleAdd = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = products.filter(p => p.clubId === product.clubId && p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartSidebar />

      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <Link to="/loja" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Voltar à Loja
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="overflow-hidden rounded-2xl bg-muted aspect-[4/5]"
            >
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col justify-center"
            >
              <p className="text-primary text-sm font-semibold tracking-wider mb-2">{product.clubName}</p>
              <h1 className="font-display text-3xl sm:text-4xl mb-2">{product.name}</h1>
              <p className="text-sm text-muted-foreground mb-4">{product.category} · {product.sport}</p>
              <p className="text-3xl font-display text-primary mb-6">{product.price.toFixed(2)}€</p>
              <p className="text-muted-foreground mb-8">{product.description}</p>

              {/* Size Selection */}
              <div className="mb-6">
                <p className="text-sm font-semibold mb-3">Tamanho</p>
                <div className="flex gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg border-2 text-sm font-semibold transition-all ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  onClick={handleAdd}
                  disabled={!selectedSize}
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                >
                  {added ? <><Check className="w-5 h-5" /> Adicionado!</> : <><ShoppingCart className="w-5 h-5" /> Adicionar ao Carrinho</>}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-4">{product.stock} unidades em stock</p>
            </motion.div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="font-display text-2xl mb-6">MAIS DO {product.clubName.toUpperCase()}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map(p => (
                  <Link key={p.id} to={`/produto/${p.id}`} className="group block">
                    <div className="overflow-hidden rounded-xl bg-muted aspect-[4/5]">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <p className="text-xs text-primary font-semibold mt-3">{p.clubName}</p>
                    <p className="font-semibold mt-1">{p.name}</p>
                    <p className="font-display text-primary">{p.price.toFixed(2)}€</p>
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
