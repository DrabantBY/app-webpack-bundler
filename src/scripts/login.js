export class AuthForm {
  #form;

  constructor() {
    this.#form = document.forms.auth;

    this.#init();
  }

  #init = () => {
    this.#form.addEventListener('submit', this.#onSubmit);
  };

  #onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    console.log(formData.toString());
  }
}
