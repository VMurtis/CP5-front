import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRecipeById } from "../services/recipes";
import type { Recipe } from "../types/Recipe";

function DetalheReceita() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRecipe() {
      try {
        if (!id || !Number.isInteger(Number(id)) || Number(id) < 1) {
          throw new Error("ID inválido.");
        }

        const data = await getRecipeById(Number(id));
        setRecipe(data);
      } catch {
        setError("Não foi possível encontrar essa receita.");
      } finally {
        setLoading(false);
      }
    }

    loadRecipe();
  }, [id]);

  if (loading) return <p>Carregando receita...</p>;
  if (error || !recipe) {
    return (
      <main>
        <h1>Receita não encontrada</h1>
        <Link to="/">Voltar ao catálogo</Link>
      </main>
    );
  }

  return (
    <main>
      <Link to="/">← Voltar ao catálogo</Link>
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} width="300" />

      <p>Culinária: {recipe.cuisine}</p>
      <p>Preparo: {recipe.prepTimeMinutes} minutos</p>
      <p>Cozimento: {recipe.cookTimeMinutes} minutos</p>
      <p>
        Tempo total: {recipe.prepTimeMinutes + recipe.cookTimeMinutes} minutos
      </p>

      <h2>Ingredientes</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={`${ingredient}-${index}`}>{ingredient}</li>
        ))}
      </ul>

      <h2>Modo de preparo</h2>
      <ol>
        {recipe.instructions.map((instruction, index) => (
          <li key={`${index}-${instruction}`}>{instruction}</li>
        ))}
      </ol>
    </main>
  );
}

export default DetalheReceita;
