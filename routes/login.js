var express = require('express');
var session = require('express-session');
var bcrypt = require('bcryptjs');
var url = require('url');
var router = express.Router();

var User = require('../models/user');

router.post('/', function (req, res) {

    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username:username}, function (err, user) {
        if(err) {
            console.log(err);
            res.redirect(url.format({
                pathname:"/",
                query:{error:'system'},
            }));
        } else if(!user){
            res.redirect(url.format({
                pathname:"/",
                query:{error:'username'},
            }));
        }
        else {
            bcrypt.compare(password, user.password, function(err, a) {
                if(err) {
                    console.log(err);
                    res.redirect(url.format({
                        pathname:"/",
                        query:{error:'system'},
                    }));
                } if(a){
                    req.session.user = user;
                    req.session.user.password = null;
                    req.session.user.switch = false;
                    res.redirect('/dashboard');
                    return res.status(200).send();
                } else if(!a){
                    res.redirect(url.format({
                        pathname:"/",
                        query:{error:'password'},
                    }));
                }
            });
        }
    })

});

module.exports = router;