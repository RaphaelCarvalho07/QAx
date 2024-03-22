const { expect } = require("@playwright/test");

export class TVShows {
    constructor(page) {
        this.page = page;
    }

    async goForm() {
        await this.page.locator('a[href$="tvshows"]').click();
        await this.page.locator('a[href$="register"]').click();
    }

    // preciso finalizar essa função
    async create(tvshow) {
        const { title, overview, company, release_year, seasons } = tvshow;0

    }
}