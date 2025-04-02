import { DoubleRangeInput } from '@filters/DoubleRangeInput';
import { GoodsApi } from '@api';

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
          if (element.type === 'checkbox') {
            element.checked = searchParams.get(name).includes(element.value);
          }
        }
      }
    }

    this.#changeFormActions();

    this.#form.addEventListener('submit', this.#onFormSubmit);
    this.#form.addEventListener('reset', this.#onFormReset);
    this.#form.addEventListener('change', this.#changeFormActions);
  };

  #changeFormActions = () => {
    const hasUncheckedBoxes = this.#getCheckedBoxes().length === 0;
    const hasClearForm =
      hasUncheckedBoxes && this.#formPrice.checkValuesIsMax();

    for (const action of this.#formActions) {
      action.disabled = hasClearForm;
    }
  };

  #onFormSubmit = (event) => {
    event.preventDefault();

    const searchParams = new URLSearchParams();

    for (const { elements, name } of this.#formFields) {
      const searchValues = [];

      for (const { type, checked, value } of elements) {
        if ((type === 'checkbox' && checked) || type === 'range') {
          searchValues.push(value);
        }
      }

      if (searchValues.length > 0) {
        searchValues.sort((a, b) => a - b);
        searchParams.set(name, searchValues);
      }
    }

    this.#updateUrl(searchParams);
    GoodsApi.getGoodsList(searchParams);
  };

  #onFormReset = (event) => {
    event.preventDefault();

    const searchParams = new URLSearchParams(window.location.search);

    this.#formPrice.resetRangeValues();

    const checkedBoxes = this.#getCheckedBoxes();

    for (const checkedBox of checkedBoxes) {
      checkedBox.checked = !checkedBox.checked;
    }

    for (const action of this.#formActions) {
      action.disabled = !action.disabled;
    }

    for (const { name } of this.#formFields) {
      if (searchParams.has(name)) {
        searchParams.delete(name);
      }
    }

    this.#updateUrl(searchParams);
    GoodsApi.getGoodsList(searchParams);
  };

  #updateUrl(searchParams) {
    window.history.pushState(
      null,
      '',
      searchParams.size === 0 ? '/' : `?${searchParams}`
    );
  }

  #getCheckedBoxes = () =>
    this.#form.querySelectorAll('input[type="checkbox"]:checked');
}
