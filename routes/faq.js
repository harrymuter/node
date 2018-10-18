/**
 * Created by William on 17/10/2018.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    var admin;
    var login;
    if(req.session.user){
        login = true;
        admin = req.session.user.admin;
    } else {
        login = false;
        admin = false;
    }
    if(req.session.user){
        res.render('faq', {page_name: 'faq', title: 'UEA REC Application - FAQs', admin: admin, login: login});
    }
});

module.exports = router;