
import type { Recipe, RecipesResponse } from "../types/Recipe";

const API_URL = "https://dummyjson.com/recipes";

export async function getRecipes(): Promise<Recipe[]> {
  const response = await fetch(`${API_URL}?limit=0`);

  if (!response.ok) {
    throw new Error("Erro ao buscar receitas.");
  }

  const data: RecipesResponse = await response.json();

  return data.recipes;
}

export async function getRecipeById(id: number): Promise<Recipe> {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Receita não encontrada.");
  }

  const recipe: Recipe = await response.json();

  return recipe;
}
