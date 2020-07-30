const express = require('express');
const router = express.Router();
const gameCards = require('../utils/getListCards');

router.get('/', (req, res) => {
  res.render('game', {
    images: gameCards()
  });
});

module.exports = router;