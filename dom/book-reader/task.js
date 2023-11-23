class BookReader {
  constructor() {
    this.book = document.querySelector('.book');
    this.bookControls = this.book.querySelector('.book__controls');
    this.fontSizeControls = this.bookControls.querySelectorAll('.font-size');

    this.bookControls.addEventListener(
      'click',
      this.controlsHandler.bind(this)
    );

    this.fontSize = 'normal';
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
    const fontSizeControl = target;

    const newFontSize = fontSizeControl.dataset.size;

    this.book.classList.replace(
      `book_fs-${this.fontSize}`,
      `book_fs-${newFontSize}`
    );

    this.fontSize = newFontSize;

    this.fontSizeControls.forEach((el) => {
      el.classList.remove('font-size_active');
    });

    fontSizeControl.classList.add('font-size_active');
  }
}

const bookReader = new BookReader();
