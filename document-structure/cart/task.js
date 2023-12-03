class Cart {
  cartProducts = document.querySelector('.cart__products');
  products = document.querySelector('.products');

  productsArray = [];

  constructor() {
    this.registerEvent();
  }

  registerEvent() {
    this.products.addEventListener('click', (event) => this.clickEvent(event));
  }

  clickEvent(event) {
    const controlsButton = event.target.closest('.product__quantity-control');
    if (controlsButton) {
      this.controlsClick(controlsButton);
    }

    const addButton = event.target.closest('.product__add');
    if (addButton) {
      this.addToCart(addButton.closest('.product'));
    }
  }

  controlsClick(elem) {
    const valueElement = elem
      .closest('.product__quantity-controls')
      .querySelector('.product__quantity-value');

    if (elem.classList.contains('product__quantity-control_inc')) {
      this.controlInc(valueElement);
    }

    if (elem.classList.contains('product__quantity-control_dec')) {
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

  addToCart(product) {
    let productCount = product.querySelector('.product__quantity-value');

    const productObj = {
      id: product.dataset.id,
      src: product.querySelector('.product__image').src,
      count: productCount.textContent,
    };

    const productInCart = this.cartProducts.querySelector(
      `[data-id="${productObj.id}"]`
    );

    if (productInCart) {
      const countElement = productInCart.querySelector('.cart__product-count');
      countElement.textContent =
        Number(countElement.textContent) + Number(productObj.count);
    } else {
      this.productsArray.push(productObj);
      const productElement = this.getProductHtml(productObj);
      this.cartProducts.insertAdjacentHTML('beforeend', productElement);
    }

    productCount.textContent = 1;
  }

  getProductHtml({ id, src, count }) {
    return `
    <div class="cart__product" data-id=${id}>
      <img class="cart__product-image" src=${src}>
      <div class="cart__product-count">${count}</div>
    </div>
    `;
  }
}

const cart = new Cart();
