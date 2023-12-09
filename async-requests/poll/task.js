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
    this.createElements();
  }

  createElements() {
    this.createNewPollButton();
    this.createMessageElement();
    this.createPollStatsElement();
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
    const messageClose = event.target.closest('.btn-confirm');
    if (!messageClose) return;

    this.confirmElement.close();
    this.getPollStats(this.poll);

    this.buttonNewPoll.hidden = false;
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
    this.pollStatsElement.innerHTML = '';
    this.pollStatsElement.hidden = true;
    this.buttonNewPoll.hidden = true;

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
      <button class="btn btn-confirm" autofocus>Закрыть</button>
      </div>
      `;

    this.confirmElement = element;
    this.card.append(this.confirmElement);

    this.confirmElement.addEventListener('click', (event) =>
      this.closeConfirmWindow(event)
    );
  }

  createNewPollButton() {
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-new-poll');
    button.textContent = 'Новый вопрос';
    button.hidden = true;

    this.buttonNewPoll = button;

    this.card.append(this.buttonNewPoll);

    this.buttonNewPoll.addEventListener('click', () => this.getPoll());
  }

  createPollStatsElement() {
    const element = document.createElement('div');
    element.classList.add('stats');
    element.hidden = true;
    this.pollStatsElement = element;

    this.container.append(this.pollStatsElement);
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

    this.pollStatsElement.hidden = false;
    this.pollStatsElement.innerHTML = this.getPollStatsHtml();
  }

  getPollStatsHtml() {
    const stats = this.pollStats.stat;
    const answer = stats[this.poll.answerId].answer;
    const allVotes = stats.reduce((acc, elem) => acc + elem.votes, 0);

    stats.sort((a, b) => b.votes - a.votes);

    let html = '';
    stats.forEach((stat) => {
      const percent = ((stat.votes / allVotes) * 100).toFixed(2);
      html += `
      <div class="stat ${stat.answer === answer && 'answer-selected'}">
        <span class="stat-answer">${stat.answer}:</span>
        <span class="stat-votes">${percent}%</span>
      </div>
      `;
    });

    return html;
  }
}

const poll = new Poll();
