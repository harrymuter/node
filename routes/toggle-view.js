var express = require('express');
var router = express.Router();

var Form = require('../models/form');

router.post('/', function (req, res) {
    if (req.session.user) {
        if(req.session.user.switch_role === true){
            req.session.user.switch_role = false;
            res.redirect('/dashboard');
        } else {
            req.session.user.switch_role = true;
            res.redirect('/dashboard');
        }
    }
    else {
        console.log("You do not have the correct permissions to perform this task.");
        res.redirect('/restricted');
    }
});

module.exports = router;