var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/', function (req, res) {
    if(req.session.user) {
        var answer = req.body.memorable_word_answer;
            var bcrypt = require('bcryptjs');
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(answer, salt, function (err, hash) {
                    var question = req.body.memorable_word;
                    var username = req.session.user.username;
                    User.updateOne({username: username}, {memorable_word: question, memorable_word_answer: hash}, {upsert: false}, function (err, user) {
                        if (err || !user) {
                            res.redirect('/profile?e_memorable_word=error')
                        } else {
                            res.redirect('/profile?s_memorable_word=updated');
                        }
                    });
                });
            });
    } else {
        console.log("You do not have the correct permissions to perform this task.");
        res.redirect('/restricted');
    }
});

module.exports = router;