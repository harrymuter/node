var express = require('express');
var router = express.Router();

var Form = require('../models/form');

router.post('/', function (req, res) {
    if(req.session.user.admin) {

        var school = req.session.user.school;
        var username = req.session.user.username;
        var form = req.body.form.split('&').map(function(i) {
            return i.split('=');
        }).reduce(function(memo, i) {
            memo[i[0]] = i[1] === +i[1] ? parseFloat(i[1],10) : decodeURIComponent(i[1]);
            return memo;
        }, {});

        var search_criteria = form.search_criteria;
        var text = form.text;

        var start = req.body.start;
        var end = req.body.end;
        var end_set = false;
        if (end.length > 0){
            end_set = true;
        }
        var start_set = false;
        if (start.length > 0){
            start_set = true;
        }

        const from = start.split("/");
        const f = (new Date(from[2], from[1] - 1, from[0])/1000)*1000;
        const to = end.split("/");
        const t = ((new Date(to[2], to[1] - 1, to[0])/1000) + (24*60*60)) *1000;

        if(start_set&&end_set) {

            if (search_criteria === "lname") {
                Form.find({
                    school: school,
                    time: {$gte: f, $lte: t},
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
                const n = text.lastIndexOf('/');
                const seq = text.substring(n + 1);
                const code = text.substr(0, text.lastIndexOf("/"));
                Form.find({
                    school: school,
                    time: {$gte: f,
                        $lte: t},
                    username: {$ne: username},
                    code: {$regex: code, $options: "i"},
                    seq: seq
                }, function (err, forms) {
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
                    time: {$gte: f, $lte: t},
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
        } else if(start_set) {
            if (search_criteria === "lname") {
                Form.find({
                    school: school,
                    time: {$gte: f},
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
                const n = text.lastIndexOf('/');
                const seq = text.substring(n + 1);
                const code = text.substr(0, text.lastIndexOf("/")).toUpperCase();
                Form.find({
                    school: school,
                    time: {$gte: f},
                    username: {$ne: username},
                    code: code,
                    seq: seq}, function (err, forms) {
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
                    time: {$gte: f},
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
        } else if(end_set) {
            if (search_criteria === "lname") {
                Form.find({
                    school: school,
                    time: {$lte: t},
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
                const n = text.lastIndexOf('/');
                const seq = text.substring(n + 1);
                const code = text.substr(0, text.lastIndexOf("/")).toUpperCase();
                Form.find({school: school,
                    time: {$lte: t},
                    username: {$ne: username},
                    code: code,
                    seq: seq}, function (err, forms) {
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
                    time: {$lte: t},
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
                const n = text.lastIndexOf('/');
                const seq = text.substring(n + 1);
                const code = text.substr(0, text.lastIndexOf("/")).toUpperCase();
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
    } else {
        redirect('/dashboard');
    }
});

module.exports = router;