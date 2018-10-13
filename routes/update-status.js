var express = require('express');
var router = express.Router();

var Form = require('../models/form');

router.post('/', function (req, res) {
    if (req.session.user) {
        var code = req.body.code;
        var seq = req.body.seq;
        var action = req.body.action;
        if(action==="approved"||action==="review") {

            Form.updateOne({code: code, seq: seq}, {status: action}, {upsert:true}, function(err, doc){
                if (err) {
                    return res.send(500, { error: err })
                } else {
                    res.redirect('/dashboard');
                }
            });
        }
        else {
            res.redirect('/dashboard');
        }
    }
    else {
        console.log("You do not have the correct permissions to perform this task.");
        res.redirect('/restricted');
    }
});

module.exports = router;