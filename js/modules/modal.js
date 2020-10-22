function modal() {
  const more = document.querySelector('.more'),
    overlay = document.querySelector('.overlay'),
    modalMore = document.querySelectorAll('.description-btn');

  const showModal = (e) => {
    overlay.style.display = 'block';
    e.target.classList.add('more-splash');
  };

  modalMore.forEach((item) => {
    item.addEventListener('click', (e) => showModal(e));
  });

  more.addEventListener('click', (e) => showModal(e));

  overlay.addEventListener('click', (event) => {
    if (
      event &&
      (!event.target.closest('.popup') || event.target.closest('.popup-close'))
    ) {
      overlay.style.display = 'none';
      more.classList.remove('more-splash');
    }
  });
}

export default modal;
