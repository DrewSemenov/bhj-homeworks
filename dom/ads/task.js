class RotatorAds {
  constructor() {
    this.container = document.querySelector('.rotator');
    this.elementsAds = this.container.querySelectorAll(':scope > span');

    this.startRotator();
  }

  startRotator() {
    const currentElement = this.container.querySelector(
      '.rotator__case_active'
    );
    let index = [...this.elementsAds].indexOf(currentElement);

    const nextIndex = ++index === this.elementsAds.length ? 0 : index++;
    const nextElement = this.elementsAds[nextIndex];
    const speed = nextElement.dataset.speed;
    const color = nextElement.dataset.color;

    setTimeout(() => {
      currentElement.classList.remove('rotator__case_active');
      nextElement.classList.add('rotator__case_active');
      nextElement.style.color = color;

      this.startRotator();
    }, speed);
  }
}

const rotatorAds = new RotatorAds();
