import { AuthApi } from '@api';
import { debounce } from '@tools';
import hide from '@svg/hide.svg';
import show from '@svg/show.svg';

export class AuthForm {
  #form;

  constructor(name) {
    this.#form = document.forms[name];
    this.#init();
  }

  #init = () => {
    for (const element of this.#form.elements)
      if (element.type === 'button')
        element.addEventListener('click', this.#onClick);

    this.#form.addEventListener('submit', this.#onSubmit);
    this.#form.addEventListener('input', this.#onInput);
  };

  #onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    for (const { name } of e.target.elements)
      if (name.endsWith('Error')) formData.delete(name);

    try {
      this.#showError('submit');
      await AuthApi.login(formData);
      window.location.pathname = '/';
    } catch ({ message }) {
      this.#showError('submit', message);
    }
  };

  #onClick = ({ currentTarget }) => {
    const input = currentTarget.previousElementSibling;

    if (input.type === 'password') {
      input.type = 'text';
      currentTarget.innerHTML = show;
      return;
    }

    if (input.type === 'text') {
      input.type = 'password';
      currentTarget.innerHTML = hide;
    }
  };

  #onInput = debounce(({ target }) => {
    if (target.name === 'confirm') {
      const isValid = target.value === this.#form.elements.password.value;
      const message = isValid ? '' : 'no match with the password above';
      target.setCustomValidity(message);
    }

    this.#showError(
      target.name,
      target.validationMessage,
      target.validity.valid
    );

    this.#form.elements.submit.disabled = !this.#form.checkValidity();
  });

  #showError = (name, value = '', hidden = !value) => {
    const errorElement = this.#form.elements[`${name}Error`];
    errorElement.hidden = hidden;
    errorElement.value = value;
  };
}
