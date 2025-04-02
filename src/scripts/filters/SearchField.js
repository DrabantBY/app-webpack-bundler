import { debounce, DEBOUNCE_TIME } from '@common';

export class SearchField {
  #searchInput;

  constructor(id) {
    this.#searchInput = document.getElementById(id);
    this.#initSearchField();
  }

  #initSearchField = () => {
    const searchParams = new URLSearchParams(window.location.search);

    this.#searchInput.value = searchParams.get(this.#searchInput.name) ?? '';

    this.#searchInput.previousElementSibling.checked = searchParams.has(
      this.#searchInput.name
    );

    this.#searchInput.addEventListener(
      'input',
      debounce(this.#onSearchInput, DEBOUNCE_TIME)
    );
  };

  #onSearchInput = (event) => {
    const searchParams = new URLSearchParams();

    if (event.target.value === '') {
      searchParams.delete(event.target.name);
    } else {
      searchParams.set(event.target.name, event.target.value);
    }

    window.history.pushState(
      null,
      '',
      searchParams.size === 0 ? '/' : `?${searchParams}`
    );
  };
}
