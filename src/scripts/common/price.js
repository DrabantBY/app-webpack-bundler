export function changePrice() {
  const [firstPrice, lastPrice, outputPrice] = Array.from(
    document.getElementById('price-range').children
  );

  const onInput = () => {
    const minPrice = Math.min(
      Number(firstPrice.value),
      Number(lastPrice.value)
    );

    const maxPrice = Math.max(
      Number(firstPrice.value),
      Number(lastPrice.value)
    );

    outputPrice.value = `$${minPrice} - $${maxPrice}`;

    const minRange = `${(minPrice / firstPrice.max) * 100}%`;
    const maxRange = `${(maxPrice / firstPrice.max) * 100}%`;

    firstPrice.style.setProperty('--price-min', minRange);
    firstPrice.style.setProperty('--price-max', maxRange);
  };

  firstPrice.addEventListener('input', onInput);
  lastPrice.addEventListener('input', onInput);
}
