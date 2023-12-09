class Poll {
  card = document.querySelector('.card');
  container = document.querySelector('.poll');

  poll = null;
  confirmElement = null;

  constructor() {
    this.startApp();
  }

  startApp() {
    this.getPoll();
    this.registerEvents();
    this.createMessageElement();
  }

  registerEvents() {
    this.container.addEventListener('click', (event) => this.vote(event));
  }

  vote(event) {
    const answerButton = event.target.closest('.poll__answer');
    if (!answerButton) return;

    this.showConfirmWindow();
  }

  showConfirmWindow() {
    this.confirmElement.showModal();
  }

  closeConfirmWindow(event) {
    const messageClose = event.target.closest('.confirm-button');
    if (!messageClose) return;

    this.confirmElement.close();
    this.getPoll();
  }

  async getPoll() {
    const url = 'https://students.netoservices.ru/nestjs-backend/poll';
    const response = await fetch(url);
    const poll = await response.json();

    if (this.poll && this.poll.id === poll.id) {
      this.getPoll();
    }

    this.poll = poll;
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

  createMessageElement() {
    const element = document.createElement('dialog');
    element.classList.add('confirm');
    element.innerHTML = `
      <div class="confirm-message">
      Спасибо, ваш голос засчитан!
      </div>
      <div class="confirm-controls">
      <button class="confirm-button" autofocus>Закрыть</button>
      </div>
      `;

    this.confirmElement = element;
    this.card.append(this.confirmElement);

    this.confirmElement.addEventListener('click', (event) =>
      this.closeConfirmWindow(event)
    );
  }
}

const poll = new Poll();
