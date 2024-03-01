// @ts-check
const { test, expect } = require("@playwright/test");

test("deve cadastrar um lead na fila de espera", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("button", { name: /Aperte o play/ }).click()

  await expect(page.getByTestId("modal")
    .getByRole("heading")).toHaveText("Fila de espera")

  await page.getByPlaceholder("Seu nome completo").fill("Koi Targaryen")

  await page.locator("#email").fill("koi@targaryen.com")

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  // await page.waitForTimeout(10000)
});
