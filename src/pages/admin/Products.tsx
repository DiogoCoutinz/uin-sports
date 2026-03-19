import { useState } from 'react';
import { products } from '@/data/mockData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

export default function AdminProducts() {
  const [search, setSearch] = useState('');

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.clubName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-xl">Gestão de produtos</h1>
        <p className="text-sm text-muted-foreground">{products.length} produtos no catálogo</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Pesquisar produtos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16"></TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Clube</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-right">Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-11 h-14 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sizes.join(', ')}</p>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{product.clubName}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal text-xs">
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm tabular-nums">
                    {product.price.toFixed(2)} €
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={
                        product.stock < 50
                          ? 'text-destructive font-medium'
                          : 'text-muted-foreground'
                      }
                    >
                      {product.stock}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
