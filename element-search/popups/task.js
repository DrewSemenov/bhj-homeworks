'use strict';

const modalSuccess = document.querySelector('#modal_success');
const modalMain = document.querySelector('#modal_main');

modalMain.classList.add('modal_active');

modalMain.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal__close')) {
    modalMain.classList.remove('modal_active');
    modalSuccess.classList.add('modal_active');
  }
});

modalSuccess.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal__close')) {
    modalSuccess.classList.remove('modal_active');
  }
});
