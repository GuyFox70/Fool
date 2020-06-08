(() => {
  const startGame = document.querySelector('.start-game');
  const startButton = document.querySelector('.start-game-button');
  const cards = document.querySelectorAll('.cards');

  let topOdd = 10;
  let leftOdd = 90;

  let topEven = 70;
  let leftEven = 10;

  startButton.addEventListener('click', () => {
    startGame.classList.add('start-game-hide');
    getLocationCards(cards);
  });

  function getLocationCards(arr) {
    for (let i = 0, j = 0; i < arr.length; i++) {
      if (i % 2 != 0) {
        getLocationForOddCards(arr[i]);
        j++;
      } else {
        getLocationForEvenCards(arr[i]);
        j++;
      }

      if (j > 11) return;
    }
  }

  function getLocationForOddCards(card) {
    leftOdd = leftOdd - 2;
    
    card.style.top = topOdd + '%';
    card.style.left = leftOdd + '%';
  }

  function getLocationForEvenCards(card) {
    leftEven = leftEven + 2;
    
    card.style.top = topEven + '%';
    card.style.left = leftEven + '%';
  }
  // const socket = io();
  // const form = document.querySelector('.form');
  // const input = form.querySelector('#m');
  // const ul = document.querySelector('#messages');

  // form.addEventListener('submit', (e) => {
  //   e.preventDefault();

  //   socket.emit('chat message', input.value);
  //   input.value = '';
  //   return false;
  // });

  // socket.on('chat message', (msg) => {
  //   const li = document.createElement('li');
  //     li.innerHTML = msg;
  //   ul.appendChild(li);
  // });
})();