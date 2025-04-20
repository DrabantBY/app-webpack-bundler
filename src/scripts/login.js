import { AuthApi } from '@api';
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

    this.#form.addEventListener('submit', this.#onSubmit);
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
}

new AuthForm('login');
new AuthForm('register');
