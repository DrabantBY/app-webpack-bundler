export class SelectForm {
  #form;

  constructor(formName) {
    this.#form = document.forms[formName];
    this.#initFormValues();
  }

  #initFormValues = () => {
    const searchParams = new URLSearchParams(window.location.search);

    for (const element of this.#form.elements) {
      if (searchParams.has(element.name)) {
        if (element.type === 'radio')
          element.checked = searchParams.get(element.name) === element.value;
        else element.value = searchParams.get(element.name);
      } else {
        if (element.type === 'radio') element.checked = element.value === 'all';
      }
    }

    this.#form.addEventListener('change', this.#onFormChange);
  };

  #onFormChange = ({ target }) => {
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set(target.name, target.value);

    window.location.hash = 'goods';
    window.location.search = searchParams;
  };
}
