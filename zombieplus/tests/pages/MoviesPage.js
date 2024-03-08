const {expect} = require('@playwright/test')

export class MoviesPage {
        
        constructor(page) {
            this.page = page;
        }

        async isLoggedIn() {
            await this.page.waitForLoadState('networkidle')
            await expect(this.page).toHaveURL(/.*admin/)
        }

        async create(title, overview, company, release_year) {
            
            await this.page.locator('a[href$="register"]').click()

            await this.page.getByLabel('Titulo do filme').type(title)
            await this.page.getByLabel('Sinopse').type(overview)

            await this.page.locator('#select_company_id .react-select__indicator').click()

            const html = await this.page.content()
            console.log(html)
        }
}