"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface FavoriteRecipe {
  id: string;
  name: string;
  image: string;
}

export default function FavoritosClient() {
  // Inicializa o estado lendo direto do localStorage.
  // Como este componente será carregado com ssr: false, o 'window' sempre existe.
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    } catch {
      return [];
    }
  });

  // Função auxiliar para remover item e atualizar a lista na hora
  function removeFavorite(id: string) {
    const newFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-gray-400 mb-4">Nenhum favorito ainda</h1>
        <p className="mb-6">Você ainda não salvou nenhuma receita.</p>
        <Link href="/" className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition">
          Explorar Receitas
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center text-red-500">
        Meus Favoritos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((recipe) => (
          <div key={recipe.id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white">
            <div className="relative h-48 w-full">
              <Image 
                src={recipe.image} 
                alt={recipe.name} 
                fill 
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="font-bold text-lg mb-2 truncate">{recipe.name}</h2>
              <div className="flex flex-col gap-2">
                <Link 
                  href={`/receita/${recipe.id}`} 
                  className="block w-full text-center bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors"
                >
                  Ver Detalhes
                </Link>
                <button 
                  onClick={() => removeFavorite(recipe.id)}
                  className="text-xs text-red-500 hover:text-red-700 underline text-center"
                >
                  Remover
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}