var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/', function (req, res) {
    if(req.session.user) {
        var lname = req.body.lname;
        req.session.user.lname = lname;
        var username = req.session.user.username;
        User.updateOne({username: username}, {lname: lname}, {upsert: false}, function (err, user) {
            if (err || !user) {
                res.redirect('/profile?e_lname=error');
            } else {
                res.redirect('/profile?s_lname=updated');
            }
        });
    } else {
        console.log("You do not have the correct permissions to perform this task.");
        res.redirect('/restricted');
    }
});

module.exports = router;
