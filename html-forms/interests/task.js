class ListOfInterests {
  constructor() {
    this.main = document.querySelector('.interests_main');
    this.itemsArray = document.querySelectorAll('.interest');

    this.main.addEventListener('click', this.checkFull.bind(this));
  }

  checkFull(event) {
    const targetItem = event.target.closest('input');

    if (!targetItem) {
      return;
    }

    const targetParent = targetItem.closest('ul');
    const nextElement = targetItem.closest('li');
    const nestedElements = [
      ...nextElement.querySelectorAll(':scope > ul input'),
    ];
    nestedElements.forEach((el) => (el.checked = targetItem.checked));
  }
}

const listOfInterests = new ListOfInterests();
