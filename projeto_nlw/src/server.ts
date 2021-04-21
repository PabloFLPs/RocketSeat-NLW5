import express from "express"

const app = express();

/**
 * GET = Buscas
 * POST = Criação
 * PUT = Alteração
 * DELETE = Excluir
 * PATCH = Alterar uma informação específica
 */

app.get("/", (request, response) => {
  return response.json({
    message: "NLW#05 - Faaala Dev!",
  });
  /* Ou, enviar uma resposta "send" cmo segue abaixo:
  return response.send("NLW#05 - Faaala Dev!"); */
});

app.post("/users", (request, response) => {
  return response.json({
    message: "Usuario salvo com sucesso.",
  });
  /* Por padrao, navegadores utilizam sempre GET cmo requisições,
  entao, para testar a rota de /users, utilizamos o Insomnia. */
});

//Somente o "app.listen(3000);" ja serviria para rodar a aplicação.
app.listen(3000, () => console.log("Server is running on port 3000."));
