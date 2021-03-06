const express = require('express');
const router = express.Router();
const gameCards = require('../utils/getListCards');
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({extended: false});

router.post('/', urlencodedParser, (req, res) => {
  req.session.name = req.body.name;

  res.render('game', {
    images: gameCards(),
    userName: req.body.name,
    list: ['Room 1', 'Room 2', 'Room 3', 'Room 4', 'Room 5', 'Room 6', 'Room 7']
  });
});

router.get('/', (req, res) => {

  res.render('game', {
    images: gameCards(),
    userName: req.session.name,
    list: ['Room 1', 'Room 2', 'Room 3', 'Room 4', 'Room 5', 'Room 6', 'Room 7']
  });
});

module.exports = router;