class BookReader {
  constructor() {
    this.book = document.querySelector('#book');
    this.bookControls = this.book.querySelector('.book__controls');
    this.fontSizeControls = this.bookControls.querySelectorAll('.font-size');
    this.textColorControls = this.book.querySelectorAll(
      ':scope [class*="text_color"]'
    );
    this.bgColorControls = this.book.querySelectorAll(
      ':scope [class*="bg_color"]'
    );

    this.bookControls.addEventListener(
      'click',
      this.controlsHandler.bind(this)
    );

    this.fontSize = 'normal';
    this.textColor = 'black';
    this.bgColor = 'white';

    this.applyDefaultParams();
  }

  applyDefaultParams() {
    this.book.classList.add(
      `book_fs-${this.fontSize}`,
      `book_color-${this.textColor}`,
      `book_bg-${this.bgColor}`
    );
  }

  formatDataValue(value) {
    const formatValue = value.split('-');
    formatValue[1] =
      formatValue[1].at(0).toUpperCase() + formatValue[1].slice(1);

    return formatValue.join('') + 'Handler';
  }

  controlsHandler(event) {
    const linkControl = event.target.closest('a');

    if (!linkControl) {
      return;
    }

    event.preventDefault();

    const target = event.target.closest('.book__control');
    const targetData = target.dataset.controls;
    const HandlerName = this.formatDataValue(targetData);

    this[HandlerName] && this[HandlerName](linkControl);
  }

  fontSizeHandler(target) {
    this.book.classList.remove(`book_fs-${this.fontSize}`);
    this.fontSize = target.dataset.size;
    this.book.classList.add(`book_fs-${this.fontSize}`);

    this.changeActiveClass(this.fontSizeControls, 'font-size_active', target);
  }

  textColorHandler(target) {
    this.book.classList.remove(`book_color-${this.textColor}`);
    this.textColor = target.dataset.textColor;
    this.book.classList.add(`book_color-${this.textColor}`);

    this.changeActiveClass(this.textColorControls, 'color_active', target);
  }

  bgColorHandler(target) {
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
