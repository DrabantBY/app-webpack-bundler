function onClick({ currentTarget }) {
  const searchParams = new URLSearchParams(window.location.search);

  const currentPage = searchParams.get('page') ?? '1';

  if (currentPage === currentTarget.value) return;

  const nextValue =
    currentTarget.value.startsWith('+') || currentTarget.value.startsWith('-')
      ? Number(currentPage) + Number(currentTarget.value)
      : currentTarget.value;

  searchParams.set('page', nextValue);
  window.location.hash = 'goods';
  window.location.search = searchParams;
}

export function initPagination(selector) {
  const buttons = document.body.querySelector(selector).children;

  const searchParams = new URLSearchParams(window.location.search);

  const currentPage = searchParams.get('page') ?? '1';

  for (const button of buttons) {
    if (button.value === currentPage) {
      button.classList.add('active');
    }

    button.addEventListener('click', onClick);
  }
}
