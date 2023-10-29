const slides = [...document.querySelectorAll('.slider__item')];
const dots = [...document.querySelectorAll('.slider__dot')];

const arrowPrev = document.querySelector('.slider__arrow_prev');
const arrowNext = document.querySelector('.slider__arrow_next');

const classSliderActive = 'slider__item_active';
const classDotActive = 'slider__dot_active';

arrowNext.addEventListener('click', () => {
  showNextSlide(getCurrentSlideIndex());
});

arrowPrev.addEventListener('click', () => {
  showPrevSlide(getCurrentSlideIndex());
});

dots.forEach((el, index) => {
  el.addEventListener('click', () => {
    const currentIndex = getCurrentSlideIndex();

    toggleAllElements(currentIndex, index);
  });
});

function getCurrentSlideIndex() {
  return slides.findIndex((el) => el.classList.contains(classSliderActive));
}

function showNextSlide(index) {
  const nextIndex = index + 1 === slides.length ? 0 : index + 1;

  toggleAllElements(index, nextIndex);
}

function showPrevSlide(index) {
  const prevIndex = index - 1 < 0 ? slides.length - 1 : index - 1;

  toggleAllElements(index, prevIndex);
}

function toggleAllElements(currentIndex, nextIndex) {
  toggleClass(slides, classSliderActive, currentIndex, nextIndex);
  toggleClass(dots, classDotActive, currentIndex, nextIndex);
}

function toggleClass(arr, className, currentIndex, nextIndex) {
  arr[currentIndex].classList.remove(className);
  arr[nextIndex].classList.add(className);
}
