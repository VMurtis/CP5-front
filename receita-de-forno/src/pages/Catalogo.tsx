
import { useEffect, useState } from "react";
import { getRecipes } from "../services/recipes";
import type { Recipe } from "../types/Recipe";

function Catalogo() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

      <section>
        {recipes.map((recipe) => (
          <article key={recipe.id}>
            <img
              src={recipe.image}
              alt={recipe.name}
              width="200"
            />

            <h2>{recipe.name}</h2>
            <p>Culinária: {recipe.cuisine}</p>
            <p>
              Tempo total:{" "}
              {recipe.prepTimeMinutes + recipe.cookTimeMinutes} minutos
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Catalogo;
