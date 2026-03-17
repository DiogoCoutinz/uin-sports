export interface Club {
  id: string;
  name: string;
  location: string;
  contact: string;
  email: string;
  totalOrders: number;
  logo: string;
}

export interface Product {
  id: string;
  name: string;
  clubId: string;
  clubName: string;
  category: string;
  sport: string;
  price: number;
  sizes: string[];
  stock: number;
  image: string;
  description: string;
}

export interface Order {
  id: string;
  clubId: string;
  clubName: string;
  product: string;
  quantity: number;
  status: 'design' | 'sublimacao' | 'producao' | 'envio' | 'entregue';
  deadline: string;
  total: number;
  createdAt: string;
}

export const clubs: Club[] = [
  { id: 'c1', name: 'FC Estrela do Norte', location: 'Porto, Portugal', contact: '+351 912 345 678', email: 'geral@estreladonorte.pt', totalOrders: 45, logo: '⭐' },
  { id: 'c2', name: 'SC Dragões do Mar', location: 'Lisboa, Portugal', contact: '+351 923 456 789', email: 'info@dragoesdomar.pt', totalOrders: 38, logo: '🐉' },
  { id: 'c3', name: 'CF Leões da Serra', location: 'Braga, Portugal', contact: '+351 934 567 890', email: 'geral@leoesdaserra.pt', totalOrders: 52, logo: '🦁' },
  { id: 'c4', name: 'AD Águias de Luanda', location: 'Luanda, Angola', contact: '+244 923 456 789', email: 'info@aguiasluanda.ao', totalOrders: 28, logo: '🦅' },
  { id: 'c5', name: 'GD Tubarões do Sal', location: 'Sal, Cabo Verde', contact: '+238 991 234 567', email: 'geral@tubaroesdosal.cv', totalOrders: 19, logo: '🦈' },
  { id: 'c6', name: 'SC Falcões de Maputo', location: 'Maputo, Moçambique', contact: '+258 84 567 8901', email: 'info@falcoesmaputo.mz', totalOrders: 22, logo: '🦅' },
  { id: 'c7', name: 'FC Tigres do Algarve', location: 'Faro, Portugal', contact: '+351 916 789 012', email: 'geral@tigresalgarve.pt', totalOrders: 31, logo: '🐯' },
  { id: 'c8', name: 'CD Panteras de Bissau', location: 'Bissau, Guiné-Bissau', contact: '+245 955 678 901', email: 'info@panterasbissau.gw', totalOrders: 15, logo: '🐆' },
  { id: 'c9', name: 'CF Unidos de Coimbra', location: 'Coimbra, Portugal', contact: '+351 927 890 123', email: 'geral@unidoscoimbra.pt', totalOrders: 41, logo: '🤝' },
  { id: 'c10', name: 'AC Relâmpagos de São Tomé', location: 'São Tomé, São Tomé e Príncipe', contact: '+239 990 123 456', email: 'info@relampagosst.st', totalOrders: 12, logo: '⚡' },
];

export const products: Product[] = [
  { id: 'p1', name: 'Camisola Principal 25/26', clubId: 'c1', clubName: 'FC Estrela do Norte', category: 'Camisola', sport: 'Futebol', price: 49.99, sizes: ['S', 'M', 'L', 'XL', 'XXL'], stock: 120, image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&h=700&fit=crop', description: 'Camisola principal sublimada com tecnologia de alta performance. Tecido respirável e leve.' },
  { id: 'p2', name: 'Camisola Alternativa 25/26', clubId: 'c1', clubName: 'FC Estrela do Norte', category: 'Camisola', sport: 'Futebol', price: 49.99, sizes: ['S', 'M', 'L', 'XL'], stock: 85, image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&h=700&fit=crop', description: 'Design alternativo arrojado com padrão geométrico sublimado.' },
  { id: 'p3', name: 'Calções de Jogo', clubId: 'c2', clubName: 'SC Dragões do Mar', category: 'Calções', sport: 'Futebol', price: 29.99, sizes: ['S', 'M', 'L', 'XL'], stock: 200, image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&h=700&fit=crop', description: 'Calções de jogo oficiais com elástico confortável e bolsos laterais.' },
  { id: 'p4', name: 'Equipamento Completo Senior', clubId: 'c3', clubName: 'CF Leões da Serra', category: 'Kit Completo', sport: 'Futebol', price: 89.99, sizes: ['S', 'M', 'L', 'XL', 'XXL'], stock: 60, image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=700&fit=crop', description: 'Kit completo: camisola, calções e meias. Ideal para equipar toda a equipa.' },
  { id: 'p5', name: 'Camisola de Treino', clubId: 'c4', clubName: 'AD Águias de Luanda', category: 'Camisola', sport: 'Futebol', price: 34.99, sizes: ['M', 'L', 'XL'], stock: 150, image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=600&h=700&fit=crop', description: 'Camisola de treino confortável com logo sublimado do clube.' },
  { id: 'p6', name: 'Fato de Treino Completo', clubId: 'c2', clubName: 'SC Dragões do Mar', category: 'Fato de Treino', sport: 'Futebol', price: 79.99, sizes: ['S', 'M', 'L', 'XL'], stock: 45, image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=700&fit=crop', description: 'Fato de treino premium com casaco e calças. Material de alta qualidade.' },
  { id: 'p7', name: 'Camisola de Futsal', clubId: 'c5', clubName: 'GD Tubarões do Sal', category: 'Camisola', sport: 'Futsal', price: 44.99, sizes: ['S', 'M', 'L', 'XL'], stock: 90, image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=700&fit=crop', description: 'Camisola de futsal com design vibrante e tecido ultra-leve.' },
  { id: 'p8', name: 'Meias de Jogo', clubId: 'c3', clubName: 'CF Leões da Serra', category: 'Meias', sport: 'Futebol', price: 12.99, sizes: ['36-39', '40-43', '44-47'], stock: 300, image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=700&fit=crop', description: 'Meias de jogo com reforço no calcanhar e biqueira. Conforto máximo.' },
  { id: 'p9', name: 'Camisola Guarda-Redes', clubId: 'c7', clubName: 'FC Tigres do Algarve', category: 'Camisola', sport: 'Futebol', price: 54.99, sizes: ['S', 'M', 'L', 'XL'], stock: 35, image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=700&fit=crop', description: 'Camisola de guarda-redes com acolchoamento nos cotovelos e design exclusivo.' },
  { id: 'p10', name: 'Polo Casual do Clube', clubId: 'c9', clubName: 'CF Unidos de Coimbra', category: 'Polo', sport: 'Futebol', price: 39.99, sizes: ['S', 'M', 'L', 'XL', 'XXL'], stock: 70, image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=700&fit=crop', description: 'Polo casual elegante com logo bordado. Perfeito para representar o clube fora de campo.' },
];

export const orders: Order[] = [
  { id: 'o1', clubId: 'c1', clubName: 'FC Estrela do Norte', product: 'Camisola Principal 25/26', quantity: 50, status: 'entregue', deadline: '2025-01-15', total: 2499.50, createdAt: '2024-12-01' },
  { id: 'o2', clubId: 'c2', clubName: 'SC Dragões do Mar', product: 'Fato de Treino Completo', quantity: 30, status: 'envio', deadline: '2025-03-20', total: 2399.70, createdAt: '2025-02-10' },
  { id: 'o3', clubId: 'c3', clubName: 'CF Leões da Serra', product: 'Equipamento Completo Sénior', quantity: 40, status: 'producao', deadline: '2025-04-01', total: 3599.60, createdAt: '2025-02-20' },
  { id: 'o4', clubId: 'c4', clubName: 'AD Águias de Luanda', product: 'Camisola de Treino', quantity: 60, status: 'sublimacao', deadline: '2025-04-15', total: 2099.40, createdAt: '2025-03-01' },
  { id: 'o5', clubId: 'c5', clubName: 'GD Tubarões do Sal', product: 'Camisola de Futsal', quantity: 25, status: 'design', deadline: '2025-05-01', total: 1124.75, createdAt: '2025-03-10' },
  { id: 'o6', clubId: 'c7', clubName: 'FC Tigres do Algarve', product: 'Camisola Guarda-Redes', quantity: 15, status: 'producao', deadline: '2025-03-25', total: 824.85, createdAt: '2025-02-15' },
  { id: 'o7', clubId: 'c9', clubName: 'CF Unidos de Coimbra', product: 'Polo Casual do Clube', quantity: 35, status: 'envio', deadline: '2025-03-18', total: 1399.65, createdAt: '2025-02-05' },
  { id: 'o8', clubId: 'c1', clubName: 'FC Estrela do Norte', product: 'Camisola Alternativa 25/26', quantity: 45, status: 'entregue', deadline: '2025-02-28', total: 2249.55, createdAt: '2025-01-15' },
  { id: 'o9', clubId: 'c6', clubName: 'SC Falcões de Maputo', product: 'Camisola Principal 25/26', quantity: 20, status: 'design', deadline: '2025-05-15', total: 999.80, createdAt: '2025-03-15' },
  { id: 'o10', clubId: 'c3', clubName: 'CF Leões da Serra', product: 'Meias de Jogo', quantity: 100, status: 'entregue', deadline: '2025-01-30', total: 1299.00, createdAt: '2024-12-20' },
  { id: 'o11', clubId: 'c8', clubName: 'CD Panteras de Bissau', product: 'Camisola Principal 25/26', quantity: 30, status: 'sublimacao', deadline: '2025-04-10', total: 1499.70, createdAt: '2025-03-05' },
  { id: 'o12', clubId: 'c10', clubName: 'AC Relâmpagos de São Tomé', product: 'Equipamento Completo Sénior', quantity: 20, status: 'design', deadline: '2025-05-20', total: 1799.80, createdAt: '2025-03-12' },
];

export const salesByRegion = [
  { region: 'Norte', vendas: 45200 },
  { region: 'Centro', vendas: 32100 },
  { region: 'Lisboa', vendas: 58700 },
  { region: 'Sul', vendas: 21300 },
  { region: 'Angola', vendas: 18900 },
  { region: 'Cabo Verde', vendas: 8500 },
  { region: 'Moçambique', vendas: 12400 },
  { region: 'Guiné-Bissau', vendas: 6200 },
  { region: 'São Tomé', vendas: 4100 },
];

export const monthlyOrders = [
  { month: 'Out', encomendas: 12, receita: 15200 },
  { month: 'Nov', encomendas: 18, receita: 22400 },
  { month: 'Dez', encomendas: 25, receita: 31800 },
  { month: 'Jan', encomendas: 22, receita: 28500 },
  { month: 'Fev', encomendas: 30, receita: 38200 },
  { month: 'Mar', encomendas: 15, receita: 19800 },
];

export const fabricStock = [
  { name: 'Poliéster Premium', stock: 850, unit: 'metros' },
  { name: 'Mesh Respirável', stock: 420, unit: 'metros' },
  { name: 'Elastano Sport', stock: 230, unit: 'metros' },
  { name: 'Microfibra', stock: 680, unit: 'metros' },
  { name: 'Dry-Fit Tech', stock: 560, unit: 'metros' },
];

export const statusLabels: Record<Order['status'], string> = {
  design: 'Design',
  sublimacao: 'Sublimação',
  producao: 'Produção',
  envio: 'Envio',
  entregue: 'Entregue',
};

export const statusColors: Record<Order['status'], string> = {
  design: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  sublimacao: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  producao: 'bg-gold/20 text-gold border-gold/30',
  envio: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  entregue: 'bg-accent/20 text-accent border-accent/30',
};
