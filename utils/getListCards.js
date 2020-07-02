const fs = require('fs');

module.exports = () => {
  try {
    let images = fs.readdirSync(__dirname + '/../public/images/compress/cards');

    for (let i = 0; i < images.length; i++) {
      if (images[i] == 'Thumbs.db') {
        let garbage = images.splice(i, 1);
      }
    }
    
    return images;
  } catch (err) {
    console.log(err);
  }
}