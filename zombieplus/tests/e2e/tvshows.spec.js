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
  await page.popup.haveText(
    `A série '${tvshow.title}' foi adicionada ao catálogo.` 
  );
});
