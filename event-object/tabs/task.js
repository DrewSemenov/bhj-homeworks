'use strict';

const tabsContainer = document.querySelectorAll('.tabs');

tabsContainer.forEach((tabs) => {
  const tabsNavigation = tabs.querySelectorAll('.tab');
  const tabsContent = tabs.querySelectorAll('.tab__content');

  tabs.addEventListener('click', (event) => {
    const tabTitle = event.target.closest('.tab');

    if (tabTitle) {
      event.preventDefault();

      const index = [...tabsNavigation].indexOf(tabTitle);

      tabsNavigation.forEach((tab) => tab.classList.remove('tab_active'));
      tabsContent.forEach((tab) => tab.classList.remove('tab__content_active'));

      tabsNavigation[index].classList.add('tab_active');
      tabsContent[index].classList.add('tab__content_active');
    }
  });
});
