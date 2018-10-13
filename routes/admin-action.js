var express = require('express');
var router = express.Router();

var Form = require('../models/form');

router.post('/', function (req, res) {
    var school = req.session.user.school;

    var search_criteria = req.body.search_criteria;
    var text = req.body.text;

    if(search_criteria==="lname"){
        Form.find({school: school, last_name: {$regex: text, $options: "i"}}, function (err, forms) {
            if (err) {
                console.log(err);
                res.redirect('/dashboard');
            }
            else {
                res.send(forms)
            }
        });
    } else if(search_criteria==="application_id"){
        var n = text.lastIndexOf('/');
        var seq = text.substring(n + 1);
        var code = text.substr(0, text.lastIndexOf("/"));
        Form.find({school: school, code:code, seq:seq}, function (err, forms) {
            if (err) {
                res.send(err)
            }
            else {
                res.send(forms)
            }
        });
    } else if(search_criteria==="username"){
        Form.find({school: school, username : {"$regex":text, $options: "i"}}, function (err, forms) {
            if (err) {
                console.log(err);
                res.redirect('/dashboard');
            }
            else {
                res.send(forms)
            }
        });
    }


});

module.exports = router;