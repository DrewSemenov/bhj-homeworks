class Poll {
  card = document.querySelector('.card');
  container = document.querySelector('.poll');

  poll = null;
  confirmElement = null;

  constructor() {
    this.getPoll();
    this.registerEvents();
  }

  registerEvents() {
    this.container.addEventListener('click', (event) => this.vote(event));
  }

  vote(event) {
    const answerButton = event.target.closest('.poll__answer');
    if (!answerButton) return;

    this.showConfirmWindow();
  }

  closeConfirmWindow(event) {
    const messageClose = event.target.closest('.confirm-button');
    if (!messageClose) return;

    this.confirmElement.remove();
  }

  async getPoll() {
    const url = 'https://students.netoservices.ru/nestjs-backend/poll';
    const response = await fetch(url);
    this.poll = await response.json();

    this.renderPoll();
  }

  renderPoll() {
    this.container.innerHTML = this.getPollHtml();
  }

  getPollHtml() {
    let html = `
    <div class="poll__title" id="poll__title">${this.poll.data.title}</div>
    `;
    this.poll.data.answers.forEach((answer) => {
      html += `
      <button class="poll__answer">${answer}</button>
      `;
    });

    return html;
  }

  showConfirmWindow() {
    if (!this.confirmElement) {
      const element = document.createElement('div');
      element.classList.add('confirm');
      element.innerHTML = `
      <div class="confirm-message">
      Спасибо, ваш голос засчитан!
      </div>
      <div class="confirm-controls">
      <button class="confirm-button">Закрыть</button>
      </div>
      `;
      this.confirmElement = element;

      this.confirmElement.addEventListener('click', (event) =>
        this.closeConfirmWindow(event)
      );
    }

    this.card.append(this.confirmElement);
  }
}

const poll = new Poll();
