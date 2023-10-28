const menuLink = [...document.querySelectorAll('.menu__link')].filter(
  (el) => el.nextElementSibling
);

menuLink.forEach((el) => {
  el.addEventListener('click', (event) => {
    event.preventDefault();

    removeActive(menuLink);

    event.target.nextElementSibling.classList.add('menu_active');
  });
});

function removeActive(arr) {
  arr.forEach((el) => el.nextElementSibling.classList.remove('menu_active'));
}
