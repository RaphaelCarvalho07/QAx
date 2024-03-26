const { test, expect } = require("../support");

const data = require("../support/fixtures/tvshows.json");
const { executeSQL } = require("../support/database");

test.beforeAll(async () => {
  await executeSQL(`DELETE from tvshows`);
});

test("deve cadastar uma nova série de TV", async ({ page }) => {
  const tvshow = data.create;

  await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
  await page.tvshows.create(tvshow);

  await page.components.haveText(
    `A série '${tvshow.title}' foi adicionada ao catálogo.`
  );
});

test("deve remover um série de TV", async ({ page, request }) => {
  const tvshow = data.to_remove;
  await request.api.postMedia(tvshow, "tvshow");

  await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
  await page.tvshows.visit();

  await page.components.remove(tvshow.title);
  await page.components.haveText("Série removida com sucesso.");
});

test("não deve cadastrar série de TV duplicada", async ({ page, request }) => {
  const tvshow = data.duplicate;
  await request.api.postMedia(tvshow, "tvshow");

  await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
  await page.tvshows.create(tvshow);

  await page.components.haveText(
    `O título '${tvshow.title}' já consta em nosso catálogo.` +
      ` Por favor, verifique se há necessidade de atualizações ou correções para este item.`
  );
});

test("não deve cadastrar filme quando os campos obrigatórios não são preenchidos", async ( { page }) => {
    await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
    await page.tvshows.goForm();
    await page.tvshows.submit(); // refatorar para tvshows e movies o botão submit

    await page.components.alertHaveText([
      "Campo obrigatório",
      "Campo obrigatório",
      "Campo obrigatório",
      "Campo obrigatório",
      "Campo obrigatório (apenas números)",
    ]);
})
