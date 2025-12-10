import Link from "next/link";
import Image from "next/image";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

// Busca receitas filtradas pela categoria na URL
async function getRecipesByCategory(category: string) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  
  if (!res.ok) {
    throw new Error("Falha ao buscar receitas");
  }

  const data = await res.json();
  return data.meals as Meal[] | null;
}

export default async function CategoryRecipesPage({ params }: { params: { categoria: string } }) {
  // Em Next.js 15, params é uma Promise, então usamos await
  const { categoria } = await params;
  
  // Decodifica a URL (ex: "Beef" ou nomes com espaço se houver)
  const decodedCategory = decodeURIComponent(categoria);
  const recipes = await getRecipesByCategory(decodedCategory);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center text-orange-600">
        Receitas de {decodedCategory}
      </h1>

      {!recipes ? (
        <p className="text-center text-gray-500 mt-10">Nenhuma receita encontrada para esta categoria.</p>
      ) : (
        /* Reutilizamos o mesmo grid da Home para manter a consistência */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe.idMeal} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white">
              
              <div className="relative h-48 w-full">
                <Image 
                  src={recipe.strMealThumb} 
                  alt={recipe.strMeal} 
                  fill 
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h2 className="font-bold text-lg mb-2 truncate text-gray-800">{recipe.strMeal}</h2>
                <Link 
                  href={`/receita/${recipe.idMeal}`} 
                  className="block w-full text-center bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors"
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}