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
  await request.api.postMedia(tvshow, 'tvshow'); // tenho que criar esse método e/ou ajustar o request

  await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
  await page.tvshows.visit()
  await page.components.remove(tvshow.title);
  await page.components.haveText("Série removida com sucesso.");
//   .remove(movie.title);
});
