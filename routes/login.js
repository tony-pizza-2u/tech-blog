var express = require('express');
var router = express.Router();

const menubar = require('../utils/menubar');

router.get('*', function(req, res, next) {

    res.render(
      'login',
      {
        title: 'Enter your Email Address & To Log In',
        menubar: menubar.updateMenubar(req)
      });
  
  
  });

router.post('*', function(req, res, next) {

    res.redirect('/dashboard');
  
  });

module.exports = router;
