(() => {

  const ul = document.querySelector('.listRooms__rooms');
  const warning = document.querySelector('.warning');
  const rooms = ul.querySelectorAll('.rooms__link');
  const listRooms = document.querySelector('.listRooms');
  const userName = document.querySelector('.userName').innerHTML;

  for (let room of rooms) {
    room.addEventListener('click', function() {
      socket.emit('nameRoomAndUser', {
        room: this.innerHTML,
        user: userName
      });
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