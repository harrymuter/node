var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    if(req.session.user){
        res.redirect('/dashboard');
    } else {
        if(Object.keys(req.query).length !== 0) {
            res.render('index', {page_name: 'index', title: 'UEA Ethics Approval', error:req.query});
        } else {
            res.render('index', {page_name: 'index', title: 'UEA Ethics Approval'});
        }
    }
});

module.exports = router;
