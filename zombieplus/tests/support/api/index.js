require('dotenv').config();

const { expect } = require("@playwright/test");

export class Api {
  constructor(request) {
    this.baseApi = process.env.BASE_API;
    this.request = request;
    this.token = undefined;
  }

  async setToken() {
    const response = await this.request.post(`${this.baseApi}/sessions`, {
      data: {
        email: "admin@zombieplus.com",
        password: "pwd123",
      },
    });

    expect(response.ok()).toBeTruthy();
    const body = JSON.parse(await response.text());
    this.token = body.token;
  }

  async getCompanyIdByName(companyName) {
    const response = await this.request.get(`${this.baseApi}/companies`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      params: {
        name: companyName,
      },
    });

    expect(response.ok()).toBeTruthy();

    const body = JSON.parse(await response.text());
    return body.data[0].id;
  }

  async postMedia(media, type) {
    const companyId = await this.getCompanyIdByName(media.company);

    let url = `${this.baseApi}/movies`;
    let multipart = {
      title: media.title,
      overview: media.overview,
      company_id: companyId,
      release_year: media.release_year,
      featured: media.featured,
    };

    if (type === "tvshow") {
      url = `${this.baseApi}/tvshows`;
      multipart = { ...multipart, seasons: media.seasons };
    }

    const response = await this.request.post(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        ContentType: "multipart/form-data",
        Accept: "application/json, text/plain, */*",
      },
      multipart: multipart,
    });

    expect(response.ok()).toBeTruthy();

    return response;
  }
}
