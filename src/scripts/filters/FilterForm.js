import { DoubleRangeInput } from '@filters/DoubleRangeInput';

export class FilterForm {
  #form;
  #formFields;
  #formActions;
  #formPrice;

  constructor(formName) {
    this.#form = document.forms[formName];
    this.#formFields = this.#form.querySelectorAll('fieldset');
    this.#formActions = this.#form.querySelectorAll('button');
    this.#formPrice = new DoubleRangeInput(this.#form, 'price');

    this.#initFormValues();
  }

  #initFormValues = () => {
    const searchParams = new URLSearchParams(window.location.search);

    for (const { elements, name } of this.#formFields) {
      if (searchParams.has(name)) {
        for (const element of elements) {
          if (element.type === 'checkbox')
            element.checked = searchParams.get(name).includes(element.value);
        }
      }
    }

    this.#changeFormActions();

    this.#form.addEventListener('submit', this.#onFormSubmit);
    this.#form.addEventListener('reset', this.#onFormReset);
    this.#form.addEventListener('change', this.#changeFormActions);
  };

  #changeFormActions = () => {
    for (const action of this.#formActions)
      action.disabled =
        this.#getCheckedBoxes().length === 0 &&
        this.#formPrice.checkValuesIsMax();
  };

  #onFormSubmit = async (event) => {
    event.preventDefault();

    const searchParams = new URLSearchParams(window.location.search);

    for (const { elements, name } of this.#formFields) {
      const searchValues = [];

      for (const { type, checked, value } of elements) {
        if ((type === 'checkbox' && checked) || type === 'range')
          searchValues.push(value);
      }

      if (searchValues.length > 0) {
        searchValues.sort((a, b) => a - b);
        searchParams.set(name, searchValues);
      }
    }

    window.location.hash = 'goods';
    window.location.search = searchParams;
  };

  #onFormReset = async (event) => {
    event.preventDefault();

    const searchParams = new URLSearchParams(window.location.search);

    this.#formPrice.resetRangeValues();

    const checkedBoxes = this.#getCheckedBoxes();

    for (const checkedBox of checkedBoxes)
      checkedBox.checked = !checkedBox.checked;

    for (const action of this.#formActions) action.disabled = !action.disabled;

    if (searchParams.size !== 0) {
      for (const { name } of this.#formFields) {
        if (searchParams.has(name)) searchParams.delete(name);
      }

      window.location.search = searchParams;
    }
  };

  #getCheckedBoxes = () =>
    this.#form.querySelectorAll('input[type="checkbox"]:checked');
}
