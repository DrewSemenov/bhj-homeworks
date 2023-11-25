// добавляем несколько контейнеров с рекламой
// и рандомно назначаем активный блок в каждом контейнере
const main = document.querySelector('.content');
const card = document.querySelector('.card');
const arrIndex = [];

for (let i = 0; i < 3; i++) {
  main.append(card.cloneNode(true));
  arrIndex.push(Math.floor(Math.random() * 5) + 1);
}

for (let i = 0; i < 4; i++) {
  arrIndex.push(Math.floor(Math.random() * 5) + 1);
}

const rotators = document.querySelectorAll('.rotator');
rotators.forEach((el, index) => {
  const elementsAds = el.querySelectorAll('.rotator__case');
  elementsAds.forEach((element) =>
    element.classList.remove('rotator__case_active')
  );
  elementsAds[arrIndex[index]].classList.add('rotator__case_active');
});

// task solution
class RotatorAds {
  constructor() {
    this.containers = document.querySelectorAll('.rotator');

    this.containers.forEach((element) => {
      this.startRotator(element);
    });
  }

  startRotator(element) {
    const elementsAds = [...element.querySelectorAll(':scope > span')];
    const currentElement = elementsAds.filter((el) =>
      el.classList.contains('rotator__case_active')
    )[0];
    let index = elementsAds.indexOf(currentElement);

    const nextIndex = ++index === elementsAds.length ? 0 : index++;
    const nextElement = elementsAds[nextIndex];
    const { speed, color } = nextElement.dataset;

    setTimeout(() => {
      currentElement.classList.remove('rotator__case_active');
      nextElement.classList.add('rotator__case_active');
      nextElement.style.color = color;

      this.startRotator(element);
    }, speed);
  }
}

const rotatorAds = new RotatorAds();
