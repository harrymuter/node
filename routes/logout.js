var express = require('express');
var session = require('express-session');
var passport = require('passport');
var router = express.Router();

router.get('/', function (req, res) {
    if(req.session.user) {
        req.session = null;
        res.redirect('/');
    } else {
        console.log("No action was required.");
        res.redirect('/');
    }
});

module.exports = router;