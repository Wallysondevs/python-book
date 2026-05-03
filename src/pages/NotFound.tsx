import { Link } from "wouter";
import { Home as HomeIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-4">🐍</div>
      <h1 className="text-4xl font-bold text-py-blue dark:text-py-yellow mb-2">404</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-8">
        Esta página não existe. Talvez a cobra tenha comido o link.
      </p>
      <Link href="/" className="inline-flex items-center gap-2 bg-py-blue hover:bg-py-blue-dark text-white px-5 py-2.5 rounded-lg font-semibold transition-colors">
        <HomeIcon size={18} /> Voltar ao início
      </Link>
    </div>
  );
}
