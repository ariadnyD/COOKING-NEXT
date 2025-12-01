import Link from "next/link";
import Image from "next/image";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

async function getRecipes() {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert");
  
  if (!res.ok) {
    throw new Error("Falha ao buscar receitas");
  }

  const data = await res.json();
  return data.meals as Meal[];
}

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center text-orange-600">
        Receitas de Sobremesas 🍰
      </h1>

      {/* Grid para exibir as receitas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe.idMeal} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white">
            
            {/* Imagem da Receita */}
            <div className="relative h-48 w-full">
              <Image 
                src={recipe.strMealThumb} 
                alt={recipe.strMeal} 
                fill 
                className="object-cover"
              />
            </div>

            {/* Texto e Link */}
            <div className="p-4">
              <h2 className="font-bold text-lg mb-2 truncate">{recipe.strMeal}</h2>
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
    </div>
  );
}