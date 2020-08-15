const fs = require('fs');

module.exports = () => {
  try {
    let images = fs.readdirSync(__dirname + '/../public/images/compress/cards');

    for (let i = 0; i < images.length; i++) {
      if (images[i] == 'Thumbs.db') {
        let garbage = images.splice(i, 1);
      }
    }
    
    return mixCards(images);
  } catch (err) {
    console.log(err);
  }
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