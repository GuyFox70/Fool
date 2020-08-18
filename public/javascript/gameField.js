(() => {

  const field = document.querySelector('.field');
  const startButton = field.querySelector('.container-button__start');
  const rivalName = document.querySelector('.rivalName');
  const waiting = document.querySelector('.waiting');

  let [topOdd, leftOdd] = [5, 90];
  let [topEven, leftEven] = [72, 10];

  let [leftMove, topMove] = [23, 33];

  let zIndexForGamer = 0;
  let zIndexForMove = 0;
  
  let j = 0;
  let timerId, gamer, deckMixCards;
  const num = 36;

  createCards(field);
  createAvatar(field, 'gamerDefaultAvatarLeft');
  // gamerDefaultAvatarRight
  socket.on('getNameRival', (msg) => {
    rivalName.innerHTML = msg;
    createAvatar(field, 'gamerDefaultAvatarRight');

    waiting.classList.add('hide');
  });

  socket.on('getMixCards', (msg) => {
    deckMixCards = msg;
  });

  socket.on('state', (msg) => {
    if (msg == 2) {
      waiting.classList.add('hide');
    } else {
      waiting.classList.remove('hide');
    }
  });

  document.addEventListener('beforeunload', () => {

  });

  // created function down


  function makeMove(target) {

    if (target.getAttribute('data-gamer') == 'gamer_1') {
      zIndexForMove++;
      leftMove += 2;

      target.style.top = topMove + '%';
      target.style.left = leftMove + '%';
      
      target.style.zIndex = zIndexForMove;

    } else if (target.getAttribute('data-gamer') == 'gamer_2') {
      zIndexForMove++;
      leftMove += 2;

      target.style.top = topMove + '%';
      target.style.left = leftMove +'%';

      target.style.zIndex = zIndexForMove;

    }
  }

  function givingOfCards(num, parent, gameCards) {
    j++;

    if ((num - j) % 2 != 0) {

      givingOfOddCards(num, parent, gameCards);
    } else {
      givingOfEvenCards(num, parent, gameCards);
    }
 
    if (j < 12 ) {
      givingOfCards(num, parent, gameCards);
    } else {
      j++;

      const trump_card = document.createElement('img');
        trump_card.src = `/images/compress/cards/${gameCards.splice(-1, 1)[0]}`;
        trump_card.setAttribute('data-trump', 'trump');
        trump_card.style.left = '150px';

        parent.appendChild(card);
    }

  }

  function givingOfOddCards(num, parent, gameCards) {
    leftOdd = leftOdd - 2.5;
    console.log(gameCards);
    const card = document.createElement('img');

    card.style.top = topOdd + '%';
    card.style.left = leftOdd + '%';
    card.style.background = 'none';
    card.src = `/images/compress/cards/${gameCards.splice(num - j, 1)[0]}`;
    card.setAttribute('data-gamer', 'gamer_2');

    parent.appendChild(card);
  }

  function givingOfEvenCards(num, parent, gameCards) {
    leftEven = leftEven + 2.5;
    zIndexForGamer++;
    
    const card = document.createElement('img');
    
    card.style.top = topEven + '%';
    card.style.left = leftEven + '%';
    card.style.zIndex = zIndexForGamer;
    card.style.background = 'none';
    card.src = `/images/compress/cards/${gameCards.splice(num - j, 1)[0]}`;
    card.setAttribute('data-gamer', 'gamer_1');

    parent.appendChild(card);
  }

  // function getObjCards(arr) {
  //   let obj = {};

  //   for(let i = 0; i < arr.length; i++) {
  //     obj[i] = arr[i];
  //   }
  //   return obj;
  // }
  

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function createCards(parent) {
    const img = document.createElement('img');
      img.src = '/images/compress/background/back.jpg';
      img.classList.add('deck_of_cards');
      img.classList.add('cards');

    parent.appendChild(img);
  }

  // function createCards(arr, parent) {
  //   let elements = [];

  //   for (let elem of  JSON.parse(arr)) {

  //     const img = document.createElement('img');
  //       img.src = '/images/compress/background/back.jpg';
  //       img.classList.add('deck_of_cards');
  //       img.classList.add('cards');

  //     parent.appendChild(img);
  //     elements.push(img);
  //   }
  //   return elements;
  // }

  function createAvatar(parent, nameClass) {
    const img = document.createElement('img');
      img.src = '/images/compress/defaultAvatar.png';
      img.classList.add(nameClass);
    parent.appendChild(img);
  }

})();