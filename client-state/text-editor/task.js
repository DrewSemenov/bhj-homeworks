class TextRedactor {
  card = document.querySelector('.card');
  editor = document.querySelector('#editor');

  storageKey = 'history';
  history = localStorage.getItem(this.storageKey);

  constructor() {
    this.loadText();
    this.registerEvents();
    this.createButtonReset();
  }

  registerEvents() {
    this.editor.addEventListener('input', () => this.saveText());
  }

  loadText() {
    this.editor.value = this.history ?? '';
  }

  saveText() {
    localStorage.setItem(this.storageKey, this.editor.value);
  }

  createButtonReset() {
    const button = document.createElement('button');
    button.classList.add('btn-reset');
    button.textContent = 'Очистить редактор';
    this.card.append(button);

    button.addEventListener('click', () => this.clearEditor());
  }

  clearEditor() {
    this.editor.value = '';
    this.saveText();
  }
}

const textRedactor = new TextRedactor();
