var express = require('express');
var router = express.Router();

const db = require('../models/index');

const menubar = require('../utils/menubar');

/* GET home page. */
router.get('*', function(req, res, next) {

    if(req.session.loggedIn != true){
        res.redirect('/login');
    }

    db.Post.findAll({
        order: [
            ['createdAt', 'DESC'],
        ],
        where: {
          UserId: req.session.user.id
        },
        include: db.User
      }).then(results => {

        var posts = results;

        if(results.length > 0){

            for(i = 0; i < posts.length; i++){
                posts[i].postdate = posts[i].createdAt.toDateString();
            }

        }

        res.render(
            'dashboard', 
            { 
                title: 'Dashboard',
                menubar: menubar.updateMenubar(req), 
                posts: posts 
            });

      });

});

module.exports = router;
