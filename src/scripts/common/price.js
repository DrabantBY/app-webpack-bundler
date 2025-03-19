export function changePrice() {
  const priceRange = document.getElementById('price-range');
  const priceOutput = document.getElementById('price-output');

  const onInput = ({ currentTarget }) => {
    const priceValue = (currentTarget.value / currentTarget.max) * 100 + '%';

    currentTarget.style.setProperty('--price-value', priceValue);

    priceOutput.value = '$' + currentTarget.value;
  };

  priceRange.addEventListener('input', onInput);
}
