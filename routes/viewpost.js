var express = require('express');
var router = express.Router();

const db = require('../models/index');

const menubar = require('../utils/menubar');

router.get('/:id', function(req, res, next) {

  id = req.params.id;

  db.Post.findByPk(id, {include: [db.User, db.Comment]}).then(results => {

    var post = results;

    post.postdate = post.createdAt.toDateString();

    res.render(
      'viewpost',
      {
        post: post,
        menubar: menubar.updateMenubar(req),
      });
    
  });


});

module.exports = router;
