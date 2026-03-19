import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { clubs, orders, monthlyOrders, fabricStock } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, ShoppingCart, Users, Package } from 'lucide-react';

export default function AdminDashboard() {
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const activeOrders = orders.filter((o) => o.status !== 'entregue').length;
  const topClubs = [...clubs].sort((a, b) => b.totalOrders - a.totalOrders).slice(0, 3);

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-display text-xl">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Resumo do negócio</p>
      </div>

      {/* KPIs — 2x2 grid, cleaner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { title: 'Receita', value: `${(totalRevenue / 1000).toFixed(1)}K €`, icon: TrendingUp },
          { title: 'Activas', value: activeOrders.toString(), icon: ShoppingCart },
          { title: 'Clubes', value: clubs.length.toString(), icon: Users },
          { title: 'Produtos', value: '10', icon: Package },
        ].map((kpi, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                <kpi.icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">{kpi.title}</p>
                <p className="text-lg font-display tabular-nums">{kpi.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart + Top clubs side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-display">Encomendas mensais</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyOrders}>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }}
                />
                <Bar dataKey="encomendas" fill="hsl(var(--foreground))" radius={[6, 6, 0, 0]} opacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-display">Top clubes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topClubs.map((club, i) => (
                <div key={club.id} className="flex items-center gap-3">
                  <span className="text-lg">{club.logo}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{club.name}</p>
                    <p className="text-[11px] text-muted-foreground">{club.location}</p>
                  </div>
                  <span className="font-display text-sm tabular-nums text-muted-foreground">{club.totalOrders}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stock — simplified */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-display">Stock de tecidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
            {fabricStock.slice(0, 3).map((f) => (
              <div key={f.name} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{f.name}</span>
                <span className="tabular-nums font-medium">{f.stock}m</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
