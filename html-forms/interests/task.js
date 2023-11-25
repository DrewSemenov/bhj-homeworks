class ListOfInterests {
  constructor() {
    this.main = document.querySelector('.interests_main');
    this.itemsArray = document.querySelectorAll('.interest');

    this.main.addEventListener('click', this.checkItems.bind(this));
  }

  checkItems(event) {
    const targetItem = event.target.closest('input');

    if (!targetItem) {
      return;
    }

    this.checkNested(targetItem);
    this.checkParent(targetItem);
  }

  checkNested(element) {
    const nextElement = element.closest('li');

    const nestedElements = [...nextElement.querySelectorAll('ul input')];
    nestedElements.forEach((el) => {
      el.checked = element.checked;
      el.indeterminate = false;
    });
  }

  checkParent(element) {
    const parent = element.closest('ul').closest('li');
    if (!parent) {
      return;
    }

    const parentInput = parent.querySelector('input');

    const childItems = [
      ...parent.querySelectorAll(':scope ul > li > label > input'),
    ];

    const childItemsLength = childItems.length;
    const checkedChild = childItems.filter((el) => el.checked).length;

    if (!checkedChild) {
      parentInput.checked = false;
      parentInput.indeterminate = false;
    }

    if (checkedChild && checkedChild !== childItemsLength) {
      parentInput.checked = false;
      parentInput.indeterminate = true;
    }

    if (checkedChild === childItemsLength) {
      parentInput.checked = true;
      parentInput.indeterminate = false;
    }

    this.checkParent(parentInput);
  }
}

const listOfInterests = new ListOfInterests();
