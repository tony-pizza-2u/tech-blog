var express = require('express');
var router = express.Router();

const menubar = require('../utils/menubar');

/* GET home page. */
router.get('/:id', function(req, res, next) {

  var post = {};

  post.title = "First Post!";

  res.render(
    'post',
    {
      title: post.title,
      menubar: menubar.updateMenubar(req),
      post
    });


});

module.exports = router;
