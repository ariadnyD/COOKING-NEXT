export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
      <p className="ml-4 text-xl font-semibold text-orange-600">Carregando receitas deliciosas...</p>
    </div>
  );
}