import FavoriteBtn from "@/components/FavoriteBtn";
import Image from "next/image";
import Link from "next/link";

interface MealDetail {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
  strCategory: string;

  [key: string]: string | undefined;
}

export async function generateStaticParams() {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert");
  const data = await res.json();
  
  return data.meals.slice(0, 5).map((meal: { idMeal: string }) => ({
    id: meal.idMeal,
  }));
}

async function getRecipeDetails(id: string) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals ? (data.meals[0] as MealDetail) : null;
}

export default async function RecipeDetails({ params }: { params: { id: string } }) {
  const { id } = await params; 
  const recipe = await getRecipeDetails(id);

  if (!recipe) {
    return <h1 className="text-center mt-10">Receita não encontrada!</h1>;
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8">
      {/* Imagem de Destaque */}
      <div className="relative h-96 w-full">
        <Image 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal} 
          fill 
          className="object-cover"
          priority
        />
      </div>

      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-orange-600">{recipe.strMeal}</h1>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-semibold text-sm mt-2 inline-block">
              {recipe.strCategory}
            </span>
          </div>
          {/* Aqui entra nosso componente Client Side */}
          <FavoriteBtn 
            recipe={{
              id: recipe.idMeal,
              name: recipe.strMeal,
              image: recipe.strMealThumb
            }} 
          />
        </div>
        
        {/* Lista de Ingredientes */}
        <h2 className="text-gray-800 text-2xl font-bold mb-4">Ingredientes</h2>
        <ul className="list-disc pl-5 mb-8 space-y-2">
          {ingredients.map((item, index) => (
            <li key={index} className="text-gray-700">{item}</li>
          ))}
        </ul>

        {/* Modo de Preparo */}
        <h2 className="text-gray-800 text-2xl font-bold mb-4">Modo de Preparo</h2>
        <p className="text-gray-700 whitespace-pre-line leading-relaxed mb-8">
          {recipe.strInstructions}
        </p>

        <Link href="/" className="text-orange-600 hover:underline font-bold">
          &larr; Voltar para receitas
        </Link>
      </div>
    </div>
  );
}