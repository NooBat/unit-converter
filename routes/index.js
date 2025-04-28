const express = require('express');
const router = express.Router();

router.get('/', function (_, res) {
  res.redirect('/convert/length');
});

module.exports = router;
