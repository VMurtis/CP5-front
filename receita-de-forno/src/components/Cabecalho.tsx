
import { Link } from "react-router-dom";
import { ChefHat } from "lucide-react";
import AlternarTema from "./AlternarTema";

function Cabecalho() {
  return (
    <header className="border-b border-orange-100 bg-gray-300 shadow-sm">
      <nav className="p-5 sm:m-5 sm:rounded-xl bg-alura-200 dark:bg-dark-200 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <ChefHat size={28} className="text-orange-500" />
          <h1 className="text-black text-2xl sm:text-4xl">
            Receit<span className="text-orange-500">ário</span>
          </h1>
        </Link>

        <AlternarTema />
      </nav>
    </header>
  );
}

export default Cabecalho;
