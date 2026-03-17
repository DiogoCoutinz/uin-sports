import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { clubs, orders, salesByRegion, monthlyOrders, fabricStock, statusLabels } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Package, Users, TrendingUp, ShoppingCart } from 'lucide-react';

const COLORS = ['hsl(221, 100%, 50%)', 'hsl(160, 84%, 39%)', 'hsl(48, 97%, 55%)', 'hsl(0, 84%, 60%)', 'hsl(270, 70%, 60%)'];

export default function AdminDashboard() {
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const activeOrders = orders.filter(o => o.status !== 'entregue').length;
  const topClubs = [...clubs].sort((a, b) => b.totalOrders - a.totalOrders).slice(0, 5);

  const ordersByStatus = Object.entries(
    orders.reduce((acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([status, count]) => ({ name: statusLabels[status as keyof typeof statusLabels], value: count }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl">DASHBOARD</h1>
        <p className="text-sm text-muted-foreground">Visão geral do negócio</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Receita Total', value: `${(totalRevenue / 1000).toFixed(1)}K€`, icon: TrendingUp, color: 'text-accent' },
          { title: 'Encomendas Ativas', value: activeOrders.toString(), icon: ShoppingCart, color: 'text-primary' },
          { title: 'Clubes Parceiros', value: clubs.length.toString(), icon: Users, color: 'text-gold' },
          { title: 'Produtos', value: '10', icon: Package, color: 'text-destructive' },
        ].map((kpi, i) => (
          <Card key={i}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${kpi.color}`}>
                <kpi.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{kpi.title}</p>
                <p className="text-2xl font-display">{kpi.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Orders */}
        <Card>
          <CardHeader><CardTitle className="text-sm font-display">ENCOMENDAS MENSAIS</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyOrders}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8 }} />
                <Bar dataKey="encomendas" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue by Region */}
        <Card>
          <CardHeader><CardTitle className="text-sm font-display">VENDAS POR REGIÃO</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={salesByRegion} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="region" type="category" tick={{ fontSize: 11 }} width={80} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8 }} />
                <Bar dataKey="vendas" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fabric Stock */}
        <Card>
          <CardHeader><CardTitle className="text-sm font-display">STOCK DE TECIDOS</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fabricStock.map(f => (
                <div key={f.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{f.name}</span>
                    <span className="text-muted-foreground">{f.stock} {f.unit}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(f.stock / 1000) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Clubs */}
        <Card>
          <CardHeader><CardTitle className="text-sm font-display">TOP 5 CLUBES</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topClubs.map((club, i) => (
                <div key={club.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <span className="text-2xl">{club.logo}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{club.name}</p>
                    <p className="text-xs text-muted-foreground">{club.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-sm text-primary">{club.totalOrders}</p>
                    <p className="text-xs text-muted-foreground">encomendas</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
