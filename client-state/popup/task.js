class Subscribe {
  modalWindow = document.querySelector('#subscribe-modal');
  modalClassActive = 'modal_active';
  cookieName = 'subscribe';

  constructor() {
    if (!this.getCookie(this.cookieName)) {
      this.showModalWindow();
    }

    this.createButton();
    this.registerEvents();
  }

  registerEvents() {
    this.modalWindow.addEventListener('click', (e) => this.closeModalWindow(e));
  }

  showModalWindow() {
    this.modalWindow.classList.add(this.modalClassActive);
  }

  hideModalWindow() {
    this.modalWindow.classList.remove(this.modalClassActive);
  }

  closeModalWindow(e) {
    const buttonClose = e.target.closest('.modal__close_times');
    if (!buttonClose) return;

    this.hideModalWindow();
    this.setCookie();
  }

  setCookie() {
    document.cookie = `${this.cookieName}=pressed`;
  }

  deleteCookie() {
    document.cookie = `${this.cookieName}=; max-age=-1`;
    location.reload();
  }

  getCookie(name) {
    let matches = document.cookie.match(
      new RegExp(
        '(?:^|; )' +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
          '=([^;]*)'
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  createButton() {
    const button = document.createElement('button');
    button.classList.add('btn');
    button.style.color = 'black';
    button.textContent = 'удалить куку';
    this.modalWindow.after(button);

    button.addEventListener('click', () => this.deleteCookie());
  }
}

const subscribe = new Subscribe();
