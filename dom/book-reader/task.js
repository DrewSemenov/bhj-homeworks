class BookReader {
  constructor() {
    this.book = document.querySelector('#book');
    this.bookControls = this.book.querySelector('.book__controls');
    this.fontSizeControls = this.bookControls.querySelectorAll('.font-size');
    this.fontColorControls = this.book
      .querySelector('.book__control_color')
      .querySelectorAll('.color');
    this.bgColorControls = this.book
      .querySelector('.book__control_background')
      .querySelectorAll('.color');

    this.bookControls.addEventListener(
      'click',
      this.controlsHandler.bind(this)
    );

    this.fontSize = 'normal';
    this.fontColor = 'black';
    this.bgColor = 'white';

    this.applyDefaultParams();
  }

  applyDefaultParams() {
    this.book.classList.add(
      `book_fs-${this.fontSize}`,
      `book_color-${this.fontColor}`,
      `book_bg-${this.bgColor}`
    );
  }

  formatDataValue(value) {
    const arrValue = value.split('-');
    arrValue[1] = arrValue[1].at(0).toUpperCase() + arrValue[1].slice(1);

    return arrValue.join('') + 'Handler';
  }

  controlsHandler(event) {
    const linkControl = event.target.closest('a');

    if (!linkControl) {
      return;
    }

    event.preventDefault();

    const target = event.target.closest('.book__control');

    const targetData = target.dataset.controls;
    const methodName = this.formatDataValue(targetData);

    this[methodName] && this[methodName](linkControl);
  }

  fontSizeHandler(target) {
    this.book.classList.remove(`book_fs-${this.fontSize}`);

    this.fontSize = target.dataset.size;

    this.book.classList.add(`book_fs-${this.fontSize}`);

    this.changeActiveClass(this.fontSizeControls, 'font-size_active', target);
  }

  fontColorHandler(target) {
    this.book.classList.remove(`book_color-${this.fontColor}`);

    this.fontColor = target.dataset.textColor;

    this.book.classList.add(`book_color-${this.fontColor}`);

    this.changeActiveClass(this.fontColorControls, 'color_active', target);
  }

  backgroundColorHandler(target) {
    this.book.classList.remove(`book_bg-${this.bgColor}`);

    this.bgColor = target.dataset.bgColor;

    this.book.classList.add(`book_bg-${this.bgColor}`);

    this.changeActiveClass(this.bgColorControls, 'color_active', target);
  }

  changeActiveClass(array, classActive, targetElement) {
    array.forEach((el) => {
      el.classList.remove(classActive);
    });

    targetElement.classList.add(classActive);
  }
}

const bookReader = new BookReader();
