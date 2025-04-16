export class GoodsApi {
  static #baseUrl = 'https://sandbox.salesolutions.by/api.php';

  static getGoodsList = async (searchParams) => {
    const url = `${this.#baseUrl}?${searchParams}`;
    const response = await fetch(url);
    return await response.json();
  };
}
