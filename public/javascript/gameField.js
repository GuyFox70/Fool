(() => {
  const socket = io();

  const field = document.querySelector('.field');
  const beginner = document.querySelector('.beginner');
  const nameGamer = field.querySelector('.nameGamer');
  // const startButton = field.querySelector('.start__button');

  const images = document.querySelector('#img');
  const arrayCards = images.getAttribute('data-images');

  let me = {};

  let [topOdd, leftOdd] = [5, 90];
  let [topEven, leftEven] = [72, 10];

  let [leftMove, topMove] = [23, 33];

  let zIndexForGamer = 0;
  let zIndexForMove = 0;
  
  let j = 0;

  const cards = createCards(arrayCards, field);
  const gameCards = mixCards(JSON.parse(arrayCards));

  createCards(arrayCards, field);

  // startButton.addEventListener('click', () => {
  //   socket.emit('getRival', true);

  //   startButton.parentElement.classList.add('hide');
  // });

  // field.addEventListener('click', (e) => {
  //   makeMove(e.target);
  // });



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

  function givingOfCards(arr, gameCards) {
    j++;
    
    if ((arr.length - j) % 2 != 0) {
      givingOfOddCards(arr[arr.length - j], gameCards);
    } else {
      givingOfEvenCards(arr[arr.length - j], gameCards);
    }
 
    if (j < 12 ) {
      givingOfCards(arr, gameCards);
    } else {
      j++;

      const trump_card = arr[arr.length - j];
        trump_card.src = `/images/compress/cards/${gameCards.splice(-1, 1)[0]}`;
        trump_card.setAttribute('data-trump', 'trump');
        trump_card.style.left = '150px';
    }

  }

  function givingOfOddCards(card, gameCards) {
    leftOdd = leftOdd - 2.5;

    card.style.top = topOdd + '%';
    card.style.left = leftOdd + '%';
    card.style.background = 'none';
    card.src = `/images/compress/cards/${gameCards.splice(gameCards.length - j, 1)[0]}`;
    card.setAttribute('data-gamer', 'gamer_2');
  }

  function givingOfEvenCards(card, gameCards) {
    leftEven = leftEven + 2.5;
    zIndexForGamer++;
    
    card.style.top = topEven + '%';
    card.style.left = leftEven + '%';
    card.style.zIndex = zIndexForGamer;
    card.style.background = 'none';
    card.src = `/images/compress/cards/${gameCards.splice(gameCards.length - j, 1)[0]}`;
    card.setAttribute('data-gamer', 'gamer_1');
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

  function createCards(arr, parent) {
    let elements = [];

    for (let elem of  JSON.parse(arr)) {

      const img = document.createElement('img');
        img.src = '/images/compress/background/back.jpg';
        img.classList.add('deck_of_cards');
        img.classList.add('cards');

      parent.appendChild(img);
      elements.push(img);
    }
    return elements;
  }

  function createAvatar(parent) {
    const img = document.createElement('img');
      img.src = '/images/compress/defaultAvatar.png';
      img.classList.add('gamerDefaultAvatar');
    parent.appendChild(img);
  }

})();