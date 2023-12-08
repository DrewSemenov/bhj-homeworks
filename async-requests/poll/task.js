class Poll {
  container = document.querySelector('.poll');
  poll = null;

  constructor() {
    this.getPoll();
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
}

const poll = new Poll();
