import { useCart } from '@/contexts/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CartSidebar() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="bg-card w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display tracking-wider flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            CARRINHO
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
            <ShoppingBag className="w-12 h-12 mb-4 opacity-30" />
            <p className="text-sm">O seu carrinho está vazio</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map(item => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-3 p-3 rounded-lg bg-muted/50">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-20 object-cover rounded" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">{item.product.clubName} · Tam. {item.size}</p>
                    <p className="text-sm font-bold text-primary mt-1">{item.product.price.toFixed(2)}€</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)} className="w-6 h-6 rounded bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)} className="w-6 h-6 rounded bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Plus className="w-3 h-3" />
                      </button>
                      <button onClick={() => removeItem(item.product.id, item.size)} className="ml-auto text-destructive/60 hover:text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold">{totalPrice.toFixed(2)}€</span>
              </div>
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold" onClick={() => setIsOpen(false)}>
                Finalizar Compra
              </Button>
              <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={clearCart}>
                Limpar Carrinho
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
