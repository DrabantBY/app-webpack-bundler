export class Pagination {
  constructor(selector) {
    this.#init(selector);
  }

  #init = (selector) => {
    const pagination = document.body.querySelector(selector);

    const searchParams = new URLSearchParams(window.location.search);

    const currentPage = searchParams.get('page') ?? '1';

    for (const child of pagination.children)
      if (child.value === currentPage) child.classList.add('active');

    pagination.addEventListener('click', this.#setPage);
  };

  #setPage = (e) => {
    const { value } = e.composedPath().find(({ type }) => type === 'button');
    if (!value) return;

    const searchParams = new URLSearchParams(window.location.search);

    const currentPage = searchParams.get('page') ?? '1';

    const nextValue =
      value.startsWith('+') || value.startsWith('-')
        ? Number(currentPage) + Number(value)
        : value;

    searchParams.set('page', nextValue);
    window.location.hash = 'goods';
    window.location.search = searchParams;
  };
}
