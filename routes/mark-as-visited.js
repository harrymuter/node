const express = require('express');
const fs = require('fs');
const User = require('../models/user');
const router = express.Router();

router.get('/', function (req, res) {
    if(req.session.user) {
        res.redirect('/dashboard')
    } else {
        console.log("You do not have permission to view this content.");
        res.redirect('/restricted');
    }
});


router.post('/', function (req, res) {
    // CHECK USER IS LOGGED IN
    if(req.session.user) {
        User.findOne({username: req.session.user.username}, function (err, user) {
            if (err) {
                console.log(err);
                return res.end("Database internal server failure.");
            } else {
                if (!user) {
                    console.log(err);
                    return res.end("User cannot be found.");
                } else {
                    user.visited = true;
                    user.save(function (err) {
                        if (err) {
                            console.log(err);
                            return res.end("Error saving.");
                        } else {
                            req.session.user.visited = true;
                            res.redirect('/dashboard');
                        }
                    });
                }
            }
        });
    } else {
        console.log("You do not have the correct permissions to perform this task.");
        res.redirect('/restricted');
    }
});

module.exports = router;



