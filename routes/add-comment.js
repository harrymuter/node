const express = require('express');
const fs = require('fs');
const Form = require('../models/form');
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
        Form.findOne({code:req.body.code, seq: req.body.seq}, function (err, application) {
            if (err) {
                console.log(err);
                return res.end("Database internal server failure.");
            } else {
                if (!application) {
                    console.log(err);
                    return res.end("Application cannot be found.");
                } else {
                    application.feedback = req.body.feedback;
                    application.feedback_time = Date.now();
                    application.save(function (err) {
                        if (err) {
                            console.log(err);
                            return res.end("Error saving.");
                        } else {
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



