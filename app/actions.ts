"use server";

export async function assinarNewsletter(formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const email = formData.get("email");
  console.log("NOVO INSCRITO:", email);

}