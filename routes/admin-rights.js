const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', function (req, res) {
    if(req.session.user) {
        var admin = req.session.user.admin;
        res.render('admin-rights',{page_name:'admin-rights',title:'UEA REC Application - Create Admin', admin: admin, query:req.query});
    } else {
        console.log("You do not have permission to view this content.");
        res.redirect('/restricted');
    }
});


router.post('/', function (req, res) {
    // CHECK USER IS LOGGED IN
    if(req.session.user.admin) {
        var username_request = req.body.username;
        var confirm = req.body.confirm;
        if(confirm==="on") {
            User.findOne({username:username_request}, function (err, doc) {
                if (err) {
                    console.log(err);
                    return res.end("Database internal server failure.");
                } else {
                    if (!doc) {
                        console.log(err);
                        res.redirect('/admin-rights')
                    } else {
                        if(doc.admin === false){
                            User.findOne({username:username_request},function(err, doc){
                                doc.admin = true;
                                doc.save();
                                res.redirect('/');
                            });
                    } else {
                            User.findOne({username:username_request},function(err, doc){
                                doc.admin = false;
                                doc.save();
                                res.redirect('/');
                            });
                        }
                    }
                }
            });
        } else {
                res.redirect('/admin-rights')
        }
    } else {
                console.log("You do not have the correct permissions to perform this task.");
                res.redirect('/restricted');
        };

    });

module.exports = router;



