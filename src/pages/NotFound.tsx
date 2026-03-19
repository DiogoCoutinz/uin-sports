import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary text-white">
      <div className="text-center px-6">
        <p className="font-display text-7xl sm:text-8xl text-white/10 mb-4">404</p>
        <p className="text-white/40 mb-8">A página que procura não existe.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
