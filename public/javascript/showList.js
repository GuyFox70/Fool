(function() {
  const listRooms = document.querySelector('.listRooms');
  const beginner = document.querySelector('.beginner');
  const formEntry = document.querySelector('.form__button-get-in');
  
  formEntry.addEventListener('click', (e) => {
    e.preventDefault();
    
    beginner.classList.add('hide');

    const promise = fetch('/rooms/');

    promise.then(
      response => {
        return response.text();
      }
    ).then(
      text => {
        listRooms.classList.remove('hide');
        listRooms.innerHTML = text;
      }
    )
  });

}());