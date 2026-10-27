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
    [recipes],
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
        : [...currentFavorites, id],
    );
  }

  if (loading) {
    return <p>Carregando receitas...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>Receitário</h1>
      <p>Encontre sua próxima receita favorita!</p>

      <div>
        <label htmlFor="search">Pesquisar receita:</label>
        <input
          id="search"
          type="text"
          placeholder="Digite o nome da receita"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="cuisine">Filtrar por culinária:</label>
        <select
          id="cuisine"
          value={selectedCuisine}
          onChange={(event) => setSelectedCuisine(event.target.value)}
        >
          <option value="">Todas as culinárias</option>
          {cuisines.map((cuisine) => (
            <option key={cuisine} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
      </div>

      <p>{favorites.length} favoritas</p>

      <section>
        {filteredRecipes.length === 0 ? (
          <p>Nenhuma receita encontrada.</p>
        ) : (
          filteredRecipes.map((recipe) => {
            const isFavorite = favorites.includes(recipe.id);

            return (
              <article key={recipe.id}>
                <img src={recipe.image} alt={recipe.name} width="200" />
                <a href={`/receitas/${recipe.id}`}>Ver receita</a>
                <p>Culinária: {recipe.cuisine}</p>
                <p>
                  Tempo total: {recipe.prepTimeMinutes + recipe.cookTimeMinutes}{" "}
                  minutos
                </p>
                <button
                  type="button"
                  onClick={() => toggleFavorite(recipe.id)}
                  aria-pressed={isFavorite}
                >
                  {isFavorite ? "★ Remover favorita" : "☆ Favoritar"}
                </button>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
}

export default Catalogo;
