import { useState } from 'react';
import { orders, statusLabels, statusColors, type Order } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Package } from 'lucide-react';
import { toast } from 'sonner';

const statusOrder: Order['status'][] = ['design', 'sublimacao', 'producao', 'envio', 'entregue'];

export default function AdminOrders() {
  const [orderList, setOrderList] = useState(orders);

  const moveOrder = (orderId: string, direction: 'next' | 'prev') => {
    setOrderList(prev =>
      prev.map(o => {
        if (o.id !== orderId) return o;
        const idx = statusOrder.indexOf(o.status);
        const newIdx = direction === 'next' ? Math.min(idx + 1, 4) : Math.max(idx - 1, 0);
        const newStatus = statusOrder[newIdx];
        toast.success(`Encomenda ${o.id} movida para ${statusLabels[newStatus]}`);
        return { ...o, status: newStatus };
      })
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl">PIPELINE DE ENCOMENDAS</h1>
        <p className="text-sm text-muted-foreground">Acompanhe o estado de cada encomenda</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        {statusOrder.map(status => {
          const statusOrders = orderList.filter(o => o.status === status);
          return (
            <div key={status} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xs tracking-wider">{statusLabels[status].toUpperCase()}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[status]}`}>{statusOrders.length}</span>
              </div>
              <div className="space-y-3 min-h-[200px]">
                {statusOrders.map(order => (
                  <Card key={order.id} className="bg-card border-border/50">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-sm">{order.clubName}</p>
                          <p className="text-xs text-muted-foreground">{order.product}</p>
                        </div>
                        <span className="text-xs font-mono text-muted-foreground">{order.id}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Package className="w-3 h-3" /> {order.quantity} un.</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {order.deadline}</span>
                      </div>
                      <p className="text-sm font-display text-primary">{order.total.toFixed(2)}€</p>
                      <div className="flex gap-1">
                        {status !== 'design' && (
                          <Button size="sm" variant="ghost" className="text-xs flex-1 h-7" onClick={() => moveOrder(order.id, 'prev')}>
                            ← Anterior
                          </Button>
                        )}
                        {status !== 'entregue' && (
                          <Button size="sm" variant="ghost" className="text-xs flex-1 h-7 text-primary" onClick={() => moveOrder(order.id, 'next')}>
                            Seguinte →
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
