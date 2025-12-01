"use client"; // Precisa ser client para usar o hook de formStatus se quiséssemos loading avançado

import { assinarNewsletter } from "@/app/actions";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-10 text-center">
      <div className="container mx-auto">
        <h3 className="text-xl font-bold mb-4">Assine nossa Newsletter</h3>
        
        {/* O atributo 'action' chama a função do servidor direto! */}
        <form action={assinarNewsletter} className="flex justify-center gap-2 max-w-md mx-auto">
          <input 
            type="email" 
            name="email"
            placeholder="Seu melhor e-mail" 
            className="p-2 rounded text-gray-900 flex-grow"
            required
          />
          <button type="submit" className="bg-orange-500 px-4 py-2 rounded font-bold hover:bg-orange-600">
            Assinar
          </button>
        </form>
        
        <p className="mt-8 text-gray-500 text-sm">
          Desenvolvido para a aula de React + Next.js
        </p>
      </div>
    </footer>
  );
}