
const { test, expect } = require("../support")
const { faker } = require('@faker-js/faker')

test("deve cadastrar um lead na fila de espera", async ({ page }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName, leadEmail)
  const MESSAGE =
  "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato."
  await page.components.haveText(MESSAGE)
});

test("não deve cadastrar quando o email já existe", async ({ page, request }) => {
  
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()
  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })

  expect((newLead).ok()).toBeTruthy()

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName, leadEmail)
  const MESSAGE =
  'Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. ' +
  'Isso significa que você está um passo mais perto de aproveitar nossos serviços.'
  await page.components.haveText(MESSAGE)
});

test("não deve cadastrar com email incorreto", async ({ page }) => {
  
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('Koi Targaryen', 'koi.com')

  await page.components.alertHaveText("Email incorreto")
});

test("não deve cadastrar quando o nome não é preenchido", async ({ page }) => {
  
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('', 'koi@targaryen.com')

  await page.components.alertHaveText("Campo obrigatório");
});

test("não deve cadastrar quando o email não é preenchido", async ({ page }) => {
  
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('Koi Targaryen', '')

  await page.components.alertHaveText("Campo obrigatório");
});

test("não deve cadastrar quando nenhum campo é preenchido", async ({ page }) => {
  
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('', '')

  await page.components.alertHaveText(['Campo obrigatório', 'Campo obrigatório']);
});