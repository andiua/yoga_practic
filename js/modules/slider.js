function slider() {
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
}

export default slider;
