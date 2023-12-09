class Poll {
  card = document.querySelector('.card');
  container = document.querySelector('.poll');
  pollTitle = document.querySelector('#poll__title');
  pollAnswers = document.querySelector('#poll__answers');

  poll = null;
  pollStats = null;
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
    this.poll.answerId = answerButton.dataset.id;
  }

  showConfirmWindow() {
    this.confirmElement.showModal();
  }

  closeConfirmWindow(event) {
    const messageClose = event.target.closest('.confirm-button');
    if (!messageClose) return;

    this.confirmElement.close();
    this.getPollStats(this.poll);
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
    this.pollTitle.textContent = this.poll.data.title;
    this.pollAnswers.innerHTML = this.getPollHtml();
  }

  getPollHtml() {
    let html = ``;
    this.poll.data.answers.forEach((answer, index) => {
      html += `
      <button class="poll__answer" data-id="${index}">${answer}</button>
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

  async getPollStats({ id, answerId }) {
    const url = 'https://students.netoservices.ru/nestjs-backend/poll';
    const result = await fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      body: `vote=${id}&answer=${answerId}`,
    });

    this.pollStats = await result.json();
    this.renderPollStats();
  }

  renderPollStats() {
    this.pollAnswers.innerHTML = '';

    this.container.append(this.getPollStatsHtml());
  }

  getPollStatsHtml() {
    const stats = this.pollStats.stat;
    stats.sort((a, b) => b.votes - a.votes);

    const allVotes = stats.reduce((acc, elem) => acc + elem.votes, 0);

    let html = '';
    stats.forEach((stat) => {
      const percent = ((stat.votes / allVotes) * 100).toFixed(2);
      html += `
      <div class="stat">
        <span class="stat-answer">${stat.answer}:</span>
        <span class="stat-votes">${percent}%</span>
      </div>
      `;
    });

    const result = document.createElement('div');
    result.classList.add('stats');
    result.innerHTML = html;

    return result;
  }
}

const poll = new Poll();
