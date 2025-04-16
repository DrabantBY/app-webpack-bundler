function onClick({ target }) {
  if (target.tagName === 'BUTTON' || target.tagName === 'svg') {
    const searchParams = new URLSearchParams(window.location.search);

    const currentPage = searchParams.get('page') ?? '1';
    const value = target.dataset.page ?? target.parentElement.dataset.page;

    if (currentPage === value) return;

    if (value.startsWith('+') || value.startsWith('-')) {
      searchParams.set('page', Number(currentPage) + Number(value));
      window.location.hash = 'goods';
      window.location.search = searchParams;
      return;
    }

    searchParams.set('page', value);
    window.location.hash = 'goods';
    window.location.search = searchParams;
  }
}

export function initPagination() {
  const pagination = document.querySelector('[class$="__pagination"]');

  const searchParams = new URLSearchParams(window.location.search);

  const currentPage = searchParams.get('page') ?? '1';

  for (const button of pagination.children) {
    if (button.dataset.page === currentPage) {
      button.classList.add('active');
      break;
    }
  }

  pagination.addEventListener('click', onClick);
}
