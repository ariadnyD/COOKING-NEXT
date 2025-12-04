import FormReceita from "@/components/FormReceita";

export const metadata = {
  title: "Envie sua Receita - CookingNext",
  description: "Compartilhe suas melhores receitas com o mundo!",
};

export default function EnviarReceitaPage() {
  return (
    <div className="py-10">
      <h1 className="text-4xl font-bold text-center text-orange-600 mb-2">
        Envie sua Receita 
      </h1>
      <p className="text-center text-white-600 mb-10">
        Preencha o formulário abaixo para adicionar sua receita ao nosso site.
      </p>

      {/* Renderiza o formulário cliente */}
      <FormReceita />
    </div>
  );
}