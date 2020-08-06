(() => {
  const socket = io();

  const ul = document.querySelector('.listRooms__rooms');
  const rooms = ul.querySelectorAll('.rooms__link');
  const arrayRooms = ul.getAttribute('data-listRooms');

  socket.on('busy', (msg) => {
  
  });

  for (let room of rooms) {
    room.addEventListener('click', function() {
      socket.emit('nameRoom', this.innerHTML);
    });
  }

})();