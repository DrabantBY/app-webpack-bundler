export const initFilterForm = () => {
  const searchParams = new URLSearchParams(window.location.search);

  const disableFormBtn = () => {
    const checkboxes = document.forms.filter.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

    const ranges = document.forms.filter.querySelectorAll(
      'input[type="range"]'
    );

    const isDisabled =
      checkboxes.length === 0 &&
      Array.from(ranges).every(({ value, min }) => value === min);

    document.forms.filter.querySelectorAll('button').forEach((btn) => {
      btn.disabled = isDisabled;
    });
  };

  if (searchParams.has('scrollTo')) {
    document.getElementById('goods').scrollIntoView();
    searchParams.delete('scrollTo');
    window.history.replaceState(
      null,
      '',
      searchParams.size === 0 ? '/' : `?${searchParams}`
    );
  }

  for (const el of document.forms.filter.elements) {
    if (el.matches('fieldset') && searchParams.has(el.name)) {
      for (const checkbox of el.elements) {
        checkbox.checked = searchParams.get(el.name).includes(checkbox.value);
      }
    }
  }

  disableFormBtn();

  const onSubmit = (event) => {
    event.preventDefault();

    const searchParams = new URLSearchParams({ scrollTo: 'goods' });

    event.target.querySelectorAll('fieldset').forEach(({ elements, name }) => {
      const searchValue = [];

      for (const { type, checked, value } of elements) {
        if ((type === 'checkbox' && checked) || type === 'range') {
          searchValue.push(value);
        }
      }

      if (searchValue.length > 0) {
        searchParams.set(
          name,
          searchValue.sort((a, b) => Number(a) - Number(b))
        );
      }
    });

    window.location.search = searchParams;
  };

  const onReset = (event) => {
    event.preventDefault();

    const searchParams = new URLSearchParams(window.location.search);

    event.target.querySelectorAll('fieldset').forEach(({ name }) => {
      if (searchParams.has(name)) {
        searchParams.delete(name);
      }
    });

    searchParams.set('scrollTo', 'goods');

    window.location.search = searchParams;
  };

  const onChange = (event) => {
    if (event.target.matches('input')) {
      disableFormBtn();
    }
  };

  document.forms.filter.addEventListener('submit', onSubmit);
  document.forms.filter.addEventListener('reset', onReset);
  document.forms.filter.addEventListener('change', onChange);
};
