var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    if(req.session.user) {
        var admin = req.session.user.admin;
        var username = req.session.user.username;
        var User = require('../models/user');

        User.findOne({username:username}, function (err, user){
            if (err){
                console.log(err);
                res.redirect('/');
            } else if (!user){
                console.log('No account found with this username');
                res.redirect('/logout');
            }
            else {
                var fname = user.fname;
                var lname = user.lname;
                var ka = user.known_as;
                var email = user.email;
                var type_of_user = user.type_of_user;
                var memorable_word = user.memorable_word;
                var success;
                var error;
                if (req.query) {
                    success = {
                        fname: req.query.s_fname,
                        lname: req.query.s_lname,
                        email: req.query.s_email,
                        username: req.query.s_username,
                        ka: req.query.s_ka,
                        password: req.query.s_password,
                        type_of_user: req.query.s_type_of_user,
                        memorable_word: req.query.s_memorable_word
                    };
                    error = {
                        fname: req.query.e_fname,
                        lname: req.query.e_lname,
                        email: req.query.e_email,
                        username: req.query.e_username,
                        ka: req.query.e_ka,
                        password: req.query.e_password,
                        type_of_user: req.query.e_type_of_user,
                        memorable_word: req.query.e_memorable_word
                    }
                }
                res.render('profile', {
                    admin: admin,
                    page_name: 'profile',
                    title: 'Your Details',
                    fname: fname,
                    lname: lname,
                    email: email,
                    username: username,
                    ka: ka,
                    success: success,
                    type_of_user: type_of_user,
                    memorable_word: memorable_word,
                    errors: error
                });
            }
    })
    } else {
            res.redirect('/');
        }
});

module.exports = router;