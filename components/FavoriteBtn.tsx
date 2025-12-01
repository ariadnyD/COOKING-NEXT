"use client";

import { useState } from "react";

export default function FavoriteBtn() {
  const [favorited, setFavorited] = useState(false);

  function toggleFavorite() {
    setFavorited(!favorited);
    if (!favorited) {
      alert("Receita adicionada aos favoritos! ❤️");
    } else {
      alert("Removido dos favoritos.");
    }
  }

  return (
    <button
      onClick={toggleFavorite}
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