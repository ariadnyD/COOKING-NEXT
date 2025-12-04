"use server";

export async function assinarNewsletter(formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const email = formData.get("email");
  console.log("NOVO INSCRITO:", email);

}

export async function enviarReceita(formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const dados = {
    nome: formData.get("nome"),
    categoria: formData.get("categoria"),
    ingredientes: formData.get("ingredientes"),
    preparo: formData.get("preparo"),
  };

  console.log("NOVA RECEITA RECEBIDA:", dados);
  
  return { success: true, message: "Receita enviada com sucesso!" };
}