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
    const buttons = document.body.querySelectorAll('button[type="button"]');

    for (const button of buttons)
      button.addEventListener('click', this.#onClick);

    this.#disableSubmit();

    this.#form.addEventListener('submit', this.#onSubmit);
    this.#form.addEventListener('input', this.#onInput);
  };

  async #onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = await AuthApi.login(formData);

    alert(JSON.stringify(data));
  }

  #onClick({ currentTarget }) {
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
  }

  #onInput = debounce(({ target }) => {
    if (target.name === 'confirm') {
      const isMatchValue = target.value === this.#form.elements.password.value;
      const message = isMatchValue ? '' : 'no match with the password above';
      target.setCustomValidity(message);
    }

    const errorElement = target.parentElement.nextElementSibling;
    errorElement.hidden = target.validity.valid;
    errorElement.textContent = target.validationMessage;

    this.#disableSubmit();
  });

  #disableSubmit = () => {
    this.#form.querySelector('button[type="submit"]').disabled =
      !this.#form.checkValidity();
  };
}

new AuthForm('login');
new AuthForm('register');
