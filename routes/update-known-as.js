var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/', function (req, res) {
    if(req.session.user) {
        var ka = req.body.ka;
        req.session.user.ka = ka;
        var username = req.session.user.username;
        User.updateOne({username: username}, {ka: ka}, {upsert: false}, function (err, user) {
            if (err || !user) {
                res.redirect('/profile?s_ka=error');
            } else {
                res.redirect('/profile?s_ka=updated');
            }
        });
    } else {
        console.log("You do not have the correct permissions to perform this task.");
        res.redirect('/restricted');
    }
});

module.exports = router;
