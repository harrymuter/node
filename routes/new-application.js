var express = require('express');
var router = express.Router();
var url = require('url');
const Form = require('../models/form');
const FormLayout = require('../models/form-layout');

router.get('/', function (req, res) {
    // CHECK USER IS LOGGED IN
    if (req.session.user) {
        var admin = req.session.user.admin;
        const layout_no = req.query.document_no;
        const version_no = req.query.version_no;
        req.session.layout_no = layout_no;
        req.session.version_no = version_no;

        FormLayout.findOne({form_layout_no: layout_no, form_version_no: version_no}, function (err, layout) {
            if(err){
                console.log(err);
                res.redirect('/dashboard');
            } if(!layout) {
                res.redirect('/dashboard');
            } else {
                return res.render('new-application', {page_name:'new-application', title:'UEA REC Application - New Application', layout, admin: admin});
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
        const username = req.session.user.username;
        const year = username.slice(3, -3);
        const type_of_user = req.session.user.type_of_user;
        const code = req.session.user.school+"/"+year+"/"+type_of_user;

        const layout_no = req.session.layout_no;
        const version_no = req.session.version_no;
        req.session.layout_no = null;
        req.session.version_no = null;

        Form.countDocuments({code:code}, function (err, number) {

            const fname = req.session.user.fname;
            const lname = req.session.user.lname;
            const level= req.session.user.type_of_user;
            const username = req.session.user.username;
            const year = username.slice(3, -3);
            const type_of_user = req.session.user.type_of_user;
            const seq = number+1;
            const school = req.session.user.school;
            const code = req.session.user.school+"/"+year+"/"+type_of_user;
            const project_title = req.body.project_title;
            const form_type_display = req.body.form_type_display;
            var administrator;

            if (req.session.user.school==="CMP"&&type_of_user==="PGT"){
                var primary = "ds";
                var secondary = "pm";
                if(req.session.adviser!==primary && req.session.supervisor!==primary){
                    administrator = primary
                }
                else if(req.session.adviser!==secondary && req.session.supervisor!==secondary) {
                    administrator = secondary
                }
            }

            console.log(form_type_display);

            function days(days){
                return (days*(24*60*60*1000));
            }
            // Get today's date
            var evaluation_date = Date.now();

            // SCHOOL EFFECT
            if (school==="CMP"){
                evaluation_date += days(3)
            } else if(school==="MAT"){
                evaluation_date += days(4)
            } else {
                evaluation_date += days(2)
            }

            // APPLICANT EFFECT
            if (type_of_user==="UG"){
                evaluation_date += days(2)
            } else if(type_of_user==="PGT"){
                evaluation_date += days(4)
            }  else if(type_of_user==="PGR"){
                evaluation_date += days(7)
            }  else if(type_of_user==="(S)RA"){
                evaluation_date += days(6)
            }  else if(type_of_user==="Faculty"){
                evaluation_date += days(7)
            } else {
                evaluation_date += days(15)
            }

            // TYPE EFFECT
            if(form_type_display==="individual"){
                evaluation_date += days(1)
            } else {
                evaluation_date += days(5)
            }

            console.log(evaluation_date);

            FormLayout.findOne({form_layout_no: layout_no, form_version_no: version_no}, function (err, layout) {
                var answers = '{';
                if (layout.questions.length > 0) {
                    layout.questions.forEach(function (a) {
                        var str = a.toString();
                        if (req.body[str] !== "") {
                            answers += '"' + str + '": ' + ' "' + req.body[str] + '", ';
                        }
                    });
                    answers = answers.substring(0, answers.length - 2);
                    answers += '}';

                    answers = JSON.parse(answers);
                } else {
                    answers = null;
                }

                var newForm = new Form({
                    first_name: fname,
                    last_name: lname,
                    username: username,
                    type_of_user: type_of_user,
                    administrator: administrator,
                    form_type_display: form_type_display,
                    code: code,
                    seq: seq,
                    school: school,
                    time: Date.now(),
                    last_update: Date.now(),
                    status: "pending",
                    form_layout_no: layout_no,
                    form_version_no: version_no,
                    answers: answers,
                    level: level,
                    project_title: project_title,
                    evaluation_date: evaluation_date,
                });

                Form.createForm(newForm, function(err, user){
                    if(err) throw err;
                });
                res.redirect(url.format({
                    pathname:"/add-file",
                    query:{code:code, seq:seq},
                }));

            });
        });
    } else {
        console.log("You do not have the correct permissions to perform this task.");
        res.redirect('/restricted');
    }

});

module.exports = router;