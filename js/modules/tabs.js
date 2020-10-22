function tabs() {
  const tab = document.querySelectorAll('.info-header-tab'),
    info = document.querySelector('.info-header'),
    tabContent = document.querySelectorAll('.info-tabcontent');

  const hideTabContent = (a) => {
    //через цикл проганяємо всі таби і ховаємо
    for (a; a < tabContent.length; a++) {
      tabContent[a].classList.remove('show');
      tabContent[a].classList.add('hide');
    }
  };
  hideTabContent(1); //ставимо не нуль, щоб 1 таб не ховався, а цикл почався з 2 елемента

  const showTabContent = (b) => {
    tabContent[b].classList.remove('hide');
    tabContent[b].classList.add('show');
  };

  info.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.matches('.info-header-tab')) {
      for (let i = 0; i < tab.length; i++) {
        //перебираємо заголовки табів
        if (target === tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });
}

export default tabs;
