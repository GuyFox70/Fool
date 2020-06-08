const fs = require('fs');

module.exports = () => {
  try {
    let images = fs.readdirSync(__dirname + '/../public/images/compress/cards');
    return images;
  } catch (err) {
    console.log(err);
  }
}