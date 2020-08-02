(function() {
  const beginner = document.querySelector('.middle__wrap-form');
  const logIn = document.querySelector('.top__navigation__logIn');
  const introduce = document.querySelector('.middle__introduce');
  
  logIn.addEventListener('click', () => {
    introduce.classList.add('hide');
    beginner.removeAttribute('style');
    beginner.classList.add('showForm');
  });

}());