const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({extended: false});

router.post('/', urlencodedParser, (req, res) => {

  res.render('rooms', {
    userName: req.body.name
  });
});

module.exports = router;