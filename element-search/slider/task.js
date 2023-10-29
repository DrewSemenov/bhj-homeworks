const slides = [...document.querySelectorAll('.slider__item')];

const arrowPrev = document.querySelector('.slider__arrow_prev');
const arrowNext = document.querySelector('.slider__arrow_next');

arrowNext.addEventListener('click', () => {
  showNextSlide(getCurrentSlideIndex());
});

arrowPrev.addEventListener('click', () => {
  showPrevSlide(getCurrentSlideIndex());
});

function getCurrentSlideIndex() {
  return slides.findIndex((el) => el.classList.contains('slider__item_active'));
}

function showNextSlide(index) {
  const nextIndex = index + 1 === slides.length ? 0 : index + 1;

  toggleClass('slider__item_active', index, nextIndex);
}

function showPrevSlide(index) {
  const prevIndex = index - 1 < 0 ? slides.length - 1 : index - 1;

  toggleClass('slider__item_active', index, prevIndex);
}

function toggleClass(className, currentIndex, nextIndex) {
  slides[currentIndex].classList.remove(className);
  slides[nextIndex].classList.add(className);
}
