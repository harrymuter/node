var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/', function (req, res) {
    if(req.session.user) {
        var type_of_user = req.body.type_of_user;
        req.session.user.type_of_user = type_of_user;
        var username = req.session.user.username;
        User.updateOne({username: username}, {type_of_user: type_of_user}, {upsert: false}, function (err, user) {
            if (err || !user) {
                res.redirect('/profile?e_type_of_user=error');
            } else {
                res.redirect('/profile?s_type_of_user=updated');
            }
        });
    } else {
        console.log("You do not have the correct permissions to perform this task.");
        res.redirect('/restricted');
    }
});

module.exports = router;
