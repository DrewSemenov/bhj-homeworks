class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timeElement = container.querySelector('.time-left');
    this.body = document.querySelector('body');

    this.timerId = null;

    this.reset();

    this.registerEvents();

    this.startTimer();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
    this.body.addEventListener('keypress', (event) => {
      const userSymbol = [...event.code].at(-1).toLowerCase();
      const currentSymbol = this.currentSymbol.textContent.toLowerCase();

      if (userSymbol === currentSymbol) {
        this.success();
      } else {
        this.fail();
      }
    });
  }

  startTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }

    const seconds = this.wordElement.textContent.length;
    this.timeElement.textContent = seconds;

    const timer = () => {
      this.timeElement.textContent--;
      if (!+this.timeElement.textContent) {
        this.fail();
      }
    };

    this.timerId = setInterval(timer, 1000);
  }

  success() {
    if (this.currentSymbol.classList.contains('symbol_current'))
      this.currentSymbol.classList.remove('symbol_current');
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);

    this.startTimer();
  }

  getWord() {
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript',
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current' : ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'));

