import { GoodsApi } from '@api';

export class GoodsState {
  static #goods = document.getElementById('goods').children;

  static loadGoods = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const data = await GoodsApi.getGoodsList(searchParams);
    this.#updateGoods(data);
  };

  static fetchGoods = async (searchParams) => {
    const data = await GoodsApi.getGoodsList(searchParams);
    this.#updateGoods(data);
  };

  static #updateGoods = (data) => {
    const loopSize = Math.min(data.length, this.#goods.length);

    for (let i = 0; i < loopSize; i++) {
      if (this.#goods[i].hidden) this.#goods[i].hidden = !this.#goods[i].hidden;

      this.#goods[i].querySelector('a').href = `#${data[i].id}`;
      this.#goods[i].querySelector('img').src = data[i].images;

      this.#goods[i].querySelector("[class*='__title']").textContent =
        data[i].title;

      this.#goods[i].querySelector("[class*='__sale']").textContent =
        data[i].sale;

      this.#goods[i].querySelector("[class*='__price-current']").textContent =
        `$${data[i].price}`;

      this.#goods[i].querySelector("[class*='__price-previous']").textContent =
        data[i].price_old ? `$${data[i].price_old}` : '';
    }

    if (this.#goods.length > data.length) {
      for (let i = data.length; i < this.#goods.length; i++)
        this.#goods[i].hidden = !this.#goods[i].hidden;
    }
  };
}
