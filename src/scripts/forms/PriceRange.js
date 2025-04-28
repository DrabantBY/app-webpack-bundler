export class PriceRange {
  #ranges;
  #output;
  #minValue;
  #maxValue;

  constructor(form, fieldName) {
    this.#ranges = [...form.querySelectorAll('input[type="range"]')];
    this.#output = form.querySelector('output');
    this.#maxValue = Number(this.#ranges[0].max);
    this.#minValue = Number(this.#ranges[0].min);
    this.#init(fieldName);
  }

  reset = () => {
    this.#changeValues([this.#minValue, this.#maxValue]);
  };

  checkValues = () =>
    this.#ranges.some(({ min, value }) => min === value) &&
    this.#ranges.some(({ max, value }) => max === value);

  #init = (fieldName) => {
    const params = new URLSearchParams(window.location.search);

    const values = params.get(fieldName)?.split(',') ?? [
      this.#minValue,
      this.#maxValue,
    ];

    this.#changeValues(values);

    for (const range of this.#ranges)
      range.addEventListener('input', this.#onInput);
  };

  #onInput = () => {
    const values = this.#ranges.map(({ value }) => Number(value));
    this.#changeStyles([Math.min(...values), Math.max(...values)]);
  };

  #changeValues = (values) => {
    for (let i = 0; i < values.length; i++) this.#ranges[i].value = values[i];

    this.#changeStyles(values);
  };

  #changeStyles = (values) => {
    this.#changeOutput(values);

    const [min, max] = this.#calcMinMax(values);

    this.#ranges[0].style.setProperty('--price-min', min);
    this.#ranges[0].style.setProperty('--price-max', max);
  };

  #calcMinMax = (values) =>
    values.map((value) => `${(value / this.#maxValue) * 100}%`);

  #changeOutput = ([min, max]) => {
    this.#output.value = min === max ? `$${min}` : `$${min} - $${max}`;
  };
}
