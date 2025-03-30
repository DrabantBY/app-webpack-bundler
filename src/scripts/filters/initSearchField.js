import { debounce, DEBOUNCE_TIME } from '@common';

export const initSearchField = () => {
  const searchInput = document.getElementById('search-input');

  const searchParams = new URLSearchParams(window.location.search);

  if (searchParams.has(searchInput.name)) {
    searchInput.value = searchParams.get(searchInput.name);
    searchInput.previousElementSibling.checked = true;
  }

  const onInput = (event) => {
    const searchParams = new URLSearchParams();

    if (event.target.value === '') {
      searchParams.delete(event.target.name);
    } else {
      searchParams.set(event.target.name, event.target.value);
    }

    if (searchParams.size === 0) {
      window.location.href = window.location.pathname;
    } else {
      window.location.search = searchParams;
    }
  };

  searchInput.addEventListener('input', debounce(onInput, DEBOUNCE_TIME));
};
