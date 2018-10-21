var express = require('express');
var router = express.Router();

var Form = require('../models/form');

router.post('/', function (req, res) {
    if(req.session.user.admin) {

        var school = req.session.user.school;
        var username = req.session.user.username;
        var search_criteria = req.body.form.search_criteria;
        var text = req.body.form.text;
        var checked = req.body.checked;

        if((checked === true&&req.body.start==='')||(checked === true&&req.body.end==='')) {
                res.redirect('/dashboard');
        } else {
            console.log("other");
            if (checked === true) {
                if (search_criteria === "lname") {
                    Form.find({
                        school: school,
                        username: {$ne: username},
                        last_name: {$regex: text, $options: "i"}
                    }, function (err, forms) {
                        if (err) {
                            console.log(err);
                            res.redirect('/dashboard');
                        }
                        else {
                            res.send(forms)
                        }
                    });
                } else if (search_criteria === "application_id") {
                    var n = text.lastIndexOf('/');
                    var seq = text.substring(n + 1);
                    var code = text.substr(0, text.lastIndexOf("/"));
                    Form.find({school: school, username: {$ne: username}, code: code, seq: seq}, function (err, forms) {
                        if (err) {
                            res.send(err)
                        }
                        else {
                            res.send(forms)
                        }
                    });
                } else if (search_criteria === "username") {
                    Form.find({
                        school: school,
                        username: {"$regex": text, $options: "i", $ne: username}
                    }, function (err, forms) {
                        if (err) {
                            console.log(err);
                            res.redirect('/dashboard');
                        }
                        else {
                            res.send(forms)
                        }
                    });
                }
            } else {
                if (search_criteria === "lname") {
                    Form.find({
                        school: school,
                        username: {$ne: username},
                        last_name: {$regex: text, $options: "i"}
                    }, function (err, forms) {
                        if (err) {
                            console.log(err);
                            res.redirect('/dashboard');
                        }
                        else {
                            res.send(forms)
                        }
                    });
                } else if (search_criteria === "application_id") {
                    var n = text.lastIndexOf('/');
                    var seq = text.substring(n + 1);
                    var code = text.substr(0, text.lastIndexOf("/"));
                    Form.find({school: school, username: {$ne: username}, code: code, seq: seq}, function (err, forms) {
                        if (err) {
                            res.send(err)
                        }
                        else {
                            res.send(forms)
                        }
                    });
                } else if (search_criteria === "username") {
                    Form.find({
                        school: school,
                        username: {"$regex": text, $options: "i", $ne: username}
                    }, function (err, forms) {
                        if (err) {
                            console.log(err);
                            res.redirect('/dashboard');
                        }
                        else {
                            res.send(forms)
                        }
                    });
                }
            }
        }
    } else {
        redirect('/dashboard');
    }
});

module.exports = router;