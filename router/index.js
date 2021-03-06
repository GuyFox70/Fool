const express = require('express');
const router = express.Router();

const arrFiles = require('../utils/getListCards');

router.get('/', (req, res) => {
  res.render('index', {
    length: arrFiles().length - 2,
    images: arrFiles()
  });
});

module.exports = router;