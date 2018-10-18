const express = require('express');
const fs = require('fs');
const FormLayout = require('../models/form-layout');
const router = express.Router();

router.get('/', function (req, res) {
    if(req.session.user && req.session.user.admin) {
        var admin = req.session.user.admin;
        res.render('create-new-form',{page_name:'create-form',title:'Create a New Form', admin: admin});
    } else {
        console.log("You do not have permission to view this content.");
        res.redirect('/restricted');
    }
});
router.post('/', function (req, res) {
    if(req.session.user) {
        var form_name = req.body.form_name;
        var form_type = req.body.form_type;
        var html_template = req.body.html_template;
        var raw_html = req.body.raw_html;
        var questions = req.body.questions;
        var creator = req.session.user.username;

        if(req.session.document&&req.session.version) {
            var form_layout = {
                name: form_name,
                form_type: form_type,
                template: html_template,
                raw_html: raw_html,
                creator: creator,
                questions: questions,
                disabled: false,
                form_layout_no: req.session.document,
                form_version_no: parseInt(req.session.version) + 1
            };
            var newFormLayout = new FormLayout(form_layout);
            FormLayout.createFormLayout(newFormLayout, function (err, form_layout) {
                if (err) {
                    throw err;
                } else {
                    res.redirect('/forms');
                }
            });
            req.session.document = null;
            req.session.version = null;
        } else {
            FormLayout.distinct('form_layout_no', function (err, array) {
                var number = array.length+1;
                var form_layout = {
                    name: form_name,
                    form_type: form_type,
                    template: html_template,
                    raw_html: raw_html,
                    creator: creator,
                    questions: questions,
                    form_layout_no: number,
                    disabled: false,
                    form_version_no: 1
                };
                var newFormLayout = new FormLayout(form_layout);
                FormLayout.createFormLayout(newFormLayout, function (err, form_layout) {
                    if (err) {
                        throw err;
                    } else {
                        res.redirect('/forms');
                    }
                });
            });
        }
    } else {
        console.log("You do not have the correct permissions to perform this task.");
        res.redirect('/restricted');
    }
    });

module.exports = router;
