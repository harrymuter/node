var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/', function (req, res) {
    if(req.session.user) {
        var password = req.body.password;
        var confirm_password = req.body.confirm_password;
        if(password===confirm_password) {
            var bcrypt = require('bcryptjs');
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    var username = req.session.user.username;
                    User.updateOne({username: username}, {password: hash}, {upsert: false}, function (err, user) {
                        if (err || !user) {
                            return res.send(500, {error: err})
                        } else {
                            res.redirect('/profile?s_password=updated');
                        }
                    });
                });
            })
        } else {
            res.redirect('/profile?e_password=error');
        }
    } else {
        console.log("You do not have the correct permissions to perform this task.");
        res.redirect('/restricted');
    }
});

module.exports = router;