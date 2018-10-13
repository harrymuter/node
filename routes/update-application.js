var express = require('express');
var url = require('url');
var router = express.Router();

var Form = require('../models/form');
var FormLayout = require('../models/form-layout');

router.get('/', function (req, res) {
    if (req.session.user) {
        var admin = req.session.user.admin;
        req.session.code = req.query.code;
        req.session.seq = req.query.seq;
        req.session.query = req.query;
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
                        return res.render('update-application', {
                            page_name: 'view',
                            title: 'View Application',
                            form,
                            layout,
                            user: req.session.user,
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

router.post('/', function (req, res) {
    // CHECK USER IS LOGGED IN
    if(req.session.user) {
        const project_title = req.body.project_title;
        var administrator;
        if (req.session.user.school==="CMP"&&req.session.user.type_of_user==="PGT"){
            var primary = "ds";
            var secondary = "pm";
            if(req.session.adviser!==primary && req.session.supervisor!==primary){
                administrator = primary
            }
            else if(req.session.adviser!==secondary && req.session.supervisor!==secondary) {
                administrator = secondary
            }
        }
        Form.findOne({code: req.session.code, seq: req.session.seq}, function(err, form){
            if(err){
                console.log(err);
                res.redirect('/');
            }
            else {
                FormLayout.findOne({form_layout_no: form.form_layout_no}, function (err, layout) {
                    if (err){
                        console.log(err);
                        res.redirect('/');
                    } else {
                        var answers = '{';
                        layout.questions.forEach(function (a) {
                            var str = a.toString();
                            if (req.body[str] !== "") {
                                answers += '"' + str + '": ' + ' "' + req.body[str] + '", ';
                            }
                        });
                        answers = answers.substring(0, answers.length - 2);
                        answers += '}';
                        answers = JSON.parse(answers);

                        Form.update({code: req.session.code, seq: req.session.seq}, {
                            answers: answers,
                            administrator: administrator,
                            project_title: project_title
                        }, function () {
                            res.redirect(url.format({
                                pathname:"/add-file",
                                query:req.session.query,
                            }));
                        });
                    }
                });
            }
        });

    } else {
        console.log("You do not have the correct permissions to perform this task.");
        res.redirect('/restricted');
    }

});

module.exports = router;