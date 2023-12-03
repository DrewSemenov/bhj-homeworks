class Cart {
  cart = document.querySelector('.cart');
  products = document.querySelector('.products');

  constructor() {
    this.registerEvent();
  }

  registerEvent() {
    this.products.addEventListener('click', (event) => this.clickEvent(event));
  }

  clickEvent(event) {
    const target = event.target.closest('.product__quantity-control');

    if (!target) return;

    const valueElement = target
      .closest('.product__quantity-controls')
      .querySelector('.product__quantity-value');

    if (target.classList.contains('product__quantity-control_inc')) {
      this.controlInc(valueElement);
    }

    if (target.classList.contains('product__quantity-control_dec')) {
      this.controlDec(valueElement);
    }
  }

  controlInc(elem) {
    elem.textContent++;
  }

  controlDec(elem) {
    if (elem.textContent < 2) return;
    elem.textContent--;
  }
}

const cart = new Cart();
