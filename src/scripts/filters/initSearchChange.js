import { debounce, DEBOUNCE_TIME } from '@common';

export const initSearchChange = () => {
  const searchInput = document.getElementById('search-input');

  const onInput = (event) => {
    const searchParams = new URLSearchParams();

    if (event.target.value === '') {
      searchParams.delete(event.target.name);
      window.location.href = window.location.pathname;
    } else {
      searchParams.set(event.target.name, event.target.value);
      window.location.search = searchParams;
    }
  };

  searchInput.addEventListener('input', debounce(onInput, DEBOUNCE_TIME));
};
