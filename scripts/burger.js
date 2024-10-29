document.addEventListener('DOMContentLoaded', () => {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('#navbarNav');
  const burgerIcon = document.querySelector('.burger-icon');
  const closeIcon = document.querySelector('.close-icon');

  // Переключение между бургером и крестиком
  navbarToggler.addEventListener('click', () => {
    burgerIcon.classList.toggle('d-none');
    closeIcon.classList.toggle('d-none');
  });

  // Закрытие меню при клике на ссылку
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
        burgerIcon.classList.remove('d-none');
        closeIcon.classList.add('d-none');
      }
    });
  });

  // Закрытие меню при клике вне его области
  document.addEventListener('click', (event) => {
    if (
      !navbarCollapse.contains(event.target) &&
      !navbarToggler.contains(event.target) &&
      navbarCollapse.classList.contains('show')
    ) {
      navbarCollapse.classList.remove('show');
      burgerIcon.classList.remove('d-none');
      closeIcon.classList.add('d-none');
    }
  });
});
