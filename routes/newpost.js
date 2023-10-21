var express = require('express');
var router = express.Router();

const db = require('../models/index');

const menubar = require('../utils/menubar');

router.get('*', function(req, res, next) {

  res.render(
    'newpost',
    {
      title: "Create A New Post",
      menubar: menubar.updateMenubar(req),
    });


});

router.post('*', function(req, res){

    if(req.session.loggedIn != true){
        res.redirect('/');
    }

    var title = req.body.title;
    var content = req.body.content;

    console.log(title);
    console.log(content);

    const post = db.Post.build(
        { 
            title: title,
            content: content,
            UserId: req.session.user.id
        });

    post.save().then(result => {

        console.log('saved post!');

        res.redirect('/dashboard');

    });

});

module.exports = router;
