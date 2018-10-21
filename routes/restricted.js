var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    if(req.session.user) {
        var admin = req.session.user.admin;
        res.render('restricted', {page_name: 'restricted', title: 'UEA REC Application - Restricted Content', admin:admin});
    } else {
        res.redirect('/');
    }
});

module.exports = router;
