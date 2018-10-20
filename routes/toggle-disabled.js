var express = require('express');
var router = express.Router();

var FormLayout = require('../models/form-layout');

router.post('/', function (req, res) {
    if (req.session.user) {

        var layout = req.body.layout;
        var disabled = req.body.status;
        var set;

        if (disabled==="true") {
            set = false;
        } else {
            set = true;
        }

        FormLayout.update({form_layout_no: layout}, {$set: {disabled: set}}, {multi: true}, function () {
            res.send("Done")
        });

    } else {
            console.log("You do not have the correct permissions to perform this task.");
            res.redirect('/restricted');
        }
    });

module.exports = router;