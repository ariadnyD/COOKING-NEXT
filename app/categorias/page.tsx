  import Link from "next/link";
import Image from "next/image";

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

async function getCategories() {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
  if (!res.ok) {
    throw new Error("Falha ao buscar categorias");
  }
  const data = await res.json();
  return data.categories as Category[];
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center text-orange-600">
        Categorias
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.idCategory} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white flex flex-col">
            
            {/* Imagem da Categoria (usamos object-contain para não cortar o ícone) */}
            <div className="relative h-48 w-full bg-orange-50">
              <Image 
                src={cat.strCategoryThumb} 
                alt={cat.strCategory} 
                fill 
                className="object-contain p-4"
              />
            </div>

            <div className="p-4 flex flex-col flex-grow">
              <h2 className="font-bold text-xl mb-2 text-center text-gray-800">{cat.strCategory}</h2>
              
              {/* Descrição limitada a 3 linhas */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                {cat.strCategoryDescription}
              </p>

              <Link 
                href={`/categorias/${cat.strCategory}`} 
                className="block w-full text-center bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors mt-auto"
              >
                Ver Receitas
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}