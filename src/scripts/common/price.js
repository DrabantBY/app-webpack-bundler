export function changePrice() {
  const [firstPrice, lastPrice, outputPrice] =
    document.getElementById('price-range').children;

  const onInput = () => {
    const minPrice = Math.min(+firstPrice.value, +lastPrice.value);
    const maxPrice = Math.max(+firstPrice.value, +lastPrice.value);

    outputPrice.value = `$${minPrice} - $${maxPrice}`;

    const minRange = `${(minPrice / firstPrice.max) * 100}%`;
    const maxRange = `${(maxPrice / firstPrice.max) * 100}%`;

    firstPrice.style.setProperty('--price-min', minRange);
    firstPrice.style.setProperty('--price-max', maxRange);
  };

  firstPrice.addEventListener('input', onInput);
  lastPrice.addEventListener('input', onInput);
}
