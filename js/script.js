'use strict';
window.addEventListener('DOMContentLoaded', () => {
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

  const getTiemRemaining = (endtime) => {
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
  };

  const setClock = (id, endtime) => {
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
  };

  setClock('timer', deadLine);

  // modal
  const more = document.querySelector('.more'),
    overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close'),
    tabsMore = document.querySelectorAll('.description-btn');

  const showTab = function (e) {
    overlay.style.display = 'block';
    e.target.classList.add('more-splash');
  };

  tabsMore.forEach((item) => {
    item.addEventListener('click', (e) => showTab(e));
  });

  more.addEventListener('click', (e) => showTab(e));

  overlay.addEventListener('click', (event) => {
    if (
      event &&
      (!event.target.closest('.popup') || event.target.closest('.popup-close'))
    ) {
      overlay.style.display = 'none';
      more.classList.remove('more-splash');
    }
  });

  // form
  const message = {
    loading: 'Загрузка',
    success: 'Спасибо, мы скоро свяжемся',
    failere: 'Что-то пошло не так',
  };
  const form = document.querySelectorAll('form'),
    statusMassege = document.createElement('p');

  statusMassege.classList.add('status');

  function conectServer(data) {
    return new Promise(function (res, rej) {
      let request = new XMLHttpRequest();
      // add listeners
      request.addEventListener('loadstart', () => {
        statusMassege.textContent = message.loading;
      });
      request.addEventListener('load', () => {
        if (request.status === 200 && request.status < 300) {
          res();
        } else {
          rej(request.statusText);
        }
      });

      request.open('POST', 'server.php');
      request.setRequestHeader(
        'Content-Type',
        'application/json; charset=utf-8'
      );

      var object = {};
      data.forEach((value, key) => {
        object[key] = value;
      });
      var json = JSON.stringify(object);
      request.send(json);
    });
  }

  form.forEach((item) => {
    const input = item.querySelectorAll('input');
    item.addEventListener('submit', function (e) {
      //вішати треба на саму форму, а не кнопку сабміт
      e.preventDefault();
      item.appendChild(statusMassege);
      let data = new FormData(item); //тягнеться з інпута атребут name
      setTimeout(() => item.removeChild(statusMassege), 5000);
      conectServer(data)
        .then(() => {
          statusMassege.textContent = message.success;
        })
        .catch((err) => {
          console.error(err);
          statusMassege.textContent = message.failere;
        })
        .then(() => {
          input.forEach((item) => (item.value = ''));
        });
    });
  });

  // slider
  const slides = document.querySelectorAll('.slider-item'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    dotsWrap = document.querySelector('.slider-dots'),
    dots = document.querySelectorAll('.dot');
  let slideIndex = 4;

  const showSlides = (n) => {
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    slides.forEach((slide) => (slide.style.display = 'none'));
    dots.forEach((dot) => dot.classList.remove('dot-active'));
    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('dot-active');
  };
  const changeSlide = (n) => {
    showSlides((slideIndex += n));
  };
  const currentSlide = (n) => {
    showSlides((slideIndex = n));
  };
  showSlides(slideIndex);
  prev.addEventListener('click', () => {
    changeSlide(-1);
  });
  next.addEventListener('click', () => {
    changeSlide(1);
  });
  dotsWrap.addEventListener('click', (e) => {
    for (let i = 0; i < dots.length; i++) {
      if (e.target.classList.contains('dot') && e.target === dots[i]) {
        currentSlide(i + 1);
      }
    }
  });

  // calculator
  const counterInputs = document.querySelectorAll('.counter-block-input'),
    place = document.getElementById('select'),
    totalValue = document.getElementById('total');
  let total = 0;

  totalValue.textContent = total;

  counterInputs.forEach((input) =>
    input.addEventListener('change', () => {
      if (![...counterInputs].every((elem) => elem.value)) {
        totalValue.textContent = 0;
      } else {
        total =
          [...counterInputs].reduce((a, b) => {
            Number(a.value) + Number(b.value);
          }) * 1000;
        totalValue.textContent = total;
      }
    })
  );
  place.addEventListener('change', function () {
    if (![...counterInputs].every((elem) => elem.value)) {
      totalValue.textContent = 0;
    } else {
      let a = total;
      console.dir(this);
      totalValue.textContent = a * this.options[this.selectedIndex].value; // options & selectedIndex - властивості тега selector
    }
  });
});
