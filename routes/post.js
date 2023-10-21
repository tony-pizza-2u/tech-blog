var express = require('express');
var router = express.Router();

const db = require('../models/index');

const menubar = require('../utils/menubar');

router.get('/new', function(req, res, next){

  if(req.session.loggedIn != true){

    res.redirect('/login');

  } else {

    res.render(
      'newpost',
      {
        menubar: menubar.updateMenubar(req),
      });
      
  }

});

router.get('/:id', function(req, res, next) {

  var id = req.params.id;

  db.Post.findByPk(id, {include: [db.User]}).then(result => {

    var post = result;

    var allowEdit = false;

    if(req.session.user && (req.session.user.id == post.User.id)){
      allowEdit = true;
    }

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
        'post',
        {
          post: post,
          menubar: menubar.updateMenubar(req),
          allowComment: req.session.loggedIn,
          allowEdit: allowEdit,
          comments: comments
        });
      

    });


  });


});

router.post('/create', function(req, res){

  if(req.session.loggedIn != true){
      res.redirect('/');
  }

  var title = req.body.title;
  var content = req.body.content;

  const post = db.Post.build(
      { 
          title: title,
          content: content,
          UserId: req.session.user.id
      });

  post.save().then(result => {

      res.redirect('/dashboard');

  });

});

router.post('/update/:id', function(req, res, next){

  var id = req.params.id;

  db.Post.findByPk(id, {include: [db.User]}).then(result => {

    var post = result;

    post.title = req.body.title;
    post.content = req.body.content;

    if(req.session.user.id == post.User.id){
      
      post.save().then(result => {
        res.redirect('/post/' + post.id);
      });

    }

  });

});

router.get('/delete/:id', function(req, res, next) {

  var id = req.params.id;

  db.Post.findByPk(id, {include: [db.User]}).then(result => {

    var post = result;

    if(req.session.user.id == post.User.id){
      
      post.destroy({
        where: {
          id: post.id
        },
      }).then(result => {
        res.redirect('/dashboard');
      });

    }

  });

});

module.exports = router;
