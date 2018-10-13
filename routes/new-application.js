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
        FormLayout.findOne({form_layout_no:layout_no}, function (err, layout) {
            if(err){
                console.log(err);
                res.redirect('/dashboard');
            } if(!layout) {
                console.log("No form was found!");
                res.redirect('/dashboard');
            } else {
                return res.render('new-application', {page_name:'new-application', title:'New Application', layout, admin: admin});
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
        const layout_no = req.query.document_no;
        const version_no = req.query.version_no;

        Form.countDocuments({code:code}, function (err, number) {

            const fname = req.session.user.fname;
            const lname = req.session.user.lname;
            const username = req.session.user.username;
            const year = username.slice(3, -3);
            const type_of_user = req.session.user.type_of_user;
            const seq = number+1;
            const school = req.session.user.school;
            const code = req.session.user.school+"/"+year+"/"+type_of_user;
            const project_title = req.body.project_title;
            const application_type = req.body.application_type;
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

            const form_code = { code: code, seq: ''+seq };
            req.session.current_query = form_code;


            FormLayout.findOne({form_layout_no: layout_no}, function (err, layout) {
                var answers = '{';
                layout.questions.forEach(function (a) {
                    var str = a.toString();
                    if(req.body[str]!==""){
                        answers += '"'+str+'": '+' "'+req.body[str]+'", ';
                    }
                });
                answers = answers.substring(0, answers.length - 2);
                answers += '}';

                answers = JSON.parse(answers);

                var newForm = new Form({
                    first_name: fname,
                    last_name: lname,
                    username: username,
                    type_of_user: type_of_user,
                    administrator: administrator,
                    application_type: application_type,
                    code: code,
                    seq: seq,
                    school: school,
                    time: Date.now(),
                    last_update: Date.now(),
                    status: "pending",
                    form_layout_no: layout_no,
                    form_version_no: version_no,
                    answers: answers,
                    project_title: project_title
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