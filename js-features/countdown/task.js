'use strict';

class Countdown {
  constructor(seconds) {
    this.seconds = seconds;
    this.intervalId = null;
    this.outputElement = document.querySelector('#timer');
  }

  getFormatedTime(seconds) {
    return new Date(seconds).toLocaleTimeString([], {
      timeZone: 'UTC',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  startTimer() {
    let seconds = this.seconds < 86399 ? this.seconds : 86399;

    this.showTimer(seconds);

    this.intervalId = setInterval(() => {
      seconds--;

      this.checkWin(seconds);

      this.showTimer(seconds);
    }, 1000);
  }

  showTimer(seconds) {
    this.outputElement.textContent = this.getFormatedTime(seconds * 1000) + ' ';
  }

  checkWin(seconds) {
    if (!seconds) {
      this.stopTimer();
      this.showWin();
    }
  }

  showWin() {
    alert('WIN');

    const outputDiv = document.querySelector('#status');
    outputDiv.textContent = '';
    outputDiv.style.justifyContent = 'center';

    outputDiv.insertAdjacentHTML(
      'afterbegin',
      `Конкурс завершен! 
      <a id="linkWin" href="https://netology.ru/dist-lms/public/1bc654dbac4402a769e9.svg" download target="_blank"></a>`
    );

    const link = document.querySelector('#linkWin');
    link.click();
  }

  stopTimer() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
}

const countdown = new Countdown(10);

countdown.startTimer();
