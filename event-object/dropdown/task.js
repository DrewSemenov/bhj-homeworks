const dropdowns = document.querySelectorAll('.dropdown');
const dropdownLists = document.querySelectorAll('.dropdown__list');

const listClassActive = 'dropdown__list_active';

dropdowns.forEach((el) => {
  el.addEventListener('click', (event) => {
    el.list = el.querySelector('.dropdown__list');
    el.list.active = el.list.classList.contains(listClassActive);

    const target = event.target;
    const dropdownItem = target.closest('.dropdown__item');
    const dropdownValue = el.querySelector('.dropdown__value');

    if (dropdownItem) {
      event.preventDefault();
      const dropdownLink = dropdownItem.querySelector('.dropdown__link');
      dropdownValue.textContent = dropdownLink.textContent;
    }

    dropdownLists.forEach((list) => list.classList.remove(listClassActive));

    if (target === dropdownValue) {
      if (!el.list.active) {
        el.list.classList.add(listClassActive);
      }
    }
  });
});
