export class DoubleRangeInput {
  #ranges;
  #output;
  #rangeMinValue;
  #rangeMaxValue;

  constructor(form, fieldName) {
    this.#ranges = [...form.querySelectorAll('input[type="range"]')];
    this.#output = form.querySelector('output');
    this.#rangeMaxValue = Number(this.#ranges[0].max);
    this.#rangeMinValue = Number(this.#ranges[0].min);
    this.#initRangeValues(fieldName);
  }

  resetRangeValues = () => {
    this.#changeRangeValues([this.#rangeMinValue, this.#rangeMaxValue]);
  };

  checkValuesIsMax = () =>
    this.#ranges.some(({ min, value }) => min === value) &&
    this.#ranges.some(({ max, value }) => max === value);

  #initRangeValues = (fieldName) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has(fieldName)) {
      const values = searchParams.get(fieldName).split(',');
      this.#changeRangeValues(values);
    } else {
      this.resetRangeValues();
    }

    for (const range of this.#ranges) {
      range.addEventListener('input', this.#onRangeInput);
    }
  };

  #onRangeInput = () => {
    const currentRangeValues = this.#ranges.map(({ value }) => Number(value));

    this.#changeRangeStyles([
      Math.min(...currentRangeValues),
      Math.max(...currentRangeValues),
    ]);
  };

  #changeRangeValues = (values) => {
    for (let i = 0; i < values.length; i++) {
      this.#ranges[i].value = values[i];
    }

    this.#changeRangeStyles(values);
  };

  #changeRangeStyles = (values) => {
    this.#setOutputValue(values);

    const [min, max] = this.#calcMinMaxRanges(values);

    this.#ranges[0].style.setProperty('--price-min', min);
    this.#ranges[0].style.setProperty('--price-max', max);
  };

  #calcMinMaxRanges = (values) =>
    values.map((value) => `${(value / this.#rangeMaxValue) * 100}%`);

  #setOutputValue = ([min, max]) => {
    this.#output.value = min === max ? `$${min}` : `$${min} - $${max}`;
  };
}
