const { expect } = require("@playwright/test");

export class Components {
  constructor(page) {
    this.page = page;
  }

  async haveText(message) {
    const element = this.page.locator(".swal2-html-container");
    await expect(element).toHaveText(message);
  }

  async remove(title) {
    // xpath = //td[text()="A Noite dos Mortos-Vivos"]/..//button
    await this.page
      .getByRole("row", { name: title })
      .getByRole("button")
      .click();
    await this.page.click(".confirm-removal");
  }

  async alertHaveText(target) {
    await expect(this.page.locator(".alert")).toHaveText(target);
  }
}
