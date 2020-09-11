'use strict';
window.addEventListener('DOMContentLoaded', function () {
  const tab = document.querySelectorAll('.info-header-tab'),
    info = document.querySelector('.info-header'),
    tabContent = document.querySelectorAll('.info-tabcontent');

  // tabs
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

  // timer
  const deadLine = '2020-12-01';

  function getTiemRemaining(endtime) {
    let t = Date.parse(endtime) - Date.now(), //Date.now - вертає дату відразу в мс; Date.parse - вертає к-сть мс до дати в аргументі від 1970р
      seconds = Math.floor((t / 1000) % 60), //floor повертає найменше ціле число, а % - повертає залишок від ділення у дільника (60)
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor(t / 1000 / 60 / 60);

    return {
      //повертаємо об'єкт
      total: t,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function setClock(id, endtime) {
    const timer = document.getElementById(id), //передаємо id timer
      hours = timer.querySelector('.hours'),
      minutes = timer.querySelector('.minutes'),
      seconds = timer.querySelector('.seconds'),
      timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      let t = getTiemRemaining(endtime);
      hours.textContent = t.hours < 10 ? '0' + t.hours : t.hours;
      minutes.textContent = t.minutes < 10 ? '0' + t.minutes : t.minutes;
      seconds.textContent = t.seconds < 10 ? '0' + t.seconds : t.seconds;

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
    updateClock();
  }

  setClock('timer', deadLine);

  // modal
  const more = document.querySelector('.more'),
    overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close'),
    tabsMore = document.querySelectorAll('.description-btn');

  const showTab = function (e) {
    overlay.style.display = 'block';
    e.classList.add('more-splash');
  };

  tabsMore.forEach(function (item) {
    item.addEventListener('click', function () {
      showTab();
    });
  });

  more.addEventListener('click', function () {
    showTab();
  });

  overlay.addEventListener('click', (event) => {
    if (
      event &&
      (!event.target.closest('.popup') || event.target.closest('.popup-close'))
    ) {
      overlay.style.display = 'none';
      more.classList.remove('more-splash');
    }
  });
});
