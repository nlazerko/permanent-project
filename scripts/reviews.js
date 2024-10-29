// document.addEventListener('DOMContentLoaded', function () {
//   const slides = document.querySelectorAll('.carousel-slide');
//   const prevButton = document.querySelector('.prev');
//   const nextButton = document.querySelector('.next');
//   let activeIndex = 0;

//   function updateSlides() {
//     slides.forEach((slide, index) => {
//       slide.classList.remove('active');
//       if (index === activeIndex) {
//         slide.classList.add('active');
//       }
//     });
//     const offset = -activeIndex * (slides[0].clientWidth + 20); // 20px — это margin между слайдами
//     document.querySelector(
//       '.carousel-wrapper'
//     ).style.transform = `translateX(${offset}px)`;
//   }

//   prevButton.addEventListener('click', () => {
//     activeIndex = activeIndex > 0 ? activeIndex - 1 : slides.length - 1;
//     updateSlides();
//   });

//   nextButton.addEventListener('click', () => {
//     activeIndex = activeIndex < slides.length - 1 ? activeIndex + 1 : 0;
//     updateSlides();
//   });

//   updateSlides();
// });
document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.carousel-slide');
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  let activeIndex = 0;

  // Переменные для отслеживания перетягивания
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let currentTranslate = 0;
  let previousTranslate = 0;

  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.classList.remove('active');
      if (index === activeIndex) {
        slide.classList.add('active');
      }
    });
    const offset = -activeIndex * (slides[0].clientWidth + 20);
    carouselWrapper.style.transform = `translateX(${offset}px)`;
    previousTranslate = offset; // Запоминаем смещение для возврата, если свайп короткий
  }

  function handleResize() {
    if (window.innerWidth <= 769) {
      activeIndex = 0;
      prevButton.style.display = 'none';
      nextButton.style.display = 'none';
    } else {
      prevButton.style.display = 'block';
      nextButton.style.display = 'block';
    }
    updateSlides();
  }

  function setSliderPosition(translateX) {
    carouselWrapper.style.transform = `translateX(${translateX}px)`;
  }

  function showNextSlide() {
    activeIndex = activeIndex < slides.length - 1 ? activeIndex + 1 : 0;
    updateSlides();
  }

  function showPrevSlide() {
    activeIndex = activeIndex > 0 ? activeIndex - 1 : slides.length - 1;
    updateSlides();
  }

  // Обработчики для перетягивания
  carouselWrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  carouselWrapper.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;
    currentTranslate = previousTranslate + deltaX;
    setSliderPosition(currentTranslate);
  });

  carouselWrapper.addEventListener('touchend', () => {
    if (!isDragging) return;
    const movedBy = currentX - startX;

    // Порог для смены слайда
    if (movedBy < -50) {
      showNextSlide();
    } else if (movedBy > 50) {
      showPrevSlide();
    } else {
      setSliderPosition(previousTranslate); // Возвращаем слайд на место
    }

    isDragging = false;
  });

  prevButton.addEventListener('click', showPrevSlide);
  nextButton.addEventListener('click', showNextSlide);

  window.addEventListener('resize', handleResize);
  handleResize(); // Проверка размера экрана при загрузке
  updateSlides();
});
