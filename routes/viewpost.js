var express = require('express');
var router = express.Router();

const menubar = require('../utils/menubar');

router.get('/:id', function(req, res, next) {

  var post = {};

  res.render(
    'viewpost',
    {
      title: post.title,
      menubar: menubar.updateMenubar(req),
      post
    });


});

module.exports = router;
