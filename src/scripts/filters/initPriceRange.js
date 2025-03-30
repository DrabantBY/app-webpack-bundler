export function initPriceRange() {
  const [firstPrice, lastPrice, outputPrice] =
    document.getElementById('price-range').children;

  const changeRangeStyles = (minPrice = 0, maxPrice = 0) => {
    outputPrice.value =
      minPrice === maxPrice ? `$${minPrice}` : `$${minPrice} - $${maxPrice}`;

    const minRange = `${(minPrice / firstPrice.max) * 100}%`;
    const maxRange = `${(maxPrice / firstPrice.max) * 100}%`;

    firstPrice.style.setProperty('--price-min', minRange);
    firstPrice.style.setProperty('--price-max', maxRange);
  };

  const searchParams = new URLSearchParams(window.location.search);

  if (searchParams.has('price')) {
    const [minPrice, maxPrice] = searchParams.get('price').split(',');
    firstPrice.value = minPrice;
    lastPrice.value = maxPrice;
    changeRangeStyles(minPrice, maxPrice);
  } else {
    firstPrice.value = 0;
    lastPrice.value = 0;
    changeRangeStyles();
  }

  const onInput = () => {
    const minPrice = Math.min(+firstPrice.value, +lastPrice.value);
    const maxPrice = Math.max(+firstPrice.value, +lastPrice.value);
    changeRangeStyles(minPrice, maxPrice);
  };

  firstPrice.addEventListener('input', onInput);
  lastPrice.addEventListener('input', onInput);
}
