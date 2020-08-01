const fs = require('fs');
const createError = require('http-errors');
const CleanCSS = require('clean-css');
const options = {level: 2};

const arrCss = [
  '/raw/fonts.css',
  '/raw/top.css',
  '/raw/middle.css',
  '/raw/bottom.css',
  '/raw/cards.css',
  '/raw/gameField.css',
  '/raw/rooms.css',
  '/raw/core.css'
];


module.exports = () => {
  
  let fullText = '';

  try {
    for (let i = 0; i < arrCss.length; i++) {
      const data = fs.readFileSync(__dirname + arrCss[i]);
      fullText = fullText + data;
    }

    fs.writeFileSync(__dirname +'/style.css', new CleanCSS(options).minify(fullText).styles);

  } catch (err) {
    console.error(err)
  }

}