class BookReader {
  constructor() {
    this.book = document.querySelector('.book');
    this.bookControlsContainer = this.book.querySelector('.book__controls');
    this.bookControlsFontSize =
      this.bookControlsContainer.querySelectorAll('.font-size');

    this.bookControlsContainer.addEventListener(
      'click',
      this.eventHandler.bind(this)
    );

    this.fontSize = 'normal';
  }

  eventHandler(event) {
    const fontSizeControl = event.target.closest('.font-size');

    if (fontSizeControl) {
      event.preventDefault();

      const newFontSize = fontSizeControl.dataset.size;

      this.book.classList.replace(
        `book_fs-${this.fontSize}`,
        `book_fs-${newFontSize}`
      );

      this.fontSize = newFontSize;

      this.bookControlsFontSize.forEach((el) => {
        el.classList.remove('font-size_active');
      });

      fontSizeControl.classList.add('font-size_active');
    }
  }
}

const bookReader = new BookReader();
