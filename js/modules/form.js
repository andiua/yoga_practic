function form() {
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
}

export default form;
