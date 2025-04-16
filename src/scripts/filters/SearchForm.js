import { debounce, DEBOUNCE_TIME } from '@common';

export class SearchForm {
  #form;
  #input;
  #checkbox;

  constructor(formName) {
    this.#form = document.forms[formName];
    this.#input = this.#form.querySelector('input[type="search"]');
    this.#checkbox = this.#form.querySelector('input[type="checkbox"]');
    this.#initSearchField(formName);
  }

  #initSearchField = (formName) => {
    const searchParams = new URLSearchParams(window.location.search);

    this.#input.value = searchParams.get(formName) ?? '';

    this.#checkbox.checked = searchParams.has(formName);

    this.#input.addEventListener(
      'input',
      debounce(this.#onSearchInput, DEBOUNCE_TIME)
    );

    this.#input.addEventListener('blur', this.#onSearchBlur);
  };

  #onSearchInput = (event) => {
    const searchParams = new URLSearchParams();

    if (event.target.value === '') searchParams.delete(event.target.name);
    else searchParams.set(event.target.name, event.target.value);

    window.location.search = searchParams;
  };

  #onSearchBlur = (event) => {
    if (event.target.value === '')
      this.#checkbox.checked = !this.#checkbox.checked;
  };
}
