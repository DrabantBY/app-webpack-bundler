export class AuthApi {
  static #baseUrl = 'https://sandbox.salesolutions.by/api.php';

  static login = async (formData) => {
    const response = await fetch(this.#baseUrl, {
      method: 'POST',
      body: formData,
    });

    return await response.json();
  };

  static register = async (formData) => {
    const response = await fetch(this.#baseUrl, {
      method: 'POST',
      body: formData,
    });

    return await response.json();
  };
}
