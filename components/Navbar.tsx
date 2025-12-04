import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-orange-500 p-4 text-white font-bold shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl">
          🍰 CookingNext
        </Link>
        <div className="space-x-4">
          <Link href="/enviar-receita" className="hover:underline">
            Enviar Receita
          </Link>
          <Link href="/" className="hover:underline">Home</Link>
          {/* Adicionaremos mais links depois */}
        </div>
      </div>
    </nav>
  );
}