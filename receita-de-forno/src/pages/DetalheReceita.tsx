import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, ChefHat, Utensils, CookingPot } from "lucide-react";
import { getRecipeById } from "../services/recipes";
import type { Recipe } from "../types/Recipe";

function DetalheReceita() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRecipe() {
      setLoading(true);
      setError("");

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

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 dark:bg-gray-950">
        <p className="animate-pulse text-lg font-medium text-orange-600 dark:text-gray-100">
          Carregando receita...
        </p>
      </main>
    );
  }

  if (error || !recipe) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white p-10 text-center text-black dark:bg-gray-950 dark:text-white">
        <CookingPot size={48} className="text-orange-500" />

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Receita não encontrada
        </h2>

        <p className="text-gray-600 dark:text-gray-300">
          Não conseguimos carregar essa receita. Tente novamente pelo catálogo.
        </p>

        <Link
          to="/"
          className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Voltar ao catálogo
        </Link>
      </main>
    );
  }

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <main className="min-h-screen bg-orange-50/40 px-4 py-8 text-gray-800 dark:bg-gray-950 dark:text-gray-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-orange-700 transition hover:bg-orange-100"
        >
          <ArrowLeft size={18} />
          Voltar ao catálogo
        </Link>

        <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-200">
          <div className="grid md:grid-cols-2">
            <div className="min-h-64 bg-gray-100 md:min-h-full">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="h-full max-h-[480px] min-h-72 w-full object-cover md:min-h-[420px]"
              />
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <span className="mb-3 w-fit rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
                {recipe.cuisine}
              </span>

              <h2 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
                {recipe.name}
              </h2>

              <p className="mt-4 text-gray-600">
                Prepare essa receita seguindo os ingredientes e as instruções
                abaixo.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-orange-50 p-4">
                  <Clock size={22} className="mb-2 text-orange-600" />
                  <p className="text-sm text-gray-500">Preparo</p>
                  <p className="font-bold text-gray-900">
                    {recipe.prepTimeMinutes} min
                  </p>
                </div>

                <div className="rounded-2xl bg-orange-50 p-4">
                  <CookingPot size={22} className="mb-2 text-orange-600" />
                  <p className="text-sm text-gray-500">Cozimento</p>
                  <p className="font-bold text-gray-900">
                    {recipe.cookTimeMinutes} min
                  </p>
                </div>

                <div className="rounded-2xl bg-orange-100 p-4">
                  <ChefHat size={22} className="mb-2 text-orange-700" />
                  <p className="text-sm text-gray-600">Tempo total</p>
                  <p className="font-bold text-orange-800">{totalTime} min</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-orange-100 p-3 text-orange-700">
                <Utensils size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Ingredientes
                </h2>
                <p className="text-sm text-gray-500">
                  Tudo o que você vai precisar
                </p>
              </div>
            </div>

            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li
                  key={`${ingredient}-${index}`}
                  className="flex items-start gap-3 rounded-xl bg-gray-50 p-3 transition hover:bg-orange-50"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 border-orange-400" />
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-orange-100 p-3 text-orange-700">
                <CookingPot size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Modo de preparo
                </h2>
                <p className="text-sm text-gray-500">
                  Siga as etapas da receita
                </p>
              </div>
            </div>

            <ol className="space-y-5">
              {recipe.instructions.map((instruction, index) => (
                <li
                  key={`${index}-${instruction}`}
                  className="flex items-start gap-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1.5 leading-relaxed text-gray-700">
                    {instruction}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </main>
  );
}

export default DetalheReceita;
