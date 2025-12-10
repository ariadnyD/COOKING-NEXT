"use client";

import { useState } from "react";

interface RecipeData {
  id: string;
  name: string;
  image: string;
}

export default function FavoriteBtn({ recipe }: { recipe: RecipeData }) {
  // Inicializa o estado lendo diretamente do localStorage (apenas no cliente)
  const [favorited, setFavorited] = useState(() => {
    if (typeof window !== "undefined") {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      return favorites.some((fav: RecipeData) => fav.id === recipe.id);
    }
    return false;
  });

  function toggleFavorite() {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (favorited) {
      const newFavorites = favorites.filter((fav: RecipeData) => fav.id !== recipe.id);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      setFavorited(false);
      alert("Removido dos favoritos.");
    } else {
      favorites.push(recipe);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setFavorited(true);
      alert("Receita adicionada aos favoritos!");
    }
  }

  return (
    <button
      onClick={toggleFavorite}
      suppressHydrationWarning={true} 
      className={`px-4 py-2 rounded font-bold transition-colors ${
        favorited
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {favorited ? "❤️ Favoritado" : "🤍 Favoritar"}
    </button>
  );
}