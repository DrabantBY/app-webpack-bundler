export class AuthApi {
  static #baseUrl = 'https://sandbox.salesolutions.by/api/login';

  static login = async (formData) => {
    const response = await fetch(this.#baseUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
      // throw new Error(response.statusText || 'Login failed');
    }

    return await response.json();
  };
}
