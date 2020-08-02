(function() {
  const beginner = document.querySelector('.beginner');
  const logIn = document.querySelector('.top__navigation__logIn');
  const introduce = document.querySelector('.middle__introduce');
  
  logIn.addEventListener('click', () => {
    introduce.classList.add('hide');
    beginner.removeAttribute('style');
    beginner.classList.add('showForm');
  });

}());