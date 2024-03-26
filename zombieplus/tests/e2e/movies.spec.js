const { test, expect } = require("../support");

const data = require("../support/fixtures/movies.json");
const { executeSQL } = require("../support/database");

test.beforeAll(async () => {
  await executeSQL(`DELETE from movies`);
});

test("deve poder cadastrar um novo filme", async ({ page }) => {
  const movie = data.create;

  await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
  await page.movies.create(movie);
  await page.components.haveText(
    `O filme '${movie.title}' foi adicionado ao catálogo.`
  );
});

test("deve poder remover um filme", async ({ page, request }) => {
  const movie = data.to_remove;
  await request.api.postMedia(movie);

  await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
  await page.components.remove(movie.title);
  await page.components.haveText("Filme removido com sucesso.");
});

test("não deve cadastrar filme duplicado", async ({ page, request }) => {
  const movie = data.duplicate;
  await request.api.postMedia(movie);

  await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
  await page.movies.create(movie);
  await page.components.haveText(
    `O título '${movie.title}' já consta em nosso catálogo.` +
      ` Por favor, verifique se há necessidade de atualizações ou correções para este item.`
  );
});

test("não deve cadastrar filme quando os campos obrigatórios não são preenchidos", async ({
  page,
}) => {
  await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
  await page.movies.goForm();
  await page.movies.submit();

  await page.components.alertHaveText([
    "Campo obrigatório",
    "Campo obrigatório",
    "Campo obrigatório",
    "Campo obrigatório",
  ]);
});

test("deve realizar busca pelo termo zumbi", async ({ page, request }) => {
  // const movies = data.search;
  const movie1 = data.search1;
  const movie2 = data.search2;
  const movie3 = data.search3;
  const input = "zumbi";
  const outputs = [movie1.title, movie2.title, movie3.title];
  // movies.data.forEach(async (m) => {
  //   await request.api.postMovie(m);
  // });
  await request.api.postMedia(movie1);
  await request.api.postMedia(movie2);
  await request.api.postMedia(movie3);

  await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
  await page.movies.search(input);

  await page.movies.tableHave(outputs);
});
