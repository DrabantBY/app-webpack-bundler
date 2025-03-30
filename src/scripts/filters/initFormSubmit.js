export const initFormSubmit = () => {
  const onSubmit = (event) => {
    event.preventDefault();

    const searchParams = new URLSearchParams();

    for (const el of event.target.elements) {
      if (el.tagName === 'FIELDSET') {
        let value = Array.from(el.elements).filter(
          ({ type, checked }) => checked || type === 'range'
        );

        if (value.length > 0) {
          value = value
            .map(({ value }) => value)
            .sort((a, b) => Number(a) - Number(b));

          searchParams.set(el.name, value);
        } else {
          searchParams.delete(el.name);
        }
      }
    }

    window.location.search = searchParams;
  };

  const onReset = () => {};

  document.forms.filter.addEventListener('submit', onSubmit);
};
