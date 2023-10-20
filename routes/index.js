var express = require('express');
var router = express.Router();

const menubar = require('../utils/menubar');

/* GET home page. */
router.get('/', function(req, res, next) {

  var posts = [];

  res.render(
    'index',
    {
      title: 'Tech Blog',
      menubar: menubar.updateMenubar(req),
      posts
    });


});

module.exports = router;
