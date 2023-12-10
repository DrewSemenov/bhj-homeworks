class App {
  card = document.querySelector('.card');

  containerForm = document.querySelector('#signin');
  formLogin = document.querySelector('#signin__form');
  formClassActive = 'signin_active';
  formInputs = [...this.formLogin.elements].filter(
    (elem) => elem.tagName === 'INPUT'
  );

  welcome = document.querySelector('#welcome');
  welcomeClassActive = 'welcome_active';
  userIdElement = document.querySelector('#user_id');

  storageKey = 'user_id';
  userId = JSON.parse(localStorage.getItem(this.storageKey));

  constructor() {
    this.createElements();
    this.registerEvents();

    if (this.userId) this.showWelcome();
  }

  createElements() {
    this.createButtonLogout();
    this.createMessageElement();
  }

  registerEvents() {
    this.formLogin.addEventListener('submit', (e) => this.submitHandler(e));
    this.buttonLogout.addEventListener('click', () => this.logoutHandler());
  }

  submitHandler(e) {
    e.preventDefault();

    if (!this.checkForm()) {
      this.showErrorMessage('Поля не должны быть пустыми');
      this.clearForm();
      return;
    }

    this.sendForm();
  }

  checkForm() {
    return this.formInputs.every((elem) => elem.value);
  }

  clearForm() {
    this.formInputs.forEach((input) => (input.value = ''));
  }

  async sendForm() {
    const url = 'https://students.netoservices.ru/nestjs-backend/auth';
    const response = await fetch(url, {
      method: 'POST',
      body: new FormData(this.formLogin),
    });

    const data = await response.json();

    this.clearForm();

    if (!data.success) {
      this.showErrorMessage('Неверный логин/пароль');
      return;
    }

    this.userId = data[this.storageKey];
    localStorage.setItem(this.storageKey, JSON.stringify(this.userId));
    this.showWelcome();
  }

  createMessageElement() {
    this.card.insertAdjacentHTML(
      'beforeend',
      `
    <div class="message message-error" hidden></div>
    `
    );

    this.messageElement = document.querySelector('.message');
  }

  showErrorMessage(message) {
    this.messageElement.hidden = false;
    this.messageElement.textContent = message;

    setTimeout(() => (this.messageElement.hidden = true), 1000);
  }

  createButtonLogout() {
    this.welcome.insertAdjacentHTML(
      'beforeend',
      `
    <button class="btn btn-logout">Выйти</button>
    `
    );

    this.buttonLogout = document.querySelector('.btn-logout');
  }

  showWelcome() {
    this.containerForm.classList.remove(this.formClassActive);

    this.welcome.classList.add(this.welcomeClassActive);
    this.userIdElement.textContent = this.userId;
  }

  showFormLogin() {
    this.containerForm.classList.add(this.formClassActive);

    this.welcome.classList.remove(this.welcomeClassActive);
  }

  logoutHandler() {
    localStorage.removeItem(this.storageKey);

    this.showFormLogin();
  }
}

const app = new App();
