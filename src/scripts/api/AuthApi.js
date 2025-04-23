export class AuthApi {
  static #baseUrl = 'https://sandbox.salesolutions.by/login_api.php';

  static login = async (formData) => {
    const response = await fetch(this.#baseUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(response.statusText || 'Login failed');
    }

    return await response.json();
  };
}
