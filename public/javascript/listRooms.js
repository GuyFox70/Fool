(() => {
  const socket = io();

  const ul = document.querySelector('.listRooms__rooms');
  const rooms = ul.querySelectorAll('.rooms__link');
  const arrayRooms = ul.getAttribute('data-listRooms');

  for (let room of rooms) {
    room.addEventListener('click', function() {
      socket.emit('nameRoom', this.innerHTML);
    });
  }

  // socket.on('busy', (msg) => {
  //   console.log(msg);
  // }); 
})();