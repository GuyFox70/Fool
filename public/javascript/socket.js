(() => {
  const wrapper = document.querySelector('.wrapper');
  const startGame = document.querySelector('.start-game');
  const startButton = document.querySelector('.start-game-button');
  const images = document.querySelector('#img');
  const arrayCards = images.getAttribute('data-images');
  

  let [topOdd, leftOdd] = [10, 90];
  let [topEven, leftEven] = [70, 10];
  let zIndex = 0;
  
  let j = 0;

  const createdCards = createCards(arrayCards);
  const gameCards = mixCards(createdCards);

  for (let elem of gameCards) {
    wrapper.appendChild(elem);
  }

  startButton.addEventListener('click', () => {
    startGame.classList.add('start-game-hide');
    getLocationCards(gameCards);
  });

  wrapper.addEventListener('click', (e) => {
    console.log(e.target);
  });

  function getLocationCards(arr) {
    j++;
    
    if ((arr.length - j) % 2 != 0) {
      getLocationForOddCards(arr[arr.length - j]);
    } else {
      getLocationForEvenCards(arr[arr.length - j]);
    }
 
    if (j < 12 ) getLocationCards(arr);

  }

  function getLocationForOddCards(card) {
    leftOdd = leftOdd - 2.5;

    card.style.top = topOdd + '%';
    card.style.left = leftOdd + '%';
  }

  function getLocationForEvenCards(card) {
    leftEven = leftEven + 2.5;
    zIndex++;
    
    card.style.top = topEven + '%';
    card.style.left = leftEven + '%';
    card.style.zIndex = zIndex;
  }

  function mixCards(cards) {
    let mixArray = [];
    
    while (cards.length > 0) {
      mixArray.push(cards.splice(getRandomInt(0, cards.length - 1), 1)[0]);
    }
    
    return mixArray;
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function createCards(arr) {
    let elements = [];

    for (let elem of  JSON.parse(arr)) {

      let img = document.createElement('img');
        img.src = `/images/compress/cards/${elem}`;
        img.classList.add('cards');

      elements.push(img);
    }
    return elements;
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