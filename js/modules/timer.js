function timer() {
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
}

export default timer;
