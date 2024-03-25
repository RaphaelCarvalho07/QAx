const { expect } = require("@playwright/test");

export class TVShows {
  constructor(page) {
    this.page = page;
  }
  async visit() {
    await this.page.getByRole("link", { name: /^Séries/ }).click();
    await expect(
      this.page.getByRole("heading", { name: /^Séries/ })
    ).toBeVisible();
  }

  async goForm() {
    await this.visit();
    await this.page.locator('a[href$="register"]').click();
    await expect(this.page.url()).toContain(`/admin/tvshows/register`);
  }

  async submit() {
    await this.page.getByRole("button", { name: "Cadastrar" }).click();
  }

  async create(tvshow) {
    const { title, overview, company, release_year, seasons } = tvshow;

    await this.goForm();

    await this.page.locator('input[name="title"]').type(title);
    await this.page.locator("#overview").type(overview);

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

    await this.page.locator('input[name="seasons"]').type(seasons);

    await this.page
      .locator("input[name=cover]")
      .setInputFiles(`tests/support/fixtures/${tvshow.cover}`);

    tvshow.featured
      ? await this.page.locator(".featured .react-switch").click()
      : null;

    await this.submit();
  }
}
