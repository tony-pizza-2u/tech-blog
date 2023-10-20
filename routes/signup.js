var express = require('express');
var router = express.Router();

const db = require('../models/index');
const security = require('../utils/security');

const SIGNUP_ERR = 'Signup Failed';

router.post('*', function(req, res, next) {

    var email = req.body.email;
    var password = req.body.password;

    if(email.length > 0 && password.length > 0){

        db.User.findAll({
            where : {
                email: email
            }
        }).then(results => {

            if(results.length > 0){
                res.redirect('/login?error=' + SIGNUP_ERR);
            } else {

                var hash = security.hashPass(password);

                const user = db.User.build(
                    { 
                        email: email,
                        passhash: hash
                    });
        
                user.save().then(result => {
        
                    req.session.loggedIn = true;
                    res.redirect('/dashboard');
        
                });
            }

        });


    } else {
        res.redirect('/login?error=' + SIGNUP_ERR);
    }

  });

module.exports = router;
