// @ts-check
const { test, expect } = require("@playwright/test")

const {LandingPage} = require('./pages/LandigPage')

test("deve cadastrar um lead na fila de espera", async ({ page }) => {
  const landingPage = new LandingPage(page)
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Koi Targaryen', 'koi@targaryen.com')
  const MESSAGE =
  "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!"
  await landingPage.toastHaveText(MESSAGE)
});

test("não deve cadastrar com email incorreto", async ({ page }) => {
  const landingPage = new LandingPage(page)
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Koi Targaryen', 'koi.com')

  await landingPage.alertHaveText("Email incorreto")
});

test("não deve cadastrar quando o nome não é preenchido", async ({ page }) => {
  const landingPage = new LandingPage(page)
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', 'koi@targaryen.com')

  await landingPage.alertHaveText("Campo obrigatório");
});

test("não deve cadastrar quando o email não é preenchido", async ({ page }) => {
  const landingPage = new LandingPage(page)
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Koi Targaryen', '')

  await landingPage.alertHaveText("Campo obrigatório");
});

test("não deve cadastrar quando nenhum campo é preenchido", async ({ page }) => {
  const landingPage = new LandingPage(page)
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', '')

  await landingPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório']);
});