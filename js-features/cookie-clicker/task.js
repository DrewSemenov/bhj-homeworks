'use strict';

let timerId = null;
let prevTime = Date.now();

const clickerCounter = document.querySelector('#clicker__counter');
const clickerSpeed = document.querySelector('#clicker__speed');
const cookie = document.querySelector('#cookie');

cookie.addEventListener('click', () => {
  const clickTime = Date.now();

  clickerSpeed.textContent = +(1000 / (clickTime - prevTime)).toFixed(2);

  prevTime = clickTime;

  cookie.classList.toggle('cookie-big');
  clickerCounter.textContent++;

  clearTimeout(timerId);
  timerId = setTimeout(() => {
    clickerCounter.textContent = 0;
    clickerSpeed.textContent = 0;
    prevTime = Date.now();
  }, 3000);
});
