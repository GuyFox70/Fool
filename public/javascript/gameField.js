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
  let deckMixCards;
  const num = 36;

  createCard(field);
  createAvatar(field, 'gamerDefaultAvatarLeft');
  
  socket.on('getRival', (msg) => {
    rivalName.innerHTML = msg.userName;
    createAvatar(field, 'gamerDefaultAvatarRight');

    givingOfCards(num, field, deckMixCards, msg.gamer);

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

  function givingOfCards(num, parent, gameCards, gamer) {
    j++;

    if ((num - j) % 2 != 0 && gamer) {

      givingOfOddCards(num, parent, gameCards);
    } else {
      givingOfEvenCards(num, parent, gameCards);
    }
 
    if (j < 12 ) {
      givingOfCards(num, parent, gameCards);
    } else {
      j++;

      const trumpCard = document.createElement('img');
          trumpCard.src = `/images/compress/cards/${gameCards.splice(-1, 1)[0]}`;
          trumpCard.setAttribute('data-trump', 'trump');
          trumpCard.style.left = '150px';
          trumpCard.classList.add('deckOfCards');
          trumpCard.classList.add('cardBorderRadius');

        parent.appendChild(trumpCard);
    }

  }

  function givingOfOddCards(num, parent, gameCards) {
    leftOdd = leftOdd - 2.5;
  
    const card = document.createElement('img');

    card.style.top = topOdd + '%';
    card.style.left = leftOdd + '%';
    card.style.background = 'none';
    card.src = `/images/compress/cards/${gameCards.splice(num - j, 1)[0]}`;
    card.setAttribute('data-gamer', 'gamer_2');
    card.classList.add('deckOfCards');
    card.classList.add('cardBorderRadius');

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
    card.classList.add('deckOfCards');
    card.classList.add('cardBorderRadius');

    parent.appendChild(card);
  }
  

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function createCard(parent) {
    const img = document.createElement('img');
      img.src = '/images/compress/background/back.jpg';
      img.classList.add('deckOfCards');
      img.classList.add('cardBorderRadius');

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