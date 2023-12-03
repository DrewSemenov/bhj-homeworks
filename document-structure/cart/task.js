class Cart {
  cartProducts = document.querySelector('.cart__products');
  products = document.querySelector('.products');

  productsArray = [];

  constructor() {
    this.registerEvent();
  }

  registerEvent() {
    this.products.addEventListener('click', (event) => this.clickEvent(event));
    this.cartProducts.addEventListener('click', (event) =>
      this.removeProductFromCart(event)
    );
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

    const productInCart = this.productsArray.find(
      (elem) => elem.id === productObj.id
    );

    if (productInCart) {
      productInCart.count =
        Number(productInCart.count) + Number(productObj.count);
    } else {
      this.productsArray.push(productObj);
    }

    productCount.textContent = 1;

    this.renderCartProducts();
  }

  renderCartProducts() {
    this.cartProducts.innerHTML = '';
    this.productsArray.forEach((product) => {
      this.cartProducts.insertAdjacentHTML(
        'beforeend',
        this.getProductHtml(product)
      );
    });
  }

  getProductHtml({ id, src, count }) {
    return `
    <div class="cart__product" data-id=${id}>
      <img class="cart__product-image" src=${src}>
      <div class="cart__product-count">${count}</div>
      <button class="cart__product-remove">&times;</button>
    </div>
    `;
  }

  removeProductFromCart(event) {
    const removeButton = event.target.closest('.cart__product-remove');

    if (!removeButton) return;

    const targetId = removeButton.closest('.cart__product').dataset.id;
    this.productsArray = this.productsArray.filter(
      (product) => product.id !== targetId
    );

    this.renderCartProducts();
  }
}

const cart = new Cart();
