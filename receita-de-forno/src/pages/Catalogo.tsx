
import { useEffect, useMemo, useState } from "react";
import { getRecipes } from "../services/recipes";
import type { Recipe } from "../types/Recipe";

function Catalogo() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    async function loadRecipes() {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch {
        setError("Não foi possível carregar as receitas.");
      } finally {
        setLoading(false);
      }
    }

    loadRecipes();
  }, []);

  const cuisines = useMemo(
    () => [...new Set(recipes.map((recipe) => recipe.cuisine))].sort(),
    [recipes]
  );

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCuisine =
      selectedCuisine === "" || recipe.cuisine === selectedCuisine;

    return matchesSearch && matchesCuisine;
  });

  function toggleFavorite(id: number) {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(id)
        ? currentFavorites.filter((favoriteId) => favoriteId !== id)
        : [...currentFavorites, id]
    );
  }

  if (loading) {
    return <p className="p-6 text-center">Carregando receitas...</p>;
  }

  if (error) {
    return <p className="p-6 text-center text-red-600">{error}</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 text-gray-900 transition-colors md:p-10 dark:bg-gray-900 dark:text-gray-100">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Receitário
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-100">
            Encontre sua próxima receita favorita!
          </p>
        </header>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="search"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-100"
            >
              Pesquisar receita
            </label>
            <input
              id="search"
              type="text"
              placeholder="Digite o nome da receita"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white p-3 focus:border-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="cuisine"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-100"
            >
              Filtrar por culinária
            </label>
            <select
              id="cuisine"
              value={selectedCuisine}
              onChange={(event) => setSelectedCuisine(event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white p-3 focus:border-orange-500 focus:outline-none "
            >
              <option value="">Todas as culinárias</option>
              {cuisines.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="mb-5 text-sm text-gray-600 dark:text-gray-100">
          {favorites.length} receitas favoritas
        </p>

        {filteredRecipes.length === 0 ? (
          <p className="py-12 text-center text-gray-500">
            Nenhuma receita encontrada.
          </p>
        ) : (
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredRecipes.map((recipe) => {
              const isFavorite = favorites.includes(recipe.id);

              return (
                <article
                  key={recipe.id}
                  className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white"
                >
                  <a href={`/receitas/${recipe.id}`}>
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="h-48 w-full object-cover"
                    />
                  </a>

                  <div className="flex flex-1 flex-col p-4">
                    <span className="mb-3 self-start rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700">
                      {recipe.cuisine}
                    </span>

                    <h2 className="mb-3 text-lg font-semibold text-gray-800">
                      {recipe.name}
                    </h2>

                    <p className="mb-4 text-sm text-gray-500">
                      ◷ {recipe.prepTimeMinutes + recipe.cookTimeMinutes} minutos
                    </p>

                    <div className="mt-auto space-y-2">
                      <button
                        type="button"
                        onClick={() => toggleFavorite(recipe.id)}
                        aria-pressed={isFavorite}
                        className={`w-full rounded-lg border px-3 py-2 transition-colors ${
                          isFavorite
                            ? "border-red-200 bg-red-50 text-red-600"
                            : "border-gray-300 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {isFavorite ? "♥ Favorita" : "♡ Favoritar"}
                      </button>

                      <a
                        href={`/receitas/${recipe.id}`}
                        className="block w-full rounded-lg bg-orange-500 px-3 py-2 text-center font-medium text-white transition-colors hover:bg-orange-600"
                      >
                        Ver receita
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}

export default Catalogo;
