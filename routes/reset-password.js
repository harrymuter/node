var express = require('express');
var _ = require('lodash');
var router = express.Router();

var User = require('../models/user');

router.get('/', function (req, res) {
    const username = req.query.username;
    var admin = req.session.user.admin;
    if (username) {
        User.findOne({username: username}, function (err, user) {
            if (err) {
                console.log(err);
                return res.status(500).send();
            } else if (!user) {
                console.log("No user profile found.");
                res.redirect('/restricted');
            } else {
                res.render('verify-reset', {
                    page_name:'reset-password',
                    title:'Reset Password',
                    username:username,
                    memorable_word:user.memorable_word,
                    admin: admin
                });
            }
        });
    } else {
        res.render('reset-password', {
            page_name:'reset-password',
            title:'Reset Password',
            error:''
        });
    }
});

router.post('/', function (req, res) {

    User.findOne({username: req.body.username}, function (err, user) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        } else if (!user) {
            res.redirect('/');
            return res.status(404).send();
        }
        else {

            var bcrypt = require('bcryptjs');

            bcrypt.compare(req.body.memorable_word_answer, user.memorable_word_answer, function (err, a) {

                var random_string = Math.random().toString(36).slice(-14);

                var nodemailer = require('nodemailer');
                var bcrypt = require('bcryptjs');

                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false, // only true for 465
                    auth: {
                        user: 'harry.muter95@gmail.com',
                        pass: 'Green4ways'
                    }
                });

                let mailOptions = {
                    from: '', // sender address
                    to: user.email, // list of receivers
                    subject: 'Password Reset - New Password', // Subject line
                    text: random_string, // plain text body
                    html: '<br>' + 'Dear ' + user.known_as + ',' +
                    '<br>' +
                    'The new password for your REC submission account is: ' +
                    '<br>' +
                    '<b>' + random_string + '</b>' +
                    '<br>' +
                    'Please follow this <a href="http://127.0.0.1:3000/">link</a> and sign in with your new credentials, making sure you change your password ASAP.' +
                    ' Also please delete this email upon updating your password.'
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('Error occurred');
                        console.log(error.message);
                        return process.exit(1);
                    }
                });

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(random_string, salt, function (err, hash) {

                        User.updateOne(
                            {username: req.body.username},
                            {password: hash},
                            {upsert: false},
                            function (err, usr) {
                                if (err) {
                                    return res.send(500, {error: err})
                                } else {
                                    res.redirect('/');
                                }
                            });
                    })
                });

            });
        }

    });
});

module.exports = router;