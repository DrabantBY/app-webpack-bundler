import { debounce } from '@common';

export class SearchForm {
  #form;

  constructor(formName) {
    this.#form = document.forms[formName];
    this.#init();
  }

  #init = () => {
    const searchParams = new URLSearchParams(window.location.search);

    for (const element of this.#form.elements) {
      if (element.type === 'search') {
        element.value = searchParams.get(this.#form.name) ?? '';
        element.addEventListener('input', this.#onInput);
        element.addEventListener('blur', this.#onBlur);
      }
      if (element.type === 'checkbox')
        element.checked = searchParams.has(this.#form.name);
    }
  };

  #onInput = debounce(({ target }) => {
    const searchParams = new URLSearchParams();

    if (target.value) searchParams.set(target.name, target.value);
    else searchParams.delete(target.name);

    window.location.search = searchParams;
  });

  #onBlur = ({ target }) => {
    if (!target.value) {
      const checkbox = this.#form.querySelector('input[type="checkbox"]');
      checkbox.checked = !checkbox.checked;
    }
  };
}
