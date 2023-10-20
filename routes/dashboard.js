var express = require('express');
var router = express.Router();

const menubar = require('../utils/menubar');

/* GET home page. */
router.get('*', function(req, res, next) {

    //get data for user
    var posts = [];

    res.render(
        'dashboard', 
        { 
            title: 'Dashboard',
            menubar: menubar.updateMenubar(req), 
            posts: posts 
        });

});

module.exports = router;
