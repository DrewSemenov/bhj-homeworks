class Cart {
  cart = document.querySelector('.cart');
  cartProducts = this.cart.querySelector('.cart__products');
  products = document.querySelector('.products');

  cartProductsArray = localStorage.cartProducts
    ? JSON.parse(localStorage.cartProducts)
    : [];

  constructor() {
    this.startApp();
  }

  startApp() {
    this.registerEvent();
    this.renderCartProducts();
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
      return;
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

    const productInCart = this.cartProductsArray.find(
      (elem) => elem.id === productObj.id
    );

    if (productInCart) {
      productInCart.count =
        Number(productInCart.count) + Number(productObj.count);
    } else {
      this.cartProductsArray.push(productObj);
    }

    productCount.textContent = 1;

    this.renderCartProducts();
  }

  renderCartProducts() {
    if (!this.cartProductsArray.length) {
      this.cart.hidden = true;
    } else {
      this.cart.hidden = false;

      this.cartProducts.innerHTML = '';
      this.cartProductsArray.forEach((product) => {
        this.cartProducts.insertAdjacentHTML(
          'beforeend',
          this.getProductHtml(product)
        );
      });
    }

    this.saveCartProducts();
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
    this.cartProductsArray = this.cartProductsArray.filter(
      (product) => product.id !== targetId
    );

    this.renderCartProducts();
  }

  saveCartProducts() {
    localStorage.cartProducts = JSON.stringify(this.cartProductsArray);
  }
}

const cart = new Cart();
