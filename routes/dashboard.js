var express = require('express');
var router = express.Router();

var Form = require('../models/form');

router.get('/', function (req, res) {
    if(req.session.user) {
        req.session.current_query = null;

        var fname = req.session.user.fname;
        var ka = req.session.user.known_as;
        var username = req.session.user.username;
        var admin = req.session.user.admin;
        var visited = req.session.user.visited;
        var school = req.session.user.school;
        if(req.session.user.switch_role) {
            var switch_role = req.session.user.switch_role;
        } else {
            var switch_role = false;
        }

        if (admin&&switch_role===false) {
            Form.find({school: school, username: { $ne: username }}, function (err, forms) {
                if (err) {
                    console.log(err);
                    res.redirect('/');
                }
                else {
                    res.render('dashboard', {
                        page_name: 'dashboard',
                        title: 'UEA REC Application - Your Dashboard',
                        visited: visited,
                        fname: fname,
                        username: username,
                        ka: ka,
                        switch_role: switch_role,
                        admin: admin,
                        forms: forms
                    })
                }
            });
        } else {
            Form.find({username: username}, function (err, forms) {
                if (err) {
                    console.log(err);
                    res.redirect('/');
                }
                else {
                    res.render('dashboard', {
                        page_name: 'dashboard',
                        title: 'UEA REC Application - Your Dashboard',
                        visited: visited,
                        fname: fname,
                        username: username,
                        ka: ka,
                        switch_role:switch_role,
                        admin: admin,
                        forms: forms
                    })
                }
            });
        }

    } else {
        console.log("You do not have permission to view this content.");
        res.redirect('/restricted');
    }
});

module.exports = router;