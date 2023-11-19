'use strict';

const divsReveal = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
  divsReveal.forEach((div) => {
    if (!checkVisibility(div) && !div.classList.contains('reveal_active')) {
      div.classList.add('reveal_active');
    }

    if (checkVisibility(div) && div.classList.contains('reveal_active')) {
      div.classList.remove('reveal_active');
    }
  });
});

function checkVisibility(el) {
  const windowHeight = document.documentElement.clientHeight;
  const elementTop = el.getBoundingClientRect().top;
  const elementBottom = el.getBoundingClientRect().bottom;

  return elementTop > windowHeight || elementBottom < 0;
}
