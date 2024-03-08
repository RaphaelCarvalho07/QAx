const { test } = require("@playwright/test");

const { LoginPage } = require("../pages/LoginPage")
const {MoviesPage} = require('../pages/MoviesPage')
const {Toast} = require('../pages/Components')

let loginPage
let moviesPage
let toast

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)
  moviesPage = new MoviesPage(page)
  toast = new Toast(page)
})

test("deve poder cadastrar um novo filme", async (page) => {

    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await moviesPage.isLoggedIn()

    await moviesPage.create('nome filme', 'sinopse filme')
    
})