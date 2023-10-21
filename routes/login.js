var express = require('express');
var router = express.Router();

const db = require('../models/index');
const security = require('../utils/security');

const menubar = require('../utils/menubar');

const LOGIN_ERR = 'Login Failed';

router.get('*', function(req, res, next) {

    if(req.session.isLoggedIn){
        res.redirect('/dashboard');
    }

    res.render(
      'login',
      {
        title: 'Enter your Email Address & Password To Log In',
        menubar: menubar.updateMenubar(req),
        error: req.query.error
      });
  
  
  });

router.post('*', function(req, res, next) {

    var email = req.body.email;
    var password = req.body.password;

    if(email.length > 0 && password.length > 0){

        var hash = security.hashPass(password);

        db.User.findAll({
            where: {
              email: email
            }
          }).then(results => {

            if(results.length == 0){
                res.redirect('/login?error=' + LOGIN_ERR)
            } else {

                var user = results[0];

                if (security.comparePass(password, user.passhash)){
    
                    req.session.loggedIn = true;
                    req.session.user = user;
                    res.redirect('/dashboard');
    
                } else {
    
                    req.session.destroy();
                    res.redirect('/login?error=' + LOGIN_ERR);
    
                }

            }

          });

    } else {
        res.redirect('/login?error=' + LOGIN_ERR);
    }

  
  });

module.exports = router;
