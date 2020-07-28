(function() {
  const beginner = document.querySelector('.beginner');
  const entry = document.querySelector('.navigation__item-getInGetOut a');
  
  entry.addEventListener('click', () => {
    beginner.removeAttribute('style');
    beginner.classList.add('showForm');
  });

}());