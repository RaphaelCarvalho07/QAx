const { expect } = require("@playwright/test");

export class Movies {
  constructor(page) {
    this.page = page;
  }

  async goForm() {
    await this.page.locator('a[href$="register"]').click();
  }

  async submit() {
    await this.page.getByRole("button", { name: "Cadastrar" }).click();
  }

  async create(movie) {
    const { title, overview, company, release_year } = movie;

    await this.goForm();

    await this.page.getByLabel("Titulo do filme").type(title);
    await this.page.getByLabel("Sinopse").type(overview);

    await this.page
      .locator("#select_company_id .react-select__indicator")
      .click();

    await this.page
      .locator(".react-select__option")
      .filter({ hasText: company })
      .click();

    await this.page.locator("#select_year .react-select__indicator").click();

    await this.page
      .locator(".react-select__option")
      .filter({ hasText: release_year })
      .click();

    await this.page
      .locator("input[name=cover]")
      .setInputFiles(`tests/support/fixtures/${movie.cover}`);

    movie.featured ? await this.page.locator(".featured .react-switch").click() : null;

    await this.submit();
  }

  async search(target) {
    await this.page.getByPlaceholder("Busque pelo nome").fill(target);

    await this.page.click('.actions button')
  }

  async tableHave(content) {
    const rows = this.page.getByRole("row");
    await expect(rows).toContainText(content);
  }
}
