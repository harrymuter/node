var express = require('express');
var router = express.Router();

var Form = require('../models/form');

router.get('/', function (req, res) {
    if(req.session.user) {
        req.session.current_query = null;
        var username = req.session.user.username;
        var admin = req.session.user.admin;
        var school = req.session.user.school;
        Form.find({$or:[{status:'review'},{status:'approved'}],school:school}, function (err, forms) {
            if (err) {
                res.send(err);
            } else if (!forms){
                res.sendStatus(404);
            } else {
                    res.render('overview', {
                        page_name: 'overview',
                        title: 'UEA REC Application - Overview',
                        username: username,
                        admin: admin,
                        forms: forms
                    })
                }
            });
    } else {
        console.log("You do not have permission to view this content.");
        res.redirect('/restricted');
    }
});

module.exports = router;