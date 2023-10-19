var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('*', function(req, res, next) {

    //get data for user
    var data = [];

    res.render('dashboard', { dashboardActive: true, posts: data });

});

module.exports = router;
