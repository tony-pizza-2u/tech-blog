var express = require('express');
var router = express.Router();

const db = require('../models/index');

const menubar = require('../utils/menubar');

router.get('/:id', function(req, res, next) {

  id = req.params.id;

  db.Post.findByPk(id, {include: [db.User]}).then(results => {

    var post = results;

    post.postdate = post.createdAt.toDateString();

    db.Comment.findAll({
      order: [
        ['createdAt', 'DESC'],
      ],
      where: {
        PostId: id
      },
      include: db.User
    }).then(results =>{

      var comments = results;

      for(i = 0; i < comments.length; i++){
        comments[i].commentDate = comments[i].createdAt.toDateString();
      }

      res.render(
        'viewpost',
        {
          post: post,
          menubar: menubar.updateMenubar(req),
          allowComment: req.session.loggedIn,
          comments: comments
        });
      

    });


  });


});

module.exports = router;
