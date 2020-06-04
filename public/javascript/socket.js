(() => {
  const socket = io();
  const form = document.querySelector('.form');
  const input = form.querySelector('#m');
  const ul = document.querySelector('#messages');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    socket.emit('chat message', input.value);
    input.value = '';
    return false;
  });

  socket.on('chat message', (msg) => {
    const li = document.createElement('li');
      li.innerHTML = msg;
    ul.appendChild(li);
  });
})();