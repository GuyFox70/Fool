(() => {
  const socket = io();

  const ul = document.querySelector('.listRooms__rooms');
  const warning = document.querySelector('.warning');
  const rooms = ul.querySelectorAll('.rooms__link');
  const arrayRooms = ul.getAttribute('data-listRooms');

  for (let room of rooms) {
    room.addEventListener('click', function() {
      socket.emit('nameRoom', this.innerHTML);
    });
  }

  socket.on('busy', (msg) => {
    warning.classList.add('showWarning');

    setTimeout(function() {
      console.log('yes');
      warning.classList.add('hideWarning');
    }, 3000);
  }); 
})();