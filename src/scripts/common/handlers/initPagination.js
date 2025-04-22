function onClick({ currentTarget, target }) {
  if (target === currentTarget) return;

  const searchParams = new URLSearchParams(window.location.search);

  const currentPage = searchParams.get('page') ?? '1';
  const value = target.dataset.page ?? target.parentElement.dataset.page;

  if (currentPage === value) return;

  const nextValue =
    value.startsWith('+') || value.startsWith('-')
      ? Number(currentPage) + Number(value)
      : value;

  searchParams.set('page', nextValue);
  window.location.hash = 'goods';
  window.location.search = searchParams;
}

export function initPagination(selector) {
  const pagination = document.body.querySelector(selector);

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
