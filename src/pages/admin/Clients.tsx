import { useState } from 'react';
import { clubs, orders } from '@/data/mockData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { statusLabels, statusColors } from '@/data/mockData';
import { Search, MapPin, Phone, Mail } from 'lucide-react';

export default function AdminClients() {
  const [search, setSearch] = useState('');
  const [selectedClub, setSelectedClub] = useState<string | null>(null);

  const filtered = clubs.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.location.toLowerCase().includes(search.toLowerCase())
  );

  const club = clubs.find(c => c.id === selectedClub);
  const clubOrders = orders.filter(o => o.clubId === selectedClub);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl">GESTÃO DE CLUBES</h1>
        <p className="text-sm text-muted-foreground">{clubs.length} clubes registados</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Pesquisar clubes..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Clube</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead className="text-right">Encomendas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(club => (
                <TableRow key={club.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedClub(club.id)}>
                  <TableCell className="text-2xl w-12">{club.logo}</TableCell>
                  <TableCell className="font-semibold">{club.name}</TableCell>
                  <TableCell className="text-muted-foreground">{club.location}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{club.email}</TableCell>
                  <TableCell className="text-right">
                    <span className="font-display text-primary">{club.totalOrders}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Club Detail Dialog */}
      <Dialog open={!!selectedClub} onOpenChange={() => setSelectedClub(null)}>
        <DialogContent className="max-w-2xl">
          {club && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <span className="text-3xl">{club.logo}</span>
                  <div>
                    <h2 className="font-display text-xl">{club.name}</h2>
                    <p className="text-sm text-muted-foreground font-normal">{club.location}</p>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-3 gap-4 my-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" /> {club.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" /> {club.contact}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" /> {club.email}
                </div>
              </div>

              <h3 className="font-display text-sm mt-4 mb-3">HISTÓRICO DE ENCOMENDAS</h3>
              {clubOrders.length === 0 ? (
                <p className="text-sm text-muted-foreground">Sem encomendas registadas.</p>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {clubOrders.map(o => (
                    <div key={o.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="text-sm font-semibold">{o.product}</p>
                        <p className="text-xs text-muted-foreground">{o.quantity} un. · {o.createdAt}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[o.status]}`}>
                          {statusLabels[o.status]}
                        </span>
                        <span className="font-display text-sm text-primary">{o.total.toFixed(2)}€</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
