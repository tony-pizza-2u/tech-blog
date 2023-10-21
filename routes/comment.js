var express = require('express');
var router = express.Router();

const db = require('../models/index');

router.post('*', function(req, res, next) {

    if(req.session.loggedIn != true){
        res.redirect('/');
    }

    var postId = req.query.post;
    var content = req.body.content;

    const comment = db.Comment.build(
        {
            content: content,
            UserId: req.session.user.id,
            PostId: postId
        }
    );

    comment.save().then(result => {

        res.redirect('/post/' + postId);

    });



  });

module.exports = router;
