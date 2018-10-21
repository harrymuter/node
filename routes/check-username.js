var express = require('express');
var router = express.Router();

var User = require('../models/form');

router.post('/', function (req, res) {
    var username = req.body.username;
        if(username!=="") {
            User.findOne({username: username}, function (err, user) {
                if (err) {
                    console.log(err);
                    res.redirect('/');
                } else {
                    if (user) {
                        res.json({event:'error'})
                    } else {
                        res.json({event:'ok'})
                    }
                }
            })
        }
    });

module.exports = router;