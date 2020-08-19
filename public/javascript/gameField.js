(() => {

  const field = document.querySelector('.field');
  const rivalName = document.querySelector('.rivalName');
  const waiting = document.querySelector('.waiting');

  let [topOdd, leftOdd] = [5, 90];
  let [topEven, leftEven] = [72, 10];

  let [leftMove, topMove] = [23, 33];

  let zIndexForEven = 0;
  let zIndexForOdd = 6;
  let zIndexForMove = 0;
  
  let j = 0;
  let num = 36;
  let step = 2.5;


  createDeck(field);
  createAvatar(field, 'gamerDefaultAvatarLeft');
  
  socket.on('getRival', (msg) => {
    rivalName.innerHTML = msg.userName;
    createAvatar(field, 'gamerDefaultAvatarRight');

    givingOfCards(num, field, msg.mixCards, step);
    // givingOfCards(num, field, msg.mixCards);

    waiting.classList.add('hide');
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

  function givingOfCards(num, parent, gameCards, step) {
    j++;
    
    if ((num - j) % 2 != 0) {
      givingOfOddCards(num, parent, gameCards, step);
      // givingOfOddCards(num, parent, gameCards);
    } else {
      givingOfEvenCards(num, parent, gameCards, step);
      // givingOfEvenCards(num, parent, gameCards);
    }
 
    if (j < 12 ) {
      givingOfCards(num, parent, gameCards, step);
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

  function givingOfOddCards(num, parent, gameCards, step) {
    //use for odd value
    leftOdd = leftOdd - step;
    zIndexForOdd--;
    // console.log(top, shift);
    // createCards(num, gameCards, parent, top, shift, zIndexForGamer);
  
    const card = document.createElement('img');

    card.style.top = topOdd + '%';
    card.style.left = leftOdd + '%';
    card.style.background = 'none';
    card.style.zIndex = zIndexForOdd;
    card.src = `/images/compress/cards/${gameCards.splice(num - j, 1)[0]}`;
    card.setAttribute('data-gamer', 'gamer_2');
    card.classList.add('deckOfCards');
    card.classList.add('cardBorderRadius');

    parent.appendChild(card);
  }

  function givingOfEvenCards(num, parent, gameCards, step) {
    //use for even value
    leftEven = leftEven + step;
    zIndexForEven++;
    // console.log(top, shift);
    // createCards(num, gameCards, parent, top, shift, zIndexForGamer);
    
    const card = document.createElement('img');
    
    card.style.top = topEven + '%';
    card.style.left = leftEven + '%';
    card.style.zIndex = zIndexForEven;
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

  function createDeck(parent) {
    const img = document.createElement('img');
      img.src = '/images/compress/background/back.jpg';
      img.classList.add('deckOfCards');
      img.classList.add('cardBorderRadius');

    parent.appendChild(img);
  }

  function createCards(num, gameCards, parent, top, shift, zIndexForGamer) {
    const card = document.createElement('img');

    card.style.top = top + '%';
    card.style.left = shift + '%';
    if (zIndexForGamer != undefined) card.style.zIndex = zIndexForGamer;
    card.style.background = 'none';
    card.src = `/images/compress/cards/${gameCards.splice(num - j, 1)[0]}`;
    card.setAttribute('data-gamer', 'gamer_2');
    card.classList.add('deckOfCards');
    card.classList.add('cardBorderRadius');

    parent.appendChild(card);
  }

  function createAvatar(parent, nameClass) {
    const img = document.createElement('img');
      img.src = '/images/compress/defaultAvatar.png';
      img.classList.add(nameClass);
    parent.appendChild(img);
  }

})();