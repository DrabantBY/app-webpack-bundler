import { PriceRange } from '@filters/PriceRange.js';

export class FilterForm {
  #form;
  #fields;
  #actions;
  #price;

  constructor(formName) {
    this.#form = document.forms[formName];
    this.#fields = this.#form.querySelectorAll('fieldset');
    this.#actions = this.#form.querySelectorAll('button');
    this.#price = new PriceRange(this.#form, 'price');

    this.#init();
  }

  #init = () => {
    const params = new URLSearchParams(window.location.search);

    for (const { elements, name } of this.#fields) {
      if (params.has(name)) {
        for (const element of elements) {
          if (element.type === 'checkbox')
            element.checked = params.get(name).includes(element.value);
        }
      }
    }

    this.#disableActions();

    this.#form.addEventListener('submit', this.#onSubmit);
    this.#form.addEventListener('reset', this.#onReset);
    this.#form.addEventListener('change', this.#disableActions);
  };

  #disableActions = () => {
    for (const action of this.#actions)
      action.disabled =
        this.#getCheckedBoxes().length === 0 && this.#price.checkValues();
  };

  #onSubmit = (event) => {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);

    for (const { elements, name } of this.#fields) {
      const values = [];

      for (const { type, checked, value } of elements) {
        if ((type === 'checkbox' && checked) || type === 'range')
          values.push(value);
      }

      if (values.length > 0) {
        values.sort((a, b) => a - b);
        params.set(name, values);
      }
    }

    window.location.hash = 'goods';
    window.location.search = params;
  };

  #onReset = async (event) => {
    event.preventDefault();

    this.#price.reset();

    const checkedBoxes = this.#getCheckedBoxes();

    for (const checkedBox of checkedBoxes)
      checkedBox.checked = !checkedBox.checked;

    for (const action of this.#actions) action.disabled = true;

    const params = new URLSearchParams(window.location.search);

    if (params.size !== 0) {
      for (const { name } of this.#fields) {
        if (params.has(name)) params.delete(name);
      }

      window.location.search = params;
    }
  };

  #getCheckedBoxes = () =>
    this.#form.querySelectorAll('input[type="checkbox"]:checked');
}
