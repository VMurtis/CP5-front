
import { Link } from "react-router-dom";
import { ChefHat } from "lucide-react";
import AlternarTema from "./AlternarTema";


function Cabecalho() {
  return (
    <header className="border-b border-orange-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <nav className="flex items-center justify-between bg-alura-200 p-4 dark:bg-dark-200 sm:rounded-xl sm:p-5">
        <Link to="/" className="flex items-center gap-2">
          <ChefHat size={28} className="shrink-0 text-orange-500" />
          <h1 className="text-2xl text-black dark:text-gray-100 sm:text-4xl">
            Receit<span className="text-orange-500">ário</span>
          </h1>
        </Link>

        <AlternarTema />
      </nav>
    </header>
  );
}


export default Cabecalho;
