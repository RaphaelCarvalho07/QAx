// @ts-check
const { test, expect } = require("@playwright/test");

test("deve cadastrar um lead na fila de espera", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("button", { name: /Aperte o play/});

  // await page.waitForTimeout(10000)
});
