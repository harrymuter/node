var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/', function (req, res) {
    if(req.session.user) {
        var fname = req.body.fname;
        req.session.user.fname = fname;
            var username = req.session.user.username;
            User.updateOne({username: username}, {fname: fname}, {upsert: false}, function (err, user) {
                if (err || !user) {
                    res.redirect('/profile?s_fname=error');
                } else {
                    res.redirect('/profile?s_fname=updated');
                }
            });
    } else {
        console.log("You do not have the correct permissions to perform this task.");
        res.redirect('/restricted');
    }
});

module.exports = router;