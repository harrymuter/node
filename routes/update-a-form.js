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

        FormLayout.aggregate(aggregatorOpts).exec(function(error, forms) {
            var search_criteria = [];
            forms.forEach(function (form) {
                search_criteria.push(JSON.parse('{"form_layout_no":' + form._id + ', "form_version_no":' + form.count + '}'));
            });
            FormLayout.find({$or: search_criteria}, function (err, form) {
                if (err) {
                    res.render('update-a-form', {page_name: 'update-form', title: 'UEA REC Application - Update a Form', admin: admin})
                } else {
                    function capitalizeFirstLetter(string) {
                        return string.charAt(0).toUpperCase() + string.slice(1);
                    }

                    var object = '[';
                    if (form.length > 0) {
                        form.forEach(function (data) {
                            if (data.form_type !== undefined) {
                                if (data.disabled !== undefined) {
                                    object +=
                                        '{"name": "' + data.name +
                                        '", "form_layout_no": ' + data.form_layout_no +
                                        ', "form_version_no": ' + data.form_version_no +
                                        ', "disabled": ' + data.disabled +
                                        ', "type": "' + capitalizeFirstLetter(data.form_type) +
                                        '" },';
                                } else {
                                    object +=
                                        '{"name": "' + data.name +
                                        '", "form_layout_no": ' + data.form_layout_no +
                                        ', "form_version_no": ' + data.form_version_no +
                                        ', "type": "' + capitalizeFirstLetter(data.form_type) +
                                        '" },';
                                }
                            } else {
                                if (data.disabled !== undefined) {
                                    object +=
                                        '{"name": "' + data.name +
                                        '", "form_layout_no": ' + data.form_layout_no +
                                        ', "disabled": ' + data.disabled +
                                        ', "form_version_no": ' + data.form_version_no +
                                        ' },';
                                } else {
                                    object +=
                                        '{"name": "' + data.name +
                                        '", "form_layout_no": ' + data.form_layout_no +
                                        ', "form_version_no": ' + data.form_version_no +
                                        ' },';
                                }
                            }
                        });
                        object = object.slice(0, -1);
                    }
                    object += ']';
                    object = JSON.parse(object);
                    res.render('update-a-form', {
                        page_name: 'update-form',
                        title: 'UEA REC Application - Update a Form',
                        admin: admin,
                        object
                    })
                }
            });
        })
    } else {
        console.log("You do not have permission to view this content.");
        res.redirect('/restricted');
    }
});

module.exports = router;
