var express = require('express');
var router = express.Router();

var User = require('../models/user');


router.get('/', function (req, res) {
    res.redirect('/');
});


router.post('/', function (req, res) {

        var fname = req.body.fname;
        var lname = req.body.lname;
        var email = req.body.email;
        var supervisor = req.body.supervisor;
        var username = req.body.username;
        var password = req.body.password;
        var known_as;
        if (req.body.known_as!=="") {
            known_as = req.body.known_as
        }
        var type_of_user = req.body.type_of_user;
        var school = req.body.school;
        var memorable_word = req.body.memorable_word;
        var memorable_word_answer = req.body.memorable_word_answer;

        var user = {
            fname: fname,
            lname: lname,
            email: email,
            username: username,
            password: password,
            supervisor: supervisor,
            known_as: known_as,
            type_of_user: type_of_user,
            school: school,
            memorable_word: memorable_word,
            memorable_word_answer: memorable_word_answer,
            admin: false,
        }

        var newUser = new User(user);

        User.createUser(newUser, function (err, user) {
            if (err) throw err;
        });

        if(fname) {
            req.session.user = user;
        }

        res.location('/');
        res.redirect('/');

});

module.exports = router;