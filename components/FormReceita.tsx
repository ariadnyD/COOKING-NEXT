"use client";

import { enviarReceita } from "@/app/actions";
import { useState } from "react";

export default function FormReceita() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    
    // Chama a Server Action
    await enviarReceita(formData);

    setLoading(false);
    alert("Receita enviada com sucesso! 🍳");
    (event.target as HTMLFormElement).reset(); // Limpa o formulário
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
      <div>
        <label htmlFor="nome" className="block font-bold mb-2 text-white-700">Nome da Receita</label>
        <input
          type="text"
          name="nome"
          id="nome"
          required
          placeholder="Ex: Bolo de Cenoura"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label htmlFor="categoria" className="block font-bold mb-2 text-white-700">Categoria</label>
        <select 
          name="categoria" 
          id="categoria"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-black"
        >
          <option value="Sobremesa" className="text-black-700">Sobremesa</option>
          <option value="Prato Principal" className="text-black-700">Prato Principal</option>
          <option value="Entrada" className="text-black-700">Entrada</option>
        </select>
      </div>

      <div>
        <label htmlFor="ingredientes" className="block font-bold mb-2 text-white-700">Ingredientes</label>
        <textarea
          name="ingredientes"
          id="ingredientes"
          rows={5}
          required
          placeholder="Liste os ingredientes..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        ></textarea>
      </div>

      <div>
        <label htmlFor="preparo" className="block font-bold mb-2 text-white-700">Modo de Preparo</label>
        <textarea
          name="preparo"
          id="preparo"
          rows={5}
          required
          placeholder="Descreva o passo a passo..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-colors ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
        }`}
      >
        {loading ? "Enviando..." : "Enviar Receita"}
      </button>
    </form>
  );
}