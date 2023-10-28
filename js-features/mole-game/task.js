'use strict';

const deadMoles = document.querySelector('#dead');
const lost = document.querySelector('#lost');

const arrHoles = document.querySelectorAll('.hole');
arrHoles.forEach((item) => {
  item.addEventListener('click', (event) => {
    event.target.classList.contains('hole_has-mole')
      ? deadMoles.textContent++
      : lost.textContent++;

    checkCounts();
  });
});

function checkCounts() {
  if (lost.textContent === '5') {
    showModal('Вы проиграли');
  }

  if (deadMoles.textContent === '10') {
    showModal('Вы победили');
  }
}

function showModal(message) {
  const game = document.querySelector('.hole-game');
  const modal = document.createElement('div');

  modal.classList.add('modal');
  modal.innerHTML = `
  ${message}
  <button class='reset'>Новая Игра</button>
  `;

  game.insertAdjacentElement('afterbegin', modal);

  const buttonReset = document.querySelector('.reset');
  buttonReset.addEventListener('click', () => {
    lost.textContent = 0;
    deadMoles.textContent = 0;
    modal.remove();
  });
}
