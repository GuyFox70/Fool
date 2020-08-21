(() => {

  const field = document.querySelector('.field');
  const rivalName = document.querySelector('.rivalName');
  const waiting = document.querySelector('.waiting');

  const gamer_1 = [];
  const gamer_2 = [];

  let [topOdd, leftOdd] = [5, 90];
  let [topEven, leftEven] = [72, 10];

  let [leftMove, topMove] = [23, 33];

  let zIndexForEven = 0;
  let zIndexForOdd = 6;
  let zIndexForMove = 0;
  
  let j = 0;
  let step = 2.5;

  createDeck(field);
  createAvatar(field, 'gamerDefaultAvatarLeft');

  //get name and mix cards, then giving them games and send cards rivals
  socket.on('getRival', (msg) => {
    rivalName.innerHTML = msg.userName;
    createAvatar(field, 'gamerDefaultAvatarRight');

    givingOfCards(field, msg.mixCards, step, msg.gamer);

    waiting.classList.add('hide');
  });

  //get qur quantity games
  socket.on('state', (msg) => {
    if (msg == 2) {
      waiting.classList.add('hide');
    } else {
      waiting.classList.remove('hide');
    }
  });

  //get cards rival_1
  socket.on('get cards rival_1', (msg) => {
    
    givingCardsRival(msg, field, step);
    
  });
  
  //get cards rival_2
  socket.on('get cards rival_2', (msg) => {
    
    givingCardsRival(msg, field, step);
    
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

  function givingOfCards(parent, gameCards, step, gamer) {
    j++;
    
    if (gameCards.length % 2 != 0) {

      gamer_1.push(gameCards.splice(-1, 1)[0]);
    
    } else {

      gamer_2.push(gameCards.splice(-1, 1)[0]);

    }
 
    if (j < 12 ) {
      givingOfCards(parent, gameCards, step, gamer);
    } else {
      j = 0;

      if (gamer == 2) {

        givingCardsMyself(gamer_2, field, step);

        socket.emit('send cards rival_2', gamer_2);

      } else if (gamer == 1) {

        givingCardsMyself(gamer_1, field, step);

        socket.emit('send cards rival_1', gamer_1);
      }

      createCards(gameCards.splice(-1, 1)[0], field);
    }

  }

  function givingCardsRival(arr, parent, step) {
    //use for rival

    for (let elem of arr) {

      leftOdd = leftOdd - step;
      zIndexForOdd--;

      createCards(elem, parent, topOdd, leftOdd, zIndexForOdd);
    }
    
  }

  function givingCardsMyself(arr, parent, step) {
    //use for myself

    for (let elem of arr) {

      leftEven = leftEven + step;
      zIndexForEven++;

      createCards(elem, parent, topEven, leftEven, zIndexForEven);

    }
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

  function createCards(elem, parent, shiftX = 1, shiftY = 13, zIndexForGamer = 0) {
    const card = document.createElement('img');

    card.style.top = `${shiftX}%`;
    card.style.left = `${shiftY}%`;
    card.style.zIndex = zIndexForGamer;
    card.style.background = 'none';
    card.src = `/images/compress/cards/${elem}`;
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