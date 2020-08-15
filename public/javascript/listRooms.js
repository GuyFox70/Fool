(() => {

  const ul = document.querySelector('.listRooms__rooms');
  const warning = document.querySelector('.warning');
  const rooms = ul.querySelectorAll('.rooms__link');
  const listRooms = document.querySelector('.listRooms');

  for (let room of rooms) {
    room.addEventListener('click', function() {
      socket.emit('nameRoom', this.innerHTML);
    });
  }

  socket.on('status', (msg) => {

    if (msg) {
      warning.style = "top: 70px; transition: top 1s linear";

      setTimeout(function() {
        warning.style = "top: -70px; transition: top 1s linear";
      }, 3000);
    } else {
      listRooms.classList.add('hide');
    }

  });
})();