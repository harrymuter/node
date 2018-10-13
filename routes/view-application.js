var express = require('express');
var router = express.Router();

var Form = require('../models/form');
var FormLayout = require('../models/form-layout');

router.get('/', function (req, res) {
    if (req.session.user) {
        var admin = req.session.user.admin;
        Form.findOne(req.query, function (err, form) {
            if(err){
                console.log(err);
                res.redirect('/');
            } if(!form) {
                console.log("No form was found!");
                res.redirect('/');
            } else {
                var form = form.toObject();
                FormLayout.findOne({form_layout_no: form.form_layout_no}, function (err, layout) {
                    if(err){
                        console.log(err);
                        res.redirect('/');
                    } if(!layout) {
                        console.log("No form layout was found!");
                        res.redirect('/');
                    } else {
                        return res.render('view', {
                            page_name: 'view',
                            title: 'View Application',
                            form,
                            layout,
                            admin: admin
                        });
                    }});
            }
        });
    }
    else {
        console.log("You do not have permission to view this content.");
        res.redirect('/restricted');
    }
});

module.exports = router;