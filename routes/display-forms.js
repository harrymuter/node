const express = require('express');
const fs = require('fs');
const FormLayout = require('../models/form-layout');
const router = express.Router();

router.get('/', function (req, res) {
    if(req.session.user) {
        var admin = req.session.user.admin;
        const aggregatorOpts = [
            { $sort : { form_layout_no : -1} },
            { $unwind: "$form_layout_no" },
            { $group: { _id: "$form_layout_no", count: { $sum: 1 } } }
        ];

        FormLayout.aggregate(aggregatorOpts).exec(function(error, forms){
            var search_criteria = [];
            forms.forEach(function(form) {
                search_criteria.push(JSON.parse('{"form_layout_no":' + form._id + ', "form_version_no":' + form.count+'}'));
            });

            if (req.query.type === "module") {
                FormLayout.find({$or: search_criteria, form_type:'module', disabled: { $ne: true }}, function (err, form) {
                    if (err) {
                        var object = JSON.parse('[]');
                        res.render('forms', {page_name: 'forms-module', title: 'Module Forms', admin: admin, object})
                    } else if(!form){
                        var object = JSON.parse('[]');
                        res.render('forms', {page_name: 'forms-module', title: 'Module Forms', admin: admin, object})
                    } else {

                        var object = '[';
                        if (form.length > 0) {
                            form.forEach(function (data) {
                                object +=
                                    '{"name": "' + data.name +
                                    '", "form_layout_no": ' + data.form_layout_no +
                                    ', "form_version_no": ' + data.form_version_no +
                                    ' },';
                            });
                            object = object.slice(0, -1);
                        }
                        object += ']';
                        object = JSON.parse(object);
                        res.render('forms', {page_name: 'forms-module', title: 'Module Forms', admin: admin, object})

                    }
                });
            } else if (req.query.type === "individual")  {
                FormLayout.find({$or: search_criteria, form_type:'individual', disabled: { $ne: true }}, function (err, form) {
                    if (err) {
                        var object = JSON.parse('[]');
                        res.render('forms', {page_name: 'forms-individual', title: 'Individual Forms', admin: admin, object})
                    } else if(!form){
                        var object = JSON.parse('[]');
                        res.render('forms', {page_name: 'forms-individual', title: 'Individual Forms', admin: admin, object})
                    } else {
                        var object = '[';
                        if (form.length > 0) {
                            form.forEach(function (data) {
                                object +=
                                    '{"name": "' + data.name +
                                    '", "form_layout_no": ' + data.form_layout_no +
                                    ', "form_version_no": ' + data.form_version_no +
                                    ' },';
                            });
                            object = object.slice(0, -1);
                        }
                        object += ']';

                        object = JSON.parse(object);
                        res.render('forms', {page_name: 'forms-individual', title: 'Individual Forms', admin: admin, object})

                    }
                });
            }
        })


    } else {
        console.log("You do not have permission to view this content.");
        res.redirect('/restricted');
    }
});

module.exports = router;
